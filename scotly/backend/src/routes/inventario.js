import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { NIVEL_MAXIMO, COSTO_NIVEL } from '../features/inventario/data/inventarioConfig.js';

const router = Router();

// GET /api/inventario/cartas
router.get('/cartas', verificarToken, async (req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT c.id, c.codigo, c.nombre, c.rareza, c.hp, c.ataque, c.velocidad,
              c.habilidad_nombre, c.habilidad_descripcion, c.imagen,
              ic.cantidad, ic.nivel
       FROM inventario_cartas ic
       JOIN cartas c ON c.id = ic.carta_id
       WHERE ic.usuario_id = ?`,
      [req.usuario.id]
    );
    res.json({ cartas: filas, nivel_maximo: NIVEL_MAXIMO });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// POST /api/inventario/subir-nivel  { carta_id }
// Consume 1 carta duplicada para subir de nivel a la que ya tenés.
router.post('/subir-nivel', verificarToken, async (req, res) => {
  const { carta_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!carta_id) {
    return res.status(400).json({ error: 'Falta carta_id' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [filas] = await connection.query(
      'SELECT cantidad, nivel FROM inventario_cartas WHERE usuario_id = ? AND carta_id = ? FOR UPDATE',
      [usuarioId, carta_id]
    );

    if (filas.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ error: 'No tenés esa carta en tu inventario' });
    }

    const { cantidad, nivel } = filas[0];

    if (nivel >= NIVEL_MAXIMO) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'Esta carta ya está en su nivel máximo' });
    }

    // La copia "base" que se muestra no cuenta como duplicada disponible.
    const duplicadosDisponibles = cantidad - 1;

    if (duplicadosDisponibles < COSTO_NIVEL) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'No tenés suficientes cartas duplicadas' });
    }

    const nuevoNivel = nivel + 1;
    const nuevaCantidad = cantidad - COSTO_NIVEL;

    await connection.query(
      'UPDATE inventario_cartas SET nivel = ?, cantidad = ? WHERE usuario_id = ? AND carta_id = ?',
      [nuevoNivel, nuevaCantidad, usuarioId, carta_id]
    );

    await connection.commit();
    connection.release();

    res.json({ nivel: nuevoNivel, cantidad: nuevaCantidad, nivel_maximo: NIVEL_MAXIMO });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al subir de nivel' });
  }
});

export default router;