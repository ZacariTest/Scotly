import pool from '../db.js';

async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE tienda_items 
      MODIFY tipo ENUM('energia','boost','cosmetico','objeto','moneda') NOT NULL
    `);
    console.log('✅ tienda_items.tipo actualizado');

    await pool.query(`
      ALTER TABLE cartas 
      ADD COLUMN precio_monedas INT NULL,
      ADD COLUMN disponible_tienda TINYINT(1) NOT NULL DEFAULT 0
    `);
    console.log('✅ cartas: columnas de tienda agregadas');

    await pool.query(`
      ALTER TABLE compras 
      MODIFY tipo ENUM('moneda','item','curso','carta') NOT NULL
    `);
    console.log('✅ compras.tipo actualizado');

    process.exit(0);
  } catch (err) {
    if (err.message.includes('Duplicate column name')) {
      console.log('ℹ️ Las columnas ya existen, no se duplican.');
      process.exit(0);
    }
    console.error('❌ Error en migración:', err.message);
    process.exit(1);
  }
}

migrate();