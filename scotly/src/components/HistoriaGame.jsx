import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DialogueBox from "./DialogueBox";
import historiaData, { RAREZA_BONUS } from "./HistoriaData";

const CAPITULO_CODIGO = "capitulo-1";

const RESULTADOS_UI = {
  heroico: {
    titulo: "Un huésped bien recordado",
    descripcion: "Tus respuestas dejaron una impresión clara en la casa del clan. Es probable que tu nombre se mencione la próxima vez que alguien de esta familia viaje por tus tierras.",
  },
  equilibrado: {
    titulo: "Un huésped correcto",
    descripcion: "Cumpliste con lo que se esperaba de un visitante: ni te involucraste de más, ni te desentendiste del todo. Nadie va a olvidarte, pero tampoco va a contar demasiadas historias sobre vos.",
  },
  discreto: {
    titulo: "Un huésped de paso",
    descripcion: "Preferiste no meterte en los asuntos de la casa más de lo necesario. Es una forma válida de viajar: menos riesgo, menos gloria.",
  },
};

export default function HistoriaGame({ protagonista }) {
  const { authFetch, updateUser } = useAuth();

  const [currentId, setCurrentId] = useState(historiaData[0].id);
  const [imagenActual, setImagenActual] = useState(historiaData[0].image);
  const [respuestas, setRespuestas] = useState([]); // [{ decisionId, choiceIndex }]

  const [recompensa, setRecompensa] = useState(null);
  const [cargandoRecompensa, setCargandoRecompensa] = useState(false);
  const [errorRecompensa, setErrorRecompensa] = useState(null);

  const nodo = historiaData.find((n) => n.id === currentId);
  const esFinal = !nodo.next && !nodo.choices;

  useEffect(() => {
    if (nodo.image) setImagenActual(nodo.image);
  }, [nodo]);

  // Al llegar al nodo final, se envían las respuestas al backend para que
  // calcule (del lado del servidor) el resultado y la recompensa.
  useEffect(() => {
    if (!esFinal || recompensa || cargandoRecompensa) return;

    async function reclamar() {
      setCargandoRecompensa(true);
      setErrorRecompensa(null);
      try {
        const res = await authFetch("/api/historia/completar-capitulo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            capitulo_codigo: CAPITULO_CODIGO,
            protagonista_region: protagonista?.region || null,
            protagonista_rareza: protagonista?.rareza || null,
            respuestas,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al reclamar la recompensa");
        setRecompensa(data);

        // Igual que RewardScreen: aplicamos el saldo real que ya quedó
        // persistido en la DB, no un cálculo local, para no depender de que
        // el user del AuthContext esté sincronizado en este momento.
        if (data.usuario) {
          updateUser({ monedas: data.usuario.monedas, puntos: data.usuario.puntos });
        }
      } catch (err) {
        console.error(err);
        setErrorRecompensa("No se pudo registrar tu recompensa. Probá recargar la página.");
      } finally {
        setCargandoRecompensa(false);
      }
    }

    reclamar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esFinal]);

  const personaje = nodo.isProtagonista && protagonista ? protagonista.nombre : nodo.character;
  const avatar = nodo.isProtagonista && protagonista ? protagonista.imagen : null;

  const handleNext = () => {
    if (nodo.next) setCurrentId(nodo.next);
    // La reacción exclusiva es un subtítulo de "un solo nodo": una vez que
    // el jugador avanza, se limpia para que no arrastre a los nodos futuros.
    setReaccion(null);
  };

  const handleChoice = (choice, choiceIndex) => {
    setRespuestas((prev) => [...prev, { decisionId: nodo.id, choiceIndex }]);
    setCurrentId(choice.next);
  };

  // Reacción visible en el momento si la elección coincide con la región del protagonista.
  // Se setea al elegir y se muestra como subtítulo en el nodo siguiente (ver render más abajo);
  // se limpia en handleNext, cuando el jugador avanza más allá de ese nodo.
  const [reaccion, setReaccion] = useState(null);

  const elegirOpcion = (choice, choiceIndex) => {
    if (choice.region && protagonista?.region === choice.region) {
      setReaccion(choice.reactionText || null);
    } else {
      setReaccion(null);
    }
    handleChoice(choice, choiceIndex);
  };

  if (esFinal) {
    const tier = recompensa?.resultado; // 'heroico' | 'equilibrado' | 'discreto'
    const infoUI = tier ? RESULTADOS_UI[tier] : null;

    return (
      <div className="historia-wrapper">
        <div className="historia-scene">
          <img src={imagenActual} className="historia-scene__img" alt="Escena final" />
          <div className="historia-scene__gradient" />
        </div>

        <div className="historia-resultado">
          <p className="historia-resultado__texto">{nodo.text}</p>

          {cargandoRecompensa && <p>Calculando tu resultado...</p>}

          {errorRecompensa && <p className="historia-resultado__error">{errorRecompensa}</p>}

          {infoUI && (
            <div className="historia-resultado__box">
              <h3>{infoUI.titulo}</h3>
              <p>{infoUI.descripcion}</p>
              <p className="historia-resultado__recompensa">
                +{recompensa.monedas_ganadas} monedas
                {recompensa.puntos_ganados ? ` · +${recompensa.puntos_ganados} puntos` : ""}
              </p>
              {recompensa.yaReclamado && (
                <p className="historia-resultado__aviso">
                  Ya habías completado este capítulo antes, así que no volvimos a acreditar la recompensa.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="historia-wrapper">
      <div className="historia-scene">
        <img src={imagenActual} className="historia-scene__img" alt="Escena" />
        <div className="historia-scene__gradient" />
      </div>

      {nodo.choices ? (
        <div className="historia-dialogue historia-dialogue--choices">
          <p className="historia-dialogue__character">{personaje}</p>
          <p className="historia-dialogue__text">{nodo.text}</p>

          <div className="historia-choices__opciones">
            {nodo.choices.map((choice, i) => {
              const esRegionPropia = choice.region && protagonista?.region === choice.region;
              return (
                <button
                  key={i}
                  className={`historia-choice-btn${esRegionPropia ? " historia-choice-btn--region" : ""}`}
                  onClick={() => elegirOpcion(choice, i)}
                >
                  {choice.text}
                  {esRegionPropia && (
                    <span className="historia-choice-btn__badge">Tu región</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="historia-dialogue">
          {reaccion && <p className="historia-dialogue__reaccion">{reaccion}</p>}
          <DialogueBox
            character={personaje}
            avatar={avatar}
            text={nodo.text}
            onNext={handleNext}
            isLast={false}
            progress={1}
            total={1}
          />
        </div>
      )}
    </div>
  );
}