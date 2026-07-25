import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import EnergyBar from "./EnergyBar";
import { useAuth } from "../context/AuthContext";
import { loadActiveRegion } from "../constants/regionThemes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const moreRef = useRef(null);

  const initials = user ? user.username.slice(0, 2).toUpperCase() : null;
  const isAdmin = user?.rol === "admin";

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

  // Links principales del navbar de escritorio
  const PRIMARY_LINKS = [
    { to: "/", label: "Inicio" },
    { to: "/cursos", label: "Cursos" },
    { to: "/shop", label: "Tienda" },
    { to: "/invasion", label: "Invasión", badge: "Evento" },
  ];

  // Links secundarios — viven en el dropdown "Más" del desktop
  const MORE_LINKS = [
    { to: "/donaciones", label: "Donar" },
    { to: "/reclutamiento", label: "Reclutamiento" },
  ];

  // Grupos del menú móvil
  const MOBILE_GROUPS = [
    {
      label: "Jugar",
      links: [
        { to: "/", label: "Inicio" },
        { to: "/cursos", label: "Cursos" },
        { to: "/invasion", label: "Invasión", badge: "Evento" },
        { to: "/exploracion", label: "Exploración" },
      ],
    },
    {
      label: "Comunidad",
      links: [
        { to: "/shop", label: "Tienda" },
        { to: "/donaciones", label: "Donar" },
        { to: "/reclutamiento", label: "Reclutamiento" },
        { to: "/campus", label: "Campus", badge: "Próx." },
      ],
    },
    {
      label: "Cuenta",
      links: [
        { to: "/perfil", label: "Mi perfil" },
        { to: "/inventario", label: "Mi inventario" },
        { to: "/sobre-nosotros", label: "Sobre Nosotros" },
        ...(isAdmin ? [{ to: "/admin", label: "Panel de administración" }] : []),
      ],
    },
  ];

  // Cierra el dropdown "Más" al hacer click afuera
  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen]);

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

        {/* CENTRO — links principales + dropdown "Más" (ocultos en tablet/mobile) */}
        <nav className="navbar__center">
          {PRIMARY_LINKS.map(({ to, label, badge }) => (
            <Link key={to} to={to} className="navbar__link">
              {label}
              {badge && <span className="nav-event-badge">{badge}</span>}
            </Link>
          ))}

          <div className={`navbar__more ${moreOpen ? "active" : ""}`} ref={moreRef}>
            <button
              type="button"
              className="navbar__more-toggle"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
            >
              Más
              <span className="navbar__more-chevron">▾</span>
            </button>
            <div className="navbar__more-menu">
              {MORE_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setMoreOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* DERECHA — stats compactas + perfil, o botones auth (solo desktop, se oculta en mobile por CSS) */}
        <div className="navbar__right">
          {user ? (
            <>
              <EnergyBar />
              <div className="navbar__stats">
                <span className="navbar__stat-chip" title="Tus monedas">
                  <span className="stat-icon">🪙</span>
                  {user.monedas ?? 0}
                </span>
                <span className="navbar__stat-divider" />
                <span className="navbar__stat-chip" title="Tus provisiones">
                  <span className="stat-icon">📜</span>
                  {user.puntos ?? 0}
                </span>
              </div>
              <Link to="/inventario" className="navbar__inv-link" title="Mi inventario">
                <svg className="navbar__inv-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="10" width="18" height="9" rx="1.5" />
                  <path d="M3 10c0-3.5 2.5-6 9-6s9 2.5 9 6" />
                  <path d="M3 13h18" />
                  <circle cx="12" cy="13" r="1.3" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="navbar__inv-link navbar__admin-link" title="Panel de administración">
                  Admin
                </Link>
              )}
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

        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

          {/* Energía, monedas y provisiones — fila compacta arriba del menú */}
          {user && (
            <>
              <div className="mobile-menu__energy">
                <EnergyBar />
              </div>
              <div className="mobile-menu__stats-row">
                <span className="mobile-menu__stat" title="Tus monedas">🪙 {user.monedas ?? 0}</span>
                <span className="mobile-menu__stat" title="Tus provisiones">📜 {user.puntos ?? 0}</span>
              </div>
            </>
          )}

          {/* Secciones agrupadas: Jugar / Comunidad / Cuenta */}
          {MOBILE_GROUPS.map((group) => {
            // Sin sesión, la sección "Cuenta" no aplica
            if (group.label === "Cuenta" && !user) return null;
            return (
              <div className="mobile-menu__section" key={group.label}>
                <p className="mobile-menu__section-label">{group.label}</p>
                {group.links.map(({ to, label, badge }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
                    {label}
                    {badge && <span className="nav-event-badge">{badge}</span>}
                  </Link>
                ))}
              </div>
            );
          })}

          <div className="mobile-menu__logout-section">
            {user ? (
              <button className="btn btn-secondary" onClick={handleLogout}>
                Cerrar sesión
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
              >
                Iniciar sesión
              </button>
            )}
          </div>
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