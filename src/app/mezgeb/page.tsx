import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

const capabilities = [
  {
    number: "01",
    name: "Daily ledger",
    summary:
      "Record sales, expenses, supplier purchases, corrections, cash, bank and mobile-money activity in one structured operating view.",
  },
  {
    number: "02",
    name: "Dube customer credit",
    summary:
      "Track customer balances, repayments, overdue credit and settled accounts without relying on paper notes or memory.",
  },
  {
    number: "03",
    name: "Receipts and VAT",
    summary:
      "Prepare numbered receipts with VAT-aware totals and keep the payment channel connected to the underlying sale.",
  },
  {
    number: "04",
    name: "Reports and performance",
    summary:
      "Review sales, spending, profit direction, category movement and VAT position from the same business record.",
  },
  {
    number: "05",
    name: "Inventory and operations",
    summary:
      "Organize products, operational records and daily workflows in a mobile-first workspace designed for Ethiopian businesses.",
  },
  {
    number: "06",
    name: "Secure business accounts",
    summary:
      "Use Supabase authentication, protected owner workspaces and Row Level Security across the existing Mezgeb data namespace.",
  },
];

const continuity = [
  "Existing Supabase project and mezgeb_* database tables remain unchanged",
  "Existing user accounts, email confirmation and password recovery remain connected",
  "Existing Vercel project remains the production deployment target",
  "Authentication callback routes and environment-variable contracts are preserved",
  "The original MezgebOfficial repository remains available as the migration source snapshot",
  "Biloo Mezgeb is maintained from the Biloo monorepo after cutover",
];

export const metadata: Metadata = {
  title: "Biloo Mezgeb",
  description:
    "Biloo Mezgeb is a mobile-first business ledger for Ethiopian operators, connecting sales, expenses, Dube customer credit, receipts, inventory, reports and secure business accounts.",
  alternates: { canonical: "/mezgeb" },
  openGraph: {
    title: "Biloo Mezgeb — Every birr, clearly recorded",
    description:
      "A Biloo-branded mobile business ledger with Supabase authentication and Ethiopian operating context.",
    url: "/mezgeb",
  },
};

export default function MezgebPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Biloo Mezgeb",
          alternateName: "Biloo Mezgeb መዝገብ",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: metadata.description,
          url: absoluteUrl("/mezgeb"),
          creator: { "@id": `${absoluteUrl()}#organization` },
        }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-16 h-[30rem] w-[30rem] rounded-full bg-sapphire/30 blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full border border-white/10" />
        </div>
        <div className="container-shell relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-white/55">Biloo financial operations</p>
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                Mezgeb · መዝገብ
              </span>
            </div>
            <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Biloo Mezgeb.
              <span className="block text-white/45">
                Every birr, clearly recorded.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
              A mobile-first business ledger for Ethiopian operators—bringing
              sales, expenses, Dube customer credit, receipts, payment channels,
              inventory and reporting into one professional Biloo workspace.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                className="focus-ring inline-flex rounded-full bg-white px-7 py-4 font-semibold text-graphite transition hover:bg-ivory"
                href="/contact"
              >
                Request Mezgeb access
              </Link>
              <a
                className="focus-ring inline-flex rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
                href="#capabilities"
              >
                Explore the platform
              </a>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-white/12 bg-white/7 p-6 backdrop-blur-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">
              Connected foundation
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Auth", "Supabase SSR"],
                ["Data", "RLS-isolated"],
                ["Currency", "ETB-first"],
                ["Interface", "Mobile-first"],
              ].map(([label, value]) => (
                <div
                  className="rounded-2xl border border-white/10 bg-graphite/45 p-5"
                  key={label}
                >
                  <span className="text-xs uppercase tracking-[0.13em] text-white/40">
                    {label}
                  </span>
                  <strong className="mt-2 block text-lg">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Biloo Mezgeb sections"
        className="sticky top-0 z-30 border-b border-graphite/10 bg-ivory/95 backdrop-blur-xl"
      >
        <div className="container-shell flex gap-2 overflow-x-auto py-4 text-sm font-semibold">
          {[
            ["Overview", "#overview"],
            ["Capabilities", "#capabilities"],
            ["Continuity", "#continuity"],
            ["Readiness", "#readiness"],
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
            <p className="eyebrow text-sapphire">Professional daily records</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Built around Ethiopian business reality.
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-muted">
            <p>
              Biloo Mezgeb keeps the familiar product purpose—sales, expenses,
              Dube, receipts and operational clarity—while introducing Biloo’s
              Midnight Graphite, Royal Sapphire Blue and Ivory White identity.
            </p>
            <p>
              The migration preserves the existing Supabase authentication and
              data foundation. It changes product ownership, interface branding,
              navigation and deployment source without renaming database tables
              or breaking existing account relationships.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-y border-graphite/10 bg-white py-24 sm:py-32"
        id="capabilities"
      >
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-sapphire">Platform capabilities</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              One business record from opening time to closing balance.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                className="flex min-h-[21rem] flex-col rounded-[2rem] border border-graphite/10 bg-ivory p-7 sm:p-8"
                key={capability.name}
              >
                <p className="font-mono text-sm text-sapphire">
                  {capability.number}
                </p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">
                  {capability.name}
                </h3>
                <p className="mt-5 leading-7 text-muted">
                  {capability.summary}
                </p>
                <span className="mt-auto pt-8 text-xs font-bold uppercase tracking-[0.12em] text-sapphire">
                  Biloo Mezgeb
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 text-white sm:py-32" id="continuity">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-white/50">Continuity without data migration</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Existing accounts and data stay connected.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              The Biloo migration preserves technical identifiers that existing
              users, authentication sessions and database policies already rely on.
            </p>
          </div>
          <div className="grid gap-3">
            {continuity.map((item, index) => (
              <div
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                key={item}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sapphire text-xs font-bold">
                  {index + 1}
                </span>
                <p className="leading-7 text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="readiness">
        <div className="container-shell">
          <div className="rounded-[2.5rem] border border-sapphire/15 bg-sapphire/5 p-8 sm:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow text-sapphire">Production integrity</p>
              <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.045em]">
                Authentication and business onboarding are live; transaction persistence remains staged.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Supabase authentication, protected dashboards and business
                workspaces are connected. The inherited `/app` transaction screens
                still contain browser-local prototype storage for selected ledger,
                Dube, receipt, inventory and reporting workflows. Those screens
                should use sample data until their existing Mezgeb tables are fully
                connected.
              </p>
            </div>
            <Link
              className="focus-ring mt-8 inline-flex rounded-full bg-graphite px-7 py-4 font-semibold text-white transition hover:bg-sapphire lg:mt-0"
              href="/contact"
            >
              Discuss Biloo Mezgeb
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
