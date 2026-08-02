import type { Metadata } from "next";
import Link from "next/link";

import { BilooSuperApp } from "@/components/biloo-super-app";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "BILOO Super App",
  description:
    "Explore the BILOO multi-service platform for food delivery, taxi booking, supermarkets, construction materials and automotive parts.",
  alternates: { canonical: "/biloo" },
  openGraph: {
    title: "BILOO — One App for Everyday Life",
    description:
      "A mobile-first Ethiopian super app for rides, deliveries, shopping, construction supplies and car parts.",
    url: "/biloo",
  },
};

const platformSurfaces = [
  {
    title: "Customer app",
    copy: "One account for rides, deliveries, shopping, payments, support, saved addresses and order history.",
    marker: "01",
  },
  {
    title: "Driver & delivery app",
    copy: "Job dispatch, navigation, proof of delivery, earnings, availability and safety workflows.",
    marker: "02",
  },
  {
    title: "Vendor workspace",
    copy: "Catalogues, inventory, incoming orders, preparation times, staff access, reports and payouts.",
    marker: "03",
  },
  {
    title: "Operations dashboard",
    copy: "Live map, commissions, pricing zones, approvals, disputes, refunds, fraud controls and analytics.",
    marker: "04",
  },
];

const launchPrinciples = [
  "Android and iPhone from one shared mobile architecture",
  "Service-specific workflows on a common identity and payment platform",
  "Real-time GPS events designed for low-bandwidth mobile networks",
  "Modular rollout by city, service category and vendor type",
];

export default function BilooPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "BILOO",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Android, iOS, Web",
          url: absoluteUrl("/biloo"),
          description:
            "A multi-service platform for taxi booking, food delivery, supermarket shopping, construction materials and car parts.",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/PreOrder",
          },
        }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#10251d] pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-28 top-10 h-[34rem] w-[34rem] rounded-full bg-[#d9ff73]/16 blur-3xl" />
          <div className="absolute -bottom-56 -left-32 h-[34rem] w-[34rem] rounded-full border border-white/10" />
          <div className="hero-noise absolute inset-0 opacity-20" />
        </div>

        <div className="container-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#d9ff73]">BILOO super app</p>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.065em] sm:text-7xl lg:text-[5.6rem] lg:leading-[0.94]">
              One app for the things
              <span className="block text-white/48">life needs every day.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Food, rides, groceries, construction materials and car parts—connected through one trusted account, one checkout and one live tracking experience.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="focus-ring app-action inline-flex min-h-13 items-center justify-center rounded-full bg-[#d9ff73] px-7 font-black text-[#10251d] transition hover:brightness-95 active:scale-[0.98]"
                href="#prototype"
              >
                Open working prototype
              </Link>
              <Link
                className="focus-ring app-action inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 font-bold text-white transition hover:bg-white/12 active:scale-[0.98]"
                href="#platform"
              >
                View platform scope
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["5", "services"],
                ["4", "app surfaces"],
                ["2", "mobile platforms"],
                ["1", "shared account"],
              ].map(([value, label]) => (
                <div className="rounded-2xl border border-white/12 bg-white/7 p-4" key={label}>
                  <strong className="block text-2xl font-semibold text-[#d9ff73]">{value}</strong>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-white/48">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-full bg-[#d9ff73]/10 blur-3xl" />
            <div className="relative rotate-1 rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[2rem] bg-[#f5f7f2] p-4 text-[#10251d]">
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-emerald-800">Good evening</p>
                    <p className="mt-1 font-bold">Where should BILOO help?</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#10251d] text-white">B</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["🍲", "Food", "30 min"],
                    ["🚕", "Taxi", "4 min"],
                    ["🛒", "Market", "Today"],
                    ["🏗️", "Materials", "Bulk"],
                    ["🚗", "Car parts", "Verified"],
                    ["⌖", "Live track", "Active"],
                  ].map(([icon, label, meta]) => (
                    <div className="rounded-2xl bg-white p-4 shadow-sm" key={label}>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-2xl" aria-hidden="true">{icon}</span>
                        <span className="rounded-full bg-[#ecf5e7] px-2 py-1 text-[0.62rem] font-black uppercase tracking-wide text-emerald-800">{meta}</span>
                      </div>
                      <p className="mt-5 font-bold">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#d9ff73] p-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-900">Order BL-2408</p>
                    <p className="mt-1 font-bold">Driver arriving in 6 minutes</p>
                  </div>
                  <span className="text-2xl" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BilooSuperApp />

      <section className="border-y border-black/8 bg-white py-20 sm:py-28" id="platform">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-emerald-800">Complete operating system</p>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                More than a customer-facing app.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              BILOO is structured as a coordinated marketplace: customers place demand, vendors fulfil inventory, drivers move people and goods, and administrators supervise quality, pricing and money movement.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {platformSurfaces.map((surface) => (
              <article className="rounded-[1.75rem] border border-black/8 bg-[#f6f8f3] p-7" key={surface.title}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.035em] text-slate-950">{surface.title}</h3>
                    <p className="mt-4 max-w-xl leading-7 text-slate-600">{surface.copy}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-800">{surface.marker}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe9da] py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow text-amber-900">Launch method</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
              Build the platform once. Release each service responsibly.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              The first technical foundation supports every category, while operational rollout begins with taxi, food and supermarket services before adding bulk construction logistics and vehicle-fitment workflows.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#10251d] p-7 text-white shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9ff73]">Architecture principles</p>
            <ul className="mt-6 space-y-5">
              {launchPrinciples.map((principle, index) => (
                <li className="flex gap-4" key={principle}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black text-[#d9ff73]">{index + 1}</span>
                  <span className="pt-1 leading-7 text-white/75">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
