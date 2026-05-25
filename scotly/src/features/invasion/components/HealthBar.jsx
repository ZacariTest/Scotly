export default function HealthBar({ current, max, name, side }) {
  const pct = Math.max(0, Math.round((current / max) * 100));
  const color = pct > 50 ? "#4CAF7D" : pct > 25 ? "#ffc61c" : "#e05555";

  return (
    <div className={`inv-hpbar inv-hpbar--${side}`}>
      <div className="inv-hpbar__header">
        <span className="inv-hpbar__name">{name}</span>
        <span className="inv-hpbar__nums">{Math.max(0, current)} / {max}</span>
      </div>
      <div className="inv-hpbar__track">
        <div
          className="inv-hpbar__fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
