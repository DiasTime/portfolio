"use client";

import { useEffect, useState } from "react";
import { boot } from "@/lib/content";

export default function Boot() {
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"boot" | "fade" | "done">("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("du-booted")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("du-booted", "1");
    const lineTimer = setInterval(() => {
      setShown((n) => {
        if (n >= boot.length) {
          clearInterval(lineTimer);
          return n;
        }
        return n + 1;
      });
    }, 140);
    const fadeTimer = setTimeout(() => setPhase("fade"), boot.length * 140 + 450);
    const doneTimer = setTimeout(() => setPhase("done"), boot.length * 140 + 1050);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`boot ${phase === "fade" ? "boot-out" : ""}`} aria-hidden>
      <div className="boot-inner">
        {boot.slice(0, shown).map((l, i) => (
          <div className="boot-line" key={i}>
            {l}
          </div>
        ))}
        <div className="boot-line boot-caret">▌</div>
      </div>
    </div>
  );
}
