const REGIONS = [
  {
    id: "scotland",
    code: "sc",
    flag: "Escocia",
    name: "The Highlands",
    desc: "Clanes, castillos y leyendas de las tierras altas",
    status: "active",
  },
  {
    id: "england",
    code: "en",
    flag: "Inglaterra",
    name: "The Crown",
    desc: "Caballeros, reyes y relatos de la vieja Inglaterra",
    status: "locked",
  },
  {
    id: "wales",
    code: "wa",
    flag: "Gales",
    name: "The Dragon",
    desc: "Dragones, bardos y mitos ancestrales",
    status: "locked",
  },
];

export default function RegionsSection({ activeRegion, onSelect }) {
  return (
    <section className="regions-section" id="regions-section">
      <p className="regions-section__label">
        Las naciones de Gran Bretaña
      </p>

      <div className="regions-grid">
        {REGIONS.map((r) => (
          <div
            key={r.id}
            className={`region-card region-card--${r.code} ${
              activeRegion === r.id ? "region-card--selected" : ""
            }`}
            onClick={() => onSelect(r.id)}
            style={{ cursor: "pointer" }}
          >
            <p className="region-card__flag">{r.flag}</p>
            <p className="region-card__name">{r.name}</p>
            <p className="region-card__desc">{r.desc}</p>

            <span className="region-card__badge">
              {r.status === "active" ? "Activo" : "Pronto"}
            </span>
          </div>
        ))}
      </div>

      <div className="regions-launch-banner">
        <p className="regions-launch-banner__text">
          <strong>Escocia es la región inicial de Scotly</strong> — Inglaterra y
          Gales llegarán en futuras actualizaciones.
        </p>

        <span className="regions-launch-banner__cta">
          Ver hoja de ruta →
        </span>
      </div>
    </section>
  );
}