// backend/src/routes/gacha.js
import { Router } from 'express';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';
import { GACHA_CONFIG, ORDEN_RAREZA } from '../features/gacha/data/gachaConfig.js';

const router = Router();

function indiceRareza(rareza) {
  return ORDEN_RAREZA.indexOf(rareza);
}

function cumplePity(rareza) {
  return indiceRareza(rareza) >= indiceRareza(GACHA_CONFIG.pityRareza);
}

// Elige una rareza al azar respetando las probabilidades configuradas.
function elegirRarezaAleatoria() {
  const roll = Math.random();
  let acumulado = 0;

  for (const [rareza, prob] of Object.entries(GACHA_CONFIG.probabilidades)) {
    acumulado += prob;
    if (roll <= acumulado) return rareza;
  }

  // Red de seguridad por si hay error de redondeo en las probabilidades.
  const rarezas = Object.keys(GACHA_CONFIG.probabilidades);
  return rarezas[rarezas.length - 1];
}

// GET /api/gacha/estado — saldo actual y progreso de pity
router.get('/estado', verificarToken, async (req, res) => {
  try {
    const [filas] = await pool.query(
      'SELECT monedas, puntos, pity_contador FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );

    if (filas.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = filas[0];

    res.json({
      monedas: usuario.monedas,
      puntos: usuario.puntos,
      pity_contador: usuario.pity_contador,
      pity_umbral: GACHA_CONFIG.pityUmbral,
      pity_rareza: GACHA_CONFIG.pityRareza,
      costo_monedas: GACHA_CONFIG.costoMonedas,
      costo_puntos: GACHA_CONFIG.costoPuntos,
      probabilidades: GACHA_CONFIG.probabilidades,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estado del gacha' });
  }
});

// POST /api/gacha/tirar  { moneda: 'monedas' | 'puntos' }
router.post('/tirar', verificarToken, async (req, res) => {
  const { moneda } = req.body;
  const usuarioId = req.usuario.id;

  if (!['monedas', 'puntos'].includes(moneda)) {
    return res.status(400).json({ error: "El campo 'moneda' debe ser 'monedas' o 'puntos'" });
  }

  const costo = moneda === 'monedas' ? GACHA_CONFIG.costoMonedas : GACHA_CONFIG.costoPuntos;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Bloqueamos la fila del usuario para evitar tiradas dobles simultáneas
    // (ej. doble click) que dejen el saldo en un estado inconsistente.
    const [usuarios] = await connection.query(
      'SELECT monedas, puntos, pity_contador FROM usuarios WHERE id = ? FOR UPDATE',
      [usuarioId]
    );

    if (usuarios.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];
    const saldoActual = moneda === 'monedas' ? usuario.monedas : usuario.puntos;

    if (saldoActual < costo) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ error: 'Saldo insuficiente para esta tirada' });
    }

    // --- Determinar rareza obtenida (con pity) ---
    const pityActivado = usuario.pity_contador + 1 >= GACHA_CONFIG.pityUmbral;
    const rarezaObtenida = pityActivado ? GACHA_CONFIG.pityRareza : elegirRarezaAleatoria();
    const seResetaPity = cumplePity(rarezaObtenida);
    const nuevoPityContador = seResetaPity ? 0 : usuario.pity_contador + 1;

    // --- Elegir una carta al azar de esa rareza ---
    const [cartasDisponibles] = await connection.query(
      `SELECT id, codigo, nombre, rareza, hp, ataque, velocidad,
              habilidad_nombre, habilidad_descripcion, imagen
       FROM cartas
       WHERE rareza = ? AND activa = 1
       ORDER BY RAND()
       LIMIT 1`,
      [rarezaObtenida]
    );

    if (cartasDisponibles.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(500).json({ error: `No hay cartas disponibles de rareza '${rarezaObtenida}'` });
    }

    const cartaObtenida = cartasDisponibles[0];

    // --- Descontar saldo ---
    const campoMoneda = moneda === 'monedas' ? 'monedas' : 'puntos';
    await connection.query(
      `UPDATE usuarios
       SET ${campoMoneda} = ${campoMoneda} - ?, pity_contador = ?
       WHERE id = ?`,
      [costo, nuevoPityContador, usuarioId]
    );

    // --- Sumar la carta al inventario (o incrementar si ya la tenía) ---
    await connection.query(
      `INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad)
       VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE cantidad = cantidad + 1`,
      [usuarioId, cartaObtenida.id]
    );

    // --- Registrar la tirada en el historial ---
    await connection.query(
      `INSERT INTO tiradas_gacha
         (usuario_id, carta_id, moneda_usada, costo_puntos, costo_monedas, rareza_obtenida)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        usuarioId,
        cartaObtenida.id,
        moneda,
        moneda === 'puntos' ? costo : null,
        moneda === 'monedas' ? costo : null,
        rarezaObtenida,
      ]
    );

    await connection.commit();
    connection.release();

    const [usuarioActualizado] = await pool.query(
      'SELECT monedas, puntos, pity_contador FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    res.json({
      carta: {
        id: cartaObtenida.id,
        codigo: cartaObtenida.codigo,
        nombre: cartaObtenida.nombre,
        rareza: cartaObtenida.rareza,
        hp: cartaObtenida.hp,
        ataque: cartaObtenida.ataque,
        velocidad: cartaObtenida.velocidad,
        habilidad_nombre: cartaObtenida.habilidad_nombre,
        habilidad_descripcion: cartaObtenida.habilidad_descripcion,
        imagen: cartaObtenida.imagen,
      },
      fue_pity: pityActivado,
      usuario: usuarioActualizado[0],
      pity_umbral: GACHA_CONFIG.pityUmbral,
    });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la tirada de gacha' });
  }
});

export default router;