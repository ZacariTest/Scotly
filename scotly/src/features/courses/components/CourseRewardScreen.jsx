import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { CHARACTERS } from "../../invasion/data/characters.js";
import "../styles/course-reward.css";

export default function CourseRewardScreen({ course }) {
  const { authFetch, updateUser } = useAuth();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("cargando"); // cargando | ok | error
  const [recompensa, setRecompensa] = useState({ cartas: [], experiencia: 0, puntos: 0 });
  const [yaReclamado, setYaReclamado] = useState(false);
  const yaDisparado = useRef(false); // evita el doble POST que provoca React StrictMode en dev

  useEffect(() => {
    if (yaDisparado.current) return;
    yaDisparado.current = true;

    async function reclamar() {
      try {
        const res = await authFetch("/api/inventario/recompensa-curso", {
          method: "POST",
          body: JSON.stringify({ curso_codigo: course.id }),
        });
        const data = await res.json();

        if (!res.ok) {
          setEstado("error");
          return;
        }

        setRecompensa({
          cartas: data.cartas ?? [],
          experiencia: data.experiencia ?? 0,
          puntos: data.puntos ?? 0,
        });
        setYaReclamado(!!data.yaReclamado);
        if (data.usuario) updateUser(data.usuario);
        setEstado("ok");
      } catch (err) {
        console.error("Error al reclamar la recompensa del curso:", err);
        setEstado("error");
      }
    }

    reclamar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Junta cartas repetidas para mostrar "Catriona x2" en vez de dos tarjetas iguales
  const cartasAgrupadas = (() => {
    const conteo = {};
    recompensa.cartas.forEach((codigo) => {
      conteo[codigo] = (conteo[codigo] || 0) + 1;
    });
    return Object.entries(conteo).map(([codigo, cantidad]) => {
      const carta = CHARACTERS.find((c) => c.id === codigo);
      return {
        codigo,
        cantidad,
        nombre: carta ? carta.name : codigo,
        img: carta ? carta.img : null,
      };
    });
  })();

  return (
    <div className="cr-reward">
      <div className="cr-reward__banner">
        <p className="cr-reward__title">¡Curso completado!</p>
        <p className="cr-reward__sub">
          Terminaste <strong>{course.title}</strong>. Estas son tus recompensas.
        </p>
      </div>

      {estado === "cargando" && (
        <p className="cr-reward__loading">Calculando recompensas...</p>
      )}

      {estado === "ok" && yaReclamado && (
        <p className="cr-reward__loading">
          Ya habías reclamado la recompensa de este curso antes. ¡Buen repaso!
        </p>
      )}

      {estado === "ok" && !yaReclamado && (
        <div className="cr-reward__loot">
          {cartasAgrupadas.map((carta) => (
            <div key={carta.codigo} className="cr-reward__item">
              {carta.img ? (
                <img src={carta.img} alt={carta.nombre} className="cr-reward__item-img" />
              ) : (
                <span className="cr-reward__icon">🃏</span>
              )}
              <span className="cr-reward__amount">
                {carta.nombre}
                {carta.cantidad > 1 ? ` x${carta.cantidad}` : ""}
              </span>
              <span className="cr-reward__label">Carta</span>
            </div>
          ))}

          {recompensa.experiencia > 0 && (
            <div className="cr-reward__item">
              <span className="cr-reward__icon">⭐</span>
              <span className="cr-reward__amount">+{recompensa.experiencia}</span>
              <span className="cr-reward__label">XP</span>
            </div>
          )}

          {recompensa.puntos > 0 && (
            <div className="cr-reward__item">
              <span className="cr-reward__icon">📜</span>
              <span className="cr-reward__amount">+{recompensa.puntos}</span>
              <span className="cr-reward__label">Provisiones</span>
            </div>
          )}
        </div>
      )}

      {estado === "error" && (
        <p className="cr-reward__error">
          No se pudo registrar tu recompensa. Revisá tu conexión e intentá de nuevo más tarde.
        </p>
      )}

      <button className="cr-reward__btn" onClick={() => navigate("/cursos")}>
        Volver a cursos
      </button>
    </div>
  );
}