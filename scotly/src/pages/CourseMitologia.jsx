import { useNavigate } from "react-router-dom";

export default function CourseMitologia() {
  const navigate = useNavigate();

  return (
    <div className="course-page">
      <aside className="course-sidebar">
        <h3 className="sidebar-title">Módulos del curso</h3>
        <ul className="module-list">
          <li>1. Introducción a la mitología celta</li>
          <li>2. Dioses y criaturas</li>
          <li>3. Leyendas del norte</li>
          <li>4. Mitología en el arte</li>
          <li>5. Narrativas modernas</li>
        </ul>
        <button onClick={() => navigate("/")} className="back-btn">
          ← Volver al inicio
        </button>
      </aside>

      <main className="course-content">
        <h1 className="course-title">Mitología y Leyendas</h1>
        <p className="course-subtitle">Sumérgete en el folclore escocés y sus héroes míticos</p>
        <div className="course-hero">
          <img src="/img/Mitologia.PNG" alt="Mitología Escocesa" />
        </div>
        <p className="course-description">
          Conoce los relatos que dieron identidad a Escocia. Desde los dioses de la
          naturaleza hasta las criaturas que habitan en lagos y montañas.
        </p>
        <button className="enroll-btn">🧾 Inscribirse al curso</button>
        <div className="progress">
          <p>Progreso del curso: <strong>0%</strong></p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "0%" }}></div>
          </div>
        </div>
      </main>

      <aside className="course-visual">
        <img src="/img/Bonnie-3.png" alt="Mascota Scotly" />
      </aside>
    </div>
  );
}
