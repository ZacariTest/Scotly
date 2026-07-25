export default function NoEnergyModal({ costo, energiaActual, energiaMax, onClose }) {
  return (
    <div className="no-energy-modal__backdrop" onClick={onClose}>
      <div className="no-energy-modal" onClick={(e) => e.stopPropagation()}>
        <span className="no-energy-modal__icon">⚡</span>
        <h3>No tenés suficiente energía</h3>
        <p>
          Esto necesita {costo} de energía y tenés {energiaActual}/{energiaMax}.
        </p>
        <p className="no-energy-modal__hint">Se recupera sola con el tiempo.</p>
        <button onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
}