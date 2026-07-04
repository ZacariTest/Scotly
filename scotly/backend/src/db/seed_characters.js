import pool from '../db.js';
import { CHARACTERS } from '../../../src/features/invasion/data/characters.js';

async function seed() {
  try {
    for (const char of CHARACTERS) {
      const [existe] = await pool.query(
        'SELECT id FROM cartas WHERE codigo = ?',
        [char.id]
      );
      if (existe.length > 0) {
        console.log(`ℹ️ ${char.id} ya existe, se omite.`);
        continue;
      }
      await pool.query(
        `INSERT INTO cartas (codigo, nombre, rareza, hp, ataque, velocidad, habilidad_nombre, habilidad_descripcion, imagen, activa)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [char.id, char.name, char.rarity, char.hp, char.attack, char.speed, char.skill.name, char.skill.description, char.img]
      );
      console.log(`✅ ${char.id} insertado`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  }
}

seed();