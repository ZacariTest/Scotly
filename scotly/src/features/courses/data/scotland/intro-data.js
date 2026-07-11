// src/features/courses/data/scotland/intro-data.js
// Datos de presentación para las páginas intro de cada curso escocés

import { CHARACTERS } from "../../../invasion/data/characters.js";

// Convierte una carta real del catálogo (characters.js) en el formato
// visual que espera el panel de recompensas de CourseIntro.
function cartaComoRecompensa(codigo) {
  const carta = CHARACTERS.find((c) => c.id === codigo);
  if (!carta) return null;
  return {
    name: carta.name,
    type: carta.rarity === "common" ? "Carta común" : `Carta ${carta.rarity}`,
    img: carta.img,
  };
}

export const introArte = {
  id: "arte",
  region_label: "Escocia",
  category: "Arte",
  title: "Arte Celta",
  subtitle: "Los patrones que definieron la identidad visual escocesa durante siglos.",
  img: "/img/Arte.jpg",
  playerRoute: "/curso/arte/player",
  stepCount: 8,
  description:
    "Explorá los nudos, espirales y cruces que los celtas esculpieron en piedra, tejieron en tela y pintaron en pergamino. Este curso recorre el arte celta desde sus orígenes en la Edad del Hierro hasta su influencia en el diseño moderno.",
  topics: [
    "Orígenes del arte celta en las islas británicas",
    "Los nudos celtas y su simbolismo eterno",
    "Cruces de piedra y piedras pictas",
    "El arte celta en el mundo moderno",
  ],
  rewards: [
    cartaComoRecompensa("catriona"),
    cartaComoRecompensa("catriona"),
  ],
};

export const introCocina = {
  id: "cocina",
  region_label: "Escocia",
  category: "Gastronomía",
  title: "Comida Escocesa",
  subtitle: "Desde el haggis hasta el cranachan. Los sabores más emblemáticos de Escocia.",
  img: "/img/Comida.jpg",
  playerRoute: "/curso/cocina/player",
  stepCount: 8,
  description:
    "Descubrí la gastronomía escocesa más allá de los estereotipos. Este curso explora los ingredientes base de las Highlands, el ritual del haggis en el Día de Burns, los postres tradicionales y el mundo del whisky — con cuatro desafíos para comprobar que absorbiste el sabor de Escocia.",
  topics: [
    "La cocina escocesa: ingredientes e historia",
    "El haggis y la tradición del Día de Burns",
    "Postres y dulces tradicionales",
    "El Scotch whisky y sus regiones",
  ],
  // TODO: reemplazar por cartaComoRecompensa("codigo") cuando se definan
  // los rewardCards de este curso en su archivo cocina.js
  rewards: [
    { name: "Cocinero de las Highlands", type: "Título desbloqueado", img: "/img/Comida.jpg" },
    { name: "Copa de Cranachan", type: "Artefacto gastronómico", img: "/img/Comida.jpg" },
  ],
};

export const introHistory = {
  id: "history",
  region_label: "Escocia",
  category: "Historia",
  title: "Historia Escocesa",
  subtitle: "Clanes, batallas, reyes y revoluciones que forjaron Escocia.",
  img: "/img/History.jpg",
  playerRoute: "/curso/history/player",
  stepCount: 8,
  description:
    "Desde los misteriosos pictos hasta la Ilustración Escocesa, este curso recorre los momentos que definieron a Escocia como nación. Conocé a William Wallace, Robert the Bruce y Adam Smith y superá cuatro desafíos históricos para demostrar que conocés la cultura tan bien como sus propios habitantes.",
  topics: [
    "Los pueblos fundadores: pictos y gaélicos",
    "Las Guerras de Independencia",
    "Los clanes y la era jacobita",
    "La Unión y la Ilustración Escocesa",
  ],
  // TODO: reemplazar por cartaComoRecompensa("codigo") cuando se definan
  // los rewardCards de este curso en su archivo history.js
  rewards: [
    { name: "Cronista de las Highlands", type: "Título desbloqueado", img: "/img/History.jpg" },
    { name: "Declaración de Arbroath", type: "Documento histórico", img: "/img/History.jpg" },
  ],
};

export const introMitologia = {
  id: "mitologia",
  region_label: "Escocia",
  category: "Mitología",
  title: "Mitología y Leyendas",
  subtitle: "Selkies, kelpies y el Loch Ness. Las criaturas del imaginario escocés.",
  img: "/img/Mitologia.PNG",
  playerRoute: "/curso/mitologia/player",
  stepCount: 8,
  description:
    "Adentrarte en el folclore escocés es cruzar el límite entre lo real y lo sobrenatural. Este curso explora las criaturas más fascinantes y perturbadoras de la mitología gaélica del kelpie que acecha en los lagos a las selkies que lloran en la costa con cuatro desafíos para aprender y ganar recompensas.",
  topics: [
    "El mundo sobrenatural escocés",
    "El kelpie: el caballo del agua",
    "Las selkies: focas del alma",
    "El Monstruo del Lago Ness",
  ],
  // TODO: reemplazar por cartaComoRecompensa("codigo") cuando se definan
  // los rewardCards de este curso en su archivo mitologia.js
  rewards: [
    { name: "Guardián del Velo", type: "Título desbloqueado", img: "/img/Mitologia.PNG" },
    { name: "Piel de Selkie", type: "Artefacto mítico", img: "/img/Mitologia.PNG" },
  ],
};