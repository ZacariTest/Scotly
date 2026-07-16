// Espejo server-side de las decisiones definidas en
// src/components/HistoriaData.js. Si cambiás los choices ahí, replicá el
// cambio acá (basePoints, region, y la cantidad de choices por decisión).
// Nunca se confía en los puntos que pueda mandar el cliente: solo se
// aceptan los índices de las opciones elegidas, y todo el cálculo se hace acá.

export const RAREZA_BONUS = {
  common: 0,
  rare: 1,
  epic: 2,
  legendary: 3,
};

export const HISTORIA_CAP1_DECISIONES = {
  d1: {
    choices: [
      { basePoints: 0, region: null },
      { basePoints: 2, region: "Escocia" },
      { basePoints: 1, region: "Gales" },
      { basePoints: 1, region: "Inglaterra" },
    ],
  },
  d2: {
    choices: [
      { basePoints: 1, region: null },
      { basePoints: 1, region: "Escocia" },
      { basePoints: 2, region: "Gales" },
      { basePoints: 1, region: "Inglaterra" },
    ],
  },
  d3: {
    choices: [
      { basePoints: 1, region: null },
      { basePoints: 2, region: "Escocia" },
      { basePoints: 1, region: "Gales" },
      { basePoints: 2, region: "Inglaterra" },
    ],
  },
  d4: {
    choices: [
      { basePoints: 1, region: null },
      { basePoints: 2, region: "Escocia" },
      { basePoints: 3, region: "Gales" },
      { basePoints: 2, region: "Inglaterra" },
    ],
  },
};

// Puntos totales posibles: mínimo 3 (siempre neutral), máximo 21
// (siempre la opción de tu región, con carta legendary: bonus +3 en cada una).
export function calcularResultado(puntosTotales) {
  if (puntosTotales >= 12) return "heroico";
  if (puntosTotales >= 6) return "equilibrado";
  return "discreto";
}

export const RECOMPENSAS_POR_RESULTADO = {
  heroico: { monedas: 100, puntos: 50 },
  equilibrado: { monedas: 60, puntos: 25 },
  discreto: { monedas: 30, puntos: 10 },
};