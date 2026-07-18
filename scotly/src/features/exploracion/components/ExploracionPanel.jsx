// src/features/exploracion/components/ExploracionPanel.jsx
//
// Uso sugerido: montarlo en tu página de Inventario (o en una nueva
// "/exploracion"), pasándole las cartas que ya cargás en esa página con
// GET /api/inventario/cartas, y un callback para refrescar el `user` del
// AuthContext cuando se reclama la recompensa (monedas/puntos cambian).
//
// <ExploracionPanel cartas={cartas} onRecompensaReclamada={(usuario) => setUser(usuario)} />

import { useEffect, useMemo, useState, useCallback } from 'react';
import { obtenerEstadoExploracion, iniciarExploracion, reclamarExploracion } from '../exploracionApi';
import { labelRareza, RAREZA_COLORS } from '../rarezaLabels';

function formatearRestante(msRestante) {
  if (msRestante <= 0) return '00:00:00';
  const totalSegundos = Math.floor(msRestante / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
}

export default function ExploracionPanel({ cartas = [], onRecompensaReclamada }) {
  const [activa, setActiva] = useState(null); // exploración en curso, o null
  const [cargando, setCargando] = useState(true);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [reclamando, setReclamando] = useState(false);
  const [error, setError] = useState(null);
  const [ahora, setAhora] = useState(Date.now());

  const cargarEstado = useCallback(async () => {
    try {
      const data = await obtenerEstadoExploracion();
      setActiva(data.activa);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarEstado();
  }, [cargarEstado]);

  // Tick del countdown cada segundo mientras haya una exploración activa.
  useEffect(() => {
    if (!activa) return undefined;
    const intervalo = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(intervalo);
  }, [activa]);

  const msRestante = activa ? new Date(activa.fin).getTime() - ahora : 0;
  const lista = activa ? msRestante <= 0 : false;

  const handleIniciar = async () => {
    if (!cartaSeleccionada) return;
    setEnviando(true);
    setError(null);
    try {
      const data = await iniciarExploracion(cartaSeleccionada);
      setActiva(data.activa);
      setCartaSeleccionada(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const handleReclamar = async () => {
    setReclamando(true);
    setError(null);
    try {
      const data = await reclamarExploracion();
      setActiva(null);
      onRecompensaReclamada?.(data.usuario, {
        puntos: data.recompensa_puntos,
        monedas: data.recompensa_monedas,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setReclamando(false);
    }
  };

  if (cargando) {
    return <div className="exploracion-panel exploracion-panel--cargando">Cargando exploración…</div>;
  }

  return (
    <div className="exploracion-panel">
      <h3 className="exploracion-panel__titulo">Aventuras y recursos</h3>

      {error && <p className="exploracion-panel__error">{error}</p>}

      {!activa && (
        <div className="exploracion-panel__inicio">
          <p className="exploracion-panel__hint">
            Mandá una carta a explorar por un tiempo (según su rareza) a cambio de recursos
            y, con suerte, algo de monedas. La carta sigue disponible para todo lo demás.
          </p>

          <div className="exploracion-panel__recursos">
            <span className="exploracion-panel__recurso-chip">🪙 Monedas</span>
            <span className="exploracion-panel__recurso-chip">📜 Provisiones</span>
            <span className="exploracion-panel__recurso-chip">⏳ Duración según rareza</span>
          </div>

          <select
            className="exploracion-panel__select"
            value={cartaSeleccionada ?? ''}
            onChange={(e) => setCartaSeleccionada(Number(e.target.value) || null)}
          >
            <option value="">Elegí una carta…</option>
            {cartas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} — {labelRareza(c.rareza)}
              </option>
            ))}
          </select>

          <button
            className="btn btn-primary"
            disabled={!cartaSeleccionada || enviando}
            onClick={handleIniciar}
          >
            {enviando ? 'Enviando…' : 'Enviar a explorar'}
          </button>
        </div>
      )}

      {activa && (
        <div className="exploracion-panel__activa">
          <div className="exploracion-panel__carta">
            {activa.carta_imagen && (
              <img src={activa.carta_imagen} alt={activa.carta_nombre} className="exploracion-panel__carta-img" />
            )}
          </div>

          <div className="exploracion-panel__info">
            <span className="exploracion-panel__estado-tag">En exploración</span>
            <p className="exploracion-panel__carta-nombre">{activa.carta_nombre}</p>
            <span
              className="exploracion-panel__rareza-badge"
              style={{ color: RAREZA_COLORS[activa.rareza] }}
            >
              {labelRareza(activa.rareza)}
            </span>

            {lista ? (
              <p className="exploracion-panel__flavor">
                Volvió de su viaje y trae algo para vos.
              </p>
            ) : (
              <p className="exploracion-panel__flavor">
                Está recorriendo tierras lejanas. Volverá con recursos y, con suerte, monedas.
              </p>
            )}

            {lista ? (
              <button className="btn btn-primary" disabled={reclamando} onClick={handleReclamar}>
                {reclamando ? 'Reclamando…' : '¡Reclamar recompensa!'}
              </button>
            ) : (
              <div className="exploracion-panel__countdown">
                <span className="exploracion-panel__countdown-timer">{formatearRestante(msRestante)}</span>
                <span className="exploracion-panel__countdown-label">restante</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}