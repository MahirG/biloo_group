import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

const companyLinks = [
  { href: "/erp", label: "Biloo ERP" },
  { href: "/projects", label: "Projects" },
  { href: "/iq-game", label: "Nature Match" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/10 bg-white">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_1fr_0.7fr]">
        <div>
          <Link
            className="focus-ring inline-flex items-center gap-3 rounded-xl"
            href="/"
          >
            <BrandMark />
            <span className="font-semibold">Biloo Group</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">
            Building technology with African context, global standards, and a
            generational horizon.
          </p>
          <a
            className="mt-5 inline-block text-sm font-semibold text-sapphire"
            href={`mailto:${company.email}`}
          >
            {company.email}
          </a>
        </div>

        <nav aria-label="Products navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Products
          </p>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <Link
                className="font-semibold text-sapphire transition hover:text-graphite"
                href="/erp"
              >
                Biloo ERP
              </Link>
            </li>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  className="transition hover:text-sapphire"
                  href={`/projects/${project.slug}`}
                >
                  {project.name}
                </Link>
              </li>
            ))}
            <li>
              <Link className="transition hover:text-sapphire" href="/iq-game">
                Nature Match
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Solutions navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Solutions
          </p>
          <ul className="mt-5 grid gap-3 text-sm">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  className="transition hover:text-sapphire"
                  href={`/solutions/${solution.slug}`}
                >
                  {solution.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Company
          </p>
          <ul className="mt-5 grid gap-3 text-sm">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  className="transition hover:text-sapphire"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-sm text-muted">
            <p>{company.origin}</p>
            <p className="mt-2">© {new Date().getFullYear()} Biloo Group.</p>
          </div>
        </nav>
      </div>
    </footer>
  );
}
