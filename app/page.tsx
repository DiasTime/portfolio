import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  identity,
  hero,
  marquee,
  capabilities,
  work,
  caseStudies,
  process,
  about,
  testimonials,
  contact,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero container">
          <p className="kicker hero-kicker">
            <span>{identity.name}</span>
            <span className="knum">— {hero.kicker}</span>
          </p>
          <h1 className="hero-headline">
            <span className="row"><span>{hero.headlineTop}</span></span>
            <span className="row"><span><em>{hero.headlineEm}</em></span></span>
          </h1>
          <div className="hero-bottom">
            <p className="lede">{hero.lede}</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#contact">
                {hero.ctaPrimary} <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="#work">
                {hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hero-facts">
            {hero.facts.map((f) => (
              <div className="hero-fact" key={f.label}>
                <span className="mono-label">{f.label}</span>
                <span className="val">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, i) => (
              <span className="marquee-item" key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── CAPABILITIES ─────────────────────────────────── */}
        <section className="section" id="capabilities">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="ghost-num" aria-hidden>01</span>
                <p className="kicker">{capabilities.kicker}</p>
                <h2 className="display">
                  {capabilities.heading} <em>{capabilities.headingEm}</em>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="cap-grid">
                {capabilities.items.map((cap) => (
                  <div className="cap-cell" key={cap.index}>
                    <span className="idx">/{cap.index}</span>
                    <h3>{cap.title}</h3>
                    <p>{cap.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── WORK ─────────────────────────────────────────── */}
        <section className="section" id="work">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="ghost-num" aria-hidden>02</span>
                <p className="kicker">{work.kicker}</p>
                <h2 className="display">
                  {work.heading} <em>{work.headingEm}</em>
                </h2>
                <p className="lede">{work.intro}</p>
              </div>
            </Reveal>
            <div className="work-list">
              {caseStudies.map((cs) => (
                <Reveal key={cs.slug}>
                  <article className="work-item">
                    <Link href={`/work/${cs.slug}`} className="work-media" aria-label={`${cs.title} case study`}>
                      <span className="chrome" aria-hidden>
                        <i /><i /><i />
                        <span className="url">
                          {cs.liveUrl
                            ? cs.liveUrl.replace("https://", "").replace(/\/$/, "")
                            : `${cs.title.toLowerCase()} — production`}
                        </span>
                      </span>
                      <img src={cs.image.src} alt={cs.image.alt} loading="lazy" />
                    </Link>
                    <div className="work-info">
                      <span className="idx">CASE /{cs.index} — {cs.year}</span>
                      <h3>{cs.title}</h3>
                      <p className="tagline">{cs.tagline}</p>
                      <ul className="work-tags">
                        {cs.stack.slice(0, 5).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <div className="work-links">
                        <Link href={`/work/${cs.slug}`} className="link-line">
                          Read case study <span aria-hidden>→</span>
                        </Link>
                        {cs.liveUrl && (
                          <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="link-line dim">
                            Live site ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="section" id="process">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="ghost-num" aria-hidden>03</span>
                <p className="kicker">{process.kicker}</p>
                <h2 className="display">
                  {process.heading} <em>{process.headingEm}</em>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="proc-list">
                {process.steps.map((step) => (
                  <div className="proc-row" key={step.index}>
                    <span className="idx">{step.index}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────── */}
        <section className="section" id="about">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="ghost-num" aria-hidden>04</span>
                <p className="kicker">{about.kicker}</p>
                <h2 className="display">
                  {about.heading} <em>{about.headingEm}</em>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="about-grid">
                <div className="about-text">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="stack-panel">
                  <span className="mono-label">Working stack</span>
                  <ul>
                    {about.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className="about-langs">
                    {identity.languages.join(" · ")} — {identity.location}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="section" id="words">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="ghost-num" aria-hidden>05</span>
                <p className="kicker">{testimonials.kicker}</p>
                <h2 className="display">
                  {testimonials.heading} <em>{testimonials.headingEm}</em>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="testi-grid">
                {testimonials.items.map((t) => (
                  <figure className="testi-card" key={t.name}>
                    <span className="q-mark" aria-hidden>”</span>
                    <blockquote>{t.quote}</blockquote>
                    <figcaption className="who">
                      <div className="nm">{t.name}</div>
                      <div className="co">{t.company}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section className="section contact" id="contact">
          <div className="container">
            <Reveal>
              <p className="kicker">{contact.kicker}</p>
              <h2 className="display" style={{ marginTop: "1.6rem" }}>
                {contact.heading} <em>{contact.headingEm}</em>
              </h2>
              <div className="contact-body">
                <div>
                  <p className="lede">{contact.body}</p>
                  <a className="contact-email" href={`mailto:${identity.email}`}>
                    {identity.email}
                  </a>
                </div>
                <div className="contact-actions">
                  <a className="btn btn-primary" href={`mailto:${identity.email}`}>
                    {contact.cta} <span className="arr">→</span>
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={identity.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {identity.instagramHandle}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
