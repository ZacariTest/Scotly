import pool from '../db.js';

async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE usuarios 
      ADD COLUMN foto_perfil LONGTEXT NULL
    `);
    console.log('✅ Columna foto_perfil agregada');
    process.exit(0);
  } catch (err) {
    if (err.message.includes('Duplicate column name')) {
      console.log('ℹ️ La columna ya existe.');
      process.exit(0);
    }
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

migrate();