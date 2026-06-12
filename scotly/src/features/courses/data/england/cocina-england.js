export const course = {
  id: "cocina-england",
  region: "england",
  title: "Cocina Inglesa",
  subtitle: "Del roast beef al fish and chips — la gastronomía que alimentó un imperio",
  img: "/img/Comida.jpg",

  steps: [
    {
      type: "reading",
      label: "Intro",
      title: "La cocina inglesa: más allá del estereotipo",
      img: "/img/Comida.jpg",
      body: [
        "La cocina inglesa tiene fama injusta de insípida, pero su historia es tan rica como compleja. Durante siglos fue una gastronomía de contrastes: **banquetes medievales** con especias exóticas para la nobleza, y dietas austeras de pan y cerveza para el pueblo. La Revolución Industrial cambió todo — urbanizó el país y creó una nueva clase trabajadora con nuevas necesidades alimentarias.",
        "Hoy Inglaterra vive un renacimiento gastronómico. Londres es una de las ciudades con más **restaurantes con estrella Michelin** del mundo, y chefs como Heston Blumenthal han llevado la cocina inglesa clásica a la vanguardia mundial con técnicas de cocina molecular aplicadas a recetas con siglos de historia.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz I",
      question: "¿Qué evento histórico transformó la alimentación popular inglesa al crear una nueva clase trabajadora urbana?",
      options: [
        "La conquista normanda",
        "La Guerra de los Cien Años",
        "La Revolución Industrial",
        "La Reforma Protestante",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! La Revolución Industrial urbanizó Inglaterra y creó una clase trabajadora con nuevos hábitos alimentarios, transformando profundamente la gastronomía popular.",
        wrong: "Fue la Revolución Industrial la que cambió la alimentación inglesa, concentrando a la población en ciudades y creando nuevas demandas y hábitos gastronómicos.",
      },
    },
    {
      type: "reading",
      label: "Clásicos",
      title: "Los platos icónicos de Inglaterra",
      img: "/img/Comida.jpg",
      body: [
        "El **fish and chips** es el plato nacional no oficial de Inglaterra. Surgió en la década de 1860 cuando los inmigrantes judíos del este de Europa introdujeron el pescado frito, y los trabajadores de las fábricas del norte lo combinaron con papas fritas. Para 1910 había más de **25.000 fish and chip shops** en todo el país.",
        "El **Sunday roast** es otra institución sagrada: carne asada — generalmente res, cerdo o cordero — acompañada de Yorkshire pudding, papas asadas, verduras y salsa gravy. Se sirve los domingos y es el equivalente inglés de un asado familiar. El **full English breakfast** completa el trío icónico: huevos, panceta, salchichas, frijoles, tomate y tostadas — diseñado para sostener una jornada de trabajo físico.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz II",
      question: "¿En qué década surgió el fish and chips como plato popular en Inglaterra?",
      options: [
        "1820s",
        "1860s",
        "1900s",
        "1940s",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! El fish and chips surgió en la década de 1860, cuando la combinación de pescado frito de tradición judía y papas fritas de los trabajadores del norte creó el plato más emblemático de Inglaterra.",
        wrong: "Fue en la década de 1860 cuando surgió el fish and chips, combinando el pescado frito de inmigrantes judíos con las papas fritas populares entre los trabajadores industriales.",
      },
    },
    {
      type: "reading",
      label: "Té",
      title: "El ritual del té inglés",
      img: "/img/Comida.jpg",
      body: [
        "El **té** llegó a Inglaterra en el siglo XVII y se convirtió en la bebida nacional en menos de 100 años, desplazando incluso a la cerveza. La **Compañía de las Indias Orientales** lo importaba masivamente desde China y luego desde las plantaciones de la India y Ceilán. Para el siglo XIX, beber té era un acto social y cultural que atravesaba todas las clases.",
        "El **afternoon tea** — té servido entre las 3 y las 5 de la tarde con sándwiches de pepino, scones con crema y mermelada, y pequeños pasteles — fue creado por Anna, duquesa de Bedford, en la década de 1840. El **cream tea** de Cornwall y Devon, donde el debate sobre si la crema va antes o después de la mermelada en el scone, es una disputa regional que se toma con una seriedad casi política.",
      ],
    },
    {
      type: "quiz",
      label: "Quiz III",
      question: "¿Quién es considerada la creadora del afternoon tea en la década de 1840?",
      options: [
        "La reina Victoria",
        "Anna, duquesa de Bedford",
        "Lady Churchill",
        "Florence Nightingale",
      ],
      correct: 1,
      feedback: {
        correct: "¡Correcto! Anna, duquesa de Bedford, creó el afternoon tea en la década de 1840 para calmar el hambre entre el almuerzo y la cena tardía de la nobleza.",
        wrong: "Fue Anna, duquesa de Bedford, quien inventó el afternoon tea alrededor de 1840, una costumbre que rápidamente se extendió por toda la sociedad inglesa.",
      },
    },
    {
      type: "reading",
      label: "Pubs",
      title: "El pub: corazón de la vida inglesa",
      img: "/img/Comida.jpg",
      body: [
        "El **pub** (public house) es mucho más que un bar — es una institución social que existe desde la época romana. Los **ale houses** medievales evolucionaron en el espacio donde se resuelven disputas, se celebran victorias deportivas, se hacen negocios y se construyen comunidades. Hay aproximadamente **47.000 pubs** en el Reino Unido.",
        "La tradición cervecera inglesa es sofisticada y regional. Las **ales** — cervezas fermentadas a temperatura ambiente — dominan frente a las lagers frías. El **real ale** servido a presión de mano desde barril de madera es considerado el estándar de calidad. CAMRA, la Campaña por la Cerveza Real fundada en 1971, tiene más de **175.000 miembros** y es uno de los movimientos de consumidores más exitosos de la historia.",
      ],
    },
    {
      type: "quiz",
      label: "Final",
      question: "¿Cuántos pubs hay aproximadamente en el Reino Unido?",
      options: [
        "12.000",
        "28.000",
        "47.000",
        "95.000",
      ],
      correct: 2,
      feedback: {
        correct: "¡Correcto! Hay aproximadamente 47.000 pubs en el Reino Unido, cada uno funcionando como un centro social único para su comunidad local.",
        wrong: "Son aproximadamente 47.000 pubs en el Reino Unido — una cifra que refleja la centralidad de esta institución en la vida social inglesa.",
      },
    },
  ],
};