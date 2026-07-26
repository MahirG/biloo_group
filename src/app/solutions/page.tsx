import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology Solutions",
  description:
    "Explore Biloo Group's strategic capabilities in artificial intelligence, cloud platforms, fintech, digital commerce, product innovation, and public-sector technology.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Technology Solutions — Biloo Group",
    description:
      "Long-term technology capabilities designed in Ethiopia for African businesses and institutions.",
    url: "/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Biloo Group technology solutions",
          description: metadata.description,
          url: absoluteUrl("/solutions"),
          hasPart: solutions.map((solution) => ({
            "@type": "WebPage",
            name: solution.name,
            url: absoluteUrl(`/solutions/${solution.slug}`),
          })),
        }}
      />
      <SiteHeader />
      <section className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <p className="eyebrow text-white/50">Technology solutions</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            Focused capabilities for meaningful digital transformation.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            Biloo Group is building a disciplined technology company from
            Ethiopia. These areas describe the problems and capabilities we are
            prepared to explore—not unsupported claims that every product is
            already operating.
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <Reveal delay={index * 0.04} key={solution.slug}>
              <Link
                className="group flex min-h-80 flex-col rounded-[2rem] border border-graphite/10 bg-white p-8 transition hover:-translate-y-1 hover:border-sapphire/30 hover:shadow-xl hover:shadow-graphite/5 sm:p-10"
                href={`/solutions/${solution.slug}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                  {solution.label}
                </p>
                <h2 className="mt-10 text-3xl font-semibold tracking-[-0.03em]">
                  {solution.name}
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted">
                  {solution.summary}
                </p>
                <span className="mt-auto pt-10 text-sm font-semibold text-sapphire">
                  Explore this direction <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-sapphire">Our standard</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Build only what earns the right to exist.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Every Biloo initiative should begin with a meaningful problem,
              identifiable users, a responsible operating model, and evidence
              that technology can improve the outcome.
            </p>
            <p>
              Products will be developed one at a time. Security, accessibility,
              maintainability, regulation, and long-term economics are part of
              product quality—not work postponed until after launch.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
