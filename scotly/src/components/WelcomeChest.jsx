import { useState } from "react";
import "../styles/welcome-chest.css";

// Carta de regalo de bienvenida
const WELCOME_CARD = {
  name: "Bonnie",
  title: "Espíritu de las Highlands",
  rarity: "epic",
  img: "/img/Bonnie-3.png",
  description: "Solo los viajeros que llegaron en los primeros días la conocieron.",
  stats: { hp: 120, atk: 18, spd: 22 },
  skill: { name: "Llamado del Bosque", desc: "Otorga +30% de ataque a todos los aliados por 2 turnos." },
};

export default function WelcomeChest({ onOpenAuth, userLoggedIn }) {
  const [phase, setPhase] = useState("idle"); // idle | opening | revealed | claimed

  const handleClaim = () => {
    if (!userLoggedIn) {
      onOpenAuth?.();
      return;
    }
    setPhase("opening");
    setTimeout(() => setPhase("revealed"), 1400);
  };

  const handleClose = () => setPhase("claimed");

  if (phase === "claimed") return null;

  return (
    <>
      {/* SECCIÓN PRINCIPAL */}
      <section className="wc-section">

        {/* Línea decorativa superior */}
        <div className="wc-top-line" />

        <div className="wc-inner">

          {/* Lado izquierdo — texto y CTA */}
          <div className="wc-content">


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

            <button className="wc-claim-btn" onClick={handleClaim}>
              <span className="wc-claim-btn__icon">🎁</span>
              {userLoggedIn ? "Abrir cofre" : "Reclamar — Iniciar sesión"}
            </button>

            <p className="wc-fine-print">
              Disponible solo durante el período de lanzamiento · Una carta por cuenta
            </p>
          </div>

          {/* Lado derecho — cofre animado */}
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

      {/* MODAL DE CARTA REVELADA */}
      {phase === "revealed" && (
        <div className="wc-modal-backdrop" onClick={handleClose}>
          <div className="wc-modal" onClick={e => e.stopPropagation()}>

            <div className="wc-modal__top-line" />

            <p className="wc-modal__eyebrow">✨ Carta desbloqueada</p>

            <div className={`wc-card wc-card--${WELCOME_CARD.rarity}`}>
              <div className="wc-card__shine" />
              <div className="wc-card__rarity-badge">{WELCOME_CARD.rarity}</div>

              <div className="wc-card__img-wrap">
                <img src={WELCOME_CARD.img} alt={WELCOME_CARD.name} className="wc-card__img" />
                <div className="wc-card__img-overlay" />
              </div>

              <div className="wc-card__body">
                <p className="wc-card__name">{WELCOME_CARD.name}</p>
                <p className="wc-card__title">{WELCOME_CARD.title}</p>

                <div className="wc-card__stats">
                  <span className="wc-card__stat wc-card__stat--hp">❤ {WELCOME_CARD.stats.hp}</span>
                  <span className="wc-card__stat wc-card__stat--atk">⚔ {WELCOME_CARD.stats.atk}</span>
                  <span className="wc-card__stat wc-card__stat--spd">⚡ {WELCOME_CARD.stats.spd}</span>
                </div>

                <div className="wc-card__skill">
                  <span className="wc-card__skill-name">{WELCOME_CARD.skill.name}</span>
                  <span className="wc-card__skill-desc">{WELCOME_CARD.skill.desc}</span>
                </div>
              </div>
            </div>

            <p className="wc-modal__desc">{WELCOME_CARD.description}</p>

            <button className="wc-modal__close" onClick={handleClose}>
              Guardar en mi colección →
            </button>

          </div>
        </div>
      )}
    </>
  );
}