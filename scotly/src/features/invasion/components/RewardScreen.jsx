import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { obtenerProgresoNivel } from "../../../utils/niveles";
import Toast from "../../../components/Toast";

const RESULTADO_MAP = { player: "victoria", enemy: "derrota", draw: "empate" };

export default function RewardScreen({ winner, onReset }) {
  const { user, authFetch, updateUser } = useAuth();
  const [estado, setEstado] = useState("cargando"); // cargando | ok | error
  const [recompensa, setRecompensa] = useState({ monedas: 0, xp: 0 });
  const [yaReclamado, setYaReclamado] = useState(false);

  const won = winner === "player";

  useEffect(() => {
    async function registrarResultado() {
      try {
        const res = await authFetch("/api/invasion/resultado", {
          method: "POST",
          body: JSON.stringify({ resultado: RESULTADO_MAP[winner] ?? "empate" }),
        });
        const data = await res.json();

        if (!res.ok) { setEstado("error"); return; }

        setRecompensa({ monedas: data.monedas_ganadas, xp: data.xp_ganada });
        setYaReclamado(data.yaReclamado);
        updateUser({ monedas: data.usuario.monedas, experiencia: data.usuario.experiencia, nivel: data.usuario.nivel });
        setEstado("ok");
      } catch (err) {
        console.error("Error al registrar resultado de Invasión:", err);
        setEstado("error");
      }
    }

    registrarResultado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inv-reward">
      <div className={`inv-reward__banner inv-reward__banner--${won ? "win" : "lose"}`}>
        <p className="inv-reward__title">{won ? "¡Invasión rechazada!" : "Las Highlands han caído..."}</p>
        <p className="inv-reward__sub">
          {won
            ? "Tus guerreros han defendido la aldea con honor."
            : "El Clan Rojo avanza. Reorganizá tu equipo e intentalo de nuevo."}
        </p>
      </div>

      {won && estado === "cargando" && (
        <p style={{ textAlign: "center", opacity: 0.7 }}>Calculando recompensas...</p>
      )}

      {won && estado === "ok" && (
        <>
          {yaReclamado ? (
            <p style={{ textAlign: "center", opacity: 0.8, margin: "1rem 0" }}>
              Ya reclamaste la recompensa de esta temporada. ¡Buen trabajo igual!
            </p>
          ) : (
            <div className="inv-reward__loot">
              <div className="inv-reward__item">
                <span className="inv-reward__icon">🪙</span>
                <span className="inv-reward__amount">+{recompensa.monedas}</span>
                <span className="inv-reward__label">monedas</span>
              </div>
              <div className="inv-reward__item">
                <span className="inv-reward__icon">⭐</span>
                <span className="inv-reward__amount">+{recompensa.xp}</span>
                <span className="inv-reward__label">XP</span>
              </div>
            </div>
          )}
          {user && (
            <p style={{ textAlign: "center", opacity: 0.7, fontSize: "0.85rem" }}>
              Nivel actual: {obtenerProgresoNivel(user.experiencia).nivel}
            </p>
          )}
        </>
      )}

{won && estado === "error" && (
  <Toast message={{ texto: "No se pudo registrar tu recompensa. Revisá tu conexión.", tipo: "error" }} />
)}

      <button className="inv-reward__reset" onClick={onReset}>
        Volver a elegir equipo
      </button>
    </div>
  );
}