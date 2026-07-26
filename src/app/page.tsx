import Link from "next/link";

import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

const principles = [
  "Solve meaningful problems before chasing product categories.",
  "Design for trust, accessibility, and real operating conditions.",
  "Build focused products before expanding into a group of companies.",
  "Protect long-term maintainability, security, and institutional memory.",
];

const audiences = [
  {
    title: "Growing businesses",
    description:
      "Digital operations, commerce systems, workflow automation, and dependable software for organizations moving beyond fragmented manual work.",
  },
  {
    title: "Technology teams",
    description:
      "Product engineering, cloud architecture, AI integration, and delivery practices for teams building and operating serious digital services.",
  },
  {
    title: "Public institutions",
    description:
      "Accessible portals, case-management systems, data platforms, and resilient public-service technology designed for institutional ownership.",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      <section className="py-24 sm:py-32" id="vision">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow text-sapphire">
              Technology company in Ethiopia
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              African context. Global engineering standards.
            </h2>
          </Reveal>
          <Reveal
            className="space-y-6 text-lg leading-8 text-muted"
            delay={0.08}
          >
            <p>
              Biloo Group is an Ethiopia-rooted technology company founded by
              Mahir Aman. The company is being built to create dependable
              digital products for businesses, technology teams, and
              institutions across African markets.
            </p>
            <p>
              Our long-term fields include artificial intelligence, cloud
              platforms, digital payments, marketplaces and digital commerce,
              software product innovation, and public-sector technology. We
              begin with real problems and expand only when evidence,
              capability, and responsible operations support the next step.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-sapphire">Who we intend to serve</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Technology connected to operational reality.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Biloo focuses on organizations that need more than a visual
              redesign: they need systems that are secure, maintainable,
              understandable, and capable of improving measurable work.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audiences.map((audience, index) => (
              <Reveal
                className="rounded-[2rem] border border-graphite/10 p-8"
                delay={index * 0.05}
                key={audience.title}
              >
                <p className="font-mono text-sm text-sapphire">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                  {audience.title}
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  {audience.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="projects">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow text-sapphire">Active projects</p>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Focused products before a broad ecosystem.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                Qabeza ERP and Mezgeb represent current Biloo product work. Their
                pages explain the intended users, capabilities, and readiness
                limits without presenting unfinished work as launched services.
              </p>
            </div>
            <Link
              className="focus-ring inline-flex w-fit rounded-full border border-graphite/15 px-6 py-3.5 text-sm font-semibold transition hover:border-sapphire hover:text-sapphire"
              href="/projects"
            >
              View all projects
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal delay={index * 0.06} key={project.slug}>
                <Link
                  className="group flex min-h-96 flex-col rounded-[2rem] border border-graphite/10 bg-white p-8 transition hover:border-sapphire/40 hover:bg-ivory sm:p-10"
                  href={`/projects/${project.slug}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                      {project.category}
                    </p>
                    <span className="text-right text-xs font-semibold text-muted">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-14 text-4xl font-semibold tracking-[-0.04em]">
                    {project.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                    {project.description}
                  </p>
                  <span className="mt-auto pt-10 text-sm font-semibold text-sapphire">
                    Explore project <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-graphite/10 bg-white py-24 sm:py-32"
        id="ecosystem"
      >
        <div className="container-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-sapphire">Strategic capabilities</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              A future ecosystem, built one proven product at a time.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              These areas describe problems Biloo Group is prepared to research
              and capabilities it intends to develop. They are not claims that
              every business is already launched.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-graphite/10 bg-graphite/10 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal delay={index * 0.04} key={solution.slug}>
                <Link
                  className="group flex min-h-80 flex-col bg-white p-8 transition hover:bg-ivory"
                  href={`/solutions/${solution.slug}`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                    {solution.label}
                  </p>
                  <h3 className="mt-12 text-2xl font-semibold tracking-tight">
                    {solution.name}
                  </h3>
                  <p className="mt-4 leading-7 text-muted">
                    {solution.summary}
                  </p>
                  <span className="mt-auto pt-8 text-sm font-semibold text-sapphire">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link
            className="focus-ring mt-10 inline-flex rounded-full border border-graphite/15 px-6 py-3.5 text-sm font-semibold transition hover:border-sapphire hover:text-sapphire"
            href="/solutions"
          >
            View all technology solutions
          </Link>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-sapphire">How we intend to operate</p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Ambition with discipline.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Biloo Group is designed for a long horizon. The standard is not
              how quickly a product name can be announced, but whether the
              company can build, operate, secure, and improve something people
              can trust.
            </p>
          </Reveal>
          <div className="divide-y divide-graphite/10 border-y border-graphite/10">
            {principles.map((principle, index) => (
              <Reveal
                className="flex gap-6 py-6"
                delay={index * 0.05}
                key={principle}
              >
                <span className="font-mono text-sm text-sapphire">
                  0{index + 1}
                </span>
                <p className="max-w-xl text-lg leading-7">{principle}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow text-sapphire">Technology insights</p>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Useful thinking before fashionable answers.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                Biloo publishes practical perspectives on software, AI, digital
                services, and the conditions that determine whether technology
                works in the real world.
              </p>
            </div>
            <Link
              className="focus-ring inline-flex w-fit rounded-full border border-graphite/15 px-6 py-3.5 text-sm font-semibold"
              href="/insights"
            >
              View all insights
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {insights.map((insight) => (
              <article
                className="flex min-h-80 flex-col rounded-[2rem] border border-graphite/10 bg-white p-8"
                key={insight.slug}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sapphire">
                  {insight.category}
                </p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.025em]">
                  {insight.title}
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  {insight.description}
                </p>
                <Link
                  className="mt-auto pt-8 text-sm font-semibold text-sapphire"
                  href={`/insights/${insight.slug}`}
                >
                  Read insight <span aria-hidden="true">→</span>
                </Link>
              </article>
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
