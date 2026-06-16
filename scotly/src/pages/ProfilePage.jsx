import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { loadActiveRegion } from "../constants/regionThemes";

const MOCK_COURSES = [
  { name: "Arte Celta",           tag: "Gratis",      tagType: "free", progress: 82  },
  { name: "Historia Gamificada",  tag: "Interactivo", tagType: "game", progress: 45  },
  { name: "Mitología y Leyendas", tag: "Gratis",      tagType: "free", progress: 100 },
  { name: "Comida Escocesa",      tag: "Gratis",      tagType: "free", progress: 20  },
];

const MOCK_DECK = [
  { name: "Macallan",    rarity: "epic",   hp: 95, atk: 72 },
  { name: "Lagavulin",   rarity: "rare",   hp: 80, atk: 88 },
  { name: "Glenfarclas", rarity: "common", hp: 70, atk: 55 },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState({
    idioma: "Español",
    notificaciones: "Activadas",
  });

  if (!user) {
    navigate("/");
    return null;
  }

  const initials = user.username.slice(0, 2).toUpperCase();

  const REGION_LABELS = { sc: "Escocia", en: "Inglaterra", wa: "Gales" };
  const REGION_ICONS  = { sc: "⚔", en: "👑", wa: "🐉" };
  const activeCode    = loadActiveRegion();
  const regionLabel   = REGION_LABELS[activeCode] ?? "Escocia";
  const regionIcon    = REGION_ICONS[activeCode]  ?? "⚔";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">

        {/* BANNER */}
        <div className="profile-banner">
          <p className="profile-banner__eyebrow">Tu cuenta</p>
          <h1 className="profile-banner__title">Perfil</h1>
        </div>

        <div className="profile-body">

          {/* COLUMNA IZQUIERDA — avatar + cartas favoritas */}
          <aside className="profile-left">

            <div className="profile-avatar-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">{initials}</div>
                <button className="profile-avatar-cam" title="Cambiar foto">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
              </div>
              <p className="profile-username">{user.username}</p>
              <p className="profile-email">{user.email}</p>
              <span className="profile-region-badge">{regionIcon} Región activa: {regionLabel}</span>
            </div>

            <div className="profile-fav-card">
              <p className="profile-fav-label">Cartas favoritas</p>
              <div className="profile-cards">

                <div className="pmc pmc--epic">
                  <div className="pmc__bar"></div>
                  <div className="pmc__body">
                    <p className="pmc__name">Macallan</p>
                    <p className="pmc__title">El Señor de Speyside</p>
                    <div className="pmc__stats">
                      <span className="pms pms--hp">❤ 95</span>
                      <span className="pms pms--atk">⚔ 72</span>
                      <span className="pms pms--spd">⚡ 58</span>
                    </div>
                  </div>
                  <span className="pmc__rarity">epic</span>
                </div>

                <div className="pmc pmc--rare">
                  <div className="pmc__bar"></div>
                  <div className="pmc__body">
                    <p className="pmc__name">Lagavulin</p>
                    <p className="pmc__title">Guardián de Islay</p>
                    <div className="pmc__stats">
                      <span className="pms pms--hp">❤ 80</span>
                      <span className="pms pms--atk">⚔ 88</span>
                      <span className="pms pms--spd">⚡ 44</span>
                    </div>
                  </div>
                  <span className="pmc__rarity">rare</span>
                </div>

                <div className="pmc pmc--common">
                  <div className="pmc__bar"></div>
                  <div className="pmc__body">
                    <p className="pmc__name">Glenfarclas</p>
                    <p className="pmc__title">Heredero de las Highlands</p>
                    <div className="pmc__stats">
                      <span className="pms pms--hp">❤ 70</span>
                      <span className="pms pms--atk">⚔ 55</span>
                      <span className="pms pms--spd">⚡ 66</span>
                    </div>
                  </div>
                  <span className="pmc__rarity">common</span>
                </div>

                <button className="pmc-add">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Agregar carta</span>
                </button>

              </div>
            </div>

          </aside>

          {/* COLUMNA CENTRO — datos, preferencias, seguridad */}
          <div className="profile-mid">

            {/* DATOS */}
            <section className="profile-section">
              <h2 className="profile-section__title">Datos</h2>
              <div className="profile-field">
                <div className="profile-field__label">Nombre de usuario</div>
                <div className="profile-field__val">{user.username}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field__label">
                  <span>Correo electrónico</span>
                  <button className="profile-field__edit">✎ Editar</button>
                </div>
                <div className="profile-field__val">{user.email}</div>
              </div>
              <div className="profile-field">
                <div className="profile-field__label">
                  <span>Contraseña</span>
                  <button className="profile-field__edit">✎ Editar</button>
                </div>
                <div className="profile-field__val">••••••••••</div>
              </div>
            </section>

            {/* PREFERENCIAS */}
            <section className="profile-section">
              <h2 className="profile-section__title">Preferencias</h2>
              <div className="profile-pref">
                <span className="profile-pref__label">Idioma</span>
                <select
                  className="profile-select"
                  value={prefs.idioma}
                  onChange={(e) => setPrefs({ ...prefs, idioma: e.target.value })}
                >
                  <option>Español</option>
                  <option>English</option>
                </select>
              </div>
              <div className="profile-pref">
                <span className="profile-pref__label">Notificaciones</span>
                <select
                  className="profile-select"
                  value={prefs.notificaciones}
                  onChange={(e) => setPrefs({ ...prefs, notificaciones: e.target.value })}
                >
                  <option>Activadas</option>
                  <option>Solo email</option>
                  <option>Desactivadas</option>
                </select>
              </div>
            </section>

            {/* SEGURIDAD */}
            <section className="profile-section">
              <h2 className="profile-section__title">Seguridad</h2>
              <button className="profile-sec-action">
                <span>Autenticación de dos factores</span>
                <span className="profile-sec-action__arrow">›</span>
              </button>
              <button className="profile-sec-action" onClick={handleLogout}>
                <span>Cerrar todas las sesiones</span>
                <span className="profile-sec-action__arrow">›</span>
              </button>
              <button className="profile-sec-action profile-sec-action--danger">
                <span>Eliminar cuenta</span>
                <span className="profile-sec-action__arrow">›</span>
              </button>
            </section>

            <div className="profile-save-row">
              <button className="profile-save-btn">Guardar cambios</button>
            </div>

          </div>

          {/* COLUMNA DERECHA — cursos adquiridos + mazo */}
          <aside className="profile-right">

            {/* CURSOS ADQUIRIDOS */}
            <div className="profile-courses-card">
              <p className="profile-fav-label">Cursos adquiridos</p>
              <div className="profile-course-list">
                {MOCK_COURSES.map((c) => (
                  <div className="profile-course-item" key={c.name}>
                    <div className="profile-course-info">
                      <p className="profile-course-name">{c.name}</p>
                      <div className="profile-course-bar">
                        <div className="profile-course-fill" style={{ width: `${c.progress}%` }}></div>
                      </div>
                      <p className="profile-course-pct">
                        {c.progress === 100 ? "Completado ✓" : `${c.progress}% completado`}
                      </p>
                    </div>
                    <span className={`profile-course-tag profile-course-tag--${c.tagType}`}>{c.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MAZO ACTIVO */}
            <div className="profile-deck-card">
              <p className="profile-fav-label">Mazo activo</p>
              <div className="profile-deck-grid">
                {MOCK_DECK.map((c) => (
                  <div className={`profile-deck-item profile-deck-item--${c.rarity}`} key={c.name}>
                    <p className="profile-deck-name">{c.name}</p>
                    <div className="pmc__stats">
                      <span className="pms pms--hp">❤ {c.hp}</span>
                      <span className="pms pms--atk">⚔ {c.atk}</span>
                    </div>
                    <span className="profile-deck-rar">{c.rarity}</span>
                  </div>
                ))}
                <button className="profile-deck-add">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Agregar</span>
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>
      <Footer />
    </>
  );
}