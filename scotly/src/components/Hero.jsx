import { useState, useEffect } from "react";

export default function Hero() {
  // Imágenes del carrusel
  const images = [
    "/img/Banner-2.jpg",
    "/img/Banner-1.jpg",
    "/img/Banner-3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Cambio automático (5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-section">
      {/* Imagen actual */}
      <div className="hero-wrapper">
        <img
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          className="hero-img fade-slide"
        />
        <div className="hero-overlay"></div>

        {/* Contenido*/}
        <div className="hero-content">
          <h1 className="hero-title">
            Descubre la <span className="accent-title">cultura escocesa</span>
          </h1>
          <p className="hero-subtitle">
            Sumergite en la historia, los mitos y los paisajes de Escocia.
          </p>
          <a href="#courses" className="hero-btn">
            Explorar Cursos
          </a>
        </div>

        {/* Botones navegación */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          className="hero-arrow left"
        >
          ‹
        </button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          className="hero-arrow right"
        >
          ›
        </button>

        {/* Indicadores */}
        <div className="hero-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`dot ${current === index ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
