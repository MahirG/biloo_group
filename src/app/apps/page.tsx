import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ProductAppsGrid } from "@/components/product-app-launcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biloo Apps",
  description:
    "Open Biloo Mezgeb and HisabTech ERP applications and go directly to their secure account dashboards from mobile or desktop devices.",
  alternates: { canonical: "/apps" },
  openGraph: {
    title: "Biloo Apps — Mezgeb and HisabTech access",
    description:
      "A responsive launch directory for Biloo Mezgeb and HisabTech ERP applications and dashboards.",
    url: "/apps",
  },
};

export default function AppsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Biloo applications",
          description: metadata.description,
          url: absoluteUrl("/apps"),
          numberOfItems: 2,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Biloo Mezgeb",
              url: absoluteUrl("/mezgeb"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Biloo ERP and HisabTech",
              url: absoluteUrl("/erp"),
            },
          ],
        }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-12 h-[32rem] w-[32rem] rounded-full bg-sapphire/35 blur-3xl" />
          <div className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        </div>
        <div className="container-shell relative">
          <p className="eyebrow text-white/55">Biloo application access</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Open the right workspace.
            <span className="block text-white/45">
              Mobile-ready. Windows-ready.
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
            Launch Biloo Mezgeb or the existing HisabTech ERP platform, then go
            directly to the corresponding account dashboard. Buttons adapt their
            opening behavior to mobile, installed-app, Windows, and desktop web
            environments.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold text-white/75">
            {[
              "Minimum 48px touch targets",
              "Keyboard focus support",
              "High-contrast button text",
              "System-aware opening behavior",
            ].map((item) => (
              <span
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-sapphire">App navigation</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              App access and dashboard access are separate, clear actions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Use “Open app” for the working product interface. Use “Dashboard”
              for account sign-in, business onboarding, and workspace selection.
            </p>
          </div>
          <ProductAppsGrid />
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-20 sm:py-24">
        <div className="container-shell grid gap-8 lg:grid-cols-3">
          {[
            {
              number: "01",
              title: "Mobile interaction",
              copy: "On touch devices, application buttons open in the current tab to avoid browser-window clutter and preserve an app-like flow.",
            },
            {
              number: "02",
              title: "Windows and desktop",
              copy: "On Windows and other desktop systems, application buttons open in a new tab so the Biloo product directory remains available.",
            },
            {
              number: "03",
              title: "Readable controls",
              copy: "Primary and secondary buttons use explicit foreground and background combinations, visible focus rings, and descriptive action text.",
            },
          ].map((item) => (
            <article
              className="rounded-[2rem] border border-graphite/10 bg-ivory p-7"
              key={item.number}
            >
              <p className="font-mono text-sm font-bold text-sapphire">
                {item.number}
              </p>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
