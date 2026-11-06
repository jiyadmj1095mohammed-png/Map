import { toLocal, V2 } from "@/utils/geometry";
export type FType = "bus"|"bin-general"|"bin-dry"|"bin-wet"|"bin-plastic"|"bin-ewaste"|"wc-men"|"wc-women"|"wc-access"|"water"|"handwash"|"bench"|"light"|"entrance"|"parking"|"assembly";
export interface Facility { id: string; type: FType; name: string; pos: V2; status: "confirmed"|"proposed"; note: string }
export const LABEL: Record<FType,string> = { bus:"Bus stop","bin-general":"General waste bin","bin-dry":"Dry waste bin","bin-wet":"Wet waste bin","bin-plastic":"Plastic collection bin","bin-ewaste":"E-waste point","wc-men":"Men's washroom","wc-women":"Women's washroom","wc-access":"Accessible washroom",water:"Drinking water",handwash:"Handwashing station",bench:"Seating",light:"Streetlight",entrance:"Campus entrance",parking:"Parking area",assembly:"Emergency assembly point" };
export const COLOR: Record<FType,string> = { bus:"#7c3aed","bin-general":"#2563eb","bin-dry":"#eab308","bin-wet":"#16a34a","bin-plastic":"#f97316","bin-ewaste":"#dc2626","wc-men":"#38bdf8","wc-women":"#f472b6","wc-access":"#818cf8",water:"#22d3ee",handwash:"#67e8f9",bench:"#a855f7",light:"#facc15",entrance:"#fb923c",parking:"#9ca3af",assembly:"#14b8a6" };
// [id,type,px,py] — positions are PROPOSED estimates beside the nearest mapped path/building.
const T: [string, FType, number, number][] = [
  ["BUS-001","bus",155,705],["ENT-001","entrance",175,690],
  ["BIN-001","bin-general",180,742],["BIN-002","bin-dry",200,742],["BIN-003","bin-wet",220,742],
  ["BIN-004","bin-general",488,890],["BIN-005","bin-dry",500,905],["BIN-006","bin-wet",412,955],
  ["BIN-007","bin-general",505,1085],["BIN-008","bin-dry",520,1115],["BIN-009","bin-plastic",570,1060],
  ["BIN-010","bin-general",895,830],["BIN-011","bin-wet",915,845],["BIN-012","bin-ewaste",880,770],
  ["BIN-013","bin-plastic",735,990],["BIN-014","bin-ewaste",770,1030],
  ["BIN-015","bin-general",770,650],["BIN-016","bin-dry",790,660],["BIN-017","bin-plastic",690,660],
  ["BIN-018","bin-plastic",365,750],["BIN-019","bin-general",640,710],
  ["WC-M-001","wc-men",470,830],["WC-W-001","wc-women",450,850],["WC-A-001","wc-access",435,870],
  ["WC-M-002","wc-men",490,1065],["WC-W-002","wc-women",475,1075],["WC-A-002","wc-access",490,1090],
  ["WC-M-003","wc-men",850,590],["WC-W-003","wc-women",870,600],["WC-A-003","wc-access",885,610],
  ["WTR-001","water",200,700],["WTR-002","water",455,880],["WTR-003","water",575,1085],["WTR-004","water",880,810],["WTR-005","water",760,640],
  ["HW-001","handwash",455,830],["HW-002","handwash",480,1050],["HW-003","handwash",860,580],
  ["BEN-001","bench",340,770],["BEN-002","bench",480,760],["BEN-003","bench",620,720],["BEN-004","bench",560,1100],["BEN-005","bench",880,740],["BEN-006","bench",760,700],
  ["LGT-001","light",230,730],["LGT-002","light",385,700],["LGT-003","light",500,640],["LGT-004","light",700,690],["LGT-005","light",840,730],["LGT-006","light",450,900],["LGT-007","light",525,1030],["LGT-008","light",895,760],
  ["PRK-001","parking",830,1055],["ASM-001","assembly",230,930],["ASM-002","assembly",640,1100],
];
export const facilities: Facility[] = T.map(([id, type, x, y]) => {
  const ok = id === "BUS-001";
  return { id, type, name: LABEL[type] + " " + id.split("-").pop(), pos: toLocal(x, y), status: ok ? "confirmed" : "proposed",
    note: ok ? "Labelled 'MEA College Stop' on source map." : "PROPOSED — LOCATION TO BE VERIFIED. Not confirmed by source map." };
});
