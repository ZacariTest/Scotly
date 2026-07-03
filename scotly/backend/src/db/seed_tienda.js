import pool from '../db.js';

async function seed() {
  try {
    // Objetos / cosméticos de la tienda
    const items = [
      {
        codigo: 'COSM_ROPAJES',
        nombre: 'Ropajes de las Highlands',
        tipo: 'cosmetico',
        descripcion: 'Vestimenta ceremonial escocesa para tu perfil.',
        precio_monedas: 50,
        cantidad_otorgada: 1,
      },
      {
        codigo: 'OBJ_SCONES',
        nombre: 'Scones',
        tipo: 'objeto',
        descripcion: 'Un clásico de la repostería escocesa.',
        precio_monedas: 20,
        cantidad_otorgada: 1,
      },
      {
        codigo: 'ENERGIA_POCION',
        nombre: 'Poción de energía',
        tipo: 'energia',
        descripcion: 'Restaura energía para seguir jugando.',
        precio_monedas: 30,
        cantidad_otorgada: 20,
      },
    ];

    for (const item of items) {
      const [existe] = await pool.query(
        'SELECT id FROM tienda_items WHERE codigo = ?',
        [item.codigo]
      );
      if (existe.length > 0) {
        console.log(`ℹ️ ${item.codigo} ya existe, se omite.`);
        continue;
      }
      await pool.query(
        `INSERT INTO tienda_items (codigo, nombre, tipo, descripcion, precio_monedas, cantidad_otorgada, activo)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [item.codigo, item.nombre, item.tipo, item.descripcion, item.precio_monedas, item.cantidad_otorgada]
      );
      console.log(`✅ ${item.codigo} insertado`);
    }

    // Carta destacada de temporada: Alasdair
    const [alasdairExiste] = await pool.query(
      'SELECT id FROM cartas WHERE codigo = ?',
      ['ALASDAIR']
    );

    if (alasdairExiste.length === 0) {
      await pool.query(
        `INSERT INTO cartas (codigo, nombre, rareza, hp, ataque, velocidad, habilidad_nombre, habilidad_descripcion, imagen, activa, precio_monedas, disponible_tienda)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 1)`,
        [
          'ALASDAIR', 'Alasdair', 'epic', 120, 18, 12,
          'Conocimiento Antiguo', 'Sube su ataque 30% por 2 turnos',
          '/img/Alasdair.png', 299
        ]
      );
      console.log('✅ Alasdair insertado como destacado de temporada');
    } else {
      await pool.query(
        'UPDATE cartas SET disponible_tienda = 1, precio_monedas = 299 WHERE codigo = ?',
        ['ALASDAIR']
      );
      console.log('ℹ️ Alasdair ya existía, se marcó como destacado');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();