import { useLayoutEffect, useRef } from "react";
import { InstancedMesh, Object3D, Color } from "three";
// Two InstancedMeshes (trunks + crowns) render every tree in 2 draw calls.
export function Trees({ pts }: { pts: { x: number; z: number; s: number; t: number }[] }) {
  const trunk = useRef<InstancedMesh>(null), crown = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const o = new Object3D(), c = new Color();
    pts.forEach((p, i) => {
      o.position.set(p.x, p.s * 0.6, p.z); o.scale.set(0.25 * p.s, p.s * 1.2, 0.25 * p.s); o.updateMatrix(); trunk.current!.setMatrixAt(i, o.matrix);
      o.position.set(p.x, p.s * 2, p.z); o.scale.set(p.s * (p.t ? 1.0 : 1.2), p.s * (p.t ? 1.5 : 1.0), p.s * (p.t ? 1.0 : 1.2)); o.updateMatrix();
      crown.current!.setMatrixAt(i, o.matrix); crown.current!.setColorAt(i, c.set(p.t ? "#2f6b2a" : "#5a9a3c"));
    });
    [trunk, crown].forEach((r) => (r.current!.instanceMatrix.needsUpdate = true));
    crown.current!.instanceColor!.needsUpdate = true;
  }, [pts]);
  return (
    <>
      <instancedMesh ref={trunk} args={[undefined, undefined, pts.length]} castShadow><cylinderGeometry args={[1, 1.2, 1, 6]} /><meshStandardMaterial color="#6b4a2f" roughness={1} /></instancedMesh>
      <instancedMesh ref={crown} args={[undefined, undefined, pts.length]} castShadow><icosahedronGeometry args={[1.3, 1]} /><meshStandardMaterial roughness={0.9} flatShading /></instancedMesh>
    </>
  );
}
