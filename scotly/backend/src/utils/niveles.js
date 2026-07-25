// backend/src/utils/niveles.js
//
// Copia local de shared/niveles.js — duplicado a propósito para que el
// backend no dependa de una carpeta fuera de backend/ (Railway solo
// buildea backend/ como Root Directory, así que un import a ../../../shared
// rompe en producción aunque funcione en local).
//
// Mantenido en sync a mano con shared/niveles.js (usado por el frontend) y
// con src/features/invasion/utils/nivelScaling.js.

export const NIVEL_MAX = 50;
export const EXP_POR_PASO = 50;

export const TITULOS = [
  { desde: 1, titulo: 'Aprendiz' },
  { desde: 10, titulo: 'Explorador' },
  { desde: 20, titulo: 'Veterano' },
  { desde: 30, titulo: 'Campeón' },
  { desde: 40, titulo: 'Héroe de las Highlands' },
  { desde: 50, titulo: 'Leyenda de Britania' },
];

export function calcularNivelParaExp(experiencia) {
  const nivel = Math.floor(Math.sqrt(experiencia / EXP_POR_PASO)) + 1;
  return Math.min(NIVEL_MAX, Math.max(1, nivel));
}

export function expNecesariaParaNivel(nivel) {
  return EXP_POR_PASO * Math.pow(nivel - 1, 2);
}

export function obtenerTitulo(nivel) {
  const match = [...TITULOS].reverse().find((t) => nivel >= t.desde);
  return match ? match.titulo : TITULOS[0].titulo;
}

export function obtenerProgresoNivel(experiencia) {
  const nivel = calcularNivelParaExp(experiencia);
  const titulo = obtenerTitulo(nivel);

  if (nivel >= NIVEL_MAX) {
    return { nivel, titulo, expActual: experiencia, expSiguienteNivel: null, progreso: 1 };
  }

  const expNivelActual = expNecesariaParaNivel(nivel);
  const expNivelSiguiente = expNecesariaParaNivel(nivel + 1);
  const progreso = (experiencia - expNivelActual) / (expNivelSiguiente - expNivelActual);

  return {
    nivel,
    titulo,
    expActual: experiencia,
    expSiguienteNivel: expNivelSiguiente,
    progreso: Math.min(1, Math.max(0, progreso)),
  };
}

// Recalcula y persiste el nivel de un usuario — llamar siempre que
// experiencia cambie, dentro de la misma transacción/conexión.
export async function recalcularNivel(conn, usuarioId) {
  const [rows] = await conn.query('SELECT experiencia FROM usuarios WHERE id = ?', [usuarioId]);
  if (!rows.length) return null;

  const nuevoNivel = calcularNivelParaExp(rows[0].experiencia);
  await conn.query('UPDATE usuarios SET nivel = ? WHERE id = ?', [nuevoNivel, usuarioId]);
  return nuevoNivel;
}