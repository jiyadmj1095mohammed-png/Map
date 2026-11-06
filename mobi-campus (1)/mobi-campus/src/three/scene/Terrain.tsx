import { useMemo } from "react";
import { Shape } from "three";
import { boundary, playField, roads, nodes, edges } from "@/data/campusPaths";
import { V2 } from "@/utils/geometry";
function Poly({ pts, color, y }: { pts: V2[]; color: string; y: number }) {
  const s = useMemo(() => { const sh = new Shape(); pts.forEach((p, i) => (i ? sh.lineTo(p[0], -p[1]) : sh.moveTo(p[0], -p[1]))); return sh; }, [pts]);
  return <mesh rotation-x={-Math.PI / 2} position-y={y} receiveShadow><shapeGeometry args={[s]} /><meshStandardMaterial color={color} roughness={1} /></mesh>;
}
export function Strip({ a, b, w, color, y }: { a: V2; b: V2; w: number; color: string; y: number }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return <mesh position={[(a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2]} rotation-y={-Math.atan2(b[1] - a[1], b[0] - a[0])} receiveShadow><boxGeometry args={[len + w * 0.5, 0.06, w]} /><meshStandardMaterial color={color} roughness={0.95} /></mesh>;
}
export function Terrain() {
  return <>
    <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[400, 400]} /><meshStandardMaterial color="#7d8f5c" roughness={1} /></mesh>
    <Poly pts={boundary} color="#6fa24a" y={0.02} />
    <Poly pts={playField} color="#b5bb62" y={0.04} />
    {roads.flatMap((r) => r.pts.slice(1).map((p, i) => <Strip key={r.name + i} a={r.pts[i]} b={p} w={3.2} color="#3f3f46" y={0.08} />))}
    {edges.map(([a, b, ok]) => <Strip key={a + b} a={nodes[a]} b={nodes[b]} w={1.3} color={ok ? "#d6d3d1" : "#c9b79c"} y={0.1} />)}
  </>;
}
