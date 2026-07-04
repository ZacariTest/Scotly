export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className={`toast toast--${message.tipo === "error" ? "error" : "ok"}`}>
      <span className="toast__icon">{message.tipo === "error" ? "⚠" : "✓"}</span>
      <span className="toast__text">{message.texto}</span>
    </div>
  );
}