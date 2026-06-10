"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { agents, identity } from "@/lib/content";

let seed = 42;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export default function AgentPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: identity.timezone,
    });
    let i = 0;
    const tick = () => {
      const [agent, msg, next] = agents.logEvents[i % agents.logEvents.length];
      const ms = Math.floor(90 + rnd() * 420);
      const line = `[${fmt.format(new Date())}] ${agent} ▸ ${msg} → ${next} ✓ ${ms}ms`;
      setLog((prev) => [...prev.slice(-8), line]);
      i++;
    };
    tick();
    const id = setInterval(tick, 1700);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  return (
    <section className="sec" id="agents">
      <div className="wrap" ref={ref}>
        <div className="sec-head">
          <p className="kicker">{agents.kicker}</p>
          <h2 className="sec-h2">
            {agents.heading} <span className="accent">{agents.headingAccent}</span>
          </h2>
          <p className="sec-sub">{agents.sub}</p>
        </div>

        <div className={`pipe ${inView ? "live" : ""}`}>
          {agents.nodes.map((a, i) => (
            <div className="pipe-step" key={a.id}>
              <div className="agent-card">
                <div className="agent-top">
                  <span className="agent-id">{a.id}</span>
                  <span className="agent-led" aria-hidden />
                </div>
                <div className="agent-name">{a.name}</div>
                <div className="agent-role">{a.role}</div>
                <div className="agent-status">RUNNING</div>
              </div>
              {i < agents.nodes.length - 1 && (
                <div className="pipe-link" aria-hidden>
                  <span className="packet" style={{ animationDelay: `${i * 0.4}s` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="syslog win">
          <div className="win-head">
            <span className="win-dots" aria-hidden><i /><i /><i /></span>
            <span className="win-title">pipeline.log — live event stream</span>
            <span className="win-tag">STREAMING</span>
          </div>
          <div className="syslog-body" ref={logRef} role="log" aria-live="off">
            {log.map((l, i) => (
              <div className="log-line" key={i}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
