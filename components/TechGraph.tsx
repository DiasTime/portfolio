"use client";

import { useMemo, useState } from "react";
import { stackGraph } from "@/lib/content";

const W = 1000;
const H = 620;
const CX = W / 2;
const CY = H / 2;

export default function TechGraph() {
  const [active, setActive] = useState<string | null>(null);

  const layout = useMemo(() => {
    const n = stackGraph.nodes.length;
    const pos = new Map<string, { x: number; y: number }>();
    pos.set(stackGraph.center.id, { x: CX, y: CY });
    stackGraph.nodes.forEach((node, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      pos.set(node.id, {
        x: CX + Math.cos(a) * 385,
        y: CY + Math.sin(a) * 225,
      });
    });
    return pos;
  }, []);

  const related = useMemo(() => {
    const map = new Map<string, Set<string>>();
    const all = [stackGraph.center.id, ...stackGraph.nodes.map((n) => n.id)];
    for (const id of all) map.set(id, new Set([id]));
    for (const [a, b] of stackGraph.edges) {
      map.get(a)?.add(b);
      map.get(b)?.add(a);
    }
    return map;
  }, []);

  const allNodes = [
    { ...stackGraph.center, center: true },
    ...stackGraph.nodes.map((n) => ({ ...n, center: false })),
  ];
  const activeNode = allNodes.find((n) => n.id === active);

  const edgePath = (a: string, b: string) => {
    const pa = layout.get(a)!;
    const pb = layout.get(b)!;
    const mx = (pa.x + pb.x) / 2 + (CX - (pa.x + pb.x) / 2) * 0.18;
    const my = (pa.y + pb.y) / 2 + (CY - (pa.y + pb.y) / 2) * 0.18;
    return `M ${pa.x} ${pa.y} Q ${mx} ${my} ${pb.x} ${pb.y}`;
  };

  return (
    <section className="sec" id="stack">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{stackGraph.kicker}</p>
          <h2 className="sec-h2">
            {stackGraph.heading} <span className="accent">{stackGraph.headingAccent}</span>
          </h2>
          <p className="sec-sub">{stackGraph.sub}</p>
        </div>

        <div className="graph-wrap">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="graph-svg"
            role="img"
            aria-label="Technology ecosystem graph centered on Next.js"
          >
            {stackGraph.edges.map(([a, b], i) => {
              const dim = active !== null && !(related.get(active)?.has(a) && related.get(active)?.has(b));
              const lit = active !== null && (a === active || b === active);
              return (
                <path
                  key={`${a}-${b}`}
                  id={`edge-${i}`}
                  d={edgePath(a, b)}
                  className={`g-edge ${dim ? "dim" : ""} ${lit ? "lit" : ""}`}
                />
              );
            })}
            {/* data pulses traveling selected edges */}
            {[0, 2, 5, 7, 9, 12].map((ei, k) => (
              <circle key={ei} r="3" className="g-pulse">
                <animateMotion dur={`${2.4 + k * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#edge-${ei}`} />
                </animateMotion>
              </circle>
            ))}
            {allNodes.map((n) => {
              const p = layout.get(n.id)!;
              const dim = active !== null && !related.get(active)?.has(n.id);
              return (
                <g
                  key={n.id}
                  className={`g-node ${n.center ? "core" : ""} ${dim ? "dim" : ""} ${active === n.id ? "on" : ""}`}
                  transform={`translate(${p.x}, ${p.y})`}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === n.id ? null : n.id)}
                >
                  <circle className="g-halo" r={n.center ? 46 : 30} />
                  <circle className="g-dot" r={n.center ? 9 : 5.5} />
                  <text className="g-label" y={n.center ? -22 : -16} textAnchor="middle">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="g-readout" aria-live="polite">
            {activeNode ? (
              <>
                <b>{activeNode.label}</b> — {activeNode.role}
              </>
            ) : (
              <span className="g-hint">hover a node to inspect its role in the system</span>
            )}
          </div>
        </div>

        <ul className="g-legend">
          {allNodes.map((n) => (
            <li key={n.id}>
              <b>{n.label}</b>
              <span>{n.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
