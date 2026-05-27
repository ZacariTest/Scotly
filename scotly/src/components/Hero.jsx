import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const images = [
    "/img/Banner-2.jpg",
    "/img/Banner-1.jpg",
    "/img/Banner-3.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-section">
      <div className="hero-wrapper">
        <img
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          className="hero-img fade-slide"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Descubre la <span className="accent-title">cultura escocesa</span>
          </h1>
          <p className="hero-subtitle">
            Sumergite en la historia, los mitos y los paisajes de Escocia.
          </p>
          <button className="hero-btn" onClick={() => navigate("/cursos")}>
            Explorar Cursos
          </button>
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          className="hero-arrow left"
        >‹</button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          className="hero-arrow right"
        >›</button>

        <div className="hero-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`dot ${current === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}