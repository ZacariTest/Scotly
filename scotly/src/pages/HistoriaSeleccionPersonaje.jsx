import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnergy } from "../context/EnergyContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoEnergyModal from "../components/NoEnergyModal";
import { CHARACTERS } from "../features/invasion/data/characters";
import "../styles/historiaSeleccionPersonaje.css";

// Mapa nombre de carta → región, cruzando contra la data de personajes del frontend
const REGION_BY_NAME = Object.fromEntries(
  CHARACTERS.map((ch) => [ch.name.toLowerCase(), ch.region])
);

const REGION_CODE = {
  Escocia: "sc",
  Inglaterra: "en",
  Gales: "wa",
};

const RAREZA_LABEL = {
  common: "Común",
  rare: "Rara",
  epic: "Épica",
  legendary: "Legendaria",
};

const COSTO_CAPITULO = 1;

export default function HistoriaSeleccionPersonaje() {
  const { user, authFetch } = useAuth();
  const { spendEnergy } = useEnergy();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartas, setCartas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iniciando, setIniciando] = useState(false);
  const [sinEnergia, setSinEnergia] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function cargarCartas() {
      try {
        const res = await authFetch("/api/inventario/cartas");
        const data = await res.json();

        if (res.ok) {
          setCartas(data.cartas);
        }
      } catch (err) {
        console.error("Error al cargar inventario:", err);
      } finally {
        setLoading(false);
      }
    }

    cargarCartas();
  }, [user, authFetch]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleComenzar = async () => {
    if (!seleccionada || iniciando) return;
    setIniciando(true);

    const resultado = await spendEnergy(COSTO_CAPITULO, "historia_capitulo");

    if (!resultado.ok) {
      if (resultado.motivo === "sin_energia") {
        setSinEnergia(resultado.estado);
      }
      setIniciando(false);
      return;
    }

    // La ruta de esta pantalla siempre es ".../{capitulo}/personaje".
    // Sacamos el capítulo de la URL actual en vez de hardcodearlo,
    // así funciona para cualquier capítulo sin tocar este archivo de nuevo.
    const rutaJuego = location.pathname.replace(/\/personaje\/?$/, "");

    // La región del protagonista es la que usa HistoriaGame.jsx para decidir
    // si una elección coincide con su región y disparar el reactionText
    // exclusivo — sin esto, esa comparación siempre da false.
    const regionSeleccionada = REGION_BY_NAME[seleccionada.nombre?.toLowerCase()];

    navigate(rutaJuego, {
      state: {
        protagonista: {
          nombre: seleccionada.nombre,
          imagen: seleccionada.imagen,
          rareza: seleccionada.rareza,
          region: regionSeleccionada,
        },
      },
    });
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="hsp-page">

        <div className="hsp-header">
          <p className="hsp-header__eyebrow">Capítulo 1</p>
          <h1 className="hsp-header__title">Elegí a tu protagonista</h1>
          <p className="hsp-header__sub">
            Seleccioná una carta de tu inventario para vivir la historia en su piel.
          </p>
        </div>

        <div className="hsp-body">
          {loading ? (
            <p className="hsp-empty">Cargando tu inventario...</p>
          ) : cartas.length === 0 ? (
            <p className="hsp-empty">
              Todavía no tenés cartas. Conseguí alguna en la tienda o reclamando tu regalo de bienvenida.
            </p>
          ) : (
            <>
              <div className="hsp-grid">
                {cartas.map((c) => {
                  const region = REGION_BY_NAME[c.nombre?.toLowerCase()];
                  return (
                    <div
                      key={c.id}
                      className={`hsp-card hsp-card--${c.rareza}${seleccionada?.id === c.id ? " hsp-card--selected" : ""}`}
                      onClick={() => setSeleccionada(c)}
                    >
                      {seleccionada?.id === c.id && <span className="hsp-card__check">✓</span>}
                      <div className="hsp-card__img-wrap">
                        <img
                          className="hsp-card__img"
                          src={c.imagen}
                          alt={c.nombre}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      </div>
                      {region && (
                        <span className={`hsp-card__region-badge hsp-card__region-badge--${REGION_CODE[region] || "sc"}`}>
                          {region}
                        </span>
                      )}
                      <p className="hsp-card__nombre">{c.nombre}</p>
                      <p className={`hsp-card__rareza hsp-card__rareza--${c.rareza}`}>{RAREZA_LABEL[c.rareza] || c.rareza}</p>
                    </div>
                  );
                })}
              </div>

              <div className="hsp-actions">
                <button
                  className="hsp-btn"
                  disabled={!seleccionada || iniciando}
                  onClick={handleComenzar}
                >
                  {iniciando ? "Cargando..." : "Comenzar historia"}
                </button>
              </div>
            </>
          )}
        </div>

      </main>
      <Footer />

      {sinEnergia && (
        <NoEnergyModal
          costo={COSTO_CAPITULO}
          energiaActual={sinEnergia.energia}
          energiaMax={sinEnergia.energia_max}
          onClose={() => setSinEnergia(null)}
        />
      )}
    </>
  );
}