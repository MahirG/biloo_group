import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { href: "/#vision", label: "Vision" },
  { href: "/#ecosystem", label: "Ecosystem" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 text-white">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link
          className="focus-ring flex items-center gap-3 rounded-xl"
          href="/"
        >
          <BrandMark className="h-10 w-10" />
          <span className="text-base font-semibold tracking-tight">
            Biloo Group
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-md text-sm text-white/70 transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="focus-ring rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-ivory"
          href="/contact"
        >
          Start a conversation
        </Link>
      </div>
    </header>
  );
}
