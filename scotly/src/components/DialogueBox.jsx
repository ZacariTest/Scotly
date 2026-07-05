export default function DialogueBox({ character, text, avatar, onNext, isLast, progress, total }) {
  return (
    <div className="dialogue-box">

      {/* Pestaña del nombre */}
      <div className="dialogue-box__nametag">
        {character}
      </div>

      {/* Caja principal */}
      <div className="dialogue-box__body">

        {/* Contenido: avatar (si hay) + texto */}
        <div className="dialogue-box__content">
          {avatar && (
            <img src={avatar} alt={character} className="dialogue-box__avatar" />
          )}
          <p className="dialogue-box__text">{text}</p>
        </div>

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