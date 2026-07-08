import pool from '../db.js';

async function seed() {
  try {
    // Paquetes de monedas (compra con dinero real, estilo HoYoverse)
    const paquetesMonedas = [
      {
        codigo: 'MONEDAS_60',
        nombre: 'Monedas x60',
        descripcion: 'Bono de bienvenida: +60 monedas extra',
        precio_real: 0.99,
        cantidad_otorgada: 120,
      },
      {
        codigo: 'MONEDAS_300',
        nombre: 'Monedas x300',
        descripcion: 'Bono: +300 monedas extra',
        precio_real: 4.99,
        cantidad_otorgada: 600,
      },
      {
        codigo: 'MONEDAS_980',
        nombre: 'Monedas x980',
        descripcion: 'Bono: +196 monedas extra (20%)',
        precio_real: 9.99,
        cantidad_otorgada: 1176,
      },
      {
        codigo: 'MONEDAS_1980',
        nombre: 'Monedas x1980',
        descripcion: 'Bono: +495 monedas extra (25%)',
        precio_real: 19.99,
        cantidad_otorgada: 2475,
      },
    ];

    for (const paquete of paquetesMonedas) {
      const [existe] = await pool.query(
        'SELECT id FROM tienda_items WHERE codigo = ?',
        [paquete.codigo]
      );
      if (existe.length > 0) {
        console.log(`ℹ️ ${paquete.codigo} ya existe, se omite.`);
        continue;
      }
      await pool.query(
        `INSERT INTO tienda_items (codigo, nombre, tipo, descripcion, precio_monedas, precio_real, cantidad_otorgada, activo)
         VALUES (?, ?, 'moneda', ?, NULL, ?, ?, 1)`,
        [paquete.codigo, paquete.nombre, paquete.descripcion, paquete.precio_real, paquete.cantidad_otorgada]
      );
      console.log(`✅ ${paquete.codigo} insertado`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();