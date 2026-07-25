import { useState, useEffect } from "react";
import HealthBar from "./HealthBar";
import BattleLog from "./BattleLog";

const TURN_DELAY = 800;

// Determina el tipo de flash según los eventos del turno
function getFlashType(entry) {
  if (!entry) return null;
  if (entry.type === "ko") return "ko";
  if (entry.type === "skill") {
    const skillType = entry.events?.[0]?.type;
    const label = entry.events?.[0]?.label ?? "";
    if (label.includes("crítico")) return "crit";
    if (entry.events?.length > 1) return "multi";
    if (skillType === "heal") return "heal";
    if (skillType === "buff") return "buff";
    if (skillType === "debuff") return "debuff";
    return "skill";
  }
  return "attack";
}

export default function BattleArena({ result, onFinish }) {
  const [step, setStep] = useState(0);
  const [logEntries, setLogEntries] = useState([]);
  const [hpState, setHpState] = useState(null);
  const [activeChar, setActiveChar] = useState(null);
  const [done, setDone] = useState(false);

  // flashMap: { [charName]: flashType }
  const [flashMap, setFlashMap] = useState({});

  useEffect(() => {
    if (!result?.log?.length) return;
    setHpState(result.log[0].snapshot);
    setLogEntries([{ turn: 0, side: "system", text: "¡La invasión comienza! Defiende las Highlands." }]);
  }, [result]);

  useEffect(() => {
    if (!result || step === 0 || step > result.log.length - 1) {
      if (step > 0) setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      const entry = result.log[step];
      if (entry.snapshot) setHpState(entry.snapshot);
      if (entry.character) setActiveChar(entry.character);

      // Determinar flash
      const flashType = getFlashType(entry);
      if (flashType && entry.character) {
        // Flash en el atacante para buff/heal/skill, en el defensor para daño
        const defenderName = entry.side === "player"
          ? result.log[step]?.snapshot?.enemy?.find(c => c.currentHp < (result.log[step - 1]?.snapshot?.enemy?.find(e => e.id === c.id)?.currentHp ?? c.currentHp))?.name
          : result.log[step]?.snapshot?.player?.find(c => c.currentHp < (result.log[step - 1]?.snapshot?.player?.find(p => p.id === c.id)?.currentHp ?? c.currentHp))?.name;

        const newFlash = {};

        if (flashType === "heal" || flashType === "buff") {
          newFlash[entry.character] = flashType;
        } else if (flashType === "debuff") {
          if (defenderName) newFlash[defenderName] = "debuff";
        } else {
          // daño: flash en el atacante (tipo) y flash de golpe en el defensor
          newFlash[entry.character] = flashType;
          if (defenderName) newFlash[defenderName] = flashType + "-hit";
        }

        setFlashMap(newFlash);
        // Limpiar flash después de la animación
        setTimeout(() => setFlashMap({}), 600);
      }

      // Log
      const lines = [];
      if (entry.type === "ko") {
        lines.push({ turn: entry.turn, side: "system", text: entry.text });
      } else if (entry.events) {
        entry.events.forEach((ev) => {
          lines.push({
            turn: entry.turn,
            side: entry.side,
            text: `${entry.character}: ${ev.label}`,
            eventType: entry.type === "skill" ? getFlashType(entry) : "attack",
          });
        });
      }

      setLogEntries((prev) => [...prev, ...lines]);
      setStep((s) => s + 1);
    }, TURN_DELAY);

    return () => clearTimeout(timer);
  }, [step, result]);

  const startAnimation = () => setStep(1);

  if (!hpState) return null;

  const getCombatantClasses = (c, side) => {
    const flash = flashMap[c.name];
    return [
      "inv-arena__combatant",
      activeChar === c.name ? `inv-arena__combatant--active-${side === "player" ? "p" : "e"}` : "",
      c.currentHp <= 0 ? "inv-arena__combatant--dead" : "",
      flash ? `inv-arena__combatant--flash inv-arena__combatant--flash-${flash}` : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="inv-arena">

      <div className="inv-arena__header">
        <span className="inv-arena__header-label">Campo de batalla</span>
      </div>

      <div className="inv-arena__field">

        {/* Jugador */}
        <div className="inv-arena__team inv-arena__team--player">
          <p className="inv-arena__team-label">Tu aldea</p>
          {hpState.player.map((c) => (
            <div key={c.id} className={getCombatantClasses(c, "player")}>
              {/* Overlay de flash */}
              {flashMap[c.name] && (
                <div className={`inv-flash-overlay inv-flash-overlay--${flashMap[c.name]}`} />
              )}
              <div className="inv-arena__portrait inv-arena__portrait--player">
                <img src={c.img} alt={c.name} />
              </div>
              <HealthBar current={c.currentHp} max={c.hp} name={c.name} side="player" />
              {activeChar === c.name && (
                <div className="inv-arena__active-indicator">⚔</div>
              )}
              {/* Badge de acción especial */}
              {flashMap[c.name] && !flashMap[c.name].endsWith("-hit") && (
                <div className={`inv-action-badge inv-action-badge--${flashMap[c.name]}`}>
                  {getActionEmoji(flashMap[c.name])}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divisor */}
        <div className="inv-arena__divider">
          <div className="inv-arena__divider-line" />
          <div className="inv-arena__vs">⚔</div>
          <div className="inv-arena__divider-line" />
        </div>

        {/* Enemigo */}
        <div className="inv-arena__team inv-arena__team--enemy">
          <p className="inv-arena__team-label">Invasores</p>
          {hpState.enemy.map((c) => (
            <div key={c.id} className={getCombatantClasses(c, "enemy")}>
              {flashMap[c.name] && (
                <div className={`inv-flash-overlay inv-flash-overlay--${flashMap[c.name]}`} />
              )}
              <div className="inv-arena__portrait inv-arena__portrait--enemy">
                <img src={c.img} alt={c.name} />
              </div>
              <HealthBar current={c.currentHp} max={c.hp} name={c.name} side="enemy" />
              {activeChar === c.name && (
                <div className="inv-arena__active-indicator inv-arena__active-indicator--enemy">⚔</div>
              )}
              {flashMap[c.name] && !flashMap[c.name].endsWith("-hit") && (
                <div className={`inv-action-badge inv-action-badge--${flashMap[c.name]}`}>
                  {getActionEmoji(flashMap[c.name])}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {step === 0 && (
        <button className="inv-arena__start-btn" onClick={startAnimation}>
          ▶ Iniciar combate
        </button>
      )}

      {step > 0 && <BattleLog entries={logEntries} />}

      {done && (
        <div className={`inv-result inv-result--${result.winner}`}>
          <p className="inv-result__title">
            {result.winner === "player"
              ? "¡Victoria! Las Highlands están a salvo."
              : result.winner === "enemy"
              ? "Derrota. La invasión avanza..."
              : "¡Empate!"}
          </p>
          <button className="inv-result__btn" onClick={onFinish}>
            Ver recompensas
          </button>
        </div>
      )}
    </div>
  );
}

function getActionEmoji(type) {
  const map = {
    crit:    "💥",
    multi:   "⚡",
    heal:    "💚",
    buff:    "🔺",
    debuff:  "🔻",
    skill:   "✨",
    attack:  "⚔",
    ko:      "💀",
  };
  return map[type] ?? "⚔";
}