// Bonus de puntos que otorga cada rareza cuando la opción elegida coincide
// con la región del protagonista. Se usa tanto acá (para mostrar la reacción
// exclusiva en el momento) como en el backend (para calcular la recompensa
// real). Si cambiás esto, cambialo también en backend/src/features/historia/data/historiaCapitulo1.js
export const RAREZA_BONUS = {
  common: 0,
  rare: 1,
  epic: 2,
  legendary: 3,
};

// Estructura de un nodo:
// - id: identificador único (se usa para saltar con "next")
// - character: quién habla
// - text: texto del diálogo
// - image: (opcional) si no se especifica, se reutiliza la última imagen mostrada.
// - isProtagonista: si es true, el "character" real se reemplaza por el nombre
//          de la carta elegida por el jugador (ver HistoriaGame.jsx)
// - next: id del siguiente nodo (los nodos lineales lo usan)
// - choices: si existe, el nodo corta el flujo lineal y muestra opciones.
//     Cada choice tiene: text, region (opcional), reactionText (opcional),
//     basePoints y next.
//
// IMPORTANTE: todo nodo lineal (sin choices) DEBE tener next, salvo el
// último nodo del capítulo. HistoriaGame.jsx decide que el capítulo terminó
// cuando un nodo no tiene next NI choices (esFinal = !nodo.next && !nodo.choices),
// así que un next faltante en un nodo intermedio dispara el reclamo de
// recompensa antes de tiempo.

const historiaData = [
  // ---------- Llegada ----------
  {
    id: "n1",
    character: "Narrador",
    text: "El camino de tierra sube entre brezales hacia una torre de piedra rodeada de una empalizada de madera. Se ve humo de turba saliendo del techo y ganado pastando en el cercado.",
    image: "/img/prueba1.jpg",
    next: "n2",
  },
  {
    id: "n2",
    character: "Narrador",
    text: "Hay más vigilancia de la habitual en la entrada. Días atrás, según se comenta en el camino, un clan vecino se llevó parte del ganado de esta hacienda durante la noche.",
    next: "n3",
  },
  {
    id: "n3",
    isProtagonista: true,
    character: "Protagonista",
    text: "Con el ganado robado todavía sin resolver, no es el mejor momento para llegar sin anunciarse. Mejor pensar bien cómo presentarme.",
    image: "/img/prueba2.jpg",
    next: "d1",
  },

  // ---------- Decisión 1: cómo te identificás ante el centinela ----------
  {
    id: "d1",
    character: "Centinela",
    text: "Alto ahí. Con lo que pasó esta semana, nadie entra sin decir quién es y a qué viene.",
    image: "/img/prueba4.jpg",
    choices: [
      {
        text: '"Solo soy un viajero de paso, busco techo por una noche."',
        basePoints: 0,
        next: "n4",
      },
      {
        text: '"Vengo de tierras del norte y no le temo a mostrar mi nombre." (firme)',
        region: "Escocia",
        basePoints: 2,
        reactionText: "El centinela reconoce el acento y baja un poco la lanza: no suena a alguien del clan que los asaltó.",
        next: "n4",
      },
      {
        text: '"Soy mensajero, y prefiero explicarme ante quien manda aquí." (cauteloso)',
        region: "Gales",
        basePoints: 1,
        reactionText: "Tu tono medido, poco común entre los viajeros de la zona, hace que el centinela dude antes de negarte el paso.",
        next: "n4",
      },
      {
        text: '"Viajo con salvoconducto de la corona. Espero que eso baste." (formal)',
        region: "Inglaterra",
        basePoints: 1,
        reactionText: "El centinela entrecierra los ojos al escuchar mencionar a la corona, pero no se anima a cuestionarlo.",
        next: "n4",
      },
    ],
  },

  // ---------- En el patio, con el mayordomo ----------
  {
    id: "n4",
    character: "Mayordomo",
    text: "Adelante, entonces. Disculpá la desconfianza, pero con el ganado que nos falta, el jefe no quiere sorpresas.",
    next: "n5",
  },
  {
    id: "n5",
    character: "Mayordomo",
    text: "Soy quien lleva las cuentas de esta casa: la avena, las rentas, el ganado. Y ahora, además, tengo que explicarle al jefe cómo faltan doce cabezas de la manada.",
    next: "n6",
  },
  {
    id: "n6",
    character: "Narrador",
    text: "En el patio, unas mujeres hilan lana junto al fuego mientras un muchacho reparte turba para la noche. Todo parece normal, salvo por las caras serias de quienes hablan en voz baja junto al establo.",
    next: "d2",
  },

  // ---------- Decisión 2: el mayordomo te pide tu lectura de la situación ----------
  {
    id: "d2",
    character: "Mayordomo",
    text: "Viniste por el camino del norte, ¿no es cierto? ¿Notaste algo raro en tierras del clan vecino? Cualquier detalle podría servirnos.",
    choices: [
      {
        text: '"No vi nada fuera de lo común. Prefiero no meterme en esto."',
        basePoints: 1,
        next: "n7",
      },
      {
        text: '"Vi hombres armados reunidos cerca del límite. Ustedes tienen derecho a saberlo." (leal)',
        region: "Escocia",
        basePoints: 1,
        reactionText: "El mayordomo asiente serio: entre gente de clan, la lealtad al que te da techo no se discute.",
        next: "n7",
      },
      {
        text: '"Vi movimiento, pero no sabría decir si fue antes o después del robo. Prefiero no acusar sin certeza." (prudente)',
        region: "Gales",
        basePoints: 2,
        reactionText: "El mayordomo valora esa cautela: acusar sin pruebas solo empeoraría las cosas entre clanes.",
        next: "n7",
      },
      {
        text: '"Puedo darte fechas y lugares exactos, tal como los anoté en mi camino." (metódico)',
        region: "Inglaterra",
        basePoints: 1,
        reactionText: "El mayordomo aprecia la precisión: pocos viajeros llevan un registro tan ordenado de su recorrido.",
        next: "n7",
      },
    ],
  },

  // ---------- Hacia el salón principal ----------
  {
    id: "n7",
    character: "Mayordomo",
    text: "Te lo agradezco. Vení, el jefe va a querer escuchar esto directamente de vos.",
    next: "n8",
  },
  {
    id: "n8",
    character: "Narrador",
    text: "En el salón principal, el lugar junto al fuego está reservado para el jefe; el resto se sienta según su rango. Un hombre mayor recita en voz baja el linaje de la familia, tal como se hace en cada visita importante.",
    image: "/img/prueba1.jpg",
    next: "n9",
  },
  {
    id: "n9",
    character: "Jefe del clan",
    text: "Así que vos sos quien vio algo en el camino. Sentate. Acá se decide algo más que si comés caliente esta noche.",
    next: "d3",
  },

  // ---------- Decisión 3: qué le contás al jefe sobre lo que viste ----------
  {
    id: "d3",
    character: "Jefe del clan",
    text: "Contame exactamente lo que viste, y no te guardes nada por miedo a ofender a nadie.",
    choices: [
      {
        text: '"Vi lo que vi, pero no me corresponde decidir qué hacer con esa información."',
        basePoints: 1,
        next: "n10",
      },
      {
        text: '"Lo que vi apunta directo al clan vecino. Merecen una respuesta a la altura." (contundente)',
        region: "Escocia",
        basePoints: 2,
        reactionText: "El jefe golpea la mesa: por fin alguien habla con la claridad que él esperaba.",
        next: "n10",
      },
      {
        text: '"Te cuento lo que vi, pero te pido que lo peses con calma antes de actuar." (mediador)',
        region: "Gales",
        basePoints: 1,
        reactionText: "El jefe respira hondo. No es la respuesta que esperaba, pero reconoce el valor de pensarlo dos veces.",
        next: "n10",
      },
      {
        text: '"Te doy los hechos tal como los registré. La decisión política no es mi lugar." (institucional)',
        region: "Inglaterra",
        basePoints: 2,
        reactionText: "El jefe nota el cuidado con que separás los hechos de la opinión, algo poco común entre los viajeros.",
        next: "n10",
      },
    ],
  },

  // ---------- Antes del consejo final ----------
  {
    id: "n10",
    character: "Jefe del clan",
    text: "Doce cabezas de ganado no es poca cosa para esta casa. Puedo mandar hombres esta misma noche a reclamarlas por la fuerza, o mandar un mensajero pidiendo compensación antes de que esto se convierta en algo peor.",
    next: "n11",
  },
  {
    id: "n11",
    character: "Mayordomo",
    text: "Con perdón, jefe... pero antes de decidir, quizás valga la pena escuchar qué opina nuestro visitante. Al final del día, no tiene nada que perder ni ganar en esto.",
    next: "d4",
  },

  // ---------- Decisión 4: el consejo final, la de mayor peso ----------
  {
    id: "d4",
    character: "Jefe del clan",
    text: "Está bien. Decime: si estuvieras en mi lugar, ¿qué harías con el clan vecino?",
    choices: [
      {
        text: '"No es mi lugar para aconsejar algo así. Hagan lo que consideren correcto."',
        basePoints: 1,
        next: "n12",
      },
      {
        text: '"Mandaría hombres a recuperar lo que es suyo. Ceder ahora invita a que vuelva a pasar." (firme)',
        region: "Escocia",
        basePoints: 2,
        reactionText: "El jefe asiente lentamente: esa lógica, la de no mostrar debilidad, la conoce bien.",
        next: "n12",
      },
      {
        text: '"Pediría una compensación antes de recurrir a la fuerza. Una guerra entre clanes cuesta más que doce cabezas de ganado." (conciliador)',
        region: "Gales",
        basePoints: 3,
        reactionText: "El jefe se queda pensativo: pocos viajeros defienden la palabra por sobre las armas con tanta convicción.",
        next: "n12",
      },
      {
        text: '"Llevaría el reclamo ante el sheriff de la zona. Para eso están las autoridades." (formal)',
        region: "Inglaterra",
        basePoints: 2,
        reactionText: "El jefe frunce el ceño: no confía demasiado en esas cortes, pero reconoce que es un camino menos costoso que la sangre.",
        next: "n12",
      },
    ],
  },

  // ---------- Cierre ----------
  {
    id: "n12",
    character: "Jefe del clan",
    text: "Lo voy a pensar esta noche. Sea cual sea mi decisión, no va a ser fácil.",
    next: "n13",
  },
  {
    id: "n13",
    character: "Narrador",
    text: "Esa noche, el visitante come junto al fuego con el resto de la casa. Nadie más menciona el ganado robado, aunque todos piensan en lo mismo.",
    next: "final",
  },
  {
    id: "final",
    character: "Narrador",
    text: "A la mañana siguiente, el mayordomo despide al viajero en la puerta de la torre. Lo que decida el jefe quedará entre estas piedras... por ahora.",
    // Sin next ni choices: este es el único nodo que debe disparar esFinal.
  },
];

export default historiaData;