// backend/src/db/seed_energia.js
import pool from '../db.js';

const ENERGIA_MAX_DEFAULT = 5;

async function columnaExiste(nombreColumna) {
  const [rows] = await pool.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'usuarios'
       AND COLUMN_NAME = ?`,
    [nombreColumna]
  );
  return rows.length > 0;
}

async function seed() {
  try {
    if (await columnaExiste('energia_max')) {
      console.log('ℹ️ energia_max ya existe, se omite.');
    } else {
      await pool.query(
        `ALTER TABLE usuarios
         ADD COLUMN energia_max INT NOT NULL DEFAULT ? AFTER energia`,
        [ENERGIA_MAX_DEFAULT]
      );
      console.log('✅ Columna energia_max agregada');
    }

    if (await columnaExiste('energia_actualizada_en')) {
      console.log('ℹ️ energia_actualizada_en ya existe, se omite.');
    } else {
      await pool.query(
        `ALTER TABLE usuarios
         ADD COLUMN energia_actualizada_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER energia_max`
      );
      console.log('✅ Columna energia_actualizada_en agregada');
    }

    // Asegura que el default de "energia" quede alineado con energia_max,
    // así los registros nuevos arrancan con el tope correcto.
    await pool.query(
      `ALTER TABLE usuarios MODIFY COLUMN energia INT NOT NULL DEFAULT ?`,
      [ENERGIA_MAX_DEFAULT]
    );
    console.log(`✅ Default de energia ajustado a ${ENERGIA_MAX_DEFAULT}`);

    const [resultado] = await pool.query(
      'UPDATE usuarios SET energia = LEAST(energia, energia_max)'
    );
    console.log(`✅ Energía ajustada al tope en ${resultado.affectedRows} usuarios`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();