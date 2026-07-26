# Biloo Group Search and SEO Operations

This document defines the technical and editorial steps required to make the Biloo Group website discoverable and maintain trustworthy search visibility.

## Production requirements

Before requesting indexing, confirm all of the following:

1. The site is deployed over HTTPS.
2. `NEXT_PUBLIC_SITE_URL` is set to the exact public origin: `https://biloogroup.com`.
3. The domain resolves to the production deployment.
4. Every public route returns a successful response and is usable on mobile devices.
5. The contact email is active and monitored.
6. Claims, project status, leadership information, and contact details remain accurate.

## Generated search endpoints

The Next.js application automatically generates:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/opengraph-image`

The sitemap includes the home, about, projects, solutions, insights, and contact pages plus every project, solution, and insight detail page.

## Google Search Console

1. Create or open a Google Search Console property for `biloogroup.com`.
2. Prefer a Domain property and complete DNS verification at the domain registrar.
3. If using the HTML verification method, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification token and redeploy.
4. Submit `https://biloogroup.com/sitemap.xml` in the Sitemaps report.
5. Use URL Inspection for the homepage and important pages after the first deployment or major update.
6. Review Page indexing, Core Web Vitals, HTTPS, manual actions, and security reports regularly.

## Initial URLs to inspect

- `/`
- `/about`
- `/projects`
- `/projects/qabeza-erp`
- `/projects/mezgeb`
- `/solutions`
- `/solutions/artificial-intelligence`
- `/solutions/digital-commerce`
- `/insights`
- `/contact`

## Content standard

Biloo Group should publish content only when it provides useful original information. Do not create pages merely to repeat keywords or locations. Every indexable page should have:

- a specific user purpose;
- a unique title and description;
- a descriptive heading;
- visible explanatory text;
- internal links from relevant pages;
- accurate company and product-status language;
- a clear review owner and update process.

## Project-status standard

Project pages must distinguish prototypes, validation-stage products, active services, and launched products. Do not imply availability, customers, integrations, regulatory approval, or production readiness unless those facts are verified.

## Ongoing editorial cadence

A sustainable starting cadence is one strong insight per month. Useful topics include:

- software engineering for African operating conditions;
- responsible multilingual AI;
- digital commerce and marketplace operations;
- cloud reliability and security;
- accessible digital public services;
- lessons from validated Biloo prototypes and products.

Never publish invented customers, case studies, awards, performance data, funding, partnerships, or credentials.

## Measurement

Search performance should be evaluated with Google Search Console and privacy-respecting web analytics. Monitor:

- indexed pages;
- impressions and clicks by query and page;
- branded versus non-branded discovery;
- click-through rate;
- crawl and indexing errors;
- Core Web Vitals;
- qualified contact inquiries.

Rankings are an outcome, not the operating objective. The objective is to publish a fast, credible, useful website that accurately represents Biloo Group.
