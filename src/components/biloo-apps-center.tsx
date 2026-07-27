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
  }
> = {
  mezgeb: {
    eyebrow: "Mobile business ledger",
    headline: "Record the day. Understand every birr.",
    summary:
      "Use Mezgeb for sales, expenses, Dube, receipts, inventory, customer balances, and practical daily reporting.",
    capabilities: [
      "Sales and expense recording",
      "Dube and customer balances",
      "Receipts and payment channels",
      "Inventory and daily reports",
    ],
    accessNote:
      "The secure Mezgeb session remains connected to its existing Supabase authentication and production data.",
  },
  hisabtech: {
    eyebrow: "Business operating system",
    headline: "Run finance and operations from one workspace.",
    summary:
      "Use HisabTech for accounting, sales, purchasing, inventory, customers, suppliers, people, reconciliation, and management reporting.",
    capabilities: [
      "Finance and cash flow",
      "Sales, invoicing, and purchasing",
      "Inventory and business relationships",
      "HR, controls, and reporting",
    ],
    accessNote:
      "The secure HisabTech session remains connected to its existing authentication, permissions, and production records.",
  },
};

function ProductMark({ id }: { id: ProductAccessId }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-graphite text-lg font-bold text-white shadow-sm"
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
    <section aria-labelledby="biloo-apps-center-heading" className="py-16 sm:py-24">
      <div className="container-shell">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <p className="eyebrow text-sapphire">Biloo Apps Center</p>
          <h2
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl"
            id="biloo-apps-center-heading"
          >
            One Biloo space. Two focused business systems.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choose the product you need, review its role, and open the secure app or dashboard without mixing accounts, permissions, or production data.
          </p>
        </div>

        <div className="rounded-[2rem] border border-graphite/10 bg-white p-3 shadow-sm sm:rounded-[2.5rem] sm:p-5 lg:grid lg:grid-cols-[18rem_1fr] lg:gap-5">
          <nav
            aria-label="Choose a Biloo application"
            className="flex gap-2 overflow-x-auto rounded-[1.5rem] bg-ivory p-2 lg:flex-col lg:overflow-visible lg:p-3"
          >
            {productAccess.map((item) => {
              const selected = item.id === activeId;

              return (
                <button
                  aria-current={selected ? "page" : undefined}
                  className={`focus-ring app-action flex min-h-14 min-w-[12rem] touch-manipulation items-center gap-3 rounded-2xl px-4 py-3 text-left transition active:scale-[0.99] lg:min-w-0 ${
                    selected
                      ? "bg-graphite text-white shadow-md"
                      : "bg-white text-graphite hover:bg-sapphire/5 hover:text-sapphire"
                  }`}
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                      selected
                        ? "bg-white text-graphite"
                        : "bg-graphite text-white"
                    }`}
                  >
                    {item.id === "mezgeb" ? "መ" : "H"}
                  </span>
                  <span>
                    <strong className="block text-sm">{item.shortName}</strong>
                    <small
                      className={`mt-0.5 block text-xs ${
                        selected ? "text-white/65" : "text-muted"
                      }`}
                    >
                      {item.id === "mezgeb" ? "Daily ledger" : "ERP workspace"}
                    </small>
                  </span>
                </button>
              );
            })}
          </nav>

          <article
            aria-live="polite"
            className="mt-3 overflow-hidden rounded-[1.65rem] border border-graphite/10 bg-ivory lg:mt-0"
          >
            <div className="border-b border-graphite/10 bg-graphite p-6 text-white sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    {details.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {details.headline}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                    {details.summary}
                  </p>
                </div>
                <ProductMark id={activeId} />
              </div>

              <ProductLaunchButtons
                className="mt-8"
                inverse
                productId={activeId}
                stacked
              />
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-sapphire">
                  Core workspace
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {details.capabilities.map((capability) => (
                    <li
                      className="flex min-h-14 items-center gap-3 rounded-2xl border border-graphite/10 bg-white px-4 py-3 text-sm font-semibold text-graphite"
                      key={capability}
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sapphire/10 text-sapphire"
                      >
                        ✓
                      </span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-2xl border border-graphite/10 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-emerald-600"
                  />
                  <p className="text-sm font-bold text-graphite">
                    Secure production access
                  </p>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {details.accessNote}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.platforms.map((platform) => (
                    <span
                      className="rounded-full bg-ivory px-3 py-2 text-xs font-semibold text-graphite"
                      key={platform}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <Link
                  className="focus-ring app-action mt-5 inline-flex min-h-12 touch-manipulation items-center gap-2 rounded-xl px-3 text-sm font-bold text-sapphire transition hover:bg-sapphire/5 hover:text-graphite active:scale-[0.98]"
                  href={product.productHref}
                >
                  View {product.shortName} overview
                  <span aria-hidden="true">→</span>
                </Link>
              </aside>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-muted">
          Biloo provides the shared access space. Each application opens in its own protected web context so its authentication, security headers, permissions, and data boundaries remain intact.
        </p>
      </div>
    </section>
  );
}
