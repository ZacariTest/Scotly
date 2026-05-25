import { useState, useEffect } from "react";
import HealthBar from "./HealthBar";
import BattleLog from "./BattleLog";

const TURN_DELAY = 800;

export default function BattleArena({ result, onFinish }) {
  const [step, setStep] = useState(0);
  const [logEntries, setLogEntries] = useState([]);
  const [hpState, setHpState] = useState(null);
  const [activeChar, setActiveChar] = useState(null);
  const [done, setDone] = useState(false);

  // Inicializar HP desde el primer snapshot
  useEffect(() => {
    if (!result?.log?.length) return;
    setHpState(result.log[0].snapshot);
    setLogEntries([{ turn: 0, side: "system", text: "¡La invasión comienza! Defiende las Highlands." }]);
  }, [result]);

  // Avanzar turnos automáticamente
  useEffect(() => {
    if (!result || step === 0 || step > result.log.length - 1) {
      if (step > 0) setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      const entry = result.log[step];
      if (entry.snapshot) setHpState(entry.snapshot);
      if (entry.character) setActiveChar(entry.character);

      // Líneas de log
      const lines = [];
      if (entry.type === "ko") {
        lines.push({ turn: entry.turn, side: "system", text: entry.text });
      } else if (entry.events) {
        entry.events.forEach((ev) => {
          lines.push({ turn: entry.turn, side: entry.side, text: `${entry.character}: ${ev.label}` });
        });
      }

      setLogEntries((prev) => [...prev, ...lines]);
      setStep((s) => s + 1);
    }, TURN_DELAY);

    return () => clearTimeout(timer);
  }, [step, result]);

  // Arrancar animación
  const startAnimation = () => setStep(1);

  if (!hpState) return null;

  return (
    <div className="inv-arena">

      {/* Campo de batalla */}
      <div className="inv-arena__field">

        {/* Equipo jugador */}
        <div className="inv-arena__team inv-arena__team--player">
          <p className="inv-arena__team-label">Tu aldea</p>
          {hpState.player.map((c) => (
            <div
              key={c.id}
              className={`inv-arena__combatant ${activeChar === c.name ? "inv-arena__combatant--active-p" : ""} ${c.currentHp <= 0 ? "inv-arena__combatant--dead" : ""}`}
            >
              <div className="inv-arena__portrait">🧙</div>
              <HealthBar current={c.currentHp} max={c.hp} name={c.name} side="player" />
            </div>
          ))}
        </div>

        <div className="inv-arena__vs">⚔</div>

        {/* Equipo enemigo */}
        <div className="inv-arena__team inv-arena__team--enemy">
          <p className="inv-arena__team-label">Invasores</p>
          {hpState.enemy.map((c) => (
            <div
              key={c.id}
              className={`inv-arena__combatant ${activeChar === c.name ? "inv-arena__combatant--active-e" : ""} ${c.currentHp <= 0 ? "inv-arena__combatant--dead" : ""}`}
            >
              <div className="inv-arena__portrait">👹</div>
              <HealthBar current={c.currentHp} max={c.hp} name={c.name} side="enemy" />
            </div>
          ))}
        </div>
      </div>

      {/* Botón para iniciar */}
      {step === 0 && (
        <button className="inv-arena__start-btn" onClick={startAnimation}>
          ▶ Iniciar combate
        </button>
      )}

      {/* Log */}
      {step > 0 && <BattleLog entries={logEntries} />}

      {/* Resultado */}
      {done && (
        <div className={`inv-result inv-result--${result.winner}`}>
          <p className="inv-result__title">
            {result.winner === "player" ? "¡Victoria! Las Highlands están a salvo." : result.winner === "enemy" ? "Derrota. La invasión avanza..." : "¡Empate!"}
          </p>
          <button className="inv-result__btn" onClick={onFinish}>
            Ver recompensas
          </button>
        </div>
      )}
    </div>
  );
}
