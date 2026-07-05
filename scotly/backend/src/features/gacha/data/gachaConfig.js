// backend/src/features/gacha/data/gachaConfig.js
//
// Balance del sistema de Gacha. Cambiar estos valores no requiere tocar
// la lógica del endpoint (backend/src/routes/gacha.js).

export const GACHA_CONFIG = {
  // Costo de una tirada individual, según la moneda elegida por el usuario.
  costoMonedas: 100,
  costoPuntos: 40,

  // Probabilidad de obtener cada rareza en una tirada normal (sin pity).
  // Deben sumar 1.
  probabilidades: {
    common: 0.60,
    rare: 0.30,
    epic: 0.10,
    // legendary: 0 -- todavía no hay cartas legendary en el juego
  },

  // Si el usuario lleva "pityUmbral" tiradas sin sacar una carta de
  // "pityRareza" o superior, la siguiente tirada la garantiza.
  pityUmbral: 10,
  pityRareza: "epic",
};

// Orden de rareza, de menor a mayor. Se usa para saber qué rarezas
// cuentan como "iguales o superiores" a la rareza de pity.
export const ORDEN_RAREZA = ["common", "rare", "epic", "legendary"];