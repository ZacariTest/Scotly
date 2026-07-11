import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';

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
// `precio_real` es el valor que se MUESTRA en la tienda, en EUROS.
// El cobro efectivo (cuando se integre MercadoPago) se hará en pesos
// argentinos — la conversión EUR→ARS pasa por el gateway/backend en ese
// momento, no acá. Esta columna nunca representa el monto cobrado en ARS.
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
      'SELECT monedas FROM usuarios WHERE id = ? FOR UPDATE',
      [usuarioId]
    );
    const usuario = usuarios[0];

    if (usuario.monedas < item.precio_monedas) {
      await connection.rollback(); connection.release();
      return res.status(400).json({ error: 'Monedas insuficientes' });
    }

    await connection.query(
      'UPDATE usuarios SET monedas = monedas - ? WHERE id = ?',
      [item.precio_monedas, usuarioId]
    );

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

    await connection.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, 'item', item_id, 'transferencia', 0]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({ mensaje: 'Compra exitosa', item });
  } catch (err) {
    await connection.rollback(); connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

// POST /api/tienda/comprar-moneda  { item_id }
// Compra de un paquete de monedas con dinero real. El pago
// todavía no está integrado (MercadoPago está planeado) por
// ahora esta ruta acredita las monedas directamente, igual que el resto de
// compras "de prueba" del proyecto (metodo_pago sin pasarela real).
// Cuando se integre MercadoPago, el acreditado de monedas se movera al
// webhook de confirmación de pago en lugar de hacerse aquí de forma síncrona.
router.post('/comprar-moneda', verificarToken, async (req, res) => {
  const { item_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!item_id) return res.status(400).json({ error: 'Falta item_id' });

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [items] = await connection.query(
      "SELECT * FROM tienda_items WHERE id = ? AND tipo = 'moneda' AND activo = 1",
      [item_id]
    );
    if (items.length === 0) {
      await connection.rollback(); connection.release();
      return res.status(404).json({ error: 'Paquete de monedas no encontrado' });
    }
    const item = items[0];

    await connection.query(
      'UPDATE usuarios SET monedas = monedas + ? WHERE id = ?',
      [item.cantidad_otorgada, usuarioId]
    );

    await connection.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, 'moneda', item_id, 'tarjeta', item.precio_real]
    );

    const [usuarios] = await connection.query(
      'SELECT monedas FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({
      mensaje: 'Monedas acreditadas',
      item,
      monedas_totales: usuarios[0].monedas,
    });
  } catch (err) {
    await connection.rollback(); connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la compra de monedas' });
  }
});

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