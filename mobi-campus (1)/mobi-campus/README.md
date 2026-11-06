# MOBI — Evergreen Future Campus
Run: `npm install && npm run dev` → http://localhost:3000
- `src/data/*` buildings, paths (graph nodes/edges), facilities. Coordinates are normalized estimates (1 unit = 10 px of the source map; origin = image centre). Not surveyed.
- `src/navigation/graph.ts` Dijkstra over path intersections. Edges flagged `false` are inferred connectors (unverified).
- `src/three/*` R3F scene: instanced trees, procedural models (swap for Blender GLB via useGLTF), camera rig.
- All facilities except BUS-001 are PROPOSED — LOCATION TO BE VERIFIED.
Not yet done: GLB/PBR textures, LOD, 2D SVG fallback, handwashing/washroom detail, "use my location" (needs surveyed control points).

## GLB asset spec (Blender → /public/models)
- Export glTF Binary (.glb), Y-up, metres, Draco/meshopt compressed, textures ≤1024px (KTX2/WebP if possible).
- Facilities: origin at ground centre, ~1 unit tall bin/bench scale (see procedural sizes in `Facility.tsx`).
- Buildings: author at a 1×1×1 unit footprint/height, origin at ground centre; the app scales by the building's [w,h,d] and rotation.
- Register each file in `src/data/modelManifest.ts` by facility type or building kind. Missing entries fall back to procedural models.
