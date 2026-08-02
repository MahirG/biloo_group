"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { BrandMark } from "@/components/brand-mark";

type ServiceId =
  | "food"
  | "taxi"
  | "grocery"
  | "construction"
  | "autoparts";

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  eta: string;
  rating: number;
  visual: string;
  badge?: string;
};

const services: {
  id: ServiceId;
  label: string;
  description: string;
  visual: string;
  surface: string;
}[] = [
  {
    id: "food",
    label: "Food",
    description: "Restaurants near you",
    visual: "🍽️",
    surface: "from-orange-100 to-amber-50",
  },
  {
    id: "taxi",
    label: "Taxi",
    description: "Safe rides, any time",
    visual: "🚕",
    surface: "from-blue-100 to-sky-50",
  },
  {
    id: "grocery",
    label: "Supermarket",
    description: "Daily essentials",
    visual: "🛒",
    surface: "from-emerald-100 to-green-50",
  },
  {
    id: "construction",
    label: "Construction",
    description: "Materials and tools",
    visual: "🏗️",
    surface: "from-amber-100 to-yellow-50",
  },
  {
    id: "autoparts",
    label: "Car parts",
    description: "Parts that fit",
    visual: "🛞",
    surface: "from-violet-100 to-purple-50",
  },
];

const catalog: Record<Exclude<ServiceId, "taxi">, Product[]> = {
  food: [
    {
      id: "food-kitfo",
      name: "Special Kitfo",
      vendor: "Yod Abyssinia",
      category: "Ethiopian",
      price: 680,
      eta: "25–35 min",
      rating: 4.8,
      visual: "🥘",
      badge: "Popular",
    },
    {
      id: "food-shawarma",
      name: "Chicken Shawarma",
      vendor: "Bole Grill",
      category: "Fast food",
      price: 320,
      eta: "20–30 min",
      rating: 4.7,
      visual: "🌯",
      badge: "Free delivery",
    },
    {
      id: "food-pizza",
      name: "Family Pizza",
      vendor: "Roma Kitchen",
      category: "Pizza",
      price: 890,
      eta: "30–40 min",
      rating: 4.6,
      visual: "🍕",
    },
    {
      id: "food-beyaynetu",
      name: "Fasting Beyaynetu",
      vendor: "Habesha Corner",
      category: "Ethiopian",
      price: 420,
      eta: "25–35 min",
      rating: 4.9,
      visual: "🍛",
      badge: "Top rated",
    },
  ],
  grocery: [
    {
      id: "grocery-produce",
      name: "Fresh Produce Box",
      vendor: "Fresh Corner",
      category: "Fruit and vegetables",
      price: 950,
      eta: "30–45 min",
      rating: 4.8,
      visual: "🥬",
      badge: "Fresh today",
    },
    {
      id: "grocery-family",
      name: "Family Essentials Pack",
      vendor: "Shoa Supermarket",
      category: "Household",
      price: 2450,
      eta: "45–55 min",
      rating: 4.7,
      visual: "🛍️",
    },
    {
      id: "grocery-breakfast",
      name: "Milk and Breakfast Set",
      vendor: "AllMart",
      category: "Dairy and breakfast",
      price: 780,
      eta: "25–40 min",
      rating: 4.6,
      visual: "🥛",
    },
    {
      id: "grocery-cleaning",
      name: "Home Cleaning Bundle",
      vendor: "Queens Market",
      category: "Home care",
      price: 1280,
      eta: "35–50 min",
      rating: 4.5,
      visual: "🧴",
    },
  ],
  construction: [
    {
      id: "construction-cement",
      name: "Cement 50kg",
      vendor: "BuildHub Addis",
      category: "Cement",
      price: 1350,
      eta: "Same day",
      rating: 4.8,
      visual: "🏗️",
      badge: "Bulk pricing",
    },
    {
      id: "construction-steel",
      name: "Rebar Steel 12mm",
      vendor: "Abyssinia Steel Supply",
      category: "Steel",
      price: 1850,
      eta: "2–4 hours",
      rating: 4.7,
      visual: "🔩",
    },
    {
      id: "construction-paint",
      name: "Interior Paint 20L",
      vendor: "Color House",
      category: "Paint",
      price: 5200,
      eta: "Same day",
      rating: 4.6,
      visual: "🎨",
      badge: "Contractor offer",
    },
    {
      id: "construction-tools",
      name: "Professional Tool Kit",
      vendor: "Addis Tools",
      category: "Tools",
      price: 8400,
      eta: "1–3 hours",
      rating: 4.9,
      visual: "🧰",
    },
  ],
  autoparts: [
    {
      id: "parts-brakes",
      name: "Toyota Brake Pad Set",
      vendor: "Japan Auto Parts",
      category: "Brakes",
      price: 4800,
      eta: "1–2 hours",
      rating: 4.8,
      visual: "🛞",
      badge: "Verified fit",
    },
    {
      id: "parts-battery",
      name: "12V Premium Battery",
      vendor: "Addis Battery Center",
      category: "Electrical",
      price: 12900,
      eta: "45–75 min",
      rating: 4.7,
      visual: "🔋",
      badge: "Installation available",
    },
    {
      id: "parts-oil",
      name: "Engine Oil 5W-30",
      vendor: "MotorCare",
      category: "Lubricants",
      price: 3250,
      eta: "35–55 min",
      rating: 4.9,
      visual: "🛢️",
    },
    {
      id: "parts-light",
      name: "LED Headlight Pair",
      vendor: "Auto Light Ethiopia",
      category: "Lighting",
      price: 6200,
      eta: "1–2 hours",
      rating: 4.6,
      visual: "💡",
    },
  ],
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function BilooCustomerApp() {
  const [activeService, setActiveService] = useState<ServiceId>("food");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bole, Addis Ababa");
  const [locating, setLocating] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [pickup, setPickup] = useState("Current location");
  const [destination, setDestination] = useState("");
  const [showTracker, setShowTracker] = useState(false);
  const [notice, setNotice] = useState("Welcome to Biloo");

  const products = useMemo(() => {
    if (activeService === "taxi") return [];

    const query = search.trim().toLowerCase();
    if (!query) return catalog[activeService];

    return catalog[activeService].filter((product) =>
      [product.name, product.vendor, product.category].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [activeService, search]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = Object.values(catalog)
      .flat()
      .find((item) => item.id === productId);

    return total + (product?.price ?? 0) * quantity;
  }, 0);

  function selectService(service: ServiceId) {
    setActiveService(service);
    setSearch("");
    setNotice(
      `${services.find((item) => item.id === service)?.label ?? "Service"} selected`,
    );
  }

  function updateCart(productId: string, change: number) {
    setCart((current) => {
      const quantity = Math.max(0, (current[productId] ?? 0) + change);
      const next = { ...current };

      if (quantity === 0) delete next[productId];
      else next[productId] = quantity;

      return next;
    });
    setNotice(change > 0 ? "Added to your basket" : "Basket updated");
  }

  function detectLocation() {
    setLocating(true);

    if (!navigator.geolocation) {
      setNotice("GPS is unavailable on this device");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation("Current GPS location");
        setPickup("Current GPS location");
        setNotice("Location updated securely");
        setLocating(false);
      },
      () => {
        setLocation("Bole, Addis Ababa");
        setNotice("Using your saved address");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function requestRide() {
    if (!destination.trim()) {
      setNotice("Enter your destination first");
      return;
    }

    setNotice("A verified Biloo driver is being assigned");
    setShowTracker(true);
  }

  return (
    <main className="min-h-screen bg-[#edf3ff] text-slate-950">
      <div className="mx-auto min-h-screen max-w-[1500px] lg:grid lg:grid-cols-[240px_minmax(0,1fr)_340px]">
        <aside className="hidden bg-[#07142f] p-7 text-white lg:flex lg:flex-col">
          <Link
            aria-label="Return to Biloo Group"
            className="focus-ring w-fit rounded-2xl"
            href="/"
          >
            <BrandMark className="h-14 w-14" />
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-blue-200/45">
            Services
          </p>
          <nav className="mt-3 space-y-2" aria-label="Biloo services">
            {services.map((service) => (
              <button
                className={`focus-ring flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeService === service.id
                    ? "bg-white text-[#07142f]"
                    : "text-blue-100/65 hover:bg-white/10 hover:text-white"
                }`}
                key={service.id}
                onClick={() => selectService(service.id)}
                type="button"
              >
                <span className="text-xl">{service.visual}</span>
                {service.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/7 p-5">
            <p className="text-sm font-bold">Biloo Safety</p>
            <p className="mt-2 text-xs leading-5 text-blue-100/55">
              Verified drivers, protected payments, and live support on every
              order.
            </p>
          </div>
        </aside>

        <section className="min-w-0 pb-28 lg:pb-8">
          <header className="sticky top-0 z-30 border-b border-white/80 bg-[#edf3ff]/90 px-4 py-4 backdrop-blur-xl sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <Link
                aria-label="Return to Biloo Group"
                className="focus-ring rounded-xl lg:hidden"
                href="/"
              >
                <BrandMark className="h-11 w-11" />
              </Link>

              <button
                className="focus-ring min-w-0 text-left lg:hidden"
                onClick={detectLocation}
                type="button"
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Deliver to
                </span>
                <span className="block truncate text-sm font-bold">
                  {locating ? "Finding you…" : location}
                </span>
              </button>

              <button
                className="focus-ring hidden items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-left shadow-sm ring-1 ring-slate-200/70 lg:flex"
                onClick={detectLocation}
                type="button"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <LocationIcon />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Your location
                  </span>
                  <strong className="text-sm">
                    {locating ? "Finding location…" : location}
                  </strong>
                </span>
              </button>

              <label className="relative ml-auto hidden max-w-lg flex-1 lg:block">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  className="focus-ring h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products, stores, or categories"
                  value={search}
                />
              </label>

              <button
                aria-label="Open basket"
                className="focus-ring relative ml-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#0b2d6f] text-lg text-white lg:ml-0"
                type="button"
              >
                🛒
                {cartCount > 0 ? (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </div>

            <label className="relative mt-4 block lg:hidden">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                className="focus-ring h-12 w-full rounded-2xl border border-white bg-white pl-12 pr-4 text-sm outline-none"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Biloo"
                value={search}
              />
            </label>
          </header>

          <div className="px-4 py-5 sm:px-7 lg:px-9 lg:py-8">
            <section className="overflow-hidden rounded-[2rem] bg-[#0b2d6f] p-7 text-white shadow-2xl shadow-blue-950/15 sm:p-10">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
                Live across Addis Ababa
              </span>
              <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h1 className="max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                    Your city, delivered through one app.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/70 sm:text-base">
                    Food, rides, groceries, construction materials, and genuine
                    car parts—connected by Biloo.
                  </p>
                </div>
                <div className="text-7xl drop-shadow-2xl">🛵</div>
              </div>
            </section>

            <section className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Explore Biloo
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                What do you need today?
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {services.map((service) => (
                  <button
                    className={`focus-ring min-h-36 rounded-[1.6rem] border p-4 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                      activeService === service.id
                        ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-500/10"
                        : "border-white bg-white/80"
                    }`}
                    key={service.id}
                    onClick={() => selectService(service.id)}
                    type="button"
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-2xl ${service.surface}`}
                    >
                      {service.visual}
                    </span>
                    <strong className="mt-5 block text-sm">{service.label}</strong>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      {service.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {activeService === "taxi" ? (
              <section className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                    Biloo Ride
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                    Where are you going?
                  </h2>

                  <div className="mt-6 space-y-3">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-slate-500">
                        Pickup
                      </span>
                      <input
                        className="focus-ring h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none"
                        onChange={(event) => setPickup(event.target.value)}
                        value={pickup}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-slate-500">
                        Destination
                      </span>
                      <input
                        className="focus-ring h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none"
                        onChange={(event) => setDestination(event.target.value)}
                        placeholder="Enter destination"
                        value={destination}
                      />
                    </label>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      ["🚕", "Economy", "From 180 ETB"],
                      ["🚙", "Comfort", "From 260 ETB"],
                      ["🛵", "Delivery", "From 150 ETB"],
                    ].map(([visual, name, price], index) => (
                      <button
                        className={`focus-ring rounded-2xl border p-3 text-left ${
                          index === 0
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200"
                        }`}
                        key={name}
                        type="button"
                      >
                        <span className="text-2xl">{visual}</span>
                        <strong className="mt-2 block text-xs">{name}</strong>
                        <span className="mt-1 block text-[10px] text-slate-400">
                          {price}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    className="focus-ring mt-5 w-full rounded-2xl bg-[#0b2d6f] px-5 py-4 text-sm font-bold text-white"
                    onClick={requestRide}
                    type="button"
                  >
                    Find a verified driver
                  </button>
                </div>

                <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-[#dce8dc] ring-1 ring-slate-200/70">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(35deg, transparent 46%, white 47%, white 52%, transparent 53%), linear-gradient(-35deg, transparent 46%, white 47%, white 52%, transparent 53%)",
                      backgroundSize: "110px 90px",
                    }}
                  />
                  <span className="absolute left-[22%] top-[25%] grid h-11 w-11 place-items-center rounded-full bg-blue-800 text-white shadow-xl">
                    <LocationIcon />
                  </span>
                  <span className="absolute bottom-[22%] right-[18%] grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-rose-500 text-white shadow-xl">
                    <LocationIcon />
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-xl">
                    <p className="text-xs font-bold">12 drivers nearby</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Typical pickup time: 6–10 minutes
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <section className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  Recommended near you
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                  Ready to order
                </h2>

                {products.length === 0 ? (
                  <div className="mt-5 rounded-[2rem] bg-white p-10 text-center ring-1 ring-slate-200/70">
                    <p className="font-bold">No matching products</p>
                    <p className="mt-2 text-sm text-slate-400">
                      Try another product, category, or store.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                    {products.map((product) => {
                      const quantity = cart[product.id] ?? 0;

                      return (
                        <article
                          className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
                          key={product.id}
                        >
                          <div className="relative grid h-40 place-items-center bg-gradient-to-br from-slate-50 to-blue-50">
                            <span className="text-7xl">{product.visual}</span>
                            {product.badge ? (
                              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-blue-700 shadow-sm">
                                {product.badge}
                              </span>
                            ) : null}
                          </div>
                          <div className="p-4">
                            <p className="text-[10px] font-semibold text-amber-600">
                              ★ {product.rating} · {product.eta}
                            </p>
                            <h3 className="mt-3 font-bold">{product.name}</h3>
                            <p className="mt-1 text-xs text-slate-400">
                              {product.vendor} · {product.category}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-3">
                              <strong className="text-sm text-blue-800">
                                {formatMoney(product.price)}
                              </strong>
                              {quantity === 0 ? (
                                <button
                                  aria-label={`Add ${product.name}`}
                                  className="focus-ring grid h-9 w-9 place-items-center rounded-xl bg-[#0b2d6f] font-bold text-white"
                                  onClick={() => updateCart(product.id, 1)}
                                  type="button"
                                >
                                  +
                                </button>
                              ) : (
                                <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-1">
                                  <button
                                    aria-label={`Remove one ${product.name}`}
                                    className="focus-ring grid h-7 w-7 place-items-center rounded-lg bg-white font-bold text-blue-800"
                                    onClick={() => updateCart(product.id, -1)}
                                    type="button"
                                  >
                                    −
                                  </button>
                                  <span className="min-w-4 text-center text-xs font-black">
                                    {quantity}
                                  </span>
                                  <button
                                    aria-label={`Add one ${product.name}`}
                                    className="focus-ring grid h-7 w-7 place-items-center rounded-lg bg-blue-700 font-bold text-white"
                                    onClick={() => updateCart(product.id, 1)}
                                    type="button"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </div>
        </section>

        <aside className="hidden border-l border-slate-200/80 bg-white/70 p-7 lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Current activity
          </p>
          <h2 className="mt-1 text-xl font-black">Your Biloo</h2>

          <div className="mt-6 rounded-[1.75rem] bg-[#07142f] p-5 text-white">
            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300">
              On the way
            </span>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold">Order #BL-2048</h3>
                <p className="mt-1 text-xs text-blue-100/55">
                  Chicken Shawarma · Bole Grill
                </p>
              </div>
              <span className="text-3xl">🛵</span>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <strong>12–16 min</strong>
              <button
                className="focus-ring rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#07142f]"
                onClick={() => setShowTracker(true)}
                type="button"
              >
                Track live
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-slate-200/70">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Biloo Wallet
            </p>
            <p className="mt-1 text-2xl font-black">ETB 2,450</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                className="focus-ring rounded-xl bg-[#0b2d6f] px-3 py-3 text-xs font-bold text-white"
                type="button"
              >
                Add money
              </button>
              <button
                className="focus-ring rounded-xl bg-slate-100 px-3 py-3 text-xs font-bold"
                type="button"
              >
                Transactions
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Basket</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                {cartCount} items
              </span>
            </div>
            {cartCount === 0 ? (
              <div className="py-8 text-center">
                <span className="text-4xl">🧺</span>
                <p className="mt-3 text-xs text-slate-400">
                  Add something from any Biloo store.
                </p>
              </div>
            ) : (
              <>
                <p className="mt-6 text-xs text-slate-400">Estimated subtotal</p>
                <p className="mt-1 text-xl font-black">
                  {formatMoney(cartTotal)}
                </p>
                <button
                  className="focus-ring mt-5 w-full rounded-xl bg-[#0b2d6f] px-4 py-3 text-xs font-bold text-white"
                  type="button"
                >
                  Continue to checkout
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 text-center text-[10px] font-bold">
          {[
            ["⌂", "Home"],
            ["▤", "Orders"],
            ["◫", "Wallet"],
            ["○", "Profile"],
          ].map(([visual, label], index) => (
            <button
              className={`focus-ring rounded-xl py-2 ${
                index === 0 ? "text-blue-800" : "text-slate-400"
              }`}
              key={label}
              type="button"
            >
              <span className="block text-xl">{visual}</span>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8">
        <p
          aria-live="polite"
          className="whitespace-nowrap rounded-full bg-slate-950/90 px-4 py-2 text-xs font-semibold text-white shadow-xl"
        >
          {notice}
        </p>
      </div>

      {showTracker ? (
        <div
          aria-label="Live tracking"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 backdrop-blur-sm sm:items-center sm:p-5"
          role="dialog"
        >
          <div className="w-full max-w-lg overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
            <div className="relative h-56 bg-[#dce8dc]">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(35deg, transparent 46%, white 47%, white 52%, transparent 53%), linear-gradient(-35deg, transparent 46%, white 47%, white 52%, transparent 53%)",
                  backgroundSize: "100px 80px",
                }}
              />
              <span className="absolute left-[28%] top-[32%] text-4xl">🛵</span>
              <span className="absolute bottom-[18%] right-[15%] grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-rose-500 text-white shadow-xl">
                <LocationIcon />
              </span>
              <button
                aria-label="Close tracker"
                className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg"
                onClick={() => setShowTracker(false)}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="p-6 sm:p-7">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Driver assigned
              </span>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.04em]">
                    Your Biloo is arriving
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {destination
                      ? `${pickup} → ${destination}`
                      : "Your courier is heading to Bole."}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Arrival</p>
                  <strong className="text-xl">8 min</strong>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-200 font-black text-blue-900">
                  DA
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">Dawit Alemu</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    4.9 rating · Verified driver
                  </p>
                </div>
                <button
                  className="focus-ring rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-blue-800 shadow-sm"
                  type="button"
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
