import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { loadActiveRegion } from "../constants/regionThemes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user ? user.username.slice(0, 2).toUpperCase() : null;

  const REGION_LABELS = { sc: "Escocia", en: "Inglaterra", wa: "Gales" };
  const REGION_ICONS = { sc: "⚔", en: "👑", wa: "🐉" };
  const activeRegionCode = loadActiveRegion();
  const regionLabel = REGION_LABELS[activeRegionCode] ?? "Escocia";
  const regionIcon = REGION_ICONS[activeRegionCode] ?? "⚔";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const NAV_LINKS = [
    { to: "/", label: "Inicio" },
    { to: "/cursos", label: "Cursos" },
    { to: "/shop", label: "Tienda" },
    { to: "/donaciones", label: "Donar" },
    { to: "/invasion", label: "Invasión", badge: "Evento" },
    { to: "/reclutamiento", label: "Reclutamiento" },
  ];

  return (
    <>
      <nav className="navbar">

        {/* IZQUIERDA — hamburger + logo */}
        <div className="navbar__left">
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>

          <Link to="/" className="navbar__brand">
            <span className="nav-logo">Scotly</span>
            <span className="nav-subtitle">Legends of Britain</span>
          </Link>
        </div>

        {/* CENTRO — links desktop (ocultos en tablet/mobile) */}
        <nav className="navbar__center">
          {NAV_LINKS.map(({ to, label, badge }) => (
            <Link key={to} to={to} className="navbar__link">
              {label}
              {badge && <span className="nav-event-badge">{badge}</span>}
            </Link>
          ))}
        </nav>

        {/* DERECHA — chip de perfil o botones auth */}
        <div className="navbar__right">
          {user ? (
            <>
              <div className="navbar__coins" title="Tus monedas">
                <span className="navbar__coins-icon">Monedas 🪙</span>
                <span className="navbar__coins-amount">{user.monedas ?? 0}</span>
              </div>
              <div className="navbar__coins navbar__coins--provisiones" title="Tus provisiones">
                <span className="navbar__coins-icon">Provisiones 📜</span>
                <span className="navbar__coins-amount">{user.puntos ?? 0}</span>
              </div>
              <Link to="/inventario" className="navbar__inv-link" title="Mi inventario">
                Inventario
              </Link>
              <Link to="/perfil" className="navbar__profile" title={`Perfil de ${user.username}`}>
                {user.foto_perfil ? (
                  <img src={user.foto_perfil} alt={user.username} className="navbar__profile-avatar navbar__profile-avatar--img" />
                ) : (
                  <div className="navbar__profile-avatar">{initials}</div>
                )}
                <div className="navbar__profile-info">
                  <span className="navbar__profile-name">{user.username}</span>
                  <span className="navbar__profile-badge">{regionIcon} {regionLabel}</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setAuthOpen(true)}>Ingresar</button>
              <button className="btn btn-primary" onClick={() => setAuthOpen(true)}>Registrarse</button>
            </>
          )}
        </div>

        {user && (
          <div className="navbar__mobile-coins-group">
            <div className="navbar__mobile-coins" title="Tus monedas">
              <span className="navbar__coins-icon">🪙</span>
              <span className="navbar__coins-amount">{user.monedas ?? 0}</span>
            </div>
            <div className="navbar__mobile-coins navbar__mobile-coins--provisiones" title="Tus provisiones">
              <span className="navbar__coins-icon">📜</span>
              <span className="navbar__coins-amount">{user.puntos ?? 0}</span>
            </div>
          </div>
        )}



        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          {NAV_LINKS.map(({ to, label, badge }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
              {label}
              {badge && <span className="nav-event-badge">{badge}</span>}
            </Link>
          ))}
          <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>

          {user ? (
            <>

              <Link to="/perfil" onClick={() => setMenuOpen(false)}>Mi perfil</Link>
              <Link to="/inventario" onClick={() => setMenuOpen(false)}>Mi inventario</Link>
              <button className="btn btn-secondary" style={{ marginTop: "1.25rem" }} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginTop: "1.25rem", width: "100%", textAlign: "center" }}
              onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
            >
              Iniciar sesión
            </button>
          )}
        </div>

      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}