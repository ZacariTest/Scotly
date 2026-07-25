import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { Preference, Payment } from 'mercadopago';
import mpClient from '../mercadopago.js';

const router = Router();

// GET /api/tienda/items — catálogo de cosméticos/objetos/energía
router.get('/items', async (req, res) => {
  try {
    const [items] = await pool.query(
      "SELECT id, codigo, nombre, tipo, descripcion, precio_monedas, cantidad_otorgada FROM tienda_items WHERE activo = 1 AND tipo != 'moneda'"
    );
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la tienda' });
  }
});

// GET /api/tienda/monedas — paquetes de monedas comprables con dinero real
router.get('/monedas', async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT id, codigo, nombre, descripcion, precio_real, cantidad_otorgada
       FROM tienda_items
       WHERE tipo = 'moneda' AND activo = 1
       ORDER BY precio_real ASC`
    );
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los paquetes de monedas' });
  }
});

// GET /api/tienda/destacado — carta(s) destacada(s) de temporada
router.get('/destacado', async (req, res) => {
  try {
    const [cartas] = await pool.query(
      'SELECT id, codigo, nombre, rareza, hp, ataque, velocidad, habilidad_nombre, habilidad_descripcion, imagen, precio_monedas FROM cartas WHERE disponible_tienda = 1 AND activa = 1'
    );
    res.json({ cartas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener destacados' });
  }
});

// POST /api/tienda/comprar-item  { item_id }
router.post('/comprar-item', verificarToken, async (req, res) => {
  const { item_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!item_id) return res.status(400).json({ error: 'Falta item_id' });

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [items] = await connection.query(
      "SELECT * FROM tienda_items WHERE id = ? AND activo = 1 AND tipo != 'moneda'",
      [item_id]
    );
    if (items.length === 0) {
      await connection.rollback(); connection.release();
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }
    const item = items[0];

    const [usuarios] = await connection.query(
      'SELECT monedas, energia, energia_max FROM usuarios WHERE id = ? FOR UPDATE',
      [usuarioId]
    );
    const usuario = usuarios[0];

    if (usuario.monedas < item.precio_monedas) {
      await connection.rollback(); connection.release();
      return res.status(400).json({ error: 'Monedas insuficientes' });
    }

    if (item.tipo === 'energia' && usuario.energia >= usuario.energia_max) {
      await connection.rollback(); connection.release();
      return res.status(400).json({ error: 'Ya tenés la energía al máximo' });
    }

    await connection.query(
      'UPDATE usuarios SET monedas = monedas - ? WHERE id = ?',
      [item.precio_monedas, usuarioId]
    );

    let energiaActualizada = false;

    if (item.tipo === 'energia') {
      // Los ítems de energía no van al inventario: se acreditan directo
      // sobre usuarios.energia, respetando el tope energia_max.
      await connection.query(
        `UPDATE usuarios
         SET energia = LEAST(energia_max, energia + ?),
             energia_actualizada_en = ?
         WHERE id = ?`,
        [item.cantidad_otorgada, new Date(), usuarioId]
      );
      energiaActualizada = true;
    } else {
      const [existente] = await connection.query(
        'SELECT id, cantidad FROM inventario_items WHERE usuario_id = ? AND item_id = ?',
        [usuarioId, item_id]
      );

      if (existente.length > 0) {
        await connection.query(
          'UPDATE inventario_items SET cantidad = cantidad + ? WHERE id = ?',
          [item.cantidad_otorgada, existente[0].id]
        );
      } else {
        await connection.query(
          'INSERT INTO inventario_items (usuario_id, item_id, cantidad) VALUES (?, ?, ?)',
          [usuarioId, item_id, item.cantidad_otorgada]
        );
      }
    }

    await connection.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, 'item', item_id, 'transferencia', 0]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({ mensaje: 'Compra exitosa', item, energia_actualizada: energiaActualizada });
  } catch (err) {
    await connection.rollback(); connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

// POST /api/tienda/comprar-moneda  { item_id }
// Crea la preferencia de pago en MercadoPago y devuelve la URL de checkout.
// El acreditado de monedas NO pasa por acá — pasa por el webhook cuando
// MercadoPago confirma el pago (ver /webhook-mercadopago más abajo).
router.post('/comprar-moneda', verificarToken, async (req, res) => {
  const { item_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!item_id) return res.status(400).json({ error: 'Falta item_id' });

  try {
    const [items] = await pool.query(
      "SELECT * FROM tienda_items WHERE id = ? AND tipo = 'moneda' AND activo = 1",
      [item_id]
    );
    if (items.length === 0) {
      return res.status(404).json({ error: 'Paquete de monedas no encontrado' });
    }
    const item = items[0];

    if (!item.precio_ars) {
      return res.status(500).json({ error: 'Este paquete no tiene precio en ARS configurado' });
    }

    const [insertResult] = await pool.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [usuarioId, 'moneda', item_id, 'mercadopago', item.precio_ars, 'pendiente']
    );
    const compraId = insertResult.insertId;

    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: [
          {
            title: item.nombre,
            quantity: 1,
            unit_price: Number(item.precio_ars),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: `${process.env.FRONTEND_URL}/shop?pago=exito`,
          failure: `${process.env.FRONTEND_URL}/shop?pago=fallo`,
          pending: `${process.env.FRONTEND_URL}/shop?pago=pendiente`,
        },
        // auto_return quitado a propósito: en local, con URLs http://localhost,
        // MercadoPago lo rechaza con un error engañoso. Sin auto_return el
        // usuario ve un botón "Volver al sitio" en vez de que lo redirija solo
        // — funciona igual, solo cambia ese detalle de UX.
        external_reference: String(compraId),
        notification_url: `${process.env.BACKEND_URL}/api/tienda/webhook-mercadopago`,
      },
    });

    await pool.query(
      'UPDATE compras SET mp_preference_id = ? WHERE id = ?',
      [result.id, compraId]
    );

    console.log('MP init_point:', result.init_point);

    res.status(201).json({ init_point: result.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la preferencia de pago' });
  }
});

// POST/GET /api/tienda/webhook-mercadopago
// MercadoPago pega acá cuando cambia el estado de un pago. Acá y sólo acá
// se acreditan las monedas. Es idempotente: si la compra ya está
// 'aprobado', no vuelve a acreditar aunque llegue el webhook duplicado.
async function webhookMercadoPago(req, res) {
  try {
    const paymentId = req.query['data.id'] || req.body?.data?.id || req.query.id;
    const type = req.query.type || req.body?.type || req.query.topic;

    if (type !== 'payment' || !paymentId) {
      return res.sendStatus(200);
    }

    const payment = new Payment(mpClient);
    const paymentInfo = await payment.get({ id: paymentId });

    const compraId = Number(paymentInfo.external_reference);
    if (!compraId) return res.sendStatus(200);

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [compras] = await connection.query(
        'SELECT * FROM compras WHERE id = ? FOR UPDATE',
        [compraId]
      );
      if (compras.length === 0) {
        await connection.rollback();
        connection.release();
        return res.sendStatus(200);
      }
      const compra = compras[0];

      if (compra.estado === 'aprobado') {
        await connection.rollback();
        connection.release();
        return res.sendStatus(200);
      }

      let nuevoEstado = 'pendiente';
      if (paymentInfo.status === 'approved') nuevoEstado = 'aprobado';
      else if (['rejected', 'cancelled'].includes(paymentInfo.status)) nuevoEstado = 'rechazado';

      await connection.query(
        'UPDATE compras SET estado = ?, mp_payment_id = ? WHERE id = ?',
        [nuevoEstado, String(paymentId), compraId]
      );

      if (nuevoEstado === 'aprobado') {
        const [items] = await connection.query(
          'SELECT * FROM tienda_items WHERE id = ?',
          [compra.referencia_id]
        );
        if (items.length > 0) {
          await connection.query(
            'UPDATE usuarios SET monedas = monedas + ? WHERE id = ?',
            [items[0].cantidad_otorgada, compra.usuario_id]
          );
        }
      }

      await connection.commit();
      connection.release();
      res.sendStatus(200);
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (err) {
    console.error('Error en webhook MercadoPago:', err);
    res.sendStatus(500);
  }
}

router.post('/webhook-mercadopago', webhookMercadoPago);
router.get('/webhook-mercadopago', webhookMercadoPago);

// POST /api/tienda/comprar-carta  { carta_id }
router.post('/comprar-carta', verificarToken, async (req, res) => {
  const { carta_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!carta_id) return res.status(400).json({ error: 'Falta carta_id' });

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [cartas] = await connection.query(
      'SELECT * FROM cartas WHERE id = ? AND disponible_tienda = 1 AND activa = 1',
      [carta_id]
    );
    if (cartas.length === 0) {
      await connection.rollback(); connection.release();
      return res.status(404).json({ error: 'Carta no disponible en la tienda' });
    }
    const carta = cartas[0];

    const [usuarios] = await connection.query(
      'SELECT monedas FROM usuarios WHERE id = ? FOR UPDATE',
      [usuarioId]
    );
    const usuario = usuarios[0];

    if (usuario.monedas < carta.precio_monedas) {
      await connection.rollback(); connection.release();
      return res.status(400).json({ error: 'Monedas insuficientes' });
    }

    await connection.query(
      'UPDATE usuarios SET monedas = monedas - ? WHERE id = ?',
      [carta.precio_monedas, usuarioId]
    );

    const [existente] = await connection.query(
      'SELECT id, cantidad FROM inventario_cartas WHERE usuario_id = ? AND carta_id = ?',
      [usuarioId, carta_id]
    );

    if (existente.length > 0) {
      await connection.query(
        'UPDATE inventario_cartas SET cantidad = cantidad + 1 WHERE id = ?',
        [existente[0].id]
      );
    } else {
      await connection.query(
        'INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad) VALUES (?, ?, 1)',
        [usuarioId, carta_id]
      );
    }

    await connection.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, 'carta', carta_id, 'transferencia', 0]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({ mensaje: 'Carta obtenida', carta });
  } catch (err) {
    await connection.rollback(); connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

export default router;