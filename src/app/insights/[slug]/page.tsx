import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getInsight, insights } from "@/data/insights";
import { absoluteUrl } from "@/lib/site";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    return {};
  }

  const path = `/insights/${insight.slug}`;

  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: path },
    authors: [{ name: "Biloo Group" }],
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.description,
      url: path,
      publishedTime: insight.publishedAt,
      authors: ["Biloo Group"],
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/insights/${insight.slug}`);

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: insight.title,
            description: insight.description,
            datePublished: insight.publishedAt,
            dateModified: insight.publishedAt,
            author: {
              "@type": "Organization",
              name: "Biloo Group",
              url: absoluteUrl(),
            },
            publisher: {
              "@type": "Organization",
              name: "Biloo Group",
              url: absoluteUrl(),
            },
            mainEntityOfPage: pageUrl,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl(),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Insights",
                item: absoluteUrl("/insights"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: insight.title,
                item: pageUrl,
              },
            ],
          },
        ]}
      />
      <SiteHeader />
      <article>
        <header className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
          <div className="container-shell max-w-5xl">
            <nav aria-label="Breadcrumb" className="text-sm text-white/55">
              <Link className="hover:text-white" href="/insights">
                Insights
              </Link>
              <span className="mx-3" aria-hidden="true">
                /
              </span>
              <span>{insight.category}</span>
            </nav>
            <p className="eyebrow mt-16 text-white/50">{insight.category}</p>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
              {insight.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
              {insight.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-sm text-white/50">
              <time dateTime={insight.publishedAt}>July 26, 2026</time>
              <span aria-hidden="true">·</span>
              <span>{insight.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>Biloo Group</span>
            </div>
          </div>
        </header>

        <div className="container-shell grid gap-16 py-24 lg:grid-cols-[0.3fr_1fr] sm:py-32">
          <aside>
            <p className="eyebrow text-sapphire">Perspective</p>
            <p className="mt-6 leading-7 text-muted">
              Biloo Group publishes practical, evidence-oriented thinking about
              technology products and institutions in African markets.
            </p>
          </aside>
          <div className="max-w-3xl">
            <p className="text-2xl leading-10 tracking-[-0.015em]">
              {insight.introduction}
            </p>
            <div className="mt-16 space-y-16">
              {insight.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-6 text-lg leading-8 text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.points ? (
                    <ul className="mt-8 space-y-3 border-l-2 border-sapphire/30 pl-6 text-lg leading-8">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="border-y border-graphite/10 bg-white py-20">
        <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-sapphire">Continue exploring</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">
              See Biloo Group's technology directions.
            </h2>
          </div>
          <Link
            className="focus-ring inline-flex w-fit rounded-full bg-sapphire px-6 py-3.5 text-sm font-semibold text-white"
            href="/solutions"
          >
            Explore solutions
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
