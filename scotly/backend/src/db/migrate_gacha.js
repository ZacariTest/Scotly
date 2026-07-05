import pool from '../db.js';

async function columnaExiste(tabla, columna) {
  const [filas] = await pool.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [tabla, columna]
  );
  return filas.length > 0;
}

async function indiceExiste(tabla, nombreIndice) {
  const [filas] = await pool.query(
    `SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    [tabla, nombreIndice]
  );
  return filas.length > 0;
}

async function migrar() {
  try {
    // 1. Contador de pity en usuarios
    if (await columnaExiste('usuarios', 'pity_contador')) {
      console.log('ℹ️ usuarios.pity_contador ya existe, se omite.');
    } else {
      await pool.query(
        'ALTER TABLE usuarios ADD COLUMN pity_contador INT NOT NULL DEFAULT 0'
      );
      console.log('✅ usuarios.pity_contador agregada.');
    }

    // 2. Columnas nuevas en tiradas_gacha
    if (await columnaExiste('tiradas_gacha', 'moneda_usada')) {
      console.log('ℹ️ tiradas_gacha.moneda_usada ya existe, se omite.');
    } else {
      await pool.query(`
        ALTER TABLE tiradas_gacha
          MODIFY COLUMN costo_puntos INT NULL,
          ADD COLUMN moneda_usada ENUM('monedas','puntos') NOT NULL AFTER carta_id,
          ADD COLUMN costo_monedas INT NULL AFTER costo_puntos,
          ADD COLUMN rareza_obtenida ENUM('common','rare','epic','legendary') NOT NULL AFTER moneda_usada
      `);
      console.log('✅ tiradas_gacha ampliada con moneda_usada, costo_monedas y rareza_obtenida.');
    }

    // 3. Restricción única en inventario_cartas (usuario_id, carta_id)
    if (await indiceExiste('inventario_cartas', 'unico_usuario_carta')) {
      console.log('ℹ️ inventario_cartas.unico_usuario_carta ya existe, se omite.');
    } else {
      await pool.query(`
        ALTER TABLE inventario_cartas
          ADD UNIQUE KEY unico_usuario_carta (usuario_id, carta_id)
      `);
      console.log('✅ inventario_cartas: restricción única agregada.');
    }

    console.log('🏁 Migración de gacha completada.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en migración de gacha:', err.message);
    process.exit(1);
  }
}

migrar();