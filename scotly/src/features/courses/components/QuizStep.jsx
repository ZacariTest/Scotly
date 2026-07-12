import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizStep({ step, stepIndex, courseCodigo, onAnswer, onNext }) {
  const { authFetch } = useAuth();
  const [selected, setSelected] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null); // lo llena el server, recién tras responder
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const answered = correctIndex !== null;
  const isCorrect = answered && selected === correctIndex;

  const handleSelect = async (index) => {
    if (answered || checking) return;

    setSelected(index);
    setChecking(true);
    setErrorMsg(null);

    try {
      const res = await authFetch("/api/progreso/validar-respuesta", {
        method: "POST",
        body: JSON.stringify({
          curso_codigo: courseCodigo,
          paso_index: stepIndex,
          seleccionada: index,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo validar la respuesta");
      }

      setCorrectIndex(data.correctIndex);

      if (data.correcto) {
        onAnswer();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo validar tu respuesta. Probá de nuevo.");
      setSelected(null);
    } finally {
      setChecking(false);
    }
  };

  const resetQuestion = () => {
    setSelected(null);
    setCorrectIndex(null);
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
            if (i === correctIndex) {
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
              disabled={answered || checking}
            >
              <span className="quiz-opt__letter">
                {LETTERS[i]}
              </span>

              <span>{option}</span>
            </button>
          );
        })}

      </div>

      {errorMsg && (
        <div className="quiz-step__feedback quiz-feedback--wrong">
          {errorMsg}
        </div>
      )}

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