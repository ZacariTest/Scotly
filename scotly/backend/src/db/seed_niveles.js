// backend/src/db/seed_niveles.js
import pool from '../db.js';
import { calcularNivelParaExp } from '../utils/niveles.js';

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
    if (await columnaExiste('nivel')) {
      console.log('ℹ️ nivel ya existe, se omite.');
    } else {
      await pool.query(
        `ALTER TABLE usuarios ADD COLUMN nivel INT NOT NULL DEFAULT 1 AFTER experiencia`
      );
      console.log('✅ Columna nivel agregada');
    }

    const [usuarios] = await pool.query('SELECT id, experiencia FROM usuarios');
    for (const u of usuarios) {
      const nivelCalculado = calcularNivelParaExp(u.experiencia);
      await pool.query('UPDATE usuarios SET nivel = ? WHERE id = ?', [nivelCalculado, u.id]);
    }
    console.log(`✅ Nivel recalculado para ${usuarios.length} usuarios`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();