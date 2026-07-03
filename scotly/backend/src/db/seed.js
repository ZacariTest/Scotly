import pool from '../db.js';

async function seed() {
  try {
    const [existentes] = await pool.query(
      'SELECT id FROM cartas WHERE codigo = ?',
      ['FOUNDERS_BONNIE']
    );

    if (existentes.length > 0) {
      console.log('ℹ️ La carta Bonnie ya existe, no se duplica.');
      process.exit(0);
    }

    await pool.query(
      `INSERT INTO cartas (codigo, nombre, rareza, hp, ataque, velocidad, habilidad_nombre, habilidad_descripcion, imagen, activa)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'FOUNDERS_BONNIE',
        'Bonnie',
        'epic',
        120,
        18,
        22,
        'Llamado del Bosque',
        'Otorga +30% de ataque a todos los aliados por 2 turnos.',
        '/img/Bonnie-3.png',
        1
      ]
    );

    console.log('✅ Carta Bonnie insertada correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();