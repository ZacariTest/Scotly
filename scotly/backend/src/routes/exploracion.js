// backend/src/routes/exploracion.js
import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import {
  calcularDuracionHoras,
  calcularRecompensaPuntos,
  calcularRecompensaMonedas,
} from '../features/exploracion/data/exploracionConfig.js';

const router = Router();

// GET /api/exploracion/estado
// Devuelve la exploración activa del usuario (si tiene alguna), incluyendo
// si ya está lista para reclamar. El front usa `fin` para el countdown y
// `lista` para mostrar el botón de reclamar.
router.get('/estado', verificarToken, async (req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT e.id, e.carta_id, e.rareza, e.inicio, e.fin,
              e.recompensa_puntos, e.recompensa_monedas,
              c.nombre AS carta_nombre, c.imagen AS carta_imagen
       FROM exploraciones e
       JOIN cartas c ON c.id = e.carta_id
       WHERE e.usuario_id = ? AND e.reclamado = 0
       ORDER BY e.id DESC
       LIMIT 1`,
      [req.usuario.id]
    );

    if (filas.length === 0) {
      return res.json({ activa: null });
    }

    const exploracion = filas[0];
    const lista = new Date(exploracion.fin) <= new Date();

    res.json({ activa: { ...exploracion, lista } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el estado de exploración' });
  }
});

// POST /api/exploracion/iniciar  { carta_id }
// La carta sigue disponible para todo lo demás (gacha, invasión, subir
// nivel) — la única restricción es que el usuario no tenga ya una
// exploración sin reclamar.
router.post('/iniciar', verificarToken, async (req, res) => {
  const { carta_id } = req.body;
  const usuarioId = req.usuario.id;

  if (!carta_id) {
    return res.status(400).json({ error: 'Falta carta_id' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // El usuario tiene que poseer la carta.
    const [inventario] = await connection.query(
      `SELECT ic.cantidad, c.rareza
       FROM inventario_cartas ic
       JOIN cartas c ON c.id = ic.carta_id
       WHERE ic.usuario_id = ? AND ic.carta_id = ?
       FOR UPDATE`,
      [usuarioId, carta_id]
    );

    if (inventario.length === 0 || inventario[0].cantidad < 1) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ error: 'No tenés esa carta en tu inventario' });
    }

    // Bloqueamos también la posible fila de exploración activa para
    // evitar que un doble click cree dos exploraciones a la vez.
    const [activas] = await connection.query(
      `SELECT id FROM exploraciones WHERE usuario_id = ? AND reclamado = 0 FOR UPDATE`,
      [usuarioId]
    );

    if (activas.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'Ya tenés una exploración en curso' });
    }

    const { rareza } = inventario[0];
    const duracionHoras = calcularDuracionHoras(rareza);
    const recompensaPuntos = calcularRecompensaPuntos(rareza);
    const recompensaMonedas = calcularRecompensaMonedas();

    const [resultado] = await connection.query(
      `INSERT INTO exploraciones
         (usuario_id, carta_id, rareza, inicio, fin, recompensa_puntos, recompensa_monedas)
       VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? HOUR), ?, ?)`,
      [usuarioId, carta_id, rareza, duracionHoras, recompensaPuntos, recompensaMonedas]
    );

    await connection.commit();

    // Mismo JOIN que /estado, para que el front tenga carta_nombre y
    // carta_imagen apenas se inicia la exploración (sin esto, la carta
    // se veía sin nombre ni imagen hasta recargar la página).
    const [filas] = await pool.query(
      `SELECT e.id, e.carta_id, e.rareza, e.inicio, e.fin,
              e.recompensa_puntos, e.recompensa_monedas,
              c.nombre AS carta_nombre, c.imagen AS carta_imagen
       FROM exploraciones e
       JOIN cartas c ON c.id = e.carta_id
       WHERE e.id = ?`,
      [resultado.insertId]
    );

    res.json({ activa: { ...filas[0], lista: false } });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar la exploración' });
  } finally {
    connection.release();
  }
});

// POST /api/exploracion/reclamar
// No recibe carta_id: siempre reclama la exploración activa del usuario,
// así el cliente no puede apuntar a la exploración de otro.
router.post('/reclamar', verificarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [filas] = await connection.query(
      `SELECT id, fin, recompensa_puntos, recompensa_monedas, reclamado
       FROM exploraciones
       WHERE usuario_id = ? AND reclamado = 0
       ORDER BY id DESC
       LIMIT 1
       FOR UPDATE`,
      [usuarioId]
    );

    if (filas.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ error: 'No tenés ninguna exploración en curso' });
    }

    const exploracion = filas[0];

    if (new Date(exploracion.fin) > new Date()) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'La exploración todavía no terminó' });
    }

    await connection.query(
      `UPDATE usuarios SET puntos = puntos + ?, monedas = monedas + ? WHERE id = ?`,
      [exploracion.recompensa_puntos, exploracion.recompensa_monedas, usuarioId]
    );

    await connection.query(
      `UPDATE exploraciones SET reclamado = 1, fecha_reclamo = NOW() WHERE id = ?`,
      [exploracion.id]
    );

    if (exploracion.recompensa_puntos > 0) {
      await connection.query(
        `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, 'exploracion', 'punto', ?)`,
        [usuarioId, exploracion.recompensa_puntos]
      );
    }
    if (exploracion.recompensa_monedas > 0) {
      await connection.query(
        `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, 'exploracion', 'moneda', ?)`,
        [usuarioId, exploracion.recompensa_monedas]
      );
    }

    await connection.commit();

    const [usuarios] = await pool.query(
      'SELECT id, username, email, monedas, puntos, energia, experiencia, rol, foto_perfil FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    res.json({
      usuario: usuarios[0],
      recompensa_puntos: exploracion.recompensa_puntos,
      recompensa_monedas: exploracion.recompensa_monedas,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al reclamar la exploración' });
  } finally {
    connection.release();
  }
});

export default router;