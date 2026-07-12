// Catálogo de cursos pagos. Igual que courseRewards.js, vive acá
// porque no hay tabla propia — el identificador es curso_codigo (string),
// compatible con cursos_comprados.curso_codigo.
export const CURSOS_PAGOS = {
  "clanes-escoceses": {
    titulo: "Guía Completa de los Clanes Escoceses",
    descripcion: "Un recorrido detallado por los clanes que forjaron las Highlands.",
    region: "sc",
    precioEUR: 1.50,   // ← acá
    pdf: "clanes-escoceses.pdf",
    imagen: "/img/Clanes2.JPG",
  },
  "reyes-ingleses": {
    titulo: "Los Reyes de Inglaterra",
    descripcion: "De Alfredo el Grande a la Casa de Windsor.",
    region: "en",
    precioEUR: 1.50,   // ← y acá
    pdf: "reyes-ingleses.pdf",
    imagen: "/img/K2.JPG",
  },
};