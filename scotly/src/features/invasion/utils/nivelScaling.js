// src/features/invasion/utils/nivelScaling.js
//
// Traduce el nivel de una carta (ganado subiendo con duplicadas en el
// inventario) en un bonus de stats para la batalla de Invasión.
// Mantenido en sync a mano con NIVEL_MAXIMO de
// backend/src/features/inventario/data/inventarioConfig.js.

export const NIVEL_MAXIMO = 7;
export const BONUS_POR_NIVEL = 0.08; // +8% de HP y ATK por cada nivel sobre el 1

// Aplica el escalado de nivel a un personaje base de CHARACTERS.
// No modifica el objeto original; devuelve una copia con hp/attack ajustados.
export function aplicarEscaladoPorNivel(personajeBase, nivel = 1) {
  const nivelesGanados = Math.max(0, Math.min(nivel, NIVEL_MAXIMO) - 1);
  const multiplicador = 1 + nivelesGanados * BONUS_POR_NIVEL;

  return {
    ...personajeBase,
    hp: Math.round(personajeBase.hp * multiplicador),
    attack: Math.round(personajeBase.attack * multiplicador),
    nivel,
  };
}