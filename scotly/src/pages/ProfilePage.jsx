import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { loadActiveRegion } from "../constants/regionThemes";

const RARITY_LABEL = { legendary: "legendary", epic: "epic", rare: "rare", common: "common" };

export default function ProfilePage() {
  const { user, logout, authFetch, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [cartas, setCartas] = useState([]);
  const [loadingCartas, setLoadingCartas] = useState(true);

  const [emailForm, setEmailForm] = useState(user?.email ?? "");
  const [editingEmail, setEditingEmail] = useState(false);

  const [editingPassword, setEditingPassword] = useState(false);
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");

  const [mensaje, setMensaje] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function cargarCartas() {
      try {
        const res = await authFetch("/api/inventario/cartas");
        const data = await res.json();
        if (res.ok) setCartas(data.cartas);
      } catch (err) {
        console.error("Error al cargar cartas:", err);
      } finally {
        setLoadingCartas(false);
      }
    }

    cargarCartas();
  }, [user, authFetch]);

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

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3500);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2_000_000) {
      mostrarMensaje("La imagen no puede pesar más de 2MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setGuardando(true);
      try {
        await updateProfile({ foto_perfil: reader.result });
        mostrarMensaje("Foto de perfil actualizada.");
      } catch (err) {
        mostrarMensaje(err.message, "error");
      } finally {
        setGuardando(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const guardarEmail = async () => {
    setGuardando(true);
    try {
      await updateProfile({ email: emailForm });
      mostrarMensaje("Email actualizado.");
      setEditingEmail(false);
    } catch (err) {
      mostrarMensaje(err.message, "error");
    } finally {
      setGuardando(false);
    }
  };

  const guardarPassword = async () => {
    if (passwordNueva.length < 6) {
      mostrarMensaje("La nueva contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }
    setGuardando(true);
    try {
      await changePassword(passwordActual, passwordNueva);
      mostrarMensaje("Contraseña actualizada.");
      setEditingPassword(false);
      setPasswordActual("");
      setPasswordNueva("");
    } catch (err) {
      mostrarMensaje(err.message, "error");
    } finally {
      setGuardando(false);
    }
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

        {mensaje && (
          <div
            style={{
              textAlign: "center",
              padding: "0.6rem",
              margin: "1rem auto 0",
              maxWidth: "420px",
              borderRadius: "8px",
              background: mensaje.tipo === "ok" ? "rgba(80,200,120,0.15)" : "rgba(255,107,107,0.15)",
              color: mensaje.tipo === "ok" ? "#4caf50" : "#ff6b6b",
            }}
          >
            {mensaje.texto}
          </div>
        )}

        <div className="profile-body">

          {/* COLUMNA IZQUIERDA — avatar + cartas reales */}
          <aside className="profile-left">

            <div className="profile-avatar-card">
              <div className="profile-avatar-wrap">
                {user.foto_perfil ? (
                  <img src={user.foto_perfil} alt="Foto de perfil" className="profile-avatar" style={{ objectFit: "cover" }} />
                ) : (
                  <div className="profile-avatar">{initials}</div>
                )}
                <button
                  className="profile-avatar-cam"
                  title="Cambiar foto"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={guardando}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFotoChange}
                />
              </div>
              <p className="profile-username">{user.username}</p>
              <p className="profile-email">{user.email}</p>
              <span className="profile-region-badge">{regionIcon} Región activa: {regionLabel}</span>
            </div>

            <div className="profile-fav-card">
              <p className="profile-fav-label">Mis cartas</p>
              <div className="profile-cards">

                {loadingCartas ? (
                  <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Cargando...</p>
                ) : cartas.length === 0 ? (
                  <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Todavía no tenés cartas.</p>
                ) : (
                  cartas.slice(0, 3).map((c) => (
                    <div className={`pmc pmc--${c.rareza}`} key={c.id}>
                      <div className="pmc__bar"></div>
                      <div className="pmc__body">
                        <p className="pmc__name">{c.nombre}</p>
                        <p className="pmc__title">{c.habilidad_nombre}</p>
                        <div className="pmc__stats">
                          <span className="pms pms--hp">❤ {c.hp}</span>
                          <span className="pms pms--atk">⚔ {c.ataque}</span>
                          <span className="pms pms--spd">⚡ {c.velocidad}</span>
                        </div>
                      </div>
                      <span className="pmc__rarity">{RARITY_LABEL[c.rareza]}</span>
                    </div>
                  ))
                )}

                <button className="pmc-add" onClick={() => navigate("/inventario")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Ver inventario</span>
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
                  <button className="profile-field__edit" onClick={() => setEditingEmail(!editingEmail)}>
                    {editingEmail ? "Cancelar" : "✎ Editar"}
                  </button>
                </div>
                {editingEmail ? (
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem" }}>
                    <input
                      type="email"
                      className="profile-select"
                      value={emailForm}
                      onChange={(e) => setEmailForm(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <button className="profile-save-btn" onClick={guardarEmail} disabled={guardando}>
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="profile-field__val">{user.email}</div>
                )}
              </div>

              <div className="profile-field">
                <div className="profile-field__label">
                  <span>Contraseña</span>
                  <button className="profile-field__edit" onClick={() => setEditingPassword(!editingPassword)}>
                    {editingPassword ? "Cancelar" : "✎ Editar"}
                  </button>
                </div>
                {editingPassword ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.4rem" }}>
                    <input
                      type="password"
                      className="profile-select"
                      placeholder="Contraseña actual"
                      value={passwordActual}
                      onChange={(e) => setPasswordActual(e.target.value)}
                    />
                    <input
                      type="password"
                      className="profile-select"
                      placeholder="Nueva contraseña"
                      value={passwordNueva}
                      onChange={(e) => setPasswordNueva(e.target.value)}
                    />
                    <button className="profile-save-btn" onClick={guardarPassword} disabled={guardando}>
                      Guardar contraseña
                    </button>
                  </div>
                ) : (
                  <div className="profile-field__val">••••••••••</div>
                )}
              </div>
            </section>

            {/* SEGURIDAD */}
            <section className="profile-section">
              <h2 className="profile-section__title">Seguridad</h2>
              <button className="profile-sec-action" onClick={handleLogout}>
                <span>Cerrar sesión</span>
                <span className="profile-sec-action__arrow">›</span>
              </button>
            </section>

          </div>

          {/* COLUMNA DERECHA — monedas y stats */}
          <aside className="profile-right">
            <div className="profile-courses-card">
              <p className="profile-fav-label">Tu progreso</p>
              <div className="profile-field" style={{ borderBottom: "none" }}>
                <div className="profile-field__label">Monedas</div>
                <div className="profile-field__val">🪙 {user.monedas}</div>
              </div>
              <div className="profile-field" style={{ borderBottom: "none" }}>
                <div className="profile-field__label">Puntos</div>
                <div className="profile-field__val">✦ {user.puntos}</div>
              </div>
              <div className="profile-field" style={{ borderBottom: "none" }}>
                <div className="profile-field__label">Experiencia</div>
                <div className="profile-field__val">⭐ {user.experiencia}</div>
              </div>
            </div>
          </aside>

        </div>
      </div>
      <Footer />
    </>
  );
}