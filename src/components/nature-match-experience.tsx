"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ColorSortGame } from "@/components/color-sort-game";
import { NatureMiniGame } from "@/components/nature-mini-game";
import {
  dailyModeIds,
  natureDiscoveries,
  natureModes,
  worldForProgress,
  type NatureDiscovery,
  type NatureModeId,
} from "@/data/nature-adventures";

type Screen =
  | "home"
  | "classic"
  | "daily"
  | "mini"
  | "free-play"
  | "garden"
  | "gallery";

type MiniMode = Exclude<NatureModeId, "classic" | "free-play">;

type ExpandedProgress = {
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
  lastMode: MiniMode;
  dailyDate: string;
  dailyCompleted: number[];
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "biloo-nature-match-world-v1";
const CLASSIC_STORAGE_KEY = "biloo-nature-match-progress-v2";

const defaultProgress: ExpandedProgress = {
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
  lastMode: "habitats",
  dailyDate: "",
  dailyCompleted: [],
};

function todayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function unique<T>(items: readonly T[]) {
  return Array.from(new Set(items));
}

function speak(enabled: boolean, text: string) {
  if (
    !enabled ||
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.87;
  utterance.pitch = 1.08;
  window.speechSynthesis.speak(utterance);
}

function totalModeWins(progress: ExpandedProgress) {
  return Object.values(progress.modeWins).reduce(
    (total, wins) => total + wins,
    0,
  );
}

function treeForGrowth(growth: number) {
  if (growth >= 45) {
    return { icon: "🌳", name: "Great Discovery Tree", next: 45 };
  }
  if (growth >= 28) {
    return { icon: "🌲", name: "Strong Forest Tree", next: 45 };
  }
  if (growth >= 16) {
    return { icon: "🌸", name: "Flowering Wonder Tree", next: 28 };
  }
  if (growth >= 7) {
    return { icon: "🌿", name: "Young Leafy Tree", next: 16 };
  }
  return { icon: "🌱", name: "Little Learning Seedling", next: 7 };
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      aria-label={`${label}: ${checked ? "on" : "off"}`}
      aria-pressed={checked}
      className={`relative h-8 w-14 rounded-full p-1 transition ${
        checked ? "bg-[#28796b]" : "bg-[#cbd8c3]"
      }`}
      onClick={onChange}
      type="button"
    >
      <span
        className={`block h-6 w-6 rounded-full bg-white shadow-sm transition ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[1.4rem] border border-[#d8e3cf] bg-white/85 p-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e8f0df] text-2xl">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-black text-[#214d35]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#607762]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function Overlay({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[220] grid place-items-center bg-[#143727]/65 p-3 backdrop-blur-md sm:p-5"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        animate={{ scale: 1, y: 0 }}
        aria-modal="true"
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/60 bg-[#fbf8ed] p-5 shadow-2xl sm:p-8"
        initial={{ scale: 0.94, y: 28 }}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#214d35]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 leading-7 text-[#5c745f]">{subtitle}</p>
            ) : null}
          </div>
          <button
            aria-label="Close"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e7efdf] text-xl font-black text-[#214d35]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </motion.section>
    </motion.div>
  );
}

function NatureBackdrop({
  world,
  reducedMotion,
}: {
  world: ReturnType<typeof worldForProgress>;
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden opacity-70"
    >
      <motion.span
        animate={reducedMotion ? undefined : { x: ["-15vw", "110vw"] }}
        className="absolute top-[12%] text-5xl"
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        ☁️
      </motion.span>
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          animate={
            reducedMotion
              ? undefined
              : { y: [0, -8 - (index % 3) * 4, 0] }
          }
          className="absolute bottom-0 text-5xl"
          key={index}
          style={{ left: `${index * 11 - 3}%` }}
          transition={{ duration: 4 + (index % 4), repeat: Infinity }}
        >
          {world.scenery[index % world.scenery.length]}
        </motion.span>
      ))}
    </div>
  );
}

export function NatureMatchExperience() {
  const systemReducedMotion = useReducedMotion();
  const [progress, setProgress] =
    useState<ExpandedProgress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);
  const [classicCompleted, setClassicCompleted] = useState(0);
  const [classicDiscoveries, setClassicDiscoveries] = useState<string[]>([]);
  const [screen, setScreen] = useState<Screen>("home");
  const [activeMode, setActiveMode] = useState<MiniMode>("habitats");
  const [dailyStep, setDailyStep] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [selectedDiscovery, setSelectedDiscovery] =
    useState<NatureDiscovery | null>(null);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [holdingGate, setHoldingGate] = useState(false);
  const holdTimer = useRef<number | null>(null);

  const dateKey = todayKey();
  const dailyModes = useMemo(
    () => dailyModeIds(dateKey) as MiniMode[],
    [dateKey],
  );
  const allDiscoveries = unique([
    ...classicDiscoveries,
    ...progress.discoveries,
  ]);
  const growth =
    classicCompleted + totalModeWins(progress) + allDiscoveries.length;
  const world = worldForProgress(
    allDiscoveries.length + Math.floor(growth / 4),
  );
  const tree = treeForGrowth(growth);
  const reducedMotion = Boolean(
    systemReducedMotion || progress.reduceMotion || progress.calmMode,
  );
  const completedDaily =
    progress.dailyDate === dateKey ? progress.dailyCompleted : [];
  const favoriteMode = useMemo(() => {
    const entries = Object.entries(progress.modeWins);
    if (!entries.length) return "Still exploring";
    const [modeId] = entries.sort((a, b) => b[1] - a[1])[0];
    return (
      natureModes.find((item) => item.id === modeId)?.name ??
      "Nature puzzles"
    );
  }, [progress.modeWins]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const parsed = stored
          ? (JSON.parse(stored) as Partial<ExpandedProgress>)
          : {};
        const merged: ExpandedProgress = {
          ...defaultProgress,
          ...parsed,
          discoveries: parsed.discoveries ?? [],
          garden: parsed.garden ?? [],
          modeWins: parsed.modeWins ?? {},
          modeMistakes: parsed.modeMistakes ?? {},
          dailyDate: parsed.dailyDate === dateKey ? dateKey : dateKey,
          dailyCompleted:
            parsed.dailyDate === dateKey ? (parsed.dailyCompleted ?? []) : [],
        };
        setProgress(merged);
        setActiveMode(merged.lastMode);

        const classicStored = window.localStorage.getItem(CLASSIC_STORAGE_KEY);
        if (classicStored) {
          const classic = JSON.parse(classicStored) as {
            completed?: Record<string, number>;
            collectibles?: string[];
          };
          const completedCount = Object.keys(classic.completed ?? {}).length;
          setClassicCompleted(completedCount);
          setClassicDiscoveries(
            natureDiscoveries
              .slice(
                0,
                Math.max(
                  completedCount,
                  classic.collectibles?.length ?? 0,
                ),
              )
              .map((item) => item.id),
          );
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
    if (
      !hydrated ||
      screen === "home" ||
      screen === "gallery" ||
      screen === "garden"
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((current) => ({
        ...current,
        totalPlayMinutes: current.totalPlayMinutes + 1,
      }));
    }, 60000);

    return () => window.clearInterval(interval);
  }, [hydrated, screen]);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (
      !progress.ambientMusic ||
      screen === "classic" ||
      typeof window === "undefined"
    ) {
      return;
    }

    const AudioContextConstructor =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const playPhrase = () => {
      const startTime = context.currentTime + 0.04;
      [261.63, 329.63, 392].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = startTime + index * 0.38;
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(
          progress.calmMode ? 0.009 : 0.016,
          start + 0.12,
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + 1.25);
      });
    };

    void context.resume().then(playPhrase).catch(() => undefined);
    const interval = window.setInterval(
      playPhrase,
      progress.calmMode ? 9000 : 6500,
    );

    return () => {
      window.clearInterval(interval);
      void context.close();
    };
  }, [progress.ambientMusic, progress.calmMode, screen]);

  function goTo(nextScreen: Screen) {
    setScreen(nextScreen);
    setMenuOpen(false);
    window.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      top: 0,
    });
  }

  function startMode(mode: NatureModeId) {
    if (mode === "classic") {
      goTo("classic");
      return;
    }
    if (mode === "free-play") {
      goTo("free-play");
      return;
    }

    setActiveMode(mode);
    setDailyStep(null);
    setProgress((current) => ({ ...current, lastMode: mode }));
    goTo("mini");
  }

  function startDaily(step: number) {
    const mode = dailyModes[step];
    setDailyStep(step);
    setActiveMode(mode);
    setProgress((current) => ({ ...current, lastMode: mode }));
    goTo("mini");
  }

  function updateStats(mode: NatureModeId, correct: boolean) {
    setProgress((current) => ({
      ...current,
      modeMistakes: correct
        ? current.modeMistakes
        : {
            ...current.modeMistakes,
            [mode]: (current.modeMistakes[mode] ?? 0) + 1,
          },
      modeWins: correct
        ? {
            ...current.modeWins,
            [mode]: (current.modeWins[mode] ?? 0) + 1,
          }
        : current.modeWins,
    }));
  }

  function completeMini(result: {
    mode: NatureModeId;
    wins: number;
    mistakes: number;
    discoveryId: string;
  }) {
    const completedStep = dailyStep;
    setProgress((current) => ({
      ...current,
      dailyCompleted:
        completedStep === null
          ? current.dailyCompleted
          : unique([
              ...(current.dailyDate === dateKey
                ? current.dailyCompleted
                : []),
              completedStep,
            ]),
      dailyDate: dateKey,
      discoveries: unique([
        ...current.discoveries,
        result.discoveryId,
      ]),
      garden: current.garden.includes(result.discoveryId)
        ? current.garden
        : [...current.garden, result.discoveryId],
    }));
    setDailyStep(null);
    goTo(completedStep === null ? "home" : "daily");
  }

  function addToFreeGarden(discovery: NatureDiscovery) {
    setProgress((current) => ({
      ...current,
      discoveries: unique([...current.discoveries, discovery.id]),
      garden: [...current.garden, discovery.id].slice(-30),
    }));
    speak(
      progress.voiceNames,
      `${discovery.name}. ${discovery.color}. ${discovery.fact}`,
    );
  }

  function startGateHold() {
    setHoldingGate(true);
    holdTimer.current = window.setTimeout(() => {
      setHoldingGate(false);
      setParentGateOpen(false);
      setParentOpen(true);
    }, 1600);
  }

  function stopGateHold() {
    setHoldingGate(false);
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function handleClassicAutoScroll(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (!event.buttons) return;
    if (event.clientY < 80) {
      window.scrollBy({ behavior: "auto", top: -14 });
    }
    if (event.clientY > window.innerHeight - 80) {
      window.scrollBy({ behavior: "auto", top: 14 });
    }
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-[#dbe9c5]">
        <motion.div
          animate={
            systemReducedMotion
              ? undefined
              : { rotate: 360, scale: [0.95, 1.05, 0.95] }
          }
          className="grid h-24 w-24 place-items-center rounded-[2rem] bg-white/80 text-5xl shadow-xl"
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
        >
          🌱
        </motion.div>
      </div>
    );
  }

  if (screen === "classic") {
    return (
      <div
        data-classic-game
        onPointerMoveCapture={handleClassicAutoScroll}
      >
        <ColorSortGame />
        <button
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[190] rounded-full border-2 border-white/70 bg-[#214d35] px-5 py-3 text-sm font-black text-white shadow-xl"
          onClick={() => goTo("home")}
          type="button"
        >
          🌿 Nature world
        </button>
      </div>
    );
  }

  if (screen === "mini") {
    return (
      <NatureMiniGame
        calmMode={progress.calmMode}
        leftHanded={progress.leftHanded}
        mode={activeMode}
        onComplete={completeMini}
        onExit={() => {
          const returnToDaily = dailyStep !== null;
          setDailyStep(null);
          goTo(returnToDaily ? "daily" : "home");
        }}
        onStats={(correct) => updateStats(activeMode, correct)}
        reduceMotion={reducedMotion}
        startIndex={progress.modeWins[activeMode] ?? 0}
        targetWins={dailyStep === null ? 5 : 3}
        voiceNames={progress.voiceNames}
        world={world}
      />
    );
  }

  const pageStyle = {
    background: `linear-gradient(180deg, ${world.sky} 0%, #fff9e8 50%, ${world.ground} 100%)`,
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden text-[#183f2a]"
      style={pageStyle}
    >
      <NatureBackdrop reducedMotion={reducedMotion} world={world} />

      <header
        className={`relative z-30 flex items-center justify-between gap-3 px-3 pb-3 pt-[max(.75rem,env(safe-area-inset-top))] sm:px-6 ${
          progress.leftHanded ? "flex-row-reverse" : ""
        }`}
      >
        <button
          aria-label="Open Nature Match menu"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/65 bg-white/88 shadow-lg backdrop-blur active:scale-95"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <span aria-hidden="true" className="grid gap-1.5">
            <span className="h-0.5 w-6 rounded-full bg-[#214d35]" />
            <span className="h-0.5 w-6 rounded-full bg-[#214d35]" />
            <span className="h-0.5 w-6 rounded-full bg-[#214d35]" />
          </span>
        </button>
        <div className="min-w-0 flex-1 rounded-2xl border border-white/60 bg-white/68 px-4 py-2 text-center backdrop-blur">
          <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-[#5d7a63]">
            Biloo educational game
          </p>
          <p className="truncate text-lg font-black">Nature Match World</p>
        </div>
        <motion.button
          animate={
            reducedMotion
              ? undefined
              : { rotate: [0, -6, 6, 0], y: [0, -3, 0] }
          }
          aria-label="Happy nature companion"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/65 bg-white/82 text-3xl shadow-lg"
          onClick={() =>
            speak(
              progress.voiceNames,
              "Your animal companion is happy to explore with you.",
            )
          }
          transition={{ duration: 2.8, repeat: Infinity }}
          type="button"
        >
          {world.companion}
        </motion.button>
      </header>

      {screen === "home" ? (
        <main className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
          <section className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-[2rem] border border-white/65 bg-white/72 p-5 shadow-[0_20px_55px_rgba(35,75,48,.16)] backdrop-blur sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5a775e]">
                {world.name}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">
                A living nature world full of calm puzzles.
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#58705c]">
                Sort, count, compare, remember, explore habitats, grow a
                permanent garden, and create freely. There are no lives,
                timers, streaks, or fail states.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-[#28796b] px-6 py-4 font-black text-white shadow-lg active:scale-95"
                  onClick={() => startMode(progress.lastMode)}
                  type="button"
                >
                  Continue exploring ▶
                </button>
                <button
                  className="rounded-full border-2 border-[#8fb285] bg-white/75 px-6 py-4 font-black text-[#355c40] active:scale-95"
                  onClick={() => goTo("daily")}
                  type="button"
                >
                  Today&apos;s adventure 🌤️
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/65 bg-white/72 p-5 shadow-[0_20px_55px_rgba(35,75,48,.16)] backdrop-blur sm:p-7">
              <div className="flex items-center gap-5">
                <motion.span
                  animate={
                    reducedMotion
                      ? undefined
                      : { rotate: [0, -3, 3, 0], scale: [1, 1.07, 1] }
                  }
                  className="text-7xl"
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {tree.icon}
                </motion.span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#5e7a64]">
                    Permanent garden tree
                  </p>
                  <p className="mt-1 text-2xl font-black">{tree.name}</p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#d9e5cf]">
                    <motion.div
                      animate={{
                        width: `${Math.min(100, (growth / tree.next) * 100)}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#76a96b] to-[#dc923c]"
                      initial={false}
                    />
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#607762]">
                    {growth} learning discoveries
                  </p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-full bg-[#e6efdc] px-5 py-3 font-black text-[#355c40]"
                onClick={() => goTo("garden")}
                type="button"
              >
                Visit my garden 🌳
              </button>
            </div>
          </section>

          <section className="mt-5 rounded-[2rem] border border-white/65 bg-white/70 p-5 backdrop-blur sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#5c7962]">
                  Daily Nature Adventure
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                  Three fresh puzzles, with no streak pressure.
                </h2>
              </div>
              <button
                className="rounded-full bg-[#f4dda1] px-5 py-3 font-black text-[#6b4b20]"
                onClick={() => goTo("daily")}
                type="button"
              >
                {completedDaily.length}/3 complete
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {dailyModes.map((mode, index) => {
                const details = natureModes.find((item) => item.id === mode)!;
                const done = completedDaily.includes(index);
                return (
                  <button
                    className={`rounded-[1.5rem] border-2 p-4 text-left transition active:scale-[0.98] ${
                      done
                        ? "border-[#8fbd82] bg-[#e5f2da]"
                        : "border-[#d6e2cd] bg-white/82"
                    }`}
                    key={`${mode}-${index}`}
                    onClick={() => startDaily(index)}
                    type="button"
                  >
                    <span className="text-4xl">
                      {done ? "✅" : details.icon}
                    </span>
                    <p className="mt-3 font-black">{details.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#607762]">
                      {done ? "Explored today" : details.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            className="mt-5 rounded-[2rem] border border-white/65 bg-white/70 p-5 backdrop-blur sm:p-7"
            id="modes"
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#5c7962]">
              Levels and modes
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
              Choose a way to play.
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {natureModes.map((mode) => (
                <button
                  className="group rounded-[1.5rem] border-2 border-[#d5e1cc] bg-white/82 p-5 text-left transition hover:-translate-y-0.5 hover:border-[#8fb285] active:scale-[0.98]"
                  key={mode.id}
                  onClick={() => startMode(mode.id)}
                  type="button"
                >
                  <span className="text-4xl">{mode.icon}</span>
                  <p className="mt-3 text-xl font-black">{mode.name}</p>
                  <p className="mt-2 leading-6 text-[#607762]">
                    {mode.description}
                  </p>
                  <span className="mt-4 block text-xs font-black uppercase tracking-[0.12em] text-[#28796b]">
                    {mode.skill}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </main>
      ) : null}

      {screen === "daily" ? (
        <main className="relative z-10 mx-auto w-full max-w-4xl px-3 pb-12 sm:px-6">
          <button
            className="rounded-full bg-white/75 px-5 py-3 font-black text-[#355c40]"
            onClick={() => goTo("home")}
            type="button"
          >
            ← Nature world
          </button>
          <section className="mt-4 rounded-[2rem] border border-white/65 bg-white/75 p-5 backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#5d7963]">
              {dateKey}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">
              Today&apos;s Nature Adventure
            </h1>
            <p className="mt-4 text-lg font-semibold leading-8 text-[#5d735f]">
              Complete any or all three. Missing a day never removes progress,
              and there is no streak counter.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {dailyModes.map((mode, index) => {
                const details = natureModes.find((item) => item.id === mode)!;
                const done = completedDaily.includes(index);
                return (
                  <button
                    className={`rounded-[1.7rem] border-2 p-5 text-left active:scale-[0.98] ${
                      done
                        ? "border-[#8fbd82] bg-[#e2f1d8]"
                        : "border-[#d6e2cd] bg-[#fbfdf7]"
                    }`}
                    key={`${mode}-${index}`}
                    onClick={() => startDaily(index)}
                    type="button"
                  >
                    <span className="text-5xl">
                      {done ? "🌟" : details.icon}
                    </span>
                    <p className="mt-4 text-xl font-black">
                      Path {index + 1}: {details.name}
                    </p>
                    <p className="mt-2 leading-6 text-[#607762]">
                      {done
                        ? "Completed with calm confidence."
                        : "Three positive matches."}
                    </p>
                  </button>
                );
              })}
            </div>
            {completedDaily.length === 3 ? (
              <motion.div
                animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }}
                className="mt-7 rounded-[1.7rem] bg-gradient-to-r from-[#e2f0d8] to-[#f6dfa5] p-6 text-center"
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <div className="text-6xl">🌳✨</div>
                <p className="mt-3 text-2xl font-black">
                  Today&apos;s forest paths are complete!
                </p>
                <p className="mt-2 font-semibold text-[#5d735f]">
                  The garden grew, and tomorrow will bring a different gentle
                  mix.
                </p>
              </motion.div>
            ) : null}
          </section>
        </main>
      ) : null}

      {screen === "free-play" ? (
        <main className="relative z-10 mx-auto w-full max-w-5xl px-3 pb-12 sm:px-6">
          <div
            className={`flex items-center justify-between gap-3 ${
              progress.leftHanded ? "flex-row-reverse" : ""
            }`}
          >
            <button
              className="rounded-full bg-white/80 px-5 py-3 font-black"
              onClick={() => goTo("home")}
              type="button"
            >
              ← Nature world
            </button>
            <button
              className="rounded-full bg-white/80 px-5 py-3 font-black text-[#8b4b3c]"
              onClick={() =>
                setProgress((current) => ({ ...current, garden: [] }))
              }
              type="button"
            >
              Clear scene
            </button>
          </div>
          <section className="mt-4 overflow-hidden rounded-[2rem] border-8 border-[#79543a] bg-[#a8794d] p-3 shadow-xl sm:p-5">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] border border-white/35 bg-gradient-to-b from-[#bde5ef] via-[#eef5dc] to-[#8fbc76] p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex justify-around text-6xl opacity-70"
              >
                <span>🌳</span>
                <span>🌿</span>
                <span>🌲</span>
                <span>🌸</span>
              </div>
              <div className="relative grid grid-cols-4 gap-3 sm:grid-cols-6">
                {progress.garden.map((id, index) => {
                  const item = natureDiscoveries.find(
                    (discovery) => discovery.id === id,
                  );
                  if (!item) return null;
                  return (
                    <motion.button
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              rotate: [-2, 2, -2],
                              y: [0, -4 - (index % 3), 0],
                            }
                      }
                      aria-label={`${item.name}. Tap to hear a nature fact.`}
                      className="grid aspect-square place-items-center rounded-[1.4rem] border border-white/70 bg-white/58 text-5xl backdrop-blur active:scale-95"
                      key={`${id}-${index}`}
                      onClick={() =>
                        speak(
                          progress.voiceNames,
                          `${item.name}. ${item.color}. ${item.fact}`,
                        )
                      }
                      transition={{
                        duration: 3 + (index % 3),
                        repeat: Infinity,
                      }}
                      type="button"
                    >
                      {item.icon}
                    </motion.button>
                  );
                })}
              </div>
              {!progress.garden.length ? (
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <div>
                    <div className="text-7xl">🌱</div>
                    <p className="mt-4 text-2xl font-black">
                      Tap friends below to create your own garden.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
          <section className="mt-4 rounded-[2rem] border border-white/65 bg-white/72 p-4 backdrop-blur sm:p-6">
            <p className="font-black">Free-play nature basket</p>
            <p className="mt-1 text-sm font-semibold text-[#607762]">
              No score and no rules. Tap any friend as many times as you like.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {natureDiscoveries.map((item) => (
                <button
                  aria-label={`Add ${item.name}`}
                  className="aspect-square rounded-[1.3rem] border-2 border-[#d2dfc9] bg-[#f7fbf2] text-4xl active:scale-90"
                  key={item.id}
                  onClick={() => addToFreeGarden(item)}
                  type="button"
                >
                  {item.icon}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full rounded-full bg-[#e7efdf] px-5 py-3 font-black"
              onClick={() =>
                setProgress((current) => ({
                  ...current,
                  garden: current.garden.slice(0, -1),
                }))
              }
              type="button"
            >
              Remove last friend ↶
            </button>
          </section>
        </main>
      ) : null}

      {screen === "garden" ? (
        <main className="relative z-10 mx-auto w-full max-w-5xl px-3 pb-12 sm:px-6">
          <button
            className="rounded-full bg-white/80 px-5 py-3 font-black"
            onClick={() => goTo("home")}
            type="button"
          >
            ← Nature world
          </button>
          <section className="mt-4 rounded-[2rem] border border-white/65 bg-white/72 p-5 backdrop-blur sm:p-8">
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
              <motion.div
                animate={
                  reducedMotion ? undefined : { scale: [1, 1.06, 1] }
                }
                className="text-center text-9xl"
                transition={{ duration: 3, repeat: Infinity }}
              >
                {tree.icon}
              </motion.div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#5c7962]">
                  Your permanent garden
                </p>
                <h1 className="mt-2 text-4xl font-black tracking-[-0.05em]">
                  {tree.name}
                </h1>
                <p className="mt-3 text-lg font-semibold leading-8 text-[#5d735f]">
                  Every classic level and mini-game discovery helps this world
                  grow. Rewards never regress.
                </p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#d9e5cf]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#76a96b] to-[#dc923c]"
                    style={{
                      width: `${Math.min(100, (growth / tree.next) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-7 rounded-[1.7rem] bg-gradient-to-b from-[#c5e6ef] via-[#edf3d9] to-[#8eb773] p-5">
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                {allDiscoveries.map((id, index) => {
                  const item = natureDiscoveries.find(
                    (discovery) => discovery.id === id,
                  );
                  if (!item) return null;
                  return (
                    <motion.button
                      animate={
                        reducedMotion
                          ? undefined
                          : { y: [0, -4 - (index % 4), 0] }
                      }
                      className="aspect-square rounded-[1.4rem] border border-white/70 bg-white/60 text-4xl backdrop-blur active:scale-95"
                      key={id}
                      onClick={() => {
                        setSelectedDiscovery(item);
                        speak(
                          progress.voiceNames,
                          `${item.name}. ${item.fact}`,
                        );
                      }}
                      transition={{
                        duration: 3 + (index % 3),
                        repeat: Infinity,
                      }}
                      type="button"
                    >
                      {item.icon}
                    </motion.button>
                  );
                })}
              </div>
              {!allDiscoveries.length ? (
                <p className="py-16 text-center text-xl font-black">
                  Your first discovery will appear here.
                </p>
              ) : null}
            </div>
          </section>
        </main>
      ) : null}

      {screen === "gallery" ? (
        <main className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-12 sm:px-6">
          <button
            className="rounded-full bg-white/80 px-5 py-3 font-black"
            onClick={() => goTo("home")}
            type="button"
          >
            ← Nature world
          </button>
          <section className="mt-4 rounded-[2rem] border border-white/65 bg-white/75 p-5 backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#5c7962]">
              Animals, plants, and fungi
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.05em]">
              Nature Gallery
            </h1>
            <p className="mt-3 text-lg font-semibold text-[#5d735f]">
              {allDiscoveries.length} of {natureDiscoveries.length} discovered.
              Tap an unlocked friend to hear its name and fact.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {natureDiscoveries.map((item, index) => {
                const unlocked = allDiscoveries.includes(item.id);
                return (
                  <button
                    className={`rounded-[1.5rem] border-2 p-4 text-center ${
                      unlocked
                        ? "border-[#b6cfa8] bg-[#f4f9ee]"
                        : "border-slate-200 bg-slate-100 opacity-55"
                    }`}
                    disabled={!unlocked}
                    key={item.id}
                    onClick={() => {
                      setSelectedDiscovery(item);
                      speak(
                        progress.voiceNames,
                        `${item.name}. ${item.color}. ${item.fact}`,
                      );
                    }}
                    type="button"
                  >
                    <span className="text-5xl">
                      {unlocked ? item.icon : "🌫️"}
                    </span>
                    <span className="mt-3 block text-sm font-black">
                      {unlocked ? item.name : `Discovery ${index + 1}`}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[#687e6b]">
                      {unlocked ? item.habitat : "Hidden"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      ) : null}

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[180] bg-[#143727]/48 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.aside
              animate={{ x: 0 }}
              className={`relative h-full w-[min(88vw,24rem)] overflow-y-auto bg-[#f8f3df] p-5 shadow-2xl ${
                progress.leftHanded
                  ? "ml-auto border-l"
                  : "mr-auto border-r"
              } border-white/40`}
              exit={{ x: progress.leftHanded ? "105%" : "-105%" }}
              initial={{ x: progress.leftHanded ? "105%" : "-105%" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#607762]">
                    Nature menu
                  </p>
                  <h2 className="mt-1 text-3xl font-black">Explore</h2>
                </div>
                <button
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-black"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-[#dcebc9] to-[#f4d99a] p-5">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{tree.icon}</span>
                  <div>
                    <p className="font-black">{world.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#607762]">
                      {allDiscoveries.length} collected friends
                    </p>
                  </div>
                </div>
              </div>
              <nav className="mt-5 grid gap-3">
                {[
                  {
                    action: () => startMode(progress.lastMode),
                    icon: "▶",
                    label: "Play / Continue",
                  },
                  {
                    action: () => goTo("daily"),
                    icon: "🌤️",
                    label: "Daily Adventure",
                  },
                  {
                    action: () => {
                      goTo("home");
                      window.setTimeout(
                        () =>
                          document.getElementById("modes")?.scrollIntoView({
                            behavior: reducedMotion ? "auto" : "smooth",
                          }),
                        80,
                      );
                    },
                    icon: "🗺️",
                    label: "Levels & Modes",
                  },
                  {
                    action: () => goTo("garden"),
                    icon: "🌳",
                    label: "My Garden",
                  },
                  {
                    action: () => goTo("gallery"),
                    icon: "🐾",
                    label: "Nature Gallery",
                  },
                  {
                    action: () => {
                      setMenuOpen(false);
                      setParentGateOpen(true);
                    },
                    icon: "⚙️",
                    label: "Parent Settings",
                  },
                  {
                    action: () => {
                      setMenuOpen(false);
                      setCreditsOpen(true);
                    },
                    icon: "🍃",
                    label: "Credits",
                  },
                ].map((item) => (
                  <button
                    className="flex items-center gap-4 rounded-[1.3rem] border border-[#d7e2ce] bg-white/85 p-4 text-left font-black active:scale-[0.98]"
                    key={item.label}
                    onClick={item.action}
                    type="button"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f0df] text-xl">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>
              <Link
                className="mt-6 block rounded-full border border-[#9db49d] px-5 py-3 text-center text-sm font-black"
                href="/"
              >
                Return to Biloo Group
              </Link>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDiscovery ? (
          <Overlay
            onClose={() => setSelectedDiscovery(null)}
            subtitle={selectedDiscovery.habitat}
            title={selectedDiscovery.name}
          >
            <div className="text-center">
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [-2, 2, -2], y: [0, -7, 0] }
                }
                className="text-8xl"
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                {selectedDiscovery.icon}
              </motion.div>
              <p className="mt-4 text-lg font-black text-[#355c40]">
                {selectedDiscovery.color}
              </p>
              <p className="mx-auto mt-3 max-w-lg text-lg leading-8 text-[#5d735f]">
                {selectedDiscovery.fact}
              </p>
              <button
                className="mt-6 rounded-full bg-[#28796b] px-6 py-3 font-black text-white"
                onClick={() =>
                  speak(
                    progress.voiceNames,
                    `${selectedDiscovery.name}. ${selectedDiscovery.color}. ${selectedDiscovery.fact}`,
                  )
                }
                type="button"
              >
                Hear the nature fact 🔊
              </button>
            </div>
          </Overlay>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {parentGateOpen ? (
          <Overlay
            onClose={() => {
              stopGateHold();
              setParentGateOpen(false);
            }}
            subtitle="This prevents accidental changes by young players."
            title="Grown-up gate"
          >
            <div className="text-center">
              <div className="text-6xl">🦉</div>
              <p className="mx-auto mt-4 max-w-sm font-bold leading-7 text-[#5d735f]">
                Press and hold the tree until the golden ring fills.
              </p>
              <motion.button
                animate={holdingGate ? { scale: [1, 1.04, 1] } : undefined}
                className="relative mt-6 h-28 w-28 overflow-hidden rounded-full border-8 border-[#c9d9bb] bg-[#28796b] text-4xl shadow-xl"
                onPointerCancel={stopGateHold}
                onPointerDown={startGateHold}
                onPointerLeave={stopGateHold}
                onPointerUp={stopGateHold}
                type="button"
              >
                🌳
                {holdingGate ? (
                  <motion.span
                    animate={{ height: "100%" }}
                    className="absolute inset-x-0 bottom-0 bg-[#f3c84b]/45"
                    initial={{ height: 0 }}
                    transition={{ duration: 1.6, ease: "linear" }}
                  />
                ) : null}
              </motion.button>
            </div>
          </Overlay>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {parentOpen ? (
          <Overlay
            onClose={() => setParentOpen(false)}
            subtitle="Private local insights and comfort controls. This is not an IQ or developmental assessment."
            title="Parent Dashboard"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Classic levels", classicCompleted],
                ["Mini-game matches", totalModeWins(progress)],
                ["Discoveries", allDiscoveries.length],
                ["Play minutes", progress.totalPlayMinutes],
              ].map(([label, value]) => (
                <div
                  className="rounded-[1.3rem] bg-[#e9f1e1] p-4"
                  key={label}
                >
                  <p className="text-sm font-black text-[#607762]">
                    {label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#214d35]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[1.3rem] border border-[#d8e3cf] bg-white p-4">
              <p className="text-sm font-black uppercase tracking-[0.12em] text-[#607762]">
                Favorite mode
              </p>
              <p className="mt-2 text-xl font-black">{favoriteMode}</p>
              <p className="mt-2 text-sm leading-6 text-[#607762]">
                Difficulty quietly becomes more supportive after repeated gentle
                retries. No child-facing ability label is shown.
              </p>
            </div>
            <div className="mt-5 grid gap-3">
              <SettingRow
                description="Slower movement, fewer particles, longer pauses, and softer ambient sound."
                icon="🪷"
                title="Calm mode"
              >
                <Toggle
                  checked={progress.calmMode}
                  label="Calm mode"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      calmMode: !current.calmMode,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="Speaks real nature names, colors, habitats, and short facts after matches."
                icon="🗣️"
                title="Voice-guided learning"
              >
                <Toggle
                  checked={progress.voiceNames}
                  label="Voice-guided learning"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      voiceNames: !current.voiceNames,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="A quiet synthesized meadow melody with no downloaded audio."
                icon="🎵"
                title="Ambient music"
              >
                <Toggle
                  checked={progress.ambientMusic}
                  label="Ambient music"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      ambientMusic: !current.ambientMusic,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="Minimizes decorative movement throughout the world and mini-games."
                icon="🍃"
                title="Reduced motion"
              >
                <Toggle
                  checked={progress.reduceMotion}
                  label="Reduced motion"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      reduceMotion: !current.reduceMotion,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="Moves menus and key controls to favor left-hand use."
                icon="🤚"
                title="Left-handed layout"
              >
                <Toggle
                  checked={progress.leftHanded}
                  label="Left-handed layout"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      leftHanded: !current.leftHanded,
                    }))
                  }
                />
              </SettingRow>
            </div>
            {installPrompt ? (
              <button
                className="mt-5 w-full rounded-full bg-[#28796b] px-6 py-4 font-black text-white"
                onClick={() => void installApp()}
                type="button"
              >
                Install Nature Match on this device
              </button>
            ) : (
              <p className="mt-5 rounded-[1.3rem] bg-[#edf3e7] p-4 text-sm font-semibold leading-6 text-[#607762]">
                The install option appears here when the browser supports PWA
                installation. It is never shown in the child play area.
              </p>
            )}
            <button
              className="mt-4 w-full rounded-full border-2 border-[#d88a76] px-6 py-3 font-black text-[#954c3d]"
              onClick={() => {
                setProgress({ ...defaultProgress, dailyDate: dateKey });
                setParentOpen(false);
                goTo("home");
              }}
              type="button"
            >
              Reset expanded-world progress
            </button>
          </Overlay>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {creditsOpen ? (
          <Overlay
            onClose={() => setCreditsOpen(false)}
            subtitle="A calm, positive-only nature learning experience."
            title="Credits"
          >
            <div className="rounded-[1.7rem] bg-gradient-to-br from-[#e4efd8] via-white to-[#f5dfad] p-6 text-center">
              <div className="text-7xl">🌳</div>
              <p className="mt-4 text-2xl font-black">Nature Match World</p>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-[#5d735f]">
                Designed and built by Biloo Group. The game supports color
                language, pattern matching, memory, early counting, visual
                comparison, nature vocabulary, creativity, and hand-eye
                coordination. It does not calculate or display a literal IQ
                score.
              </p>
              <p className="mt-5 text-sm font-black">
                Founder & CEO: Mahir Aman
              </p>
            </div>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
