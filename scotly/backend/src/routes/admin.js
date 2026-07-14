import { Router } from 'express';
import pool from '../db.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = Router();

// Todas las rutas de este archivo requieren admin
router.use(verificarToken, verificarAdmin);

// GET /api/admin/compras — todas las compras del sistema, con quién y cuándo
router.get('/compras', async (req, res) => {
  try {
    const [compras] = await pool.query(
      `SELECT c.id, c.tipo, c.referencia_id, c.metodo_pago, c.importe, c.fecha_compra,
              u.id AS usuario_id, u.username, u.email
       FROM compras c
       JOIN usuarios u ON u.id = c.usuario_id
       ORDER BY c.fecha_compra DESC
       LIMIT 500`
    );
    res.json({ compras });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener compras' });
  }
});

// GET /api/admin/usuarios — listado con estado de baneo
router.get('/usuarios', async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      `SELECT id, username, email, rol, baneado, monedas, puntos, experiencia, fecha_registro
       FROM usuarios
       ORDER BY fecha_registro DESC`
    );
    res.json({ usuarios });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// GET /api/admin/usuarios/:id/inventario — cartas + items de un usuario puntual
router.get('/usuarios/:id/inventario', async (req, res) => {
  const { id } = req.params;
  try {
    const [cartas] = await pool.query(
      `SELECT c.codigo, c.nombre, c.rareza, ic.cantidad, ic.nivel
       FROM inventario_cartas ic
       JOIN cartas c ON c.id = ic.carta_id
       WHERE ic.usuario_id = ?`,
      [id]
    );

    const [items] = await pool.query(
      `SELECT t.codigo, t.nombre, t.tipo, ii.cantidad
       FROM inventario_items ii
       JOIN tienda_items t ON t.id = ii.item_id
       WHERE ii.usuario_id = ?`,
      [id]
    );

    res.json({ cartas, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// POST /api/admin/usuarios/:id/banear
router.post('/usuarios/:id/banear', async (req, res) => {
  const { id } = req.params;

  if (Number(id) === req.usuario.id) {
    return res.status(400).json({ error: 'No podés banearte a vos mismo' });
  }

  try {
    const [filas] = await pool.query('SELECT rol FROM usuarios WHERE id = ?', [id]);
    if (filas.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (filas[0].rol === 'admin') {
      return res.status(400).json({ error: 'No se puede banear a otro administrador' });
    }

    await pool.query('UPDATE usuarios SET baneado = 1 WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario suspendido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al banear usuario' });
  }
});

// POST /api/admin/usuarios/:id/desbanear
router.post('/usuarios/:id/desbanear', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE usuarios SET baneado = 0 WHERE id = ?', [id]);
    res.json({ mensaje: 'Usuario reactivado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al reactivar usuario' });
  }
});

export default router;