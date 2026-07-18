// backend/src/features/exploracion/data/exploracionConfig.js
//
// Balance del sistema de Exploración. Cambiar estos valores no requiere
// tocar la lógica del endpoint (backend/src/routes/exploracion.js).
//
// Usa las mismas rarezas que gachaConfig.js (en inglés, a nivel backend):
// "common", "rare", "epic", "legendary".

export const EXPLORACION_CONFIG = {
  // Duración de la exploración según la rareza de la carta enviada.
  // Base pedida: 12h. Las rarezas más altas exploran más tiempo pero
  // rinden más recompensa (ver multiplicadorPuntos abajo).
  duracionHorasPorRareza: {
    common: 12,
    rare: 16,
    epic: 20,
    legendary: 24,
  },

  // Recursos (columna `puntos` = "Provisiones" en el front) otorgados al
  // reclamar. Referencia: una tirada de gacha cuesta 40 puntos o 100
  // monedas, así que 10 puntos base por exploración (común) es ~1/4 de
  // una tirada por una acción pasiva de 12h — se siente como un extra,
  // no reemplaza jugar.
  recompensaBasePuntos: 10,
  multiplicadorPuntosPorRareza: {
    common: 1,
    rare: 1.4,
    epic: 1.8,
    legendary: 2.5,
  },

  // Monedas: bonus no garantizado, para que reclamar tenga algo de sorpresa.
  probabilidadMonedas: 0.35,
  monedasMin: 5,
  monedasMax: 20,
};

// Redondea la recompensa final de puntos para una rareza dada.
export function calcularRecompensaPuntos(rareza) {
  const multiplicador = EXPLORACION_CONFIG.multiplicadorPuntosPorRareza[rareza] ?? 1;
  return Math.round(EXPLORACION_CONFIG.recompensaBasePuntos * multiplicador);
}

// Tira si hay bonus de monedas y cuánto, para una rareza dada.
export function calcularRecompensaMonedas() {
  if (Math.random() >= EXPLORACION_CONFIG.probabilidadMonedas) return 0;
  const { monedasMin, monedasMax } = EXPLORACION_CONFIG;
  return monedasMin + Math.floor(Math.random() * (monedasMax - monedasMin + 1));
}

export function calcularDuracionHoras(rareza) {
  return EXPLORACION_CONFIG.duracionHorasPorRareza[rareza] ?? EXPLORACION_CONFIG.duracionHorasPorRareza.common;
}
