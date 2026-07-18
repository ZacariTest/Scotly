// src/features/exploracion/exploracionApi.js
//
// El token JWT vive en localStorage como "scotly_token" (mismo esquema que
// usa AuthContext.jsx en toda la app).

const API_BASE = import.meta.env.VITE_API_URL || '';

function authHeaders() {
  const token = localStorage.getItem('scotly_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function obtenerEstadoExploracion() {
  const res = await fetch(`${API_BASE}/api/exploracion/estado`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('No se pudo obtener el estado de exploración');
  return res.json();
}

export async function iniciarExploracion(cartaId) {
  const res = await fetch(`${API_BASE}/api/exploracion/iniciar`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ carta_id: cartaId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'No se pudo iniciar la exploración');
  return data;
}

export async function reclamarExploracion() {
  const res = await fetch(`${API_BASE}/api/exploracion/reclamar`, {
    method: 'POST',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'No se pudo reclamar la exploración');
  return data;
}