import { ticker } from "@/lib/content";

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {[...ticker, ...ticker].map((t, i) => (
          <span className="ticker-item" key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
