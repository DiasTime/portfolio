"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stage = { id: string; label: string; n: number };

const INITIAL: Stage[] = [
  { id: "visit", label: "ONLINE RESEARCHERS", n: 128 },
  { id: "config", label: "CONFIGURED A CABIN", n: 47 },
  { id: "consult", label: "BOOKED CONSULTATION", n: 19 },
  { id: "showroom", label: "SHOWROOM VISIT", n: 9 },
];

let seed = 99;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export default function FunnelSim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [stages, setStages] = useState<Stage[]>(INITIAL);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setStages((prev) => {
        const next = prev.map((s) => ({ ...s }));
        next[0].n += 1 + Math.floor(rnd() * 2);
        if (rnd() > 0.55) next[1].n += 1;
        if (rnd() > 0.78) next[2].n += 1;
        if (rnd() > 0.9) next[3].n += 1;
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, [inView]);

  const top = stages[0].n;

  return (
    <div className="win sim" ref={ref}>
      <div className="win-head">
        <span className="win-dots" aria-hidden><i /><i /><i /></span>
        <span className="win-title">interdiv.funnel — lead flow monitor</span>
        <span className="win-tag">SIMULATION</span>
      </div>
      <div className={`win-body sim-fun ${inView ? "live" : ""}`}>
        {stages.map((s, i) => {
          const pct = Math.max(6, Math.round((s.n / top) * 100));
          const conv = i === 0 ? null : Math.round((s.n / stages[i - 1].n) * 100);
          return (
            <div className="fstage" key={s.id}>
              <div className="f-meta">
                <span className="f-label">{s.label}</span>
                <span className="f-count">{s.n.toLocaleString("en-US")}</span>
              </div>
              <div className="f-bar">
                <div className="f-fill" style={{ width: `${pct}%` }} />
              </div>
              {i < stages.length - 1 && (
                <div className="f-link" aria-hidden>
                  <span className="packet" style={{ animationDelay: `${i * 0.5}s` }} />
                </div>
              )}
              {conv !== null && <span className="f-conv">{conv}% carried from previous stage</span>}
            </div>
          );
        })}
        <div className="f-note">runs 24/7 — every stage fires its own follow-up automatically</div>
      </div>
    </div>
  );
}
