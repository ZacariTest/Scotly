export const course = {
  id: "arte",
  region: "sc",
  title: "Arte Celta",
  subtitle: "Los patrones que definieron la identidad visual escocesa",
  img: "/img/Arte.jpg",
  rewardCards: ["catriona", "duncan"], // reemplazar por 2 códigos distintos cuando haya más cartas comunes
  rewardXp: 150,

  steps: [
    // ── LECTURA 1 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Intro",
      title: "El arte de los celtas",
      img: "/img/Art1.jpg",
      body: [
        "El arte celta floreció entre los siglos V a.C. y el siglo XII d.C. en las islas británicas. A diferencia de otras tradiciones artísticas, los celtas rara vez representaban figuras humanas o animales de forma realista. Preferían los **patrones geométricos abstractos** que parecían tener vida propia.",
        "Esta tradición sobrevivió al paso del tiempo gracias a los monjes irlandeses y escoceses, quienes la incorporaron en manuscritos iluminados, joyas y cruces de piedra que aún pueden verse en Escocia hasta el día de hoy.",
      ],
    },

    // ── QUIZ 1 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Entre qué siglos floreció principalmente el arte celta en las islas británicas?",
      options: [
        "Del siglo X a.C. al siglo V d.C.",
        "Del siglo V a.C. al siglo XII d.C.",
        "Del siglo I d.C. al siglo XV d.C.",
        "Del siglo III a.C. al siglo III d.C.",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! El arte celta tuvo su auge entre el siglo V a.C. y el XII d.C., periodo en el que se desarrollaron sus formas más características.",
        wrong: "No exactamente. El arte celta floreció desde el siglo V antes de Cristo hasta el siglo XII después de Cristo, un período de casi 1700 años.",
      },
    },

    // ── LECTURA 2 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Nudos",
      title: "Los nudos celtas y su simbolismo",
      img: "/img/Art2.PNG",
      body: [
        "Los **nudos celtas** son el elemento más reconocible de este arte. Su característica principal es que no tienen principio ni fin. Una línea continua que se entrelaza formando patrones infinitos, símbolo de la **eternidad y la interconexión** de todas las cosas.",
        "Aparecen en el célebre **Libro de Kells** (siglo IX), uno de los manuscritos iluminados más elaborados de la historia, así como en cruces de piedra y joyas. Cada nudo tenía significados distintos: la trinidad, la unión entre el mundo de los vivos y los muertos, o la fuerza de la naturaleza.",
      ],
    },

    // ── QUIZ 2 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿Qué característica hace que los nudos celtas simbolicen la eternidad?",
      options: [
        "Su color dorado",
        "Siempre tienen forma circular",
        "No tienen principio ni fin",
        "Representan al sol naciente",
      ],
      correct: 2,
      feedback: {
        correct: "¡Exacto! La línea continua sin inicio ni final es la clave: representa el ciclo eterno de la vida y la interconexión de todas las cosas.",
        wrong: "No es eso. Lo que los hace únicos es que son trazos continuos sin principio ni fin, lo que los convierte en un símbolo perfecto de eternidad.",
      },
    },

    // ── LECTURA 3 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Escultura",
      title: "Cruces de piedra y grabados",
      img: "/img/Art3.jpg",
      body: [
        "Las **cruces celtas** son otra expresión icónica de este arte. Se distinguen por el círculo que rodea la intersección de los brazos. Un elemento que los diferencia de las cruces latinas comunes. Algunas teorías sugieren que el círculo representa el sol, otras que es simplemente una solución estructural para sostener los brazos de la piedra.",
        "En Escocia pueden encontrarse más de 200 cruces y piedras pictas talladas, muchas de ellas en el noreste del país. Las **piedras pictas** combinan la iconografía celta con símbolos únicos de los pueblos pictos: serpientes, espejos, peines y criaturas fantásticas que aún no han sido completamente descifradas.",
      ],
    },

    // ── QUIZ 3 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Qué elemento distingue visualmente a una cruz celta de una cruz latina común?",
      options: [
        "Sus brazos son más largos",
        "Un círculo que rodea la intersección de los brazos",
        "Está siempre tallada en granito negro",
        "No tiene brazo inferior",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! El círculo alrededor de la intersección es la marca distintiva de la cruz celta, presente en cientos de ejemplares en Escocia e Irlanda.",
        wrong: "La respuesta correcta es el círculo que rodea la intersección de los brazos, ese detalle es lo que hace inconfundible a una cruz celta.",
      },
    },

    // ── LECTURA 4 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Hoy",
      title: "El arte celta en el mundo moderno",
      img: "/img/Art7.jpg",
      body: [
        "El arte celta no quedó en el pasado. Hoy es una fuente constante de inspiración para **diseñadores, tatuadores y joyeros** de todo el mundo. Los patrones de nudos aparecen en logotipos corporativos, packaging de whisky escocés, y en millones de tatuajes.",
        "En Escocia, el arte celta es parte de la identidad nacional. Los **Highlands Games** y festivales como el **Celtic Connections** de Glasgow mantienen viva esta herencia. Incluso el logo de la selección nacional de rugby utiliza un patrón inspirado en los nudos celtas.",
      ],
    },

    // ── QUIZ FINAL ──────────────────────────────────────────
    {
      type: "quiz",
      label: "Final",
      question: "¿En cuál de estos contextos actuales se puede encontrar el arte celta?",
      options: [
        "Solo en museos de historia",
        "Únicamente en Irlanda",
        "En tatuajes, diseño gráfico y joyería moderna",
        "Exclusivamente en edificios religiosos",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! El arte celta sigue muy vivo. Aparece en tatuajes, packaging de whisky, joyas y diseño gráfico en todo el mundo.",
        wrong: "El arte celta está mucho más presente de lo que parece: lo encontrás en tatuajes, joyas, diseño de marcas y hasta en empaques de whisky escocés.",
      },
    },
  ],
};