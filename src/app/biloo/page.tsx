"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Role = "customer" | "driver" | "vendor" | "admin";
type ServiceKey = "food" | "taxi" | "market" | "construction" | "parts";

const roles: { key: Role; label: string; description: string }[] = [
  { key: "customer", label: "Customer", description: "Book, shop and track" },
  { key: "driver", label: "Driver", description: "Trips and deliveries" },
  { key: "vendor", label: "Vendor", description: "Orders and inventory" },
  { key: "admin", label: "Admin", description: "Operations control" },
];

const services: {
  key: ServiceKey;
  label: string;
  subtitle: string;
  icon: string;
  accent: string;
}[] = [
  {
    key: "food",
    label: "Food",
    subtitle: "Restaurants near you",
    icon: "🍽",
    accent: "bg-orange-50 text-orange-700",
  },
  {
    key: "taxi",
    label: "Taxi",
    subtitle: "Ride across the city",
    icon: "🚕",
    accent: "bg-amber-50 text-amber-800",
  },
  {
    key: "market",
    label: "Market",
    subtitle: "Groceries delivered",
    icon: "🛒",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    key: "construction",
    label: "Build",
    subtitle: "Construction materials",
    icon: "🏗",
    accent: "bg-sky-50 text-sky-700",
  },
  {
    key: "parts",
    label: "Car parts",
    subtitle: "Parts for your vehicle",
    icon: "⚙",
    accent: "bg-violet-50 text-violet-700",
  },
];

const merchants = [
  {
    name: "Kategna Kitchen",
    category: "Ethiopian · 25–35 min",
    rating: "4.8",
    fee: "ETB 45 delivery",
    badge: "Popular",
  },
  {
    name: "Fresh Corner",
    category: "Supermarket · 20–30 min",
    rating: "4.7",
    fee: "Free over ETB 1,200",
    badge: "Free delivery",
  },
  {
    name: "Abyssinia Auto Parts",
    category: "Toyota & Hyundai parts",
    rating: "4.9",
    fee: "Same-day delivery",
    badge: "Verified",
  },
];

const activeOrders = [
  {
    id: "BL-20481",
    title: "Fresh Corner order",
    status: "Driver is collecting your order",
    eta: "18 min",
    progress: 62,
  },
  {
    id: "BL-20476",
    title: "Airport taxi",
    status: "Driver arriving at pickup",
    eta: "4 min",
    progress: 84,
  },
];

const driverJobs = [
  {
    type: "Food delivery",
    pickup: "Kategna Kitchen, Bole",
    dropoff: "CMC, Summit",
    amount: "ETB 186",
    distance: "8.4 km",
  },
  {
    type: "Taxi request",
    pickup: "Mexico Square",
    dropoff: "Bole International Airport",
    amount: "ETB 420",
    distance: "7.1 km",
  },
];

const vendorOrders = [
  { id: "#20481", customer: "Samira K.", total: "ETB 1,680", status: "Preparing" },
  { id: "#20479", customer: "Yonas T.", total: "ETB 940", status: "New" },
  { id: "#20474", customer: "Hanan M.", total: "ETB 2,430", status: "Ready" },
];

const adminStats = [
  { label: "Gross order value", value: "ETB 2.48M", change: "+18.4%" },
  { label: "Orders today", value: "1,284", change: "+11.2%" },
  { label: "Drivers online", value: "486", change: "92% active" },
  { label: "Open incidents", value: "7", change: "3 urgent" },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-2xl bg-[#0b2a4a] text-lg font-black tracking-[-0.08em] text-[#f0bd4c] shadow-[0_12px_30px_rgba(11,42,74,0.2)]">
        BL
      </span>
      <div>
        <p className="text-xl font-black tracking-[-0.05em] text-[#0b2a4a]">BILOO</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-slate-400">
          One app. Every move.
        </p>
      </div>
    </div>
  );
}

function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span
      className={`inline-block size-2.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
    />
  );
}

export default function BilooAppPage() {
  const [role, setRole] = useState<Role>("customer");
  const [service, setService] = useState<ServiceKey>("food");
  const [search, setSearch] = useState("");
  const [driverOnline, setDriverOnline] = useState(true);

  const filteredMerchants = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return merchants;
    return merchants.filter((merchant) =>
      `${merchant.name} ${merchant.category}`.toLowerCase().includes(normalized),
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-[#f4f7fa] text-[#10243a]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="grid size-10 place-items-center rounded-full border border-slate-200 text-lg transition hover:border-[#0b2a4a]"
              aria-label="Back to Biloo Group"
            >
              ←
            </Link>
            <BrandMark />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
              ● Addis Ababa operations live
            </span>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold transition hover:border-[#0b2a4a]">
              Help center
            </button>
            <button className="rounded-full bg-[#0b2a4a] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#0b2a4a]/15 transition hover:-translate-y-0.5">
              MA
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-white px-4 py-6 lg:min-h-[calc(100vh-73px)]">
          <p className="px-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            Experience preview
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {roles.map((item) => (
              <button
                key={item.key}
                onClick={() => setRole(item.key)}
                className={`rounded-2xl px-4 py-3 text-left transition ${
                  role === item.key
                    ? "bg-[#0b2a4a] text-white shadow-lg shadow-[#0b2a4a]/15"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="block text-sm font-black">{item.label}</span>
                <span
                  className={`mt-1 block text-xs ${role === item.key ? "text-white/65" : "text-slate-400"}`}
                >
                  {item.description}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 hidden rounded-3xl bg-[#fff8e7] p-5 lg:block">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              MVP foundation
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              Five service verticals sharing one identity, wallet, location, tracking and support layer.
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[28%] rounded-full bg-[#e1a72f]" />
            </div>
            <p className="mt-2 text-xs font-bold text-amber-800">Phase 1 · Foundation</p>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {role === "customer" && (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] bg-[#0b2a4a] p-6 text-white shadow-[0_24px_70px_rgba(11,42,74,0.18)] sm:p-8">
                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/65">
                      <span>Delivering to</span>
                      <button className="text-[#f0bd4c]">Home · Bole, Addis Ababa⌄</button>
                    </div>
                    <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                      What do you need today?
                    </h1>
                    <p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                      Food, transport, groceries, building supplies and vehicle parts—ordered from one trusted place.
                    </p>
                    <label className="mt-7 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 pl-4 shadow-xl">
                      <span className="text-slate-400">⌕</span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                        placeholder="Search restaurants, products, materials or car parts"
                      />
                      <button className="rounded-xl bg-[#f0bd4c] px-5 py-3 text-sm font-black text-[#0b2a4a]">
                        Search
                      </button>
                    </label>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                          Biloo balance
                        </p>
                        <p className="mt-2 text-3xl font-black">ETB 3,840.00</p>
                      </div>
                      <span className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold">Wallet</span>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        ["＋", "Add money"],
                        ["⇄", "Send"],
                        ["▦", "Scan"],
                      ].map(([icon, label]) => (
                        <button
                          key={label}
                          className="rounded-2xl bg-white/10 px-3 py-4 text-center transition hover:bg-white/15"
                        >
                          <span className="block text-xl">{icon}</span>
                          <span className="mt-2 block text-[11px] font-bold text-white/75">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {services.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setService(item.key)}
                    className={`group rounded-[1.6rem] border p-4 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                      service === item.key
                        ? "border-[#0b2a4a] bg-white shadow-lg shadow-slate-200/70"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <span className={`grid size-11 place-items-center rounded-2xl text-xl ${item.accent}`}>
                      {item.icon}
                    </span>
                    <span className="mt-5 block text-base font-black text-[#10243a]">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.subtitle}</span>
                  </button>
                ))}
              </section>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b27a10]">
                        Recommended nearby
                      </p>
                      <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">Trusted places for you</h2>
                    </div>
                    <button className="text-sm font-black text-[#0b2a4a]">See all →</button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {filteredMerchants.map((merchant, index) => (
                      <button
                        key={merchant.name}
                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 p-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-2xl">
                          {index === 0 ? "🍲" : index === 1 ? "🥬" : "🔧"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-[#10243a]">{merchant.name}</span>
                            <span className="rounded-full bg-[#fff6dd] px-2 py-1 text-[10px] font-black text-amber-700">
                              {merchant.badge}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">{merchant.category}</span>
                          <span className="mt-2 flex items-center gap-3 text-xs font-bold text-slate-500">
                            <span>★ {merchant.rating}</span>
                            <span>•</span>
                            <span>{merchant.fee}</span>
                          </span>
                        </span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100">→</span>
                      </button>
                    ))}
                    {filteredMerchants.length === 0 && (
                      <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center text-sm font-semibold text-slate-500">
                        No matching places found. Try a broader search.
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Live tracking</p>
                      <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">Active orders</h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                      2 active
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {activeOrders.map((order) => (
                      <article key={order.id} className="rounded-2xl bg-[#f6f8fa] p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black text-slate-400">{order.id}</p>
                            <h3 className="mt-1 font-black">{order.title}</h3>
                            <p className="mt-2 text-xs leading-5 text-slate-500">{order.status}</p>
                          </div>
                          <span className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#0b2a4a] shadow-sm">
                            {order.eta}
                          </span>
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0b2a4a]"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <button className="mt-4 w-full rounded-xl bg-white py-3 text-xs font-black text-[#0b2a4a] shadow-sm">
                          Open live map
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {role === "driver" && (
            <div className="space-y-6">
              <section className="rounded-[2rem] bg-[#0b2a4a] p-6 text-white sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                      <StatusDot active={driverOnline} />
                      {driverOnline ? "You are online" : "You are offline"}
                    </div>
                    <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">Good evening, Dawit.</h1>
                    <p className="mt-3 text-white/65">Ready for your next trip or delivery?</p>
                  </div>
                  <button
                    onClick={() => setDriverOnline((value) => !value)}
                    className={`rounded-2xl px-7 py-4 text-sm font-black transition ${
                      driverOnline
                        ? "bg-[#f0bd4c] text-[#0b2a4a]"
                        : "bg-white text-[#0b2a4a]"
                    }`}
                  >
                    {driverOnline ? "Go offline" : "Go online"}
                  </button>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["ETB 2,460", "Today’s earnings"],
                    ["14", "Completed jobs"],
                    ["4.93", "Driver rating"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-5">
                      <p className="text-2xl font-black">{value}</p>
                      <p className="mt-2 text-xs font-semibold text-white/60">{label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Incoming work</p>
                      <h2 className="mt-2 text-2xl font-black">Available jobs nearby</h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">Live</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {driverJobs.map((job) => (
                      <article key={job.type} className="rounded-2xl border border-slate-200 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.13em] text-[#0b2a4a]">{job.type}</p>
                            <p className="mt-4 text-sm font-black">Pickup</p>
                            <p className="mt-1 text-sm text-slate-500">{job.pickup}</p>
                            <p className="mt-3 text-sm font-black">Drop-off</p>
                            <p className="mt-1 text-sm text-slate-500">{job.dropoff}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-[#0b2a4a]">{job.amount}</p>
                            <p className="mt-1 text-xs font-bold text-slate-400">{job.distance}</p>
                          </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <button className="rounded-xl border border-slate-200 py-3 text-sm font-black text-slate-500">Decline</button>
                          <button className="rounded-xl bg-[#0b2a4a] py-3 text-sm font-black text-white">Accept job</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Demand map</p>
                  <h2 className="mt-2 text-2xl font-black">High-demand zones</h2>
                  <div className="relative mt-6 min-h-[420px] overflow-hidden rounded-[1.6rem] bg-[#e8edf1]">
                    <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] [background-size:40px_40px]" />
                    <div className="absolute left-[18%] top-[24%] size-28 rounded-full bg-amber-400/40 blur-sm" />
                    <div className="absolute right-[12%] top-[42%] size-36 rounded-full bg-orange-400/35 blur-sm" />
                    <div className="absolute bottom-[14%] left-[37%] size-24 rounded-full bg-emerald-400/30 blur-sm" />
                    <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#0b2a4a] text-white shadow-xl">●</div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
                      <p className="text-sm font-black">Bole · 2.1× demand</p>
                      <p className="mt-1 text-xs text-slate-500">Estimated 4-minute wait for the next request.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {role === "vendor" && (
            <div className="space-y-6">
              <section className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.17em] text-amber-700">Fresh Corner · Bole branch</p>
                    <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Store operations</h1>
                    <p className="mt-3 text-slate-500">Your store is open and accepting orders.</p>
                  </div>
                  <button className="rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-700">● Store open</button>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["ETB 48,620", "Sales today"],
                    ["38", "Orders today"],
                    ["8", "Preparing now"],
                    ["94.2%", "Acceptance rate"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-[#f6f8fa] p-5">
                      <p className="text-2xl font-black">{value}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b2a4a]">Order queue</p>
                      <h2 className="mt-2 text-2xl font-black">Live orders</h2>
                    </div>
                    <button className="rounded-xl bg-[#0b2a4a] px-4 py-3 text-xs font-black text-white">Manage all</button>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="hidden grid-cols-[0.7fr_1fr_0.8fr_0.8fr] gap-4 bg-slate-50 px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 sm:grid">
                      <span>Order</span><span>Customer</span><span>Total</span><span>Status</span>
                    </div>
                    {vendorOrders.map((order) => (
                      <div key={order.id} className="grid gap-3 border-t border-slate-100 px-5 py-4 first:border-t-0 sm:grid-cols-[0.7fr_1fr_0.8fr_0.8fr] sm:items-center">
                        <span className="font-black">{order.id}</span>
                        <span className="text-sm text-slate-500">{order.customer}</span>
                        <span className="text-sm font-black">{order.total}</span>
                        <span className="w-fit rounded-full bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">{order.status}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-600">Inventory attention</p>
                  <h2 className="mt-2 text-2xl font-black">Low-stock products</h2>
                  <div className="mt-6 space-y-3">
                    {[
                      ["Sunflower oil 5L", "4 left", "Restock"],
                      ["Basmati rice 10kg", "7 left", "Restock"],
                      ["Baby diapers XL", "9 left", "Review"],
                    ].map(([name, stock, action]) => (
                      <div key={name} className="flex items-center gap-4 rounded-2xl bg-[#f6f8fa] p-4">
                        <span className="grid size-11 place-items-center rounded-xl bg-white">▣</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-black">{name}</span>
                          <span className="mt-1 block text-xs font-bold text-rose-600">{stock}</span>
                        </span>
                        <button className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#0b2a4a] shadow-sm">{action}</button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {role === "admin" && (
            <div className="space-y-6">
              <section className="rounded-[2rem] bg-[#0b2a4a] p-6 text-white sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f0bd4c]">BILOO command center</p>
                    <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Operations at a glance.</h1>
                    <p className="mt-4 max-w-2xl text-white/65">Monitor marketplace activity, mobility supply, payments and service health across the platform.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-black">Export report</button>
                    <button className="rounded-2xl bg-[#f0bd4c] px-5 py-3 text-sm font-black text-[#0b2a4a]">Create campaign</button>
                  </div>
                </div>
              </section>

              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {adminStats.map((stat) => (
                  <article key={stat.label} className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                    <p className="text-xs font-bold text-slate-400">{stat.label}</p>
                    <p className="mt-4 text-3xl font-black tracking-[-0.04em]">{stat.value}</p>
                    <p className="mt-3 text-xs font-black text-emerald-600">{stat.change}</p>
                  </article>
                ))}
              </section>

              <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Service performance</p>
                      <h2 className="mt-2 text-2xl font-black">Orders by vertical</h2>
                    </div>
                    <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black">Today⌄</button>
                  </div>
                  <div className="mt-8 space-y-5">
                    {[
                      ["Food delivery", 78, "642 orders"],
                      ["Taxi", 64, "418 trips"],
                      ["Supermarket", 48, "156 orders"],
                      ["Construction", 31, "42 orders"],
                      ["Car parts", 22, "26 orders"],
                    ].map(([label, width, value]) => (
                      <div key={String(label)}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-black">{label}</span>
                          <span className="font-bold text-slate-400">{value}</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#0b2a4a]" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-600">Risk queue</p>
                      <h2 className="mt-2 text-2xl font-black">Needs attention</h2>
                    </div>
                    <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-black text-rose-700">7 open</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      ["Payment reconciliation delay", "High", "12 min ago"],
                      ["Driver verification backlog", "Medium", "36 min ago"],
                      ["Vendor cancellation spike", "Medium", "1 hr ago"],
                    ].map(([title, severity, time]) => (
                      <button key={title} className="w-full rounded-2xl bg-[#f6f8fa] p-4 text-left">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-sm font-black leading-5">{title}</span>
                          <span className={`rounded-full px-2 py-1 text-[10px] font-black ${severity === "High" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{severity}</span>
                        </div>
                        <span className="mt-2 block text-xs text-slate-400">{time}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
