"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ProductAppsMenu } from "@/components/product-app-launcher";
import { ProductQuickLaunch } from "@/components/product-quick-launch";

const navItems = [
  { href: "/biloo", label: "BILOO", descriptor: "New" },
  { href: "/projects", label: "Projects" },
  { href: "/solutions", label: "Solutions" },
  { href: "/iq-game", label: "Nature Match", descriptor: "Play ✨" },
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

  const quickLaunchProduct = pathname.startsWith("/mezgeb")
    ? "mezgeb"
    : pathname.startsWith("/erp")
      ? "hisabtech"
      : null;

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/15 bg-graphite/35 text-white backdrop-blur-md">
        <div className="container-shell flex h-20 items-center justify-between gap-4">
          <Link
            aria-label="Biloo Group home"
            className="focus-ring app-action relative z-[60] flex min-h-11 touch-manipulation items-center gap-3 rounded-xl active:scale-[0.98]"
            href="/"
          >
            <BrandMark className="h-10 w-10" />
            <span className="text-base font-semibold tracking-tight">
              Biloo Group
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-3 xl:flex"
          >
            <ProductAppsMenu />
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring app-action inline-flex min-h-11 touch-manipulation items-center rounded-full px-3 py-2 text-sm font-semibold transition active:scale-[0.98] ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            className="focus-ring app-action hidden min-h-11 touch-manipulation items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-graphite shadow-sm transition hover:bg-ivory active:scale-[0.98] xl:inline-flex"
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
            className="focus-ring app-action relative z-[60] grid h-12 w-12 touch-manipulation place-items-center rounded-full border border-white/35 bg-white/15 backdrop-blur-md active:scale-95 xl:hidden"
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
          className={`fixed inset-0 z-40 bg-graphite/75 backdrop-blur-sm transition xl:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <nav
          aria-label="Mobile navigation"
          className={`fixed inset-x-3 top-23 z-50 max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain rounded-[2rem] border border-white/15 bg-graphite p-4 shadow-2xl transition duration-300 xl:hidden ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-5 opacity-0"
          }`}
          id="mobile-navigation"
        >
          <ProductAppsMenu
            onNavigate={() => setMenuOpen(false)}
            variant="mobile"
          />

          <div className="mt-4 grid gap-2">
            {navItems.map((item, index) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              const isGame = item.href === "/iq-game";

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring app-action flex min-h-14 touch-manipulation items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition active:scale-[0.99] ${
                    isGame
                      ? "bg-amber-300 text-amber-950"
                      : active
                        ? "bg-white text-graphite"
                        : "border border-white/10 bg-white/7 text-white hover:bg-white/12"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-sm opacity-75">
                    {item.descriptor ?? `0${index + 1}`}
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            className="focus-ring app-action mt-4 flex min-h-14 w-full touch-manipulation items-center justify-center rounded-full bg-white px-6 py-4 font-bold text-graphite shadow-sm active:scale-[0.99]"
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Start a conversation
          </Link>
        </nav>
      </header>

      {!menuOpen && quickLaunchProduct ? (
        <ProductQuickLaunch productId={quickLaunchProduct} />
      ) : null}
    </>
  );
}
