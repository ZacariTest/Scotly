import pool from '../db.js';

async function updateImagen() {
  try {
    const [resultado] = await pool.query(
      'UPDATE cartas SET imagen = ? WHERE codigo = ?',
      ['/img/BON2.PNG', 'FOUNDERS_BONNIE']
    );

    if (resultado.affectedRows === 0) {
      console.log('⚠️ No se encontró ninguna carta con codigo FOUNDERS_BONNIE.');
    } else {
      console.log('✅ Imagen de Bonnie actualizada correctamente');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error al actualizar imagen:', err.message);
    process.exit(1);
  }
}

updateImagen();