export const course = {
  id: "history-england",
  region: "england",
  title: "Historia de Inglaterra",
  subtitle: "De los romanos a la Revolución Industrial — los eventos que moldearon el mundo",
  img: "/img/H22.jpg",

  steps: [
    {
      type: "reading",
      label: "Orígenes",
      title: "Roma, los anglosajones y los vikingos",
      img: "/img/H33.jpg",
      body: [
        "Las islas británicas fueron conquistadas por Roma en el año **43 d.C.** bajo el emperador Claudio. Los romanos construyeron ciudades, calzadas y la famosa **Muralla de Adriano** en el norte para contener a los pictos escoceses. Londinium (la actual Londres) nació como asentamiento romano a orillas del Támesis.",
        "Tras la retirada romana en el siglo V, llegaron los **anglosajones** desde Germania, dividiendo el territorio en reinos como Wessex, Mercia y Northumbria. Luego vinieron los **vikingos** daneses, que establecieron el **Danelaw** en el norte y el este. Fue el rey **Alfredo el Grande de Wessex** quien frenó la expansión vikinga y unificó los reinos ingleses, siendo considerado el primer rey de Inglaterra.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Qué rey anglosajón frenó la expansión vikinga y es considerado el primer rey de Inglaterra?",
      options: [
        "Eduardo el Confesor",
        "Guillermo el Conquistador",
        "Alfredo el Grande",
        "Canuto el Grande",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! Alfredo el Grande de Wessex frenó la expansión danesa y unificó los reinos anglosajones, siendo considerado el padre de la nación inglesa.",
        wrong: "Fue Alfredo el Grande de Wessex quien, en el siglo IX, detuvo a los vikingos y unificó los reinos anglosajones, ganándose el título de primer rey de Inglaterra.",
      },
    },
    {
      type: "reading",
      label: "Magna Carta",
      title: "La Carta Magna y el nacimiento del parlamento",
      img: "/img/H44.jpg",
      body: [
        "En **1215**, los barones ingleses obligaron al rey **Juan Sin Tierra** a firmar la **Carta Magna.**  El documento que por primera vez limitaba el poder absoluto del monarca y establecía que incluso el rey estaba sujeto a la ley. Es considerado uno de los fundamentos del **constitucionalismo moderno** y del sistema democrático occidental.",
        "De la Carta Magna nació el **Parlamento inglés**, que fue ganando poder gradualmente durante los siglos siguientes. La tensión entre la corona y el parlamento culminó en el siglo XVII con la **Guerra Civil Inglesa** (1642-1651), en la que el rey **Carlos I** fue decapitado. Un acto sin precedentes en Europa que sacudió las monarquías del continente.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿En qué año fue firmada la Carta Magna por el rey Juan Sin Tierra?",
      options: [
        "1066",
        "1215",
        "1348",
        "1485",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! La Carta Magna fue firmada en 1215 y es uno de los documentos fundacionales del constitucionalismo moderno y los derechos civiles.",
        wrong: "La Carta Magna fue firmada en 1215 — un documento que por primera vez estableció que el rey estaba sujeto a la ley, sentando las bases del constitucionalismo.",
      },
    },
    {
      type: "reading",
      label: "Imperio",
      title: "El Imperio Británico",
      img: "/img/H55.png",
      body: [
        "En su apogeo a principios del siglo XX, el **Imperio Británico** controlaba aproximadamente un cuarto de la superficie terrestre del planeta y gobernaba sobre 400 millones de personas. Fue el mayor imperio de la historia. Su expansión comenzó en el siglo XVI con la exploración marítima y se aceleró tras la Revolución Industrial, que dio a Gran Bretaña una ventaja tecnológica y militar decisiva.",
        "El Imperio dejó huellas profundas y contradictorias: difundió el idioma inglés, el sistema legal y las instituciones parlamentarias por el mundo, pero también sostuvo la **trata de esclavos** hasta 1807 y explotó los recursos de sus colonias. La descolonización del siglo XX transformó el imperio en la **Commonwealth**, una asociación voluntaria de 56 naciones que mantienen lazos históricos con Gran Bretaña.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Aproximadamente qué fracción de la superficie terrestre controlaba el Imperio Británico en su apogeo?",
      options: [
        "Un décimo",
        "Un quinto",
        "Un cuarto",
        "Un tercio",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! En su apogeo, el Imperio Británico controlaba aproximadamente un cuarto de la superficie terrestre, siendo el mayor imperio de la historia.",
        wrong: "El Imperio Británico en su apogeo controlaba cerca de un cuarto de la superficie terrestre y gobernaba sobre 400 millones de personas — el mayor imperio de la historia.",
      },
    },
    {
      type: "reading",
      label: "Revolución",
      title: "La Revolución Industrial: el mundo cambia en Inglaterra",
      img: "/img/H66.jpg",
      body: [
        "La **Revolución Industrial** comenzó en Inglaterra en la segunda mitad del siglo XVIII y transformó al mundo de manera más radical que cualquier evento desde la invención de la agricultura. Ciudades como **Manchester, Birmingham y Liverpool** pasaron de aldeas a metrópolis industriales en pocas décadas. La máquina de vapor de **James Watt**, las fábricas textiles y los ferrocarriles reescribieron la economía global.",
        "El precio humano fue enorme, niños trabajaban en minas y fábricas, las ciudades eran insalubres y la jornada laboral era brutal. Pero también generó una clase media próspera, impulsó la ciencia y la educación, Y produjo pensadores como **Charles Darwin**, **Charles Dickens**, que documentó el sufrimiento obrero, y **Karl Marx**, quien desde Londres escribió *El capital* analizando el sistema que lo rodeaba.",
      ],
    },
    {
      type: "quiz",
      label: "Final",
      question: "¿Qué inventor escocés desarrolló la máquina de vapor que impulsó la Revolución Industrial inglesa?",
      options: [
        "Isaac Newton",
        "James Watt",
        "George Stephenson",
        "Michael Faraday",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! James Watt perfeccionó la máquina de vapor en Glasgow, una innovación que se convirtió en el motor literal de la Revolución Industrial.",
        wrong: "Fue James Watt quien desarrolló la máquina de vapor eficiente que impulsó la Revolución Industrial. Curiosamente era escocés, pero su invento transformó principalmente a Inglaterra.",
      },
    },
  ],
};