import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSolution, solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {};
  }

  const path = `/solutions/${solution.slug}`;

  return {
    title: solution.title,
    description: solution.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${solution.name} — Biloo Group`,
      description: solution.metaDescription,
      type: "website",
      url: path,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/solutions/${solution.slug}`);

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: solution.name,
            serviceType: solution.label,
            description: solution.metaDescription,
            provider: {
              "@type": "Organization",
              name: "Biloo Group",
              url: absoluteUrl(),
            },
            areaServed: "Africa",
            url: pageUrl,
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
                name: "Solutions",
                item: absoluteUrl("/solutions"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: solution.name,
                item: pageUrl,
              },
            ],
          },
        ]}
      />
      <SiteHeader />
      <section className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="text-sm text-white/55">
            <Link className="hover:text-white" href="/solutions">
              Solutions
            </Link>
            <span className="mx-3" aria-hidden="true">
              /
            </span>
            <span>{solution.name}</span>
          </nav>
          <p className="eyebrow mt-16 text-white/50">{solution.label}</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            {solution.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            {solution.summary}
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">Overview</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              What {solution.name} is designed to explore.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            {solution.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-sapphire">Capabilities</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Areas of potential work.
            </h2>
            <ul className="mt-10 divide-y divide-graphite/10 border-y border-graphite/10">
              {solution.capabilities.map((capability, index) => (
                <li className="flex gap-5 py-5" key={capability}>
                  <span className="font-mono text-sm text-sapphire">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-graphite p-8 text-white sm:p-10">
            <p className="eyebrow text-white/50">Intended outcomes</p>
            <ul className="mt-10 space-y-6">
              {solution.outcomes.map((outcome) => (
                <li className="flex gap-4 text-lg leading-7" key={outcome}>
                  <span className="text-white/40" aria-hidden="true">
                    ○
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell max-w-5xl">
          <p className="eyebrow text-sapphire">Questions</p>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
            Clear answers about this direction.
          </h2>
          <div className="mt-12 divide-y divide-graphite/10 border-y border-graphite/10">
            {solution.questions.map((item) => (
              <article
                className="grid gap-4 py-8 md:grid-cols-[0.8fr_1.2fr]"
                key={item.question}
              >
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p className="leading-7 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sapphire py-20 text-white">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-white/55">Work with Biloo</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">
              Begin with the problem, the users, and the outcome.
            </h2>
          </div>
          <Link
            className="focus-ring inline-flex w-fit rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sapphire"
            href="/contact"
          >
            Start a conversation
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
