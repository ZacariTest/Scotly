import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import "../styles/profile.css";
import "../styles/admin.css";

const formatFecha = (iso) =>
  new Date(iso).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });

export default function AdminPage() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();

  const [compras, setCompras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const [expandidoId, setExpandidoId] = useState(null);
  const [inventarios, setInventarios] = useState({}); // { userId: { cartas, items } }
  const [cargandoInventario, setCargandoInventario] = useState(null);

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    if (!user) { navigate("/"); return; }
    if (user.rol !== "admin") { navigate("/"); return; }

    async function cargar() {
      try {
        const [resCompras, resUsuarios] = await Promise.all([
          authFetch("/api/admin/compras"),
          authFetch("/api/admin/usuarios"),
        ]);
        const dataCompras = await resCompras.json();
        const dataUsuarios = await resUsuarios.json();
        setCompras(dataCompras.compras || []);
        setUsuarios(dataUsuarios.usuarios || []);
      } catch (err) {
        console.error("Error al cargar panel admin:", err);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [user, navigate, authFetch]);

  const toggleInventario = async (usuarioId) => {
    if (expandidoId === usuarioId) {
      setExpandidoId(null);
      return;
    }
    setExpandidoId(usuarioId);

    if (!inventarios[usuarioId]) {
      setCargandoInventario(usuarioId);
      try {
        const res = await authFetch(`/api/admin/usuarios/${usuarioId}/inventario`);
        const data = await res.json();
        setInventarios((prev) => ({ ...prev, [usuarioId]: data }));
      } catch (err) {
        mostrarMensaje("No se pudo cargar el inventario.", "error");
      } finally {
        setCargandoInventario(null);
      }
    }
  };

  const banear = async (usuarioId) => {
    try {
      const res = await authFetch(`/api/admin/usuarios/${usuarioId}/banear`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) { mostrarMensaje(data.error, "error"); return; }
      setUsuarios((prev) => prev.map((u) => (u.id === usuarioId ? { ...u, baneado: 1 } : u)));
      mostrarMensaje("Usuario suspendido.");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    }
  };

  const desbanear = async (usuarioId) => {
    try {
      const res = await authFetch(`/api/admin/usuarios/${usuarioId}/desbanear`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) { mostrarMensaje(data.error, "error"); return; }
      setUsuarios((prev) => prev.map((u) => (u.id === usuarioId ? { ...u, baneado: 0 } : u)));
      mostrarMensaje("Usuario reactivado.");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    }
  };

  if (!user || user.rol !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-banner">
          <p className="profile-banner__eyebrow">Panel de control</p>
          <h1 className="profile-banner__title">Administración</h1>
        </div>

        <Toast message={mensaje} />

        <div className="admin-body">
          {loading ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>Cargando panel...</p>
          ) : (
            <>
              {/* USUARIOS */}
              <section className="profile-section admin-section">
                <h2 className="profile-section__title">Usuarios ({usuarios.length})</h2>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Registro</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <Fragment key={u.id}>
                          <tr className={u.baneado ? "admin-row--baneado" : ""}>
                            <td>
                              <button className="admin-link" onClick={() => toggleInventario(u.id)}>
                                {u.username}
                              </button>
                            </td>
                            <td>{u.email}</td>
                            <td>{u.rol}</td>
                            <td>{u.baneado ? "🔴 Suspendido" : "🟢 Activo"}</td>
                            <td>{formatFecha(u.fecha_registro)}</td>
                            <td>
                              {u.rol !== "admin" && (
                                u.baneado ? (
                                  <button className="admin-btn admin-btn--ok" onClick={() => desbanear(u.id)}>
                                    Reactivar
                                  </button>
                                ) : (
                                  <button className="admin-btn admin-btn--danger" onClick={() => banear(u.id)}>
                                    Banear
                                  </button>
                                )
                              )}
                            </td>
                          </tr>
                          {expandidoId === u.id && (
                            <tr className="admin-row--inventario">
                              <td colSpan={6}>
                                {cargandoInventario === u.id ? (
                                  <p>Cargando inventario...</p>
                                ) : (
                                  <div className="admin-inventario">
                                    <div>
                                      <p className="admin-inventario__label">Cartas</p>
                                      {inventarios[u.id]?.cartas.length ? (
                                        <ul>
                                          {inventarios[u.id].cartas.map((c) => (
                                            <li key={c.codigo}>
                                              {c.nombre} ({c.rareza}) — x{c.cantidad}, nivel {c.nivel}
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="admin-inventario__vacio">Sin cartas</p>
                                      )}
                                    </div>
                                    <div>
                                      <p className="admin-inventario__label">Ítems</p>
                                      {inventarios[u.id]?.items.length ? (
                                        <ul>
                                          {inventarios[u.id].items.map((i) => (
                                            <li key={i.codigo}>
                                              {i.nombre} ({i.tipo}) — x{i.cantidad}
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="admin-inventario__vacio">Sin ítems</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* COMPRAS */}
              <section className="profile-section admin-section">
                <h2 className="profile-section__title">Compras recientes ({compras.length})</h2>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Tipo</th>
                        <th>Método</th>
                        <th>Importe</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map((c) => (
                        <tr key={c.id}>
                          <td>{c.username}</td>
                          <td>{c.tipo}</td>
                          <td>{c.metodo_pago}</td>
                          <td>{c.importe > 0 ? `€${Number(c.importe).toFixed(2)}` : "—"}</td>
                          <td>{formatFecha(c.fecha_compra)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}