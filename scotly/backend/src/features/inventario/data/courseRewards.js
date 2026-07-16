// backend/src/features/inventario/data/courseRewards.js
//
// Fuente de verdad de qué otorga cada curso al completarse.
// El cliente SOLO manda curso_codigo; nunca confiar en cartas/experiencia
// que vengan del body de la request, porque son fácilmente falsificables
// desde devtools o Postman.
//
// Mantené esto sincronizado con `rewardCards`/`rewardXp` de cada curso en
// el frontend (src/features/courses/data/<region>/<curso>.js), pero
// recordá que esta es la copia que realmente importa.

export const COURSE_REWARDS = {
  arte: {
    cartas: ["catriona", "duncan"],
    experiencia: 150,
    puntos: 40, // "Provisiones" en el front
  },
  cocina: {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  history: {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  mitologia: {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  "arte-england": {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  "cocina-england": {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  "history-england": {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
  "mitologia-england": {
    cartas: ["catriona", "catriona"], // TODO: cambiar cuando definas cartas propias para este curso
    experiencia: 150,
    puntos: 40,
  },
};