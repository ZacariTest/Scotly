import pool from '../db.js';

// Uso: node src/db/migrate_progreso_pasos.js
// Crea la tabla `progreso_pasos` y agrega la unique key que le faltaba
// a `progreso_cursos`. Es seguro correrlo más de una vez: si la unique
// key ya existe, lo avisa y sigue en vez de fallar.

async function migrar() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progreso_pasos (
        id bigint NOT NULL AUTO_INCREMENT,
        usuario_id bigint NOT NULL,
        curso_codigo varchar(100) NOT NULL,
        paso_index int NOT NULL,
        fecha timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY unico_paso (usuario_id, curso_codigo, paso_index),
        KEY usuario_id (usuario_id),
        CONSTRAINT progreso_pasos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `);
    console.log('✅ Tabla progreso_pasos lista');

    try {
      await pool.query(`
        ALTER TABLE progreso_cursos
        ADD UNIQUE KEY unico_progreso (usuario_id, curso_codigo)
      `);
      console.log('✅ Unique key agregada a progreso_cursos');
    } catch (err) {
      if (err.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  progreso_cursos ya tenía la unique key, no hace falta nada');
      } else {
        throw err;
      }
    }

    console.log('✅ Migración completa');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en la migración:', err.message);
    process.exit(1);
  }
}

migrar();