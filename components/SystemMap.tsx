"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { systemMap } from "@/lib/content";

export default function SystemMap() {
  const treeRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: treeRef.current,
            start: "top 78%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );
    }, treeRef);
    return () => ctx.revert();
  }, []);

  const jump = (target: string) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec" id="map">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{systemMap.kicker}</p>
          <h2 className="sec-h2">
            {systemMap.heading} <span className="accent">{systemMap.headingAccent}</span>
          </h2>
          <p className="sec-sub">{systemMap.sub}</p>
        </div>

        <div className="map-tree" ref={treeRef}>
          <div className="map-spine" ref={spineRef} aria-hidden />
          <div className="map-root">
            <span className="map-root-led" aria-hidden />
            <div>
              <div className="map-root-title">{systemMap.root.title}</div>
              <div className="map-root-desc">{systemMap.root.desc}</div>
            </div>
          </div>

          {systemMap.modules.map((m, i) => (
            <div className={`map-row ${i % 2 === 0 ? "left" : "right"}`} key={m.id}>
              <motion.button
                className="map-node"
                onClick={() => jump(m.target)}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`Open module: ${m.title}`}
              >
                <span className="map-node-id">MOD/{m.id}</span>
                <span className="map-node-title">{m.title}</span>
                <span className="map-node-desc">{m.desc}</span>
                <span className={`map-node-status s-${m.status.toLowerCase()}`}>
                  ● {m.status} <i className="map-open">OPEN ↘</i>
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
