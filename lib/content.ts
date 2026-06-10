// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for every word on the site.
// Edit identity, copy, modules, and case systems here —
// nothing is hard-coded inside components.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: "Dias Urazov",
  os: "DU/OS",
  version: "v2.026",
  title: "Full-Stack Engineer · AI Builder · Automation Architect",
  location: "Astana, Kazakhstan",
  timezoneLabel: "GMT+5",
  timezone: "Asia/Astana",
  languages: ["English", "Russian", "Kazakh"],
  email: "dias.urazov17@gmail.com",
  instagram: "https://instagram.com/diasurazov",
  instagramHandle: "@diasurazov",
  availability: "ACCEPTING NEW PROJECTS",
};

export const boot = [
  "DU/OS v2.026 — personal engineering system",
  "> loading neural core .................. ok",
  "> mounting agents [5/5] ................ ok",
  "> automations online ................... ok",
  "> linking production systems [3/3] ..... ok",
  "> access granted — welcome, visitor",
];

export const hero = {
  sysLines: ["DU/OS v2.026 — PERSONAL ENGINEERING SYSTEM", "OPERATOR: DIAS URAZOV — ASTANA / GMT+5"],
  name: "DIAS URAZOV",
  nameTag: "OPERATOR · DU-001",
  kicker: "FULL-STACK ENGINEER · AI BUILDER · AUTOMATION ARCHITECT",
  h1a: "I engineer systems",
  h1b: "that run businesses.",
  sub: "Software that automates operations, generates revenue, and scales without headcount — designed, built, and shipped end to end by one engineer.",
  ctaPrimary: "Initialize project",
  ctaSecondary: "Explore the system",
  scrollHint: "SCROLL TO ENTER SYSTEM",
  // Act 2 — the camera dives into the core and the operator ID resolves.
  act2: {
    title: "OPERATOR.ID — DU-001",
    rows: [
      { k: "WHO", v: "Full-stack & AI engineer. One person, the entire system — design to deploy." },
      { k: "WHAT", v: "AI agents, business automation, commerce engines, SaaS products." },
      { k: "WHY", v: "Because software should pay for itself — or it's decoration." },
      { k: "EDGE", v: "I think in P&L, not in pages. Business outcome first, code second." },
    ],
    chips: ["EN · RU · KZ", "ASTANA · GMT+5", "FULL CYCLE — SOLO"],
  },
};

export const ticker = [
  "MODULES ONLINE 6/6",
  "AGENTS RUNNING 5/5",
  "PRODUCTION SYSTEMS 3",
  "REGION — ASTANA · GMT+5",
  "LANG — EN · RU · KZ",
  "STATUS — ACCEPTING PROJECTS",
  "FOCUS — AI · AUTOMATION · CRE TECH",
];

export const systemMap = {
  kicker: "SYSTEM MAP",
  heading: "One environment.",
  headingAccent: "Six subsystems.",
  sub: "Everything below is part of a single connected system. Select a module to jump into it.",
  root: { title: "DU/OS CORE", desc: "All systems route through one operator" },
  modules: [
    { id: "01", title: "AI Systems", desc: "LLM agents wired into real business workflows", target: "#agents", status: "ACTIVE" },
    { id: "02", title: "Business Automation", desc: "Operations that run on events, not on people", target: "#agents", status: "ACTIVE" },
    { id: "03", title: "SaaS Products", desc: "Platforms built end to end, built to be sold", target: "#sys-learnloop", status: "DEPLOYED" },
    { id: "04", title: "Commerce & Custom Software", desc: "Storefront to back office, owned in-house", target: "#sys-commerce", status: "DEPLOYED" },
    { id: "05", title: "Lead Generation", desc: "Demand captured, qualified, and routed 24/7", target: "#sys-funnel", status: "DEPLOYED" },
    { id: "06", title: "CRE Technology", desc: "Deal-flow software for commercial real estate", target: "#dna", status: "BUILDING" },
  ],
};

export const agents = {
  kicker: "AI SYSTEMS — LIVE",
  heading: "Agents that run",
  headingAccent: "the pipeline.",
  sub: "Reference architecture: the lead-to-close automation I build for clients. Five agents, zero manual handoffs — watch the data move.",
  nodes: [
    { id: "01", name: "CAPTURE.AGENT", role: "Forms, chat & inbound — every lead enters the system" },
    { id: "02", name: "CRM.AGENT", role: "Creates records, deduplicates, enriches with context" },
    { id: "03", name: "QUALIFY.AGENT", role: "LLM scoring against the ideal-customer profile" },
    { id: "04", name: "SALES.AGENT", role: "Drafts outreach, books meetings, never forgets follow-up" },
    { id: "05", name: "ANALYTICS.AGENT", role: "Funnel metrics, attribution, anomaly alerts" },
  ],
  logEvents: [
    ["capture.agent", "lead.captured src=cre-landing", "crm.sync"],
    ["crm.agent", "record.created — deduped, enriched", "qualify.queue"],
    ["qualify.agent", "icp.score=0.87 → QUALIFIED", "sales.queue"],
    ["sales.agent", "outreach.sent — meeting link attached", "analytics.track"],
    ["analytics.agent", "funnel.cvr updated — report pushed", "dashboard"],
    ["capture.agent", "lead.captured src=instagram-dm", "crm.sync"],
    ["qualify.agent", "icp.score=0.31 → NURTURE", "sequence.start"],
    ["sales.agent", "follow-up.scheduled t+48h", "calendar"],
  ] as [string, string, string][],
};

export type CaseSystem = {
  id: string;
  anchor: string;
  sysId: string;
  codeName: string;
  client: string;
  title: string;
  sim: "commerce" | "code" | "funnel";
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  liveUrl: string;
  liveLabel: string;
  arch: { flow: string[]; satellites: string[] };
  outcomes: string[];
};

export const systems = {
  kicker: "PRODUCTION SYSTEMS",
  heading: "Shipped software,",
  headingAccent: "running live.",
  sub: "Three systems in production. No screenshots — each one is reconstructed below as a working simulation of what it does.",
};

export const caseSystems: CaseSystem[] = [
  {
    id: "commerce",
    anchor: "sys-commerce",
    sysId: "SYS/01",
    codeName: "COMMERCE.ENGINE",
    client: "Willmax — premium tableware brand",
    title: "A commerce engine the brand operates itself",
    sim: "commerce",
    problem:
      "A premium brand with no direct channel: no customer data, no margin control, and a catalog that needed a developer for every update.",
    solution:
      "Full commerce platform — storefront, orders, stock, bilingual RU/KZ content — driven from one admin panel, with the entire catalog updated through a single Excel import.",
    impact:
      "Daily operations need zero developer time. The brand owns its channel, its data, and its margins.",
    stack: ["Next.js", "TypeScript", "Firebase", "Cloudinary"],
    liveUrl: "https://wilmax.vercel.app/",
    liveLabel: "wilmax.vercel.app",
    arch: {
      flow: [
        "CUSTOMER — bilingual storefront, search, cart",
        "NEXT.JS CORE — catalog, checkout, SEO layer",
        "FIREBASE — orders, stock, hardened auth",
        "ADMIN PANEL — products, orders, categories",
        "OWNER — full control, zero developer tickets",
      ],
      satellites: ["Cloudinary media pipeline", "Excel bulk import", "Brute-force shield", "RU/KZ locales"],
    },
    outcomes: [
      "Catalog updates: developer tickets → self-serve Excel upload",
      "Entire order lifecycle managed from one panel",
      "Bilingual storefront serving the market from day one",
      "Zero developer dependency in daily operations",
    ],
  },
  {
    id: "learnloop",
    anchor: "sys-learnloop",
    sysId: "SYS/02",
    codeName: "LEARN.LOOP",
    client: "Online education provider",
    title: "A learning platform that grades itself",
    sim: "code",
    problem:
      "Video courses create viewers, not engineers — and every new student added manual grading hours. Growth was capped by instructor time.",
    solution:
      "In-browser code editor, automated test-based grading, progress analytics, and a certification track. The feedback loop runs itself, in seconds.",
    impact:
      "Scales to any cohort size with zero added instructor hours. Certification became the sellable premium tier.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    liveUrl: "",
    liveLabel: "demo on request",
    arch: {
      flow: [
        "STUDENT — writes real code in the browser",
        "SUBMISSION — code + task context",
        "TEST RUNNER — automated grading engine",
        "FEEDBACK — returned in seconds, not days",
        "CERTIFICATE — verified, sellable skill",
      ],
      satellites: ["Progress analytics", "Discussion forums", "Gamification", "Mobile learning"],
    },
    outcomes: [
      "Zero added instructor hours at any cohort size",
      "Certification packaged as the premium tier",
      "Full funnel visibility: enroll → progress → complete",
      "Runs without daily human operation",
    ],
  },
  {
    id: "funnel",
    anchor: "sys-funnel",
    sysId: "SYS/03",
    codeName: "LEAD.FUNNEL",
    client: "InterDiv — premium shower systems",
    title: "A digital showroom that books consultations",
    sim: "funnel",
    problem:
      "Premium products sold only through physical showrooms — invisible during online research, losing buyers before first contact.",
    solution:
      "Digital showroom with full specs, 3D visualization and product configuration, wired into consultation forms that qualify and book prospects automatically.",
    impact:
      "A 24/7 lead channel. Prospects arrive at the showroom pre-sold, pre-configured, and pre-qualified.",
    stack: ["Next.js", "React", "TypeScript", "Vercel"],
    liveUrl: "https://inter-div.vercel.app/",
    liveLabel: "inter-div.vercel.app",
    arch: {
      flow: [
        "VISITOR — researching premium cabins online",
        "DIGITAL SHOWROOM — full specs + 3D visuals",
        "CONFIGURATOR — builds their own cabin",
        "CONSULTATION FORM — qualified, booked lead",
        "SHOWROOM — buyer arrives pre-sold",
      ],
      satellites: ["Showroom locator", "Customer reviews", "Install guides"],
    },
    outcomes: [
      "A 24/7 lead channel where none existed",
      "Leads qualified before first human contact",
      "Full product line searchable online",
      "Showroom visits arrive pre-sold and configured",
    ],
  },
];

export const operator = {
  kicker: "OPERATOR FILE",
  heading: "Built by one engineer.",
  headingAccent: "On purpose.",
  story: [
    "I started as the developer behind D&B Web — a small studio in Astana shipping commercial sites and stores for real businesses: education, premium e-commerce, manufacturing.",
    "Client work taught me the lesson that now defines everything I build: nobody buys software — they buy outcomes. The Excel import that saved a catalog manager her week mattered more than any animation I ever shipped.",
    "So I stopped selling websites. Today I build the systems behind businesses — AI agents, automation, lead engines, commerce platforms — and I measure my work in hours saved and revenue created.",
  ],
  philosophy: [
    { n: "01", t: "Pays for itself", d: "If software doesn't return more than it cost, it's decoration." },
    { n: "02", t: "Automate repetition, keep judgment", d: "Machines run the loop; humans make the call." },
    { n: "03", t: "Ship weekly", d: "Working software every week. No big reveals, no surprises." },
    { n: "04", t: "One pair of hands", d: "Design to deploy by one engineer — total accountability, zero handoff loss." },
  ],
  timeline: [
    {
      year: "2024",
      title: "First production systems",
      desc: "Willmax commerce engine, the CodeCourse learning platform, and the InterDiv lead engine — designed, built, and shipped solo.",
    },
    {
      year: "2025",
      title: "D&B Web — client delivery",
      desc: "Ran a studio delivering platforms for businesses across Kazakhstan, in two languages, with support clients actually praise.",
    },
    {
      year: "2026",
      title: "AI & automation focus",
      desc: "Full pivot to AI agents, business automation, and commercial real estate technology. Systems that run while their owners sleep.",
    },
  ],
};

export const stackGraph = {
  kicker: "TECHNOLOGY ECOSYSTEM",
  heading: "A stack that behaves",
  headingAccent: "like infrastructure.",
  sub: "Not a list of logos — a connected system. Hover a node to see what it does and what it talks to.",
  center: { id: "nextjs", label: "Next.js", role: "Application platform — every system above runs on it" },
  nodes: [
    { id: "typescript", label: "TypeScript", role: "Type-safe core language across every layer" },
    { id: "postgres", label: "PostgreSQL", role: "System of record" },
    { id: "supabase", label: "Supabase", role: "Auth, storage & realtime data" },
    { id: "prisma", label: "Prisma", role: "Typed data-access layer" },
    { id: "redis", label: "Redis", role: "Cache, queues & rate limiting" },
    { id: "openai", label: "OpenAI / Claude", role: "Reasoning & generation APIs" },
    { id: "langchain", label: "LangChain", role: "Agent & RAG orchestration" },
    { id: "n8n", label: "n8n", role: "Workflow automation fabric" },
    { id: "docker", label: "Docker", role: "Packaging & self-hosted deploys" },
    { id: "vercel", label: "Vercel", role: "Edge infrastructure & CI/CD" },
  ],
  edges: [
    ["nextjs", "typescript"],
    ["nextjs", "vercel"],
    ["nextjs", "prisma"],
    ["prisma", "postgres"],
    ["supabase", "postgres"],
    ["nextjs", "supabase"],
    ["nextjs", "redis"],
    ["nextjs", "openai"],
    ["langchain", "openai"],
    ["nextjs", "langchain"],
    ["n8n", "openai"],
    ["n8n", "docker"],
    ["docker", "redis"],
    ["n8n", "nextjs"],
  ] as [string, string][],
};

export const dna = {
  kicker: "DEVELOPER DNA",
  heading: "Five modules.",
  headingAccent: "One operator.",
  sub: "Select a module to inspect what it's made of — systems, tooling, and proof.",
  modules: [
    {
      id: "fullstack",
      code: "FS",
      title: "Full-Stack Engineering",
      blurb:
        "Frontend, backend, data, infrastructure — one person, the whole system. Three production platforms designed, built, and shipped solo, end to end.",
      systems: [
        { label: "COMMERCE.ENGINE", href: "#sys-commerce" },
        { label: "LEARN.LOOP", href: "#sys-learnloop" },
        { label: "LEAD.FUNNEL", href: "#sys-funnel" },
      ],
      tooling: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "MongoDB"],
      proof: [
        "3 production platforms shipped end to end, solo",
        "Storefront → admin → infrastructure, one pair of hands",
        "Bilingual delivery (RU/KZ) for the Kazakhstani market",
      ],
    },
    {
      id: "ai",
      code: "AI",
      title: "AI Development",
      blurb:
        "LLMs embedded where they create margin — not chatbots for show. Scoring, document intelligence, copilots, and content pipelines inside real workflows.",
      systems: [{ label: "AGENT.PIPELINE", href: "#agents" }],
      tooling: ["OpenAI API", "Claude API", "LangChain", "RAG", "Embeddings"],
      proof: [
        "Agent architectures for lead qualification & outreach",
        "LLM scoring replaces manual triage",
        "Automated grading loop in LEARN.LOOP — zero human review",
      ],
    },
    {
      id: "automation",
      code: "AU",
      title: "Automation Architecture",
      blurb:
        "Operations redesigned as event-driven systems. What used to run on people now runs on schedules, queues, and webhooks — nights and weekends included.",
      systems: [
        { label: "AGENT.PIPELINE", href: "#agents" },
        { label: "COMMERCE.ENGINE", href: "#sys-commerce" },
      ],
      tooling: ["n8n", "Redis", "Webhooks", "Cron", "Queues"],
      proof: [
        "Catalog ops reduced to a single Excel upload",
        "Order lifecycle runs without manual handoffs",
        "Follow-ups that fire themselves — no forgotten leads",
      ],
    },
    {
      id: "product",
      code: "PR",
      title: "Product Thinking",
      blurb:
        "Scope cut to what moves the number. Every feature justified by the business case — certification tiers, self-serve ops, lead capture built into the product.",
      systems: [
        { label: "LEARN.LOOP", href: "#sys-learnloop" },
        { label: "LEAD.FUNNEL", href: "#sys-funnel" },
      ],
      tooling: ["Funnels", "Analytics", "Pricing tiers", "Onboarding"],
      proof: [
        "Certification track packaged as a premium tier",
        "Self-serve admin designed so clients never call a developer",
        "Lead capture engineered into the product, not bolted on",
      ],
    },
    {
      id: "business",
      code: "BZ",
      title: "Business Systems",
      blurb:
        "Current focus: commercial real estate technology and lead-generation infrastructure — deal-flow tools for teams that still run on spreadsheets.",
      systems: [
        { label: "LEAD.FUNNEL", href: "#sys-funnel" },
        { label: "CRE.MODULE — in development", href: "#contact" },
      ],
      tooling: ["CRM design", "Lead scoring", "CRE data", "Reporting"],
      proof: [
        "Lead engines running in production since 2024",
        "CRE deal-flow tooling in active development",
        "Systems judged by revenue, not by screenshots",
      ],
    },
  ],
};

export const signals = {
  kicker: "CLIENT SIGNALS",
  items: [
    {
      quote: "Store built, CRM connected, zero downtime in a year. Sales are up and order processing is noticeably faster.",
      name: "Dmitry Ivanov",
      company: "FashionStyle",
    },
    {
      quote: "The site brings in clients and the conversion rate speaks for itself. Delivered sharp and on schedule.",
      name: "Elena Smirnova",
      company: "ArtVector Design Studio",
    },
    {
      quote: "Fast, precisely to spec, every request accounted for. Anything we need updated simply gets done.",
      name: "Alexander Petrov",
      company: "TechnoProm LLC",
    },
  ],
};

export const contact = {
  kicker: "CONTACT",
  heading: "Initialize",
  headingAccent: "a project.",
  termLines: [
    { prompt: true, text: "whoami" },
    { prompt: false, text: "dias.urazov — full-stack & AI engineer · astana (GMT+5)" },
    { prompt: true, text: "status" },
    { prompt: false, text: "● accepting new projects", accent: true },
    { prompt: true, text: "cat contact.txt" },
    { prompt: false, text: "email      → dias.urazov17@gmail.com  " },
    { prompt: false, text: "instagram  → @diasurazov" },
    { prompt: true, text: 'run new-project --brief "your slowest process"' },
    { prompt: false, text: "awaiting input", caret: true },
  ],
  ctaPrimary: "Send project brief",
  ctaSecondary: "Open Instagram",
};

export const footer = {
  left: `© 2026 DIAS URAZOV`,
  middle: "BUILT WITH NEXT.JS · R3F · GSAP · FRAMER MOTION",
  right: "ALL SYSTEMS OPERATIONAL",
};
