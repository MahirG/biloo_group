# Biloo Group

Official website and living company documentation for **Biloo Group**, an Ethiopia-rooted technology company founded by **Mahir Aman**.

> Technology built for generations.

## What this repository contains

- A production-oriented Next.js company website
- Search-ready solution pages for Biloo's strategic capability areas
- An editorial insights library with substantive long-form articles
- Biloo Group foundation and origin story
- Brand identity guidance
- Product and company roadmap
- Technical architecture, security, and SEO operating principles

## Public website structure

- `/` — company homepage
- `/about` — origin, founder, mission, and operating commitments
- `/solutions` — technology capability overview
- `/solutions/[slug]` — AI, cloud, payments, commerce, labs, and public-sector technology pages
- `/insights` — technology perspectives
- `/insights/[slug]` — long-form editorial articles
- `/contact` — company contact and partnership information
- `/robots.txt` — crawler directives
- `/sitemap.xml` — generated sitemap

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for React
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
NEXT_PUBLIC_SITE_URL=https://biloogroups.com
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

## Important brand status

Biloo Group is in its foundation stage. Product names such as Biloo AI, Biloo Cloud, Biloo Pay, Biloo Commerce, Biloo Labs, and Biloo Gov are **strategic directions**, not representations that all products are currently launched.

The public domain, contact email, corporate address, and telephone details must be confirmed before they are presented as finalized corporate information.

## Documentation

- [`docs/FOUNDATION.md`](docs/FOUNDATION.md)
- [`docs/BRAND.md`](docs/BRAND.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/SEO.md`](docs/SEO.md)
- [`SECURITY.md`](SECURITY.md)
