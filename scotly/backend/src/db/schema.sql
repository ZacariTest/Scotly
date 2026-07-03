-- 1. USUARIOS
CREATE TABLE usuarios (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  monedas INT(11) NOT NULL DEFAULT 0,
  puntos INT(11) NOT NULL DEFAULT 0,
  energia INT(11) NOT NULL DEFAULT 100,
  experiencia INT(11) NOT NULL DEFAULT 0,
  rol ENUM('usuario','admin','profesor') NOT NULL DEFAULT 'usuario',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CARTAS
CREATE TABLE cartas (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(100) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  rareza ENUM('common','rare','epic','legendary') NOT NULL,
  hp INT(11) NOT NULL,
  ataque INT(11) NOT NULL,
  velocidad INT(11) NOT NULL,
  habilidad_nombre VARCHAR(100) NOT NULL,
  habilidad_descripcion TEXT,
  imagen VARCHAR(255),
  activa TINYINT(1) NOT NULL DEFAULT 1
);

-- 3. TIENDA_ITEMS
CREATE TABLE tienda_items (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(100) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  tipo ENUM('energia','boost','cosmetico','moneda') NOT NULL,
  descripcion TEXT,
  precio_monedas INT(11),
  precio_real DECIMAL(10,2),
  cantidad_otorgada INT(11),
  activo TINYINT(1) NOT NULL DEFAULT 1
);

-- 4. INVENTARIO_CARTAS
CREATE TABLE inventario_cartas (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  carta_id BIGINT(20) NOT NULL,
  cantidad INT(11) NOT NULL DEFAULT 1,
  fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (carta_id) REFERENCES cartas(id) ON DELETE CASCADE
);

-- 5. INVENTARIO_ITEMS
CREATE TABLE inventario_items (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  item_id BIGINT(20) NOT NULL,
  cantidad INT(11) NOT NULL DEFAULT 1,
  fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES tienda_items(id) ON DELETE CASCADE
);

-- 6. RECOMPENSAS
CREATE TABLE recompensas (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  origen VARCHAR(100) NOT NULL,
  tipo ENUM('carta','item','moneda','punto') NOT NULL,
  cantidad INT(11) NOT NULL DEFAULT 1,
  carta_id BIGINT(20) NULL,
  item_id BIGINT(20) NULL,
  fecha_recompensa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (carta_id) REFERENCES cartas(id) ON DELETE SET NULL,
  FOREIGN KEY (item_id) REFERENCES tienda_items(id) ON DELETE SET NULL
);

-- 7. CURSOS_COMPRADOS
CREATE TABLE cursos_comprados (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  curso_codigo VARCHAR(100) NOT NULL,
  fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 8. PROGRESO_CURSOS
CREATE TABLE progreso_cursos (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  curso_codigo VARCHAR(100) NOT NULL,
  completado TINYINT(1) NOT NULL DEFAULT 0,
  porcentaje DECIMAL(5,2) NOT NULL DEFAULT 0,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 9. PARTIDAS_INVASION
CREATE TABLE partidas_invasion (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  temporada VARCHAR(100),
  resultado ENUM('victoria','derrota','empate') NOT NULL,
  monedas_ganadas INT(11) NOT NULL DEFAULT 0,
  xp_ganada INT(11) NOT NULL DEFAULT 0,
  fecha_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 10. COMPRAS
CREATE TABLE compras (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  tipo ENUM('moneda','item','curso') NOT NULL,
  referencia_id BIGINT(20),
  metodo_pago ENUM('tarjeta','paypal','transferencia') NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 11. REGALOS_RECLAMADOS
CREATE TABLE regalos_reclamados (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  codigo_regalo VARCHAR(100) NOT NULL,
  fecha_reclamado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY unico_regalo_por_usuario (usuario_id, codigo_regalo)
);

-- 12. TIRADAS_GACHA
CREATE TABLE tiradas_gacha (
  id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT(20) NOT NULL,
  carta_id BIGINT(20) NOT NULL,
  costo_puntos INT(11) NOT NULL,
  fecha_tirada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (carta_id) REFERENCES cartas(id) ON DELETE CASCADE
);