"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

type Order = { id: number; item: string; qty: number; total: number; stage: number };

const PRODUCTS = [
  "Porcelain dinner set",
  "Borosilicate teapot 1.2L",
  "Stoneware plates ×12",
  "Crystal glasses ×6",
  "Ceramic serving bowls",
  "Chef knife set",
];
const STAGES = ["PENDING", "PAID", "PACKED", "SHIPPED"];

let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export default function CommerceSim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState(0);
  const [imp, setImp] = useState(0); // Excel import progress 0..100
  // Persists across in-view toggles so order ids (= React keys) never collide.
  const nextIdRef = useRef(1041);

  useEffect(() => {
    if (!inView) return;
    const tick = setInterval(() => {
      setOrders((prev) => {
        const advanced = prev.map((o) =>
          o.stage < 3 && rnd() > 0.45 ? { ...o, stage: o.stage + 1 } : o
        );
        const fresh: Order = {
          id: nextIdRef.current++,
          item: PRODUCTS[Math.floor(rnd() * PRODUCTS.length)],
          qty: 1 + Math.floor(rnd() * 4),
          total: Math.floor(8 + rnd() * 82) * 1000,
          stage: 0,
        };
        setCount((c) => c + 1);
        return [fresh, ...advanced].slice(0, 5);
      });
    }, 2100);
    return () => clearInterval(tick);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setImp((p) => (p >= 100 ? 0 : p + 4)), 240);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div className="win sim" ref={ref}>
      <div className="win-head">
        <span className="win-dots" aria-hidden><i /><i /><i /></span>
        <span className="win-title">willmax.admin — order operations</span>
        <span className="win-tag">SIMULATION</span>
      </div>
      <div className="win-body sim-com">
        <div className="sim-metrics">
          <div className="metric">
            <span className="m-val">{count}</span>
            <span className="m-label">ORDERS / SESSION</span>
          </div>
          <div className="metric">
            <span className="m-val">RU·KZ</span>
            <span className="m-label">LOCALES LIVE</span>
          </div>
          <div className="metric">
            <span className="m-val">0</span>
            <span className="m-label">DEV TICKETS NEEDED</span>
          </div>
        </div>

        <div className="order-list">
          <AnimatePresence initial={false}>
            {orders.map((o) => (
              <motion.div
                className="order-row"
                key={o.id}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <span className="o-id">WX-{o.id}</span>
                <span className="o-item">{o.item} ×{o.qty}</span>
                <span className="o-total">₸{o.total.toLocaleString("en-US")}</span>
                <span className={`o-stage st-${o.stage}`}>{STAGES[o.stage]}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {orders.length === 0 && <div className="order-empty">awaiting orders…</div>}
        </div>

        <div className="import-bar">
          <div className="import-txt">
            {imp >= 100 ? "catalog.xlsx — 312 SKUs synced ✓" : `importing catalog.xlsx … ${imp}%`}
          </div>
          <div className="import-track"><div className="import-fill" style={{ width: `${imp}%` }} /></div>
        </div>
      </div>
    </div>
  );
}
