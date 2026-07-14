export const course = {
  id: "cocina",
  region: "sc",
  title: "Comida Escocesa",
  subtitle: "Los sabores más emblemáticos de Escocia y cómo prepararlos",
  img: "/img/Comida.jpg",
  rewardCards: ["catriona", "catriona"],
  rewardXp: 150,
  rewardPuntos: 40, // "Provisiones"

  steps: [
    // ── LECTURA 1 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Intro",
      title: "La cocina escocesa, más que haggis",
      img: "/img/G1.jpg",
      body: [
        "La gastronomía escocesa tiene fama de austera, pero esconde una riqueza enorme. Nacida en un territorio de montañas, ríos y costa, se construyó sobre ingredientes locales: **caza, pescado, avena y lácteos**. Durante siglos la cocina fue humilde y funcional — pensada para alimentar a pastores y guerreros en climas implacables.",
        "Hoy Escocia es reconocida por la calidad de sus **mariscos, whisky, cordero de las Highlands y su carne de res Aberdeen Angus**. Restaurantes de Edimburgo y Glasgow han llevado estos ingredientes tradicionales a la cocina de autor, ganando reconocimiento internacional.",
      ],
    },

    // ── QUIZ 1 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Cuáles son los ingredientes base sobre los que se construyó históricamente la cocina escocesa?",
      options: [
        "Trigo, cerdo, vino y especias orientales",
        "Caza, pescado, avena y lácteos",
        "Arroz, pollo, aceite de oliva y tomate",
        "Maíz, papas, carne vacuna y chile",
      ],
      feedback: {
        correct: "¡Correcto! La cocina escocesa se construyó sobre ingredientes del territorio: caza, pescado, avena y lácteos, disponibles en sus montañas y costas.",
        wrong: "No exactamente. La cocina escocesa se basó en lo que ofrecía su geografía: caza de las Highlands, pescado de sus ríos y costas, avena y productos lácteos.",
      },
    },

    // ── LECTURA 2 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Haggis",
      title: "El haggis: plato nacional",
      img: "/img/G02.jpg",
      body: [
        "El **haggis** es el plato nacional de Escocia por decreto poético. Fue el poeta Robert Burns quien lo inmortalizó en su «Address to a Haggis» en 1787. Se elabora con vísceras de cordero (corazón, hígado y pulmones), mezcladas con avena, cebolla, sebo y especias, todo cocido dentro del estómago del animal.",
        "Cada **25 de enero**, el Día de Burns, los escoceses celebran con una cena ritual donde el haggis es escoltado con música de gaita, se recita el poema de Burns y se sirve con **neeps and tatties** (nabo y puré de papas). Es una tradición que combina orgullo nacional, humor y buena comida.",
      ],
    },

    // ── QUIZ 2 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿Con qué acompañamiento tradicional se sirve el haggis en la cena de Burns?",
      options: [
        "Pan de avena y mermelada de grosellas",
        "Arroz blanco y salsa de whisky",
        "Neeps and tatties (nabo y puré de papas)",
        "Sopa de cebada y queso cheddar",
      ],
      feedback: {
        correct: "¡Exacto! «Neeps and tatties» nabo amarillo y puré de papas. Son los acompañantes clásicos del haggis en la cena de Burns.",
        wrong: "El acompañamiento clásico es «neeps and tatties»: nabo amarillo machacado y puré de papas, los dos vegetales más asociados a la cocina tradicional escocesa.",
      },
    },

    // ── LECTURA 3 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Dulces",
      title: "Postres y dulces tradicionales",
      img: "/img/G3.png",
      body: [
        "La repostería escocesa tiene nombre propio. El **shortbread** una galleta mantecosa de harina, mantequilla y azúcar. Se exporta al mundo entero en latas con motivos de tartán. El **cranachan** es el postre festivo por excelencia: crema batida con whisky, miel, frambuesas frescas y avena tostada.",
        "También existe el **clootie dumpling**, un budín especiado cocido en un paño de tela, y el **tablet**, una golosina similar al fudge pero más granulada y seca, que se vende en cada mercado artesanal de Edimburgo. Estos dulces representan el alma de la cocina doméstica escocesa.",
      ],
    },

    // ── QUIZ 3 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Cuáles son los ingredientes principales del cranachan, el postre festivo escocés?",
      options: [
        "Chocolate, naranja, nata y bizcochos",
        "Crema batida, whisky, miel, frambuesas y avena tostada",
        "Leche condensada, coco, limón y galletas",
        "Mantequilla, azúcar morena, canela y manzana",
      ],
      feedback: {
        correct: "¡Correcto! El cranachan combina crema batida, whisky escocés, miel, frambuesas frescas y avena tostada. Un postre que resume el paisaje y los sabores de Escocia.",
        wrong: "El cranachan lleva crema batida, whisky, miel, frambuesas frescas y avena tostada. Cada ingrediente tiene su raíz en la despensa tradicional escocesa.",
      },
    },

    // ── LECTURA 4 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Whisky",
      title: "El whisky: el oro líquido de Escocia",
      img: "/img/G4.jpg",
      body: [
        "El **Scotch whisky** es uno de los productos más exportados de Escocia y parte central de su identidad cultural. Existen cinco regiones productoras reconocidas: **Speyside, Highlands, Lowlands, Islay y Campbeltown**, cada una con un perfil de sabor propio que va desde los suaves y afrutados del Speyside hasta los ahumados e intensos de Islay.",
        "La ley escocesa exige que el whisky se destile y madure en Escocia durante un **mínimo de tres años** en barriles de roble. El proceso de malteado de la cebada, la calidad del agua de manantial y el tipo de barril son los factores que determinan el carácter de cada expresión. Más de **140 destilerías** están activas hoy en el país.",
      ],
    },

    // ── QUIZ FINAL ──────────────────────────────────────────
    {
      type: "quiz",
      label: "Final",
      question: "¿Cuánto tiempo mínimo debe madurar el Scotch whisky en barril de roble según la ley escocesa?",
      options: [
        "Un año",
        "Cinco años",
        "Tres años",
        "Diez años",
      ],
      feedback: {
        correct: "¡Correcto! La legislación escocesa exige un mínimo de tres años de maduración en barril de roble para que una bebida pueda llamarse Scotch whisky.",
        wrong: "La ley escocesa establece tres años como el mínimo de maduración en barril de roble. Por debajo de ese tiempo, no puede llamarse Scotch whisky.",
      },
    },
  ],
};