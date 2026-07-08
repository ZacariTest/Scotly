// backend/src/features/inventario/data/inventarioConfig.js
//
// Sistema de nivel por duplicados: cada carta repetida se puede consumir
// para subir de nivel a la que ya tenés, en vez de quedar como un ítem
// separado en el inventario (igual que las constelaciones de Genshin).

export const NIVEL_BASE = 1;
export const NIVEL_MAXIMO = 7;   // nivel 1 (base) + 6 subidas, como C0 a C6
export const COSTO_NIVEL = 1;    // duplicadas necesarias para subir 1 nivel