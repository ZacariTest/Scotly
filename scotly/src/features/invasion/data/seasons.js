// Cuando tengas DB, reemplazá esto por fetch("/api/seasons/current")
export const CURRENT_SEASON = {
  id: "temporada_1",
  name: "La Invasión del Clan Rojo",
  description: "El Clan Rojo avanza desde el norte. Reúne a tus mejores guerreros y defiende las Highlands antes de que caiga el último bastión.",
  badge: "Evento activo",
  reward: {
    coins: 150,
    xp: 80,
  },
  // mode: "3v3" | "boss"
  mode: "3v3",
  enemy: {
    name: "Clan Rojo",
    members: [
      {
        id: "e_guerrero",
        name: "Guerrero Rojo",
        title: "Vanguardia",
        img: "/img/WW1.PNG",
        hp: 80,
        attack: 14,
        speed: 10,
        rarity: "common",
        skill: {
          name: "Golpe Salvaje",
          description: "Golpe crítico 1.5x daño",
          type: "crit",
          multiplier: 1.5,
          cooldown: 4,
        },
      },
      {
        id: "e_arquero",
        name: "Arquero Rojo",
        title: "Francotirador",
        img: "/img/G2.PNG",
        hp: 65,
        attack: 18,
        speed: 20,
        rarity: "common",
        skill: {
          name: "Flecha Certera",
          description: "Golpe crítico 1.8x daño",
          type: "crit",
          multiplier: 1.8,
          cooldown: 3,
        },
      },
      {
        id: "e_jefe",
        name: "Jefe del Clan",
        title: "Líder de la Invasión",
        img: "/img/ww4.PNG",
        hp: 140,
        attack: 22,
        speed: 9,
        rarity: "rare",
        skill: {
          name: "Grito de Guerra",
          description: "Sube su ataque 40% por 2 turnos",
          type: "buff",
          stat: "attack",
          multiplier: 1.4,
          duration: 2,
          cooldown: 4,
        },
      },
    ],
  },
};

// Próximas temporadas — para escalar después
export const UPCOMING_SEASONS = [
  {
    id: "temporada_2",
    name: "Las Brujas del Loch",
    description: "Próximamente...",
    locked: true,
  },
];