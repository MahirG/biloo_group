# Biloo Group

Official website and living company documentation for **Biloo Group**, an Ethiopia-rooted technology company founded by **Mahir Aman**.

> Technology built for generations.

## What this repository contains

- A production-oriented Next.js company website
- A responsive hamburger navigation system
- Color Sort, an offline-friendly Montessori-inspired toddler IQ game
- Search-ready project pages for Qabeza ERP and Mezgeb
- Search-ready solution pages for Biloo's strategic capability areas
- An editorial insights library with substantive long-form articles
- Biloo Group foundation and origin story
- Brand identity guidance
- Product and company roadmap
- Technical architecture, security, and SEO operating principles

## Public website structure

- `/` — company homepage
- `/about` — origin, founder, mission, and operating commitments
- `/projects` — Biloo Group project portfolio
- `/projects/qabeza-erp` — enterprise resource planning project
- `/projects/mezgeb` — Ethiopian business-ledger project
- `/iq-game` — Color Sort toddler bead-sorting game
- `/solutions` — technology capability overview
- `/solutions/[slug]` — AI, cloud, payments, commerce, labs, and public-sector technology pages
- `/insights` — technology perspectives
- `/insights/[slug]` — long-form editorial articles
- `/contact` — company contact and partnership information
- `/robots.txt` — crawler directives
- `/sitemap.xml` — generated sitemap

## Color Sort MVP

Color Sort includes 16 Easy and Medium levels, touch and mouse drag controls, tap-to-place fallback, pattern and memory challenges, positive-only rewards, saved progress, sticker collection, accessibility patterns, adjustable bead size, a parent gate, sound controls, and offline caching after the first successful load.

The game contains no accounts, ads, in-app purchases, leaderboards, lives, or numeric IQ score. It is designed as an educational play experience, not a clinical assessment.

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for React
- Pointer Events and Web Audio APIs
- Progressive Web App manifest and service worker
- Browser localStorage for game progress
- Next.js Metadata APIs and structured data
- ESLint and Prettier
- GitHub Actions

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://biloogroup.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Set the site URL to the exact production origin. The Google verification token is optional and should be supplied only when using Search Console's HTML verification method.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

## Important brand and project status

Biloo Group is in its foundation stage. Product names such as Biloo AI, Biloo Cloud, Biloo Pay, Biloo Commerce, Biloo Labs, and Biloo Gov are **strategic directions**, not representations that all products are currently launched.

Qabeza ERP is a product project under validation and development. Mezgeb is an interactive prototype and early product-development project. Color Sort is an educational web-game MVP. Public material must not imply unverified customers, production readiness, learning outcomes, or clinical IQ measurement.

The public domain is `biloogroup.com`. The contact email, corporate address, and telephone details must be verified before they are presented as finalized corporate information.

## Documentation

- [`docs/FOUNDATION.md`](docs/FOUNDATION.md)
- [`docs/BRAND.md`](docs/BRAND.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/SEO.md`](docs/SEO.md)
- [`SECURITY.md`](SECURITY.md)
