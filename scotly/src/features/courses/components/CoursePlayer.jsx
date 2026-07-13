import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProgressScroll from "./ProgressScroll";
import ReadingStep from "./ReadingStep";
import QuizStep from "./QuizStep";
import CourseRewardScreen from "./CourseRewardScreen";
import { applyRegionTheme } from "../../../constants/regionThemes";
import { CHARACTERS } from "../../invasion/data/characters.js";
import "../styles/course-player.css";

export default function CoursePlayer({ course }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    applyRegionTheme(course.region);
  }, [course.region]);

  const step = course.steps[currentStep];
  const totalSteps = course.steps.length;

  const markComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const goNext = () => {
    markComplete();
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Último paso resuelto: en vez de seguir mostrando el player,
      // pasamos a la pantalla de recompensa (que hace su propio POST
      // a /api/inventario/recompensa-curso al montarse).
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const goToStep = (index) => {
    if (index <= currentStep || completedSteps.includes(index - 1)) {
      setCurrentStep(index);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

const isQuiz = step.type === "quiz";

// Texto compacto de la recompensa (ej: "Catriona x2"), en vez de
// mostrar las imágenes de las cartas en cada paso de lectura.
const rewardNames = (() => {
  if (!course.rewardCards || course.rewardCards.length === 0) return "";
  const conteo = {};
  course.rewardCards.forEach((codigo) => {
    conteo[codigo] = (conteo[codigo] || 0) + 1;
  });
  return Object.entries(conteo)
    .map(([codigo, cantidad]) => {
      const carta = CHARACTERS.find((c) => c.id === codigo);
      const nombre = carta ? carta.name : codigo;
      return cantidad > 1 ? `${nombre} x${cantidad}` : nombre;
    })
    .join(", ");
})();

// Imagen del reading step que precede al quiz actual
const precedingImg = (() => {
  for (let i = currentStep - 1; i >= 0; i--) {
    if (course.steps[i].img) return course.steps[i].img;
  }
  return course.img;
})();

  return (
    <>
      <Navbar />
      <div className={`cp-player${finished ? " cp-player--finished" : ""}`}>
      {finished ? (
        <CourseRewardScreen course={course} />
      ) : (
      <>

        <ProgressScroll
          steps={course.steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          courseTitle={course.title}
          region={course.region}
          onStep={goToStep}
          onPrev={goPrev}
          onNext={goNext}
          isFirst={currentStep === 0}
          isLast={currentStep === totalSteps - 1}
          canAdvance={completedSteps.includes(currentStep)}
        />

        <div className="cp-player__body">

          {/* PANEL IZQUIERDO */}
          <div className={`cp-player__lesson${isQuiz ? " cp-player__lesson--quiz" : ""}`}>
            {isQuiz ? (
              <>
                <div className="cp-quiz-text">
                  <p className="cp-player__eyebrow">
                    {course.title} — Paso {currentStep + 1}
                  </p>
                  <p className="cp-player__quiz-label">
                    Comprobá lo que aprendiste
                  </p>
                </div>
<div className="cp-quiz-img-container">
  <img src={precedingImg} alt={course.title} />
</div>
              </>
            ) : (
              <ReadingStep step={step} stepNumber={currentStep + 1} />
            )}
          </div>

          {/* PANEL DERECHO */}
          <div className={`cp-player__side${isQuiz ? " cp-player__side--quiz" : ""}`}>
            {isQuiz ? (
              <QuizStep
                step={step}
                stepIndex={currentStep}
                courseCodigo={course.id}
                onAnswer={markComplete}
                onNext={goNext}
              />
            ) : (
              <div className="cp-player__reading-side">

                <div className="cp-side-card">
                  <span className="cp-side-card__label">Curso</span>
                  <h3>{course.title}</h3>
                </div>

                <div className="cp-side-card">
                  <span className="cp-side-card__label">Progreso</span>
                  <h3>{currentStep + 1} / {totalSteps}</h3>
                </div>

                <div className="cp-side-card">
                  <span className="cp-side-card__label">Recompensa</span>
                  <h3 className="cp-reward-compact">
                    {rewardNames || "—"}
                    {course.rewardXp ? ` · +${course.rewardXp} XP` : ""}
                    {course.rewardPuntos ? ` · +${course.rewardPuntos} Provisiones` : ""}
                  </h3>
                </div>

                <button className="cp-player__next-btn" onClick={goNext}>
                  Continuar →
                </button>

              </div>
            )}
          </div>

        </div>
      </>
      )}
      </div>
      <Footer />
    </>
  );
}