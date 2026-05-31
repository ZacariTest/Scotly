import mascot from "/img/Bonnie-3.png";

export default function Presentation() {
  return (
    <section className="presentation-section">
      <div className="presentation-content">
        <h2 className="presentation-title banner-title">
          Explorá con <span className="banner-title-accent">Scotly</span>
        </h2>
        <p className="presentation-text">
          Scotly es una plataforma de exploración cultural dedicada a Gran bretaña. 
          Comenzamos en Escocia, su arte, sus leyendas y su historia gamificada son el punto de partida. 
          Aprendé a tu ritmo, desbloqueá logros y avanzá hacia Inglaterra y Gales a medida que el universo se expande.
        </p>
      </div>

      <img
        src={mascot}
        alt="Mascota Scotly"
        className="presentation-img"
      />
    </section>
  );
}
