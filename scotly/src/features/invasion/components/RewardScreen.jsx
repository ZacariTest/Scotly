import { CURRENT_SEASON } from "../data/seasons";

export default function RewardScreen({ winner, onReset }) {
  const won = winner === "player";

  return (
    <div className="inv-reward">
      <div className={`inv-reward__banner inv-reward__banner--${won ? "win" : "lose"}`}>
        <p className="inv-reward__title">{won ? "¡Invasión rechazada!" : "Las Highlands han caído..."}</p>
        <p className="inv-reward__sub">
          {won
            ? "Tus guerreros han defendido la aldea con honor."
            : "El Clan Rojo avanza. Reorganizá tu equipo e intentalo de nuevo."}
        </p>
      </div>

      {won && (
        <div className="inv-reward__loot">
          <div className="inv-reward__item">
            <span className="inv-reward__icon">🪙</span>
            <span className="inv-reward__amount">+{CURRENT_SEASON.reward.coins}</span>
            <span className="inv-reward__label">monedas</span>
          </div>
          <div className="inv-reward__item">
            <span className="inv-reward__icon">⭐</span>
            <span className="inv-reward__amount">+{CURRENT_SEASON.reward.xp}</span>
            <span className="inv-reward__label">XP</span>
          </div>
        </div>
      )}

      <button className="inv-reward__reset" onClick={onReset}>
        Volver a elegir equipo
      </button>
    </div>
  );
}
