import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Primeras dos letras del username para el avatar
  const initials = user ? user.username.slice(0, 2).toUpperCase() : null;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar flex justify-between items-center px-8 py-5 bg-[var(--color-primary)] relative z-50">

        {/* ☰ + logo */}
        <div className="flex items-center gap-3">
          <button
            className="btn btn-secondary hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <div className="flex flex-col">
            <span
              className="nav-logo cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Scotly
            </span>
            <span
              className="nav-subtitle cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Legends of Britain
            </span>
          </div>
        </div>

        {/* MENÚ DESKTOP — botones si no hay sesión, avatar si hay */}
        <div className="nav-buttons hidden md:flex gap-4 items-center">
          {user ? (
            <Link to="/perfil" className="navbar__avatar" title={user.username}>
              {initials}
            </Link>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setAuthOpen(true)}>Ingresar</button>
              <button className="btn btn-primary" onClick={() => setAuthOpen(true)}>Registrarse</button>
            </>
          )}
        </div>

        {/* OVERLAY — cierra el menú móvil al tocar fuera */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Tienda</Link>
          <Link to="/cursos" onClick={() => setMenuOpen(false)}>Cursos</Link>
          <Link to="/donaciones" onClick={() => setMenuOpen(false)}>Donar</Link>
          <Link to="/invasion" onClick={() => setMenuOpen(false)}>
            Invasión <span className="nav-event-badge">Evento</span>
          </Link>
          <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>

          {/* Si hay sesión: acceso al perfil y logout. Si no: botón de login */}
          {user ? (
            <>
              <Link to="/perfil" onClick={() => setMenuOpen(false)}>Mi perfil</Link>
              <button className="btn btn-secondary text-lg" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary text-lg"
              onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
            >
              Iniciar sesión
            </button>
          )}
        </div>

      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
