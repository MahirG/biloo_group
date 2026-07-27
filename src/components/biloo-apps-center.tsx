"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductLaunchButtons } from "@/components/product-app-launcher";
import {
  getProductAccess,
  productAccess,
  type ProductAccessId,
} from "@/data/product-access";

const workspaceDetails: Record<
  ProductAccessId,
  {
    eyebrow: string;
    headline: string;
    summary: string;
    capabilities: readonly string[];
    accessNote: string;
    metric: string;
    metricLabel: string;
    accent: string;
  }
> = {
  mezgeb: {
    eyebrow: "Mobile business ledger",
    headline: "The calmest way to understand a busy business day.",
    summary:
      "Capture sales, expenses, Dube, receipts, inventory, and customer balances through a workspace designed around the rhythm of Ethiopian businesses.",
    capabilities: [
      "Sales and expense recording",
      "Dube and customer balances",
      "Receipts and payment channels",
      "Inventory and daily reports",
    ],
    accessNote:
      "The secure Mezgeb session remains connected to its existing Supabase authentication and production data.",
    metric: "Daily",
    metricLabel: "operating rhythm",
    accent: "from-emerald-300/25 via-cyan-300/5 to-transparent",
  },
  hisabtech: {
    eyebrow: "Business operating system",
    headline: "Finance, operations, and control in one decisive workspace.",
    summary:
      "Run accounting, sales, purchasing, inventory, customers, suppliers, people, reconciliation, and reporting without losing operational clarity.",
    capabilities: [
      "Finance and cash flow",
      "Sales, invoicing, and purchasing",
      "Inventory and business relationships",
      "HR, controls, and reporting",
    ],
    accessNote:
      "The secure HisabTech session remains connected to its existing authentication, permissions, and production records.",
    metric: "360°",
    metricLabel: "business visibility",
    accent: "from-blue-300/30 via-indigo-300/10 to-transparent",
  },
};

function ProductMark({ id }: { id: ProductAccessId }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white text-xl font-black text-graphite shadow-[0_18px_45px_rgba(0,0,0,0.25)]"
    >
      {id === "mezgeb" ? "መ" : "H"}
    </span>
  );
}

export function BilooAppsCenter() {
  const [activeId, setActiveId] = useState<ProductAccessId>("mezgeb");
  const product = getProductAccess(activeId);
  const details = workspaceDetails[activeId];

  return (
    <section
      aria-labelledby="biloo-apps-center-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(30,58,138,0.08),transparent_24%),radial-gradient(circle_at_8%_86%,rgba(14,165,233,0.06),transparent_28%)]" />
      <div className="container-shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow text-sapphire">Biloo Apps Center</p>
            <h2
              className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl"
              id="biloo-apps-center-heading"
            >
              One entrance.
              <span className="block text-sapphire">Two operating worlds.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">
            Move between Mezgeb and HisabTech through a shared Biloo experience,
            while each product keeps its own secure authentication, permissions,
            and production data boundaries.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.7rem] border border-graphite/10 bg-graphite p-3 shadow-[0_35px_90px_rgba(15,23,42,0.18)] sm:p-4">
          <div className="grid min-h-[45rem] overflow-hidden rounded-[2.25rem] bg-[#0b1224] lg:grid-cols-[16rem_1fr]">
            <nav
              aria-label="Choose a Biloo application"
              className="flex gap-2 overflow-x-auto border-b border-white/10 bg-white/5 p-3 lg:flex-col lg:border-b-0 lg:border-r lg:p-4"
            >
              <div className="hidden px-3 pb-4 pt-2 lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/38">
                  Product switcher
                </p>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Select the system that fits the work in front of you.
                </p>
              </div>

              {productAccess.map((item) => {
                const selected = item.id === activeId;

                return (
                  <button
                    aria-current={selected ? "page" : undefined}
                    className={`focus-ring app-action group flex min-h-20 min-w-[14rem] touch-manipulation items-center gap-3 rounded-[1.35rem] px-4 py-3 text-left transition active:scale-[0.99] lg:min-w-0 ${
                      selected
                        ? "bg-white text-graphite shadow-[0_16px_45px_rgba(0,0,0,0.22)]"
                        : "border border-white/8 bg-white/5 text-white hover:border-white/18 hover:bg-white/9"
                    }`}
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-black transition ${
                        selected
                          ? "bg-graphite text-white"
                          : "bg-white/10 text-white group-hover:bg-white/15"
                      }`}
                    >
                      {item.id === "mezgeb" ? "መ" : "H"}
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-sm">
                        {item.shortName}
                      </strong>
                      <small
                        className={`mt-1 block text-xs ${
                          selected ? "text-muted" : "text-white/45"
                        }`}
                      >
                        {item.id === "mezgeb"
                          ? "Daily ledger"
                          : "ERP workspace"}
                      </small>
                    </span>
                  </button>
                );
              })}

              <div className="mt-auto hidden rounded-[1.35rem] border border-white/8 bg-white/5 p-4 lg:block">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
                  Production access
                </div>
                <p className="mt-3 text-xs leading-5 text-white/45">
                  Each app opens in its own protected environment.
                </p>
              </div>
            </nav>

            <article aria-live="polite" className="relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${details.accent}`}
              />
              <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full border border-white/10" />
              <div className="absolute right-[-3rem] top-[-3rem] h-52 w-52 rounded-full border border-white/10" />

              <div className="relative grid min-h-full grid-rows-[auto_1fr]">
                <div className="border-b border-white/10 p-6 sm:p-9 lg:p-12">
                  <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-xs font-bold uppercase tracking-[0.17em] text-white/42">
                        {details.eyebrow}
                      </p>
                      <h3 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl">
                        {details.headline}
                      </h3>
                      <p className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                        {details.summary}
                      </p>
                    </div>
                    <ProductMark id={activeId} />
                  </div>

                  <ProductLaunchButtons
                    className="mt-9 max-w-2xl"
                    inverse
                    productId={activeId}
                    stacked
                  />
                </div>

                <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
                  <section className="rounded-[1.8rem] border border-white/9 bg-white/6 p-5 backdrop-blur-xl sm:p-7">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/38">
                          Core workspace
                        </p>
                        <h4 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                          What you can do
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-white/35">
                        04 modules
                      </span>
                    </div>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {details.capabilities.map((capability, index) => (
                        <li
                          className="group flex min-h-24 flex-col justify-between rounded-[1.3rem] border border-white/8 bg-black/10 p-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/8"
                          key={capability}
                        >
                          <span className="font-mono text-xs text-white/28">
                            0{index + 1}
                          </span>
                          <span className="mt-5 leading-6">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="grid gap-4">
                    <aside className="rounded-[1.8rem] bg-white p-6 text-graphite shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-sapphire">
                            Product signal
                          </p>
                          <strong className="mt-4 block text-5xl font-semibold tracking-[-0.06em]">
                            {details.metric}
                          </strong>
                          <span className="mt-2 block text-sm text-muted">
                            {details.metricLabel}
                          </span>
                        </div>
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-graphite text-white">
                          ↗
                        </span>
                      </div>
                    </aside>

                    <aside className="rounded-[1.8rem] border border-white/9 bg-white/6 p-6 backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]"
                        />
                        <p className="text-sm font-bold text-white">
                          Secure production access
                        </p>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/48">
                        {details.accessNote}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {product.platforms.map((platform) => (
                          <span
                            className="rounded-full border border-white/10 bg-white/7 px-3 py-2 text-xs font-semibold text-white/70"
                            key={platform}
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                      <Link
                        className="focus-ring app-action mt-5 inline-flex min-h-12 touch-manipulation items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-graphite transition hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]"
                        href={product.productHref}
                      >
                        View {product.shortName} story
                        <span aria-hidden="true">→</span>
                      </Link>
                    </aside>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-3">
          {[
            "Shared Biloo navigation",
            "Independent secure sessions",
            "Responsive mobile and Windows access",
          ].map((item, index) => (
            <div
              className="flex items-center gap-3 rounded-2xl border border-graphite/8 bg-white/70 px-4 py-3 backdrop-blur-xl"
              key={item}
            >
              <span className="font-mono text-xs text-sapphire">
                0{index + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
