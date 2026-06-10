"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { interaction } from "@/lib/interaction";
import { hero, identity } from "@/lib/content";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Telemetry = {
  clock: string;
  uptime: string;
  fps: number;
  scrollPct: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const [tele, setTele] = useState<Telemetry>({ clock: "--:--:--", uptime: "00:00", fps: 0, scrollPct: 0 });

  // DOM listeners feed the shared interaction state read by the 3D scene,
  // and a rAF loop drives the two-act HUD cross-fade without re-renders.
  useEffect(() => {
    interaction.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointer = (e: PointerEvent) => {
      interaction.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      interaction.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      interaction.scroll = clamp01(window.scrollY / window.innerHeight);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      ([entry]) => { interaction.heroVisible = entry.isIntersecting; },
      { threshold: 0.02 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    let raf = 0;
    const acts = () => {
      const p = interaction.reduced ? 0 : interaction.scroll;
      if (act1Ref.current) {
        const a1 = 1 - clamp01(p / 0.45);
        act1Ref.current.style.opacity = String(a1);
        act1Ref.current.style.transform = `translateY(${p * -46}px)`;
        act1Ref.current.style.pointerEvents = a1 > 0.5 ? "auto" : "none";
      }
      if (act2Ref.current) {
        const a2 = clamp01((p - 0.5) / 0.4);
        act2Ref.current.style.opacity = String(a2);
        act2Ref.current.style.transform = `translateY(${(1 - a2) * 34}px)`;
        act2Ref.current.style.pointerEvents = a2 > 0.5 ? "auto" : "none";
      }
      raf = requestAnimationFrame(acts);
    };
    raf = requestAnimationFrame(acts);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Live telemetry: real session data, refreshed at 2Hz.
  useEffect(() => {
    const start = performance.now();
    let frames = 0;
    let fps = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      frames++;
      if (now - last >= 1000) {
        fps = frames;
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const clockFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: identity.timezone,
    });
    const id = setInterval(() => {
      const up = Math.floor((performance.now() - start) / 1000);
      const mm = String(Math.floor(up / 60)).padStart(2, "0");
      const ss = String(up % 60).padStart(2, "0");
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setTele({
        clock: clockFmt.format(new Date()),
        uptime: `${mm}:${ss}`,
        fps,
        scrollPct: max > 0 ? Math.round((window.scrollY / max) * 100) : 0,
      });
    }, 500);

    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, []);

  // Staggered HUD entrance after the boot sequence.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hud-el",
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.9, ease: "power3.out", delay: interaction.reduced ? 0 : 1.2 }
      );
    }, hudRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef} id="top" aria-label="AI command center">
      <div className="hero-stage">
        <div className="hero-canvas" aria-hidden>
          <Scene />
        </div>

        <div className="hero-hud" ref={hudRef}>
          <div className="hud-sys hud-el">
            {hero.sysLines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>

          {/* ACT 1 — the statement */}
          <div className="hud-act1" ref={act1Ref}>
            <div className="hud-main">
              <p className="hud-name hud-el">
                {hero.name} <span>{hero.nameTag}</span>
              </p>
              <p className="hud-kicker hud-el">{hero.kicker}</p>
              <h1 className="hud-h1">
                <span className="hud-el">{hero.h1a}</span>
                <span className="hud-el">
                  that <span className="accent">run</span> businesses.
                </span>
              </h1>
              <p className="hud-sub hud-el">{hero.sub}</p>
              <div className="hud-ctas hud-el">
                <a className="osbtn osbtn-primary" href="#contact">
                  {hero.ctaPrimary} <span className="arr">→</span>
                </a>
                <a className="osbtn osbtn-ghost" href="#map">
                  {hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>

          {/* ACT 2 — the camera dives, the operator ID resolves */}
          <div className="hud-act2" ref={act2Ref} style={{ opacity: 0 }}>
            <div className="idcard win">
              <div className="win-head">
                <span className="win-dots" aria-hidden><i /><i /><i /></span>
                <span className="win-title">{hero.act2.title}</span>
                <span className="win-tag">VERIFIED</span>
              </div>
              <div className="win-body idcard-body">
                <div className="id-name">{hero.name}</div>
                {hero.act2.rows.map((r) => (
                  <div className="id-row" key={r.k}>
                    <span className="id-k">{r.k}</span>
                    <span className="id-v">{r.v}</span>
                  </div>
                ))}
                <div className="chips id-chips">
                  {hero.act2.chips.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hud-tele hud-el" aria-label="Live session telemetry">
            <div className="tele-row"><span>LOCAL · ASTANA</span><b>{tele.clock}</b></div>
            <div className="tele-row"><span>SESSION UPTIME</span><b>{tele.uptime}</b></div>
            <div className="tele-row"><span>RENDER</span><b>{tele.fps > 0 ? `${tele.fps} FPS` : "—"}</b></div>
            <div className="tele-row"><span>SCROLL DEPTH</span><b>{tele.scrollPct}%</b></div>
            <div className="tele-row tele-status"><span>STATUS</span><b>● {identity.availability}</b></div>
          </div>

          <div className="hud-scroll hud-el" aria-hidden>
            <span>{hero.scrollHint}</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
