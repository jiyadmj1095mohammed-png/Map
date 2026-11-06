import { buildings } from "@/data/buildings";
import { facilities, LABEL } from "@/data/facilities";
import { nodes } from "@/data/campusPaths";
import { dist, V2 } from "./geometry";
export interface Place { id: string; name: string; group: "building" | "facility"; type: string; pos: V2; node: string; status: "confirmed" | "proposed"; note: string }
export const nearestNode = (p: V2) => Object.entries(nodes).sort((a, b) => dist(p, a[1]) - dist(p, b[1]))[0][0];
export const places: Place[] = [
  ...buildings.map((b) => ({ id: b.id, name: b.name, group: "building" as const, type: b.kind, pos: b.pos, node: b.node || nearestNode(b.pos), status: b.status, note: b.note })),
  ...facilities.map((f) => ({ id: f.id, name: f.name, group: "facility" as const, type: LABEL[f.type], pos: f.pos, node: nearestNode(f.pos), status: f.status, note: f.note })),
];
