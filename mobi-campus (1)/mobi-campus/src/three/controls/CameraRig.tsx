import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { V2 } from "@/utils/geometry";
// Smoothly flies to the focus point; mode 'map' = top-down, '3d' = tilted perspective. User can still orbit/pan/zoom.
export function CameraRig({ view, focus }: { view: "map" | "3d"; focus: V2 | null }) {
  const ctl = useRef<any>(null), goal = useRef<{ t: Vector3; p: Vector3 } | null>(null);
  const { camera } = useThree();
  useEffect(() => {
    const t = new Vector3(focus?.[0] ?? 0, 0, focus?.[1] ?? 0), h = focus ? 38 : 95;
    goal.current = { t, p: t.clone().add(view === "map" ? new Vector3(0, h * 1.4, 0.01) : new Vector3(0, h * 0.8, h * 0.9)) };
  }, [view, focus]);
  useFrame((_, dt) => {
    const g = goal.current; if (!g || !ctl.current) return;
    const k = 1 - Math.pow(0.002, dt);
    camera.position.lerp(g.p, k); ctl.current.target.lerp(g.t, k); ctl.current.update();
    if (camera.position.distanceTo(g.p) < 0.3) goal.current = null;
  });
  return <OrbitControls ref={ctl} makeDefault enableDamping maxPolarAngle={Math.PI / 2.05} minDistance={8} maxDistance={220} />;
}
