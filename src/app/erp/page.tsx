import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

const modules = [
  {
    name: "Finance & Accounting",
    summary:
      "General ledger, journals, cash and bank accounts, VAT, assets, accounting periods, receipts, payments, and controlled financial posting.",
    number: "01",
  },
  {
    name: "Sales & Invoicing",
    summary:
      "Quotations, sales orders, invoices, receipts, returns, customer statements, inventory issue, receivables, revenue, VAT, and COGS workflows.",
    number: "02",
  },
  {
    name: "Purchasing & Expenses",
    summary:
      "Supplier workflows, purchasing records, operating expenses, approvals, counterparties, due dates, ownership, and event history.",
    number: "03",
  },
  {
    name: "Inventory & Warehouse",
    summary:
      "Products, stock movement, warehouse operations, inventory controls, availability validation, and operational audit trails.",
    number: "04",
  },
  {
    name: "People & Payroll",
    summary:
      "Human-resource and payroll workspaces designed for organization-scoped records, roles, approvals, and future statutory configuration.",
    number: "05",
  },
  {
    name: "Reports, Security & Governance",
    summary:
      "Financial reporting, CSV export, role-aware workflows, audit events, MFA controls, organization isolation, and accounting-period governance.",
    number: "06",
  },
];

const principles = [
  "Organization-level tenant isolation and Row Level Security",
  "Double-entry financial foundation with auditable posting",
  "English, Amharic, and Tigrinya product language support",
  "Responsive workspaces for desktop and mobile operations",
  "Light and dark appearance modes with reduced-motion support",
  "Safe demonstration mode when production services are not connected",
];

export const metadata: Metadata = {
  title: "Biloo ERP",
  description:
    "Biloo ERP is a connected business operating system for Ethiopian organizations, bringing finance, sales, purchasing, inventory, people, reporting, approvals, and governance into one Biloo-branded workspace.",
  alternates: { canonical: "/erp" },
  openGraph: {
    title: "Biloo ERP — Connected operations for Ethiopian businesses",
    description:
      "A Biloo-branded ERP platform for finance, sales, inventory, purchasing, people, reporting, security, and governance.",
    url: "/erp",
  },
};

export default function ErpPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Biloo ERP",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: metadata.description,
          url: absoluteUrl("/erp"),
          creator: { "@id": `${absoluteUrl()}#organization` },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
            description:
              "Workspace migration, production configuration, and Biloo deployment are in progress.",
          },
        }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-sapphire/35 blur-3xl" />
          <div className="absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full border border-white/10" />
        </div>
        <div className="container-shell relative">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-white/55">Biloo business systems</p>
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
              Migration and validation
            </span>
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Biloo ERP.
            <span className="block text-white/45">
              One operating system for the business.
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            A connected workspace for finance, sales, purchasing, inventory,
            customers, suppliers, people, reporting, approvals, and governance—
            redesigned under the Biloo identity for Ethiopian organizations.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              className="focus-ring inline-flex rounded-full bg-white px-7 py-4 font-semibold text-graphite transition hover:bg-ivory"
              href="/contact"
            >
              Request ERP access
            </Link>
            <a
              className="focus-ring inline-flex rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              href="#modules"
            >
              Explore modules
            </a>
          </div>
        </div>
      </section>

      <nav
        aria-label="Biloo ERP sections"
        className="sticky top-0 z-30 border-b border-graphite/10 bg-ivory/95 backdrop-blur-xl"
      >
        <div className="container-shell flex gap-2 overflow-x-auto py-4 text-sm font-semibold">
          {[
            ["Overview", "#overview"],
            ["Modules", "#modules"],
            ["Platform", "#platform"],
            ["Status", "#status"],
          ].map(([label, href]) => (
            <a
              className="shrink-0 rounded-full px-4 py-2 text-muted transition hover:bg-white hover:text-sapphire"
              href={href}
              key={href}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="py-24 sm:py-32" id="overview">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-sapphire">A Biloo product</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Fresh identity. Preserved operational depth.
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-muted">
            <p>
              Biloo ERP is being migrated from an existing production-oriented
              ERP foundation. The redesign changes the product identity,
              navigation, metadata, and interface system without rewriting the
              accounting engine, tenant-security model, or audit history.
            </p>
            <p>
              The result is not a superficial link to another brand. It is a
              Biloo-owned product experience built around Midnight Graphite,
              Royal Sapphire Blue, Ivory White, the Biloo mark, and a clearer
              hierarchy for everyday business operations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32" id="modules">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-sapphire">ERP modules</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A complete operational navigation, not a collection of disconnected tools.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <article
                className="flex min-h-[22rem] flex-col rounded-[2rem] border border-graphite/10 bg-ivory p-7 sm:p-8"
                key={module.name}
              >
                <p className="font-mono text-sm text-sapphire">{module.number}</p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">
                  {module.name}
                </h3>
                <p className="mt-5 leading-7 text-muted">{module.summary}</p>
                <div className="mt-auto pt-8">
                  <span className="inline-flex rounded-full bg-sapphire/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-sapphire">
                    Biloo ERP workspace
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 text-white sm:py-32" id="platform">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-white/50">Platform foundation</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Built for controlled, auditable operations.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              Production readiness depends on configuration, professional
              review, authentication setup, and verified operational controls—
              not branding alone.
            </p>
          </div>
          <div className="grid gap-3">
            {principles.map((principle, index) => (
              <div
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                key={principle}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sapphire text-xs font-bold">
                  {index + 1}
                </span>
                <p className="leading-7 text-white/75">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="status">
        <div className="container-shell">
          <div className="rounded-[2.5rem] border border-sapphire/15 bg-sapphire/5 p-8 sm:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow text-sapphire">Migration status</p>
              <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.045em]">
                Biloo branding is being applied before production traffic moves.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Authentication callbacks, Supabase site URLs, Google OAuth,
                deployment domains, organization isolation, and write actions
                must be verified before the workspace is presented as a live
                production service.
              </p>
            </div>
            <Link
              className="focus-ring mt-8 inline-flex rounded-full bg-graphite px-7 py-4 font-semibold text-white transition hover:bg-sapphire lg:mt-0"
              href="/contact"
            >
              Discuss Biloo ERP
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
