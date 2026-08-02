import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const path = `/projects/${project.slug}`;

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.name} — Biloo Group`,
      description: project.description,
      url: path,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/projects/${project.slug}`);

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: project.name,
            description: project.description,
            applicationCategory: project.category,
            operatingSystem: "Web",
            url: pageUrl,
            author: { "@id": `${absoluteUrl()}#organization` },
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
                name: "Projects",
                item: absoluteUrl("/projects"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: project.name,
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
            <Link className="hover:text-white" href="/projects">
              Projects
            </Link>
            <span className="mx-3" aria-hidden="true">
              /
            </span>
            <span>{project.name}</span>
          </nav>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-white/50">{project.category}</p>
              <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                {project.name}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
                {project.description}
              </p>
              {project.prototypePath ? (
                <Link
                  className="focus-ring mt-8 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sapphire transition hover:-translate-y-0.5"
                  href={project.prototypePath}
                >
                  Open interactive foundation{" "}
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : null}
            </div>
            <span className="h-fit rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
              {project.status}
            </span>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">Purpose</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              The operating problem behind the project.
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-muted">
            <p>{project.purpose}</p>
            <div className="rounded-[2rem] border border-graphite/10 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sapphire">
                Intended audience
              </p>
              <p className="mt-5 text-xl leading-8 text-graphite">
                {project.audience}
              </p>
            </div>
            {project.plannedDomain ? (
              <p className="text-sm">
                Planned project domain: <strong>{project.plannedDomain}</strong>
                . Public availability must be confirmed separately.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-24 sm:py-32">
        <div className="container-shell">
          <p className="eyebrow text-sapphire">Product scope</p>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Capabilities being explored and developed.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-graphite/10 bg-graphite/10 md:grid-cols-2">
            {project.capabilities.map((capability, index) => (
              <article className="bg-white p-8" key={capability}>
                <p className="font-mono text-sm text-sapphire">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-8 text-xl leading-8">{capability}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-sapphire">Readiness safeguards</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              What must remain clear before launch.
            </h2>
          </div>
          <ul className="divide-y divide-graphite/10 border-y border-graphite/10">
            {project.safeguards.map((safeguard) => (
              <li className="py-6 text-lg leading-8" key={safeguard}>
                {safeguard}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sapphire py-20 text-white">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-white/55">Project conversation</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">
              Discuss a relevant problem, workflow, or partnership.
            </h2>
          </div>
          <Link
            className="focus-ring inline-flex w-fit rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sapphire"
            href="/contact"
          >
            Contact Biloo Group
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
