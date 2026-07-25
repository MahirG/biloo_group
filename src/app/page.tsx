import Link from "next/link";

import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company, strategicDirections } from "@/data/company";

const principles = [
  "Solve meaningful problems before chasing product categories.",
  "Design for trust, accessibility, and real operating conditions.",
  "Build focused products before expanding into a group of companies.",
  "Protect long-term maintainability, security, and institutional memory.",
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      <section className="py-24 sm:py-32" id="vision">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow text-sapphire">Our foundation</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A family name carried into the future.
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-8 text-muted" delay={0.08}>
            <p>
              Biloo takes its name from founder Mahir Aman&apos;s great-grandfather,
              Bilo—an Afaan Oromo-rooted family name now carried forward as a
              commitment to legacy, trust, and responsible ambition.
            </p>
            <p>
              The company is not designed as a collection of fashionable labels.
              It is being built as a disciplined technology group: validate one
              meaningful problem, deliver one dependable product, and expand only
              when the evidence and capabilities justify it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32" id="ecosystem">
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-sapphire">Strategic directions</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A future ecosystem, built one proven product at a time.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              These names describe fields Biloo may explore. They are not claims
              that every business is launched today.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-graphite/10 bg-graphite/10 md:grid-cols-2 lg:grid-cols-3">
            {strategicDirections.map((item, index) => (
              <Reveal
                className="min-h-72 bg-white p-8 transition hover:bg-ivory"
                delay={index * 0.04}
                key={item.name}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                  {item.status}
                </p>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-4 leading-7 text-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-sapphire">How we intend to operate</p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Ambition with discipline.
            </h2>
          </Reveal>
          <div className="divide-y divide-graphite/10 border-y border-graphite/10">
            {principles.map((principle, index) => (
              <Reveal className="flex gap-6 py-6" delay={index * 0.05} key={principle}>
                <span className="font-mono text-sm text-sapphire">0{index + 1}</span>
                <p className="max-w-xl text-lg leading-7">{principle}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sapphire py-24 text-white sm:py-32">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="eyebrow text-white/60">Founder</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              “Build something worthy of the name it carries.”
            </h2>
            <p className="mt-7 text-white/70">
              {company.founder.name} · {company.founder.title}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              className="focus-ring inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sapphire transition hover:-translate-y-0.5"
              href="/contact"
            >
              Connect with Biloo
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
