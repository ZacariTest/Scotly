import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import ChestReveal from "../features/gacha/components/ChestReveal";
import "../features/gacha/styles/gacha.css";

const RARITY_LABEL = {
  common: "Común",
  rare: "Rara",
  epic: "Épica",
  legendary: "Legendaria",
};

export default function GachaPage() {
  const { user, authFetch, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  const [cargandoEstado, setCargandoEstado] = useState(true);
  const [estadoGacha, setEstadoGacha] = useState(null);
  const [fase, setFase] = useState("idle"); // idle | abriendo | revelada
  const [resultado, setResultado] = useState(null); // { carta, fue_pity }
  const [tirando, setTirando] = useState(false);
  const [error, setError] = useState(null);

  // Redirección segura (en un efecto, nunca durante el render) si no hay sesión.
  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate("/");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    // Esperamos a que AuthContext termine de leer localStorage antes de pedir nada
    // (evita el 401 por condición de carrera al recargar la página).
    if (authLoading || !user) return;

    async function cargarEstado() {
      try {
        const res = await authFetch("/api/gacha/estado");
        const data = await res.json();
        if (res.ok) setEstadoGacha(data);
      } catch (err) {
        console.error("Error al cargar estado del gacha:", err);
      } finally {
        setCargandoEstado(false);
      }
    }

    cargarEstado();
  }, [authLoading, user, authFetch]);

  const reclutar = async (moneda) => {
    if (tirando) return;
    setError(null);
    setTirando(true);
    setFase("abriendo");

    try {
      const res = await authFetch("/api/gacha/tirar", {
        method: "POST",
        body: JSON.stringify({ moneda }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo completar la tirada");
        setFase("idle");
        setTirando(false);
        return;
      }

      // Le damos tiempo a la animación del cofre antes de mostrar la carta.
      setTimeout(() => {
        setResultado(data);
        setEstadoGacha((prev) => ({
          ...prev,
          monedas: data.usuario.monedas,
          puntos: data.usuario.puntos,
          pity_contador: data.usuario.pity_contador,
        }));
        updateUser({ monedas: data.usuario.monedas, puntos: data.usuario.puntos });
        setFase("revelada");
        setTirando(false);
      }, 1500);
    } catch (err) {
      console.error("Error al tirar en el gacha:", err);
      setError("Error de conexión. Intentá de nuevo.");
      setFase("idle");
      setTirando(false);
    }
  };

  const reclutarDeNuevo = () => {
    setResultado(null);
    setFase("idle");
  };

  if (!user) return null;

  const cargando = authLoading || cargandoEstado || !estadoGacha;

  const pityPct = estadoGacha
    ? Math.min(100, Math.round((estadoGacha.pity_contador / estadoGacha.pity_umbral) * 100))
    : 0;

  const puedeMonedas = estadoGacha && estadoGacha.monedas >= estadoGacha.costo_monedas;
  const puedePuntos = estadoGacha && estadoGacha.puntos >= estadoGacha.costo_puntos;

  return (
    <>
      <Navbar />
      <main className="gacha-page">

        <div className="gacha-banner">
          <div className="gacha-banner__glow" />
          <p className="gacha-banner__eyebrow">El Arcón del Reclutador</p>
          <h1 className="gacha-banner__title">Reclutamiento</h1>
          <p className="gacha-banner__sub">
            Convocá guerreros de todas las épocas de Britania para reforzar tus filas.
          </p>
        </div>

        {cargando ? (
          <div className="gacha-panel">
            <div className="gacha-panel__top-line" />
            <p className="gacha-empty">Abriendo el registro del reclutador...</p>
          </div>
        ) : (
          <div className="gacha-panel">
            <div className="gacha-panel__top-line" />

            <div className="gacha-status">
              <div className="gacha-coin-chip gacha-coin-chip--monedas">
                <span className="gacha-coin-chip__icon">🪙</span>
                <span className="gacha-coin-chip__amount">{estadoGacha.monedas}</span>
                <span className="gacha-coin-chip__label">Monedas</span>
              </div>
              <div className="gacha-coin-chip gacha-coin-chip--puntos">
                <span className="gacha-coin-chip__icon">📜</span>
                <span className="gacha-coin-chip__amount">{estadoGacha.puntos}</span>
                <span className="gacha-coin-chip__label">Provisiones</span>
              </div>

              <div className="gacha-pity">
                <div className="gacha-pity__header">
                  <span>Garantía de {RARITY_LABEL[estadoGacha.pity_rareza]}</span>
                  <span>{estadoGacha.pity_contador} / {estadoGacha.pity_umbral}</span>
                </div>
                <div className="gacha-pity__track">
                  <div className="gacha-pity__fill" style={{ width: `${pityPct}%` }} />
                </div>
              </div>
            </div>

            <ChestReveal
              fase={fase}
              carta={resultado?.carta}
              fuePity={resultado?.fue_pity}
            />

            {error && <Toast message={{ texto: error, tipo: "error" }} />}

            {fase === "idle" && (
              <div className="gacha-actions">
                <button
                  className="gacha-btn gacha-btn--monedas"
                  disabled={!puedeMonedas || tirando}
                  onClick={() => reclutar("monedas")}
                >
                  Reclutar — {estadoGacha.costo_monedas} 🪙
                </button>
                <button
                  className="gacha-btn gacha-btn--puntos"
                  disabled={!puedePuntos || tirando}
                  onClick={() => reclutar("puntos")}
                >
                  Reclutar — {estadoGacha.costo_puntos} 📜
                </button>
              </div>
            )}

            {fase === "revelada" && (
              <div className="gacha-actions">
                <button className="gacha-btn gacha-btn--secundario" onClick={reclutarDeNuevo}>
                  Reclutar de nuevo
                </button>
                <button className="gacha-btn gacha-btn--secundario" onClick={() => navigate("/inventario")}>
                  Ver en inventario
                </button>
              </div>
            )}

            <details className="gacha-info">
              <summary>Probabilidades y garantía</summary>
              <ul>
                {estadoGacha.probabilidades &&
                  Object.entries(estadoGacha.probabilidades).map(([rareza, prob]) => (
                    <li key={rareza}>
                      <span className={`gacha-info__dot gacha-info__dot--${rareza}`} />
                      {RARITY_LABEL[rareza] ?? rareza} — {Math.round(prob * 100)}%
                    </li>
                  ))}
              </ul>
              <p>
                Si pasan {estadoGacha.pity_umbral} tiradas sin conseguir una carta {RARITY_LABEL[estadoGacha.pity_rareza]} o
                superior, la siguiente tirada la garantiza.
              </p>
            </details>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}