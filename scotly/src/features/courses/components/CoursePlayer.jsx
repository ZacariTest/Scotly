import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProgressScroll from "./ProgressScroll";
import ReadingStep from "./ReadingStep";
import QuizStep from "./QuizStep";
import "../styles/course-player.css";

export default function CoursePlayer({ course }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const step = course.steps[currentStep];
  const totalSteps = course.steps.length;

  const markComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const goNext = () => {
    markComplete();
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (index) => setCurrentStep(index);

  const isQuiz = step.type === "quiz";

  return (
    <>
      <Navbar />
      <div className="cp-player">

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
        />

        <div className="cp-player__body">

          {/* PANEL IZQUIERDO */}
          <div className={`cp-player__lesson${isQuiz ? " cp-player__lesson--quiz" : ""}`}>

            {isQuiz ? (
              <>
                {/* Imagen grande que cruza hacia el panel derecho */}
                <div className="cp-quiz-img-container">
                  <img src={course.img} alt={course.title} />
                </div>

                {/* Texto anclado abajo-izquierda, delante de la imagen */}
                <div className="cp-quiz-text">
                  <p className="cp-player__eyebrow">
                    {course.title} — Paso {currentStep + 1}
                  </p>
                  <p className="cp-player__quiz-label">
                    Comprobá lo que aprendiste
                  </p>
                </div>
              </>
            ) : (
              <ReadingStep step={step} stepNumber={currentStep + 1} />
            )}

          </div>

          {/* PANEL DERECHO */}
          <div className={`cp-player__side${isQuiz ? " cp-player__side--quiz" : ""}`}>
            {isQuiz ? (
              <QuizStep step={step} onAnswer={markComplete} />
            ) : (
              <div className="cp-player__reading-side">
                <p className="cp-player__side-hint">
                  Leé el contenido y cuando estés listo avanzá al siguiente paso.
                </p>
                <button className="cp-player__next-btn" onClick={goNext}>
                  Continuar →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
