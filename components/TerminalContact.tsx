"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { contact, identity } from "@/lib/content";

export default function TerminalContact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(contact.termLines.length);
      return;
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= contact.termLines.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="sec" id="contact">
      <div className="wrap" ref={ref}>
        <div className="sec-head">
          <p className="kicker">{contact.kicker}</p>
          <h2 className="sec-h2">
            {contact.heading} <span className="accent">{contact.headingAccent}</span>
          </h2>
        </div>

        <div className="term-grid">
          <div className="term win">
            <div className="win-head">
              <span className="win-dots" aria-hidden><i /><i /><i /></span>
              <span className="win-title">dias@du-os: ~/contact</span>
              <span className="win-tag">TTY</span>
            </div>
            <div className="win-body term-body">
              {contact.termLines.slice(0, shown).map((l, i) => (
                <div className={`term-line ${l.accent ? "t-accent" : ""}`} key={i}>
                  {l.prompt && <span className="t-prompt">$ </span>}
                  {l.text}
                  {l.caret && <span className="caret"> ▌</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="term-side">
            <p className="term-pitch">
              Tell me what&apos;s slow, manual, or leaking leads in your business. I&apos;ll tell you
              what I&apos;d build, how long it takes, and what it should return.
            </p>
            <div className="term-ctas">
              <a className="osbtn osbtn-primary" href={`mailto:${identity.email}?subject=Project brief`}>
                {contact.ctaPrimary} <span className="arr">→</span>
              </a>
              <a className="osbtn osbtn-ghost" href={identity.instagram} target="_blank" rel="noopener noreferrer">
                {contact.ctaSecondary} ↗
              </a>
            </div>
            <div className="term-meta">
              <span>{identity.location} · {identity.timezoneLabel}</span>
              <span>{identity.languages.join(" · ")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
