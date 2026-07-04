import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { CURRENT_SEASON } from '../features/invasion/data/seasons.js';

const router = Router();

// POST /api/invasion/resultado  { resultado: 'victoria' | 'derrota' | 'empate' }
router.post('/resultado', verificarToken, async (req, res) => {
  const { resultado } = req.body;
  const usuarioId = req.usuario.id;
  const temporada = CURRENT_SEASON.id;

  if (!['victoria', 'derrota', 'empate'].includes(resultado)) {
    return res.status(400).json({ error: 'Resultado inválido' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let monedasGanadas = 0;
    let xpGanada = 0;
    let yaReclamado = false;

    if (resultado === 'victoria') {
      const [previas] = await connection.query(
        `SELECT id FROM partidas_invasion 
         WHERE usuario_id = ? AND temporada = ? AND resultado = 'victoria' AND monedas_ganadas > 0`,
        [usuarioId, temporada]
      );

      if (previas.length > 0) {
        yaReclamado = true;
      } else {
        monedasGanadas = CURRENT_SEASON.reward.coins;
        xpGanada = CURRENT_SEASON.reward.xp;

        await connection.query(
          'UPDATE usuarios SET monedas = monedas + ?, experiencia = experiencia + ? WHERE id = ?',
          [monedasGanadas, xpGanada, usuarioId]
        );
      }
    }

    await connection.query(
      `INSERT INTO partidas_invasion (usuario_id, temporada, resultado, monedas_ganadas, xp_ganada)
       VALUES (?, ?, ?, ?, ?)`,
      [usuarioId, temporada, resultado, monedasGanadas, xpGanada]
    );

    const [usuarios] = await connection.query(
      'SELECT monedas, experiencia FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    await connection.commit();
    connection.release();

    res.json({
      yaReclamado,
      monedas_ganadas: monedasGanadas,
      xp_ganada: xpGanada,
      usuario: usuarios[0],
    });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al registrar resultado' });
  }
});

// GET /api/invasion/estado — ¿ya reclamó la recompensa de esta temporada?
router.get('/estado', verificarToken, async (req, res) => {
  try {
    const temporada = CURRENT_SEASON.id;
    const [previas] = await pool.query(
      `SELECT id FROM partidas_invasion 
       WHERE usuario_id = ? AND temporada = ? AND resultado = 'victoria' AND monedas_ganadas > 0`,
      [req.usuario.id, temporada]
    );
    res.json({ yaReclamado: previas.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar estado' });
  }
});

export default router;