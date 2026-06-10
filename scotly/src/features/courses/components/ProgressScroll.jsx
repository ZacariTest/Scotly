// Barra de progreso estilo pergamino/mapa con numeración romana
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

export default function ProgressScroll({
  steps, currentStep, completedSteps,
  courseTitle, region,
  onStep, onPrev, onNext,
  isFirst, isLast,
}) {
  return (
    <div className="ps-bar">

      {/* Línea dorada superior */}
      <div className="ps-bar__top-line" />

      <div className="ps-bar__header">
        <span className="ps-bar__course-name">{courseTitle} — {regionLabel(region)}</span>
        <span className="ps-bar__counter">Paso {currentStep + 1} de {steps.length}</span>
      </div>

      {/* Camino con sellos */}
      <div className="ps-bar__path">
        {steps.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isActive = i === currentStep;
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="ps-bar__node-wrap">
              <div className="ps-bar__node">
                <button
                  className={[
                    "ps-seal",
                    isDone   ? "ps-seal--done"   : "",
                    isActive ? "ps-seal--active" : "",
                  ].join(" ")}
                  onClick={() => onStep(i)}
                  title={step.label}
                  aria-label={`Ir al paso ${i + 1}: ${step.label}`}
                >
                  {isDone ? "✓" : ROMAN[i] ?? i + 1}
                </button>
                <span className={[
                  "ps-seal__label",
                  isActive ? "ps-seal__label--active" : "",
                  isDone   ? "ps-seal__label--done"   : "",
                ].join(" ")}>
                  {step.label}
                </span>
              </div>
              {/* Conector entre nodos */}
              {!isLast && (
                <div className={[
                  "ps-connector",
                  isDone ? "ps-connector--done" : "",
                ].join(" ")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Navegación */}
      <div className="ps-bar__nav">
        <button
          className="ps-nav-btn"
          onClick={onPrev}
          disabled={isFirst}
        >
          ← Anterior
        </button>
        <button
          className="ps-nav-btn ps-nav-btn--gold"
          onClick={onNext}
          disabled={isLast}
        >
          {isLast ? "Finalizar" : "Siguiente →"}
        </button>
      </div>

    </div>
  );
}

function regionLabel(region) {
  const map = { sc: "Escocia", en: "Inglaterra", wa: "Gales", ir: "Irlanda" };
  return map[region] ?? region;
}
