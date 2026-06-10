"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CaseSystem } from "@/lib/content";
import CommerceSim from "./sims/CommerceSim";
import CodeSim from "./sims/CodeSim";
import FunnelSim from "./sims/FunnelSim";

const SIMS = {
  commerce: CommerceSim,
  code: CodeSim,
  funnel: FunnelSim,
} as const;

type View = "sim" | "arch" | "impact";

const VIEWS: { id: View; label: string }[] = [
  { id: "sim", label: "SIMULATION" },
  { id: "arch", label: "ARCHITECTURE" },
  { id: "impact", label: "IMPACT" },
];

function ArchFlow({ cs }: { cs: CaseSystem }) {
  return (
    <div className="win sim">
      <div className="win-head">
        <span className="win-dots" aria-hidden><i /><i /><i /></span>
        <span className="win-title">{cs.codeName.toLowerCase()} — system architecture</span>
        <span className="win-tag">FLOW</span>
      </div>
      <div className="win-body arch-body">
        {cs.arch.flow.map((node, i) => {
          const [head, ...rest] = node.split(" — ");
          return (
            <div className="arch-step" key={node}>
              <div className="arch-node">
                <span className="arch-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="arch-t">{head}</span>
                {rest.length > 0 && <span className="arch-d">{rest.join(" — ")}</span>}
              </div>
              {i < cs.arch.flow.length - 1 && (
                <div className="arch-link" aria-hidden>
                  <span className="packet" style={{ animationDelay: `${i * 0.35}s` }} />
                </div>
              )}
            </div>
          );
        })}
        <div className="arch-sats">
          <span className="brief-label">SUPPORTING MODULES</span>
          <div className="chips">
            {cs.arch.satellites.map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactView({ cs }: { cs: CaseSystem }) {
  return (
    <div className="win sim">
      <div className="win-head">
        <span className="win-dots" aria-hidden><i /><i /><i /></span>
        <span className="win-title">{cs.codeName.toLowerCase()} — measured impact</span>
        <span className="win-tag">OUTPUT</span>
      </div>
      <div className="win-body impact-body">
        <p className="impact-lede">{cs.impact}</p>
        <ul className="impact-list">
          {cs.outcomes.map((o, i) => (
            <li key={o}>
              <span className="imp-n">R/{String(i + 1).padStart(2, "0")}</span>
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SysModule({ cs, flip }: { cs: CaseSystem; flip: boolean }) {
  const [view, setView] = useState<View>("sim");
  const Sim = SIMS[cs.sim];

  return (
    <article className={`sys-module ${flip ? "flip" : ""}`} id={cs.anchor}>
      <header className="sysm-head">
        <span className="sysm-id">
          {cs.sysId} · {cs.codeName}
        </span>
        <span className="sysm-client">{cs.client}</span>
        <div className="sysm-tabs" role="tablist" aria-label={`${cs.codeName} views`}>
          {VIEWS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              className={`sysm-tab ${view === v.id ? "on" : ""}`}
              onClick={() => setView(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
        {cs.liveUrl ? (
          <a className="sysm-live" href={cs.liveUrl} target="_blank" rel="noopener noreferrer">
            ● LIVE — {cs.liveLabel} ↗
          </a>
        ) : (
          <span className="sysm-live off">○ {cs.liveLabel.toUpperCase()}</span>
        )}
      </header>

      <div className="sysm-grid">
        <div className="sysm-sim">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view === "sim" && <Sim />}
              {view === "arch" && <ArchFlow cs={cs} />}
              {view === "impact" && <ImpactView cs={cs} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="brief">
          <h3 className="brief-title">{cs.title}</h3>
          <div className="brief-block">
            <span className="brief-label">PROBLEM</span>
            <p>{cs.problem}</p>
          </div>
          <div className="brief-block">
            <span className="brief-label">SOLUTION</span>
            <p>{cs.solution}</p>
          </div>
          <div className="brief-block impact">
            <span className="brief-label">IMPACT</span>
            <p>{cs.impact}</p>
          </div>
          <ul className="chips">
            {cs.stack.map((t) => (
              <li className="chip" key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
