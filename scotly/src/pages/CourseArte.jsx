import { useNavigate } from "react-router-dom";

export default function CourseArte() {
  const navigate = useNavigate();

  return (
    <div className="course-page">
      <aside className="course-sidebar">
        <h3 className="sidebar-title">Módulos del curso</h3>
        <ul className="module-list">
          <li>1. Introducción al arte celta</li>
          <li>2. Simbolismo y patrones</li>
          <li>3. Escultura y grabado</li>
          <li>4. Diseño moderno inspirado</li>
          <li>5. Proyecto final</li>
        </ul>
        <button onClick={() => navigate("/")} className="back-btn">
          ← Volver al inicio
        </button>
      </aside>

      <main className="course-content">
        <h1 className="course-title">Curso de Arte Celta</h1>
        <p className="course-subtitle">Descubre los misterios del arte ancestral de Escocia</p>
        <div className="course-hero">
          <img src="/img/Arte.jpg" alt="Arte Celta" />
        </div>
        <p className="course-description">
          Explora la simbología celta y su conexión con la naturaleza. Aprende sobre
          los nudos, espirales y patrones que definen la estética escocesa más antigua.
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
