import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function CardLevelUpModal({ card, nivelMaximo, onClose, onLevelUp }) {
  const { authFetch } = useAuth();
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);

  if (!card) return null;

  const duplicadosDisponibles = card.cantidad - 1;
  const puedeSubir = card.nivel < nivelMaximo && duplicadosDisponibles >= 1;
  const enNivelMaximo = card.nivel >= nivelMaximo;

  const handleSubirNivel = async () => {
    if (!puedeSubir || subiendo) return;
    setError(null);
    setSubiendo(true);

    try {
      const res = await authFetch("/api/inventario/subir-nivel", {
        method: "POST",
        body: JSON.stringify({ carta_id: card.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo subir de nivel");
        setSubiendo(false);
        return;
      }

      onLevelUp(card.id, { nivel: data.nivel, cantidad: data.cantidad });
      setSubiendo(false);
    } catch (err) {
      console.error("Error al subir de nivel:", err);
      setError("Error de conexión. Intentá de nuevo.");
      setSubiendo(false);
    }
  };

  return (
    <div className="card-modal__overlay" onClick={onClose}>
      <div
        className={`card-modal card-modal--${card.rarity}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="card-modal__close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <span className="card-modal__rareza">{card.rarity}</span>

        <div className="card-modal__img-wrap">
          <img
            src={card.img}
            alt={card.name}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        <p className="card-modal__nombre">{card.name}</p>
        {card.title && <p className="card-modal__titulo">{card.title}</p>}

        <div className="card-modal__stats">
          <span className="card-modal__stat card-modal__stat--hp">❤ {card.hp}</span>
          <span className="card-modal__stat card-modal__stat--atk">⚔ {card.attack}</span>
          <span className="card-modal__stat card-modal__stat--spd">⚡ {card.speed}</span>
        </div>

        {card.skill?.name && (
          <div className="card-modal__skill">
            <span className="card-modal__skill-name">{card.skill.name}</span>
            <span className="card-modal__skill-desc">{card.skill.description}</span>
          </div>
        )}

        <div className="card-modal__nivel-panel">
          <div className="card-modal__nivel-header">
            <span>Nivel {card.nivel} / {nivelMaximo}</span>
            <span>{duplicadosDisponibles} duplicada{duplicadosDisponibles !== 1 ? "s" : ""} disponible{duplicadosDisponibles !== 1 ? "s" : ""}</span>
          </div>
          <div className="card-modal__nivel-track">
            <div
              className="card-modal__nivel-fill"
              style={{ width: `${Math.min(100, (card.nivel / nivelMaximo) * 100)}%` }}
            />
          </div>

          {error && <p className="card-modal__error">{error}</p>}

          {enNivelMaximo ? (
            <p className="card-modal__nivel-msg">Esta carta ya está en su nivel máximo.</p>
          ) : (
            <button
              className="card-modal__btn"
              disabled={!puedeSubir || subiendo}
              onClick={handleSubirNivel}
            >
              {subiendo
                ? "Subiendo..."
                : puedeSubir
                ? `Subir a nivel ${card.nivel + 1} (usa 1 duplicada)`
                : "Necesitás 1 duplicada más"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}