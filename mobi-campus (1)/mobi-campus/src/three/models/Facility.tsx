// Procedural stand-ins. To use Blender assets: export optimized .glb to /public/models and swap in useGLTF('/models/bin.glb').
import { Suspense } from "react";
import { Facility, COLOR } from "@/data/facilities";
import { GLB } from "@/data/modelManifest";
import { Glb } from "./Glb";
export function FacilityModel({ f, sel, onSelect }: { f: Facility; sel: boolean; onSelect: (id: string) => void }) {
  const c = COLOR[f.type], t = f.type;
  const em = sel ? 0.8 : 0, url = GLB[t];
  const m = <meshStandardMaterial color={c} roughness={0.5} emissive={c} emissiveIntensity={em} />;
  return (
    <group position={[f.pos[0], 0, f.pos[1]]} onClick={(e) => { e.stopPropagation(); onSelect(f.id); }}>
      {f.status === "proposed" && <mesh rotation-x={-Math.PI / 2} position-y={0.06}><ringGeometry args={[0.9, 1.1, 24]} /><meshBasicMaterial color={c} transparent opacity={0.7} /></mesh>}
      {url ? <Suspense fallback={null}><Glb url={url} /></Suspense> : <>
      {t.startsWith("bin") && <><mesh position-y={0.5} castShadow><cylinderGeometry args={[0.4, 0.34, 1, 14]} />{m}</mesh><mesh position-y={1.02}><cylinderGeometry args={[0.44, 0.44, 0.08, 14]} /><meshStandardMaterial color="#1f2937" /></mesh></>}
      {t.startsWith("wc") && <><mesh position-y={1.1} castShadow><boxGeometry args={[1.8, 2.2, 1.6]} />{m}</mesh><mesh position-y={2.3}><boxGeometry args={[2, 0.2, 1.8]} /><meshStandardMaterial color="#374151" /></mesh></>}
      {(t === "water" || t === "handwash") && <><mesh position-y={0.5} castShadow><cylinderGeometry args={[0.18, 0.25, 1, 10]} />{m}</mesh><mesh position-y={1.1}><sphereGeometry args={[0.28, 12, 12]} />{m}</mesh></>}
      {t === "bench" && <><mesh position-y={0.45} castShadow><boxGeometry args={[1.8, 0.12, 0.55]} />{m}</mesh><mesh position-y={0.8}><boxGeometry args={[1.8, 0.4, 0.08]} />{m}</mesh></>}
      {t === "light" && <><mesh position-y={1.8} castShadow><cylinderGeometry args={[0.07, 0.1, 3.6, 8]} /><meshStandardMaterial color="#374151" /></mesh><mesh position-y={3.7}><sphereGeometry args={[0.3, 12, 12]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.2} /></mesh></>}
      {t === "entrance" && <><mesh position={[-1.8, 1.6, 0]}><boxGeometry args={[0.3, 3.2, 0.3]} />{m}</mesh><mesh position={[1.8, 1.6, 0]}><boxGeometry args={[0.3, 3.2, 0.3]} />{m}</mesh><mesh position-y={3.2}><boxGeometry args={[4, 0.35, 0.4]} />{m}</mesh></>}
      {t === "parking" && <mesh position-y={0.04} receiveShadow><boxGeometry args={[9, 0.08, 6]} />{m}</mesh>}
      {t === "assembly" && <mesh position-y={0.05}><cylinderGeometry args={[2.2, 2.2, 0.1, 24]} />{m}</mesh>}
      {t === "bus" && <><mesh position-y={1.1} castShadow><boxGeometry args={[3, 0.15, 1.5]} />{m}</mesh>{[-1.3, 1.3].map((x) => <mesh key={x} position={[x, 0.55, 0]}><boxGeometry args={[0.12, 1.1, 1.3]} />{m}</mesh>)}</>}
      </>}
    </group>
  );
}
