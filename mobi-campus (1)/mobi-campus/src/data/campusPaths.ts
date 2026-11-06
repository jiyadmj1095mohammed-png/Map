import { toLocal, V2 } from "@/utils/geometry";
const n = (x: number, y: number) => toLocal(x, y);
// Nodes = path intersections / entrances. Traced from white footpath lines on source map.
export const nodes: Record<string, V2> = {
  N01: n(160, 712), N02: n(280, 722), N03: n(380, 732), N04: n(440, 692), N05: n(495, 705), N06: n(500, 562),
  N07: n(650, 688), N08: n(705, 678), N09: n(810, 742), N10: n(430, 800), N11: n(435, 935), N12: n(520, 1005),
  N13: n(545, 1095), N14: n(855, 745), N15: n(790, 625), N16: n(905, 790), N17: n(760, 985), N18: n(470, 870),
};
// [from, to, confirmedOnSourceMap]. false = inferred connector (needs verification).
export const edges: [string, string, boolean][] = [
  ["N01","N02",true],["N02","N03",true],["N03","N04",true],["N04","N05",true],["N03","N05",true],["N03","N10",true],
  ["N10","N18",true],["N18","N11",true],["N02","N11",true],["N11","N12",true],["N12","N13",true],["N06","N04",true],
  ["N06","N07",true],["N05","N07",true],["N07","N08",true],["N08","N09",true],["N09","N14",true],["N08","N15",true],
  ["N14","N16",true],["N12","N17",false],["N17","N16",false],
];
export const roads: { name: string; pts: V2[] }[] = [
  { name: "SH39", pts: [n(200,610), n(110,820), n(40,1060), n(0,1150)] },
  { name: "Perumbilavu-Nilambur Road", pts: [n(670,225), n(330,520), n(200,610)] },
  { name: "Road to Usmankka's Pub", pts: [n(670,225), n(745,195), n(850,205), n(1080,270)] },
  { name: "Side road (west)", pts: [n(0,545), n(130,585), n(195,620)] },
  { name: "South road", pts: [n(10,1135), n(190,1255), n(380,1235), n(650,1290)] },
];
export const boundary: V2[] = [n(190,630), n(520,410), n(835,438), n(1078,716), n(718,1284), n(40,1112), n(110,900)];
export const playField: V2[] = [n(80,950), n(340,800), n(420,930), n(290,1120), n(40,1112)];
