import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
// Loads a GLB lazily (inside <Suspense>), clones it so it can be reused, and enables shadows.
export function Glb({ url, scale = [1, 1, 1] }: { url: string; scale?: [number, number, number] }) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => obj.traverse((o: any) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; }), [obj]);
  return <primitive object={obj} scale={scale} />;
}
