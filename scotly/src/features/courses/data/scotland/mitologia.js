export const course = {
  id: "mitologia",
  region: "sc",
  title: "Mitología y Leyendas",
  subtitle: "Las criaturas y leyendas que habitan el imaginario escocés",
  img: "/img/Mitologia.PNG",
  rewardCards: ["catriona", "catriona"],
  rewardXp: 150,
  rewardPuntos: 40, // "Provisiones"

  steps: [
    // ── LECTURA 1 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Intro",
      title: "El mundo sobrenatural escocés",
      img: "/img/M1.jpg",
      body: [
        "Escocia es un país donde el límite entre el mundo de los vivos y el de los espíritus siempre fue difuso. Sus nieblas, lagos profundos y valles solitarios fueron el escenario natural para una mitología rica y perturbadora. Las criaturas del folclore escocés no son simpáticas hadas de cuento... son seres **ambiguos, peligrosos y a veces mortales**.",
        "Esta tradición sobrenatural tiene raíces en la **mitología gaélica** y en las creencias de los pictos, mezcladas con siglos de influencia vikinga y cristiana. El resultado es un mundo fantástico único, donde cada lago, bosque y colina tiene su propia historia que contar.",
      ],
    },

    // ── QUIZ 1 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿En qué tradiciones culturales tienen sus raíces las criaturas del folclore escocés?",
      options: [
        "Mitología griega y romana",
        "Folclore germánico y eslavo",
        "Mitología gaélica, creencias pictas e influencia vikinga",
        "Tradiciones árabes y africanas",
      ],
      feedback: {
        correct: "¡Correcto! El folclore escocés es una mezcla de mitología gaélica, creencias de los pueblos pictos e influencia vikinga, todo filtrado por siglos de cristianismo.",
        wrong: "Las raíces del folclore escocés están en la mitología gaélica, las creencias de los pictos y la influencia vikinga. Una mezcla única forjada durante siglos.",
      },
    },

    // ── LECTURA 2 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Kelpie",
      title: "El Kelpie: el caballo del agua",
      img: "/img/M2.jpg",
      body: [
        "El **kelpie** es quizás la criatura más temida del folclore escocés. Se presenta como un hermoso caballo negro que aparece en las orillas de ríos y lagos. Su piel es siempre húmeda y brillante. Cuando un incauto se monta en él, el kelpie se lanza al agua llevándose a su víctima al fondo, donde la devora.",
        "Los kelpies podían también adoptar **forma humana**, generalmente la de un atractivo joven con algas en el cabello. Según la leyenda, la única forma de dominar a un kelpie era colocarle un freno hecho de plata. Hoy, las famosas esculturas de acero de **The Kelpies** en Falkirk (Dos cabezas de caballo de 30 metros de altura) rinden homenaje a esta leyenda.",
      ],
    },

    // ── QUIZ 2 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿Cuál es la única forma de dominar a un kelpie según la leyenda escocesa?",
      options: [
        "Pronunciar su nombre verdadero tres veces",
        "Colocarle un freno hecho de plata",
        "Rociarlo con agua bendita al amanecer",
        "Ofrecerle un sacrificio de sal y hierro",
      ],
      feedback: {
        correct: "¡Correcto! Un freno de plata era el único objeto capaz de someter a un kelpie y convertirlo en una montura obediente, aunque peligrosa.",
        wrong: "Según la leyenda, solo un freno hecho de plata podía dominar al kelpie. Quien lo consiguiera tenía en su poder una criatura de fuerza sobrenatural.",
      },
    },

    // ── LECTURA 3 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Selkie",
      title: "Las Selkies: focas del alma",
      img: "/img/M3.jpg",
      body: [
        "Las **selkies** son seres que viven como focas en el mar, pero pueden quitarse su piel y caminar entre los humanos en forma de hombres y mujeres de extraordinaria belleza. Su tragedia es siempre la misma: un humano les roba la piel, impidiéndoles volver al mar, y las obliga a quedarse en tierra como esposas o esposos.",
        "Las historias de selkies son melancólicas y tiernas. La selkie cautiva siempre añora el océano, puede ser una buena madre o esposa, pero si algún día recupera su piel, **regresará al mar sin mirar atrás**, dejando todo atrás. Estas leyendas son especialmente comunes en las Islas Orcadas y las Shetland, donde el mar lo es todo.",
      ],
    },

    // ── QUIZ 3 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Qué le ocurre a una selkie si recupera su piel de foca?",
      options: [
        "Se convierte permanentemente en humana",
        "Pierde todos sus recuerdos del mundo marino",
        "Regresa al mar sin mirar atrás, abandonando todo",
        "Debe elegir entre el mar y su familia humana",
      ],
      feedback: {
        correct: "¡Correcto! Si una selkie recupera su piel, regresa al mar sin mirar atrás, sin importar los lazos que haya formado en tierra. Es el corazón trágico de estas leyendas.",
        wrong: "La respuesta es que regresa al mar sin mirar atrás. Una selkie con su piel recuperada no puede resistir el llamado del océano, sin importar lo que deje.",
      },
    },

    // ── LECTURA 4 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Loch Ness",
      title: "El Monstruo del Lago Ness",
      img: "/img/M4.jpg",
      body: [
        "Ninguna criatura escocesa es más famosa en el mundo que **Nessie**, el supuesto monstruo del lago Ness. Las primeras menciones a una criatura acuática en el lago datan del siglo VI, cuando el monje **San Columba** habría ahuyentado a una bestia en el río Ness. El mito moderno explotó en **1933** cuando un periódico local publicó el avistamiento de una «enorme criatura» en el lago.",
        "La famosa **fotografía de 1934,** que mostraba lo que parecía un cuello largo emergiendo del agua, fue durante décadas la prueba más citada, hasta que en **1994 se confirmó que era un fraude**. Aun así, el lago Ness recibe más de **500.000 visitantes por año** que esperan ver a Nessie. La leyenda vale más que cualquier verdad.",
      ],
    },

    // ── QUIZ FINAL ──────────────────────────────────────────
    {
      type: "quiz",
      label: "Final",
      question: "¿En qué año se reveló que la famosa fotografía del Monstruo del Lago Ness era un fraude?",
      options: [
        "1960",
        "1975",
        "1994",
        "2003",
      ],
      feedback: {
        correct: "¡Correcto! En 1994 se confirmó que la icónica fotografía de 1934 era un fraude. La «cabeza» era en realidad una figura de juguete unida a un submarino en miniatura.",
        wrong: "Fue en 1994 cuando se reveló el fraude. La fotografía de 1934 había sido fabricada con una figura de juguete sobre un submarino en miniatura, pero el mito sobrevivió intacto.",
      },
    },
  ],
};