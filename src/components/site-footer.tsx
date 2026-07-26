import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { company } from "@/data/company";
import { productAccess } from "@/data/product-access";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

const companyLinks = [
  { href: "/apps", label: "Apps" },
  { href: "/erp", label: "Biloo ERP" },
  { href: "/mezgeb", label: "Biloo Mezgeb" },
  { href: "/projects", label: "Projects" },
  { href: "/iq-game", label: "Nature Match" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/10 bg-white">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.9fr_1fr_0.7fr]">
        <div>
          <Link
            className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center gap-3 rounded-xl active:scale-[0.98]"
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
            className="focus-ring app-action mt-5 inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 text-sm font-bold text-sapphire transition hover:bg-sapphire/5 hover:text-graphite active:scale-[0.98]"
            href={`mailto:${company.email}`}
          >
            {company.email}
          </a>
        </div>

        <nav aria-label="Apps navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Apps
          </p>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <Link
                className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 font-bold text-sapphire transition hover:bg-sapphire/5 hover:text-graphite active:scale-[0.98]"
                href="/apps"
              >
                View all apps
              </Link>
            </li>
            {productAccess.map((product) => (
              <li className="rounded-xl border border-graphite/10 bg-ivory p-3" key={product.id}>
                <Link
                  className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 font-bold text-graphite transition hover:bg-white hover:text-sapphire active:scale-[0.98]"
                  href={product.productHref}
                >
                  {product.name}
                </Link>
                <a
                  aria-label={`${product.appLabel} (opens in a new tab)`}
                  className="focus-ring app-action mt-1 inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 font-semibold text-sapphire transition hover:bg-white hover:text-graphite active:scale-[0.98]"
                  href={product.appHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {product.appLabel} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Products
          </p>
          <ul className="mt-5 grid gap-3 text-sm">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 transition hover:bg-sapphire/5 hover:text-sapphire active:scale-[0.98]"
                  href={`/projects/${project.slug}`}
                >
                  {project.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 transition hover:bg-sapphire/5 hover:text-sapphire active:scale-[0.98]"
                href="/iq-game"
              >
                Nature Match
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company navigation">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Company
          </p>
          <ul className="mt-5 grid gap-1 text-sm">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-lg px-2 transition hover:bg-sapphire/5 hover:text-sapphire active:scale-[0.98]"
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

      <div className="container-shell border-t border-graphite/10 py-6">
        <p className="text-xs leading-5 text-muted">
          App launch links open the existing production services. Authentication,
          Supabase data, and account ownership remain with each product.
        </p>
      </div>
    </footer>
  );
}
