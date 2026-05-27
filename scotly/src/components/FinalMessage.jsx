export default function FinalMessage({ onAuth }) {
  return (
    <section className="final-message">
      <div className="overlay"></div>
      <div className="content">
        <h2 className="title">"Descubre, aprende y celebra Escocia con Scotly."</h2>
        <p className="subtitle">
          Únete a nuestra comunidad y forma parte de una nueva forma de explorar la historia y la cultura.
        </p>
        <button className="cta" onClick={onAuth}>
          Comenzar ahora
        </button>
      </div>
    </section>
  );
}