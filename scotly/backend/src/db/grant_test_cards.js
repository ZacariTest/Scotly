import pool from '../db.js';

const EMAIL = process.argv[2];
const CODIGOS = ['Taliesin', 'duncan']; // ajustá los que quieras probar

async function grant() {
  if (!EMAIL) {
    console.error('❌ Uso: node src/db/grant_test_cards.js tu@email.com');
    process.exit(1);
  }

  try {
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [EMAIL]);
    if (usuarios.length === 0) {
      console.error('❌ Usuario no encontrado');
      process.exit(1);
    }
    const usuarioId = usuarios[0].id;

    for (const codigo of CODIGOS) {
      const [cartas] = await pool.query('SELECT id, nombre FROM cartas WHERE codigo = ?', [codigo]);
      if (cartas.length === 0) {
        console.log(`⚠️ Carta con código ${codigo} no existe en la DB, se omite.`);
        continue;
      }
      const carta = cartas[0];

      const [existente] = await pool.query(
        'SELECT id FROM inventario_cartas WHERE usuario_id = ? AND carta_id = ?',
        [usuarioId, carta.id]
      );

      if (existente.length > 0) {
        console.log(`ℹ️ Ya tenías a ${carta.nombre}, se omite.`);
        continue;
      }

      await pool.query(
        'INSERT INTO inventario_cartas (usuario_id, carta_id, cantidad) VALUES (?, ?, 1)',
        [usuarioId, carta.id]
      );
      console.log(`✅ ${carta.nombre} agregada al inventario de ${EMAIL}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

grant();