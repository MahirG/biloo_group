"use client";

import Link from "next/link";

import {
  getProductAccess,
  productAccess,
  type ProductAccess,
  type ProductAccessId,
} from "@/data/product-access";

function ExternalArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 16 16 8m0 0H9m7 0v7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ProductLaunchButtons({
  productId,
  inverse = false,
  stacked = false,
  className = "",
}: {
  productId: ProductAccessId;
  inverse?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  const product = getProductAccess(productId);
  const layout = stacked
    ? "grid w-full gap-3 sm:grid-cols-2"
    : "flex flex-wrap gap-3";
  const primary = inverse
    ? "bg-white text-graphite hover:bg-ivory"
    : "bg-sapphire text-white hover:bg-graphite";
  const secondary = inverse
    ? "border border-white/35 bg-white/5 text-white hover:bg-white hover:text-graphite"
    : "border border-graphite/15 bg-white text-graphite hover:border-sapphire hover:text-sapphire";

  return (
    <div className={`${layout} ${className}`.trim()}>
      <a
        aria-label={`${product.appLabel} (opens in a new tab)`}
        className={`focus-ring app-action inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-bold shadow-sm transition active:scale-[0.98] ${primary}`}
        href={product.appHref}
        rel="noreferrer"
        target="_blank"
      >
        <span>{product.appLabel}</span>
        <ExternalArrow />
      </a>
      <a
        aria-label={`${product.dashboardLabel} (opens in a new tab)`}
        className={`focus-ring app-action inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-bold transition active:scale-[0.98] ${secondary}`}
        href={product.dashboardHref}
        rel="noreferrer"
        target="_blank"
      >
        <span>{product.dashboardLabel}</span>
        <ExternalArrow />
      </a>
    </div>
  );
}

function ProductCard({
  product,
  compact = false,
  onNavigate,
}: {
  product: ProductAccess;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <article
      className={`rounded-2xl border border-graphite/10 bg-white text-graphite shadow-sm ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sapphire">
            Biloo app
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            {product.name}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-graphite text-sm font-bold text-white"
        >
          {product.id === "mezgeb" ? "መ" : "H"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {product.platforms.map((platform) => (
          <span
            className="rounded-full bg-ivory px-3 py-1.5 text-xs font-semibold text-graphite"
            key={platform}
          >
            {platform}
          </span>
        ))}
      </div>
      <ProductLaunchButtons
        className="mt-5"
        productId={product.id}
        stacked
      />
      <Link
        className="focus-ring mt-4 inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-lg px-2 text-sm font-bold text-sapphire transition hover:bg-sapphire/5 hover:text-graphite active:scale-[0.98]"
        href={product.productHref}
        onClick={onNavigate}
      >
        Product overview
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function ProductAppsMenu({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  if (variant === "mobile") {
    return (
      <section
        aria-labelledby="mobile-apps-heading"
        className="rounded-[1.5rem] border border-white/12 bg-white/5 p-3"
      >
        <div className="flex items-center justify-between gap-4 px-2 pb-3">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.14em] text-white/65"
              id="mobile-apps-heading"
            >
              Apps
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Open a product or dashboard
            </p>
          </div>
          <Link
            className="focus-ring inline-flex min-h-11 touch-manipulation items-center rounded-full bg-white px-4 text-sm font-bold text-graphite active:scale-[0.98]"
            href="/apps"
            onClick={onNavigate}
          >
            All apps
          </Link>
        </div>
        <div className="grid gap-3">
          {productAccess.map((product) => (
            <ProductCard
              compact
              key={product.id}
              onNavigate={onNavigate}
              product={product}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <details className="group relative">
      <summary className="focus-ring app-action flex min-h-11 cursor-pointer list-none touch-manipulation items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-graphite shadow-sm transition hover:bg-ivory active:scale-[0.98] [&::-webkit-details-marker]:hidden">
        <span>Apps</span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 transition group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m7 10 5 5 5-5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </summary>
      <div className="absolute left-1/2 top-full z-[70] mt-4 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[2rem] border border-graphite/10 bg-ivory p-4 text-graphite shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4 px-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-sapphire">
              Biloo apps
            </p>
            <p className="mt-1 text-sm font-semibold text-graphite">
              Live products for mobile and Windows
            </p>
          </div>
          <Link
            className="focus-ring inline-flex min-h-11 touch-manipulation items-center rounded-full border border-graphite/15 bg-white px-4 text-sm font-bold text-graphite transition hover:border-sapphire hover:text-sapphire active:scale-[0.98]"
            href="/apps"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {productAccess.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </details>
  );
}
