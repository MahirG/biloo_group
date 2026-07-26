"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  type BeadColor,
  type ColorSortLevel,
  colorSortLevels,
  getColorSortLevel,
} from "@/data/color-sort-levels";

type Bead = {
  id: string;
  color: BeadColor;
  decoy?: boolean;
  prefilled?: boolean;
};

type BeadTheme = "classic" | "pastel" | "glow" | "animals";
type BeadSize = "large" | "extra";

type GameProgress = {
  highestUnlocked: number;
  completed: Record<string, number>;
  stickers: string[];
  sound: boolean;
  colorblind: boolean;
  beadSize: BeadSize;
  theme: BeadTheme;
  demoSeen: boolean;
};

type DragState = {
  beadId: string;
  pointerId: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  moved: boolean;
};

const STORAGE_KEY = "biloo-color-sort-progress-v1";

const defaultProgress: GameProgress = {
  highestUnlocked: 1,
  completed: {},
  stickers: [],
  sound: true,
  colorblind: false,
  beadSize: "large",
  theme: "classic",
  demoSeen: false,
};

const colorDetails: Record<
  BeadColor,
  { solid: string; pastel: string; pattern: string; animal: string }
> = {
  red: {
    solid: "#ef4444",
    pastel: "#fb7185",
    pattern: "radial-gradient(circle, rgba(255,255,255,.9) 0 12%, transparent 13%)",
    animal: "🐞",
  },
  blue: {
    solid: "#2563eb",
    pastel: "#60a5fa",
    pattern: "repeating-linear-gradient(45deg, rgba(255,255,255,.85) 0 4px, transparent 4px 11px)",
    animal: "🐳",
  },
  yellow: {
    solid: "#facc15",
    pastel: "#fde047",
    pattern: "radial-gradient(circle, rgba(15,23,42,.45) 0 10%, transparent 11%)",
    animal: "🐥",
  },
  green: {
    solid: "#22c55e",
    pastel: "#4ade80",
    pattern: "repeating-linear-gradient(90deg, rgba(255,255,255,.75) 0 3px, transparent 3px 10px)",
    animal: "🐸",
  },
  purple: {
    solid: "#9333ea",
    pastel: "#c084fc",
    pattern: "radial-gradient(circle at 25% 25%, rgba(255,255,255,.85) 0 8%, transparent 9%)",
    animal: "🦄",
  },
  orange: {
    solid: "#f97316",
    pastel: "#fb923c",
    pattern: "repeating-linear-gradient(-45deg, rgba(255,255,255,.8) 0 3px, transparent 3px 9px)",
    animal: "🦊",
  },
  pink: {
    solid: "#ec4899",
    pastel: "#f9a8d4",
    pattern: "radial-gradient(circle, rgba(255,255,255,.9) 0 7%, transparent 8%)",
    animal: "🐷",
  },
  teal: {
    solid: "#14b8a6",
    pastel: "#5eead4",
    pattern: "repeating-linear-gradient(0deg, rgba(255,255,255,.8) 0 3px, transparent 3px 10px)",
    animal: "🐢",
  },
};

const stickerNames = [
  "Red Rocket",
  "Blue Whale",
  "Sunny Star",
  "Green Garden",
  "Purple Planet",
  "Orange Fox",
  "Rainbow Crown",
  "Pattern Pal",
  "Memory Moon",
  "Eagle Eyes",
  "Tower Builder",
  "Fix-It Friend",
  "Clever Five",
  "Color Detective",
  "Memory Master",
  "Little Genius",
];

function seededShuffle<T>(items: readonly T[], seed: number) {
  const result = [...items];
  let value = seed * 7919 + 17;

  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const swapIndex = Math.floor((value / 233280) * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function createLevelState(level: ColorSortLevel) {
  const targetBeads: Bead[] = level.rods.flatMap((rod, rodIndex) =>
    rod.map((color, beadIndex) => ({
      id: `level-${level.id}-rod-${rodIndex}-bead-${beadIndex}`,
      color,
    })),
  );

  const decoys: Bead[] = (level.decoys ?? []).map((color, index) => ({
    id: `level-${level.id}-decoy-${index}`,
    color,
    decoy: true,
  }));

  const rods: Bead[][] = level.rods.map(() => []);

  for (const [index, item] of (level.prefilledWrong ?? []).entries()) {
    rods[item.rod]?.push({
      id: `level-${level.id}-prefilled-${index}`,
      color: item.color,
      decoy: true,
      prefilled: true,
    });
  }

  return {
    pool: seededShuffle([...targetBeads, ...decoys], level.id),
    rods,
  };
}

function starsForMistakes(mistakes: number) {
  if (mistakes <= 1) return 3;
  if (mistakes <= 4) return 2;
  return 1;
}

function completedCount(progress: GameProgress) {
  return Object.keys(progress.completed).length;
}

function brainTier(progress: GameProgress) {
  const count = completedCount(progress);
  if (count >= 16) return "Little Genius";
  if (count >= 11) return "Puzzle Master";
  return "Bright Sorter";
}

function availableThemes(progress: GameProgress): BeadTheme[] {
  const count = completedCount(progress);
  const themes: BeadTheme[] = ["classic"];
  if (count >= 5) themes.push("pastel");
  if (count >= 10) themes.push("glow");
  if (count >= 15) themes.push("animals");
  return themes;
}

function playSound(enabled: boolean, kind: "pop" | "slide" | "win") {
  if (!enabled || typeof window === "undefined") return;

  const AudioContextConstructor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextConstructor) return;

  const context = new AudioContextConstructor();
  const now = context.currentTime;
  const notes =
    kind === "win"
      ? [523.25, 659.25, 783.99]
      : kind === "pop"
        ? [520]
        : [260];

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.1;
    oscillator.type = kind === "slide" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(kind === "win" ? 0.1 : 0.07, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.18);
  });

  window.setTimeout(() => void context.close(), 700);
}

function BeadVisual({
  bead,
  progress,
  selected = false,
  compact = false,
}: {
  bead: Bead;
  progress: GameProgress;
  selected?: boolean;
  compact?: boolean;
}) {
  const details = colorDetails[bead.color];
  const diameter = compact
    ? 34
    : progress.beadSize === "extra"
      ? 78
      : 64;
  const baseColor = progress.theme === "pastel" ? details.pastel : details.solid;
  const glow = progress.theme === "glow";

  return (
    <span
      aria-hidden="true"
      className="relative grid shrink-0 place-items-center rounded-full border-[5px] border-white/55 shadow-[inset_0_-8px_12px_rgba(15,23,42,.18),0_8px_16px_rgba(15,23,42,.18)]"
      style={{
        width: diameter,
        height: compact ? 22 : diameter * 0.68,
        backgroundColor: baseColor,
        backgroundImage: progress.colorblind ? details.pattern : undefined,
        backgroundSize: progress.colorblind ? "18px 18px" : undefined,
        boxShadow: glow
          ? `inset 0 -8px 12px rgba(15,23,42,.18), 0 0 22px ${baseColor}`
          : undefined,
        outline: selected ? "5px solid rgba(255,255,255,.95)" : undefined,
        outlineOffset: selected ? 4 : undefined,
      }}
    >
      <span className="h-3 w-5 rounded-full bg-white/65 shadow-inner" />
      {progress.theme === "animals" && !compact ? (
        <span className="absolute text-2xl" role="img">
          {details.animal}
        </span>
      ) : null}
    </span>
  );
}

function IconButton({
  label,
  children,
  onClick,
  active = false,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={`grid h-12 w-12 place-items-center rounded-full border text-xl shadow-sm transition active:scale-95 ${
        active
          ? "border-amber-300 bg-amber-200 text-amber-950"
          : "border-white/35 bg-white/85 text-graphite"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function ColorSortGame() {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);
  const [levelNumber, setLevelNumber] = useState(1);
  const [pool, setPool] = useState<Bead[]>([]);
  const [rods, setRods] = useState<Bead[][]>([]);
  const [selectedBeadId, setSelectedBeadId] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [wrongKey, setWrongKey] = useState("");
  const [wrongRepeats, setWrongRepeats] = useState(0);
  const [wrongBeadId, setWrongBeadId] = useState<string | null>(null);
  const [hintRod, setHintRod] = useState<number | null>(null);
  const [memoryVisible, setMemoryVisible] = useState(true);
  const [completeStars, setCompleteStars] = useState<number | null>(null);
  const [levelPickerOpen, setLevelPickerOpen] = useState(false);
  const [stickersOpen, setStickersOpen] = useState(false);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [holdingGate, setHoldingGate] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [paused, setPaused] = useState(false);

  const level = useMemo(() => getColorSortLevel(levelNumber), [levelNumber]);
  const selectedBead = pool.find((bead) => bead.id === selectedBeadId);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<GameProgress>;
          const merged: GameProgress = {
            ...defaultProgress,
            ...parsed,
            completed: parsed.completed ?? {},
            stickers: parsed.stickers ?? [],
          };
          const allowed = availableThemes(merged);
          if (!allowed.includes(merged.theme)) merged.theme = "classic";
          setProgress(merged);
          setLevelNumber(Math.min(16, Math.max(1, merged.highestUnlocked)));
          setShowDemo(!merged.demoSeen);
        } else {
          setShowDemo(true);
        }
      } catch {
        setProgress(defaultProgress);
        setShowDemo(true);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  useEffect(() => {
    const state = createLevelState(level);
    const resetTimer = window.setTimeout(() => {
      setPool(state.pool);
      setRods(state.rods);
      setSelectedBeadId(null);
      setDrag(null);
      dragRef.current = null;
      setMistakes(0);
      setWrongKey("");
      setWrongRepeats(0);
      setWrongBeadId(null);
      setHintRod(null);
      setCompleteStars(null);
      setMemoryVisible(true);
    }, 0);
    const memoryTimer = level.memory
      ? window.setTimeout(() => setMemoryVisible(false), 4200)
      : null;

    return () => {
      window.clearTimeout(resetTimer);
      if (memoryTimer !== null) window.clearTimeout(memoryTimer);
    };
  }, [level]);

  useEffect(() => {
    if (!showDemo) return;
    const timer = window.setTimeout(() => {
      setShowDemo(false);
      setProgress((current) => ({ ...current, demoSeen: true }));
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [showDemo]);

  useEffect(() => {
    const onVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  function completeLevel(nextRods: Bead[][]) {
    const solved = level.rods.every((target, rodIndex) => {
      const placed = nextRods[rodIndex] ?? [];
      return (
        placed.length === target.length &&
        placed.every(
          (bead, beadIndex) => !bead.decoy && bead.color === target[beadIndex],
        )
      );
    });

    if (!solved) return;

    const stars = starsForMistakes(mistakes);
    setCompleteStars(stars);
    playSound(progress.sound, "win");

    if (progress.sound && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const line = new SpeechSynthesisUtterance(
        level.id >= 15 ? "Amazing! Little genius!" : "Great sorting!",
      );
      line.rate = 0.9;
      line.pitch = 1.2;
      window.speechSynthesis.speak(line);
    }

    const sticker = stickerNames[level.id - 1] ?? `Level ${level.id} Star`;
    setProgress((current) => ({
      ...current,
      highestUnlocked: Math.min(
        colorSortLevels.length,
        Math.max(current.highestUnlocked, level.id + 1),
      ),
      completed: {
        ...current.completed,
        [String(level.id)]: Math.max(
          current.completed[String(level.id)] ?? 0,
          stars,
        ),
      },
      stickers: current.stickers.includes(sticker)
        ? current.stickers
        : [...current.stickers, sticker],
    }));
  }

  function revealMemoryHint() {
    if (!level.memory) return;
    setMemoryVisible(true);
    window.setTimeout(() => setMemoryVisible(false), 2100);
  }

  function showGentleHint(bead: Bead) {
    const match = level.rods.findIndex((target, rodIndex) => {
      const placed = rods[rodIndex] ?? [];
      const validPrefix = placed.every(
        (item, index) => !item.decoy && item.color === target[index],
      );
      return validPrefix && target[placed.length] === bead.color;
    });

    if (match >= 0) {
      setHintRod(match);
      window.setTimeout(() => setHintRod(null), 1800);
    } else {
      revealMemoryHint();
    }
  }

  function attemptDrop(beadId: string, rodIndex: number) {
    const bead = pool.find((item) => item.id === beadId);
    if (!bead || completeStars !== null) return;

    const currentRod = rods[rodIndex] ?? [];
    const target = level.rods[rodIndex] ?? [];
    const validPrefix = currentRod.every(
      (item, index) => !item.decoy && item.color === target[index],
    );
    const expected = target[currentRod.length];
    const correct = validPrefix && !bead.decoy && expected === bead.color;

    if (correct) {
      const nextRods = rods.map((rod, index) =>
        index === rodIndex ? [...rod, bead] : rod,
      );
      setPool((current) => current.filter((item) => item.id !== bead.id));
      setRods(nextRods);
      setSelectedBeadId(null);
      setHintRod(null);
      setWrongRepeats(0);
      setWrongKey("");
      playSound(progress.sound, "pop");
      window.setTimeout(() => completeLevel(nextRods), 220);
      return;
    }

    const key = `${bead.id}:${rodIndex}`;
    const repeats = key === wrongKey ? wrongRepeats + 1 : 1;
    setWrongKey(key);
    setWrongRepeats(repeats);
    setMistakes((current) => current + 1);
    setWrongBeadId(bead.id);
    playSound(progress.sound, "slide");
    window.setTimeout(() => setWrongBeadId(null), 420);
    if (repeats >= 3) showGentleHint(bead);
  }

  function returnTopBead(rodIndex: number) {
    if (completeStars !== null) return;
    const current = rods[rodIndex] ?? [];
    const top = current.at(-1);
    if (!top) return;

    setRods((allRods) =>
      allRods.map((rod, index) =>
        index === rodIndex ? rod.slice(0, -1) : rod,
      ),
    );
    setPool((currentPool) => seededShuffle([...currentPool, top], level.id + current.length));
    setSelectedBeadId(null);
    playSound(progress.sound, "slide");
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLButtonElement>,
    bead: Bead,
  ) {
    event.currentTarget.setPointerCapture(event.pointerId);
    const next: DragState = {
      beadId: bead.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    dragRef.current = next;
    setDrag(next);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const distance = Math.hypot(
      event.clientX - current.startX,
      event.clientY - current.startY,
    );
    const next = {
      ...current,
      x: event.clientX,
      y: event.clientY,
      moved: current.moved || distance > 8,
    };
    dragRef.current = next;
    setDrag(next);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const element = document.elementFromPoint(event.clientX, event.clientY);
    const rodElement = element?.closest<HTMLElement>("[data-rod-index]");

    if (rodElement) {
      attemptDrop(current.beadId, Number(rodElement.dataset.rodIndex));
    } else if (!current.moved) {
      setSelectedBeadId((selected) =>
        selected === current.beadId ? null : current.beadId,
      );
    }

    dragRef.current = null;
    setDrag(null);
  }

  function chooseLevel(nextLevel: number) {
    if (nextLevel > progress.highestUnlocked) return;
    setLevelNumber(nextLevel);
    setLevelPickerOpen(false);
  }

  function nextLevel() {
    if (level.id < colorSortLevels.length) {
      setLevelNumber(level.id + 1);
    } else {
      setLevelNumber(1);
    }
  }

  function openSettings() {
    if (parentUnlocked) {
      setSettingsOpen(true);
    } else {
      setParentGateOpen(true);
    }
  }

  function startParentHold() {
    setHoldingGate(true);
    holdTimer.current = window.setTimeout(() => {
      setParentUnlocked(true);
      setParentGateOpen(false);
      setSettingsOpen(true);
      setHoldingGate(false);
    }, 1600);
  }

  function stopParentHold() {
    setHoldingGate(false);
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }

  function resetProgress() {
    setProgress(defaultProgress);
    setLevelNumber(1);
    setSettingsOpen(false);
    setParentUnlocked(false);
    setShowDemo(true);
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6e0b5]">
        <motion.div
          animate={{ rotate: 360 }}
          className="h-16 w-16 rounded-full border-8 border-white/60 border-t-sapphire"
          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden bg-[#f3d59a] text-graphite"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(255,255,255,.55), transparent 28%), repeating-linear-gradient(8deg, rgba(120,72,24,.06) 0 2px, transparent 2px 24px)",
        touchAction: "none",
      }}
    >
      <header className="relative z-30 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-12 min-w-12 place-items-center rounded-2xl bg-graphite px-3 text-sm font-black text-white shadow-lg">
            OO
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-900/60">
              Biloo IQ Game
            </p>
            <p className="font-black">Color Sort</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton label="Choose level" onClick={() => setLevelPickerOpen(true)}>
            🧩
          </IconButton>
          <IconButton label="Open sticker book" onClick={() => setStickersOpen(true)}>
            ⭐
          </IconButton>
          <IconButton
            active={!progress.sound}
            label={progress.sound ? "Turn sound off" : "Turn sound on"}
            onClick={() =>
              setProgress((current) => ({ ...current, sound: !current.sound }))
            }
          >
            {progress.sound ? "🔊" : "🔇"}
          </IconButton>
          <IconButton label="Parent settings" onClick={openSettings}>
            ⚙️
          </IconButton>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-3 pb-8 sm:px-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-black shadow-sm">
              Level {level.id}
            </span>
            <span className="rounded-full bg-amber-900/10 px-4 py-2 text-sm font-bold text-amber-950/70">
              {level.tier === "easy" ? "Learn to Sort" : brainTier(progress)}
            </span>
          </div>
          <div aria-label={`${progress.stickers.length} stickers collected`} className="flex gap-1">
            {Array.from({ length: Math.min(5, Math.max(1, Math.ceil(progress.stickers.length / 3))) }).map(
              (_, index) => (
                <span className="text-xl" key={index}>
                  ⭐
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative rounded-[2.5rem] border-[10px] border-[#8b572a] bg-[#cf9551] p-3 shadow-[inset_0_0_0_4px_rgba(255,255,255,.18),0_24px_50px_rgba(84,48,18,.28)] sm:p-6">
          <div
            className="grid min-h-[23rem] items-end gap-2 rounded-[1.7rem] bg-[#edc985] px-2 pb-5 pt-20 shadow-inner sm:gap-4 sm:px-5"
            style={{
              gridTemplateColumns: `repeat(${level.rods.length}, minmax(0, 1fr))`,
              backgroundImage:
                "repeating-linear-gradient(4deg, rgba(120,72,24,.06) 0 2px, transparent 2px 20px)",
            }}
          >
            {level.rods.map((target, rodIndex) => {
              const placed = rods[rodIndex] ?? [];
              const showPattern = !level.memory || memoryVisible;
              return (
                <motion.button
                  animate={
                    hintRod === rodIndex
                      ? { scale: [1, 1.08, 1], filter: ["brightness(1)", "brightness(1.18)", "brightness(1)"] }
                      : undefined
                  }
                  aria-label={`Rod ${rodIndex + 1}`}
                  className="relative flex h-72 min-w-0 flex-col items-center justify-end rounded-[1.5rem] bg-white/15 px-1 pb-3 outline-none transition hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/80"
                  data-rod-index={rodIndex}
                  key={`${level.id}-rod-${rodIndex}`}
                  onClick={() => {
                    if (selectedBead) attemptDrop(selectedBead.id, rodIndex);
                  }}
                  type="button"
                >
                  <div className="absolute inset-x-1 top-2 flex min-h-12 flex-wrap items-center justify-center gap-1 rounded-2xl bg-white/65 p-2 shadow-sm">
                    {showPattern ? (
                      target.map((color, targetIndex) => (
                        <BeadVisual
                          bead={{ id: `target-${targetIndex}`, color }}
                          compact
                          key={`${color}-${targetIndex}`}
                          progress={progress}
                        />
                      ))
                    ) : (
                      <span className="text-3xl font-black text-amber-900/40">?</span>
                    )}
                  </div>

                  <span className="absolute bottom-5 h-[12.5rem] w-3 rounded-full bg-gradient-to-r from-[#8b572a] via-[#d8a96f] to-[#7b451d] shadow-lg" />
                  <span className="absolute bottom-2 h-7 w-20 max-w-[90%] rounded-full bg-[#8b572a] shadow-lg" />

                  <div className="relative z-10 flex min-h-[12.5rem] flex-col-reverse items-center justify-start gap-0.5 pb-3">
                    {placed.map((bead, beadIndex) => {
                      const isTop = beadIndex === placed.length - 1;
                      return (
                        <motion.span
                          animate={{ y: [18, -5, 0], scale: [0.9, 1.08, 1] }}
                          className={isTop ? "cursor-pointer" : ""}
                          key={bead.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (isTop) returnTopBead(rodIndex);
                          }}
                        >
                          <BeadVisual bead={bead} progress={progress} />
                        </motion.span>
                      );
                    })}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border-4 border-white/55 bg-white/48 p-4 shadow-lg backdrop-blur-sm sm:p-5">
          <div className="flex min-h-24 flex-wrap items-center justify-center gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {pool.map((bead) => (
                <motion.button
                  animate={
                    wrongBeadId === bead.id
                      ? { x: [0, -14, 12, -7, 0], rotate: [0, -5, 5, 0] }
                      : { x: 0 }
                  }
                  aria-label={`${bead.color} bead`}
                  className="touch-none rounded-full outline-none focus-visible:ring-4 focus-visible:ring-sapphire/50"
                  exit={{ opacity: 0, scale: 0.4, y: -30 }}
                  key={bead.id}
                  layout
                  onPointerCancel={handlePointerUp}
                  onPointerDown={(event) => handlePointerDown(event, bead)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  style={{ opacity: drag?.beadId === bead.id ? 0.18 : 1 }}
                  transition={{ type: "spring", stiffness: 360, damping: 24 }}
                  type="button"
                >
                  <BeadVisual
                    bead={bead}
                    progress={progress}
                    selected={selectedBeadId === bead.id}
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {drag ? (
        <div
          className="pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-1/2"
          style={{ left: drag.x, top: drag.y }}
        >
          <BeadVisual
            bead={pool.find((bead) => bead.id === drag.beadId) ?? { id: "drag", color: "blue" }}
            progress={progress}
            selected
          />
        </div>
      ) : null}

      <AnimatePresence>
        {showDemo && pool[0] ? (
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            className="pointer-events-none fixed inset-0 z-[70] bg-graphite/15"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4 }}
          >
            <motion.div
              animate={{ x: ["18vw", "50vw"], y: ["76vh", "38vh"], scale: [1, 1.2, 1] }}
              className="absolute left-0 top-0 text-6xl drop-shadow-xl"
              transition={{ duration: 2.8, ease: "easeInOut", repeat: 1 }}
            >
              ☝️
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {completeStars !== null ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-graphite/55 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
          >
            {Array.from({ length: 28 }).map((_, index) => (
              <motion.span
                animate={{
                  x: [0, ((index * 47) % 520) - 260],
                  y: [0, 380 + ((index * 23) % 180)],
                  rotate: [0, 360 + index * 20],
                  opacity: [1, 1, 0],
                }}
                className="absolute left-1/2 top-[14%] h-4 w-4 rounded-sm"
                key={index}
                style={{
                  backgroundColor: ["#ef4444", "#2563eb", "#facc15", "#22c55e", "#9333ea"][index % 5],
                }}
                transition={{ duration: 2.2, delay: index * 0.025, ease: "easeOut" }}
              />
            ))}
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-[2.5rem] border-8 border-amber-200 bg-white p-7 text-center shadow-2xl"
              initial={{ scale: 0.7, y: 60 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
                className="text-7xl"
                transition={{ repeat: Infinity, repeatDelay: 1.2 }}
              >
                🏆
              </motion.div>
              <div className="mt-4 flex justify-center gap-2 text-5xl">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.span
                    animate={{ scale: index < completeStars ? 1 : 0.55, opacity: index < completeStars ? 1 : 0.2 }}
                    key={index}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <p className="mt-5 text-3xl font-black">{stickerNames[level.id - 1]}</p>
              <p className="mt-2 font-bold text-muted">
                Sticker added to your book!
              </p>
              {level.id % 5 === 0 ? (
                <div className="mt-5 rounded-2xl bg-purple-100 px-4 py-3 font-black text-purple-900">
                  New bead theme unlocked ✨
                </div>
              ) : null}
              <button
                className="mt-7 w-full rounded-full bg-sapphire px-6 py-4 text-lg font-black text-white shadow-lg transition active:scale-95"
                onClick={nextLevel}
                type="button"
              >
                {level.id < 16 ? "Next ▶" : "Play again ↻"}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {levelPickerOpen ? (
          <Modal title="Choose a puzzle" onClose={() => setLevelPickerOpen(false)}>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {colorSortLevels.map((item) => {
                const unlocked = item.id <= progress.highestUnlocked;
                const stars = progress.completed[String(item.id)] ?? 0;
                return (
                  <button
                    aria-label={`Level ${item.id}${unlocked ? "" : " locked"}`}
                    className={`aspect-square rounded-2xl border-2 p-2 text-lg font-black transition ${
                      unlocked
                        ? "border-sapphire/20 bg-blue-50 text-sapphire active:scale-95"
                        : "border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                    disabled={!unlocked}
                    key={item.id}
                    onClick={() => chooseLevel(item.id)}
                    type="button"
                  >
                    {unlocked ? item.id : "🔒"}
                    <span className="mt-1 block text-[10px] tracking-[-0.08em]">
                      {stars ? "⭐".repeat(stars) : "•"}
                    </span>
                  </button>
                );
              })}
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {stickersOpen ? (
          <Modal title="Sticker book" onClose={() => setStickersOpen(false)}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stickerNames.map((sticker, index) => {
                const unlocked = progress.stickers.includes(sticker);
                return (
                  <div
                    className={`rounded-2xl border-2 p-4 text-center ${
                      unlocked
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-200 bg-slate-50 opacity-45"
                    }`}
                    key={sticker}
                  >
                    <div className="text-4xl">{unlocked ? ["🚀", "🐳", "☀️", "🌱", "🪐", "🦊"][index % 6] : "❔"}</div>
                    <p className="mt-2 text-sm font-black">{unlocked ? sticker : `Level ${index + 1}`}</p>
                  </div>
                );
              })}
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {parentGateOpen ? (
          <Modal title="Grown-ups only" onClose={() => setParentGateOpen(false)}>
            <p className="text-center text-lg text-muted">
              Press and hold the button to open parent settings.
            </p>
            <button
              className={`mt-6 w-full overflow-hidden rounded-full border-4 border-sapphire px-6 py-5 text-lg font-black transition ${
                holdingGate ? "bg-sapphire text-white" : "bg-white text-sapphire"
              }`}
              onPointerCancel={stopParentHold}
              onPointerDown={startParentHold}
              onPointerLeave={stopParentHold}
              onPointerUp={stopParentHold}
              type="button"
            >
              {holdingGate ? "Keep holding…" : "Hold for grown-ups"}
            </button>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen ? (
          <Modal title="Parent settings" onClose={() => setSettingsOpen(false)}>
            <div className="space-y-6">
              <SettingRow label="Colorblind patterns">
                <Toggle
                  enabled={progress.colorblind}
                  onToggle={() =>
                    setProgress((current) => ({
                      ...current,
                      colorblind: !current.colorblind,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow label="Extra-large beads">
                <Toggle
                  enabled={progress.beadSize === "extra"}
                  onToggle={() =>
                    setProgress((current) => ({
                      ...current,
                      beadSize: current.beadSize === "extra" ? "large" : "extra",
                    }))
                  }
                />
              </SettingRow>
              <div>
                <p className="font-black">Bead theme</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {availableThemes(progress).map((theme) => (
                    <button
                      className={`rounded-xl border-2 px-4 py-3 font-bold capitalize ${
                        progress.theme === theme
                          ? "border-sapphire bg-blue-50 text-sapphire"
                          : "border-slate-200"
                      }`}
                      key={theme}
                      onClick={() =>
                        setProgress((current) => ({ ...current, theme }))
                      }
                      type="button"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <Link
                  className="rounded-full bg-graphite px-5 py-4 text-center font-black text-white"
                  href="/"
                >
                  Exit to Biloo Group
                </Link>
                <button
                  className="rounded-full border-2 border-red-200 px-5 py-4 font-black text-red-700"
                  onClick={resetProgress}
                  type="button"
                >
                  Reset progress
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      {paused ? (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-graphite/70 text-6xl text-white backdrop-blur-md">
          ⏸️
        </div>
      ) : null}
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-graphite/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        animate={{ y: 0, scale: 1 }}
        aria-modal="true"
        className="my-8 w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
        initial={{ y: 40, scale: 0.94 }}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">{title}</h2>
          <button
            aria-label="Close"
            className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-2xl font-black"
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

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="font-black">{label}</p>
      {children}
    </div>
  );
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      aria-pressed={enabled}
      className={`relative h-9 w-16 rounded-full transition ${enabled ? "bg-sapphire" : "bg-slate-300"}`}
      onClick={onToggle}
      type="button"
    >
      <span
        className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition ${enabled ? "left-8" : "left-1"}`}
      />
    </button>
  );
}
