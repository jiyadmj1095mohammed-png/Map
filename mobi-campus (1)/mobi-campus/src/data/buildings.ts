import { toLocal, V2 } from "@/utils/geometry";
export interface Building { id: string; name: string; kind: string; pos: V2; size: [number, number, number]; rot: number; node: string; named: boolean; status: "confirmed" | "proposed"; note: string }
// b(id,name,kind,px,py,w,d,h,rotDeg,node,named). Footprints = approximate, traced from source map.
const b = (id: string, name: string, kind: string, x: number, y: number, w: number, d: number, h: number, rot: number, node = "", named = true): Building =>
  ({ id, name, kind, pos: toLocal(x, y), size: [w, d, h], rot, node, named, status: "confirmed", note: "Footprint present on source map; size/height estimated." });
export const buildings: Building[] = [
  b("B-MAIN", "MEA Engineering College Perinthalmanna", "academic", 565, 790, 20, 17, 9, 40, "N18"),
  b("B-AUD", "MEA Engineering College Auditorium", "auditorium", 460, 1045, 12, 9, 7, -20, "N13"),
  b("B-CIVIL", "Civil Department", "academic", 830, 570, 14, 7, 8, 30, "N15"),
  b("B-HOSTEL", "MEA Men's Hostel", "hostel", 940, 800, 11, 7, 8, -35, "N16"),
  b("B-WORK", "Mechanical Workshop", "workshop", 800, 1010, 16, 8, 6, -40, "N17"),
  b("B-U01", "Unnamed building (north)", "unnamed", 585, 520, 8, 10, 6, 40, "N06", false),
  b("B-U02", "Unnamed building (north-east)", "unnamed", 665, 570, 8, 9, 6, 40, "N08", false),
  b("B-U03", "Unnamed building (west)", "unnamed", 345, 645, 6, 6, 4, 15, "N03", false),
  b("B-U04", "Unnamed building (south of main)", "unnamed", 560, 1025, 5, 5, 3, 40, "N12", false),
  b("B-U05", "Unnamed building (annex)", "unnamed", 675, 1010, 7, 6, 3, 0, "N12", false),
  b("B-EXT1", "Noorul Islam Higher Secondary School", "external", 150, 400, 10, 8, 5, 20, "N01"),
  b("B-EXT2", "AL Fouze Jamia English Medium School", "external", 590, 1400, 12, 6, 5, 50, "N13"),
];
