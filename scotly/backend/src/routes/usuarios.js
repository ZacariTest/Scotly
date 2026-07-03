import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// GET /api/usuarios/me
router.get('/me', verificarToken, async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      'SELECT id, username, email, monedas, puntos, energia, experiencia, rol, foto_perfil FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ usuario: usuarios[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// PUT /api/usuarios/me — actualizar email y/o foto de perfil
router.put('/me', verificarToken, async (req, res) => {
  const { email, foto_perfil } = req.body;
  const usuarioId = req.usuario.id;

  if (foto_perfil && foto_perfil.length > 3_000_000) {
    return res.status(400).json({ error: 'La imagen es demasiado grande (máximo ~2MB)' });
  }

  try {
    if (email) {
      const [existentes] = await pool.query(
        'SELECT id FROM usuarios WHERE email = ? AND id != ?',
        [email, usuarioId]
      );
      if (existentes.length > 0) {
        return res.status(409).json({ error: 'Ese email ya está en uso' });
      }
    }

    const campos = [];
    const valores = [];

    if (email) { campos.push('email = ?'); valores.push(email); }
    if (foto_perfil !== undefined) { campos.push('foto_perfil = ?'); valores.push(foto_perfil); }

    if (campos.length === 0) {
      return res.status(400).json({ error: 'Nada para actualizar' });
    }

    valores.push(usuarioId);

    await pool.query(
      `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );

    const [actualizado] = await pool.query(
      'SELECT id, username, email, monedas, puntos, energia, experiencia, rol, foto_perfil FROM usuarios WHERE id = ?',
      [usuarioId]
    );

    res.json({ usuario: actualizado[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// PUT /api/usuarios/password
router.put('/password', verificarToken, async (req, res) => {
  const { passwordActual, passwordNueva } = req.body;
  const usuarioId = req.usuario.id;

  if (!passwordActual || !passwordNueva) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  if (passwordNueva.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const [usuarios] = await pool.query(
      'SELECT password_hash FROM usuarios WHERE id = ?',
      [usuarioId]
    );
    const usuario = usuarios[0];

    const valida = await bcrypt.compare(passwordActual, usuario.password_hash);
    if (!valida) {
      return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
    }

    const nuevoHash = await bcrypt.hash(passwordNueva, 10);
    await pool.query(
      'UPDATE usuarios SET password_hash = ? WHERE id = ?',
      [nuevoHash, usuarioId]
    );

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
});

export default router;