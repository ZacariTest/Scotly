import { useNavigate } from "react-router-dom";

export default function CoursesSection() {
  const navigate = useNavigate();

  return (
    <section className="courses-container">

      <div className="courses-header">
        <p className="courses-header__title">Región activa: Escocia</p>
        <p className="courses-header__sub">Historia, tradiciones y mitología de las Islas Británicas — comenzá por las Highlands</p>
      </div>

      <div className="courses-grid">

        {/* Columna izquierda */}
        <div className="courses-col">
          <p className="courses-col__label">Cursos destacados</p>

          <div className="course-card course-card--sm" onClick={() => navigate("/curso/arte")}>
            <img src="/img/Arte.jpg" alt="Arte Celta" className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className="course-card__tag course-card__tag--dest">Escocia</span>
              <p className="course-card__name">Arte Celta</p>
            </div>
            <div className="course-card__arrow">›</div>
          </div>

          <div className="course-card course-card--sm" onClick={() => navigate("/curso/cocina")}>
            <img src="/img/Comida.jpg" alt="Comida escocesa" className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className="course-card__tag course-card__tag--dest">Escocia</span>
              <p className="course-card__name">Comida escocesa</p>
            </div>
            <div className="course-card__arrow">›</div>
          </div>
        </div>

        {/* Columna central */}
        <div className="courses-col">
          <p className="courses-col__label">Historia gamificada</p>

          <div className="course-card course-card--lg course-card--featured" onClick={() => navigate("/curso/historia")}>
            <img src="/img/Banner-2.jpg" alt="Historia Gamificada" className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className="course-card__tag course-card__tag--game">Misión interactiva</span>
              <p className="course-card__name">Historia de Escocia</p>
              <p className="course-card__desc">Revivís la historia a través de decisiones y narrativa</p>
            </div>
            <div className="course-card__arrow">›</div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="courses-col">
          <p className="courses-col__label">Próximamente</p>

          <div className="course-card course-card--sm course-card--locked">
            <img src="/img/History.jpg" alt="Leyendas Artúricas" className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className="course-card__tag course-card__tag--region-en">Inglaterra</span>
              <p className="course-card__name">Leyendas Artúricas</p>
            </div>
          </div>

          <div className="course-card course-card--sm course-card--locked">
            <img src="/img/Mitologia.PNG" alt="El Ciclo del Mabinogi" className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className="course-card__tag course-card__tag--region-wa">Gales</span>
              <p className="course-card__name">El Ciclo del Mabinogi</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
