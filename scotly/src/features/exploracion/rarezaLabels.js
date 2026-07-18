// src/features/exploracion/rarezaLabels.js
//
// El backend y `characters.js` guardan la rareza en inglés
// ("common" | "rare" | "epic" | "legendary"). A nivel de UI siempre se
// muestra en español. Centralizado acá para no repetir el mapeo en cada
// componente que toque rarezas (gacha, inventario, exploración, etc.)

export const RAREZA_LABELS = {
  common: 'Común',
  rare: 'Rara',
  epic: 'Épica',
  legendary: 'Legendaria',
};

export const RAREZA_COLORS = {
  common: '#9aa0a6',
  rare: '#4a90d9',
  epic: '#a855f7',
  legendary: '#f5a623',
};

export function labelRareza(rareza) {
  return RAREZA_LABELS[rareza] ?? rareza;
}
