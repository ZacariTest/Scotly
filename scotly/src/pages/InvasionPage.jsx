import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CharacterSelector from "../features/invasion/components/CharacterSelector";
import BattleArena from "../features/invasion/components/BattleArena";
import RewardScreen from "../features/invasion/components/RewardScreen";
import { simulateBattle } from "../features/invasion/engine/battleEngine";
import { CURRENT_SEASON } from "../features/invasion/data/seasons";
import "../features/invasion/styles/invasion.css";


// Fases de minijuego
const PHASE = { SELECT: "select", BATTLE: "battle", REWARD: "reward" };

export default function InvasionPage() {
  const [phase, setPhase] = useState(PHASE.SELECT);
  const [selected, setSelected] = useState([]);
  const [battleResult, setBattleResult] = useState(null);

  const handleToggle = (char) => {
    setSelected((prev) =>
      prev.some((s) => s.id === char.id)
        ? prev.filter((s) => s.id !== char.id)
        : prev.length < 3
        ? [...prev, char]
        : prev
    );
  };

  const handleConfirm = () => {
    const result = simulateBattle(selected, CURRENT_SEASON.enemy.members);
    setBattleResult(result);
    setPhase(PHASE.BATTLE);
  };

  const handleFinish = () => setPhase(PHASE.REWARD);

  const handleReset = () => {
    setSelected([]);
    setBattleResult(null);
    setPhase(PHASE.SELECT);
  };

  return (
    <>
      <Navbar />
      <main className="inv-page">

        {/* Indicador de fase */}
        <div className="inv-steps">
          <span className={`inv-step ${phase === PHASE.SELECT ? "inv-step--active" : ""}`}>1. Elegir equipo</span>
          <span className="inv-step-sep">›</span>
          <span className={`inv-step ${phase === PHASE.BATTLE ? "inv-step--active" : ""}`}>2. Combate</span>
          <span className="inv-step-sep">›</span>
          <span className={`inv-step ${phase === PHASE.REWARD ? "inv-step--active" : ""}`}>3. Recompensa</span>
        </div>

        {phase === PHASE.SELECT && (
          <CharacterSelector
            selected={selected}
            onToggle={handleToggle}
            onConfirm={handleConfirm}
          />
        )}

        {phase === PHASE.BATTLE && (
          <BattleArena
            result={battleResult}
            onFinish={handleFinish}
          />
        )}

        {phase === PHASE.REWARD && (
          <RewardScreen
            winner={battleResult?.winner}
            onReset={handleReset}
          />
        )}

      </main>
      <Footer />
    </>
  );
}
