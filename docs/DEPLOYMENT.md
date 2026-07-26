# Biloo Group Deployment

## Vercel project

- Project: `biloo-group`
- Framework: Next.js
- Production branch: `main`
- Production environment variable: `NEXT_PUBLIC_SITE_URL=https://biloogroup.com`

## Release workflow

1. Merge validated changes into `main`.
2. Vercel creates a production deployment from the GitHub integration.
3. Confirm the deployment reaches `READY`.
4. Verify the homepage, `/iq-game`, `/projects`, `/sitemap.xml`, and `/robots.txt`.
5. Review runtime and build logs before announcing the release.

## Domain launch

The Vercel deployment can be tested on its generated `vercel.app` address. The custom domain `biloogroup.com` should be assigned only after its DNS records and production environment configuration are verified.
