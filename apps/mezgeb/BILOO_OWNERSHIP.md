# Biloo Mezgeb ownership and continuity

This directory contains the complete, independently maintained Biloo-owned copy of the Mezgeb application.

- Product name: **Biloo Mezgeb**
- Biloo source location: `MahirG/biloo_group/apps/mezgeb`
- Preserved migration snapshot: `MahirG/MezgebOfficial` branch `archive/biloo-mezgeb-source`
- Deployment branch: `biloo-mezgeb-production`
- Existing Supabase project, authentication routes, environment keys and `mezgeb_*` database tables are intentionally unchanged.
- The existing Vercel project remains the production target after its Git source is cut over to Biloo.
- The Biloo website and Biloo Mezgeb application are validated and deployed as separate Next.js applications.
- Release validation passed formatting, lint, strict TypeScript, unit tests, Supabase email-template checks, production build, and Playwright desktop/mobile tests.
- The inherited `/app` transaction experience still contains browser-local prototype storage for selected modules and must not be presented as fully persistent until those screens are connected to the existing tables.
