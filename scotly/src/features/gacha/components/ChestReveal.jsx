const SPARKS_POR_RAREZA = {
  common: 0,
  rare: 4,
  epic: 8,
  legendary: 12,
};

export default function ChestReveal({ fase, carta, fuePity, fueRateUp }) {
  const rareza = carta?.rareza || "common";
  const cantidadSparks = SPARKS_POR_RAREZA[rareza] ?? 0;

  return (
    <div className="gacha-stage">

      <div className={`gacha-chest gacha-chest--${fase}`} data-rareza={rareza}>
        <div className="gacha-chest__glow" />

        <div className="gacha-chest__lid">
          <div className="gacha-chest__seal">
            <span className="gacha-chest__seal-crest">S</span>
          </div>
        </div>

        <div className="gacha-chest__body">
          <div className="gacha-chest__strap gacha-chest__strap--left" />
          <div className="gacha-chest__strap gacha-chest__strap--right" />
          <div className="gacha-chest__lock" />
        </div>

        {fase === "abriendo" && <div className="gacha-chest__burst" />}
      </div>

      {fase === "revelada" && carta && (
        <div className={`gacha-reveal gacha-reveal--${rareza}`}>
          {cantidadSparks > 0 && (
            <div className="gacha-reveal__sparks">
              {Array.from({ length: cantidadSparks }).map((_, i) => (
                <span
                  key={i}
                  className="gacha-spark"
                  style={{
                    left: `${8 + Math.random() * 84}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {fuePity && <span className="gacha-reveal__pity">Garantía activada</span>}
          {fueRateUp && !fuePity && <span className="gacha-reveal__rateup">¡Personaje de temporada!</span>}
          <span className="gacha-reveal__rareza">{rareza}</span>

          <div className="gacha-reveal__img-wrap">
            <img
              src={carta.imagen}
              alt={carta.nombre}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <p className="gacha-reveal__nombre">{carta.nombre}</p>

          <div className="gacha-reveal__stats">
            <span className="gacha-reveal__stat gacha-reveal__stat--hp">❤ {carta.hp}</span>
            <span className="gacha-reveal__stat gacha-reveal__stat--atk">⚔ {carta.ataque}</span>
            <span className="gacha-reveal__stat gacha-reveal__stat--spd">⚡ {carta.velocidad}</span>
          </div>

          {carta.habilidad_nombre && (
            <div className="gacha-reveal__skill">
              <span className="gacha-reveal__skill-name">{carta.habilidad_nombre}</span>
              <span className="gacha-reveal__skill-desc">{carta.habilidad_descripcion}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}