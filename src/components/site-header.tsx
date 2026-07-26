"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ProductAppCard } from "@/components/product-app-launcher";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/solutions", label: "Solutions" },
  { href: "/iq-game", label: "IQ Game", descriptor: "Play ✨" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const appsMenuRef = useRef<HTMLDivElement>(null);

  const appsActive =
    pathname === "/apps" ||
    pathname.startsWith("/apps/") ||
    pathname === "/erp" ||
    pathname.startsWith("/erp/") ||
    pathname === "/mezgeb" ||
    pathname.startsWith("/mezgeb/");

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAppsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!appsOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!appsMenuRef.current?.contains(event.target as Node)) {
        setAppsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [appsOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setAppsOpen(false);
  }, [pathname]);

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
          className="hidden items-center gap-3 xl:flex"
        >
          <div className="relative" ref={appsMenuRef}>
            <button
              aria-controls="desktop-app-navigation"
              aria-expanded={appsOpen}
              className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                appsActive || appsOpen
                  ? "bg-white text-graphite"
                  : "bg-sapphire text-white hover:bg-white hover:text-graphite"
              }`}
              onClick={() => setAppsOpen((current) => !current)}
              type="button"
            >
              Apps
              <span
                aria-hidden="true"
                className={`text-xs transition ${appsOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {appsOpen && (
              <div
                className="absolute left-1/2 top-[calc(100%+1rem)] z-50 w-[min(54rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[2rem] border border-graphite/10 bg-ivory p-5 text-graphite shadow-[0_28px_100px_rgba(15,23,42,0.28)]"
                id="desktop-app-navigation"
              >
                <div className="flex items-center justify-between gap-6 px-1 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-sapphire">
                      Biloo applications
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Launch the app or go directly to its account dashboard.
                    </p>
                  </div>
                  <Link
                    className="focus-ring shrink-0 rounded-full border border-graphite/15 bg-white px-4 py-2 text-sm font-bold text-graphite transition hover:border-sapphire hover:text-sapphire"
                    href="/apps"
                  >
                    All app access
                  </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <ProductAppCard
                    compact
                    onNavigate={() => setAppsOpen(false)}
                    productKey="mezgeb"
                  />
                  <ProductAppCard
                    compact
                    onNavigate={() => setAppsOpen(false)}
                    productKey="hisabtech"
                  />
                </div>
              </div>
            )}
          </div>

          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`focus-ring rounded-full px-3 py-2 text-sm transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
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
          className="focus-ring hidden min-h-11 items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-graphite transition hover:bg-ivory xl:inline-flex"
          href="/apps"
        >
          Open apps
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="focus-ring relative z-[60] grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md xl:hidden"
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
        className={`fixed inset-0 z-40 bg-graphite/70 backdrop-blur-sm transition xl:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        aria-label="Mobile navigation"
        className={`fixed inset-x-3 top-22 z-50 max-h-[calc(100svh-6.5rem)] overflow-y-auto rounded-[2rem] border border-white/15 bg-graphite p-4 shadow-2xl transition duration-300 xl:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        }`}
        id="mobile-navigation"
      >
        <div className="px-1 pb-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            Open an app
          </p>
          <p className="mt-1 text-sm text-white/70">
            Touch-friendly access to Mezgeb and HisabTech dashboards.
          </p>
        </div>

        <div className="grid gap-3">
          <ProductAppCard
            compact
            onNavigate={() => setMenuOpen(false)}
            productKey="mezgeb"
          />
          <ProductAppCard
            compact
            onNavigate={() => setMenuOpen(false)}
            productKey="hisabtech"
          />
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="px-1 text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            Explore Biloo
          </p>
          <div className="mt-3 grid gap-2">
            {navItems.map((item, index) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              const isGame = item.href === "/iq-game";

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition ${
                    isGame
                      ? "bg-amber-300 text-amber-950"
                      : active
                        ? "bg-white text-graphite"
                        : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-sm opacity-70">
                    {item.descriptor ?? `0${index + 1}`}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          className="mt-4 flex min-h-14 w-full items-center justify-center rounded-full bg-sapphire px-6 py-4 font-bold text-white transition hover:bg-white hover:text-graphite"
          href="/apps"
          onClick={() => setMenuOpen(false)}
        >
          Open app directory
        </Link>
      </nav>
    </header>
  );
}
