import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Biloo Group.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="min-h-[78vh] bg-graphite py-28 text-white sm:py-36">
        <div className="container-shell">
          <Link className="text-sm text-white/60 hover:text-white" href="/">
            ← Back to home
          </Link>
          <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="eyebrow text-white/50">Contact</p>
              <h1 className="mt-7 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                Start with a meaningful problem.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                Biloo Group is in its foundation stage. Serious conversations
                about technology, partnerships, and long-term opportunities are
                welcome.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/5 p-8 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.16em] text-white/45">Founder & CEO</p>
              <p className="mt-4 text-2xl font-semibold">{company.founder.name}</p>
              <a
                className="focus-ring mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-graphite"
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
              <p className="mt-8 text-sm leading-6 text-white/45">
                Contact details are provisional until the final Biloo domain and
                corporate registration are confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
