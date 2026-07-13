import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { CURSOS_PAGOS } from '../features/cursosPagos/data/cursosPagosConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_DIR = path.join(__dirname, '../assets/cursos-pagos');

const router = Router();

// GET /api/cursos-pagos/:codigo — info pública (paywall), incluye preview de recompensa
router.get('/:codigo', async (req, res) => {
  const curso = CURSOS_PAGOS[req.params.codigo];
  if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

  const { pdf, recompensa, ...publico } = curso;

  try {
    const [cartas] = await pool.query(
      'SELECT nombre, imagen, rareza FROM cartas WHERE codigo = ?',
      [recompensa.cartaCodigo]
    );
    const carta = cartas[0] || null;

    res.json({
      curso: {
        ...publico,
        recompensa: {
          carta,
          monedas: recompensa.monedas,
          puntos: recompensa.puntos,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// GET /api/cursos-pagos/:codigo/acceso
router.get('/:codigo/acceso', verificarToken, async (req, res) => {
  const { codigo } = req.params;
  if (!CURSOS_PAGOS[codigo]) return res.status(404).json({ error: 'Curso no encontrado' });

  const [filas] = await pool.query(
    'SELECT id FROM cursos_comprados WHERE usuario_id = ? AND curso_codigo = ?',
    [req.usuario.id, codigo]
  );
  res.json({ acceso: filas.length > 0 });
});

// POST /api/cursos-pagos/:codigo/comprar
// TODO(mercadopago): acredita acceso y recompensa directo, igual que
// /tienda/comprar-moneda. Cuando se integre MP, esto se mueve al webhook.
router.post('/:codigo/comprar', verificarToken, async (req, res) => {
  const { codigo } = req.params;
  const usuarioId = req.usuario.id;
  const curso = CURSOS_PAGOS[codigo];
  if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [existente] = await connection.query(
      'SELECT id FROM cursos_comprados WHERE usuario_id = ? AND curso_codigo = ? FOR UPDATE',
      [usuarioId, codigo]
    );
    if (existente.length > 0) {
      await connection.rollback(); connection.release();
      return res.status(409).json({ error: 'Ya compraste este curso' });
    }

    await connection.query(
      'INSERT INTO cursos_comprados (usuario_id, curso_codigo) VALUES (?, ?)',
      [usuarioId, codigo]
    );

    await connection.query(
      'INSERT INTO compras (usuario_id, tipo, referencia_id, metodo_pago, importe) VALUES (?, ?, ?, ?, ?)',
      [usuarioId, 'curso', null, 'tarjeta', curso.precioEUR]
    );

    // --- Recompensa: carta rara + monedas + puntos (config server-side, no cliente) ---
    const { cartaCodigo, monedas, puntos } = curso.recompensa;

    const [cartas] = await connection.query(
      'SELECT id, nombre FROM cartas WHERE codigo = ?',
      [cartaCodigo]
    );
    if (cartas.length === 0) {
      throw new Error(`Carta de recompensa "${cartaCodigo}" no existe en la tabla cartas`);
    }
    const carta = cartas[0];

    const [existeCarta] = await connection.query(
      'SELECT id FROM inventario_cartas WHERE usuario_id = ? AND carta_id = ? FOR UPDATE',
      [usuarioId, carta.id]
    );
    if (existeCarta.length > 0) {
      await connection.query(
        'UPDATE inventario_cartas SET cantidad = cantidad + 1 WHERE id = ?',
        [existeCarta[0].id]
      );
    } else {
      await connection.query(
        'INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad) VALUES (?, ?, 1)',
        [usuarioId, carta.id]
      );
    }

    await connection.query(
      `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad, carta_id) VALUES (?, ?, 'carta', 1, ?)`,
      [usuarioId, `curso_pago_${codigo}`, carta.id]
    );

    await connection.query(
      'UPDATE usuarios SET monedas = monedas + ?, puntos = puntos + ? WHERE id = ?',
      [monedas, puntos, usuarioId]
    );

    await connection.query(
      `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, ?, 'moneda', ?)`,
      [usuarioId, `curso_pago_${codigo}`, monedas]
    );
    await connection.query(
      `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, ?, 'punto', ?)`,
      [usuarioId, `curso_pago_${codigo}`, puntos]
    );

    await connection.commit();
    connection.release();

    const [usuarios] = await pool.query(
      'SELECT id, monedas, puntos FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    res.status(201).json({
      mensaje: 'Curso comprado',
      curso_codigo: codigo,
      recompensa: { carta: carta.nombre, monedas, puntos },
      usuario: usuarios[0],
    });
  } catch (err) {
    await connection.rollback(); connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
});

// GET /api/cursos-pagos/:codigo/pdf — solo si el usuario tiene acceso
router.get('/:codigo/pdf', verificarToken, async (req, res) => {
  const { codigo } = req.params;
  const curso = CURSOS_PAGOS[codigo];
  if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

  const [filas] = await pool.query(
    'SELECT id FROM cursos_comprados WHERE usuario_id = ? AND curso_codigo = ?',
    [req.usuario.id, codigo]
  );
  if (filas.length === 0) {
    return res.status(403).json({ error: 'No tenés acceso a este curso' });
  }

  const rutaPdf = path.join(PDF_DIR, curso.pdf);
  if (!fs.existsSync(rutaPdf)) {
    return res.status(404).json({ error: 'Archivo no disponible' });
  }
  res.download(rutaPdf, curso.pdf);
});

export default router;