"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceId = "food" | "taxi" | "market" | "construction" | "auto";

type CatalogItem = {
  id: string;
  name: string;
  merchant: string;
  price: number;
  eta: string;
  category: string;
  badge?: string;
};

const services: Array<{
  id: ServiceId;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
}> = [
  {
    id: "food",
    label: "Food delivery",
    shortLabel: "Food",
    description: "Restaurants, cafés and local favourites",
    icon: "🍲",
  },
  {
    id: "taxi",
    label: "Taxi booking",
    shortLabel: "Taxi",
    description: "Safe rides with live driver tracking",
    icon: "🚕",
  },
  {
    id: "market",
    label: "Supermarket",
    shortLabel: "Market",
    description: "Groceries and household essentials",
    icon: "🛒",
  },
  {
    id: "construction",
    label: "Construction",
    shortLabel: "Build",
    description: "Materials, tools and bulk delivery",
    icon: "🏗️",
  },
  {
    id: "auto",
    label: "Car parts",
    shortLabel: "Auto",
    description: "Parts by vehicle, model and part number",
    icon: "🚗",
  },
];

const catalog: Record<Exclude<ServiceId, "taxi">, CatalogItem[]> = {
  food: [
    {
      id: "food-1",
      name: "Special Tibs",
      merchant: "Addis Kitchen",
      price: 620,
      eta: "25–35 min",
      category: "Ethiopian",
      badge: "Popular",
    },
    {
      id: "food-2",
      name: "Chicken Shawarma",
      merchant: "Bole Grill",
      price: 390,
      eta: "20–30 min",
      category: "Fast food",
    },
    {
      id: "food-3",
      name: "Family Pizza",
      merchant: "Piassa Oven",
      price: 890,
      eta: "30–40 min",
      category: "Pizza",
      badge: "Free delivery",
    },
    {
      id: "food-4",
      name: "Beyaynetu",
      merchant: "Habesha Table",
      price: 310,
      eta: "20–25 min",
      category: "Fasting",
    },
  ],
  market: [
    {
      id: "market-1",
      name: "Fresh Essentials Box",
      merchant: "Biloo Market",
      price: 1450,
      eta: "35–45 min",
      category: "Fresh food",
      badge: "Best value",
    },
    {
      id: "market-2",
      name: "Cooking Oil · 5L",
      merchant: "Megenagna Mart",
      price: 1180,
      eta: "30–40 min",
      category: "Pantry",
    },
    {
      id: "market-3",
      name: "Home Cleaning Pack",
      merchant: "Fresh Basket",
      price: 760,
      eta: "25–35 min",
      category: "Household",
    },
    {
      id: "market-4",
      name: "Baby Care Bundle",
      merchant: "Family Mart",
      price: 1980,
      eta: "35–50 min",
      category: "Baby",
    },
  ],
  construction: [
    {
      id: "build-1",
      name: "OPC Cement · 50kg",
      merchant: "Prime Materials",
      price: 1480,
      eta: "Same day",
      category: "Cement",
      badge: "Bulk pricing",
    },
    {
      id: "build-2",
      name: "Reinforcement Bar · 12mm",
      merchant: "East Steel Supply",
      price: 2650,
      eta: "1–2 days",
      category: "Steel",
    },
    {
      id: "build-3",
      name: "Interior Paint · 20L",
      merchant: "BuildPro",
      price: 3450,
      eta: "Same day",
      category: "Finishing",
    },
    {
      id: "build-4",
      name: "Cordless Drill Set",
      merchant: "Tool House",
      price: 7850,
      eta: "2–4 hours",
      category: "Tools",
    },
  ],
  auto: [
    {
      id: "auto-1",
      name: "Brake Pad Set",
      merchant: "AutoHub Addis",
      price: 4200,
      eta: "2–4 hours",
      category: "Brakes",
      badge: "Verified fit",
    },
    {
      id: "auto-2",
      name: "Engine Oil · 5L",
      merchant: "MotorCare",
      price: 3150,
      eta: "60–90 min",
      category: "Fluids",
    },
    {
      id: "auto-3",
      name: "12V Car Battery",
      merchant: "Battery Centre",
      price: 12800,
      eta: "Same day",
      category: "Electrical",
    },
    {
      id: "auto-4",
      name: "Air Filter",
      merchant: "Japan Parts ET",
      price: 1850,
      eta: "2–3 hours",
      category: "Engine",
    },
  ],
};

const rideOptions = [
  {
    id: "economy",
    name: "Biloo Economy",
    eta: "4 min",
    price: 235,
    icon: "🚗",
  },
  {
    id: "comfort",
    name: "Biloo Comfort",
    eta: "7 min",
    price: 315,
    icon: "🚙",
  },
  { id: "van", name: "Biloo XL", eta: "10 min", price: 520, icon: "🚐" },
];

const orderSteps = [
  "Order confirmed",
  "Vendor preparing",
  "Driver assigned",
  "Arriving soon",
];

function formatBirr(value: number) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BilooSuperApp() {
  const [activeService, setActiveService] = useState<ServiceId>("food");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [pickup, setPickup] = useState("Current location");
  const [destination, setDestination] = useState("Bole Medhanialem");
  const [selectedRide, setSelectedRide] = useState(rideOptions[0].id);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStep, setOrderStep] = useState(0);
  const [locationMessage, setLocationMessage] = useState(
    "Deliver to · Addis Ababa",
  );

  useEffect(() => {
    if (!orderPlaced || orderStep >= orderSteps.length - 1) return;
    const timer = window.setTimeout(
      () => setOrderStep((step) => step + 1),
      3200,
    );
    return () => window.clearTimeout(timer);
  }, [orderPlaced, orderStep]);

  const activeCatalog = activeService === "taxi" ? [] : catalog[activeService];
  const filteredCatalog = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeCatalog;
    return activeCatalog.filter((item) =>
      [item.name, item.merchant, item.category].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [activeCatalog, searchQuery]);

  const cartSummary = useMemo(() => {
    const allItems = Object.values(catalog).flat();
    return allItems.reduce(
      (summary, item) => {
        const quantity = cart[item.id] ?? 0;
        return {
          quantity: summary.quantity + quantity,
          subtotal: summary.subtotal + item.price * quantity,
        };
      },
      { quantity: 0, subtotal: 0 },
    );
  }, [cart]);

  const selectService = (service: ServiceId) => {
    setActiveService(service);
    setSearchQuery("");
    setOrderPlaced(false);
    setOrderStep(0);
  };

  const addItem = (itemId: string) => {
    setCart((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setOrderStep(0);
  };

  const useCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationMessage("Location unavailable on this device");
      return;
    }

    setLocationMessage("Locating you…");
    navigator.geolocation.getCurrentPosition(
      () => setLocationMessage("Current location selected"),
      () => setLocationMessage("Allow location access to continue"),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <section className="bg-[#f5f7f2] py-10 sm:py-16" id="prototype">
      <div className="container-shell">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
            <div className="border-b border-black/8 bg-[#10251d] px-5 py-5 text-white sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200/75">
                    BILOO · Everything nearby
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    What do you need today?
                  </h2>
                </div>
                <button
                  className="focus-ring app-action rounded-full border border-white/15 bg-white/10 px-4 py-2 text-left text-sm font-semibold text-white transition hover:bg-white/15"
                  onClick={useCurrentLocation}
                  type="button"
                >
                  <span className="mr-2" aria-hidden="true">
                    ⌖
                  </span>
                  {locationMessage}
                </button>
              </div>

              <label className="mt-5 flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 text-graphite shadow-sm">
                <span aria-hidden="true">⌕</span>
                <span className="sr-only">
                  Search products, stores or dishes
                </span>
                <input
                  className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={
                    activeService === "taxi"
                      ? "Search a destination"
                      : "Search products, stores or dishes"
                  }
                  value={searchQuery}
                />
              </label>
            </div>

            <div className="border-b border-black/8 px-4 py-4 sm:px-8">
              <div className="grid grid-cols-5 gap-2">
                {services.map((service) => {
                  const active = activeService === service.id;
                  return (
                    <button
                      aria-pressed={active}
                      className={`focus-ring app-action min-w-0 rounded-2xl px-2 py-3 text-center transition active:scale-[0.98] ${
                        active
                          ? "bg-[#d9ff73] text-[#10251d] shadow-sm"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                      key={service.id}
                      onClick={() => selectService(service.id)}
                      type="button"
                    >
                      <span
                        className="block text-xl sm:text-2xl"
                        aria-hidden="true"
                      >
                        {service.icon}
                      </span>
                      <span className="mt-1 block truncate text-[0.68rem] font-extrabold uppercase tracking-wide sm:text-xs">
                        {service.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    {
                      services.find((service) => service.id === activeService)
                        ?.description
                    }
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-slate-950">
                    {activeService === "taxi"
                      ? "Book your ride"
                      : "Recommended near you"}
                  </h3>
                </div>
                {activeService !== "taxi" ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                    {filteredCatalog.length} results
                  </span>
                ) : null}
              </div>

              {activeService === "taxi" ? (
                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-[1.75rem] border border-black/8 bg-[#edf3ed] p-5">
                    <div className="relative overflow-hidden rounded-2xl bg-[#d5e3d7] p-5">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, transparent 48%, #4c6a5a 50%, transparent 52%), linear-gradient(transparent 48%, #4c6a5a 50%, transparent 52%)",
                          backgroundSize: "48px 48px",
                        }}
                      />
                      <div className="relative flex min-h-44 flex-col justify-between">
                        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-950 shadow-sm">
                          3 drivers nearby
                        </span>
                        <div className="flex items-end justify-between">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#10251d] text-xl text-white shadow-lg">
                            ●
                          </span>
                          <span className="rounded-full bg-[#d9ff73] px-4 py-2 text-sm font-black text-[#10251d] shadow-lg">
                            🚕 4 min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                      <label className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <span className="block text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-400">
                          Pickup
                        </span>
                        <input
                          className="mt-1 w-full bg-transparent font-semibold outline-none"
                          onChange={(event) => setPickup(event.target.value)}
                          value={pickup}
                        />
                      </label>
                      <label className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <span className="block text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-400">
                          Destination
                        </span>
                        <input
                          className="mt-1 w-full bg-transparent font-semibold outline-none"
                          onChange={(event) =>
                            setDestination(event.target.value)
                          }
                          value={destination}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {rideOptions.map((ride) => {
                      const selected = selectedRide === ride.id;
                      return (
                        <button
                          aria-pressed={selected}
                          className={`focus-ring app-action flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-[#10251d] bg-[#10251d] text-white"
                              : "border-black/8 bg-white hover:bg-slate-50"
                          }`}
                          key={ride.id}
                          onClick={() => setSelectedRide(ride.id)}
                          type="button"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-2xl" aria-hidden="true">
                              {ride.icon}
                            </span>
                            <span>
                              <span className="block font-bold">
                                {ride.name}
                              </span>
                              <span
                                className={`text-sm ${selected ? "text-white/65" : "text-slate-500"}`}
                              >
                                {ride.eta} away
                              </span>
                            </span>
                          </span>
                          <span className="font-black">
                            {formatBirr(ride.price)}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      className="focus-ring app-action min-h-14 w-full rounded-2xl bg-[#d9ff73] px-5 font-black text-[#10251d] transition hover:brightness-95 active:scale-[0.99]"
                      onClick={placeOrder}
                      type="button"
                    >
                      Confirm ride
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {filteredCatalog.map((item) => (
                    <article
                      className="group rounded-[1.5rem] border border-black/8 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-xl"
                      key={item.id}
                    >
                      <div className="flex min-h-36 items-start justify-between rounded-2xl bg-gradient-to-br from-[#e8efe7] to-[#f8f4e7] p-4">
                        <span className="text-4xl" aria-hidden="true">
                          {
                            services.find(
                              (service) => service.id === activeService,
                            )?.icon
                          }
                        </span>
                        {item.badge ? (
                          <span className="rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-wide text-emerald-900 shadow-sm">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                            {item.merchant}
                          </p>
                          <h4 className="mt-1 text-lg font-bold text-slate-950">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.category} · {item.eta}
                          </p>
                        </div>
                        <span className="shrink-0 font-black text-slate-950">
                          {formatBirr(item.price)}
                        </span>
                      </div>
                      <button
                        className="focus-ring app-action mt-4 min-h-11 w-full rounded-xl bg-[#10251d] px-4 text-sm font-bold text-white transition hover:bg-[#19382c] active:scale-[0.99]"
                        onClick={() => addItem(item.id)}
                        type="button"
                      >
                        {cart[item.id]
                          ? `Added · ${cart[item.id]}`
                          : "Add to basket"}
                      </button>
                    </article>
                  ))}
                  {filteredCatalog.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                      No matching products found. Try another search.
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] bg-[#10251d] p-6 text-white shadow-[0_24px_70px_rgba(16,37,29,0.24)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-200/65">
                    Your activity
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Live order
                  </h3>
                </div>
                <span
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl"
                  aria-hidden="true"
                >
                  ⌁
                </span>
              </div>

              {orderPlaced ? (
                <div className="mt-6">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold">
                          {activeService === "taxi"
                            ? "Ride BL-2408"
                            : "Order BL-2408"}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                          Live updates enabled
                        </p>
                      </div>
                      <span className="rounded-full bg-[#d9ff73] px-3 py-1 text-xs font-black text-[#10251d]">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                  <ol className="mt-5 space-y-4">
                    {orderSteps.map((step, index) => (
                      <li className="flex items-center gap-3" key={step}>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${index <= orderStep ? "bg-[#d9ff73] text-[#10251d]" : "bg-white/10 text-white/35"}`}
                        >
                          {index < orderStep ? "✓" : index + 1}
                        </span>
                        <span
                          className={
                            index <= orderStep
                              ? "font-semibold text-white"
                              : "text-white/35"
                          }
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/20 p-5 text-sm leading-6 text-white/60">
                  Place an order or confirm a ride to preview GPS tracking and
                  real-time status updates.
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-slate-400">
                    Basket
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">
                    {cartSummary.quantity} items
                  </h3>
                </div>
                <span
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#eff5ea] text-xl"
                  aria-hidden="true"
                >
                  🛍️
                </span>
              </div>
              <div className="mt-5 space-y-3 border-y border-black/8 py-4 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatBirr(cartSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery estimate</span>
                  <span>
                    {cartSummary.quantity ? formatBirr(85) : formatBirr(0)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950">
                  <span>Total</span>
                  <span>
                    {formatBirr(
                      cartSummary.subtotal + (cartSummary.quantity ? 85 : 0),
                    )}
                  </span>
                </div>
              </div>
              <button
                className="focus-ring app-action mt-5 min-h-13 w-full rounded-2xl bg-[#d9ff73] px-5 font-black text-[#10251d] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!cartSummary.quantity}
                onClick={placeOrder}
                type="button"
              >
                Continue to payment
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Demo checkout. Payment credentials are not connected yet.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-[#fff6dc] p-6">
              <p className="text-xs font-black uppercase tracking-[0.17em] text-amber-800">
                BILOO Shield
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-950">
                Verified drivers and vendors
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Identity checks, order PINs, support escalation and auditable
                payouts are part of the production architecture.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
