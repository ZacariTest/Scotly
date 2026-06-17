export const course = {
  id: "arte-england",
  region: "england",
  title: "Arte Medieval Inglés",
  subtitle: "Iluminaciones, catedrales y tapices que definieron la Edad Media",
  img: "/img/Arte.jpg",

  steps: [
    {
      type: "reading",
      label: "Intro",
      title: "El arte en la Inglaterra medieval",
      img: "/img/Ing-Art4.jpg",
      body: [
        "El arte medieval inglés floreció entre los siglos IX y XV, impulsado principalmente por la Iglesia y la nobleza. A diferencia del arte celta, se caracterizó por su narratividad, cada obra contaba una historia bíblica, histórica o heroica. Los **manuscritos iluminados**, las vidrieras de las catedrales y los tapices bordados fueron sus formas más elaboradas.",
        "La conquista normanda de **1066** transformó radicalmente el arte inglés, fusionando la tradición anglosajona con influencias francesas y mediterráneas. El resultado fue un estilo románico y luego gótico que dejó monumentos como la **Catedral de Canterbury** y la **Abadía de Westminster**.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Qué evento en 1066 transformó radicalmente el arte inglés medieval?",
      options: [
        "La firma de la Carta Magna",
        "La conquista normanda",
        "La Guerra de las Rosas",
        "La fundación de la Universidad de Oxford",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! La conquista normanda de 1066 fusionó la tradición anglosajona con influencias francesas, dando origen al estilo románico y luego gótico en Inglaterra.",
        wrong: "Fue la conquista normanda de 1066 la que transformó el arte inglés, fusionando tradiciones anglosajonas con influencias francesas y mediterráneas.",
      },
    },
    {
      type: "reading",
      label: "Tapiz",
      title: "El Tapiz de Bayeux",
      img: "/img/Ing-Art2.jpg",
      body: [
        "El **Tapiz de Bayeux** es una de las obras más extraordinarias del arte medieval. Con casi 70 metros de largo, narra en hilo bordado la conquista normanda de Inglaterra — desde la muerte del rey Eduardo el Confesor hasta la Batalla de Hastings en 1066. Es a la vez una obra de arte, un documento histórico y una pieza de propaganda política.",
        "Aunque su nombre lo asocia a la ciudad francesa de Bayeux, fue casi con certeza **bordado en Inglaterra**, probablemente en Canterbury. Más de 50 escenas representan batallas, banquetes, preparativos militares y señales astronómicas como el **cometa Halley**, visible ese año y leído como un presagio de la invasión.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿Cuántos metros de largo tiene aproximadamente el Tapiz de Bayeux?",
      options: [
        "20 metros",
        "45 metros",
        "70 metros",
        "120 metros",
      ],
      correct: 2,
      feedback: {
        correct: "¡Exacto! El Tapiz de Bayeux mide casi 70 metros de largo, convirtiéndolo en una de las narrativas visuales más extensas del arte medieval.",
        wrong: "El Tapiz de Bayeux mide casi 70 metros, una longitud excepcional que le permite narrar toda la conquista normanda en más de 50 escenas.",
      },
    },
    {
      type: "reading",
      label: "Gótico",
      title: "Las catedrales góticas inglesas",
      img: "/img/Ing-Art3.jpg",
      body: [
        "El estilo **gótico inglés** se desarrolló a partir del siglo XII con características propias que lo diferencian del gótico continental. Mientras las catedrales francesas apuntan al cielo con torres gemelas, las inglesas se extienden horizontalmente, con largas naves y torres centrales. La **Catedral de Salisbury**, con su aguja de 123 metros, es el ejemplo más puro.",
        "El interior de estas catedrales era un espectáculo de luz filtrada por **vidrieras emplomadas** que representaban escenas bíblicas en colores imposibles — azules cobalto, rojos carmesí y amarillos dorados. La vidriera más antigua de Inglaterra, en la Catedral de Canterbury, data del siglo XII y sigue intacta.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Qué característica distingue al gótico inglés del gótico continental?",
      options: [
        "Usa arcos de medio punto en lugar de arcos apuntados",
        "Se extiende horizontalmente en lugar de apuntar verticalmente",
        "No tiene vidrieras de colores",
        "Sus torres siempre son gemelas",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! El gótico inglés se extiende horizontalmente con largas naves y torres centrales, a diferencia del gótico francés que busca la verticalidad con torres gemelas.",
        wrong: "La respuesta es la extensión horizontal. Las catedrales inglesas se desarrollan en longitud, con largas naves, a diferencia de las francesas que apuntan al cielo.",
      },
    },
    {
      type: "reading",
      label: "Hoy",
      title: "El legado del arte medieval inglés",
      img: "/img/Ing-Art5.jpg",
      body: [
        "El arte medieval inglés vive en sus catedrales, muchas de las cuales siguen siendo centros activos de culto y turismo. La **Abadía de Westminster** es simultáneamente iglesia real, museo, panteón nacional y sede de coronaciones, una acumulación de arte y historia sin paralelo en el mundo.",
        "En el siglo XIX, el movimiento **Arts and Crafts** liderado por William Morris revivió las técnicas medievales inglesas, el bordado, la ilustración de manuscritos y la vidriera — como reacción contra la industrialización. Este renacimiento influyó en el diseño moderno y puede rastrearse hasta la estética del **Art Nouveau** y más tarde en Tolkien, que se inspiró profundamente en el arte anglosajón para crear la Tierra Media.",
      ],
    },
    {
      type: "quiz",
      label: "Final",
      question: "¿Qué escritor del siglo XX se inspiró en el arte anglosajón medieval para construir su mundo ficticio?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "J.R.R. Tolkien",
        "Arthur Conan Doyle",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! Tolkien era experto en lenguas y arte anglosajón, los manuscritos iluminados, las runas y la épica medieval inglesa son la base estética de la Tierra Media.",
        wrong: "Fue Tolkien quien transformó el arte y la literatura anglosajona medieval en la Tierra Media. Era profesor de anglosajón en Oxford y conocía esa tradición en profundidad.",
      },
    },
  ],
};