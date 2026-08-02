"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Workspace = "customer" | "driver" | "vendor" | "admin";
type Service = "food" | "ride" | "market" | "build" | "auto";

const workspaces: { id: Workspace; label: string; icon: string }[] = [
  { id: "customer", label: "Customer", icon: "⌂" },
  { id: "driver", label: "Driver", icon: "↗" },
  { id: "vendor", label: "Vendor", icon: "▦" },
  { id: "admin", label: "Admin", icon: "◫" },
];

const services: { id: Service; name: string; label: string; icon: string; time: string; card: string; accent: string }[] = [
  { id: "food", name: "Food", label: "Restaurants", icon: "🍲", time: "25–40 min", card: "bg-orange-50", accent: "bg-orange-500" },
  { id: "ride", name: "Ride", label: "Taxi", icon: "🚕", time: "3 min away", card: "bg-blue-50", accent: "bg-blue-600" },
  { id: "market", name: "Market", label: "Supermarket", icon: "🛒", time: "Same day", card: "bg-emerald-50", accent: "bg-emerald-600" },
  { id: "build", name: "Build", label: "Construction", icon: "🏗️", time: "Scheduled", card: "bg-amber-50", accent: "bg-amber-600" },
  { id: "auto", name: "Auto", label: "Car parts", icon: "⚙️", time: "Verified stock", card: "bg-violet-50", accent: "bg-violet-600" },
];

const catalog: Record<Service, { name: string; meta: string; price: string; rating: string; gradient: string }[]> = {
  food: [
    { name: "Habesha Kitchen", meta: "Ethiopian · 28 min · Free delivery", price: "From ETB 180", rating: "4.9", gradient: "from-orange-300 to-rose-400" },
    { name: "Addis Burger House", meta: "Burgers · 32 min · Bole", price: "From ETB 260", rating: "4.8", gradient: "from-amber-300 to-orange-400" },
    { name: "Green Bowl", meta: "Healthy · 24 min · Kazanchis", price: "From ETB 210", rating: "4.7", gradient: "from-emerald-300 to-cyan-300" },
  ],
  ride: [
    { name: "Biloo Economy", meta: "Everyday city ride · 3 min away", price: "ETB 96 estimate", rating: "4.9", gradient: "from-blue-500 to-cyan-400" },
    { name: "Biloo Comfort", meta: "Newer cars · Extra space", price: "ETB 145 estimate", rating: "4.9", gradient: "from-slate-700 to-slate-500" },
    { name: "Biloo Van", meta: "Groups and large items", price: "ETB 220 estimate", rating: "4.8", gradient: "from-indigo-500 to-blue-400" },
  ],
  market: [
    { name: "Fresh Corner", meta: "Groceries · 35 min · 1.2 km", price: "ETB 50 delivery", rating: "4.8", gradient: "from-emerald-400 to-teal-300" },
    { name: "Family Supermarket", meta: "Household · Same-day delivery", price: "Free above ETB 1,500", rating: "4.7", gradient: "from-cyan-200 to-pink-200" },
    { name: "Organic Addis", meta: "Produce · Dairy · Bakery", price: "ETB 65 delivery", rating: "4.9", gradient: "from-lime-300 to-yellow-200" },
  ],
  build: [
    { name: "Abay Construction Supply", meta: "Cement · Rebar · Blocks", price: "Bulk quotations", rating: "4.8", gradient: "from-amber-400 to-orange-300" },
    { name: "BuildPro Addis", meta: "Tools · Safety · Electrical", price: "From ETB 120", rating: "4.7", gradient: "from-yellow-200 to-cyan-200" },
    { name: "Ethio Aggregate", meta: "Sand · Gravel · Site delivery", price: "Request truck quote", rating: "4.8", gradient: "from-stone-400 to-amber-300" },
  ],
  auto: [
    { name: "AutoHub Ethiopia", meta: "Toyota · Hyundai · Kia", price: "VIN matching available", rating: "4.9", gradient: "from-indigo-500 to-violet-500" },
    { name: "German Parts Addis", meta: "Mercedes · BMW · Volkswagen", price: "Verified originals", rating: "4.8", gradient: "from-cyan-500 to-indigo-800" },
    { name: "QuickFix Parts", meta: "Filters · Brakes · Batteries", price: "Delivery in 45 min", rating: "4.7", gradient: "from-violet-300 to-pink-300" },
  ],
};

function Metric({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,.06)]">
      <p className="text-3xl font-black tracking-[-.055em] text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-5 w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">{note}</p>
    </article>
  );
}

function MapCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.7rem] bg-[#e8f0ea] ${compact ? "h-52" : "h-72"}`}>
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(35deg,transparent_45%,white_46%,white_53%,transparent_54%),linear-gradient(120deg,transparent_46%,white_47%,white_52%,transparent_53%)] [background-size:90px_90px,130px_130px]" />
      <div className="absolute left-[30%] top-[57%] h-4 w-4 rounded-full border-4 border-white bg-orange-500 shadow-lg" />
      <div className="absolute right-[19%] top-[25%] grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-slate-950 text-lg shadow-xl">🛵</div>
      <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
        <p className="text-[10px] font-black uppercase tracking-[.15em] text-slate-400">Live route</p>
        <p className="mt-1 text-sm font-black">Bole → Kazanchis</p>
      </div>
      <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xs font-black shadow">GPS active</span>
    </div>
  );
}

function Customer() {
  const [service, setService] = useState<Service>("food");
  const [search, setSearch] = useState("");
  const active = services.find((item) => item.id === service)!;
  const results = useMemo(() => catalog[service].filter((item) => `${item.name} ${item.meta}`.toLowerCase().includes(search.toLowerCase())), [search, service]);

  return (
    <div className="space-y-7 pb-24 lg:pb-4">
      <section className="overflow-hidden rounded-[2rem] bg-[#10231b] p-6 text-white shadow-[0_30px_80px_rgba(16,35,27,.2)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-2 text-xs font-black text-white/70">✦ Everything you need, one Biloo</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[.96] tracking-[-.065em] sm:text-6xl">Where should we help you today?</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/60">Food, rides, groceries, construction supplies and car parts through one trusted local platform.</p>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/7 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffcf4a] text-xl">📍</span><div><p className="text-[10px] font-black uppercase tracking-[.15em] text-white/40">Deliver to</p><p className="mt-1 font-black">Bole, Addis Ababa</p></div><span className="ml-auto text-white/35">›</span></div>
            <label className="mt-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-slate-900"><span>⌕</span><input className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-slate-400" onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${active.name.toLowerCase()}...`} value={search} /></label>
          </div>
        </div>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[.16em] text-orange-500">Biloo services</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-.045em]">One app. Five everyday needs.</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {services.map((item) => {
            const selected = item.id === service;
            return <button aria-pressed={selected} className={`min-h-44 rounded-[1.7rem] border p-4 text-left transition active:scale-[.98] ${selected ? "border-slate-950 bg-slate-950 text-white shadow-xl" : `border-transparent ${item.card} hover:-translate-y-1`}`} key={item.id} onClick={() => { setService(item.id); setSearch(""); }} type="button"><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${selected ? "bg-white/10" : `${item.accent} text-white`}`}>{item.icon}</span><p className={`mt-5 text-[10px] font-black uppercase tracking-[.15em] ${selected ? "text-white/40" : "text-slate-400"}`}>{item.label}</p><p className="mt-1 text-xl font-black">{item.name}</p><p className={`mt-2 text-xs font-bold ${selected ? "text-white/55" : "text-slate-500"}`}>{item.time}</p></button>;
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.15em] text-slate-400">Explore {active.label}</p><h2 className="mt-2 text-2xl font-black tracking-[-.04em]">Recommended for you</h2></div><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl text-white ${active.accent}`}>{active.icon}</span></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {results.map((item) => <article className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,.055)] transition hover:-translate-y-1" key={item.name}><div className={`relative h-32 bg-gradient-to-br ${item.gradient}`}><span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-xl shadow">{active.icon}</span><span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-black">★ {item.rating}</span></div><div className="p-4"><h3 className="text-lg font-black tracking-[-.025em]">{item.name}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{item.meta}</p><div className="mt-4 flex items-center justify-between gap-3"><p className="text-sm font-black">{item.price}</p><button className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white group-hover:bg-orange-500" type="button">→</button></div></div></article>)}
          </div>
        </div>
        <aside className="rounded-[1.9rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,.07)]"><div className="flex items-center justify-between px-1 pb-4"><div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-600">On the way</p><p className="mt-1 text-lg font-black">Order #BL-2048</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">12 min</span></div><MapCard compact /><div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white">A</span><div><p className="text-sm font-black">Abel · Delivery partner</p><p className="mt-1 text-xs font-bold text-slate-500">Toyota Vitz · Code 4921</p></div><button className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white shadow" type="button">☎</button></div></aside>
      </section>
    </div>
  );
}

function Driver() {
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState(false);
  return <div className="space-y-6 pb-24 lg:pb-4"><section className="rounded-[2rem] bg-[#101827] p-6 text-white sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-cyan-300">Driver command center</p><h1 className="mt-3 text-4xl font-black tracking-[-.055em]">Good evening, Dawit.</h1><p className="mt-3 text-white/55">Drive safely. Earn clearly. Stay in control.</p></div><button className={`min-h-14 rounded-full px-5 font-black ${online ? "bg-emerald-400 text-emerald-950" : "bg-white/10"}`} onClick={() => setOnline(!online)} type="button">● {online ? "You are online" : "Go online"}</button></div></section><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Today’s earnings" note="+18%" value="ETB 1,840" /><Metric label="Completed today" note="12 trips" value="12" /><Metric label="Driver rating" note="Excellent" value="4.93" /><Metric label="Online time" note="6h 24m" value="6:24" /></section><section className="grid gap-6 xl:grid-cols-[1fr_22rem]"><div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.14em] text-blue-600">{accepted ? "Active trip" : "New ride request"}</p><h2 className="mt-2 text-2xl font-black tracking-[-.04em]">Bole Atlas → Mexico Square</h2></div><span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">ETB 238</span></div><div className="mt-5"><MapCard /></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Pickup", "1.8 km"], ["Trip", "7.4 km"], ["Payment", "Biloo Pay"]].map(([a,b]) => <div className="rounded-2xl bg-slate-50 p-4" key={a}><p className="text-xs font-bold text-slate-400">{a}</p><p className="mt-2 text-lg font-black">{b}</p></div>)}</div><div className="mt-5 flex gap-3">{accepted ? <button className="min-h-14 w-full rounded-full bg-blue-600 font-black text-white" type="button">Navigate to pickup</button> : <><button className="min-h-14 flex-1 rounded-full border border-slate-200 font-black" type="button">Decline</button><button className="min-h-14 flex-[1.5] rounded-full bg-slate-950 font-black text-white" onClick={() => setAccepted(true)} type="button">Accept ride</button></>}</div></div><aside className="space-y-4"><div className="rounded-[1.8rem] border border-slate-200 bg-white p-5"><div className="flex justify-between"><h3 className="font-black">Earnings goal</h3><span className="font-black text-emerald-600">74%</span></div><div className="mt-5 h-3 rounded-full bg-slate-100"><div className="h-full w-[74%] rounded-full bg-emerald-500" /></div><p className="mt-3 text-sm font-bold text-slate-500">ETB 1,840 of ETB 2,500</p></div><div className="rounded-[1.8rem] bg-amber-50 p-5"><span className="text-2xl">✦</span><h3 className="mt-4 text-xl font-black">Peak bonus active</h3><p className="mt-2 text-sm leading-6 text-slate-600">Complete 3 more trips before 10 PM and earn ETB 300 extra.</p></div></aside></section></div>;
}

const orderRows = [
  ["#2048", "Samira M.", "2x Special Kitfo, Tibs", "ETB 860", "Preparing", "bg-amber-50 text-amber-700"],
  ["#2047", "Nahom T.", "Family combo, 3 drinks", "ETB 1,240", "Ready", "bg-emerald-50 text-emerald-700"],
  ["#2046", "Hana K.", "Shiro, Firfir, water", "ETB 470", "Courier assigned", "bg-blue-50 text-blue-700"],
  ["#2045", "Yonas G.", "Doro Wot platter", "ETB 980", "Delivered", "bg-slate-100 text-slate-600"],
];

function Vendor() {
  const [open, setOpen] = useState(true);
  return <div className="space-y-6 pb-24 lg:pb-4"><section className="rounded-[2rem] bg-[#5a2d13] p-6 text-white sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-[#ffcf4a] text-2xl font-black text-[#5a2d13]">H</span><div><p className="text-xs font-black uppercase tracking-[.15em] text-amber-200">Vendor workspace</p><h1 className="mt-2 text-3xl font-black tracking-[-.05em]">Habesha Kitchen</h1><p className="mt-1 text-sm font-bold text-white/55">Bole Atlas · Restaurant</p></div></div><button className={`min-h-14 rounded-full px-5 font-black ${open ? "bg-emerald-400 text-emerald-950" : "bg-white/10"}`} onClick={() => setOpen(!open)} type="button">● {open ? "Store is open" : "Store is closed"}</button></div></section><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Today’s sales" note="+12.8%" value="ETB 18.4K" /><Metric label="Orders today" note="38 orders" value="38" /><Metric label="Average prep time" note="28 min" value="28m" /><Metric label="Customer rating" note="Top 8%" value="4.91" /></section><section className="grid gap-6 xl:grid-cols-[1fr_22rem]"><div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg"><div className="flex items-center justify-between border-b border-slate-100 p-6"><div><p className="text-xs font-black uppercase tracking-[.14em] text-orange-500">Live operations</p><h2 className="mt-2 text-2xl font-black">Incoming orders</h2></div><button className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white" type="button">Manage menu</button></div><div className="divide-y divide-slate-100">{orderRows.map((row) => <article className="grid gap-4 p-5 sm:grid-cols-[5rem_1fr_auto_auto] sm:items-center sm:px-6" key={row[0]}><p className="text-sm font-black">{row[0]}</p><div><p className="font-black">{row[1]}</p><p className="mt-1 text-xs font-bold text-slate-500">{row[2]}</p></div><p className="text-sm font-black">{row[3]}</p><span className={`w-fit rounded-full px-3 py-2 text-xs font-black ${row[5]}`}>{row[4]}</span></article>)}</div></div><aside className="space-y-4"><div className="rounded-[1.8rem] border border-slate-200 bg-white p-5"><div className="flex justify-between"><h3 className="font-black">Inventory alerts</h3><span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-black text-red-600">3 low</span></div>{["Beef fillet", "Teff injera", "Sparkling water"].map((item, index) => <div className="mt-3 rounded-2xl bg-slate-50 p-3" key={item}><p className="text-sm font-black">{item}</p><p className="mt-1 text-xs font-black text-red-500">{index + 2} remaining</p></div>)}</div><div className="rounded-[1.8rem] bg-blue-50 p-5"><span className="text-2xl">💳</span><h3 className="mt-4 text-xl font-black">Next payout</h3><p className="mt-2 text-sm leading-6 text-slate-600">ETB 42,780 scheduled for Monday after reconciliation.</p></div></aside></section></div>;
}

const performance = [
  ["🍲", "Food delivery", "1,284", "ETB 624K", "96.8%"], ["🚕", "Taxi", "2,946", "ETB 741K", "94.2%"], ["🛒", "Supermarket", "638", "ETB 489K", "97.1%"], ["🏗️", "Construction", "86", "ETB 1.24M", "91.4%"], ["⚙️", "Car parts", "214", "ETB 836K", "93.9%"],
];

function Admin() {
  return <div className="space-y-6 pb-24 lg:pb-4"><section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8"><p className="text-xs font-black uppercase tracking-[.16em] text-[#ffcf4a]">Biloo Operations Cloud</p><h1 className="mt-3 text-4xl font-black tracking-[-.055em]">Command the whole marketplace.</h1><p className="mt-3 max-w-2xl text-white/55">Customers, mobility, delivery, vendors, payments and service quality in one operational system.</p><span className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-3 text-sm font-black text-white/75">● Live across Addis Ababa</span></section><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Gross merchandise value" note="+21.4%" value="ETB 3.93M" /><Metric label="Orders and trips" note="5,168 today" value="5,168" /><Metric label="Active drivers" note="823 online" value="2,406" /><Metric label="Verified vendors" note="+48 this month" value="1,184" /></section><section className="grid gap-6 xl:grid-cols-[1fr_22rem]"><div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg"><div className="flex items-center justify-between border-b border-slate-100 p-6"><div><p className="text-xs font-black uppercase tracking-[.14em] text-blue-600">Service performance</p><h2 className="mt-2 text-2xl font-black">Today across BILOO</h2></div><button className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-black" type="button">Export report</button></div><div className="divide-y divide-slate-100">{performance.map((row) => <article className="grid gap-4 p-5 sm:grid-cols-[1fr_7rem_8rem_7rem] sm:items-center sm:px-6" key={row[1]}><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-xl">{row[0]}</span><p className="font-black">{row[1]}</p></div><p className="text-sm font-black">{row[2]}</p><p className="text-sm font-black">{row[3]}</p><p className="text-sm font-black text-emerald-600">{row[4]}</p></article>)}</div></div><aside className="space-y-4"><div className="rounded-[1.8rem] border border-slate-200 bg-white p-5"><div className="flex justify-between"><h3 className="font-black">Operations health</h3><span className="font-black text-emerald-600">Healthy</span></div>{[["Payment success",98],["Driver acceptance",91],["On-time delivery",94],["Vendor availability",89]].map(([label,value]) => <div className="mt-4" key={String(label)}><div className="flex justify-between text-xs font-bold text-slate-500"><span>{label}</span><span>{value}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-950" style={{width:`${value}%`}} /></div></div>)}</div><div className="rounded-[1.8rem] bg-red-50 p-5"><span className="text-2xl">🔔</span><h3 className="mt-4 text-xl font-black">Needs attention</h3><p className="mt-2 text-sm leading-6 text-slate-600">Two delayed construction deliveries and five payment reviews require action.</p></div></aside></section></div>;
}

export default function BilooPage() {
  const [workspace, setWorkspace] = useState<Workspace>("customer");
  return <main className="min-h-screen bg-[#f4f6f8] text-slate-950"><header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-20 w-full max-w-[94rem] items-center gap-4 px-4 sm:px-6 lg:px-8"><Link className="flex items-center gap-3" href="/"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">B</span><span><strong className="block text-lg font-black tracking-[-.04em]">BILOO</strong><small className="block text-[9px] font-black uppercase tracking-[.18em] text-slate-400">Everything, delivered</small></span></Link><nav className="ml-auto hidden rounded-full bg-slate-100 p-1 lg:flex">{workspaces.map((item) => <button className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-black ${workspace === item.id ? "bg-white shadow-sm" : "text-slate-500"}`} key={item.id} onClick={() => setWorkspace(item.id)} type="button"><span>{item.icon}</span>{item.label}</button>)}</nav><div className="ml-auto flex items-center gap-2 lg:ml-4"><button className="grid h-11 w-11 place-items-center rounded-full border border-slate-200" type="button">🔔</button><button className="flex h-11 items-center gap-2 rounded-full bg-slate-950 px-2 pr-4 text-white" type="button"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffcf4a] text-xs font-black text-slate-950">MA</span><span className="hidden text-sm font-black sm:block">Mahir</span></button></div></div></header><div className="mx-auto w-full max-w-[94rem] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">{workspace === "customer" && <Customer />}{workspace === "driver" && <Driver />}{workspace === "vendor" && <Vendor />}{workspace === "admin" && <Admin />}</div><nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-[1.5rem] bg-slate-950/95 p-2 text-white shadow-2xl backdrop-blur lg:hidden">{workspaces.map((item) => <button className={`min-h-14 rounded-2xl text-[10px] font-black ${workspace === item.id ? "bg-white text-slate-950" : "text-white/55"}`} key={item.id} onClick={() => setWorkspace(item.id)} type="button"><span className="block text-base">{item.icon}</span>{item.label}</button>)}</nav></main>;
}
