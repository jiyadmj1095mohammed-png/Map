"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { places } from "@/utils/places";
import { findRoute } from "@/navigation/graph";
import { nodes } from "@/data/campusPaths";

const Scene = dynamic(() => import("@/three/scene/CampusScene"), { ssr: false, loading: () => <div className="grid h-full place-items-center text-slate-500">Loading campus…</div> });

export default function CampusApp() {
  const [q, setQ] = useState(""), [sel, setSel] = useState<string | null>(null), [view, setView] = useState<"map" | "3d">("3d");
  const [from, setFrom] = useState("BUS-001"), [dest, setDest] = useState<string | null>(null);
  const P = (id: string | null) => places.find((p) => p.id === id) || null;
  const hits = useMemo(() => q.trim() ? places.filter((p) => (p.name + p.type + p.id).toLowerCase().includes(q.toLowerCase())).slice(0, 8) : [], [q]);
  const a = P(from), b = P(dest), cur = P(sel);
  const route = useMemo(() => (a && b ? findRoute(a.node, b.node) : null), [a, b]);
  const pick = (id: string) => { setSel(id); setQ(""); };
  const focus = (cur || b)?.pos ?? null;

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-sky-100">
      <Scene view={view} route={route?.pts ?? null} sel={sel} focus={focus} from={a?.pos ?? null} to={b?.pos ?? null} onSelect={setSel} />
      <div className="absolute left-3 right-3 top-3 max-w-md space-y-2">
        <div className="rounded-xl bg-white/95 p-2 shadow">
          <input aria-label="Search campus" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search building, department or facility" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600" />
          {hits.map((p) => <button key={p.id} onClick={() => pick(p.id)} className="flex w-full justify-between px-2 py-1.5 text-left text-sm hover:bg-emerald-50"><span>{p.name}</span><span className="text-xs text-slate-500">{p.id}</span></button>)}
        </div>
        <div className="flex gap-2">
          {(["3d", "map"] as const).map((v) => <button key={v} onClick={() => setView(v)} className={`rounded-lg px-3 py-1.5 text-sm shadow ${view === v ? "bg-emerald-700 text-white" : "bg-white"}`}>{v === "3d" ? "3D view" : "Map view"}</button>)}
        </div>
      </div>
      {cur && (
        <section className="absolute inset-x-3 bottom-3 max-w-md rounded-xl bg-white/95 p-3 text-sm shadow">
          <div className="font-semibold">{cur.name}</div>
          <div className="text-xs text-slate-500">{cur.id} · {cur.type} · path node {cur.node} · local ({cur.pos[0].toFixed(1)}, {cur.pos[1].toFixed(1)}) est.</div>
          <div className={`mt-1 rounded px-2 py-1 text-xs ${cur.status === "proposed" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`}>{cur.status === "proposed" ? "PROPOSED — LOCATION TO BE VERIFIED" : "From source map"} · {cur.note}</div>
          <div className="mt-2 flex items-center gap-2">
            <label className="text-xs">Start
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="ml-1 rounded border px-1 py-1 text-xs">{places.filter((p) => p.group === "building" || p.id === "BUS-001" || p.id === "ENT-001").map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
            </label>
            <button onClick={() => setDest(cur.id)} className="rounded-lg bg-emerald-700 px-3 py-1.5 text-white">Directions here</button>
            {dest && <button onClick={() => setDest(null)} className="rounded-lg border px-2 py-1.5">Clear</button>}
          </div>
          {route && dest === cur.id && <div className="mt-2 text-xs">≈{Math.round(route.length * 10)} source-map px (not metres) · {route.ids.join(" → ")}{route.usesUnverified && <span className="text-amber-700"> · includes an inferred (unverified) connector</span>}</div>}
        </section>
      )}
    </main>
  );
}
