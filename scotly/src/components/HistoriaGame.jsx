import { useState } from "react";
import DialogueBox from "./DialogueBox";
import historiaData from "./HistoriaData";

export default function HistoriaGame() {
  const [index, setIndex] = useState(0);
  const capitulo = historiaData[index];

  const handleNext = () => {
    if (index < historiaData.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("Fin del capítulo");
    }
  };

  return (
    <div className="historia-wrapper">

      {/* TÍTULO  */}
      <div className="historia-title">Historia — Capítulo 1</div>

      {/* ESCENA */}
      <div className="historia-scene">
        <img
          src={capitulo.image}
          className="historia-scene__img"
          alt="Escena"
        />
        {/* Gradiente inferior */}
        <div className="historia-scene__gradient" />
      </div>

      {/* DIÁLOGO */}
      <div className="historia-dialogue">
        <DialogueBox
          character={capitulo.character}
          text={capitulo.text}
          onNext={handleNext}
          isLast={index === historiaData.length - 1}
          progress={index + 1}
          total={historiaData.length}
        />
      </div>

      {/* CONTROLES esquina inferior */}
      <div className="historia-controls">
        <span className="historia-controls__logo">Scotly</span>
        <div className="historia-controls__btns">
          <button className="historia-ctrl-btn">Guardar</button>
          <button className="historia-ctrl-btn">Cargar</button>
          <button className="historia-ctrl-btn historia-ctrl-btn--exit">Salir</button>
        </div>
      </div>

    </div>
  );
}
