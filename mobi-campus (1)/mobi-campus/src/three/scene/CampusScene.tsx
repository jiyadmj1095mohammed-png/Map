"use client";
import { Canvas } from "@react-three/fiber";
import { Line, ContactShadows } from "@react-three/drei";
import { useMemo } from "react";
import { facilities } from "@/data/facilities";
import { makeTrees } from "@/utils/trees";
import { Terrain } from "./Terrain";
import { Buildings } from "../models/Buildings";
import { Trees } from "../models/Trees";
import { FacilityModel } from "../models/Facility";
import { CameraRig } from "../controls/CameraRig";
import { V2 } from "@/utils/geometry";

export interface SceneProps { view: "map" | "3d"; route: V2[] | null; sel: string | null; focus: V2 | null; from: V2 | null; to: V2 | null; onSelect: (id: string | null) => void }
export default function CampusScene({ view, route, sel, focus, from, to, onSelect }: SceneProps) {
  const trees = useMemo(() => makeTrees(), []);
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 90, 80], fov: 45, far: 800 }} onPointerMissed={() => onSelect(null)}>
      <color attach="background" args={["#cfe3f0"]} />
      <fog attach="fog" args={["#cfe3f0", 160, 420]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#ffffff", "#6b7a4a", 0.5]} />
      <directionalLight position={[60, 90, 40]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-80} shadow-camera-right={80} shadow-camera-top={80} shadow-camera-bottom={-80} shadow-camera-far={300} />
      <Terrain />
      <Buildings sel={sel} onSelect={onSelect} />
      <Trees pts={trees} />
      {facilities.map((f) => <FacilityModel key={f.id} f={f} sel={sel === f.id} onSelect={onSelect} />)}
      {route && <Line points={route.map((p) => [p[0], 0.5, p[1]] as [number, number, number])} color="#2563eb" lineWidth={6} />}
      {from && <mesh position={[from[0], 1, from[1]]}><sphereGeometry args={[0.9, 16, 16]} /><meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.6} /></mesh>}
      {to && <mesh position={[to[0], 2.2, to[1]]} rotation-x={Math.PI}><coneGeometry args={[0.9, 2.4, 16]} /><meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} /></mesh>}
      <ContactShadows position={[0, 0.12, 0]} opacity={0.35} scale={160} blur={2.5} far={12} />
      <CameraRig view={view} focus={focus} />
    </Canvas>
  );
}
