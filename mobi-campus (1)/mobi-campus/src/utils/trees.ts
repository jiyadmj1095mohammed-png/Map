import { buildings } from "@/data/buildings";
import { nodes, edges, roads, boundary } from "@/data/campusPaths";
import { distSeg, inPoly, rng, V2 } from "./geometry";
// Procedural tree scatter: seeded, keeps clear of paths, roads and building footprints. Illustrative, not surveyed.
export function makeTrees(count = 320) {
  const r = rng(42), out: { x: number; z: number; s: number; t: number }[] = [];
  const segs: [V2, V2][] = [...edges.map(([a, b]) => [nodes[a], nodes[b]] as [V2, V2]),
    ...roads.flatMap((rd) => rd.pts.slice(1).map((p, i) => [rd.pts[i], p] as [V2, V2]))];
  for (let k = 0; k < count * 12 && out.length < count; k++) {
    const p: V2 = [-54 + r() * 108, -40 + r() * 90];
    if (!inPoly(p, boundary)) continue;
    if (segs.some(([a, b]) => distSeg(p, a, b) < 2.6)) continue;
    if (buildings.some((b) => Math.hypot(p[0] - b.pos[0], p[1] - b.pos[1]) < Math.max(b.size[0], b.size[1]) / 2 + 2)) continue;
    out.push({ x: p[0], z: p[1], s: 0.8 + r() * 0.9, t: r() > 0.6 ? 1 : 0 });
  }
  return out;
}
