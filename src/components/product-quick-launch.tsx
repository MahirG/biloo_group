"use client";

import Link from "next/link";

import { getProductAccess, type ProductAccessId } from "@/data/product-access";

function ExternalArrow() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
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

export function ProductQuickLaunch({
  productId,
}: {
  productId: ProductAccessId;
}) {
  const product = getProductAccess(productId);

  return (
    <aside
      aria-label={`${product.name} quick access`}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-3xl rounded-2xl border border-white/15 bg-graphite/95 p-3 text-white shadow-2xl backdrop-blur-xl print:hidden"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="focus-ring app-action flex min-h-11 touch-manipulation items-center gap-3 rounded-xl px-2 active:scale-[0.99]"
          href={product.productHref}
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-sm font-bold text-graphite"
          >
            {product.id === "mezgeb" ? "መ" : "H"}
          </span>
          <span>
            <strong className="block text-sm">{product.shortName}</strong>
            <span className="block text-xs text-white/70">
              Mobile and Windows access
            </span>
          </span>
        </Link>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <a
            aria-label={`${product.appLabel} (opens in a new tab)`}
            className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-graphite transition hover:bg-ivory active:scale-[0.98]"
            href={product.appHref}
            rel="noreferrer"
            target="_blank"
          >
            Open app
            <ExternalArrow />
          </a>
          <a
            aria-label={`${product.dashboardLabel} (opens in a new tab)`}
            className="focus-ring app-action inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-xl bg-sapphire px-4 text-sm font-bold text-white transition hover:bg-white hover:text-graphite active:scale-[0.98]"
            href={product.dashboardHref}
            rel="noreferrer"
            target="_blank"
          >
            Dashboard
            <ExternalArrow />
          </a>
        </div>
      </div>
    </aside>
  );
}
