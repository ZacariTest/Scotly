// backend/src/db/seed_renombrar_cofre.js
import pool from '../db.js';

async function seed() {
  try {
    const [resultado] = await pool.query(
      "UPDATE tienda_items SET nombre = 'Cofre sorpresa' WHERE codigo = 'COSM_ROPAJES'"
    );
    if (resultado.affectedRows > 0) {
      console.log('✅ COSM_ROPAJES renombrado a "Cofre sorpresa"');
    } else {
      console.log('ℹ️ No se encontró el ítem COSM_ROPAJES, se omite.');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();