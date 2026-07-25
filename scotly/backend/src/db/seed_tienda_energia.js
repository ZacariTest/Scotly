// backend/src/db/seed_tienda_energia.js
import pool from '../db.js';

async function seed() {
  try {
    const [resultPocion] = await pool.query(
      "UPDATE tienda_items SET tipo = 'energia', cantidad_otorgada = 2 WHERE codigo = 'ENERGIA_POCION'"
    );
    if (resultPocion.affectedRows > 0) {
      console.log('✅ ENERGIA_POCION ajustada a tipo energia, 2 de energía');
    } else {
      console.log('ℹ️ No se encontró el ítem ENERGIA_POCION, se omite.');
    }

    const [resultScones] = await pool.query(
      "UPDATE tienda_items SET tipo = 'energia', cantidad_otorgada = 1 WHERE codigo = 'OBJ_SCONES'"
    );
    if (resultScones.affectedRows > 0) {
      console.log('✅ OBJ_SCONES ajustado a tipo energia, 1 de energía');
    } else {
      console.log('ℹ️ No se encontró el ítem OBJ_SCONES, se omite.');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();