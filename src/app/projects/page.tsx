import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Biloo Group projects, including Qabeza ERP and Mezgeb, with transparent information about their purpose, capabilities, and development status.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Biloo Group Projects",
    description:
      "Qabeza ERP and Mezgeb: technology projects being developed by Biloo Group in Ethiopia.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Biloo Group Projects",
          description: metadata.description,
          url: absoluteUrl("/projects"),
          isPartOf: { "@id": `${absoluteUrl()}#website` },
        }}
      />
      <SiteHeader />
      <section className="bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="container-shell">
          <p className="eyebrow text-white/50">Project portfolio</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            Products shaped by real operating problems.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
            Biloo Group develops focused projects before expanding them into
            mature product lines. Each project below is presented with a clear
            status so ambition is never confused with verified availability.
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              className="flex min-h-[30rem] flex-col rounded-[2rem] border border-graphite/10 bg-white p-8 sm:p-10"
              key={project.slug}
            >
              <div className="flex items-start justify-between gap-6">
                <p className="font-mono text-sm text-sapphire">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <span className="rounded-full bg-sapphire/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sapphire">
                  {project.status}
                </span>
              </div>
              <p className="eyebrow mt-14 text-sapphire">{project.category}</p>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
                {project.name}
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                {project.description}
              </p>
              <div className="mt-auto pt-12">
                <Link
                  className="focus-ring inline-flex rounded-full bg-graphite px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sapphire"
                  href={`/projects/${project.slug}`}
                >
                  View project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-sapphire">Portfolio discipline</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              Status is part of the product story.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            A prototype, a validation-stage product, and a production service
            are different commitments. Biloo Group will update these pages as
            evidence, security, reliability, and operating capability mature.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
