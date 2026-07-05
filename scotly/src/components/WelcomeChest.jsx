import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/welcome-chest.css";

export default function WelcomeChest({ onOpenAuth, userLoggedIn }) {
  const { authFetch } = useAuth();
  const [phase, setPhase] = useState("idle"); // idle | opening | revealed | claimed | error
  const [carta, setCarta] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClaim = async () => {
    if (!userLoggedIn) {
      onOpenAuth?.();
      return;
    }

    setPhase("opening");

    try {
      const res = await authFetch("/api/regalos/reclamar-bienvenida", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error === "Ya reclamaste este regalo"
          ? "Ya reclamaste tu carta de bienvenida."
          : "No se pudo abrir el cofre. Intentá de nuevo.");
        setPhase("error");
        return;
      }

      setCarta(data.carta);
      setTimeout(() => setPhase("revealed"), 1400);
    } catch (err) {
      setErrorMsg("No se pudo conectar con el servidor.");
      setPhase("error");
    }
  };

  const handleClose = () => setPhase("claimed");

  return (
    <>
      {/* SECCIÓN PRINCIPAL */}
      <section className="wc-section">

        <div className="wc-top-line" />

        <div className="wc-inner">

          <div className="wc-content">

            {phase === "claimed" ? (
              <>
                <h2 className="wc-title">
                  ¡Felicidades! Ya reclamaste tu carta<br />
                  <span className="wc-title-accent">de bienvenida</span>
                </h2>

                <p className="wc-desc">
                  <strong>Bonnie, Guía de las Highlands</strong> ya está en tu colección. Podés verla en tu inventario cuando quieras.
                </p>
              </>
            ) : (
              <>
                <h2 className="wc-title">
                  Un regalo<br />
                  <span className="wc-title-accent">de las Highlands</span>
                </h2>

                <p className="wc-desc">
                  Para celebrar el inicio de Scotly, cada viajero que llegue hoy recibirá una <strong>carta épica exclusiva</strong> — Bonnie, Guía de las Highlands. No estará disponible de ninguna otra forma.
                </p>

                <div className="wc-reward-preview">
                  <span className="wc-reward-preview__badge">ÉPICA</span>
                  <span className="wc-reward-preview__name">Bonnie</span>
                  <span className="wc-reward-preview__sub">Guía de las Highlands</span>
                </div>

                <button className="wc-claim-btn" onClick={handleClaim} disabled={phase === "opening"}>
                  <span className="wc-claim-btn__icon">🎁</span>
                  {userLoggedIn ? (phase === "opening" ? "Abriendo..." : "Abrir cofre") : "Reclamar — Iniciar sesión"}
                </button>

                {phase === "error" && (
                  <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                    {errorMsg}
                  </p>
                )}

                <p className="wc-fine-print">
                  Disponible solo durante el período de lanzamiento · Una carta por cuenta
                </p>
              </>
            )}
          </div>

          <div className="wc-chest-wrap">
            <div className={`wc-chest ${phase === "opening" ? "wc-chest--opening" : ""}`}>
              <div className="wc-chest__glow" />
              <div className="wc-chest__particles">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="wc-particle" style={{ "--i": i }} />
                ))}
              </div>
              <div className="wc-chest__icon">
                {phase === "opening" ? "✨" : "📦"}
              </div>
              <p className="wc-chest__label">
                {phase === "opening" ? "Abriendo..." : "Cofre Épico"}
              </p>
            </div>
          </div>

        </div>

        <div className="wc-bottom-line" />
      </section>

      {/* MODAL DE CARTA REVELADA — renderizado en document.body vía portal
          para evitar quedar atrapado dentro de .wc-section, que tiene
          backdrop-filter + overflow:hidden (eso recortaba el modal) */}
      {phase === "revealed" && carta && createPortal(
        <div className="wc-modal-backdrop" onClick={handleClose}>
          <div className="wc-modal" onClick={e => e.stopPropagation()}>

            <div className="wc-modal__top-line" />

            <p className="wc-modal__eyebrow">✨ Carta desbloqueada</p>

            <div className={`wc-card wc-card--${carta.rareza}`}>
              <div className="wc-card__shine" />
              <div className="wc-card__rarity-badge">{carta.rareza}</div>

              <div className="wc-card__img-wrap">
                <img src={carta.imagen} alt={carta.nombre} className="wc-card__img" />
                <div className="wc-card__img-overlay" />
              </div>

              <div className="wc-card__body">
                <p className="wc-card__name">{carta.nombre}</p>
                <p className="wc-card__title">Guía de las Highlands</p>

                <div className="wc-card__stats">
                  <span className="wc-card__stat wc-card__stat--hp">❤ {carta.hp}</span>
                  <span className="wc-card__stat wc-card__stat--atk">⚔ {carta.ataque}</span>
                  <span className="wc-card__stat wc-card__stat--spd">⚡ {carta.velocidad}</span>
                </div>

                <div className="wc-card__skill">
                  <span className="wc-card__skill-name">{carta.habilidad_nombre}</span>
                  <span className="wc-card__skill-desc">{carta.habilidad_descripcion}</span>
                </div>
              </div>
            </div>

            <p className="wc-modal__desc">Solo los viajeros que llegaron en los primeros días la conocieron.</p>

            <button className="wc-modal__close" onClick={handleClose}>
              Guardar en mi colección →
            </button>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}