import express from "express";
import pool from "../db.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();

const REGEN_MINUTOS = 20; // minutos por punto de energía — ajustable

function calcularEnergiaActual(energiaGuardada, energiaMax, actualizadaEn) {
  if (energiaGuardada >= energiaMax) {
    return { energia: energiaGuardada, segundosParaProxima: null, puntosGanados: 0 };
  }

  const segundosTranscurridos = Math.floor((Date.now() - new Date(actualizadaEn).getTime()) / 1000);
  const segundosPorPunto = REGEN_MINUTOS * 60;
  const puntosGanados = Math.floor(segundosTranscurridos / segundosPorPunto);
  const energiaActual = Math.min(energiaMax, energiaGuardada + puntosGanados);

  let segundosParaProxima = null;
  if (energiaActual < energiaMax) {
    segundosParaProxima = segundosPorPunto - (segundosTranscurridos % segundosPorPunto);
  }

  return { energia: energiaActual, segundosParaProxima, puntosGanados };
}

// Recalcula la energía real (regeneración incluida) y la persiste si cambió.
async function sincronizarEnergia(usuarioId) {
  const [rows] = await pool.query(
    "SELECT energia, energia_max, energia_actualizada_en FROM usuarios WHERE id = ?",
    [usuarioId]
  );
  if (!rows.length) throw new Error("Usuario no encontrado");

  const { energia, energia_max, energia_actualizada_en } = rows[0];
  const { energia: energiaActual, segundosParaProxima, puntosGanados } =
    calcularEnergiaActual(energia, energia_max, energia_actualizada_en);

  if (puntosGanados > 0) {
    await pool.query(
      "UPDATE usuarios SET energia = ?, energia_actualizada_en = ? WHERE id = ?",
      [energiaActual, new Date(), usuarioId]
    );
  }

  return { energia: energiaActual, energia_max, segundos_para_proxima: segundosParaProxima };
}

router.get("/estado", verificarToken, async (req, res) => {
  try {
    const estado = await sincronizarEnergia(req.usuario.id);
    res.json(estado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo consultar la energía" });
  }
});

router.post("/gastar", verificarToken, async (req, res) => {
  const { cantidad = 1 } = req.body;

  try {
    const estado = await sincronizarEnergia(req.usuario.id);

    if (estado.energia < cantidad) {
      return res.status(409).json({
        energia: estado.energia,
        energia_max: estado.energia_max,
        segundos_para_proxima: estado.segundos_para_proxima,
        error: "Energía insuficiente",
      });
    }

    const nuevaEnergia = estado.energia - cantidad;
    await pool.query(
      "UPDATE usuarios SET energia = ?, energia_actualizada_en = ? WHERE id = ?",
      [nuevaEnergia, new Date(), req.usuario.id]
    );

    const nuevoSegundos =
      nuevaEnergia < estado.energia_max ? REGEN_MINUTOS * 60 : null;

    res.json({
      energia: nuevaEnergia,
      energia_max: estado.energia_max,
      segundos_para_proxima: nuevoSegundos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo descontar energía" });
  }
});

export default router;