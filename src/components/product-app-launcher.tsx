"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  appProducts,
  type AppProductKey,
} from "@/data/app-products";

type PlatformMode = "mobile" | "windows" | "desktop" | "standalone";

type ProductLaunchButtonsProps = {
  productKey: AppProductKey;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
  onNavigate?: () => void;
};

type ProductAppCardProps = {
  productKey: AppProductKey;
  compact?: boolean;
  onNavigate?: () => void;
};

function usePlatformMode() {
  const [platform, setPlatform] = useState<PlatformMode>("desktop");

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

    if (standalone) {
      setPlatform("standalone");
      return;
    }

    const userAgent = navigator.userAgent;
    const mobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    if (mobile) {
      setPlatform("mobile");
      return;
    }

    setPlatform(/Windows/i.test(userAgent) ? "windows" : "desktop");
  }, []);

  return platform;
}

function platformCopy(platform: PlatformMode) {
  if (platform === "standalone") {
    return {
      label: "Installed app mode",
      target: undefined,
      rel: undefined,
    };
  }

  if (platform === "mobile") {
    return {
      label: "Mobile mode · opens in this tab",
      target: undefined,
      rel: undefined,
    };
  }

  if (platform === "windows") {
    return {
      label: "Windows web app · opens in a new tab",
      target: "_blank",
      rel: "noreferrer",
    };
  }

  return {
    label: "Desktop web app · opens in a new tab",
    target: "_blank",
    rel: "noreferrer",
  };
}

export function ProductLaunchButtons({
  productKey,
  tone = "light",
  compact = false,
  className = "",
  onNavigate,
}: ProductLaunchButtonsProps) {
  const product = appProducts[productKey];
  const platform = usePlatformMode();
  const mode = platformCopy(platform);

  const primaryClass =
    product.accent === "erp"
      ? "bg-sapphire text-white hover:bg-graphite"
      : tone === "dark"
        ? "bg-white text-graphite hover:bg-ivory"
        : "bg-graphite text-white hover:bg-sapphire";

  const secondaryClass =
    tone === "dark"
      ? "border-white/30 bg-white/10 text-white hover:bg-white hover:text-graphite"
      : "border-graphite/15 bg-white text-graphite hover:border-sapphire hover:text-sapphire";

  return (
    <div className={className}>
      <div
        className={`grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}
      >
        <a
          className={`focus-ring inline-flex min-h-12 items-center justify-between gap-3 rounded-full px-5 py-3 text-sm font-bold transition ${primaryClass}`}
          href={product.appHref}
          onClick={onNavigate}
          rel={mode.rel}
          target={mode.target}
        >
          <span>Open {product.shortName} app</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a
          className={`focus-ring inline-flex min-h-12 items-center justify-between gap-3 rounded-full border px-5 py-3 text-sm font-bold transition ${secondaryClass}`}
          href={product.dashboardHref}
          onClick={onNavigate}
          rel={mode.rel}
          target={mode.target}
        >
          <span>{product.shortName} dashboard</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <p
        className={`mt-3 text-xs font-medium ${
          tone === "dark" ? "text-white/55" : "text-muted"
        }`}
      >
        {mode.label}
      </p>
    </div>
  );
}

export function ProductAppCard({
  productKey,
  compact = false,
  onNavigate,
}: ProductAppCardProps) {
  const product = appProducts[productKey];

  return (
    <article
      className={`rounded-[1.75rem] border bg-white text-graphite shadow-[0_18px_55px_rgba(15,23,42,0.10)] ${
        product.accent === "erp"
          ? "border-sapphire/25"
          : "border-graphite/12"
      } ${compact ? "p-5" : "p-6 sm:p-7"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sapphire">
            {product.descriptor}
          </p>
          <h2
            className={`${compact ? "mt-2 text-xl" : "mt-3 text-2xl"} font-semibold tracking-[-0.035em]`}
          >
            {product.name}
          </h2>
        </div>
        <span
          aria-hidden="true"
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black ${
            product.accent === "erp"
              ? "bg-sapphire text-white"
              : "bg-graphite text-white"
          }`}
        >
          {product.accent === "erp" ? "ERP" : "መ"}
        </span>
      </div>

      <p className={`${compact ? "mt-3 text-sm" : "mt-5"} leading-6 text-muted`}>
        {product.summary}
      </p>

      {!compact && (
        <p className="mt-4 flex items-start gap-2 text-sm font-medium text-graphite/75">
          <span
            aria-hidden="true"
            className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500"
          />
          {product.status}
        </p>
      )}

      <ProductLaunchButtons
        className={compact ? "mt-4" : "mt-6"}
        compact={compact}
        onNavigate={onNavigate}
        productKey={productKey}
      />

      <Link
        className="focus-ring mt-4 inline-flex rounded-lg text-sm font-bold text-sapphire transition hover:text-graphite"
        href={product.pageHref}
        onClick={onNavigate}
      >
        View {product.name} details →
      </Link>
    </article>
  );
}

export function ProductAppsGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProductAppCard productKey="mezgeb" />
      <ProductAppCard productKey="hisabtech" />
    </div>
  );
}
