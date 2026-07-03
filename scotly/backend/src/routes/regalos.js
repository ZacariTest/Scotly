import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();
const CODIGO_REGALO = 'FOUNDERS_BONNIE';

// POST /api/regalos/reclamar-bienvenida
router.post('/reclamar-bienvenida', verificarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [yaReclamado] = await connection.query(
      'SELECT id FROM regalos_reclamados WHERE usuario_id = ? AND codigo_regalo = ?',
      [usuarioId, CODIGO_REGALO]
    );

    if (yaReclamado.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(409).json({ error: 'Ya reclamaste este regalo' });
    }

    const [cartas] = await connection.query(
      'SELECT * FROM cartas WHERE codigo = ?',
      [CODIGO_REGALO]
    );

    if (cartas.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(500).json({ error: 'Carta de regalo no configurada' });
    }

    const carta = cartas[0];

    await connection.query(
      'INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad) VALUES (?, ?, 1)',
      [usuarioId, carta.id]
    );

    await connection.query(
      'INSERT INTO regalos_reclamados (usuario_id, codigo_regalo) VALUES (?, ?)',
      [usuarioId, CODIGO_REGALO]
    );

    await connection.commit();
    connection.release();

    res.status(201).json({ carta });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al reclamar el regalo' });
  }
});

// GET /api/regalos/estado
router.get('/estado', verificarToken, async (req, res) => {
  try {
    const [reclamado] = await pool.query(
      'SELECT id FROM regalos_reclamados WHERE usuario_id = ? AND codigo_regalo = ?',
      [req.usuario.id, CODIGO_REGALO]
    );
    res.json({ reclamado: reclamado.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar estado del regalo' });
  }
});

export default router;