import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description: "The origin, mission, and operating philosophy of Biloo Group.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-graphite py-28 text-white sm:py-36">
        <div className="container-shell">
          <Link className="text-sm text-white/60 hover:text-white" href="/">
            ← Back to home
          </Link>
          <p className="eyebrow mt-20 text-white/50">About Biloo</p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            A long-term technology company, rooted in legacy.
          </h1>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-sapphire">The name</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">
              Bilo → Biloo
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Biloo is inspired by Bilo, the great-grandfather of founder Mahir
              Aman. The adapted double “oo” creates a distinctive modern
              identity while preserving the family connection.
            </p>
            <p>
              The paired circles represent continuity, partnership, and a
              horizon beyond a single founder or product. The goal is to create
              an institution capable of earning trust across generations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl border border-graphite/10 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sapphire">
              Mission
            </p>
            <p className="mt-6 text-2xl leading-9">{company.mission}</p>
          </article>
          <article className="rounded-3xl border border-graphite/10 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sapphire">
              Vision
            </p>
            <p className="mt-6 text-2xl leading-9">{company.vision}</p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
