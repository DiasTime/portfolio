// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for every word on the site.
// Edit identity, copy, and case studies here — nothing is
// hard-coded inside components.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: "Dias Urazov",
  shortName: "D. Urazov",
  monogram: "DU",
  title: "Full-Stack & AI Developer",
  roles: ["Full-Stack Developer", "AI Developer", "Automation Engineer", "Product Builder"],
  location: "Astana, Kazakhstan",
  timezoneLabel: "GMT+5",
  timezone: "Asia/Almaty",
  languages: ["English", "Russian", "Kazakh"],
  email: "daniel.millward@wardenglish.com",
  instagram: "https://instagram.com/DANDBWEB",
  instagramHandle: "@DANDBWEB",
  availability: "Accepting new projects",
};

export const hero = {
  kicker: "Full-Stack Developer · AI Engineer · Product Builder",
  headlineTop: "Software that",
  headlineEm: "pays for itself.",
  lede:
    "I design and ship complete business systems — AI integrations, automated operations, and high-performance digital products that generate leads, cut manual work, and scale revenue. Not just websites: working assets.",
  ctaPrimary: "Start a project",
  ctaSecondary: "View case studies",
  facts: [
    { label: "Base", value: "Astana — working worldwide" },
    { label: "Languages", value: "English · Russian · Kazakh" },
    { label: "Scope", value: "Strategy → build → run" },
  ],
};

export const marquee = [
  "AI Integration",
  "Business Automation",
  "SaaS Development",
  "E-Commerce Engines",
  "Lead Generation",
  "CRE Technology",
  "Custom Software",
];

export const capabilities = {
  kicker: "Capabilities",
  heading: "Built for business outcomes,",
  headingEm: "not tech demos.",
  items: [
    {
      index: "01",
      title: "AI Integration",
      body:
        "LLM-powered features embedded where they create margin — document intelligence, support copilots, content pipelines, and decision automation that compress hours of work into seconds.",
    },
    {
      index: "02",
      title: "Business Automation",
      body:
        "I replace manual operations with systems that run around the clock: data syncs, approvals, reporting, follow-ups. Your team does the thinking; software does the repetition.",
    },
    {
      index: "03",
      title: "SaaS & Product Development",
      body:
        "From idea to billable product — architecture, build, launch, iteration. I've shipped commerce engines, learning platforms, and operations tools end to end, solo.",
    },
    {
      index: "04",
      title: "High-Performance Web Platforms",
      body:
        "Sites and storefronts engineered to convert: fast, multilingual, SEO-sound, and manageable by your own team — no developer required for daily operations.",
    },
    {
      index: "05",
      title: "Lead Generation Systems",
      body:
        "Pipelines that capture, qualify, and route demand automatically — landing systems, smart forms, scoring, CRM handoff, and instant follow-up that never forgets a prospect.",
    },
    {
      index: "06",
      title: "Commercial Real Estate Technology",
      body:
        "Listing platforms, property data tools, and deal-flow software for CRE teams still running on spreadsheets — purpose-built for how property deals actually move.",
    },
  ],
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  client: string;
  tagline: string;
  year: string;
  liveUrl: string;
  role: string;
  stack: string[];
  image: { src: string; alt: string };
  problem: string[];
  solution: string[];
  features: string[];
  businessValue: string;
  results: string[];
};

export const work = {
  kicker: "Selected Work",
  heading: "Case studies,",
  headingEm: "not screenshots.",
  intro:
    "Every project below shipped to production and runs a real business. Each one is documented the way it was built — as a commercial problem with an engineered answer.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "willmax-commerce",
    index: "01",
    title: "Willmax",
    client: "Willmax — premium tableware brand",
    tagline: "A complete commerce engine for a premium brand — storefront to back office.",
    year: "2024",
    liveUrl: "https://wilmax.vercel.app/",
    role: "Design, full-stack development, infrastructure",
    stack: ["Next.js", "React", "TypeScript", "Firebase", "Cloudinary", "Vercel"],
    image: { src: "/work/willmax.png", alt: "Willmax e-commerce storefront" },
    problem: [
      "Willmax sells premium tableware, borosilicate glassware, and kitchen accessories. The brand needed a direct sales channel that matched the quality of the product — and full operational control behind it.",
      "The hard requirement wasn't the storefront. It was everything after the click: catalog management across hundreds of SKUs, stock control, order processing, and content in two languages — all without calling a developer for daily operations.",
    ],
    solution: [
      "I built a complete commerce platform: a fast, premium storefront with full-text search and filtering, cart and checkout, and a custom administration panel covering products, categories, orders, and inventory.",
      "Operational friction was engineered out deliberately. Catalog updates happen through a single Excel upload instead of item-by-item editing. Media runs through a Cloudinary pipeline. Admin access is hardened with brute-force protection. The entire experience ships in Russian and Kazakh with SEO and performance budgets enforced.",
    ],
    features: [
      "Premium responsive storefront with search and filtering",
      "Cart, checkout, and full order lifecycle management",
      "Custom admin panel — products, orders, categories, stock",
      "Bulk catalog import from Excel files",
      "Cloudinary media pipeline for product imagery",
      "Hardened admin authentication with brute-force protection",
      "Russian / Kazakh localization",
      "SEO optimization and performance tuning",
    ],
    businessValue:
      "The brand owns its sales channel end to end. The team runs daily commerce operations — catalog, stock, orders, content — entirely in-house, in two languages, from one panel.",
    results: [
      "Catalog updates went from developer tickets to a self-serve Excel upload",
      "The full order lifecycle is managed from a single admin panel",
      "Bilingual storefront serving the Kazakhstani market from day one",
      "Zero developer dependency for day-to-day operations",
    ],
  },
  {
    slug: "interactive-learning-platform",
    index: "02",
    title: "CodeCourse",
    client: "Online education provider",
    tagline: "A code-first learning platform where students don't watch — they build.",
    year: "2024",
    liveUrl: "",
    role: "Product design, full-stack development",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
    image: { src: "/work/courses.png", alt: "Interactive learning platform interface" },
    problem: [
      "Video-only courses produce viewers, not practitioners. The client needed a platform where students write real code, get instant feedback, and finish with verifiable skills — without an instructor manually reviewing every submission.",
      "At scale, manual grading is the business bottleneck: every new student adds instructor hours. The platform had to break that link.",
    ],
    solution: [
      "I built an end-to-end learning product: interactive lessons with embedded video, an in-browser code editor, and automated test-based grading that gives students feedback in seconds instead of days.",
      "Around that core loop sits the full product: progress tracking and analytics, discussion forums, a certification track with final assessments, completion certificates, gamification to drive course completion, and a mobile experience for learning anywhere.",
    ],
    features: [
      "Interactive course content with video lessons",
      "In-browser code editor for hands-on practice",
      "Automated code testing with instant feedback",
      "Progress tracking and learner analytics",
      "Certification program with final assessments",
      "Discussion forums and learner community",
      "Gamification mechanics for engagement",
      "Fully responsive mobile learning experience",
    ],
    businessValue:
      "Assessment runs itself — the platform scales to thousands of learners with zero added instructor hours. Certification creates a premium tier, and analytics expose exactly where students drop off.",
    results: [
      "Fully automated grading loop — no manual review at any scale",
      "Certification track packaged as a sellable premium tier",
      "Complete funnel visibility: enrollment → progress → completion",
      "Self-serve learning product that runs without daily operation",
    ],
  },
  {
    slug: "premium-shower-systems",
    index: "03",
    title: "InterDiv",
    client: "Premium shower cabin company",
    tagline: "A digital showroom that turns online researchers into booked consultations.",
    year: "2024",
    liveUrl: "https://inter-div.vercel.app/",
    role: "Design, development, lead-capture strategy",
    stack: ["React", "Next.js", "TypeScript", "Vercel"],
    image: { src: "/work/interdiv.png", alt: "Premium shower systems digital showroom" },
    problem: [
      "Premium bathroom products sell through physical showrooms — but buyers research online first. The company's product line was effectively invisible during the phase when customers compare options from home.",
      "Every undocumented product and unanswered question online was a customer walking into a competitor's showroom instead.",
    ],
    solution: [
      "I built a digital showroom that does the first half of the sales job: a complete product catalog with detailed specifications, high-fidelity imagery and 3D visualization, and cabin customization options that let buyers configure before they commit.",
      "The site is engineered as a lead engine — consultation forms, a physical showroom locator, installation guidance, and embedded customer reviews move researchers from anonymous browsing to a booked, qualified conversation.",
    ],
    features: [
      "Product catalog with full technical specifications",
      "High-fidelity imagery and 3D visualization",
      "Shower cabin customization options",
      "Showroom locator for offline conversion",
      "Consultation and contact forms as lead capture",
      "Installation guides and after-sales support content",
      "Customer reviews and social proof",
      "Responsive design across all devices",
    ],
    businessValue:
      "The sales conversation now starts online, on the company's terms. Prospects arrive at the showroom pre-sold — they've already configured, compared, and committed to a shortlist.",
    results: [
      "A 24/7 lead channel where there was previously none",
      "Consultation forms qualify buyers before they reach the showroom",
      "Premium product line fully documented and searchable online",
      "Showroom traffic backed by informed, high-intent visitors",
    ],
  },
];

export const process = {
  kicker: "Process",
  heading: "From business problem",
  headingEm: "to running system.",
  steps: [
    {
      index: "01",
      title: "Diagnose",
      body: "We start with the P&L, not the feature list. Where is money leaking — what's manual, what's slow, what's leaking leads.",
    },
    {
      index: "02",
      title: "Design",
      body: "Scope cut to what moves the number. Clear architecture, honest timeline, priorities fixed before a line of code.",
    },
    {
      index: "03",
      title: "Build",
      body: "Production-grade engineering in focused sprints. Working software every week — not a big reveal at the end.",
    },
    {
      index: "04",
      title: "Automate",
      body: "AI and automation layered where they compound: fewer hands in the loop, faster cycles, cleaner data.",
    },
    {
      index: "05",
      title: "Run",
      body: "Launch is the start, not the finish. Monitoring, support, and iteration as the product meets real users.",
    },
  ],
};

export const about = {
  kicker: "About",
  heading: "Developer by craft.",
  headingEm: "Operator by instinct.",
  paragraphs: [
    "I'm Dias Urazov — a full-stack developer and product builder based in Astana. I started out running D&B Web, shipping commercial sites and stores for businesses across Kazakhstan: education platforms, premium e-commerce, manufacturing companies.",
    "That client work taught me the lesson that now defines how I build: nobody buys software — they buy outcomes. Today I focus on systems where the outcome is measurable: AI integrations that remove manual work, automation that runs operations overnight, lead engines that fill pipelines, and products built to be sold.",
    "I work in English, Russian, and Kazakh, and I work best with founders and operators who judge software by what it returns.",
  ],
  stack: [
    "TypeScript", "React", "Next.js", "Node.js", "Express",
    "PostgreSQL", "MongoDB", "Firebase", "Claude & OpenAI APIs",
    "Docker", "CI/CD", "Cloudinary",
  ],
};

export const testimonials = {
  kicker: "Client Words",
  heading: "Judged by the people",
  headingEm: "who paid for it.",
  items: [
    {
      quote:
        "They delivered our corporate site fast, precisely to spec, with every request accounted for. Support is outstanding — anything we need updated or extended simply gets done.",
      name: "Alexander Petrov",
      company: "TechnoProm LLC",
    },
    {
      quote:
        "We needed a landing page for a new project. Delivered sharp and on schedule — the site brings in clients and the conversion rate speaks for itself. Recommended.",
      name: "Elena Smirnova",
      company: "ArtVector Design Studio",
    },
    {
      quote:
        "A year of working together: store built, CRM connected, zero downtime. The admin panel is a pleasure to use. Sales are up and order processing is noticeably faster.",
      name: "Dmitry Ivanov",
      company: "FashionStyle",
    },
  ],
};

export const contact = {
  kicker: "Contact",
  heading: "Have a process that",
  headingEm: "should run itself?",
  body:
    "Tell me what's slow, manual, or leaking leads in your business. I'll tell you what I'd build, how long it takes, and what it should return.",
  cta: "Write to me",
};
