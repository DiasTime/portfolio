import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study | Dias Urazov`,
    description: cs.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const next =
    caseStudies[(caseStudies.findIndex((c) => c.slug === slug) + 1) % caseStudies.length];

  return (
    <>
      <Nav />
      <main>
        <section className="cs-hero container">
          <Link href="/#work" className="link-line dim back">
            ← All case studies
          </Link>
          <p className="kicker">
            Case /{cs.index} <span className="knum">— {cs.year}</span>
          </p>
          <h1>{cs.title}</h1>
          <p className="tagline">{cs.tagline}</p>

          <div className="cs-meta">
            <div>
              <span className="mono-label">Client</span>
              <span className="val">{cs.client}</span>
            </div>
            <div>
              <span className="mono-label">Role</span>
              <span className="val">{cs.role}</span>
            </div>
            <div>
              <span className="mono-label">Stack</span>
              <span className="val">{cs.stack.join(" · ")}</span>
            </div>
            <div>
              <span className="mono-label">Live</span>
              <span className="val">
                {cs.liveUrl ? (
                  <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer">
                    {cs.liveUrl.replace("https://", "").replace(/\/$/, "")} ↗
                  </a>
                ) : (
                  "Demo on request"
                )}
              </span>
            </div>
          </div>
        </section>

        <div className="container">
          <Reveal>
            <figure className="cs-figure">
              <img src={cs.image.src} alt={cs.image.alt} />
            </figure>
          </Reveal>
        </div>

        <div className="container">
          <Reveal>
            <section className="cs-section" style={{ marginTop: "4rem" }}>
              <h2 className="cs-label">The Problem</h2>
              <div className="cs-body">
                {cs.problem.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="cs-section">
              <h2 className="cs-label">The Solution</h2>
              <div className="cs-body">
                {cs.solution.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="cs-section">
              <h2 className="cs-label">Key Features</h2>
              <div className="cs-body">
                <ul className="feature-grid">
                  {cs.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="cs-section">
              <h2 className="cs-label">Business Value</h2>
              <div className="cs-body">
                <p className="em">{cs.businessValue}</p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="cs-section">
              <h2 className="cs-label">Results</h2>
              <div className="cs-body">
                <ul className="result-list">
                  {cs.results.map((r, i) => (
                    <li key={r}>
                      <span className="r-idx">R/{String(i + 1).padStart(2, "0")}</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <section className="cs-next">
            <span className="mono-label">Next case study</span>
            <Link href={`/work/${next.slug}`} className="next-title">
              {next.title} <span className="arr">→</span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
