export default function FinalMessage({ onAuth }) {
  return (
    <section className="final-message">
      <div className="overlay"></div>
      <div className="content">
        <h2 className="title">La historia de Gran Bretaña te espera. Comienza hoy tu aventura.</h2>
        <p className="subtitle">
          Únite a una comunidad que explora historia, mitología y cultura a través de una experiencia gamificada y en constante expansión.
        </p>
        <button className="cta" onClick={onAuth}>
          Comenzar ahora
        </button>
      </div>
    </section>
  );
}
