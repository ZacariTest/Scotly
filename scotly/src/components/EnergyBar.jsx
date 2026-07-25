import { useEnergy } from "../context/EnergyContext";
import "../styles/energy-bar.css";

function formatearTiempo(segundos) {
  const m = Math.floor(segundos / 60).toString().padStart(2, "0");
  const s = Math.floor(segundos % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function EnergyBar() {
  const { energia, energiaMax, segundosParaProxima, loading } = useEnergy();

  if (loading || energia == null) return null;

  const porcentaje = energiaMax ? Math.min(100, (energia / energiaMax) * 100) : 0;

  return (
    <div
      className="energy-bar"
      title={segundosParaProxima != null ? `Próxima en ${formatearTiempo(segundosParaProxima)}` : "Energía al máximo"}
    >
      <span className="energy-bar__icon">⚡</span>
      <div className="energy-bar__track">
        <div className="energy-bar__fill" style={{ width: `${porcentaje}%` }} />
      </div>
      <span className="energy-bar__count">{energia}/{energiaMax}</span>
      {segundosParaProxima != null && (
        <span className="energy-bar__timer">{formatearTiempo(segundosParaProxima)}</span>
      )}
    </div>
  );
}