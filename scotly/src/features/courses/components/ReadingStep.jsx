// Renderiza los párrafos con **negrita** inline
function parseBody(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function ReadingStep({ step, stepNumber }) {
  return (
    <div className="reading-step">
      <p className="reading-step__eyebrow">Lección {stepNumber}</p>
      <h2 className="reading-step__title">{step.title}</h2>
      {step.img && (
        <div className="reading-step__img-wrap">
          <img src={step.img} alt={step.title} className="reading-step__img" />
        </div>
      )}
      <div className="reading-step__body">
        {step.body.map((paragraph, i) => (
          <p key={i}>{parseBody(paragraph)}</p>
        ))}
      </div>
    </div>
  );
}
