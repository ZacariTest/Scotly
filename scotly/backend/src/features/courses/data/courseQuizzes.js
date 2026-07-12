// backend/src/features/courses/data/courseQuizzes.js
//
// Acá vive la respuesta correcta de cada quiz. Esto es justamente lo
// que ANTES estaba en el archivo del curso en el frontend (arte.js,
// campo `correct`) — y por eso era trivial de leer: alguien abría
// devtools, veía el bundle de JS, y listo, tenía todas las respuestas
// sin jugar nada.
//
// Ahora el frontend solo tiene la pregunta, las opciones y los textos
// de feedback (correcto/incorrecto). El índice correcto se queda acá,
// y el cliente lo va a saber para un paso puntual recién después de
// intentarlo (POST a /api/progreso/validar-respuesta).
//
// Las claves de cada curso son el índice del paso dentro de
// `course.steps` en el archivo del frontend (0-based). Tienen que
// coincidir exactamente con la posición de cada quiz ahí.

export const COURSE_QUIZZES = {
  arte: {
    1: 1, // Quiz I
    3: 2, // Quiz II
    5: 1, // Quiz III
    7: 2, // Quiz Final
  },
  // cocina: { ... },
  // history: { ... },
  // mitologia: { ... },
};