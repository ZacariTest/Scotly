import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// GET /api/inventario/cartas
router.get('/cartas', verificarToken, async (req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT c.id, c.codigo, c.nombre, c.rareza, c.hp, c.ataque, c.velocidad,
              c.habilidad_nombre, c.habilidad_descripcion, c.imagen, ic.cantidad
       FROM inventario_cartas ic
       JOIN cartas c ON c.id = ic.carta_id
       WHERE ic.usuario_id = ?`,
      [req.usuario.id]
    );
    res.json({ cartas: filas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

export default router;