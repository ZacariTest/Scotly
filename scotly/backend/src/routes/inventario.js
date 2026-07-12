import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { NIVEL_MAXIMO, COSTO_NIVEL } from '../features/inventario/data/inventarioConfig.js';
import { COURSE_REWARDS } from '../features/inventario/data/courseRewards.js';

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

// POST /api/inventario/recompensa-curso  { curso_codigo }
// Otorga las cartas y la experiencia de completar un curso, una sola vez por curso.
// Las cartas y la XP se leen de COURSE_REWARDS (server), NUNCA del body:
// si el cliente pudiera mandar `cartas`/`experiencia`, podría inventar
// cualquier curso_codigo y farmear cartas/XP infinitas.
router.post('/recompensa-curso', verificarToken, async (req, res) => {
  const { curso_codigo } = req.body;
  const usuarioId = req.usuario.id;

  if (!curso_codigo) {
    return res.status(400).json({ error: 'Falta curso_codigo' });
  }

  const recompensa = COURSE_REWARDS[curso_codigo];
  if (!recompensa) {
    return res.status(400).json({ error: 'Curso desconocido' });
  }

  const { cartas, experiencia, puntos } = recompensa;
  const codigoRegalo = `curso_${curso_codigo}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // El progreso real (quizzes validados en el server) tiene que existir
    // y estar marcado como completado. Sin esto, cualquiera podía pegarle
    // directo a este endpoint sin haber contestado nada.
    const [[progreso]] = await connection.query(
      'SELECT completado FROM progreso_cursos WHERE usuario_id = ? AND curso_codigo = ?',
      [usuarioId, curso_codigo]
    );

    if (!progreso || !progreso.completado) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({ error: 'Todavía no completaste este curso' });
    }

    // Evita reclamar la recompensa del mismo curso más de una vez
    const [yaReclamado] = await connection.query(
      'SELECT id FROM regalos_reclamados WHERE usuario_id = ? AND codigo_regalo = ? FOR UPDATE',
      [usuarioId, codigoRegalo]
    );

    if (yaReclamado.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(409).json({ error: 'Ya reclamaste la recompensa de este curso' });
    }

    // Busca las cartas por código (sin duplicados para el WHERE IN)
    const codigosUnicos = [...new Set(cartas)];
    const [filasCartas] = await connection.query(
      `SELECT id, codigo FROM cartas WHERE codigo IN (${codigosUnicos.map(() => '?').join(',')})`,
      codigosUnicos
    );

    if (filasCartas.length !== codigosUnicos.length) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'Alguna de las cartas de recompensa no existe' });
    }

    const idPorCodigo = Object.fromEntries(filasCartas.map((c) => [c.codigo, c.id]));

    // Otorga cada carta (respetando duplicados, ej: 2 de la misma) y lo registra en `recompensas`
    for (const codigo of cartas) {
      const cartaId = idPorCodigo[codigo];

      const [existe] = await connection.query(
        'SELECT id FROM inventario_cartas WHERE usuario_id = ? AND carta_id = ? FOR UPDATE',
        [usuarioId, cartaId]
      );

      if (existe.length > 0) {
        await connection.query(
          'UPDATE inventario_cartas SET cantidad = cantidad + 1 WHERE id = ?',
          [existe[0].id]
        );
      } else {
        await connection.query(
          'INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad) VALUES (?, ?, 1)',
          [usuarioId, cartaId]
        );
      }

      await connection.query(
        `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad, carta_id) VALUES (?, ?, 'carta', 1, ?)`,
        [usuarioId, codigoRegalo, cartaId]
      );
    }

    // Suma experiencia (validada en el server, no confiar ciegamente en el valor del cliente)
    const xp = Number.isFinite(experiencia) ? Math.max(0, Math.min(1000, Math.floor(experiencia))) : 0;
    if (xp > 0) {
      await connection.query(
        'UPDATE usuarios SET experiencia = experiencia + ? WHERE id = ?',
        [xp, usuarioId]
      );
    }

    // Suma puntos ("Provisiones" en el front)
    const puntosOtorgados = Number.isFinite(puntos) ? Math.max(0, Math.min(1000, Math.floor(puntos))) : 0;
    if (puntosOtorgados > 0) {
      await connection.query(
        'UPDATE usuarios SET puntos = puntos + ? WHERE id = ?',
        [puntosOtorgados, usuarioId]
      );
      await connection.query(
        `INSERT INTO recompensas (usuario_id, origen, tipo, cantidad) VALUES (?, ?, 'punto', ?)`,
        [usuarioId, codigoRegalo, puntosOtorgados]
      );
    }

    // Marca el curso como reclamado
    await connection.query(
      'INSERT INTO regalos_reclamados (usuario_id, codigo_regalo) VALUES (?, ?)',
      [usuarioId, codigoRegalo]
    );

    await connection.commit();

    const [usuarios] = await pool.query(
      'SELECT id, username, email, monedas, puntos, energia, experiencia, rol, foto_perfil FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    res.json({ usuario: usuarios[0], cartas: filasCartas.map((c) => c.codigo) });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al otorgar la recompensa' });
  } finally {
    connection.release();
  }
});

export default router;