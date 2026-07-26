import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Biloo Group",
  description:
    "Contact Biloo Group in Ethiopia about software products, AI, cloud platforms, digital commerce, fintech, public-sector technology, and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Biloo Group",
    description:
      "Start a conversation about technology products, partnerships, and long-term opportunities.",
    url: "/contact",
  },
};

const conversationAreas = [
  "Software product and platform opportunities",
  "Artificial intelligence and workflow automation",
  "Cloud architecture and application engineering",
  "Digital commerce, marketplaces, and merchant systems",
  "Fintech concepts with appropriate regulated partners",
  "Public-sector digital services and institutional platforms",
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Biloo Group",
          description: metadata.description,
          url: absoluteUrl("/contact"),
        }}
      />
      <SiteHeader />
      <section className="min-h-[72vh] bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <p className="eyebrow text-white/50">Contact Biloo Group</p>
          <div className="mt-7 grid gap-16 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                Start with a meaningful problem.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
                Biloo Group welcomes serious conversations about technology
                products, engineering partnerships, research, and long-term
                opportunities connected to African businesses and institutions.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/5 p-8 backdrop-blur sm:p-10">
              <p className="text-sm uppercase tracking-[0.16em] text-white/45">
                Founder & CEO
              </p>
              <p className="mt-4 text-2xl font-semibold">
                {company.founder.name}
              </p>
              <p className="mt-2 text-white/55">Ethiopia</p>
              <a
                className="focus-ring mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-graphite"
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
              <p className="mt-8 text-sm leading-6 text-white/45">
                A physical office address and telephone number will be published
                only after they are formally confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">Relevant conversations</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Where Biloo is prepared to listen and learn.
            </h2>
          </div>
          <ul className="divide-y divide-graphite/10 border-y border-graphite/10">
            {conversationAreas.map((area, index) => (
              <li className="flex gap-6 py-6" key={area}>
                <span className="font-mono text-sm text-sapphire">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-7">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-20">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-sapphire">Before contacting</p>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.03em]">
              A useful message explains the problem, the people affected, and
              the outcome you want to improve.
            </h2>
          </div>
          <Link
            className="focus-ring inline-flex w-fit rounded-full border border-graphite/15 px-6 py-3.5 text-sm font-semibold"
            href="/solutions"
          >
            Review solutions
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
