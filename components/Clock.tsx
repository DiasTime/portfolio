"use client";

import { useEffect, useState } from "react";
import { identity } from "@/lib/content";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: identity.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nav-clock">
      <span className="dot" aria-hidden />
      ASTANA {time && <>{time} {identity.timezoneLabel}</>}
    </span>
  );
}
