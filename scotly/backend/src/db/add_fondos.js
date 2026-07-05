import pool from '../db.js';

// Uso: node src/db/add_fondos.js <email> <monedas> <puntos>
// Ejemplo: node src/db/add_fondos.js Lira@gmail.com 1000 500

async function addFondos() {
  const [, , email, monedasArg, puntosArg] = process.argv;

  if (!email) {
    console.error('❌ Uso: node src/db/add_fondos.js <email> <monedas> <puntos>');
    process.exit(1);
  }

  const monedas = Number(monedasArg) || 0;
  const puntos = Number(puntosArg) || 0;

  try {
    const [usuarios] = await pool.query(
      'SELECT id, username, monedas, puntos FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuarios.length === 0) {
      console.error(`❌ No se encontró ningún usuario con email '${email}'`);
      process.exit(1);
    }

    const usuario = usuarios[0];

    await pool.query(
      'UPDATE usuarios SET monedas = monedas + ?, puntos = puntos + ? WHERE id = ?',
      [monedas, puntos, usuario.id]
    );

    console.log(
      `✅ ${usuario.username}: +${monedas} monedas, +${puntos} puntos ` +
      `(antes: ${usuario.monedas} monedas / ${usuario.puntos} puntos)`
    );
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al agregar fondos:', err.message);
    process.exit(1);
  }
}

addFondos();