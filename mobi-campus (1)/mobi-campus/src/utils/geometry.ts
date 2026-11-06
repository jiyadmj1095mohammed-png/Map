// Local coords: 1 unit = 10 source-image px; origin = image centre (540,800) of the 1080x1601 source map.
// ALL coordinates are normalized ESTIMATES traced from the source map, not surveyed measurements.
export type V2 = [number, number];
export const toLocal = (x: number, y: number): V2 => [(x - 540) * 0.1, (y - 800) * 0.1];
export const dist = (a: V2, b: V2) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export function distSeg(p: V2, a: V2, b: V2) {
  const dx = b[0] - a[0], dz = b[1] - a[1], l = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / l));
  return dist(p, [a[0] + t * dx, a[1] + t * dz]);
}
export function inPoly(p: V2, poly: V2[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j];
    if (zi > p[1] !== zj > p[1] && p[0] < ((xj - xi) * (p[1] - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
}
export const rng = (s: number) => () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
