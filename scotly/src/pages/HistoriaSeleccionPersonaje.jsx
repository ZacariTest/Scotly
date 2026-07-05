import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

export default function HistoriaSeleccionPersonaje() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartas, setCartas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleComenzar = () => {
    if (!seleccionada) return;

    // La ruta de esta pantalla siempre es ".../{capitulo}/personaje".
    // Sacamos el capítulo de la URL actual en vez de hardcodearlo,
    // así funciona para cualquier capítulo sin tocar este archivo de nuevo.
    const rutaJuego = location.pathname.replace(/\/personaje\/?$/, "");

    navigate(rutaJuego, {
      state: {
        protagonista: {
          nombre: seleccionada.nombre,
          imagen: seleccionada.imagen,
          rareza: seleccionada.rareza,
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
                      <p className={`hsp-card__rareza hsp-card__rareza--${c.rareza}`}>{c.rareza}</p>
                    </div>
                  );
                })}
              </div>

              <div className="hsp-actions">
                <button
                  className="hsp-btn"
                  disabled={!seleccionada}
                  onClick={handleComenzar}
                >
                  Comenzar historia
                </button>
              </div>
            </>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}