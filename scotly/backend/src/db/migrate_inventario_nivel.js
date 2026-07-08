import pool from '../db.js';

async function columnaExiste(tabla, columna) {
  const [filas] = await pool.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [tabla, columna]
  );
  return filas.length > 0;
}

async function migrar() {
  try {
    if (await columnaExiste('inventario_cartas', 'nivel')) {
      console.log('ℹ️ inventario_cartas.nivel ya existe, se omite.');
    } else {
      await pool.query(
        'ALTER TABLE inventario_cartas ADD COLUMN nivel INT NOT NULL DEFAULT 1'
      );
      console.log('✅ inventario_cartas.nivel agregada (todas las cartas existentes arrancan en nivel 1).');
    }

    console.log('🏁 Migración de niveles de inventario completada.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en migración:', err.message);
    process.exit(1);
  }
}

migrar();