"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dna, signals } from "@/lib/content";

export default function DevDNA() {
  const [activeId, setActiveId] = useState(dna.modules[0].id);

  const active = dna.modules.find((m) => m.id === activeId)!;

  return (
    <section className="sec" id="dna">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{dna.kicker}</p>
          <h2 className="sec-h2">
            {dna.heading} <span className="accent">{dna.headingAccent}</span>
          </h2>
          <p className="sec-sub">{dna.sub}</p>
        </div>

        <div className="dna-grid">
          <div className="dna-list" role="tablist" aria-label="Developer DNA modules">
            {dna.modules.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={m.id === activeId}
                className={`dna-item ${m.id === activeId ? "active" : ""}`}
                onClick={() => setActiveId(m.id)}
              >
                <span className="dna-code">{m.code}</span>
                <span className="dna-title">{m.title}</span>
                <span className="dna-arrow" aria-hidden>▸</span>
              </button>
            ))}
          </div>

          <div className="dna-panel win">
            <div className="win-head">
              <span className="win-dots" aria-hidden><i /><i /><i /></span>
              <span className="win-title">dna/{active.id}.module</span>
              <span className="win-tag">LOADED</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="win-body dna-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <p className="dna-blurb">{active.blurb}</p>

                <div className="dna-sub">
                  <span className="brief-label">LINKED SYSTEMS</span>
                  <div className="chips">
                    {active.systems.map((s) => (
                      <a className="chip chip-link" href={s.href} key={s.label}>{s.label}</a>
                    ))}
                  </div>
                </div>

                <div className="dna-sub">
                  <span className="brief-label">TOOLING</span>
                  <div className="chips">
                    {active.tooling.map((t) => (
                      <span className="chip" key={t}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="dna-sub">
                  <span className="brief-label">PROOF</span>
                  <ul className="dna-proof">
                    {active.proof.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="signals">
          <span className="brief-label sig-head">{signals.kicker}</span>
          <div className="signal-row">
            {signals.items.map((s) => (
              <figure className="signal-card" key={s.name}>
                <blockquote className="sg-q">&gt; “{s.quote}”</blockquote>
                <figcaption className="sg-who">
                  {s.name} — {s.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
