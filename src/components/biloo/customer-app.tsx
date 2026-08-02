"use client";

import { useMemo, useState } from "react";

type ServiceId = "food" | "taxi" | "grocery" | "construction" | "autoparts";
type NavId = "home" | "orders" | "wallet" | "profile";
type IconName =
  | "arrow"
  | "bell"
  | "car"
  | "cart"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "food"
  | "grocery"
  | "hardhat"
  | "heart"
  | "home"
  | "location"
  | "minus"
  | "orders"
  | "parts"
  | "plus"
  | "profile"
  | "search"
  | "shield"
  | "star"
  | "wallet";

type Service = {
  id: ServiceId;
  label: string;
  shortLabel: string;
  description: string;
  icon: IconName;
  surface: string;
};

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  oldPrice?: number;
  eta: string;
  rating: number;
  badge?: string;
  visual: string;
};

const services: Service[] = [
  {
    id: "food",
    label: "Food delivery",
    shortLabel: "Food",
    description: "Restaurants near you",
    icon: "food",
    surface: "from-orange-100 via-amber-50 to-white text-orange-700",
  },
  {
    id: "taxi",
    label: "Taxi booking",
    shortLabel: "Taxi",
    description: "Safe rides, any time",
    icon: "car",
    surface: "from-blue-100 via-sky-50 to-white text-blue-700",
  },
  {
    id: "grocery",
    label: "Supermarket",
    shortLabel: "Market",
    description: "Daily essentials",
    icon: "grocery",
    surface: "from-emerald-100 via-green-50 to-white text-emerald-700",
  },
  {
    id: "construction",
    label: "Construction",
    shortLabel: "Building",
    description: "Materials and tools",
    icon: "hardhat",
    surface: "from-yellow-100 via-amber-50 to-white text-amber-800",
  },
  {
    id: "autoparts",
    label: "Car parts",
    shortLabel: "Auto parts",
    description: "Parts that fit",
    icon: "parts",
    surface: "from-violet-100 via-purple-50 to-white text-violet-700",
  },
];

const products: Record<Exclude<ServiceId, "taxi">, Product[]> = {
  food: [
    {
      id: "food-1",
      name: "Special Kitfo",
      vendor: "Yod Abyssinia",
      category: "Ethiopian",
      price: 680,
      oldPrice: 750,
      eta: "25–35 min",
      rating: 4.8,
      badge: "Popular",
      visual: "🥘",
    },
    {
      id: "food-2",
      name: "Chicken Shawarma",
      vendor: "Bole Grill",
      category: "Fast food",
      price: 320,
      eta: "20–30 min",
      rating: 4.7,
      badge: "Free delivery",
      visual: "🌯",
    },
    {
      id: "food-3",
      name: "Family Pizza",
      vendor: "Roma Kitchen",
      category: "Pizza",
      price: 890,
      oldPrice: 990,
      eta: "30–40 min",
      rating: 4.6,
      visual: "🍕",
    },
    {
      id: "food-4",
      name: "Fasting Beyaynetu",
      vendor: "Habesha Corner",
      category: "Ethiopian",
      price: 420,
      eta: "25–35 min",
      rating: 4.9,
      badge: "Top rated",
      visual: "🍛",
    },
  ],
  grocery: [
    {
      id: "grocery-1",
      name: "Fresh Produce Box",
      vendor: "Fresh Corner",
      category: "Fruit & vegetables",
      price: 950,
      eta: "30–45 min",
      rating: 4.8,
      badge: "Fresh today",
      visual: "🥬",
    },
    {
      id: "grocery-2",
      name: "Family Essentials Pack",
      vendor: "Shoa Supermarket",
      category: "Household",
      price: 2450,
      oldPrice: 2700,
      eta: "45–55 min",
      rating: 4.7,
      visual: "🛒",
    },
    {
      id: "grocery-3",
      name: "Milk & Breakfast Set",
      vendor: "AllMart",
      category: "Dairy & breakfast",
      price: 780,
      eta: "25–40 min",
      rating: 4.6,
      badge: "Everyday value",
      visual: "🥛",
    },
    {
      id: "grocery-4",
      name: "Cleaning Bundle",
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
      id: "construction-1",
      name: "Dangote Cement 50kg",
      vendor: "BuildHub Addis",
      category: "Cement",
      price: 1350,
      eta: "Same day",
      rating: 4.8,
      badge: "Bulk pricing",
      visual: "🏗️",
    },
    {
      id: "construction-2",
      name: "Rebar Steel 12mm",
      vendor: "Abyssinia Steel Supply",
      category: "Steel",
      price: 1850,
      eta: "2–4 hours",
      rating: 4.7,
      visual: "🔩",
    },
    {
      id: "construction-3",
      name: "Interior Paint 20L",
      vendor: "Color House",
      category: "Paint",
      price: 5200,
      oldPrice: 5600,
      eta: "Same day",
      rating: 4.6,
      badge: "Contractor offer",
      visual: "🎨",
    },
    {
      id: "construction-4",
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
      id: "autoparts-1",
      name: "Toyota Brake Pad Set",
      vendor: "Japan Auto Parts",
      category: "Brakes",
      price: 4800,
      eta: "1–2 hours",
      rating: 4.8,
      badge: "Verified fit",
      visual: "🛞",
    },
    {
      id: "autoparts-2",
      name: "12V Premium Battery",
      vendor: "Addis Battery Center",
      category: "Electrical",
      price: 12900,
      oldPrice: 13600,
      eta: "45–75 min",
      rating: 4.7,
      badge: "Installation available",
      visual: "🔋",
    },
    {
      id: "autoparts-3",
      name: "Engine Oil 5W-30",
      vendor: "MotorCare",
      category: "Lubricants",
      price: 3250,
      eta: "35–55 min",
      rating: 4.9,
      visual: "🛢️",
    },
    {
      id: "autoparts-4",
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

const navItems: { id: NavId; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "wallet", label: "Wallet", icon: "wallet" },
  { id: "profile", label: "Profile", icon: "profile" },
];

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="m9 18 6-6-6-6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    car: <><path d="m5 17-1 2v1h2l1-2h10l1 2h2v-1l-1-2" /><path d="M5 17h14l-1.5-7h-11z" /><path d="M8 14h.01M16 14h.01" /><path d="m7 10 1-3h8l1 3" /></>,
    cart: <><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M3 4h2l2.4 10.4A2 2 0 0 0 9.3 16H18a2 2 0 0 0 1.9-1.4L22 8H6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    food: <><path d="M7 3v8" /><path d="M4 3v4a3 3 0 0 0 6 0V3" /><path d="M7 11v10" /><path d="M17 3v18" /><path d="M17 3c-2 2-3 4-3 7h3" /></>,
    grocery: <><path d="M4 10h16l-1.5 10h-13z" /><path d="m8 10 4-7 4 7" /><path d="M8 14v2M12 14v2M16 14v2" /></>,
    hardhat: <><path d="M4 15v-2a8 8 0 0 1 16 0v2" /><path d="M2 15h20v4H2z" /><path d="M12 5v6" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    minus: <path d="M5 12h14" />,
    orders: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    parts: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l7.2 7.2a2.2 2.2 0 1 1-3.1 3.1l-7.2-7.2" /><path d="m5 21 4.5-4.5" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
    star: <path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3.1L6.1 20l1.1-6.4L2.5 9 9 8z" />,
    wallet: <><path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" /><path d="M16 12h6v4h-6a2 2 0 0 1 0-4Z" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BilooCustomerApp() {
  const [activeService, setActiveService] = useState<ServiceId>("food");
  const [activeNav, setActiveNav] = useState<NavId>("home");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [location, setLocation] = useState("Bole, Addis Ababa");
  const [locating, setLocating] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [pickup, setPickup] = useState("Current location");
  const [destination, setDestination] = useState("");
  const [rideBooked, setRideBooked] = useState(false);
  const [notice, setNotice] = useState("Welcome to Biloo");

  const activeServiceInfo = services.find((service) => service.id === activeService)!;
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, count]) => {
    const product = Object.values(products)
      .flat()
      .find((item) => item.id === id);
    return total + (product?.price ?? 0) * count;
  }, 0);

  const visibleProducts = useMemo(() => {
    if (activeService === "taxi") return [];
    const query = search.trim().toLowerCase();
    if (!query) return products[activeService];
    return products[activeService].filter((product) =>
      [product.name, product.vendor, product.category].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [activeService, search]);

  function changeQuantity(productId: string, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[productId] ?? 0) + delta);
      const updated = { ...current };
      if (next === 0) delete updated[productId];
      else updated[productId] = next;
      return updated;
    });
    setNotice(delta > 0 ? "Added to your Biloo basket" : "Basket updated");
  }

  function detectLocation() {
    setLocating(true);
    if (!navigator.geolocation) {
      setLocation("Location service unavailable");
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
        setNotice("Using your saved delivery location");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function selectService(serviceId: ServiceId) {
    setActiveService(serviceId);
    setActiveNav("home");
    setSearch("");
    setNotice(`${services.find((service) => service.id === serviceId)?.label} selected`);
  }

  function bookRide() {
    if (!destination.trim()) {
      setNotice("Enter your destination to request a ride");
      return;
    }
    setRideBooked(true);
    setShowTracker(true);
    setNotice("Your Biloo driver is being assigned");
  }

  return (
    <main className="min-h-screen bg-[#eef3ff] text-slate-950">
      <div className="mx-auto min-h-screen max-w-[1600px] lg:grid lg:grid-cols-[260px_minmax(0,1fr)_360px]">
        <aside className="hidden border-r border-slate-200/80 bg-[#07142f] px-6 py-8 text-white lg:flex lg:flex-col">
          <a className="focus-ring flex items-center gap-3 rounded-2xl" href="/">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 text-lg font-black shadow-lg shadow-blue-950/30">
              B
            </span>
            <span>
              <strong className="block text-xl tracking-[-0.04em]">BILOO</strong>
              <span className="text-xs text-blue-200/70">Everything, one app</span>
            </span>
          </a>

          <nav className="mt-12 space-y-2" aria-label="Biloo desktop navigation">
            {navItems.map((item) => (
              <button
                className={`focus-ring flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                  activeNav === item.id
                    ? "bg-white text-[#07142f] shadow-xl shadow-black/10"
                    : "text-blue-100/70 hover:bg-white/8 hover:text-white"
                }`}
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                type="button"
              >
                <Icon className="h-5 w-5" name={item.icon} />
                {item.label}
                {item.id === "orders" && (
                  <span className="ml-auto rounded-full bg-blue-500 px-2 py-0.5 text-[10px] text-white">1</span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-9">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/40">Services</p>
            <div className="mt-3 space-y-1">
              {services.map((service) => (
                <button
                  className={`focus-ring flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activeService === service.id
                      ? "bg-blue-500/20 text-white"
                      : "text-blue-100/55 hover:bg-white/5 hover:text-white"
                  }`}
                  key={service.id}
                  onClick={() => selectService(service.id)}
                  type="button"
                >
                  <Icon className="h-4 w-4" name={service.icon} />
                  {service.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-500/25 to-violet-500/15 p-5">
            <Icon className="h-7 w-7 text-blue-300" name="shield" />
            <p className="mt-4 text-sm font-semibold">Biloo Safety</p>
            <p className="mt-2 text-xs leading-5 text-blue-100/60">Verified drivers, protected payments, and live support on every order.</p>
            <button className="focus-ring mt-4 text-xs font-bold text-blue-300" type="button">Open safety center →</button>
          </div>
        </aside>

        <section className="min-w-0 pb-28 lg:pb-8">
          <header className="sticky top-0 z-30 border-b border-white/70 bg-[#eef3ff]/90 px-4 py-4 backdrop-blur-2xl sm:px-7 lg:px-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3 lg:hidden">
                <a className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#0b2d6f] font-black text-white" href="/">B</a>
                <button className="focus-ring min-w-0 text-left" onClick={detectLocation} type="button">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Deliver to</span>
                  <span className="flex items-center gap-1 truncate text-sm font-bold">
                    {locating ? "Finding you…" : location}
                    <Icon className="h-3.5 w-3.5" name="chevron" />
                  </span>
                </button>
              </div>

              <button className="focus-ring hidden items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-left shadow-sm ring-1 ring-slate-200/70 lg:flex" onClick={detectLocation} type="button">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-4 w-4" name="location" /></span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Your location</span>
                  <span className="flex items-center gap-2 text-sm font-bold">{locating ? "Finding location…" : location}<Icon className="h-3.5 w-3.5" name="chevron" /></span>
                </span>
              </button>

              <label className="relative hidden max-w-xl flex-1 lg:block">
                <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" name="search" />
                <input
                  className="focus-ring h-12 w-full rounded-2xl border border-slate-200/80 bg-white pl-12 pr-4 text-sm shadow-sm outline-none placeholder:text-slate-400"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${activeServiceInfo.shortLabel.toLowerCase()}...`}
                  value={search}
                />
              </label>

              <div className="flex items-center gap-2">
                <button className="focus-ring relative grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/70" type="button">
                  <Icon className="h-5 w-5" name="bell" />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
                <button className="focus-ring relative grid h-11 w-11 place-items-center rounded-2xl bg-[#0b2d6f] text-white shadow-sm lg:hidden" type="button">
                  <Icon className="h-5 w-5" name="cart" />
                  {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold">{cartCount}</span>}
                </button>
                <button className="focus-ring hidden items-center gap-3 rounded-2xl bg-white p-1.5 pr-4 text-left shadow-sm ring-1 ring-slate-200/70 sm:flex" type="button">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-200 to-blue-200 text-sm font-black text-blue-900">MA</span>
                  <span className="hidden lg:block"><strong className="block text-xs">Mahir Aman</strong><span className="text-[10px] text-slate-400">Biloo customer</span></span>
                </button>
              </div>
            </div>

            <label className="relative mt-4 block lg:hidden">
              <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" name="search" />
              <input
                className="focus-ring h-12 w-full rounded-2xl border border-white bg-white/95 pl-12 pr-4 text-sm shadow-sm outline-none placeholder:text-slate-400"
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${activeServiceInfo.shortLabel.toLowerCase()}...`}
                value={search}
              />
            </label>
          </header>

          <div className="px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
            <div className="overflow-hidden rounded-[2rem] bg-[#0b2d6f] text-white shadow-2xl shadow-blue-950/15">
              <div className="relative grid min-h-64 gap-8 px-6 py-8 sm:px-9 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-11">
                <div className="relative z-10 max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live across Addis Ababa
                  </span>
                  <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">Your city, delivered through one app.</h1>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100/70 sm:text-base">Food, rides, groceries, building materials, and genuine car parts—connected by Biloo.</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button className="focus-ring app-action inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#0b2d6f] shadow-lg" onClick={() => selectService("taxi")} type="button">Book a ride <Icon className="h-4 w-4" name="arrow" /></button>
                    <button className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white" onClick={() => selectService("food")} type="button">Order now</button>
                  </div>
                </div>
                <div className="relative hidden min-h-48 lg:block">
                  <div className="absolute right-5 top-0 h-44 w-44 rounded-full bg-blue-400/30 blur-3xl" />
                  <div className="absolute bottom-0 right-0 grid h-48 w-64 rotate-[-4deg] place-items-center rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl backdrop-blur-xl">
                    <span className="text-8xl drop-shadow-2xl">🛵</span>
                  </div>
                  <div className="absolute bottom-7 left-0 rounded-2xl border border-white/15 bg-white/15 p-4 shadow-xl backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100/60">Average arrival</p>
                    <p className="mt-1 text-2xl font-black">8 min</p>
                  </div>
                </div>
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[50px] border-blue-400/10" />
              </div>
            </div>

            <section className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Explore Biloo</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em] sm:text-3xl">What do you need today?</h2></div>
                <button className="focus-ring hidden text-sm font-bold text-blue-700 sm:block" type="button">See all services</button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {services.map((service) => (
                  <button
                    className={`focus-ring group min-h-36 rounded-[1.6rem] border p-4 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                      activeService === service.id
                        ? "border-blue-500 bg-white shadow-xl shadow-blue-900/10 ring-2 ring-blue-500/10"
                        : "border-white/80 bg-white/80 shadow-sm"
                    }`}
                    key={service.id}
                    onClick={() => selectService(service.id)}
                    type="button"
                  >
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${service.surface}`}><Icon className="h-6 w-6" name={service.icon} /></span>
                    <strong className="mt-5 block text-sm tracking-tight">{service.shortLabel}</strong>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{service.description}</span>
                  </button>
                ))}
              </div>
            </section>

            {activeService === "taxi" ? (
              <section className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-7">
                  <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Biloo Ride</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Where are you going?</h2></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-6 w-6" name="car" /></span></div>
                  <div className="relative mt-7 space-y-3 before:absolute before:bottom-9 before:left-[1.18rem] before:top-9 before:border-l before:border-dashed before:border-blue-300">
                    <label className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5"><span className="relative z-10 h-2.5 w-2.5 rounded-full border-[3px] border-blue-600 bg-white" /><input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" onChange={(event) => setPickup(event.target.value)} value={pickup} /></label>
                    <label className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm"><span className="relative z-10 h-2.5 w-2.5 rounded-sm bg-rose-500" /><input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-slate-400" onChange={(event) => setDestination(event.target.value)} placeholder="Enter destination" value={destination} /></label>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[{name:"Economy",price:"From 180 ETB",icon:"🚕"},{name:"Comfort",price:"From 260 ETB",icon:"🚙"},{name:"Delivery",price:"From 150 ETB",icon:"🛵"}].map((ride, index) => <button className={`focus-ring rounded-2xl border p-3 text-left ${index === 0 ? "border-blue-500 bg-blue-50" : "border-slate-200"}`} key={ride.name} type="button"><span className="text-2xl">{ride.icon}</span><strong className="mt-2 block text-xs">{ride.name}</strong><span className="mt-1 block text-[10px] text-slate-400">{ride.price}</span></button>)}
                  </div>
                  <button className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b2d6f] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15" onClick={bookRide} type="button">Find a driver <Icon className="h-4 w-4" name="arrow" /></button>
                </div>
                <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-[#d9e7da] shadow-sm ring-1 ring-slate-200/70">
                  <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(35deg, transparent 46%, white 47%, white 52%, transparent 53%), linear-gradient(-35deg, transparent 46%, white 47%, white 52%, transparent 53%)", backgroundSize: "110px 90px" }} />
                  <div className="absolute left-[18%] top-[23%] grid h-10 w-10 place-items-center rounded-full bg-[#0b2d6f] text-white shadow-xl"><Icon className="h-5 w-5" name="location" /></div>
                  <div className="absolute bottom-[25%] right-[18%] grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-rose-500 text-white shadow-xl"><Icon className="h-5 w-5" name="location" /></div>
                  <div className="absolute left-[25%] top-[30%] h-[45%] w-[55%] rotate-12 rounded-[50%] border-[5px] border-dashed border-blue-600/70" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-bold">Drivers nearby</p><p className="mt-1 text-[11px] text-slate-500">12 verified drivers within 2 km</p></div><span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online</span></div></div>
                </div>
              </section>
            ) : (
              <section className="mt-8">
                <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{activeServiceInfo.label}</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Recommended near you</h2></div><button className="focus-ring text-sm font-bold text-blue-700" type="button">View all</button></div>
                {visibleProducts.length === 0 ? (
                  <div className="mt-5 rounded-[2rem] bg-white p-10 text-center ring-1 ring-slate-200/70"><Icon className="mx-auto h-8 w-8 text-slate-300" name="search" /><h3 className="mt-4 font-bold">No matching products</h3><p className="mt-2 text-sm text-slate-400">Try another product, category, or store.</p></div>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                    {visibleProducts.map((product) => {
                      const quantity = cart[product.id] ?? 0;
                      return (
                        <article className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl" key={product.id}>
                          <div className="relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50"><span className="text-7xl transition group-hover:scale-110">{product.visual}</span>{product.badge && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-blue-700 shadow-sm">{product.badge}</span>}<button aria-label={`Save ${product.name}`} className="focus-ring absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-slate-500 shadow-sm" type="button"><Icon className="h-4 w-4" name="heart" /></button></div>
                          <div className="p-4"><div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400"><span className="flex items-center gap-1 text-amber-500"><Icon className="h-3 w-3 fill-current" name="star" /> {product.rating}</span><span>•</span><span className="flex items-center gap-1"><Icon className="h-3 w-3" name="clock" /> {product.eta}</span></div><h3 className="mt-3 font-bold tracking-tight">{product.name}</h3><p className="mt-1 text-xs text-slate-400">{product.vendor} · {product.category}</p><div className="mt-4 flex items-end justify-between gap-3"><div><strong className="text-sm text-blue-800">{formatMoney(product.price)}</strong>{product.oldPrice && <span className="ml-2 text-[10px] text-slate-400 line-through">{formatMoney(product.oldPrice)}</span>}</div>{quantity === 0 ? <button className="focus-ring grid h-9 w-9 place-items-center rounded-xl bg-[#0b2d6f] text-white shadow-lg shadow-blue-900/15" onClick={() => changeQuantity(product.id, 1)} type="button"><Icon className="h-4 w-4" name="plus" /></button> : <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-1"><button className="focus-ring grid h-7 w-7 place-items-center rounded-lg bg-white text-blue-800" onClick={() => changeQuantity(product.id, -1)} type="button"><Icon className="h-3.5 w-3.5" name="minus" /></button><span className="min-w-4 text-center text-xs font-black text-blue-900">{quantity}</span><button className="focus-ring grid h-7 w-7 place-items-center rounded-lg bg-blue-700 text-white" onClick={() => changeQuantity(product.id, 1)} type="button"><Icon className="h-3.5 w-3.5" name="plus" /></button></div>}</div></div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            <section className="mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600 p-6 text-white shadow-xl sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">Biloo Plus</span><h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">Free delivery. Better ride prices.</h2><p className="mt-2 text-sm text-blue-100/75">Join the early-access membership list and unlock launch benefits.</p></div><button className="focus-ring app-action shrink-0 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-800" type="button">Join early access</button></div>
            </section>
          </div>
        </section>

        <aside className="hidden border-l border-slate-200/80 bg-white/70 px-6 py-8 backdrop-blur-xl lg:block">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Current activity</p><h2 className="mt-1 text-xl font-black tracking-[-0.04em]">Your Biloo</h2></div><button className="focus-ring grid h-10 w-10 place-items-center rounded-2xl bg-slate-100" type="button"><Icon className="h-4 w-4" name="orders" /></button></div>

          <div className="mt-6 rounded-[1.75rem] bg-[#07142f] p-5 text-white shadow-xl shadow-blue-950/10">
            <div className="flex items-start justify-between gap-4"><div><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> On the way</span><h3 className="mt-3 font-bold">Order #BL-2048</h3><p className="mt-1 text-xs text-blue-100/55">Chicken Shawarma · Bole Grill</p></div><span className="text-3xl">🛵</span></div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" /></div>
            <div className="mt-4 flex items-center justify-between"><div><p className="text-[10px] text-blue-100/45">Estimated arrival</p><p className="mt-1 text-lg font-black">12–16 min</p></div><button className="focus-ring rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#07142f]" onClick={() => setShowTracker(true)} type="button">Track live</button></div>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Biloo Wallet</p><p className="mt-1 text-2xl font-black tracking-[-0.04em]">ETB 2,450</p></div><span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" name="wallet" /></span></div>
            <div className="mt-5 grid grid-cols-2 gap-2"><button className="focus-ring rounded-xl bg-[#0b2d6f] px-3 py-3 text-xs font-bold text-white" type="button">Add money</button><button className="focus-ring rounded-xl bg-slate-100 px-3 py-3 text-xs font-bold" type="button">Transactions</button></div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400"><Icon className="h-3.5 w-3.5 text-emerald-500" name="shield" /> Payments protected by Biloo</div>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between"><h3 className="text-sm font-bold">Basket</h3><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">{cartCount} items</span></div>
            {cartCount === 0 ? <div className="py-8 text-center"><span className="text-4xl">🧺</span><p className="mt-3 text-xs font-semibold text-slate-500">Your basket is ready</p><p className="mt-1 text-[10px] text-slate-400">Add something from any Biloo store.</p></div> : <><div className="mt-5 space-y-3">{Object.entries(cart).slice(0, 3).map(([id, quantity]) => { const product = Object.values(products).flat().find((item) => item.id === id); return product ? <div className="flex items-center gap-3" key={id}><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-xl">{product.visual}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{product.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{quantity} × {formatMoney(product.price)}</p></div><button className="focus-ring text-slate-400" onClick={() => changeQuantity(id, -1)} type="button"><Icon className="h-4 w-4" name="close" /></button></div> : null; })}</div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">Subtotal</span><strong className="text-sm">{formatMoney(cartTotal)}</strong></div><button className="focus-ring mt-4 w-full rounded-xl bg-[#0b2d6f] px-4 py-3 text-xs font-bold text-white" type="button">Continue to checkout</button></>}
          </div>
        </aside>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden" aria-label="Biloo mobile navigation">
        <div className="mx-auto grid max-w-md grid-cols-4">{navItems.map((item) => <button className={`focus-ring relative flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-bold ${activeNav === item.id ? "text-blue-800" : "text-slate-400"}`} key={item.id} onClick={() => setActiveNav(item.id)} type="button"><Icon className="h-5 w-5" name={item.icon} />{item.label}{item.id === "orders" && <span className="absolute right-[27%] top-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />}</button>)}</div>
      </nav>

      <div className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8"><div className="animate-[fadeIn_.25s_ease-out] whitespace-nowrap rounded-full bg-slate-950/90 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-xl" aria-live="polite">{notice}</div></div>

      {showTracker && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Live order tracking">
          <div className="w-full max-w-lg overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
            <div className="relative h-56 overflow-hidden bg-[#dce8dc]"><div className="absolute inset-0 opacity-65" style={{ backgroundImage: "linear-gradient(30deg, transparent 46%, white 47%, white 53%, transparent 54%), linear-gradient(-30deg, transparent 46%, white 47%, white 53%, transparent 54%)", backgroundSize: "95px 75px" }} /><div className="absolute left-[16%] top-[24%] h-[48%] w-[64%] rotate-6 rounded-[50%] border-[5px] border-dashed border-blue-700/70" /><span className="absolute left-[26%] top-[31%] text-4xl drop-shadow-xl">🛵</span><span className="absolute bottom-[20%] right-[14%] grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-rose-500 text-white shadow-xl"><Icon className="h-5 w-5" name="location" /></span><button className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-lg" onClick={() => setShowTracker(false)} type="button"><Icon className="h-5 w-5" name="close" /></button></div>
            <div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {rideBooked ? "Driver assigned" : "On the way"}</span><h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">{rideBooked ? "Your ride is arriving" : "Your order is moving"}</h2><p className="mt-2 text-sm text-slate-500">{rideBooked ? `${pickup} → ${destination}` : "Your Biloo courier is heading to Bole."}</p></div><div className="text-right"><p className="text-[10px] text-slate-400">Arrival</p><strong className="text-xl">8 min</strong></div></div><div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-200 to-violet-200 font-black text-blue-900">DA</span><div className="min-w-0 flex-1"><p className="text-sm font-bold">Dawit Alemu</p><p className="mt-0.5 text-xs text-slate-400">4.9 rating · Verified driver</p></div><button className="focus-ring rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-blue-800 shadow-sm" type="button">Call</button></div><div className="mt-5 flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-slate-500"><Icon className="h-4 w-4 text-emerald-500" name="shield" /> Biloo protected trip</span><button className="focus-ring font-bold text-blue-700" type="button">Get help</button></div></div>
          </div>
        </div>
      )}
    </main>
  );
}
