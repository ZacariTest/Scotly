import mascot from "/img/BON2.PNG";
import WelcomeChest from "./WelcomeChest";

export default function Presentation({ onOpenAuth, userLoggedIn }) {
  return (
    <section className="pres-section">

      {/* Panel único full-width */}
      <div className="pres-panel">
        <div className="pres-panel__top-line"    aria-hidden="true" />
        <div className="pres-panel__bottom-line" aria-hidden="true" />
        <div className="pres-panel__bg-glow"     aria-hidden="true" />

        <div className="pres-layout">

          {/* ── COL 1: Marca / título ── */}
          <div className="pres-col pres-col--brand">
            <p className="pres-eyebrow">Tu aventura empieza aquí</p>
            <h1 className="pres-title">
              Explorá<br />con<br />
              <span className="pres-title-accent">Scotly</span>
            </h1>
            <p className="pres-tagline">
              Descubrí destinos, coleccioná cartas
              y viajá con una comunidad de exploradores.
            </p>
          </div>

          {/* ── DIVISOR ── */}
          <div className="pres-divider" aria-hidden="true" />

          {/* ── COL 2: Contenido del cofre (texto + CTA) ── */}
          <div className="pres-col pres-col--chest">
            <WelcomeChest onOpenAuth={onOpenAuth} userLoggedIn={userLoggedIn} />
          </div>

          {/* ── DIVISOR ── */}
          <div className="pres-divider" aria-hidden="true" />

          {/* ── COL 3: Personaje ── */}
          <div className="pres-col pres-col--character">
            <p className="pres-char-label">Carta incluida</p>
            <div className="pres-char-card">
              <div className="pres-char-card__glow" aria-hidden="true" />
              <img
                src={mascot}
                alt="Bonnie — carta épica"
                className="pres-char-img"
              />
              <div className="pres-char-card__footer">
                <span className="pres-char-badge">ÉPICA</span>
                <span className="pres-char-name">Bonnie</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}