# Technical Architecture

## Current decision

The first Biloo Group website is a content-focused Next.js application. It does not need a database, authentication, Prisma, Docker, or Supabase yet.

Adding infrastructure before a validated requirement would increase cost and maintenance without creating user value. Those technologies remain available for future products when the data model and operating needs are known.

## Website stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for React
- Vercel-compatible deployment
- GitHub Actions for quality checks

## Repository structure

```text
src/
  app/            Routes, metadata, and global styles
  components/     Reusable interface components
  data/           Typed company and product content
docs/             Company, brand, roadmap, and architecture records
.github/           Continuous integration workflows
```

## Engineering principles

- Server components by default; client components only for interaction or animation
- Strict TypeScript
- Small, composable components
- Accessible semantic HTML
- Performance budgets before decorative effects
- No secrets in the repository
- No invented customer, company, or product data

## Future architecture gates

### Add a database when

The website or product needs durable structured data, authenticated workflows, content operations, or auditable transactions.

### Add Supabase or managed Postgres when

The product requires relational data, row-level security, authentication, storage, or real-time features and the team accepts the operational model.

### Add Prisma when

A typed ORM improves developer productivity and the migration model matches the selected Postgres operating strategy.

### Add Docker when

Local or production parity, multi-service orchestration, controlled runtime images, or non-Vercel deployment makes containerization valuable.

### Add a monorepo when

At least two independently deployed applications share packages, tooling, or design systems strongly enough to justify workspace complexity.

## Deployment

Recommended initial deployment: Vercel connected to GitHub, with preview deployments for pull requests and production deployment from the protected default branch.

Required environment variable:

- `NEXT_PUBLIC_SITE_URL`

## Decision record policy

Major choices should be recorded with context, options, decision, consequences, owner, and review date. Architecture should evolve from verified requirements rather than fashion.
