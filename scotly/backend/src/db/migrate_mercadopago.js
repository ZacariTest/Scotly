import pool from '../db.js';

async function columnaExiste(tabla, columna) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as total FROM information_schema.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [tabla, columna]
  );
  return rows[0].total > 0;
}

async function migrate() {
  try {
    // --- tienda_items: precio_ars ---
    if (!(await columnaExiste('tienda_items', 'precio_ars'))) {
      await pool.query(
        `ALTER TABLE tienda_items ADD COLUMN precio_ars DECIMAL(10,2) DEFAULT NULL AFTER precio_real`
      );
      console.log('✅ tienda_items.precio_ars agregada');
    } else {
      console.log('ℹ️ tienda_items.precio_ars ya existe, se omite.');
    }

    // --- compras: estado ---
    if (!(await columnaExiste('compras', 'estado'))) {
      await pool.query(
        `ALTER TABLE compras ADD COLUMN estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'aprobado' AFTER metodo_pago`
      );
      console.log('✅ compras.estado agregada');
    } else {
      console.log('ℹ️ compras.estado ya existe, se omite.');
    }

    // --- compras: mp_payment_id (+ índice único para idempotencia del webhook) ---
    if (!(await columnaExiste('compras', 'mp_payment_id'))) {
      await pool.query(
        `ALTER TABLE compras ADD COLUMN mp_payment_id VARCHAR(100) DEFAULT NULL AFTER estado`
      );
      await pool.query(
        `ALTER TABLE compras ADD UNIQUE KEY unico_mp_payment (mp_payment_id)`
      );
      console.log('✅ compras.mp_payment_id agregada (+ índice único)');
    } else {
      console.log('ℹ️ compras.mp_payment_id ya existe, se omite.');
    }

    // --- compras: mp_preference_id ---
    if (!(await columnaExiste('compras', 'mp_preference_id'))) {
      await pool.query(
        `ALTER TABLE compras ADD COLUMN mp_preference_id VARCHAR(100) DEFAULT NULL AFTER mp_payment_id`
      );
      console.log('✅ compras.mp_preference_id agregada');
    } else {
      console.log('ℹ️ compras.mp_preference_id ya existe, se omite.');
    }

    // --- compras.metodo_pago: sumar 'mercadopago' al ENUM (MODIFY es seguro de re-correr) ---
    await pool.query(
      `ALTER TABLE compras MODIFY COLUMN metodo_pago ENUM('tarjeta','paypal','transferencia','mercadopago') NOT NULL`
    );
    console.log('✅ compras.metodo_pago admite mercadopago');

// --- precios ARS de referencia (calculados a ~1.650 ARS/EUR, jul 2026) ---
    // ⚠️ Revisar y actualizar periódicamente — el tipo de cambio se mueve.
    const precios = {
      MONEDAS_60: 1630,
      MONEDAS_300: 8230,
      MONEDAS_980: 16480,
      MONEDAS_1980: 32980,
    };
    for (const [codigo, precio] of Object.entries(precios)) {
      const [result] = await pool.query(
        `UPDATE tienda_items SET precio_ars = ? WHERE codigo = ? AND precio_ars IS NULL`,
        [precio, codigo]
      );
      if (result.affectedRows > 0) {
        console.log(`✅ ${codigo} → precio_ars = ${precio}`);
      } else {
        console.log(`ℹ️ ${codigo} ya tenía precio_ars, se omite.`);
      }
    }

    console.log('🎉 Migración de MercadoPago completa');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en migración:', err.message);
    process.exit(1);
  }
}

migrate();