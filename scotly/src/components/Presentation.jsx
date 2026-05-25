import mascot from "/img/Bonnie-3.png"; // 🧍‍♀️ tu imagen de la mascota

export default function Presentation() {
  return (
    <section className="presentation-section">
      <div className="presentation-content">
        <h2 className="presentation-title banner-title">
          Descubre con <span className="banner-title-accent">Scotly</span>
        </h2>
        <p className="presentation-text">
          Scotly es una plataforma cultural dedicada a compartir la historia y cultura escocesa a través de cursos accesibles e interactivos. 
          Explora los misterios del arte celta, las leyendas de las Highlands y el espíritu moderno de Escocia. 
          Aprende a tu ritmo mientras desbloqueas logros y participas en una experiencia gamificada única.
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
