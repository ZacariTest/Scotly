import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import { TIENDA_ASSETS } from "../features/tienda/data/tiendaAssets";

const RARITY_LABEL = {
  legendary: "Legendaria",
  epic: "Épico",
  rare: "Raro",
  common: "Común",
};

export default function Shop() {
  const { user, authFetch, updateUser } = useAuth();
  const [category, setCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [monedasPacks, setMonedasPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comprando, setComprando] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    async function cargarTienda() {
      try {
        const [resItems, resDestacado, resMonedas] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/tienda/items`),
          fetch(`${import.meta.env.VITE_API_URL}/api/tienda/destacado`),
          fetch(`${import.meta.env.VITE_API_URL}/api/tienda/monedas`),
        ]);
        const dataItems = await resItems.json();
        const dataDestacado = await resDestacado.json();
        const dataMonedas = await resMonedas.json();

        setItems(dataItems.items || []);
        setDestacados(dataDestacado.cartas || []);
        setMonedasPacks(dataMonedas.items || []);
      } catch (err) {
        console.error("Error al cargar la tienda:", err);
      } finally {
        setLoading(false);
      }
    }
    cargarTienda();
  }, []);

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  const comprarItem = async (item) => {
    if (!user) { setAuthOpen(true); return; }
    setComprando(item.id);
    try {
      const res = await authFetch("/api/tienda/comprar-item", {
        method: "POST",
        body: JSON.stringify({ item_id: item.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarMensaje(data.error === "Monedas insuficientes" ? "No tenés monedas suficientes." : "No se pudo completar la compra.", "error");
        return;
      }

      updateUser({ monedas: user.monedas - item.precio_monedas });
      mostrarMensaje(`¡${item.nombre} obtenido!`, "ok");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    } finally {
      setComprando(null);
    }
  };

  const comprarCarta = async (carta) => {
    if (!user) { setAuthOpen(true); return; }
    setComprando(carta.id);
    try {
      const res = await authFetch("/api/tienda/comprar-carta", {
        method: "POST",
        body: JSON.stringify({ carta_id: carta.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarMensaje(data.error === "Monedas insuficientes" ? "No tenés monedas suficientes." : "No se pudo completar la compra.", "error");
        return;
      }

      updateUser({ monedas: user.monedas - carta.precio_monedas });
      mostrarMensaje(`¡${carta.nombre} obtenida!`, "ok");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    } finally {
      setComprando(null);
    }
  };

  const comprarMoneda = async (pack) => {
    if (!user) { setAuthOpen(true); return; }
    const comprandoId = `moneda-${pack.id}`;
    setComprando(comprandoId);
    try {
      const res = await authFetch("/api/tienda/comprar-moneda", {
        method: "POST",
        body: JSON.stringify({ item_id: pack.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarMensaje("No se pudo completar la compra.", "error");
        return;
      }

      // El backend devuelve el saldo real (fuente de verdad), no lo calculamos a mano
      updateUser({ monedas: data.monedas_totales });
      mostrarMensaje(`¡+${pack.cantidad_otorgada} monedas acreditadas!`, "ok");
    } catch (err) {
      mostrarMensaje("Error de conexión.", "error");
    } finally {
      setComprando(null);
    }
  };

  // Normaliza items + cartas destacadas a un mismo shape para el grid
  const normalizados = [
    ...destacados.map((c) => ({
      id: `carta-${c.id}`,
      rawId: c.id,
      tipo: "carta",
      name: c.nombre,
      img: c.imagen,
      price: c.precio_monedas,
      rarity: c.rareza,
      categoria: "personajes",
    })),
    ...items.map((i) => ({
      id: `item-${i.id}`,
      rawId: i.id,
      tipo: "item",
      name: i.nombre,
      img: TIENDA_ASSETS[i.codigo]?.img ?? null,
      price: i.precio_monedas,
      rarity: "common",
      categoria: i.tipo === "cosmetico" ? "cosmeticos" : "objetos",
    })),
  ];

  const filtrados =
    category === "all"
      ? normalizados
      : normalizados.filter((i) => i.categoria === category);

  const featured = destacados[0];

  // Paquete con mejor relación monedas/precio — se marca como "mejor oferta"
  const mejorOfertaId = monedasPacks.reduce((mejorId, pack) => {
    if (!mejorId) return pack.id;
    const mejor = monedasPacks.find((p) => p.id === mejorId);
    const valorActual = pack.cantidad_otorgada / pack.precio_real;
    const valorMejor = mejor.cantidad_otorgada / mejor.precio_real;
    return valorActual > valorMejor ? pack.id : mejorId;
  }, null);

  const handleComprar = (entry) => {
    if (entry.tipo === "carta") {
      const carta = destacados.find((c) => c.id === entry.rawId);
      comprarCarta(carta);
    } else {
      const item = items.find((i) => i.id === entry.rawId);
      comprarItem(item);
    }
  };

  return (
    <>
      <Navbar />
      <main className="shop-page">

        {/* Banner */}
        <section className="shop-banner">
          <div className="shop-banner-content">
            <h1 className="shop-banner-title">Tienda Scotly</h1>
            <p className="shop-banner-sub">Desbloquea personajes, cosméticos y reliquias</p>
            {user && (
              <p style={{ marginTop: "0.5rem", opacity: 0.85 }}>
                Tenés <strong>{user.monedas}</strong> monedas
              </p>
            )}
          </div>
        </section>

<Toast message={mensaje} />

        {/* Categorías */}
        <section className="shop-categories">
          {["all", "personajes", "cosmeticos", "objetos", "monedas"].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </section>

        {/* Destacado (solo tiene sentido fuera de la pestaña de monedas) */}
        {featured && category !== "monedas" && (
          <div className="shop-featured">
            <div className="shop-featured-icon">★</div>
            <div className="shop-featured-info">
              <p className="shop-featured-tag">Destacado de temporada</p>
              <p className="shop-featured-name">{featured.nombre}</p>
              <p className="shop-featured-desc">{featured.habilidad_descripcion}</p>
            </div>
            <button
              className="shop-featured-btn"
              onClick={() => comprarCarta(featured)}
              disabled={comprando === featured.id}
            >
              {comprando === featured.id ? "..." : `${featured.precio_monedas} monedas`}
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>Cargando tienda...</p>
        ) : category === "monedas" ? (
          <section className="shop-coin-grid">
            {monedasPacks.map((pack) => {
              const comprandoId = `moneda-${pack.id}`;
              const esMejorOferta = pack.id === mejorOfertaId;
              return (
                <div
                  className={`shop-coin-card${esMejorOferta ? " mejor-oferta" : ""}`}
                  key={pack.id}
                >
                  {esMejorOferta && (
                    <span className="shop-coin-ribbon">Mejor oferta</span>
                  )}
                  <div className="shop-coin-icon">
                    {TIENDA_ASSETS[pack.codigo]?.img ? (
                      <img src={TIENDA_ASSETS[pack.codigo].img} alt={pack.nombre} />
                    ) : (
                      "🪙"
                    )}
                  </div>
                  <h3 className="shop-coin-amount">
                    {pack.cantidad_otorgada.toLocaleString("es-AR")}
                  </h3>
                  <p className="shop-coin-desc">{pack.descripcion}</p>
                  <button
                    className="shop-coin-btn"
                    onClick={() => comprarMoneda(pack)}
                    disabled={comprando === comprandoId}
                  >
                    {comprando === comprandoId ? "..." : `US$ ${Number(pack.precio_real).toFixed(2)}`}
                  </button>
                </div>
              );
            })}
          </section>
        ) : (
          <section className="shop-grid">
            {filtrados.map((item) => (
              <div className={`shop-item rarity-${item.rarity}`} key={item.id}>
                <span className={`shop-rarity-badge rarity-${item.rarity}`}>
                  {RARITY_LABEL[item.rarity]}
                </span>
                <div className="shop-image-wrapper">
                  {item.img && <img src={item.img} alt={item.name} />}
                  <div className="shop-item-glow" />
                  <div className="shop-item-overlay">
                    <button
                      className="shop-overlay-btn"
                      onClick={() => handleComprar(item)}
                      disabled={comprando === item.rawId}
                    >
                      {comprando === item.rawId ? "..." : "Obtener"}
                    </button>
                  </div>
                </div>
                <div className="shop-item-body">
                  <h3 className="shop-item-name">{item.name}</h3>
                  <div className="shop-item-footer">
                    <span className="shop-item-price">{item.price} monedas</span>
                    <button
                      className={`shop-item-btn rarity-${item.rarity}`}
                      onClick={() => handleComprar(item)}
                      disabled={comprando === item.rawId}
                    >
                      {comprando === item.rawId ? "..." : "Obtener"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}