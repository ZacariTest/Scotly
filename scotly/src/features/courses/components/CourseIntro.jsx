import { useNavigate } from "react-router-dom";
import "../styles/course-intro.css";

export default function CourseIntro({ course }) {
  const navigate = useNavigate();

  return (
    <div className="ci-page">

      {/* SIDEBAR — temas del curso */}
      <aside className="ci-sidebar">
        <p className="ci-sidebar__label">Temas del curso</p>
        <ul className="ci-module-list">
          {course.topics.map((topic, i) => (
            <li key={i} className="ci-module-list__item">
              <span className="ci-module-list__num">{i + 1}</span>
              {topic}
            </li>
          ))}
        </ul>

        <button className="ci-back-btn" onClick={() => navigate("/cursos")}>
          ← Volver a cursos
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="ci-content">

        <p className="ci-eyebrow">{course.region_label} · {course.category}</p>
        <h1 className="ci-title">{course.title}</h1>
        <p className="ci-subtitle">{course.subtitle}</p>

        <div className="ci-hero">
          <img src={course.img} alt={course.title} />
        </div>

        <p className="ci-description">{course.description}</p>

        <button
          className="ci-start-btn"
          onClick={() => navigate(course.playerRoute)}
        >
          Comenzar curso →
        </button>

        {/* Barra de progreso */}
        <div className="ci-progress">
          <p className="ci-progress__label">
            Progreso: <strong>0 / {course.stepCount} pasos</strong>
          </p>
          <div className="ci-progress__bar">
            <div className="ci-progress__fill" style={{ width: "0%" }} />
          </div>
        </div>

      </main>

      {/* PANEL DERECHO — recompensas */}
      <aside className="ci-rewards">
        <p className="ci-sidebar__label">Recompensas</p>

        <div className="ci-reward-list">
          {course.rewards.map((reward, i) => (
            <div key={i} className="ci-reward-card">
              <div className="ci-reward-card__img-wrap">
                <img src={reward.img} alt={reward.name} />
              </div>
              <div className="ci-reward-card__info">
                <p className="ci-reward-card__name">{reward.name}</p>
                <p className="ci-reward-card__type">{reward.type}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ci-mascot">
          <img src="/img/Bonnie-3.png" alt="Bonnie" />
        </div>
      </aside>

    </div>
  );
}
