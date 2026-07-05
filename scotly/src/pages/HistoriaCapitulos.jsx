import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import capitulos from "../components/HistoriaCapitulosData";
import "../styles/historiaCapitulos.css";

export default function HistoriaCapitulos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleJugar = (capitulo) => {
    if (capitulo.estado !== "disponible") return;
    if (!user) {
      setAuthOpen(true);
      return;
    }
    navigate(capitulo.rutaSeleccion);
  };

  return (
    <>
      <Navbar />
      <main className="hc-page">

        <div className="hc-header">
          <p className="hc-header__eyebrow">Legends of Britain</p>
          <h1 className="hc-header__title">Historia</h1>
        </div>

        <div className="hc-body">
          <div className="hc-list">
            {capitulos.map((cap) => (
              <div
                key={cap.id}
                className={`hc-card${cap.estado === "disponible" ? " hc-card--available" : " hc-card--locked"}`}
              >
                <div className="hc-card__info">
                  <p className="hc-card__numero">Capítulo {cap.numero} — {cap.region}</p>
                  <p className="hc-card__titulo">{cap.titulo}</p>
                  <p className="hc-card__desc">{cap.descripcion}</p>
                  <p className="hc-card__estado">
                    {cap.estado === "disponible" ? "🔓 Disponible" : "🔒 Bloqueado"}
                  </p>
                </div>

                {cap.estado === "disponible" && (
                  <button className="hc-card__btn" onClick={() => handleJugar(cap)}>
                    Jugar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}