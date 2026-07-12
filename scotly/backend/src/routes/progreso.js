import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { COURSE_QUIZZES } from '../features/courses/data/courseQuizzes.js';

const router = Router();

// POST /api/progreso/validar-respuesta  { curso_codigo, paso_index, seleccionada }
//
// Valida una respuesta de quiz contra el server (nunca contra el bundle
// del navegador). Si es correcta, registra el paso en `progreso_pasos` y,
// si con esto el usuario ya respondió TODOS los quizzes del curso, marca
// `progreso_cursos.completado = 1`. Es idempotente: reenviar la misma
// respuesta correcta no rompe nada ni duplica progreso.
router.post('/validar-respuesta', verificarToken, async (req, res) => {
  const { curso_codigo, paso_index, seleccionada } = req.body;
  const usuarioId = req.usuario.id;

  if (!curso_codigo || paso_index === undefined || seleccionada === undefined) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const quizzesDelCurso = COURSE_QUIZZES[curso_codigo];
  if (!quizzesDelCurso || !(paso_index in quizzesDelCurso)) {
    return res.status(400).json({ error: 'Paso de quiz inválido para este curso' });
  }

  const correctIndex = quizzesDelCurso[paso_index];
  const correcto = Number(seleccionada) === correctIndex;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let porcentaje = 0;
    let completado = false;

    if (correcto) {
      // Idempotente: si ya lo había respondido bien antes, no pasa nada.
      await connection.query(
        `INSERT INTO progreso_pasos (usuario_id, curso_codigo, paso_index)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE fecha = CURRENT_TIMESTAMP`,
        [usuarioId, curso_codigo, paso_index]
      );

      const totalQuizzes = Object.keys(quizzesDelCurso).length;
      const [[{ respondidos }]] = await connection.query(
        `SELECT COUNT(DISTINCT paso_index) AS respondidos
         FROM progreso_pasos
         WHERE usuario_id = ? AND curso_codigo = ?`,
        [usuarioId, curso_codigo]
      );

      porcentaje = Math.round((respondidos / totalQuizzes) * 100);
      completado = respondidos >= totalQuizzes;

      await connection.query(
        `INSERT INTO progreso_cursos (usuario_id, curso_codigo, completado, porcentaje)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE completado = VALUES(completado), porcentaje = VALUES(porcentaje)`,
        [usuarioId, curso_codigo, completado ? 1 : 0, porcentaje]
      );
    }

    await connection.commit();
    res.json({ correcto, correctIndex, porcentaje, completado });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al validar la respuesta' });
  } finally {
    connection.release();
  }
});

export default router;