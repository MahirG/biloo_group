"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
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
import {
  natureCollectibles,
  naturePieces,
  natureThemes,
  themeForProgress,
  treeStage,
} from "@/data/nature-match";

type NaturePiece = {
  id: string;
  color: BeadColor;
  decoy?: boolean;
  prefilled?: boolean;
};

type PieceSize = "large" | "extra";
type Panel = "levels" | "settings" | "gallery" | "credits" | null;
type CompanionMood = "calm" | "happy" | "thinking";

type GameProgress = {
  highestUnlocked: number;
  completed: Record<string, number>;
  collectibles: string[];
  sound: boolean;
  music: boolean;
  colorblind: boolean;
  pieceSize: PieceSize;
  demoSeen: boolean;
};

type DragState = {
  pieceId: string;
  pointerId: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  moved: boolean;
};

const STORAGE_KEY = "biloo-nature-match-progress-v2";
const LEGACY_STORAGE_KEY = "biloo-color-sort-progress-v1";

const defaultProgress: GameProgress = {
  highestUnlocked: 1,
  completed: {},
  collectibles: [],
  sound: true,
  music: false,
  colorblind: false,
  pieceSize: "large",
  demoSeen: false,
};

const levelNatureNames = [
  "Ladybird Landing",
  "Sunny Meadow",
  "Butterfly Friends",
  "Woodland Picnic",
  "Four Garden Friends",
  "Rainbow Forest",
  "Nature Sorting Star",
  "Forest Patterns",
  "Remember the Meadow",
  "Sharp Forest Eyes",
  "Garden Pattern Builder",
  "Mend the Woodland",
  "Five Clever Trees",
  "Nature Color Cousins",
  "Moon Garden Memory",
  "Great Forest Celebration",
] as const;

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
  const targetPieces: NaturePiece[] = level.rods.flatMap((rod, rodIndex) =>
    rod.map((color, pieceIndex) => ({
      id: `level-${level.id}-tree-${rodIndex}-piece-${pieceIndex}`,
      color,
    })),
  );

  const decoys: NaturePiece[] = (level.decoys ?? []).map((color, index) => ({
    id: `level-${level.id}-decoy-${index}`,
    color,
    decoy: true,
  }));

  const trees: NaturePiece[][] = level.rods.map(() => []);

  for (const [index, item] of (level.prefilledWrong ?? []).entries()) {
    trees[item.rod]?.push({
      id: `level-${level.id}-prefilled-${index}`,
      color: item.color,
      decoy: true,
      prefilled: true,
    });
  }

  return {
    pool: seededShuffle([...targetPieces, ...decoys], level.id),
    trees,
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

function natureTier(progress: GameProgress) {
  const count = completedCount(progress);
  if (count >= 13) return "Forest Guardian";
  if (count >= 8) return "Woodland Matcher";
  if (count >= 4) return "Meadow Explorer";
  return "Curious Sprout";
}

function playSound(enabled: boolean, kind: "bloom" | "rustle" | "celebrate") {
  if (!enabled || typeof window === "undefined") return;

  const AudioContextConstructor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextConstructor) return;

  const context = new AudioContextConstructor();
  const now = context.currentTime;
  const notes =
    kind === "celebrate"
      ? [523.25, 659.25, 783.99, 1046.5]
      : kind === "bloom"
        ? [587.33, 783.99]
        : [293.66];

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.09;
    oscillator.type = kind === "rustle" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(
      kind === "celebrate" ? 0.085 : 0.055,
      start + 0.025,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.24);
  });

  window.setTimeout(() => void context.close(), 900);
}

function gentleHaptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function NaturePieceVisual({
  piece,
  progress,
  selected = false,
  compact = false,
}: {
  piece: NaturePiece;
  progress: GameProgress;
  selected?: boolean;
  compact?: boolean;
}) {
  const details = naturePieces[piece.color];
  const diameter = compact ? 36 : progress.pieceSize === "extra" ? 82 : 68;

  return (
    <span
      aria-hidden="true"
      className="relative grid shrink-0 place-items-center overflow-hidden border-[4px] border-white/65 shadow-[inset_0_-8px_14px_rgba(35,68,46,.16),0_9px_18px_rgba(35,68,46,.2)]"
      style={{
        width: diameter,
        height: compact ? 32 : diameter,
        borderRadius: compact
          ? "45% 55% 48% 52%"
          : "44% 56% 52% 48% / 52% 45% 55% 48%",
        backgroundColor: details.colorHex,
        backgroundImage: progress.colorblind ? details.pattern : undefined,
        backgroundSize: progress.colorblind ? "18px 18px" : undefined,
        outline: selected ? "5px solid rgba(255,255,255,.98)" : undefined,
        outlineOffset: selected ? 4 : undefined,
      }}
    >
      <span
        className={compact ? "text-lg" : "text-3xl"}
        role="img"
        aria-label={details.name}
      >
        {details.icon}
      </span>
      {!compact ? (
        <span className="absolute left-3 top-2 h-2.5 w-5 rotate-[-18deg] rounded-full bg-white/45" />
      ) : null}
    </span>
  );
}

function NatureParticles({
  seed,
  intense = false,
}: {
  seed: number;
  intense?: boolean;
}) {
  const icons = ["🍃", "🌸", "✨", "🌼", "🍂", "🦋"];
  const count = intense ? 34 : 12;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => {
        const direction = ((index * 67 + seed * 17) % 520) - 260;
        return (
          <motion.span
            animate={{
              x: [0, direction],
              y: [0, intense ? 540 : 190],
              rotate: [0, 240 + index * 23],
              scale: [0.5, 1.15, 0.75],
              opacity: [0, 1, 0],
            }}
            className="absolute left-1/2 top-[24%] text-2xl drop-shadow-sm"
            initial={{ opacity: 0 }}
            key={`${seed}-${index}`}
            transition={{
              duration: intense ? 2.5 : 1.25,
              delay: index * (intense ? 0.025 : 0.018),
              ease: "easeOut",
            }}
          >
            {icons[index % icons.length]}
          </motion.span>
        );
      })}
    </div>
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
      className={`grid h-12 w-12 place-items-center rounded-2xl border text-xl shadow-[0_8px_18px_rgba(37,77,52,.16)] transition active:scale-95 ${
        active
          ? "border-[#d99a47] bg-[#f6d889] text-[#5a3a16]"
          : "border-white/55 bg-white/88 text-[#214d35] backdrop-blur"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[120] grid place-items-center bg-[#163d2b]/60 p-4 backdrop-blur-md"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        animate={{ scale: 1, y: 0 }}
        aria-modal="true"
        className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/60 bg-[#fbf8ed] p-6 shadow-[0_30px_90px_rgba(16,55,36,.35)] sm:p-8"
        initial={{ scale: 0.92, y: 35 }}
        role="dialog"
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div
          className="pointer-events-none absolute -right-7 -top-8 text-8xl opacity-10"
          aria-hidden="true"
        >
          🍃
        </div>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#214d35]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 leading-7 text-[#55705d]">{subtitle}</p>
            ) : null}
          </div>
          <button
            aria-label="Close"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e9efdf] text-xl font-black text-[#214d35] transition hover:rotate-6"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="mt-7">{children}</div>
      </motion.section>
    </motion.div>
  );
}

export function ColorSortGame() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);
  const [levelNumber, setLevelNumber] = useState(1);
  const [round, setRound] = useState(0);
  const [pool, setPool] = useState<NaturePiece[]>([]);
  const [trees, setTrees] = useState<NaturePiece[][]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [wrongKey, setWrongKey] = useState("");
  const [wrongRepeats, setWrongRepeats] = useState(0);
  const [wrongPieceId, setWrongPieceId] = useState<string | null>(null);
  const [hintTree, setHintTree] = useState<number | null>(null);
  const [memoryVisible, setMemoryVisible] = useState(true);
  const [completeStars, setCompleteStars] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [pendingPanel, setPendingPanel] = useState<Panel>(null);
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [holdingGate, setHoldingGate] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [paused, setPaused] = useState(false);
  const [companionMood, setCompanionMood] = useState<CompanionMood>("calm");
  const [burstId, setBurstId] = useState(0);

  const level = useMemo(() => getColorSortLevel(levelNumber), [levelNumber]);
  const selectedPiece = pool.find((piece) => piece.id === selectedPieceId);
  const count = completedCount(progress);
  const seasonKey = themeForProgress(count);
  const season = natureThemes[seasonKey];
  const tree = treeStage(count);
  const collectible = natureCollectibles[level.id - 1];
  const levelName = levelNatureNames[level.id - 1] ?? level.title;
  const colorsInLevel = useMemo(
    () => Array.from(new Set(level.rods.flat())),
    [level.rods],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved =
          window.localStorage.getItem(STORAGE_KEY) ??
          window.localStorage.getItem(LEGACY_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<GameProgress> & {
            stickers?: string[];
            beadSize?: PieceSize;
          };
          const completed = parsed.completed ?? {};
          const legacyCount = Math.max(
            Object.keys(completed).length,
            parsed.stickers?.length ?? 0,
          );
          const merged: GameProgress = {
            ...defaultProgress,
            ...parsed,
            completed,
            collectibles:
              parsed.collectibles ??
              natureCollectibles.slice(0, legacyCount).map((item) => item.name),
            pieceSize: parsed.pieceSize ?? parsed.beadSize ?? "large",
          };
          setProgress(merged);
          setLevelNumber(
            Math.min(
              colorSortLevels.length,
              Math.max(1, merged.highestUnlocked),
            ),
          );
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
      setTrees(state.trees);
      setSelectedPieceId(null);
      setDrag(null);
      dragRef.current = null;
      setMistakes(0);
      setWrongKey("");
      setWrongRepeats(0);
      setWrongPieceId(null);
      setHintTree(null);
      setCompleteStars(null);
      setMemoryVisible(true);
      setCompanionMood("calm");
    }, 0);
    const memoryTimer = level.memory
      ? window.setTimeout(() => setMemoryVisible(false), 4200)
      : null;

    return () => {
      window.clearTimeout(resetTimer);
      if (memoryTimer !== null) window.clearTimeout(memoryTimer);
    };
  }, [level, round]);

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
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!hydrated || !progress.music || typeof window === "undefined") return;
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const playPhrase = () => {
      const base = context.currentTime + 0.04;
      [261.63, 329.63, 392].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = base + index * 0.34;
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.018, start + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.1);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + 1.2);
      });
    };

    void context
      .resume()
      .then(playPhrase)
      .catch(() => undefined);
    const interval = window.setInterval(playPhrase, 6500);
    return () => {
      window.clearInterval(interval);
      void context.close();
    };
  }, [hydrated, progress.music]);

  function completeLevel(nextTrees: NaturePiece[][]) {
    const solved = level.rods.every((target, treeIndex) => {
      const placed = nextTrees[treeIndex] ?? [];
      return (
        placed.length === target.length &&
        placed.every(
          (piece, pieceIndex) =>
            !piece.decoy && piece.color === target[pieceIndex],
        )
      );
    });

    if (!solved) return;

    const stars = starsForMistakes(mistakes);
    setCompleteStars(stars);
    setCompanionMood("happy");
    setBurstId((current) => current + 1);
    playSound(progress.sound, "celebrate");
    gentleHaptic([25, 45, 30]);

    if (progress.sound && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const line = new SpeechSynthesisUtterance(
        level.id >= 15 ? "Amazing forest matching!" : "Beautiful nature match!",
      );
      line.rate = 0.9;
      line.pitch = 1.15;
      window.speechSynthesis.speak(line);
    }

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
      collectibles: current.collectibles.includes(collectible.name)
        ? current.collectibles
        : [...current.collectibles, collectible.name],
    }));
  }

  function revealMemoryHint() {
    if (!level.memory) return;
    setMemoryVisible(true);
    window.setTimeout(() => setMemoryVisible(false), 2100);
  }

  function showGentleHint(piece: NaturePiece) {
    const match = level.rods.findIndex((target, treeIndex) => {
      const placed = trees[treeIndex] ?? [];
      const validPrefix = placed.every(
        (item, index) => !item.decoy && item.color === target[index],
      );
      return validPrefix && target[placed.length] === piece.color;
    });

    if (match >= 0) {
      setHintTree(match);
      window.setTimeout(() => setHintTree(null), 1800);
    } else {
      revealMemoryHint();
    }
  }

  function attemptDrop(pieceId: string, treeIndex: number) {
    const piece = pool.find((item) => item.id === pieceId);
    if (!piece || completeStars !== null) return;

    const currentTree = trees[treeIndex] ?? [];
    const target = level.rods[treeIndex] ?? [];
    const validPrefix = currentTree.every(
      (item, index) => !item.decoy && item.color === target[index],
    );
    const expected = target[currentTree.length];
    const correct = validPrefix && !piece.decoy && expected === piece.color;

    if (correct) {
      const nextTrees = trees.map((treeItems, index) =>
        index === treeIndex ? [...treeItems, piece] : treeItems,
      );
      setPool((current) => current.filter((item) => item.id !== piece.id));
      setTrees(nextTrees);
      setSelectedPieceId(null);
      setHintTree(null);
      setWrongRepeats(0);
      setWrongKey("");
      setCompanionMood("happy");
      setBurstId((current) => current + 1);
      playSound(progress.sound, "bloom");
      gentleHaptic(18);
      window.setTimeout(() => setCompanionMood("calm"), 850);
      window.setTimeout(() => completeLevel(nextTrees), 220);
      return;
    }

    const key = `${piece.id}:${treeIndex}`;
    const repeats = key === wrongKey ? wrongRepeats + 1 : 1;
    setWrongKey(key);
    setWrongRepeats(repeats);
    setMistakes((current) => current + 1);
    setWrongPieceId(piece.id);
    setCompanionMood("thinking");
    playSound(progress.sound, "rustle");
    gentleHaptic([8, 28, 8]);
    window.setTimeout(() => {
      setWrongPieceId(null);
      setCompanionMood("calm");
    }, 520);
    if (repeats >= 3) showGentleHint(piece);
  }

  function returnTopPiece(treeIndex: number) {
    if (completeStars !== null) return;
    const current = trees[treeIndex] ?? [];
    const top = current.at(-1);
    if (!top) return;

    setTrees((allTrees) =>
      allTrees.map((treeItems, index) =>
        index === treeIndex ? treeItems.slice(0, -1) : treeItems,
      ),
    );
    setPool((currentPool) =>
      seededShuffle([...currentPool, top], level.id + current.length),
    );
    setSelectedPieceId(null);
    playSound(progress.sound, "rustle");
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLButtonElement>,
    piece: NaturePiece,
  ) {
    event.currentTarget.setPointerCapture(event.pointerId);
    const next: DragState = {
      pieceId: piece.id,
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
    const treeElement = element?.closest<HTMLElement>("[data-tree-index]");

    if (treeElement) {
      attemptDrop(current.pieceId, Number(treeElement.dataset.treeIndex));
    } else if (!current.moved) {
      setSelectedPieceId((selected) =>
        selected === current.pieceId ? null : current.pieceId,
      );
    }

    dragRef.current = null;
    setDrag(null);
  }

  function handleTreeKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
    treeIndex: number,
  ) {
    if ((event.key === "Enter" || event.key === " ") && selectedPiece) {
      event.preventDefault();
      attemptDrop(selectedPiece.id, treeIndex);
    }
  }

  function chooseLevel(nextLevel: number) {
    if (nextLevel > progress.highestUnlocked) return;
    setLevelNumber(nextLevel);
    setRound((current) => current + 1);
    setPanel(null);
    setMenuOpen(false);
  }

  function nextLevel() {
    setLevelNumber(level.id < colorSortLevels.length ? level.id + 1 : 1);
    setRound((current) => current + 1);
  }

  function startNewGame() {
    setLevelNumber(1);
    setRound((current) => current + 1);
    setMenuOpen(false);
    setPanel(null);
  }

  function restartLevel() {
    setRound((current) => current + 1);
    setMenuOpen(false);
  }

  function openPanel(nextPanel: Exclude<Panel, null>) {
    setMenuOpen(false);
    if (nextPanel === "settings" && !parentUnlocked) {
      setPendingPanel(nextPanel);
      setParentGateOpen(true);
      return;
    }
    setPanel(nextPanel);
  }

  function startParentHold() {
    setHoldingGate(true);
    holdTimer.current = window.setTimeout(() => {
      setParentUnlocked(true);
      setParentGateOpen(false);
      setPanel(pendingPanel ?? "settings");
      setPendingPanel(null);
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
    setRound((current) => current + 1);
    setPanel(null);
    setParentUnlocked(false);
    setShowDemo(true);
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#dbe9c5]">
        <motion.div
          animate={{
            rotate: reduceMotion ? 0 : 360,
            scale: [0.95, 1.05, 0.95],
          }}
          className="grid h-24 w-24 place-items-center rounded-[2rem] bg-white/75 text-5xl shadow-xl"
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        >
          🌱
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden text-[#183f2a]"
      style={{
        background: `linear-gradient(180deg, ${season.sky} 0%, #f8f3dc 48%, ${season.ground} 100%)`,
        touchAction: "none",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={reduceMotion ? undefined : { x: ["-12%", "112%"] }}
          className="absolute top-[10%] text-5xl opacity-70"
          initial={{ x: "-12%" }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          ☁️
        </motion.div>
        <motion.div
          animate={
            reduceMotion ? undefined : { x: ["108%", "-10%"], y: [0, -15, 0] }
          }
          className="absolute top-[19%] text-3xl"
          initial={{ x: "108%" }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          🦋
        </motion.div>
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.span
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -10 - (index % 4) * 3, 0], rotate: [-4, 5, -4] }
            }
            className="absolute bottom-0 text-5xl opacity-75"
            key={index}
            style={{ left: `${index * 11 - 3}%` }}
            transition={{
              duration: 3.5 + (index % 3),
              delay: index * 0.12,
              repeat: Infinity,
            }}
          >
            {index % 3 === 0 ? "🌲" : index % 3 === 1 ? "🌳" : "🌿"}
          </motion.span>
        ))}
      </div>

      <header className="relative z-40 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <button
          aria-expanded={menuOpen}
          aria-label="Open nature game menu"
          className="group grid h-13 w-13 place-items-center rounded-2xl border border-white/60 bg-white/88 shadow-[0_10px_24px_rgba(30,75,49,.2)] backdrop-blur transition active:scale-95"
          onClick={() => setMenuOpen(true)}
          type="button"
        >
          <span className="grid gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-6 rounded-full bg-[#214d35] transition group-hover:w-7" />
            <span className="h-0.5 w-6 rounded-full bg-[#214d35]" />
            <span className="h-0.5 w-6 rounded-full bg-[#214d35] transition group-hover:w-4" />
          </span>
        </button>

        <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/45 bg-white/60 px-4 py-2 shadow-sm backdrop-blur">
          <span className="text-3xl" aria-hidden="true">
            🌿
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-[#4f775e]">
              Biloo nature game
            </p>
            <p className="truncate font-black">Nature Match</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            active={!progress.sound}
            label={
              progress.sound
                ? "Turn nature sounds off"
                : "Turn nature sounds on"
            }
            onClick={() =>
              setProgress((current) => ({ ...current, sound: !current.sound }))
            }
          >
            {progress.sound ? "🔊" : "🔇"}
          </IconButton>
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : companionMood === "happy"
                  ? { y: [0, -10, 0], rotate: [0, -8, 8, 0] }
                  : companionMood === "thinking"
                    ? { rotate: [0, -6, 6, 0] }
                    : { y: [0, -3, 0] }
            }
            aria-label={`Happy animal companion in ${season.name}`}
            className="grid h-13 w-13 place-items-center rounded-2xl border border-white/55 bg-white/78 text-3xl shadow-lg backdrop-blur"
            role="img"
            transition={{
              duration: companionMood === "happy" ? 0.6 : 2.4,
              repeat: companionMood === "calm" ? Infinity : 0,
            }}
          >
            {season.companion}
          </motion.div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-3 pb-10 sm:px-6">
        <section className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-[1.75rem] border border-white/55 bg-white/68 p-4 shadow-[0_14px_30px_rgba(32,73,47,.13)] backdrop-blur sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#214d35] px-4 py-2 text-sm font-black text-white">
                Level {level.id}
              </span>
              <span className="rounded-full bg-[#e8f1d9] px-4 py-2 text-sm font-bold text-[#355c40]">
                {level.tier === "easy" ? "Meadow Start" : natureTier(progress)}
              </span>
              {level.memory ? (
                <button
                  className="rounded-full bg-[#dcd4ef] px-4 py-2 text-sm font-black text-[#59477a] transition active:scale-95"
                  onClick={revealMemoryHint}
                  type="button"
                >
                  👀 Pattern peek
                </button>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
              {levelName}
            </h1>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#56705d] sm:text-base">
              Match each animal, flower, leaf, or mushroom with the nature
              pattern growing above its tree.
            </p>
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Nature colors in this level"
            >
              {colorsInLevel.map((color) => {
                const details = naturePieces[color];
                return (
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/68 px-3 py-1.5 text-xs font-bold text-[#355c40]"
                    key={color}
                  >
                    <span aria-hidden="true">{details.icon}</span>
                    {details.colorName}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-64 items-center gap-4 rounded-[1.75rem] border border-white/55 bg-white/68 p-4 shadow-[0_14px_30px_rgba(32,73,47,.13)] backdrop-blur">
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              className="text-6xl"
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              {tree.icon}
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#5e7b65]">
                Growing tree
              </p>
              <p className="mt-1 font-black">{tree.name}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d7e3c9]">
                <motion.div
                  animate={{
                    width: `${Math.min(100, (count / tree.next) * 100)}%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-[#76a96b] to-[#dc923c]"
                  initial={false}
                />
              </div>
              <p className="mt-1 text-xs font-semibold text-[#69806e]">
                {count} of {tree.next} forest discoveries
              </p>
            </div>
          </div>
        </section>

        <section className="relative rounded-[2.7rem] border-[8px] border-[#6d4b2f] bg-[#9b724a] p-3 shadow-[inset_0_0_0_4px_rgba(255,255,255,.18),0_28px_65px_rgba(40,66,42,.24)] sm:p-5">
          <div
            className="grid min-h-[24rem] items-end gap-2 rounded-[2rem] border border-white/30 px-2 pb-5 pt-24 shadow-inner sm:gap-4 sm:px-5"
            style={{
              gridTemplateColumns: `repeat(${level.rods.length}, minmax(0, 1fr))`,
              background: `linear-gradient(180deg, rgba(255,255,255,.48), rgba(238,244,215,.72)), repeating-linear-gradient(8deg, rgba(72,104,62,.08) 0 2px, transparent 2px 24px), ${season.ground}`,
            }}
          >
            {level.rods.map((target, treeIndex) => {
              const placed = trees[treeIndex] ?? [];
              const showPattern = !level.memory || memoryVisible;
              return (
                <motion.div
                  animate={
                    hintTree === treeIndex
                      ? {
                          scale: [1, 1.07, 1],
                          filter: [
                            "brightness(1)",
                            "brightness(1.15)",
                            "brightness(1)",
                          ],
                        }
                      : undefined
                  }
                  aria-label={`Nature tree ${treeIndex + 1}`}
                  className="relative flex h-72 min-w-0 cursor-pointer flex-col items-center justify-end rounded-[1.7rem] bg-white/18 px-1 pb-3 outline-none transition hover:bg-white/28 focus-visible:ring-4 focus-visible:ring-white/85"
                  data-tree-index={treeIndex}
                  key={`${level.id}-tree-${treeIndex}`}
                  onClick={() => {
                    if (selectedPiece) attemptDrop(selectedPiece.id, treeIndex);
                  }}
                  onKeyDown={(event) => handleTreeKeyDown(event, treeIndex)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="absolute inset-x-1 top-2 flex min-h-16 flex-wrap items-center justify-center gap-1 rounded-[1.4rem] border border-white/55 bg-white/72 p-2 shadow-sm backdrop-blur">
                    {showPattern ? (
                      target.map((color, targetIndex) => (
                        <NaturePieceVisual
                          compact
                          key={`${color}-${targetIndex}`}
                          piece={{ id: `target-${targetIndex}`, color }}
                          progress={progress}
                        />
                      ))
                    ) : (
                      <span className="text-4xl font-black text-[#4f7059]/45">
                        🍃?
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-6 h-[12.5rem] w-5 rounded-[45%] bg-gradient-to-r from-[#63412b] via-[#aa7d4f] to-[#5b3925] shadow-lg" />
                  <span className="absolute bottom-2 h-8 w-24 max-w-[92%] rounded-[50%] bg-[#5f432e] shadow-lg" />
                  <span className="absolute bottom-[8.7rem] left-1/2 h-3 w-[72%] -translate-x-1/2 rounded-full bg-[#765037] shadow-md" />

                  <div className="relative z-10 flex min-h-[12.5rem] flex-col-reverse items-center justify-start gap-1 pb-3">
                    {placed.map((piece, pieceIndex) => {
                      const isTop = pieceIndex === placed.length - 1;
                      return (
                        <motion.button
                          animate={{ y: [16, -5, 0], scale: [0.9, 1.08, 1] }}
                          aria-label={
                            isTop
                              ? `Return ${naturePieces[piece.color].colorName} ${naturePieces[piece.color].name} to the meadow`
                              : `${naturePieces[piece.color].colorName} ${naturePieces[piece.color].name}`
                          }
                          className={
                            isTop
                              ? "cursor-pointer rounded-full"
                              : "pointer-events-none rounded-full"
                          }
                          key={piece.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            if (isTop) returnTopPiece(treeIndex);
                          }}
                          type="button"
                        >
                          <NaturePieceVisual
                            piece={piece}
                            progress={progress}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-5 rounded-[2rem] border border-white/65 bg-white/58 p-4 shadow-[0_18px_42px_rgba(31,77,48,.16)] backdrop-blur-md sm:p-5">
          <div className="flex items-center justify-between gap-4 px-2 pb-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#66806c]">
                Nature basket
              </p>
              <p className="text-sm font-bold text-[#355c40]">
                Drag or tap a friend, then choose its matching tree.
              </p>
            </div>
            {selectedPiece ? (
              <span className="rounded-full bg-[#214d35] px-4 py-2 text-xs font-black text-white">
                {naturePieces[selectedPiece.color].colorName}{" "}
                {naturePieces[selectedPiece.color].name}
              </span>
            ) : null}
          </div>
          <div className="flex min-h-28 flex-wrap items-center justify-center gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {pool.map((piece) => {
                const details = naturePieces[piece.color];
                return (
                  <motion.button
                    animate={
                      wrongPieceId === piece.id
                        ? { x: [0, -14, 12, -7, 0], rotate: [0, -7, 7, 0] }
                        : { x: 0 }
                    }
                    aria-label={`${details.colorName} ${details.name}`}
                    className="touch-none rounded-[1.4rem] outline-none focus-visible:ring-4 focus-visible:ring-[#28796b]/55"
                    exit={{ opacity: 0, scale: 0.35, y: -32 }}
                    key={piece.id}
                    layout
                    onPointerCancel={handlePointerUp}
                    onPointerDown={(event) => handlePointerDown(event, piece)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{ opacity: drag?.pieceId === piece.id ? 0.16 : 1 }}
                    transition={{ type: "spring", stiffness: 360, damping: 24 }}
                    type="button"
                  >
                    <NaturePieceVisual
                      piece={piece}
                      progress={progress}
                      selected={selectedPieceId === piece.id}
                    />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-full border border-white/65 bg-white/72 px-5 py-3 text-sm font-black text-[#355c40] shadow-sm backdrop-blur transition active:scale-95"
            onClick={restartLevel}
            type="button"
          >
            ↻ Restart garden
          </button>
          <button
            className="rounded-full border border-white/65 bg-white/72 px-5 py-3 text-sm font-black text-[#355c40] shadow-sm backdrop-blur transition active:scale-95"
            onClick={() => openPanel("gallery")}
            type="button"
          >
            🐾 Nature gallery
          </button>
        </div>
      </main>

      {drag ? (
        <div
          className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2"
          style={{ left: drag.x, top: drag.y }}
        >
          <NaturePieceVisual
            piece={
              pool.find((piece) => piece.id === drag.pieceId) ?? {
                id: "drag",
                color: "green",
              }
            }
            progress={progress}
            selected
          />
        </div>
      ) : null}

      <AnimatePresence>
        {burstId > 0 ? <NatureParticles key={burstId} seed={burstId} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {showDemo && pool[0] ? (
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            className="pointer-events-none fixed inset-0 z-[105] bg-[#173d2b]/12"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 4 }}
          >
            <motion.div
              animate={
                reduceMotion
                  ? { opacity: [0, 1, 0] }
                  : {
                      x: ["18vw", "50vw"],
                      y: ["76vh", "38vh"],
                      scale: [1, 1.2, 1],
                    }
              }
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
            className="fixed inset-0 z-[130] grid place-items-center bg-[#163d2b]/62 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
          >
            <NatureParticles intense seed={level.id + 100} />
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.6rem] border-8 border-[#f3d98a] bg-[#fffdf4] p-7 text-center shadow-2xl"
              initial={{ scale: 0.7, y: 60 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#dcebc4] to-transparent" />
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, -8, 8, 0], scale: [1, 1.14, 1] }
                }
                className="relative text-7xl"
                transition={{ repeat: Infinity, repeatDelay: 1.2 }}
              >
                {collectible.icon}
              </motion.div>
              <div className="relative mt-4 flex justify-center gap-2 text-5xl">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.span
                    animate={{
                      scale: index < completeStars ? 1 : 0.55,
                      opacity: index < completeStars ? 1 : 0.18,
                    }}
                    key={index}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <p className="relative mt-5 text-3xl font-black tracking-[-0.04em] text-[#214d35]">
                {collectible.name}
              </p>
              <p className="relative mt-2 font-bold text-[#617663]">
                A {collectible.color} discovery joined your gallery.
              </p>
              {level.id % 4 === 0 ? (
                <div className="relative mt-5 rounded-2xl bg-[#e5efd9] px-4 py-3 font-black text-[#355c40]">
                  Your tree grew into a new stage 🌿
                </div>
              ) : null}
              <button
                className="relative mt-7 w-full rounded-full bg-[#28796b] px-6 py-4 text-lg font-black text-white shadow-lg transition active:scale-95"
                onClick={nextLevel}
                type="button"
              >
                {level.id < 16
                  ? "Next forest path →"
                  : "Visit the meadow again ↻"}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[115] bg-[#143727]/45 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.aside
              animate={{ x: 0 }}
              aria-label="Nature game menu"
              className="relative h-full w-[min(88vw,24rem)] overflow-y-auto border-r border-white/35 bg-[#f8f3df] p-6 shadow-[25px_0_70px_rgba(18,54,35,.3)]"
              exit={{ x: "-105%" }}
              initial={{ x: "-105%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(12deg, #6b4a2e 0 2px, transparent 2px 20px)",
                }}
              />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b806d]">
                    Nature menu
                  </p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.045em] text-[#214d35]">
                    Explore the forest
                  </h2>
                </div>
                <button
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-black text-[#214d35] shadow-sm"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  ×
                </button>
              </div>

              <div className="relative mt-7 rounded-[1.6rem] bg-gradient-to-br from-[#dbe9c5] to-[#f4d99a] p-5 shadow-inner">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{tree.icon}</span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#617663]">
                      Your living world
                    </p>
                    <p className="mt-1 text-xl font-black text-[#214d35]">
                      {season.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-[#5e775f]">
                      {season.description}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="relative mt-7 grid gap-3">
                {[
                  { label: "Play / New Game", icon: "▶", action: startNewGame },
                  {
                    label: "Levels & Modes",
                    icon: "🗺️",
                    action: () => openPanel("levels"),
                  },
                  {
                    label: "Settings",
                    icon: "⚙️",
                    action: () => openPanel("settings"),
                  },
                  {
                    label: "Nature Gallery",
                    icon: "🐾",
                    action: () => openPanel("gallery"),
                  },
                  {
                    label: "Credits",
                    icon: "🍃",
                    action: () => openPanel("credits"),
                  },
                ].map((item) => (
                  <button
                    className="flex items-center gap-4 rounded-[1.4rem] border border-[#d9e4cc] bg-white/82 px-4 py-4 text-left font-black text-[#214d35] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8fb285] hover:bg-white active:scale-[0.98]"
                    key={item.label}
                    onClick={item.action}
                    type="button"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7efdc] text-xl"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <Link
                className="relative mt-8 flex items-center justify-center rounded-full border border-[#9fb59e] px-5 py-3 text-sm font-black text-[#355c40]"
                href="/"
              >
                Return to Biloo Group
              </Link>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {panel === "levels" ? (
          <Modal
            onClose={() => setPanel(null)}
            subtitle="Easy meadow puzzles grow into memory and pattern challenges."
            title="Levels & modes"
          >
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#e7f1db] p-4">
                <p className="font-black text-[#355c40]">Meadow Start</p>
                <p className="mt-1 text-sm text-[#617663]">
                  Levels 1–7 · color families
                </p>
              </div>
              <div className="rounded-2xl bg-[#eee7f6] p-4">
                <p className="font-black text-[#59477a]">Woodland Patterns</p>
                <p className="mt-1 text-sm text-[#726486]">
                  Levels 8–16 · sequences and memory
                </p>
              </div>
              <div className="rounded-2xl bg-[#f7e5cf] p-4">
                <p className="font-black text-[#70461f]">Season path</p>
                <p className="mt-1 text-sm text-[#856545]">
                  The world changes every four discoveries
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {colorSortLevels.map((item) => {
                const unlocked = item.id <= progress.highestUnlocked;
                const stars = progress.completed[String(item.id)] ?? 0;
                return (
                  <button
                    aria-label={`Level ${item.id}${unlocked ? "" : " locked"}`}
                    className={`aspect-square rounded-2xl border-2 p-2 text-lg font-black transition ${
                      unlocked
                        ? "border-[#8fb285]/40 bg-[#eef5e4] text-[#28796b] active:scale-95"
                        : "border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                    disabled={!unlocked}
                    key={item.id}
                    onClick={() => chooseLevel(item.id)}
                    type="button"
                  >
                    {unlocked ? natureCollectibles[item.id - 1].icon : "🔒"}
                    <span className="mt-1 block text-xs">{item.id}</span>
                    <span className="block text-[9px] tracking-[-0.08em]">
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
        {panel === "gallery" ? (
          <Modal
            onClose={() => setPanel(null)}
            subtitle={`${progress.collectibles.length} of ${natureCollectibles.length} animals and plants discovered.`}
            title="Nature gallery"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {natureCollectibles.map((item, index) => {
                const unlocked = progress.collectibles.includes(item.name);
                return (
                  <motion.div
                    animate={
                      unlocked && !reduceMotion ? { y: [0, -4, 0] } : undefined
                    }
                    className={`rounded-[1.4rem] border-2 p-4 text-center ${
                      unlocked
                        ? "border-[#b9cfaa] bg-gradient-to-b from-white to-[#edf5e4]"
                        : "border-slate-200 bg-slate-50 opacity-48"
                    }`}
                    key={item.name}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.04,
                      repeat: Infinity,
                    }}
                  >
                    <div className="text-5xl">
                      {unlocked ? item.icon : "🌫️"}
                    </div>
                    <p className="mt-3 text-sm font-black text-[#355c40]">
                      {unlocked ? item.name : `Discovery ${index + 1}`}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#6a806e]">
                      {unlocked ? item.color : "Hidden in the forest"}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {panel === "settings" ? (
          <Modal
            onClose={() => setPanel(null)}
            subtitle="Grown-up controls for audio, accessibility, and local progress."
            title="Settings"
          >
            <div className="grid gap-4">
              <SettingRow
                description="Gentle pops, rustles, celebration chimes, and encouraging voice feedback."
                icon="🔊"
                label="Nature sounds"
              >
                <Toggle
                  checked={progress.sound}
                  label="Nature sounds"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      sound: !current.sound,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="A quiet looping melody made from soft synthesized notes."
                icon="🎵"
                label="Meadow music"
              >
                <Toggle
                  checked={progress.music}
                  label="Meadow music"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      music: !current.music,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="Adds dots and stripes so every nature color is identifiable without hue alone."
                icon="◉"
                label="Colorblind patterns"
              >
                <Toggle
                  checked={progress.colorblind}
                  label="Colorblind patterns"
                  onChange={() =>
                    setProgress((current) => ({
                      ...current,
                      colorblind: !current.colorblind,
                    }))
                  }
                />
              </SettingRow>
              <SettingRow
                description="Make animals, leaves, and flowers larger for easier touch control."
                icon="🍃"
                label="Nature piece size"
              >
                <div className="flex gap-2">
                  {(["large", "extra"] as const).map((size) => (
                    <button
                      className={`rounded-full px-4 py-2 text-sm font-black ${progress.pieceSize === size ? "bg-[#28796b] text-white" : "bg-[#e7efdc] text-[#355c40]"}`}
                      key={size}
                      onClick={() =>
                        setProgress((current) => ({
                          ...current,
                          pieceSize: size,
                        }))
                      }
                      type="button"
                    >
                      {size === "large" ? "Large" : "Extra large"}
                    </button>
                  ))}
                </div>
              </SettingRow>
            </div>
            <button
              className="mt-7 w-full rounded-full border-2 border-[#d88a76] px-5 py-3 font-black text-[#9a4938]"
              onClick={resetProgress}
              type="button"
            >
              Reset local progress
            </button>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {panel === "credits" ? (
          <Modal
            onClose={() => setPanel(null)}
            subtitle="A calm, positive-only learning game with no ads, accounts, purchases, or social comparison."
            title="Credits"
          >
            <div className="rounded-[1.7rem] bg-gradient-to-br from-[#e5efd8] via-white to-[#f5dfb0] p-6 text-center">
              <div className="text-7xl">🌳</div>
              <p className="mt-4 text-2xl font-black text-[#214d35]">
                Nature Match
              </p>
              <p className="mt-2 leading-7 text-[#5e775f]">
                Designed and built by Biloo Group as an educational color,
                pattern, memory, and hand-eye coordination experience.
              </p>
              <p className="mt-4 text-sm font-bold text-[#355c40]">
                Founder & CEO: Mahir Aman
              </p>
              <p className="mt-2 text-sm text-[#6a806e]">
                Built with Next.js, React, Motion, SVG-friendly CSS shapes, Web
                Audio, Pointer Events, and local browser storage.
              </p>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {parentGateOpen ? (
          <Modal
            onClose={() => {
              stopParentHold();
              setParentGateOpen(false);
              setPendingPanel(null);
            }}
            subtitle="This keeps settings away from accidental toddler taps."
            title="Grown-up gate"
          >
            <div className="text-center">
              <div className="text-6xl">🦉</div>
              <p className="mx-auto mt-4 max-w-sm font-bold leading-7 text-[#55705d]">
                Press and hold the forest button until the ring completes.
              </p>
              <motion.button
                animate={holdingGate ? { scale: [1, 1.04, 1] } : undefined}
                className="relative mt-6 h-28 w-28 overflow-hidden rounded-full border-8 border-[#c9d9bb] bg-[#28796b] text-4xl shadow-xl"
                onPointerCancel={stopParentHold}
                onPointerDown={startParentHold}
                onPointerLeave={stopParentHold}
                onPointerUp={stopParentHold}
                type="button"
              >
                🌳
                {holdingGate ? (
                  <motion.span
                    animate={{ height: "100%" }}
                    className="absolute inset-x-0 bottom-0 -z-0 bg-[#f3c84b]/45"
                    initial={{ height: 0 }}
                    transition={{ duration: 1.6, ease: "linear" }}
                  />
                ) : null}
              </motion.button>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {paused ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[140] grid place-items-center bg-[#173d2b]/65 p-6 text-center text-white backdrop-blur-md"
            initial={{ opacity: 0 }}
          >
            <div>
              <div className="text-7xl">🌙</div>
              <p className="mt-4 text-3xl font-black">The forest is resting</p>
              <p className="mt-2 text-white/75">
                Return to continue exactly where you paused.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SettingRow({
  icon,
  label,
  description,
  children,
}: {
  icon: string;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.4rem] border border-[#dce6d1] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e8f0de] text-xl"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div>
          <p className="font-black text-[#355c40]">{label}</p>
          <p className="mt-1 max-w-md text-sm leading-6 text-[#687e6c]">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
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
      aria-checked={checked}
      aria-label={label}
      className={`relative h-8 w-14 rounded-full transition ${checked ? "bg-[#28796b]" : "bg-[#cfd8cb]"}`}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <motion.span
        animate={{ x: checked ? 26 : 4 }}
        className="absolute left-0 top-1 h-6 w-6 rounded-full bg-white shadow"
        initial={false}
      />
    </button>
  );
}
