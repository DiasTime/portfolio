"use client";

import { motion } from "framer-motion";
import { operator } from "@/lib/content";

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export default function Operator() {
  return (
    <section className="sec" id="operator">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{operator.kicker}</p>
          <h2 className="sec-h2">
            {operator.heading} <span className="accent">{operator.headingAccent}</span>
          </h2>
        </div>

        <div className="op-grid">
          <div className="op-left">
            <motion.div className="op-story" {...rise} transition={{ duration: 0.6 }}>
              {operator.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <div className="op-philosophy">
              <span className="brief-label">OPERATING PRINCIPLES</span>
              <div className="phil-grid">
                {operator.philosophy.map((ph, i) => (
                  <motion.div
                    className="phil-card"
                    key={ph.n}
                    {...rise}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <span className="phil-n">{ph.n}</span>
                    <span className="phil-t">{ph.t}</span>
                    <span className="phil-d">{ph.d}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="op-timeline">
            <span className="brief-label">RUNTIME LOG</span>
            <div className="tl">
              {operator.timeline.map((t, i) => (
                <motion.div
                  className="tl-item"
                  key={t.year}
                  {...rise}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <span className="tl-dot" aria-hidden />
                  <span className="tl-year">{t.year}</span>
                  <div className="tl-body">
                    <span className="tl-title">{t.title}</span>
                    <span className="tl-desc">{t.desc}</span>
                  </div>
                </motion.div>
              ))}
              <div className="tl-item tl-now">
                <span className="tl-dot live" aria-hidden />
                <span className="tl-year">NOW</span>
                <div className="tl-body">
                  <span className="tl-title">Accepting new projects</span>
                  <span className="tl-desc">Your business could be the next entry in this log.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
