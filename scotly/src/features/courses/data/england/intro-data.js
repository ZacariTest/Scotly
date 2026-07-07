// src/features/courses/data/england/intro-data.js

export const introArteEngland = {
  id: "arte-england",
  region: "england",
  region_label: "Inglaterra",
  category: "Arte",
  title: "Arte Medieval Inglés",
  subtitle: "Iluminaciones, catedrales y tapices que definieron la Edad Media.",
  img: "/img/Ing-Art4.jpg",
  playerRoute: "/curso/england/arte/player",
  stepCount: 8,
  description:
    "Desde el Tapiz de Bayeux hasta las vidrieras góticas de Canterbury. Este curso corto explora el arte que la Iglesia y la nobleza inglesa dejaron como herencia al mundo. Cuatro lecturas y cuatro desafíos para descubrir cómo la piedra, el hilo y el vidrio contaron la historia de una nación.",
  topics: [
    "El arte en la Inglaterra medieval",
    "El Tapiz de Bayeux",
    "Las catedrales góticas inglesas",
    "El legado del arte medieval en la cultura moderna",
  ],
  rewards: [
    { name: "Maestro Iluminador", type: "Título desbloqueado", img: "/img/Arte.jpg" },
    { name: "Fragmento de Vitral", type: "Artefacto histórico", img: "/img/Arte.jpg" },
  ],
};

export const introCocinaEngland = {
  id: "cocina-england",
  region_label: "Inglaterra",
  category: "Gastronomía",
  title: "Cocina Inglesa",
  subtitle: "Del roast beef al fish and chips — la gastronomía que alimentó un imperio.",
  img: "/img/C2.jpg",
  playerRoute: "/curso/england/cocina/player",
  stepCount: 8,
  description:
    "Más allá del estereotipo de comida insípida, la cocina inglesa tiene una historia fascinante. Este curso recorre los platos icónicos, el ritual del té, la cultura del pub y el renacimiento gastronómico moderno, con cuatro desafíos para demostrar que conocés Inglaterra por el paladar.",
  topics: [
    "La cocina inglesa y su historia",
    "Fish and chips, roast y full English",
    "El ritual del té inglés",
    "El pub: corazón de la vida inglesa",
  ],
  rewards: [
    { name: "Catador Imperial", type: "Título desbloqueado", img: "/img/Comida.jpg" },
    { name: "Taza de Afternoon Tea", type: "Artefacto cultural", img: "/img/Comida.jpg" },
  ],
};

export const introHistoryEngland = {
  id: "history-england",
  region_label: "Inglaterra",
  category: "Historia",
  title: "Historia de Inglaterra",
  subtitle: "De los romanos a la Revolución Industrial — los eventos que moldearon el mundo.",
  img: "/img/H222.jpg",
  playerRoute: "/curso/england/history/player",
  stepCount: 8,
  description:
    "Romanos, vikingos, la Carta Magna, el mayor imperio de la historia y la Revolución Industrial, Inglaterra concentra más historia por kilómetro cuadrado que casi cualquier otro lugar del mundo. Cuatro lecturas y cuatro desafíos para recorrer los momentos que definieron la modernidad.",
  topics: [
    "Roma, los anglosajones y los vikingos",
    "La Carta Magna y el nacimiento del parlamento",
    "El Imperio Británico",
    "La Revolución Industrial",
  ],
  rewards: [
    { name: "Cronista del Imperio", type: "Título desbloqueado", img: "/img/History.jpg" },
    { name: "Pergamino de la Carta Magna", type: "Documento histórico", img: "/img/History.jpg" },
  ],
};

export const introMitologiaEngland = {
  id: "mitologia-england",
  region_label: "Inglaterra",
  category: "Mitología",
  title: "Leyendas Artúricas",
  subtitle: "El rey Arturo, Merlín y los Caballeros de la Mesa Redonda.",
  img: "/img/M11.jpg",
  playerRoute: "/curso/england/mitologia/player",
  stepCount: 8,
  description:
    "¿Existió realmente el rey Arturo? ¿Hubo una Excalibur, un Camelot, una Mesa Redonda? Este curso explora la frontera entre historia y mito en la leyenda más poderosa de la tradición británica, con cuatro desafíos para ver si sobrevivís a la corte de Camelot.",
  topics: [
    "El rey Arturo: ¿mito o historia?",
    "Merlín: el mago de los reyes",
    "Excalibur y la Mesa Redonda",
    "El legado artúrico en la cultura moderna",
  ],
  rewards: [
    { name: "Caballero de la Mesa Redonda", type: "Título desbloqueado", img: "/img/Mitologia.PNG" },
    { name: "Excalibur", type: "Artefacto mítico", img: "/img/Mitologia.PNG" },
  ],
};