// src/features/courses/data/england/intro-data.js

import { CHARACTERS } from "../../../invasion/data/characters.js";
import { course as courseArteEngland } from "./arte-england.js";

// Mismo helper que en scotland/intro-data.js — se repite acá porque son
// carpetas hermanas y así cada región queda independiente. Si en algún
// momento hay más helpers compartidos, convendría moverlos a un archivo
// común (ej. data/rewardsHelpers.js) e importarlo desde ambos lados.
function cartaComoRecompensa(codigo) {
  const carta = CHARACTERS.find((c) => c.id === codigo);
  if (!carta) return null;
  return {
    name: carta.name,
    type: carta.rarity === "common" ? "Carta común" : `Carta ${carta.rarity}`,
    img: carta.img,
  };
}

function construirRewards(courseData) {
  const rewards = (courseData.rewardCards ?? [])
    .map(cartaComoRecompensa)
    .filter(Boolean);

  if (courseData.rewardXp) {
    rewards.push({
      name: `+${courseData.rewardXp} XP`,
      type: "Experiencia",
      img: courseData.img,
    });
  }

  if (courseData.rewardPuntos) {
    rewards.push({
      name: `+${courseData.rewardPuntos} Provisiones`,
      type: "Recurso",
      img: courseData.img,
    });
  }

  return rewards;
}

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
  rewards: construirRewards(courseArteEngland),
};

export const introCocinaEngland = {
  id: "cocina-england",
  region: "england",
  region_label: "Inglaterra",
  category: "Gastronomía",
  title: "Cocina Inglesa",
  subtitle: "Del roast beef al fish and chips. La gastronomía que alimentó un imperio.",
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
  // TODO: reemplazar por construirRewards(courseCocinaEngland) cuando se
  // active este curso (agregarle rewardCards/rewardXp/rewardPuntos a
  // su archivo cocina-england.js)
  rewards: [
    { name: "Catador Imperial", type: "Título desbloqueado", img: "/img/Comida.jpg" },
    { name: "Taza de Afternoon Tea", type: "Artefacto cultural", img: "/img/Comida.jpg" },
  ],
};

export const introHistoryEngland = {
  id: "history-england",
  region: "england",
  region_label: "Inglaterra",
  category: "Historia",
  title: "Historia de Inglaterra",
  subtitle: "De los romanos a la Revolución Industrial. Los eventos que moldearon el mundo.",
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
  // TODO: reemplazar por construirRewards(courseHistoryEngland) cuando
  // se active este curso
  rewards: [
    { name: "Cronista del Imperio", type: "Título desbloqueado", img: "/img/History.jpg" },
    { name: "Pergamino de la Carta Magna", type: "Documento histórico", img: "/img/History.jpg" },
  ],
};

export const introMitologiaEngland = {
  id: "mitologia-england",
  region: "england",
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
  // se active este curso
  rewards: [
    { name: "Caballero de la Mesa Redonda", type: "Título desbloqueado", img: "/img/Mitologia.PNG" },
    { name: "Excalibur", type: "Artefacto mítico", img: "/img/Mitologia.PNG" },
  ],
};