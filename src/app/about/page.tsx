import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Biloo Group",
  description:
    "Learn about Biloo Group, an Ethiopia-rooted technology company founded by Mahir Aman and named in honor of his great-grandfather Bilo.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Biloo Group",
    description:
      "The origin, founder, mission, and long-term operating philosophy of Biloo Group.",
    url: "/about",
  },
};

const commitments = [
  {
    title: "Problem before product",
    description:
      "Begin with a meaningful user or institutional problem, then decide whether software is the right intervention.",
  },
  {
    title: "Evidence before expansion",
    description:
      "Prove value and operating capability before turning a direction into a product line or separate company.",
  },
  {
    title: "Trust before scale",
    description:
      "Security, accessibility, privacy, compliance, and honest communication are foundations—not repairs after growth.",
  },
  {
    title: "Institutions beyond individuals",
    description:
      "Document decisions, develop people, and build systems that can remain dependable beyond a single founder or team.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Biloo Group",
          description: metadata.description,
          url: absoluteUrl("/about"),
          mainEntity: { "@id": `${absoluteUrl()}#organization` },
        }}
      />
      <SiteHeader />
      <section className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <p className="eyebrow text-white/50">About Biloo Group</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            A long-term technology company, rooted in family legacy.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            Biloo Group is being built in Ethiopia to develop dependable digital
            products with African context, global engineering standards, and a
            generational horizon.
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">The name</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Bilo → Biloo
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Biloo is inspired by Bilo, the great-grandfather of founder Mahir
              Aman. Bilo is an Afaan Oromo-rooted family name. The adapted
              double “oo” gives the company a distinctive modern identity while
              preserving the personal and cultural connection.
            </p>
            <p>
              The paired circles in the Biloo identity represent continuity,
              partnership, and a horizon beyond one founder or one product. The
              name is a reminder that a company should be judged by the trust it
              earns and the institution it leaves behind.
            </p>
            <p>
              Biloo Group is therefore not designed as a collection of
              fashionable technology labels. Each product direction must be
              supported by a real problem, user evidence, responsible
              architecture, and an operating model capable of maintaining the
              service over time.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-[2rem] border border-graphite/10 p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sapphire">
              Mission
            </p>
            <p className="mt-6 text-2xl leading-9">{company.mission}</p>
          </article>
          <article className="rounded-[2rem] border border-graphite/10 p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sapphire">
              Vision
            </p>
            <p className="mt-6 text-2xl leading-9">{company.vision}</p>
          </article>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">Founder</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Mahir Aman
            </h2>
            <p className="mt-4 text-lg font-medium text-sapphire">
              Founder & CEO
            </p>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Mahir Aman is building Biloo Group as a long-term technology
              company rather than a personal portfolio. His stated areas of
              interest include software products, artificial intelligence, cloud
              platforms, digital commerce, marketplaces, financial technology,
              and public-sector digital systems.
            </p>
            <p>
              The founder profile on this website intentionally avoids invented
              credentials, customers, funding, awards, or product traction.
              Biloo Group intends to earn those facts through work and report
              them only when they can be verified.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell">
          <p className="eyebrow text-sapphire">Operating commitments</p>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            The standards intended to guide Biloo&apos;s growth.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {commitments.map((commitment, index) => (
              <article
                className="rounded-[2rem] border border-graphite/10 p-8"
                key={commitment.title}
              >
                <p className="font-mono text-sm text-sapphire">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-2xl font-semibold">
                  {commitment.title}
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  {commitment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sapphire py-20 text-white">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-white/55">Explore Biloo</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">
              See the technology directions behind the vision.
            </h2>
          </div>
          <Link
            className="focus-ring inline-flex w-fit rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sapphire"
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
