import { useNavigate } from "react-router-dom";

export default function CourseCocina() {
  const navigate = useNavigate();

  return (
    <div className="course-page">
      {/* Sidebar izquierda */}
      <aside className="course-sidebar">
        <h3 className="sidebar-title">Módulos del curso</h3>
        <ul className="module-list">
          <li>1. Introducción a la cocina escocesa</li>
          <li>2. Platos tradicionales</li>
          <li>3. Ingredientes y técnicas</li>
          <li>4. Recetas emblemáticas</li>
          <li>5. Cierre y trivia final</li>
        </ul>

        <button onClick={() => navigate("/")} className="back-btn">
          ← Volver al inicio
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="course-content">
        <h1 className="course-title">Curso de Comida Escocesa</h1>
        <p className="course-subtitle">
          Aprende a cocinar los sabores más emblemáticos de Escocia
        </p>

        <div className="course-hero">
          <img src="/img/History.jpg" alt="Comida escocesa" />
        </div>

        <p className="course-description">
          Este curso te introducirá en los fundamentos de la gastronomía escocesa:
          desde los ingredientes más utilizados, hasta las recetas más tradicionales como
          el <b>haggis</b>, el <b>bannock</b> o el <b>cranachan</b>. Aprende técnicas simples
          para preparar comidas auténticas con un toque cultural único.
        </p>

        {/* Botón de inscripción */}
        <button className="enroll-btn"> Inscribirse al curso</button>

        {/* Barra de progreso (0%) */}
        <div className="progress">
          <p>Progreso del curso: <strong>0%</strong></p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "0%" }}></div>
          </div>
        </div>
      </main>

      {/* Panel visual lateral */}
      <aside className="course-visual">
        <img src="/img/Bonnie-3.png" alt="Mascota Scotly" />
      </aside>
    </div>
  );
}
