import { Suspense } from "react";
import { Html } from "@react-three/drei";
import { GLB } from "@/data/modelManifest";
import { Glb } from "./Glb";
import { buildings } from "@/data/buildings";
const WALL: Record<string, string> = { academic: "#cfc6b8", auditorium: "#c9b8a6", hostel: "#d8d2c4", workshop: "#a8a8a8", unnamed: "#bdb4a6", external: "#d6cdbd" };
export function Buildings({ sel, onSelect }: { sel: string | null; onSelect: (id: string) => void }) {
  return <>{buildings.map((b) => {
    const [w, d, h] = b.size, on = sel === b.id, em = on ? 0.5 : 0;
    return (
      <group key={b.id} position={[b.pos[0], 0, b.pos[1]]} rotation-y={(-b.rot * Math.PI) / 180} onClick={(e) => { e.stopPropagation(); onSelect(b.id); }}>
        {GLB[b.kind] ? <Suspense fallback={null}><Glb url={GLB[b.kind]!} scale={[w, h, d]} /></Suspense> : <>
        <mesh position-y={h / 2} castShadow receiveShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color={WALL[b.kind]} roughness={0.85} emissive="#2563eb" emissiveIntensity={em} /></mesh>
        <mesh position-y={h * 0.55}><boxGeometry args={[w + 0.06, h * 0.28, d + 0.06]} /><meshStandardMaterial color="#5b7a96" roughness={0.15} metalness={0.6} /></mesh>
        <mesh position-y={h + 0.2} castShadow><boxGeometry args={[w + 0.5, 0.4, d + 0.5]} /><meshStandardMaterial color={b.kind === "workshop" ? "#6b7280" : "#8b4a3c"} roughness={0.7} /></mesh>
        </>}
        {b.named && b.kind !== "external" && <Html position={[0, h + 3, 0]} center distanceFactor={60} style={{ pointerEvents: "none" }}><div className="rounded bg-black/70 px-2 py-0.5 text-[11px] text-white whitespace-nowrap">{b.name}</div></Html>}
      </group>);
  })}</>;
}
