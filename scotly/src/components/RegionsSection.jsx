export default function RegionsSection() {
  return (
    <section className="regions-section" id="regions-section">
      <p className="regions-section__label">Las cuatro naciones</p>

      <div className="regions-grid">

        <div className="region-card region-card--active region-card--sc">
          <p className="region-card__flag">Escocia</p>
          <p className="region-card__name">The Highlands</p>
          <p className="region-card__desc">Clanes, selkies y tierras épicas</p>
          <span className="region-card__badge">Activo</span>
        </div>

        <div className="region-card region-card--locked region-card--en">
          <p className="region-card__flag">Inglaterra</p>
          <p className="region-card__name">The Crown</p>
          <p className="region-card__desc">Arturo, Robin Hood y la realeza</p>
          <span className="region-card__badge">Pronto</span>
        </div>

        <div className="region-card region-card--locked region-card--wa">
          <p className="region-card__flag">Gales</p>
          <p className="region-card__name">The Dragon</p>
          <p className="region-card__desc">Dragones, bardos y el Mabinogi</p>
          <span className="region-card__badge">Pronto</span>
        </div>

        <div className="region-card region-card--locked region-card--ir">
          <p className="region-card__flag">Irlanda</p>
          <p className="region-card__name">The Emerald Isle</p>
          <p className="region-card__desc">Hadas, santos y folclore celta</p>
          <span className="region-card__badge">Pronto</span>
        </div>

      </div>

      <div className="regions-launch-banner">
        <p className="regions-launch-banner__text">
          <strong>Región de lanzamiento: Escocia</strong> — Las demás regiones se desbloquean progresivamente.
        </p>
        <span className="regions-launch-banner__cta">Ver hoja de ruta →</span>
      </div>

    </section>
  );
}
