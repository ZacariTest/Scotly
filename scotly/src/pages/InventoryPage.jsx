import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardLevelUpModal from "../features/inventory/components/CardLevelUpModal";
import "../features/invasion/styles/invasion.css";
import "../styles/inventory.css";
import "../features/inventory/styles/cardModal.css";

const RARITY_ORDER = { legendary: 0, epic: 1, rare: 2, common: 3 };

const TABS = [
  { key: "all",    label: "Todas" },
  { key: "epic",   label: "Épicas" },
  { key: "rare",   label: "Raras" },
  { key: "common", label: "Comunes" },
];

export default function InventoryPage() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState("rarity");
  const [activeTab, setActiveTab] = useState("all");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [nivelMaximo, setNivelMaximo] = useState(7);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function cargarInventario() {
      try {
        const res = await authFetch("/api/inventario/cartas");
        const data = await res.json();

        if (res.ok) {
          const cartasMapeadas = data.cartas.map((c) => ({
            id: c.id,
            name: c.nombre,
            title: "",
            img: c.imagen,
            hp: c.hp,
            attack: c.ataque,
            speed: c.velocidad,
            rarity: c.rareza,
            cantidad: c.cantidad,
            nivel: c.nivel,
            skill: {
              name: c.habilidad_nombre,
              description: c.habilidad_descripcion,
            },
          }));
          setInventory(cartasMapeadas);
          if (data.nivel_maximo) setNivelMaximo(data.nivel_maximo);
        }
      } catch (err) {
        console.error("Error al cargar inventario:", err);
      } finally {
        setLoading(false);
      }
    }

    cargarInventario();
  }, [user, authFetch]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const filtered = useMemo(() => {
    return inventory
      .filter((c) => {
        if (activeTab !== "all" && c.rarity !== activeTab) return false;
        return (
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.title.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sort === "name")   return a.name.localeCompare(b.name);
        if (sort === "hp")     return b.hp - a.hp;
        if (sort === "atk")    return b.attack - a.attack;
        if (sort === "rarity") return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity];
        return 0;
      });
  }, [inventory, search, sort, activeTab]);

  const stats = {
    total:  inventory.length,
    epic:   inventory.filter((c) => c.rarity === "epic").length,
    rare:   inventory.filter((c) => c.rarity === "rare").length,
    common: inventory.filter((c) => c.rarity === "common").length,
  };

  const handleLevelUp = (cartaId, { nivel, cantidad }) => {
    setInventory((prev) =>
      prev.map((c) => (c.id === cartaId ? { ...c, nivel, cantidad } : c))
    );
    setCartaSeleccionada((prev) =>
      prev && prev.id === cartaId ? { ...prev, nivel, cantidad } : prev
    );
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="inv-page invent-page">

        <div className="invent-banner">
          <div className="invent-banner__glow" />
          <h1 className="invent-banner__title">Inventario</h1>
          <p className="invent-banner__sub">TUS GUERREROS</p>

          <div className="invent-banner__badges">
            <div className="invent-banner__badge invent-banner__badge--total">
              <span>{stats.total}</span> cartas
            </div>
            <div className="invent-banner__badge invent-banner__badge--epic">
              <span>{stats.epic}</span> épicas
            </div>
            <div className="invent-banner__badge invent-banner__badge--rare">
              <span>{stats.rare}</span> raras
            </div>
            <div className="invent-banner__badge">
              <span>{stats.common}</span> comunes
            </div>
          </div>
        </div>

        <div className="invent-controls">
          <div className="invent-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`invent-tab ${activeTab === t.key ? "invent-tab--active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="invent-toolbar">
            <input
              className="invent-search"
              type="text"
              placeholder="Buscar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="invent-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="rarity">Rareza</option>
              <option value="name">Nombre A-Z</option>
              <option value="hp">Mayor HP</option>
              <option value="atk">Mayor ATK</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="invent-empty">Cargando inventario...</p>
        ) : filtered.length === 0 ? (
          <p className="invent-empty">
            {inventory.length === 0
              ? "Todavía no tenés cartas. ¡Reclamá tu regalo de bienvenida!"
              : "No se encontraron cartas."}
          </p>
        ) : (
          <div className="invent-grid">
            {filtered.map((card) => (
              <div
                key={card.id}
                className={`inv-card inv-card--${card.rarity}`}
                onClick={() => setCartaSeleccionada(card)}
                role="button"
                tabIndex={0}
              >

                <span className="inv-card__rarity-label">{card.rarity}</span>
                <span className="inv-card__nivel-badge">Nv. {card.nivel}</span>

                <div className="inv-card__img-wrap">
                  <img
                    className="inv-card__img"
                    src={card.img}
                    alt={card.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  {card.cantidad > 1 && (
                    <span className="inv-card__dup-badge">x{card.cantidad}</span>
                  )}
                </div>

                <div className="inv-card__body">
                  <p className="inv-card__name">{card.name}</p>
                  <p className="inv-card__title">{card.title}</p>

                  <div className="inv-card__stats">
                    <span className="inv-stat inv-stat--hp">❤ {card.hp}</span>
                    <span className="inv-stat inv-stat--atk">⚔ {card.attack}</span>
                    <span className="inv-stat inv-stat--spd">⚡ {card.speed}</span>
                  </div>

                  <div className="inv-card__skill">
                    <span className="inv-card__skill-name">{card.skill.name}</span>
                    <span className="inv-card__skill-desc">{card.skill.description}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
      <Footer />

      {cartaSeleccionada && (
        <CardLevelUpModal
          card={cartaSeleccionada}
          nivelMaximo={nivelMaximo}
          onClose={() => setCartaSeleccionada(null)}
          onLevelUp={handleLevelUp}
        />
      )}
    </>
  );
}