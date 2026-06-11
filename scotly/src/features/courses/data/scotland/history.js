export const course = {
  id: "history",
  region: "sc",
  title: "Historia Escocesa",
  subtitle: "Clanes, batallas, reyes y revoluciones que forjaron Escocia",
  img: "/img/History.jpg",

  steps: [
    // ── LECTURA 1 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Orígenes",
      title: "Los pueblos fundadores de Escocia",
      img: "/img/History.jpg",
      body: [
        "Escocia fue habitada desde el **Mesolítico**, hace unos 10.000 años. Los primeros grupos históricos reconocibles fueron los **pictos**, un pueblo que dejó piedras talladas con símbolos únicos todavía no descifrados del todo. Junto a ellos convivieron los **escoceses de Dal Riada** — un reino gaélico originario del norte de Irlanda que cruzó el Mar del Norte y se estableció en el oeste.",
        "La fusión entre pictos y escoceses gaélicos bajo el rey **Cináed mac Ailpín (Kenneth I)** hacia el siglo IX es considerada la fundación del primer reino unificado escocés. Este reino, conocido como **Alba**, sería el núcleo del que nacería la Escocia medieval.",
      ],
    },

    // ── QUIZ 1 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Qué rey unificó a los pictos y los escoceses gaélicos fundando el primer reino escocés?",
      options: [
        "Macbeth de Moray",
        "Cináed mac Ailpín (Kenneth I)",
        "William Wallace",
        "Robert the Bruce",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! Cináed mac Ailpín, conocido como Kenneth I, unificó a pictos y escoceses gaélicos en el siglo IX, creando el reino de Alba.",
        wrong: "Fue Cináed mac Ailpín (Kenneth I) quien en el siglo IX unificó a pictos y escoceses gaélicos, fundando el reino de Alba, precursor de Escocia.",
      },
    },

    // ── LECTURA 2 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Independencia",
      title: "Las Guerras de Independencia",
      img: "/img/History.jpg",
      body: [
        "A fines del siglo XIII, el rey inglés **Eduardo I** intentó someter Escocia. La resistencia escocesa encontró su primera figura en **William Wallace**, un caballero menor que lideró una rebelión popular y venció a los ingleses en la **Batalla de Stirling Bridge (1297)**. Wallace fue traicionado, capturado y ejecutado en 1305, pero se convirtió en el símbolo eterno de la resistencia.",
        "La independencia se consolidó con **Robert the Bruce**, quien derrotó decisivamente al ejército inglés en la **Batalla de Bannockburn (1314)** — una victoria que permitió la firma de la **Declaración de Arbroath (1320)**, uno de los documentos de independencia nacional más tempranos de la historia europea.",
      ],
    },

    // ── QUIZ 2 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿En qué batalla Robert the Bruce derrotó al ejército inglés consolidando la independencia escocesa?",
      options: [
        "Batalla de Flodden",
        "Batalla de Stirling Bridge",
        "Batalla de Bannockburn",
        "Batalla de Culloden",
      ],
      correct: 2,
      feedback: {
        correct: "¡Exacto! Bannockburn en 1314 fue la victoria definitiva de Robert the Bruce sobre Eduardo II de Inglaterra, asegurando la independencia escocesa.",
        wrong: "Fue la Batalla de Bannockburn (1314) donde Robert the Bruce derrotó a los ingleses. Stirling Bridge fue la victoria anterior de William Wallace.",
      },
    },

    // ── LECTURA 3 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Jacobitas",
      title: "Los clanes y la era jacobita",
      img: "/img/History.jpg",
      body: [
        "El sistema de **clanes** fue la estructura social que definió las Highlands escocesas durante siglos. Cada clan era una red de familias bajo un jefe que ofrecía protección a cambio de lealtad. Los tartanes, hoy íconos culturales, eran en origen tejidos de lana con colores propios de cada región.",
        "En el siglo XVIII, los jacobitas — seguidores de la casa Estuardo destronada — intentaron recuperar el trono británico. El **Alzamiento de 1745** liderado por **Bonnie Prince Charlie** terminó en la catastrófica **Batalla de Culloden (1746)**, la última batalla librada en suelo británico. La derrota marcó el fin del sistema de clanes: el gobierno inglés prohibió el tartán, la gaita y las armas en las Highlands.",
      ],
    },

    // ── QUIZ 3 ──────────────────────────────────────────────
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Qué consecuencia tuvo la derrota jacobita en la Batalla de Culloden de 1746?",
      options: [
        "Escocia recuperó su independencia del parlamento inglés",
        "Se prohibieron el tartán, la gaita y las armas en las Highlands",
        "Los clanes escoceses firmaron una alianza con Francia",
        "Bonnie Prince Charlie fue coronado rey de Escocia",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! Tras Culloden, el gobierno inglés prohibió el tartán, la gaita y las armas en las Highlands para destruir la identidad y resistencia del sistema de clanes.",
        wrong: "Tras Culloden, el gobierno inglés prohibió los símbolos de los clanes: el tartán, la gaita y las armas. Fue un intento deliberado de erradicar la cultura de las Highlands.",
      },
    },

    // ── LECTURA 4 ──────────────────────────────────────────
    {
      type: "reading",
      label: "Unión",
      title: "La Unión y la Ilustración escocesa",
      img: "/img/History.jpg",
      body: [
        "En **1707**, el Acta de Unión fusionó los parlamentos de Escocia e Inglaterra en el Reino de Gran Bretaña. La unión fue polémica — muchos escoceses la vieron como una traición comprada, y el poeta Robert Burns la llamó «comprada y vendida por el oro inglés». Sin embargo, también abrió el mercado colonial británico a los comerciantes escoceses.",
        "Paradójicamente, el siglo XVIII vio nacer la **Ilustración Escocesa**, uno de los movimientos intelectuales más influyentes de Occidente. Figuras como **Adam Smith** (padre de la economía moderna), **David Hume** (filósofo empirista) y **James Watt** (inventor de la máquina de vapor) transformaron el pensamiento y la tecnología del mundo desde Edimburgo y Glasgow.",
      ],
    },

    // ── QUIZ FINAL ──────────────────────────────────────────
    {
      type: "quiz",
      label: "Final",
      question: "¿Cuál de estos personajes fue parte de la Ilustración Escocesa del siglo XVIII?",
      options: [
        "William Wallace",
        "Bonnie Prince Charlie",
        "Adam Smith",
        "Kenneth I",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! Adam Smith, autor de «La riqueza de las naciones», es una de las figuras clave de la Ilustración Escocesa y el padre de la economía moderna.",
        wrong: "Adam Smith es la respuesta correcta — fue el padre de la economía moderna y una de las grandes figuras de la Ilustración Escocesa del siglo XVIII.",
      },
    },
  ],
};