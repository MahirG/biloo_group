"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ColorSortGame } from "@/components/color-sort-game";
import { NatureMiniGame } from "@/components/nature-mini-game";
import {
  natureDiscoveries,
  natureModes,
  natureWorlds,
  type NatureModeId,
} from "@/data/nature-adventures";

type Screen = "home" | "classic" | "mini" | "daily" | "free-play" | "garden" | "gallery";
type MiniMode = Exclude<NatureModeId, "classic" | "free-play">;

type Progress = {
  discoveries: string[];
  garden: string[];
  modeWins: Record<string, number>;
  modeMistakes: Record<string, number>;
  calmMode: boolean;
  voiceNames: boolean;
  ambientMusic: boolean;
  reduceMotion: boolean;
  leftHanded: boolean;
  totalPlayMinutes: number;
  dailyDate: string;
  dailyCompleted: number[];
};

const STORAGE_KEY = "biloo-nature-match-world-v2";
const miniModes = natureModes.filter(
  (mode): mode is (typeof natureModes)[number] & { id: MiniMode } =>
    mode.id !== "classic" && mode.id !== "free-play",
);

const defaultProgress: Progress = {
  discoveries: [],
  garden: [],
  modeWins: {},
  modeMistakes: {},
  calmMode: false,
  voiceNames: true,
  ambientMusic: false,
  reduceMotion: false,
  leftHanded: false,
  totalPlayMinutes: 0,
  dailyDate: "",
  dailyCompleted: [],
};

function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function unique<T>(items: readonly T[]) {
  return Array.from(new Set(items));
}

function totalWins(progress: Progress) {
  return Object.values(progress.modeWins).reduce((sum, value) => sum + value, 0);
}

function treeForGrowth(growth: number) {
  if (growth >= 36) return { icon: "🌳", name: "Great Discovery Tree" };
  if (growth >= 22) return { icon: "🌲", name: "Strong Forest Tree" };
  if (growth >= 12) return { icon: "🌸", name: "Flowering Wonder Tree" };
  if (growth >= 5) return { icon: "🌿", name: "Young Leafy Tree" };
  return { icon: "🌱", name: "Little Learning Seedling" };
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button
      aria-label={`${label}: ${checked ? "on" : "off"}`}
      aria-pressed={checked}
      className={`relative h-8 w-14 rounded-full p-1 transition ${checked ? "bg-[#28796b]" : "bg-[#cbd8c3]"}`}
      onClick={onChange}
      type="button"
    >
      <span className={`block h-6 w-6 rounded-full bg-white shadow transition ${checked ? "translate-x-6" : ""}`} />
    </button>
  );
}

function Panel({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div className="fixed inset-0 z-[200] grid place-items-center bg-[#143727]/65 p-3 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-[#fbf8ed] p-5 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-[#214d35]">{title}</h2>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-[#e7efdf] text-xl font-black" onClick={onClose} type="button">×</button>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </motion.div>
  );
}

export function NatureMatchExperience() {
  const systemReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [activeMode, setActiveMode] = useState<MiniMode>("habitats");
  const [dailyStep, setDailyStep] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [holdingGate, setHoldingGate] = useState(false);
  const [selectedDiscovery, setSelectedDiscovery] = useState<string | null>(null);
  const [freePlayItems, setFreePlayItems] = useState<string[]>([]);
  const holdTimer = useRef<number | null>(null);

  const dateKey = todayKey();
  const world = natureWorlds[(progress.discoveries.length + Math.floor(totalWins(progress) / 3)) % natureWorlds.length];
  const tree = treeForGrowth(progress.discoveries.length + totalWins(progress));
  const reducedMotion = Boolean(systemReduceMotion || progress.reduceMotion || progress.calmMode);
  const dailyModes = useMemo<MiniMode[]>(() => {
    const seed = dateKey.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0);
    return [0, 1, 2].map((offset) => miniModes[(seed + offset * 3) % miniModes.length].id);
  }, [dateKey]);
  const completedDaily = progress.dailyDate === dateKey ? progress.dailyCompleted : [];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<Progress>;
          setProgress({
            ...defaultProgress,
            ...parsed,
            discoveries: parsed.discoveries ?? [],
            garden: parsed.garden ?? [],
            modeWins: parsed.modeWins ?? {},
            modeMistakes: parsed.modeMistakes ?? {},
            dailyCompleted: parsed.dailyDate === dateKey ? parsed.dailyCompleted ?? [] : [],
            dailyDate: dateKey,
          });
        } else {
          setProgress({ ...defaultProgress, dailyDate: dateKey });
        }
      } catch {
        setProgress({ ...defaultProgress, dailyDate: dateKey });
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [dateKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  useEffect(() => {
    if (!hydrated || screen === "home" || screen === "garden" || screen === "gallery") return;
    const timer = window.setInterval(() => setProgress((current) => ({ ...current, totalPlayMinutes: current.totalPlayMinutes + 1 })), 60000);
    return () => window.clearInterval(timer);
  }, [hydrated, screen]);

  function goTo(next: Screen) {
    setScreen(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function startMode(mode: NatureModeId) {
    if (mode === "classic") return goTo("classic");
    if (mode === "free-play") return goTo("free-play");
    setActiveMode(mode);
    setDailyStep(null);
    goTo("mini");
  }

  function startDaily(index: number) {
    setActiveMode(dailyModes[index]);
    setDailyStep(index);
    goTo("mini");
  }

  function completeMini(result: { mode: NatureModeId; wins: number; mistakes: number; discoveryId: string }) {
    setProgress((current) => {
      const dailyCompleted = dailyStep === null ? current.dailyCompleted : unique([...(current.dailyDate === dateKey ? current.dailyCompleted : []), dailyStep]);
      return {
        ...current,
        discoveries: unique([...current.discoveries, result.discoveryId]),
        garden: unique([...current.garden, result.discoveryId]),
        modeWins: { ...current.modeWins, [result.mode]: (current.modeWins[result.mode] ?? 0) + result.wins },
        modeMistakes: { ...current.modeMistakes, [result.mode]: (current.modeMistakes[result.mode] ?? 0) + result.mistakes },
        dailyDate: dateKey,
        dailyCompleted,
      };
    });
    goTo(dailyStep === null ? "home" : "daily");
    setDailyStep(null);
  }

  function startParentHold() {
    setHoldingGate(true);
    holdTimer.current = window.setTimeout(() => {
      setHoldingGate(false);
      setParentGateOpen(false);
      setParentOpen(true);
    }, 1500);
  }

  function stopParentHold() {
    setHoldingGate(false);
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
  }

  if (!hydrated) {
    return <div className="grid min-h-[100dvh] place-items-center bg-[#dbe9c5] text-7xl">🌱</div>;
  }

  if (screen === "classic") {
    return <div data-classic-game><button className="fixed left-3 top-3 z-[160] rounded-full bg-white/90 px-4 py-3 font-black text-[#214d35] shadow" onClick={() => goTo("home")} type="button">← World</button><ColorSortGame /></div>;
  }

  if (screen === "mini") {
    return <NatureMiniGame mode={activeMode} world={world} calmMode={progress.calmMode} voiceNames={progress.voiceNames} reduceMotion={reducedMotion} leftHanded={progress.leftHanded} targetWins={dailyStep === null ? 3 : 2} onExit={() => goTo(dailyStep === null ? "home" : "daily")} onStats={() => undefined} onComplete={completeMini} />;
  }

  const background = `linear-gradient(180deg, ${world.sky}, #fff9e8 48%, ${world.ground})`;

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden px-3 pb-10 text-[#183f2a] sm:px-6" style={{ background }}>
      <header className={`mx-auto flex max-w-6xl items-center justify-between gap-3 py-4 ${progress.leftHanded ? "flex-row-reverse" : ""}`}>
        <button aria-label="Open game menu" className="grid h-12 w-12 place-items-center rounded-2xl bg-white/88 shadow" onClick={() => setMenuOpen(true)} type="button"><span className="grid gap-1"><i className="h-0.5 w-6 bg-[#214d35]"/><i className="h-0.5 w-6 bg-[#214d35]"/><i className="h-0.5 w-6 bg-[#214d35]"/></span></button>
        <div className="rounded-2xl bg-white/65 px-4 py-2 text-center backdrop-blur"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#56715d]">Biloo Nature Game</p><p className="font-black">Nature Match World</p></div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/75 text-3xl shadow">{world.companion}</div>
      </header>

      <main className="mx-auto max-w-6xl">
        {screen === "home" ? (
          <>
            <section className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-[2rem] bg-white/72 p-6 shadow-xl backdrop-blur sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.17em] text-[#56715d]">{world.name}</p>
                <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Explore, match, count, and grow.</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#58705d]">A calm, positive-only world of animals, plants, colors, patterns, habitats, and creative garden play.</p>
                <div className="mt-7 flex flex-wrap gap-3"><button className="rounded-full bg-[#28796b] px-6 py-4 font-black text-white shadow" onClick={() => goTo("daily")} type="button">🌞 Daily adventure</button><button className="rounded-full bg-white px-6 py-4 font-black text-[#214d35] shadow" onClick={() => startMode("classic")} type="button">🌳 Tree sorting</button></div>
              </div>
              <div className="rounded-[2rem] bg-white/66 p-6 text-center shadow-xl backdrop-blur"><motion.div animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-8xl">{tree.icon}</motion.div><h2 className="mt-3 text-2xl font-black">{tree.name}</h2><p className="mt-2 text-[#5b735f]">{progress.discoveries.length} discoveries · {totalWins(progress)} puzzle wins</p><button className="mt-5 rounded-full bg-[#e6efd9] px-5 py-3 font-black" onClick={() => goTo("garden")} type="button">Visit your garden</button></div>
            </section>

            <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {natureModes.map((mode) => (
                <button className="rounded-[1.7rem] border border-white/70 bg-white/72 p-5 text-left shadow-lg transition active:scale-[0.98]" key={mode.id} onClick={() => startMode(mode.id)} type="button"><span className="text-4xl">{mode.icon}</span><h2 className="mt-3 text-xl font-black">{mode.name}</h2><p className="mt-2 leading-6 text-[#607762]">{mode.description}</p><p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#47705a]">{mode.skill}</p></button>
              ))}
            </section>
          </>
        ) : null}

        {screen === "daily" ? (
          <section className="rounded-[2rem] bg-white/75 p-5 shadow-xl sm:p-8"><button className="rounded-full bg-[#e7efdf] px-4 py-2 font-black" onClick={() => goTo("home")} type="button">← World</button><h1 className="mt-5 text-4xl font-black">Daily Nature Adventure</h1><p className="mt-3 text-[#5b735f]">Three calm puzzles. No streaks, no missed-day punishment.</p><div className="mt-7 grid gap-4 sm:grid-cols-3">{dailyModes.map((modeId, index) => { const mode = natureModes.find((item) => item.id === modeId); const done = completedDaily.includes(index); return <button className="rounded-[1.6rem] bg-[#eef5e6] p-6 text-center shadow" disabled={done} key={`${modeId}-${index}`} onClick={() => startDaily(index)} type="button"><div className="text-5xl">{done ? "✅" : mode?.icon}</div><p className="mt-3 font-black">{mode?.name}</p><p className="mt-2 text-sm text-[#607762]">{done ? "Completed today" : "Play two gentle rounds"}</p></button>; })}</div></section>
        ) : null}

        {screen === "free-play" ? (
          <section className="rounded-[2rem] bg-white/72 p-5 shadow-xl sm:p-8"><div className="flex items-center justify-between"><button className="rounded-full bg-[#e7efdf] px-4 py-2 font-black" onClick={() => goTo("home")} type="button">← World</button><button className="rounded-full bg-white px-4 py-2 font-black" onClick={() => setFreePlayItems([])} type="button">Clear garden</button></div><h1 className="mt-5 text-4xl font-black">Creative Garden</h1><p className="mt-3 text-[#5b735f]">Tap anything to place it. There are no wrong answers.</p><div className="mt-6 min-h-64 rounded-[2rem] border-4 border-white/70 bg-gradient-to-b from-[#bde5ef] to-[#96bd78] p-5"><div className="flex min-h-52 flex-wrap content-end items-end justify-center gap-4 text-5xl">{freePlayItems.map((item, index) => <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={`${item}-${index}`}>{item}</motion.span>)}</div></div><div className="mt-5 flex flex-wrap justify-center gap-3">{["🌳","🌸","🐇","🦋","🍄","🌻","🐢","🌱","🦊","🐝"].map((item) => <button className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow" key={item} onClick={() => setFreePlayItems((current) => [...current, item])} type="button">{item}</button>)}</div></section>
        ) : null}

        {screen === "garden" ? (
          <section className="rounded-[2rem] bg-white/72 p-5 shadow-xl sm:p-8"><button className="rounded-full bg-[#e7efdf] px-4 py-2 font-black" onClick={() => goTo("home")} type="button">← World</button><h1 className="mt-5 text-4xl font-black">Your Growing Garden</h1><div className="mt-6 min-h-72 rounded-[2rem] bg-gradient-to-b from-[#bde5ef] to-[#96bd78] p-6"><div className="text-center text-8xl">{tree.icon}</div><div className="mt-8 flex flex-wrap items-end justify-center gap-5 text-5xl">{progress.garden.length ? progress.garden.map((id) => { const item = natureDiscoveries.find((entry) => entry.id === id); return item ? <button aria-label={item.name} key={id} onClick={() => setSelectedDiscovery(id)} type="button">{item.icon}</button> : null; }) : <p className="text-base font-bold text-[#355c40]">Complete puzzles to bring animals and plants here.</p>}</div></div></section>
        ) : null}

        {screen === "gallery" ? (
          <section className="rounded-[2rem] bg-white/75 p-5 shadow-xl sm:p-8"><button className="rounded-full bg-[#e7efdf] px-4 py-2 font-black" onClick={() => goTo("home")} type="button">← World</button><h1 className="mt-5 text-4xl font-black">Nature Gallery</h1><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{natureDiscoveries.map((item) => { const unlocked = progress.discoveries.includes(item.id); return <button className={`rounded-[1.4rem] border p-4 text-center ${unlocked ? "bg-[#eef5e6]" : "bg-slate-100 opacity-50"}`} disabled={!unlocked} key={item.id} onClick={() => setSelectedDiscovery(item.id)} type="button"><div className="text-5xl">{unlocked ? item.icon : "🌫️"}</div><p className="mt-3 text-sm font-black">{unlocked ? item.name : "Hidden discovery"}</p></button>; })}</div></section>
        ) : null}
      </main>

      <AnimatePresence>{menuOpen ? <motion.div className="fixed inset-0 z-[180] bg-[#143727]/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.aside className="h-full w-[min(88vw,24rem)] overflow-y-auto bg-[#f8f3df] p-6 shadow-2xl" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}><div className="flex items-center justify-between"><h2 className="text-3xl font-black">Nature menu</h2><button className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl" onClick={() => setMenuOpen(false)} type="button">×</button></div><nav className="mt-7 grid gap-3">{[["🏡","World","home"],["🌞","Daily adventure","daily"],["🌳","Tree sorting","classic"],["🎨","Creative garden","free-play"],["🐾","Gallery","gallery"]].map(([icon,label,target]) => <button className="rounded-[1.3rem] bg-white p-4 text-left font-black shadow" key={target} onClick={() => goTo(target as Screen)} type="button">{icon} {label}</button>)}<button className="rounded-[1.3rem] bg-white p-4 text-left font-black shadow" onClick={() => { setMenuOpen(false); setSettingsOpen(true); }} type="button">⚙️ Settings</button><button className="rounded-[1.3rem] bg-white p-4 text-left font-black shadow" onClick={() => { setMenuOpen(false); setParentGateOpen(true); }} type="button">🦉 Parent dashboard</button></nav><Link className="mt-8 block rounded-full border border-[#9fb59e] px-5 py-3 text-center font-black" href="/">Return to Biloo Group</Link></motion.aside></motion.div> : null}</AnimatePresence>

      <AnimatePresence>{settingsOpen ? <Panel title="Settings" onClose={() => setSettingsOpen(false)}><div className="grid gap-4">{[["Calm mode","Slower transitions and gentler feedback","calmMode"],["Voice names","Speak nature and color names","voiceNames"],["Ambient music","Soft synthesized meadow music","ambientMusic"],["Reduced motion","Minimize decorative animation","reduceMotion"],["Left-handed layout","Move key controls for left-handed play","leftHanded"]].map(([label,description,key]) => <div className="flex items-center justify-between gap-4 rounded-[1.3rem] bg-white p-4" key={key}><div><p className="font-black">{label}</p><p className="text-sm text-[#607762]">{description}</p></div><Toggle checked={Boolean(progress[key as keyof Progress])} label={label} onChange={() => setProgress((current) => ({ ...current, [key]: !current[key as keyof Progress] }))} /></div>)}</div></Panel> : null}</AnimatePresence>

      <AnimatePresence>{parentGateOpen ? <Panel title="Grown-up gate" onClose={() => setParentGateOpen(false)}><div className="text-center"><p className="text-lg font-bold text-[#607762]">Press and hold the tree for 1.5 seconds.</p><motion.button className="mt-6 h-28 w-28 rounded-full bg-[#28796b] text-5xl shadow-xl" animate={holdingGate ? { scale: [1,1.08,1] } : undefined} onPointerDown={startParentHold} onPointerUp={stopParentHold} onPointerLeave={stopParentHold} onPointerCancel={stopParentHold} type="button">🌳</motion.button></div></Panel> : null}</AnimatePresence>

      <AnimatePresence>{parentOpen ? <Panel title="Parent dashboard" onClose={() => setParentOpen(false)}><p className="rounded-[1.3rem] bg-[#fff1cc] p-4 font-bold text-[#6b5324]">These are local play summaries, not an IQ score or developmental assessment.</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Discoveries",progress.discoveries.length],["Puzzle wins",totalWins(progress)],["Play minutes",progress.totalPlayMinutes],["Daily complete",completedDaily.length]].map(([label,value]) => <div className="rounded-[1.3rem] bg-[#eef5e6] p-4 text-center" key={label}><p className="text-3xl font-black">{value}</p><p className="text-sm font-bold text-[#607762]">{label}</p></div>)}</div><button className="mt-6 w-full rounded-full border-2 border-[#d88a76] px-5 py-3 font-black text-[#9a4938]" onClick={() => { setProgress({ ...defaultProgress, dailyDate: dateKey }); setParentOpen(false); }} type="button">Reset local progress</button></Panel> : null}</AnimatePresence>

      <AnimatePresence>{selectedDiscovery ? (() => { const item = natureDiscoveries.find((entry) => entry.id === selectedDiscovery); return item ? <Panel title={item.name} onClose={() => setSelectedDiscovery(null)}><div className="text-center"><div className="text-8xl">{item.icon}</div><p className="mt-4 text-xl font-black">{item.color}</p><p className="mt-2 font-bold text-[#607762]">Habitat: {item.habitat}</p><p className="mt-5 rounded-[1.4rem] bg-[#eef5e6] p-5 leading-7">{item.fact}</p></div></Panel> : null; })() : null}</AnimatePresence>
    </div>
  );
}
