export default function CardDisplay({ character, selected, onClick, disabled }) {
  return (
    <div
      className={`inv-card inv-card--${character.rarity} ${selected ? "inv-card--selected" : ""} ${disabled ? "inv-card--disabled" : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      {selected && <div className="inv-card__check">✓</div>}
      <div className="inv-card__rarity-label">{character.rarity}</div>

      <div className="inv-card__img-wrap">
        <img src={character.img} alt={character.name} className="inv-card__img" />
      </div>

      <div className="inv-card__body">
        <div className="inv-card__name-row">
          <p className="inv-card__name">{character.name}</p>
          {character.nivel && (
            <span className="inv-card__nivel-tag">Nv. {character.nivel}</span>
          )}
        </div>
        <p className="inv-card__title">{character.title}</p>

        <div className="inv-card__stats">
          <span className="inv-stat inv-stat--hp">❤ {character.hp}</span>
          <span className="inv-stat inv-stat--atk">⚔ {character.attack}</span>
          <span className="inv-stat inv-stat--spd">⚡ {character.speed}</span>
        </div>

        <div className="inv-card__skill">
          <span className="inv-card__skill-name">{character.skill.name}</span>
          <span className="inv-card__skill-desc">{character.skill.description}</span>
        </div>
      </div>
    </div>
  );
}