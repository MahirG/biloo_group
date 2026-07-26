"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/solutions", label: "Solutions" },
  { href: "/iq-game", label: "IQ Game" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 text-white">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link
          aria-label="Biloo Group home"
          className="focus-ring relative z-[60] flex items-center gap-3 rounded-xl"
          href="/"
        >
          <BrandMark className="h-10 w-10" />
          <span className="text-base font-semibold tracking-tight">
            Biloo Group
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={`focus-ring rounded-md text-sm transition hover:text-white ${
                pathname === item.href ? "text-white" : "text-white/70"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="focus-ring hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-ivory lg:inline-flex"
          href="/contact"
        >
          Start a conversation
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="focus-ring relative z-[60] grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-white transition ${
                menuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-white transition ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-6 rounded-full bg-white transition ${
                menuOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-graphite/60 backdrop-blur-sm transition lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        aria-label="Mobile navigation"
        className={`fixed inset-x-4 top-24 z-50 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-graphite p-5 shadow-2xl transition duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        }`}
        id="mobile-navigation"
      >
        <div className="grid gap-2">
          {navItems.map((item, index) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition ${
                item.href === "/iq-game"
                  ? "bg-amber-300 text-amber-950"
                  : pathname === item.href
                    ? "bg-white text-graphite"
                    : "bg-white/5 text-white hover:bg-white/10"
              }`}
              href={item.href}
              key={item.href}
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className="text-sm opacity-60">
                {item.href === "/iq-game" ? "Play ✨" : `0${index + 1}`}
              </span>
            </Link>
          ))}
        </div>
        <Link
          className="mt-4 flex w-full items-center justify-center rounded-full bg-sapphire px-6 py-4 font-semibold text-white"
          href="/contact"
        >
          Start a conversation
        </Link>
      </nav>
    </header>
  );
}
