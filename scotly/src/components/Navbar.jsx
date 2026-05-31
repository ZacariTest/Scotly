import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

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
          <span
            className="nav-logo cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Scotly
          </span>
          <span className="nav-subtitle">Legends of Britain</span>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="nav-buttons hidden md:flex gap-4 items-center">
          <button className="btn btn-secondary" onClick={() => setAuthOpen(true)}>Ingresar</button>
          <button className="btn btn-primary" onClick={() => setAuthOpen(true)}>Registrarse</button>
        </div>

        {/* OVERLAY */}
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
          <button
            className="btn btn-primary text-lg"
            onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
          >
            Comenzar
          </button>
        </div>

      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}