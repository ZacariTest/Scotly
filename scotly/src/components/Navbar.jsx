import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar flex justify-between items-center px-8 py-5 bg-[var(--color-primary)] relative z-50">
      {/*  ☰ + logo */}
      <div className="flex items-center gap-3">
        <button
          className="btn btn-secondary hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <span className="nav-logo text-3xl font-bold text-[var(--color-secondary)]">
          Scotly
        </span>
      </div>

      {/* MENÚ NORMAL (Desktop) */}
      <div className="nav-buttons hidden md:flex gap-4 items-center">
        <button className="btn btn-secondary">Log in</button>
        <button className="btn btn-primary">Sign in</button>
      </div>

      {/* En progreso */}
{/* MENÚ MÓVIL */}
<div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
  <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
  <Link to="/shop" onClick={() => setMenuOpen(false)}>Tienda</Link>
  <Link to="/curso" onClick={() => setMenuOpen(false)}>Cursos</Link>
  <Link to="/invasion">Invasión <span className="nav-event-badge">Evento</span></Link>
  <Link to="/donaciones" onClick={() => setMenuOpen(false)}>Donar</Link>
  <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary text-lg">Comenzar</Link>
</div>
    </nav>
  );
}



