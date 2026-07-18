import pool from '../db.js';

// Uso: node src/db/migrate_exploraciones.js
// Crea la tabla `exploraciones` si todavía no existe. Es seguro correrlo
// más de una vez (usa CREATE TABLE IF NOT EXISTS).

const SQL_EXPLORACIONES = `
CREATE TABLE IF NOT EXISTS exploraciones (
  id BIGINT NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  carta_id BIGINT NOT NULL,
  rareza ENUM('common','rare','epic','legendary') NOT NULL,
  inicio DATETIME NOT NULL,
  fin DATETIME NOT NULL,
  recompensa_puntos INT NOT NULL DEFAULT 0,
  recompensa_monedas INT NOT NULL DEFAULT 0,
  reclamado TINYINT(1) NOT NULL DEFAULT 0,
  fecha_reclamo DATETIME NULL,
  creado_en TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),

  KEY usuario_id (usuario_id),
  KEY carta_id (carta_id),
  KEY idx_exploraciones_usuario_activa (usuario_id, reclamado),

  CONSTRAINT exploraciones_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT exploraciones_ibfk_2 FOREIGN KEY (carta_id) REFERENCES cartas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

async function migrar() {
  try {
    await pool.query(SQL_EXPLORACIONES);
    console.log('✅ Tabla `exploraciones` lista (creada o ya existía).');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al migrar la tabla `exploraciones`:', err.message);
    process.exit(1);
  }
}

migrar();