# Dias Urazov — Portfolio

Premium personal-brand portfolio: Full-Stack & AI Developer, Automation Engineer, Product Builder.

Built with Next.js 15 (App Router), TypeScript, and a fully custom CSS design system — no UI libraries, no Tailwind.

## Run

```bash
npm install
npm run dev      # development → http://localhost:3000
npm run build    # production build (fully static)
npm run start    # serve the production build
```

## Deploy

Push to a Git repo and import into [Vercel](https://vercel.com) — zero config required. All pages are statically prerendered.

## Editing content

**Every word on the site lives in `lib/content.ts`** — identity (name, email, socials), hero copy, capabilities, case studies, process, about, testimonials, and contact. Components contain no copy.

- To change your name/email/Instagram: edit the `identity` object.
- To add a case study: append to `caseStudies` (drop a 16:10 screenshot in `public/work/` and reference it).
- The learning-platform case study has `liveUrl: ""` because its old deployment (courses-topaz-one.vercel.app) is offline — set a URL there once it's redeployed.

## Design system

Defined in `app/globals.css`:

- **Palette** — ink `#0d0e0c`, bone `#e9e3d6`, ember `#e08a2e`
- **Type** — Instrument Serif (display), Archivo (body), IBM Plex Mono (labels)
- Film-grain overlay, ghost section numerals, scroll reveals (`components/Reveal.tsx`), live Astana clock in the nav (`components/Clock.tsx`)
