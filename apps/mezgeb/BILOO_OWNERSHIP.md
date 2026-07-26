# Biloo Mezgeb ownership and continuity

This directory contains the complete Biloo-owned copy of the Mezgeb application.

- Product name: **Biloo Mezgeb**
- Biloo source location: `MahirG/biloo_group/apps/mezgeb`
- Preserved source snapshot: `MahirG/MezgebOfficial` branch `archive/biloo-mezgeb-source`
- Deployment branch: `biloo-mezgeb-production`
- Existing Supabase project, authentication routes, environment keys and `mezgeb_*` database tables are intentionally unchanged.
- The existing Vercel project remains the intended production target after its Git source is cut over to Biloo.
- The inherited `/app` transaction experience still contains browser-local prototype storage for selected modules and must not be presented as fully persistent until those screens are connected to the existing tables.
