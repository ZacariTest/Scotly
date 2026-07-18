// src/pages/PaginaExploracion.jsx
//
// Carga las cartas del usuario (mismo endpoint que usa Inventario:
// GET /api/inventario/cartas) y monta el <ExploracionPanel />.
//
// Usa `authFetch` del AuthContext para que el token (scotly_token) se
// adjunte automáticamente en el header Authorization. Para refrescar el
// usuario tras reclamar una recompensa se usa `updateUser`, que es lo que
// realmente expone AuthContext (no `setUser`).
//
// Sigue el mismo esquema de layout y carga que el resto de las páginas
// protegidas (ver GachaPage.jsx): Navbar/Footer propios, redirección si no
// hay sesión, y espera a que `authLoading` termine antes de pedir datos
// (evita el 401 por condición de carrera al recargar la página).

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExploracionPanel from "../features/exploracion/components/ExploracionPanel";
import "../features/exploracion/styles/exploracion.css";

export default function PaginaExploracion() {
  const { user, authFetch, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  const [cartas, setCartas] = useState([]);
  const [cargandoCartas, setCargandoCartas] = useState(true);
  const [error, setError] = useState(null);

  // Redirección segura (en un efecto, nunca durante el render) si no hay sesión.
  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate("/");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    // Esperamos a que AuthContext termine de leer localStorage antes de pedir nada.
    if (authLoading || !user) return;

    async function cargarInventario() {
      try {
        const res = await authFetch("/api/inventario/cartas");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No se pudo cargar el inventario");
        setCartas(data.cartas || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargandoCartas(false);
      }
    }
    cargarInventario();
  }, [authLoading, user, authFetch]);

  const handleRecompensaReclamada = (usuarioActualizado) => {
    // Refresca monedas/puntos en el navbar y el resto de la app.
    updateUser(usuarioActualizado);
  };

  if (!user) return null;

  const cargando = authLoading || cargandoCartas;

  return (
    <>
      <Navbar />
      <main className="pagina-exploracion">
        <header className="pagina-exploracion__header">
          <h1>Exploración</h1>
          <p>
            Mandá una de tus cartas a explorar por un tiempo (según su rareza) a
            cambio de recursos y, con suerte, algo de monedas. La carta sigue
            disponible normalmente para todo lo demás mientras tanto.
          </p>
        </header>

        {cargando && <p className="pagina-exploracion__estado">Cargando tu inventario…</p>}
        {error && <p className="pagina-exploracion__estado pagina-exploracion__estado--error">{error}</p>}

        {!cargando && !error && (
          <ExploracionPanel
            cartas={cartas}
            onRecompensaReclamada={handleRecompensaReclamada}
          />
        )}
      </main>
      <Footer />
    </>
  );
}