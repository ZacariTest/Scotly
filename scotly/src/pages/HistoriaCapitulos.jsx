import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HistoriaGame from "../components/HistoriaGame";
import Toast from "../components/Toast";
import "../styles/historia.css";

export default function HistoriaCapitulo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const protagonista = location.state?.protagonista;
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) return;

    setToast({ tipo: "error", texto: "Debés iniciar sesión para acceder a la Historia" });
    const timer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <Toast message={toast} />
        <Footer />
      </>
    );
  }

  if (!protagonista) {
    return <Navigate to="/curso/historia/capitulo-1/personaje" replace />;
  }

  return (
    <div className="historia-page">
      <Navbar />
      <HistoriaGame protagonista={protagonista} />
      <Footer />
    </div>
  );
}