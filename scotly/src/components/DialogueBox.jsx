export default function DialogueBox({ character, text, onNext, isLast, progress, total }) {
  return (
    <div className="dialogue-box">

      {/* Pestaña del nombre */}
      <div className="dialogue-box__nametag">
        {character}
      </div>

      {/* Caja principal */}
      <div className="dialogue-box__body">

        {/* Texto */}
        <p className="dialogue-box__text">{text}</p>

        {/* Footer: progreso + botón */}
        <div className="dialogue-box__footer">
          <span className="dialogue-box__progress">{progress} / {total}</span>
          <button className="dialogue-box__btn" onClick={onNext}>
            {isLast ? "Finalizar ✦" : "Continuar ›"}
          </button>
        </div>

      </div>
    </div>
  );
}
