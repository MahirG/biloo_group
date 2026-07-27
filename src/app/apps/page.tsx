import type { Metadata } from "next";

import { BilooAppsCenter } from "@/components/biloo-apps-center";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { productAccess } from "@/data/product-access";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biloo Apps Center",
  description:
    "Access Biloo Mezgeb and HisabTech ERP from one professional, mobile-friendly Biloo workspace.",
  alternates: { canonical: "/apps" },
  openGraph: {
    title: "Biloo Apps Center — Mezgeb and HisabTech",
    description:
      "One clear Biloo space for secure Mezgeb and HisabTech app and dashboard access on mobile and Windows.",
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
          name: "Biloo Apps Center",
          url: absoluteUrl("/apps"),
          itemListElement: productAccess.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: absoluteUrl(product.productHref),
          })),
        }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-graphite pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-8 h-[28rem] w-[28rem] rounded-full bg-sapphire/35 blur-3xl" />
          <div className="absolute bottom-[-14rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/10" />
        </div>
        <div className="container-shell relative">
          <p className="eyebrow text-white/65">Biloo digital workspace</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Two business apps.
            <span className="block text-white/50">One professional space.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
            Move between Mezgeb and HisabTech from a single Biloo Apps Center while each product keeps its own secure authentication, permissions, and production data.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 text-sm font-semibold">
            {[
              "Mobile and Windows",
              "Touch and keyboard ready",
              "High-contrast controls",
              "Separate secure sessions",
            ].map((item) => (
              <span
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <BilooAppsCenter />

      <section className="border-y border-graphite/10 bg-white py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-sapphire">Protected by design</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Shared navigation without weakening either app.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Biloo space",
                "A single professional place to choose an app, understand its role, and open the correct workspace.",
              ],
              [
                "Mobile and Windows",
                "Responsive controls support touch, keyboard focus, safe scrolling, and clear desktop interaction.",
              ],
              [
                "Authentication",
                "Each app continues to use its existing sign-in flow, session handling, callbacks, and account records.",
              ],
              [
                "Data continuity",
                "Mezgeb and HisabTech retain their current production services, permissions, and data boundaries.",
              ],
            ].map(([title, copy]) => (
              <article
                className="rounded-2xl border border-graphite/10 bg-ivory p-6"
                key={title}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
