export function getNivel(experiencia = 0) {
  return Math.floor(experiencia / 100) + 1;
}