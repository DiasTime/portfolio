"use client";

import { useEffect, useState } from "react";
import { identity } from "@/lib/content";

const links = [
  { href: "#map", label: "MAP" },
  { href: "#agents", label: "AGENTS" },
  { href: "#systems", label: "SYSTEMS" },
  { href: "#stack", label: "STACK" },
  { href: "#operator", label: "OPERATOR" },
  { href: "#dna", label: "DNA" },
  { href: "#contact", label: "CONTACT" },
];

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", timeZone: identity.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <a href="#top" className="tb-brand">
        <span className="tb-led" aria-hidden />
        {identity.os} <em>— {identity.name.toUpperCase()}</em>
      </a>
      <nav className="tb-links" aria-label="System modules">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <div className="tb-right">
        <span className="tb-time">{time && `ASTANA ${time}`}</span>
        <span className="tb-status">OPERATIONAL</span>
      </div>
    </header>
  );
}
