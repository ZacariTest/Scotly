import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import {
  HISTORIA_CAP1_DECISIONES,
  RAREZA_BONUS,
  calcularResultado,
  RECOMPENSAS_POR_RESULTADO,
} from '../features/historia/data/historiaCapitulo1.js';

const router = Router();

// Por ahora solo existe el capítulo 1. Cuando se sumen más capítulos,
// esto pasa a ser un mapa { 'capitulo-1': HISTORIA_CAP1_DECISIONES, ... }
const DECISIONES_POR_CAPITULO = {
  'capitulo-1': HISTORIA_CAP1_DECISIONES,
};

// POST /api/historia/completar-capitulo
// body: { capitulo_codigo, protagonista_region, protagonista_rareza, respuestas: [{decisionId, choiceIndex}] }
router.post('/completar-capitulo', verificarToken, async (req, res) => {
  const { capitulo_codigo, protagonista_region, protagonista_rareza, respuestas } = req.body;
  const usuarioId = req.usuario.id;

  const decisiones = DECISIONES_POR_CAPITULO[capitulo_codigo];
  if (!decisiones) {
    return res.status(400).json({ error: 'Capítulo inválido' });
  }
  if (!Array.isArray(respuestas)) {
    return res.status(400).json({ error: 'Respuestas inválidas' });
  }

  // --- Cálculo de puntos, 100% server-side ---
  let puntosTotales = 0;

  for (const decisionKey of Object.keys(decisiones)) {
    const respuesta = respuestas.find((r) => r.decisionId === decisionKey);
    if (!respuesta) {
      return res.status(400).json({ error: `Falta la respuesta para ${decisionKey}` });
    }

    const decisionDef = decisiones[decisionKey];
    const choice = decisionDef.choices[respuesta.choiceIndex];
    if (!choice) {
      return res.status(400).json({ error: `Opción inválida en ${decisionKey}` });
    }

    puntosTotales += choice.basePoints;

    if (choice.region && choice.region === protagonista_region) {
      puntosTotales += RAREZA_BONUS[protagonista_rareza] || 0;
    }
  }

  const resultado = calcularResultado(puntosTotales);
  const { monedas, puntos } = RECOMPENSAS_POR_RESULTADO[resultado];
  const origen = `historia_${capitulo_codigo}`;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [previas] = await connection.query(
      `SELECT id FROM recompensas WHERE usuario_id = ? AND origen = ? AND tipo = 'moneda'`,
      [usuarioId, origen]
    );

    let monedasGanadas = 0;
    let puntosGanados = 0;
    const yaReclamado = previas.length > 0;

    if (!yaReclamado) {
      monedasGanadas = monedas;
      puntosGanados = puntos;

      await connection.query(
        'UPDATE usuarios SET monedas = monedas + ?, puntos = puntos + ? WHERE id = ?',
        [monedasGanadas, puntosGanados, usuarioId]
      );

      await connection.query(
        `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, ?, 'moneda', ?)`,
        [usuarioId, origen, monedasGanadas]
      );

      if (puntosGanados > 0) {
        await connection.query(
          `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, ?, 'punto', ?)`,
          [usuarioId, origen, puntosGanados]
        );
      }
    }

    await connection.commit();

    res.json({
      resultado,
      puntos_totales: puntosTotales,
      monedas_ganadas: monedasGanadas,
      puntos_ganados: puntosGanados,
      yaReclamado,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el resultado de la historia' });
  } finally {
    connection.release();
  }
});

export default router;