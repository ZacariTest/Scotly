// backend/src/utils/niveles.js
export * from '../../../shared/niveles.js';
import { calcularNivelParaExp } from '../../../shared/niveles.js';

// Recalcula y persiste el nivel de un usuario — llamar siempre que
// experiencia cambie, dentro de la misma transacción/conexión.
export async function recalcularNivel(conn, usuarioId) {
  const [rows] = await conn.query('SELECT experiencia FROM usuarios WHERE id = ?', [usuarioId]);
  if (!rows.length) return null;

  const nuevoNivel = calcularNivelParaExp(rows[0].experiencia);
  await conn.query('UPDATE usuarios SET nivel = ? WHERE id = ?', [nuevoNivel, usuarioId]);
  return nuevoNivel;
}