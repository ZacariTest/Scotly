import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RARITY_LABEL = {
  rare: "Raro",
  epic: "Épico",
  common: "Común",
};

const featured = {
  name: "Alasdair el Cronista",
  desc: "Guardián de los secretos de las Highlands. Disponible por tiempo limitado.",
  price: 299,
};

export default function Shop() {
  const [category, setCategory] = useState("all");

  const data = {
    personajes: [
      { name: "Alasdair", img: "/img/Alasdair.png", price: 100, rarity: "epic" },
    ],
    cosmeticos: [
      { name: "Ropajes", img: "/img/KI.JPG", price: 50, rarity: "epic" },
    ],
    objetos: [
      { name: "Scones", img: "/img/SC1.jpg", price: 20, rarity: "common" },
    ],
  };

  const items =
    category === "all"
      ? Object.values(data).flat()
      : data[category] ?? [];

  return (
    <>
      <Navbar />
      <main className="shop-page">

        {/* Banner */}
        <section className="shop-banner">
          <div className="shop-banner-content">
            <h1 className="shop-banner-title">Tienda Scotly</h1>
            <p className="shop-banner-sub">Desbloquea personajes, cosméticos y reliquias</p>
          </div>
        </section>

        {/* Categorías */}
        <section className="shop-categories">
          {["all", "personajes", "cosmeticos", "objetos"].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </section>

        {/* Destacado */}
        <div className="shop-featured">
          <div className="shop-featured-icon">★</div>
          <div className="shop-featured-info">
            <p className="shop-featured-tag">Destacado de temporada</p>
            <p className="shop-featured-name">{featured.name}</p>
            <p className="shop-featured-desc">{featured.desc}</p>
          </div>
          <button className="shop-featured-btn">{featured.price} monedas</button>
        </div>

        {/* Grid */}
        <section className="shop-grid">
          {items.map((item, i) => (
            <div className={`shop-item rarity-${item.rarity}`} key={i}>
              <span className={`shop-rarity-badge rarity-${item.rarity}`}>
                {RARITY_LABEL[item.rarity]}
              </span>
              <div className="shop-image-wrapper">
                <img src={item.img} alt={item.name} />
                <div className="shop-item-glow" />
                <div className="shop-item-overlay">
                  <button className="shop-overlay-btn">Obtener</button>
                </div>
              </div>
              <div className="shop-item-body">
                <h3 className="shop-item-name">{item.name}</h3>
                <div className="shop-item-footer">
                  <span className="shop-item-price">{item.price} monedas</span>
                  <button className={`shop-item-btn rarity-${item.rarity}`}>
                    Obtener
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

      </main>
      <Footer />
    </>
  );
}