import Boot from "@/components/os/Boot";
import TopBar from "@/components/os/TopBar";
import Ticker from "@/components/os/Ticker";
import Hero from "@/components/hero/Hero";
import SystemMap from "@/components/SystemMap";
import AgentPipeline from "@/components/AgentPipeline";
import CaseModules from "@/components/CaseModules";
import TechGraph from "@/components/TechGraph";
import Operator from "@/components/Operator";
import DevDNA from "@/components/DevDNA";
import TerminalContact from "@/components/TerminalContact";
import StatusFooter from "@/components/StatusFooter";

export default function Home() {
  return (
    <>
      <Boot />
      <TopBar />
      <main>
        <Hero />
        <Ticker />
        <SystemMap />
        <AgentPipeline />
        <CaseModules />
        <TechGraph />
        <Operator />
        <DevDNA />
        <TerminalContact />
      </main>
      <StatusFooter />
    </>
  );
}
