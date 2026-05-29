export default function FinalMessage({ onAuth }) {
  return (
    <section className="final-message">
      <div className="overlay"></div>
      <div className="content">
        <h2 className="title">"Las Islas Británicas te esperan. Comenzá por Escocia."</h2>
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
