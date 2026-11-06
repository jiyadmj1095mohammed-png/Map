import { nodes, edges } from "@/data/campusPaths";
import { dist, V2 } from "@/utils/geometry";
type Adj = Map<string, { to: string; w: number; ok: boolean }[]>;
const adj: Adj = new Map(Object.keys(nodes).map((k) => [k, []]));
edges.forEach(([a, b, ok]) => { const w = dist(nodes[a], nodes[b]); adj.get(a)!.push({ to: b, w, ok }); adj.get(b)!.push({ to: a, w, ok }); });

export interface Route { ids: string[]; pts: V2[]; length: number; usesUnverified: boolean }
// Dijkstra (graph is small; O(n^2) is fine). Swap in a binary heap if the graph grows.
export function findRoute(from: string, to: string): Route | null {
  const d = new Map<string, number>(), prev = new Map<string, string>(), todo = new Set(Object.keys(nodes));
  todo.forEach((k) => d.set(k, Infinity)); d.set(from, 0);
  while (todo.size) {
    let u = ""; let best = Infinity;
    todo.forEach((k) => { if (d.get(k)! < best) { best = d.get(k)!; u = k; } });
    if (!u) break; todo.delete(u); if (u === to) break;
    for (const e of adj.get(u)!) if (d.get(u)! + e.w < d.get(e.to)!) { d.set(e.to, d.get(u)! + e.w); prev.set(e.to, u); }
  }
  if (!isFinite(d.get(to)!)) return null;
  const ids = [to]; while (ids[0] !== from) ids.unshift(prev.get(ids[0])!);
  const usesUnverified = ids.some((id, i) => i && !adj.get(ids[i - 1])!.find((e) => e.to === id)!.ok);
  return { ids, pts: ids.map((i) => nodes[i]), length: d.get(to)!, usesUnverified };
}
