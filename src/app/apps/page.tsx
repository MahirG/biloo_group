import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { ProductLaunchButtons } from "@/components/product-app-launcher";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { productAccess } from "@/data/product-access";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biloo Apps",
  description:
    "Open Biloo Mezgeb and HisabTech ERP from one professional, mobile-friendly Biloo apps launcher.",
  alternates: { canonical: "/apps" },
  openGraph: {
    title: "Biloo Apps — Open Mezgeb and HisabTech",
    description:
      "A clear launch point for Biloo business applications and their secure dashboards on mobile and Windows.",
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
          name: "Biloo Apps",
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

      <section className="relative overflow-hidden bg-graphite pb-24 pt-36 text-white sm:pb-32 sm:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-8 h-[28rem] w-[28rem] rounded-full bg-sapphire/35 blur-3xl" />
          <div className="absolute bottom-[-14rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/10" />
        </div>
        <div className="container-shell relative">
          <p className="eyebrow text-white/65">Biloo product access</p>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Your apps.
            <span className="block text-white/50">
              One clear place to open them.
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
            Launch Mezgeb or HisabTech, open the correct dashboard, and continue
            with the existing account, authentication, and production data.
            Every control is designed for touch, keyboard, mobile browsers, and
            Windows desktops.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 text-sm font-semibold">
            {["48px touch targets", "Keyboard accessible", "High contrast", "Secure external launch"].map(
              (item) => (
                <span
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white"
                  key={item}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <div className="grid gap-7 lg:grid-cols-2">
            {productAccess.map((product) => (
              <article
                className="flex flex-col rounded-[2.25rem] border border-graphite/10 bg-white p-7 shadow-sm sm:p-10"
                key={product.id}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-sapphire">
                      Biloo application
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                      {product.name}
                    </h2>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-graphite text-xl font-bold text-white"
                  >
                    {product.id === "mezgeb" ? "መ" : "H"}
                  </span>
                </div>

                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                  {product.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {product.platforms.map((platform) => (
                    <span
                      className="rounded-full bg-ivory px-4 py-2 text-sm font-semibold text-graphite"
                      key={platform}
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                <ProductLaunchButtons
                  className="mt-8"
                  productId={product.id}
                  stacked
                />

                <div className="mt-auto pt-8">
                  <Link
                    className="focus-ring app-action inline-flex min-h-12 touch-manipulation items-center gap-2 rounded-xl px-3 text-sm font-bold text-sapphire transition hover:bg-sapphire/5 hover:text-graphite active:scale-[0.98]"
                    href={product.productHref}
                  >
                    Read the product overview
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-graphite/10 bg-white py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-sapphire">How launching works</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Native-feeling controls without breaking the web.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Mobile", "Large touch targets, pressed feedback, safe scrolling, and links that can open an installed web app when the operating system supports it."],
              ["Windows", "Keyboard focus, clear hover states, readable labels, and secure new-tab launches for desktop workflows."],
              ["Authentication", "The buttons use the products’ existing sign-in routes. No account, callback, or Supabase identifier is changed."],
              ["Data continuity", "Mezgeb and HisabTech continue to use their current production services and data connections."],
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
