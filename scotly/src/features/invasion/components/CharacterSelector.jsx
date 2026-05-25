import CardDisplay from "./CardDisplay";
import { CHARACTERS } from "../data/characters";
import { CURRENT_SEASON } from "../data/seasons";

const MAX_SELECTION = 3;

export default function CharacterSelector({ selected, onToggle, onConfirm }) {
  const ready = selected.length === MAX_SELECTION;

  return (
    <div className="inv-selector">

      {/* Info de temporada */}
      <div className="inv-season-banner">
        <div className="inv-season-badge">{CURRENT_SEASON.badge}</div>
        <h2 className="inv-season-name">{CURRENT_SEASON.name}</h2>
        <p className="inv-season-desc">{CURRENT_SEASON.description}</p>
        <div className="inv-season-reward">
          <span>🏆 Victoria: <strong>{CURRENT_SEASON.reward.coins} monedas</strong> + <strong>{CURRENT_SEASON.reward.xp} XP</strong></span>
        </div>
      </div>

      {/* Rival */}
      <div className="inv-enemy-preview">
        <p className="inv-enemy-preview__label">Rival de temporada</p>
        <div className="inv-enemy-preview__members">
          {CURRENT_SEASON.enemy.members.map((m) => (
            <div key={m.id} className={`inv-enemy-chip inv-enemy-chip--${m.rarity}`}>
              <span className="inv-enemy-chip__name">{m.name}</span>
              <span className="inv-enemy-chip__stats">❤{m.hp} ⚔{m.attack} ⚡{m.speed}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instrucción */}
      <div className="inv-selector__header">
        <h3 className="inv-selector__title">Elegí tu equipo</h3>
        <span className="inv-selector__count">{selected.length} / {MAX_SELECTION}</span>
      </div>

      {/* Grid de cartas */}
      <div className="inv-selector__grid">
        {CHARACTERS.map((char) => (
          <CardDisplay
            key={char.id}
            character={char}
            selected={selected.some((s) => s.id === char.id)}
            disabled={selected.length >= MAX_SELECTION && !selected.some((s) => s.id === char.id)}
            onClick={() => onToggle(char)}
          />
        ))}
      </div>

      <button
        className="inv-selector__confirm"
        disabled={!ready}
        onClick={onConfirm}
      >
        {ready ? "¡Defender las Highlands!" : `Elegí ${MAX_SELECTION - selected.length} personaje${MAX_SELECTION - selected.length !== 1 ? "s" : ""} más`}
      </button>
    </div>
  );
}
