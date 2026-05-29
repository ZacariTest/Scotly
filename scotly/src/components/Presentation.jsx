import mascot from "/img/Bonnie-3.png";

export default function Presentation() {
  return (
    <section className="presentation-section">
      <div className="presentation-content">
        <h2 className="presentation-title banner-title">
          Explorá con <span className="banner-title-accent">Scotly</span>
        </h2>
        <p className="presentation-text">
          Scotly es una plataforma de exploración cultural dedicada a las Islas Británicas. 
          Comenzamos en Escocia — su arte celta, sus leyendas de las Highlands y su historia gamificada son el punto de partida. 
          Aprendé a tu ritmo, desbloqueá logros y avanzá hacia Inglaterra, Gales e Irlanda a medida que el universo se expande.
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
