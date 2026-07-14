import pool from '../db.js';

// Reemplazá este email por el de la cuenta que querés convertir en admin
const ADMIN_EMAIL = 'admin@gmail.com';

async function seed() {
  try {
    // 1. Agrega la columna 'baneado' solo si no existe todavía
    const [columnas] = await pool.query(
      `SELECT COUNT(*) AS existe
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = 'usuarios'
         AND COLUMN_NAME = 'baneado'`
    );

    if (columnas[0].existe === 0) {
      await pool.query(
        `ALTER TABLE usuarios
         ADD COLUMN baneado TINYINT(1) NOT NULL DEFAULT 0 AFTER rol`
      );
      console.log('✅ Columna "baneado" creada en usuarios.');
    } else {
      console.log('ℹ️ Columna "baneado" ya existía, se omite.');
    }

    // 2. Promueve al usuario indicado a admin
    const [resultado] = await pool.query(
      `UPDATE usuarios SET rol = 'admin' WHERE email = ?`,
      [ADMIN_EMAIL]
    );

    if (resultado.affectedRows === 0) {
      console.log(`⚠️ No se encontró ningún usuario con email "${ADMIN_EMAIL}".`);
    } else {
      console.log(`✅ Usuario con email "${ADMIN_EMAIL}" ahora es admin.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();