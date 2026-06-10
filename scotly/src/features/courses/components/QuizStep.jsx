import { useState } from "react";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizStep({ step, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null);

  const answered = selected !== null;
  const isCorrect = selected === step.correct;

  const handleSelect = (index) => {
    if (answered) return;

    setSelected(index);

    // Solo marcar como completado si es correcta
    if (index === step.correct) {
      onAnswer();
    }
  };

  const resetQuestion = () => {
    setSelected(null);
  };

  return (
    <div className="quiz-step">

      <p className="quiz-step__label">
        Desafío
      </p>

      <p className="quiz-step__question">
        {step.question}
      </p>

      <div className="quiz-step__options">

        {step.options.map((option, i) => {
          let modifier = "";

          if (answered) {
            if (i === step.correct) {
              modifier = "quiz-opt--correct";
            } else if (i === selected) {
              modifier = "quiz-opt--wrong";
            }
          }

          return (
            <button
              key={i}
              className={`quiz-opt ${modifier}`}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className="quiz-opt__letter">
                {LETTERS[i]}
              </span>

              <span>{option}</span>
            </button>
          );
        })}

      </div>

      {answered && (
        <>
          <div
            className={`quiz-step__feedback quiz-feedback--${isCorrect ? "correct" : "wrong"
              }`}
          >
            {isCorrect
              ? step.feedback.correct
              : step.feedback.wrong}
          </div>

          {isCorrect && (
            <>
              <div className="quiz-step__reward">
                ⭐ Conocimiento obtenido
              </div>

              <button
                className="quiz-step__continue"
                onClick={onNext}
              >
                Continuar →
              </button>
            </>
          )}

          {!isCorrect && (
            <button
              className="quiz-step__continue"
              onClick={resetQuestion}
            >
              Volver a intentar
            </button>
          )}
        </>
      )}

    </div>
  );
}