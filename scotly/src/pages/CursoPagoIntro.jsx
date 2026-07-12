import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import "../styles/cursoPago.css";

const formatEuros = (value) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export default function CursoPagoIntro() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { user, authFetch } = useAuth();

  const [curso, setCurso] = useState(null);
  const [acceso, setAcceso] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comprando, setComprando] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    async function cargar() {
      try {
        const resCurso = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cursos-pagos/${codigo}`
        );
        if (!resCurso.ok) {
          navigate("/cursos");
          return;
        }
        const dataCurso = await resCurso.json();
        setCurso(dataCurso.curso);

        if (user) {
          const resAcceso = await authFetch(`/api/cursos-pagos/${codigo}/acceso`);
          const dataAcceso = await resAcceso.json();
          setAcceso(dataAcceso.acceso);
        }
      } catch (err) {
        console.error("Error al cargar curso pago:", err);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [codigo, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const comprar = async () => {
    if (!user) { setAuthOpen(true); return; }
    setComprando(true);
    try {
      // TODO(mercadopago): acredita el acceso directo, sin pasarela todavía.
      // Cuando se integre MercadoPago, este botón debe abrir el checkout
      // en vez de llamar directo al endpoint.
      const res = await authFetch(`/api/cursos-pagos/${codigo}/comprar`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarMensaje(data.error || "No se pudo completar la compra.", "error");
        return;
      }

      setAcceso(true);
      mostrarMensaje("¡Curso desbloqueado!", "ok");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    } finally {
      setComprando(false);
    }
  };

  const descargarPdf = async () => {
    setDescargando(true);
    try {
      const res = await authFetch(`/api/cursos-pagos/${codigo}/pdf`);
      if (!res.ok) {
        mostrarMensaje("No se pudo descargar la guía.", "error");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${codigo}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      mostrarMensaje("Error al descargar.", "error");
    } finally {
      setDescargando(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="cp-page">
          <p style={{ textAlign: "center", padding: "3rem" }}>Cargando curso...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!curso) return null;

  return (
    <>
      <Navbar />
      <main className="curso-pago-page">
        <Toast message={mensaje} />

        <div className="curso-pago-hero">
          {curso.imagen && <img src={curso.imagen} alt={curso.titulo} className="curso-pago-img" />}
          <div className="curso-pago-hero-overlay" />
        </div>

        <div className="curso-pago-content">
          <span className="curso-pago-badge">Contenido premium</span>
          <h1 className="curso-pago-title">{curso.titulo}</h1>
          <p className="curso-pago-desc">{curso.descripcion}</p>

          {acceso ? (
            <div className="curso-pago-desbloqueado">
              <p className="curso-pago-ok">Ya tenés acceso a esta guía.</p>
              <button
                className="curso-pago-btn curso-pago-btn-descargar"
                onClick={descargarPdf}
                disabled={descargando}
              >
                {descargando ? "Descargando..." : "Descargar guía (PDF)"}
              </button>
            </div>
          ) : (
            <div className="curso-pago-paywall">
              <span className="curso-pago-precio">{formatEuros(curso.precioEUR)}</span>
              <button
                className="curso-pago-btn curso-pago-btn-comprar"
                onClick={comprar}
                disabled={comprando}
              >
                {comprando ? "Procesando..." : "Comprar guía"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}