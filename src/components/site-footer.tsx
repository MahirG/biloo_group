import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { company } from "@/data/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/10 bg-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
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
        </div>
        <div className="text-sm text-muted md:text-right">
          <p>{company.origin}</p>
          <p className="mt-2">© {new Date().getFullYear()} Biloo Group.</p>
        </div>
      </div>
    </footer>
  );
}
