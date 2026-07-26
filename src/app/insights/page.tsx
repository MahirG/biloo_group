import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { insights } from "@/data/insights";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology Insights",
  description:
    "Biloo Group perspectives on software engineering, responsible AI, digital commerce, cloud platforms, and public-sector technology in African markets.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Technology Insights — Biloo Group",
    description:
      "Practical thinking about building dependable digital products in African markets.",
    url: "/insights",
  },
};

export default function InsightsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Biloo Group technology insights",
          description: metadata.description,
          url: absoluteUrl("/insights"),
          hasPart: insights.map((insight) => ({
            "@type": "Article",
            headline: insight.title,
            url: absoluteUrl(`/insights/${insight.slug}`),
            datePublished: insight.publishedAt,
          })),
        }}
      />
      <SiteHeader />
      <section className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <p className="eyebrow text-white/50">Biloo insights</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            Practical thinking for technology that must work in the real world.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            Research and perspectives on product engineering, artificial
            intelligence, digital services, and the operating conditions that
            shape technology across African markets.
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-6">
          {insights.map((insight, index) => (
            <article
              className="grid gap-8 rounded-[2rem] border border-graphite/10 bg-white p-8 md:grid-cols-[0.35fr_1fr_auto] md:items-center sm:p-10"
              key={insight.slug}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                  {insight.category}
                </p>
                <p className="mt-3 font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")} · {insight.readTime}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  {insight.title}
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-muted">
                  {insight.description}
                </p>
              </div>
              <Link
                className="focus-ring inline-flex w-fit rounded-full border border-graphite/15 px-5 py-3 text-sm font-semibold transition hover:border-sapphire hover:text-sapphire"
                href={`/insights/${insight.slug}`}
              >
                Read insight
              </Link>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
