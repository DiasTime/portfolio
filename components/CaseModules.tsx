import { caseSystems, systems } from "@/lib/content";
import SysModule from "./SysModule";

export default function CaseModules() {
  return (
    <section className="sec" id="systems">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{systems.kicker}</p>
          <h2 className="sec-h2">
            {systems.heading} <span className="accent">{systems.headingAccent}</span>
          </h2>
          <p className="sec-sub">{systems.sub}</p>
        </div>

        <div className="sys-list">
          {caseSystems.map((cs, i) => (
            <SysModule cs={cs} flip={i % 2 === 1} key={cs.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
