"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import {
  countingQuestions,
  differentQuestions,
  familyQuestions,
  habitatQuestions,
  natureDiscoveries,
  natureModes,
  patternQuestions,
  shadowQuestions,
  sizeQuestions,
  type NatureModeId,
  type NatureWorld,
} from "@/data/nature-adventures";

type MiniGameProps = {
  mode: Exclude<NatureModeId, "classic" | "free-play">;
  world: NatureWorld;
  calmMode: boolean;
  voiceNames: boolean;
  reduceMotion: boolean;
  leftHanded: boolean;
  startIndex?: number;
  targetWins?: number;
  onExit: () => void;
  onComplete: (result: {
    mode: NatureModeId;
    wins: number;
    mistakes: number;
    discoveryId: string;
  }) => void;
  onStats: (correct: boolean) => void;
};

type Puzzle = {
  prompt: string;
  subject?: string;
  sequence?: readonly string[];
  options: readonly string[];
  answer: string;
  optionLabels?: readonly string[];
  reason?: string;
  shadow?: boolean;
};

const iconNames: Record<string, string> = {
  "🐞": "warm terracotta ladybird",
  "🦋": "sky blue butterfly",
  "🌻": "sunny yellow sunflower",
  "🍃": "soft sage green leaf",
  "🪻": "lavender mist flower",
  "🦊": "golden amber fox",
  "🌸": "coral pink blossom",
  "🐢": "deep forest green turtle",
  "🐇": "cloud white rabbit",
  "🍄": "golden amber mushroom",
  "🦔": "warm chestnut hedgehog",
  "🌱": "fresh spring green sprout",
  "🦉": "warm cocoa brown owl",
  "🌼": "sunny yellow daisy",
  "🌳": "deep forest green tree",
  "🐸": "fresh green frog",
  "🦒": "golden savannah giraffe",
  "🐼": "bamboo forest panda",
  "🦜": "rainforest parrot",
  "🌵": "soft sage green cactus",
  "🪷": "coral pink lotus",
  "🐝": "sunny yellow bee",
  "🐘": "lavender mist elephant",
  "🐔": "grown-up chicken",
  "🐣": "little chick",
  "🦢": "grown-up water bird",
};

function speak(enabled: boolean, text: string) {
  if (!enabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.12;
  window.speechSynthesis.speak(utterance);
}

function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function shuffled<T>(items: readonly T[], seed: number) {
  const result = [...items];
  let value = seed * 1103515245 + 12345;
  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (value * 1664525 + 1013904223) >>> 0;
    const swap = value % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function makePuzzle(
  mode: MiniGameProps["mode"],
  index: number,
  supportLevel: number,
): Puzzle {
  if (mode === "habitats") {
    const item = habitatQuestions[index % habitatQuestions.length];
    const labels = item.options;
    const options = supportLevel > 0 ? item.icons.slice(0, 2) : item.icons;
    const optionLabels = supportLevel > 0 ? labels.slice(0, 2) : labels;
    const answerIndex = item.options.indexOf(item.answer);
    const answer = item.icons[answerIndex];
    const ensuredOptions = options.includes(answer)
      ? options
      : [answer, ...options.slice(0, 1)];
    const ensuredLabels = ensuredOptions.map(
      (icon) => item.options[item.icons.indexOf(icon)] ?? item.answer,
    );
    return {
      prompt: `Where does the ${item.name} live?`,
      subject: item.subject,
      options: ensuredOptions,
      optionLabels: ensuredLabels,
      answer,
      reason: `The ${item.name} belongs in the ${item.answer}.`,
    };
  }

  if (mode === "families") {
    const item = familyQuestions[index % familyQuestions.length];
    return {
      prompt: `Find the grown-up family for the ${item.babyName}.`,
      subject: item.baby,
      options: supportLevel > 0 ? item.options.slice(0, 2) : item.options,
      answer: item.parent,
      reason: `This is the matching grown-up family for the ${item.babyName}.`,
    };
  }

  if (mode === "patterns") {
    const item = patternQuestions[index % patternQuestions.length];
    return {
      prompt: "Which nature friend comes next?",
      sequence: item.sequence,
      options: supportLevel > 0 ? item.options.slice(0, 2) : item.options,
      answer: item.answer,
      reason: "The repeating nature pattern continues with this friend.",
    };
  }

  if (mode === "sizes") {
    const item = sizeQuestions[index % sizeQuestions.length];
    return {
      prompt: item.prompt,
      options: supportLevel > 0 ? item.options.slice(1) : item.options,
      answer: item.answer,
      reason: "Great comparing! You found the right size.",
    };
  }

  if (mode === "shadows") {
    const item = shadowQuestions[index % shadowQuestions.length];
    return {
      prompt: "Which nature friend matches this shadow?",
      subject: item.answer,
      options: supportLevel > 0 ? item.options.slice(0, 2) : item.options,
      answer: item.answer,
      shadow: true,
      reason: "The outline and shape match perfectly.",
    };
  }

  if (mode === "different") {
    const item = differentQuestions[index % differentQuestions.length];
    return {
      prompt: "Who is different from the others?",
      options: supportLevel > 0
        ? [item.answer, item.items.find((icon) => icon !== item.answer) ?? item.items[0]]
        : item.items,
      answer: item.answer,
      reason: item.reason,
    };
  }

  const item = countingQuestions[index % countingQuestions.length];
  const nearby = [Math.max(1, item.count - 1), item.count, item.count + 1];
  return {
    prompt: `How many ${iconNames[item.icon] ?? "nature friends"} can you count?`,
    subject: Array.from({ length: item.count }).fill(item.icon).join(" "),
    options: (supportLevel > 0 ? nearby.slice(0, 2) : nearby).map(String),
    answer: String(item.count),
    reason: `There are ${item.count}. Beautiful counting!`,
  };
}

function MiniParticles({ calm }: { calm: boolean }) {
  const icons = calm ? ["🍃", "✨"] : ["🍃", "🌸", "✨", "🦋", "🌼", "🍂"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: calm ? 5 : 16 }).map((_, index) => (
        <motion.span
          animate={{
            x: [0, ((index * 83) % 260) - 130],
            y: [0, 180 + (index % 4) * 28],
            opacity: [0, 1, 0],
            rotate: [0, 180 + index * 17],
          }}
          className="absolute left-1/2 top-[35%] text-2xl"
          key={index}
          transition={{ duration: calm ? 1.8 : 1.25, delay: index * 0.035 }}
        >
          {icons[index % icons.length]}
        </motion.span>
      ))}
    </div>
  );
}

export function NatureMiniGame({
  mode,
  world,
  calmMode,
  voiceNames,
  reduceMotion,
  leftHanded,
  startIndex = 0,
  targetWins = 5,
  onExit,
  onComplete,
  onStats,
}: MiniGameProps) {
  const modeDetails = natureModes.find((item) => item.id === mode)!;
  const [questionIndex, setQuestionIndex] = useState(startIndex);
  const [wins, setWins] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "gentle">("idle");
  const [message, setMessage] = useState("Take your time. There is no timer.");
  const [complete, setComplete] = useState(false);
  const [burst, setBurst] = useState(0);

  const supportLevel = mistakes > wins + 1 ? 1 : 0;
  const puzzle = useMemo(
    () => makePuzzle(mode, questionIndex, supportLevel),
    [mode, questionIndex, supportLevel],
  );
  const options = useMemo(
    () =>
      leftHanded
        ? shuffled(puzzle.options, questionIndex + 31).reverse()
        : shuffled(puzzle.options, questionIndex + 31),
    [leftHanded, puzzle.options, questionIndex],
  );
  const discovery =
    natureDiscoveries[
      (natureModes.findIndex((item) => item.id === mode) * 3 + questionIndex) %
        natureDiscoveries.length
    ];

  function choose(answer: string) {
    if (complete || feedback === "correct") return;
    const correct = answer === puzzle.answer;
    onStats(correct);

    if (!correct) {
      setMistakes((current) => current + 1);
      setFeedback("gentle");
      setMessage(
        supportLevel > 0
          ? "Look again—the happy companion is thinking with you."
          : "That friend can try another place. Nothing is lost.",
      );
      haptic(8);
      window.setTimeout(() => setFeedback("idle"), calmMode ? 900 : 550);
      return;
    }

    const nextWins = wins + 1;
    setWins(nextWins);
    setFeedback("correct");
    setMessage(puzzle.reason ?? "Beautiful match!");
    setBurst((current) => current + 1);
    haptic(calmMode ? 12 : [18, 35, 20]);
    speak(
      voiceNames,
      `${puzzle.reason ?? "Beautiful match."} ${iconNames[answer] ?? "Well done."}`,
    );

    if (nextWins >= targetWins) {
      window.setTimeout(() => {
        setComplete(true);
        speak(voiceNames, `${modeDetails.name} complete. ${discovery.name} joined your garden.`);
      }, calmMode ? 1000 : 650);
      return;
    }

    window.setTimeout(
      () => {
        setQuestionIndex((current) => current + 1);
        setFeedback("idle");
        setMessage("A new nature puzzle is ready.");
      },
      calmMode ? 1350 : 850,
    );
  }

  return (
    <section
      className="relative min-h-[100dvh] overflow-x-hidden px-3 pb-10 pt-[max(.75rem,env(safe-area-inset-top))] text-[#173f2a] sm:px-6"
      style={{
        background: `linear-gradient(180deg, ${world.sky}, #fff9e8 52%, ${world.ground})`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-75" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.span
            animate={
              reduceMotion || calmMode
                ? undefined
                : { y: [0, -8 - (index % 3) * 4, 0], rotate: [-3, 4, -3] }
            }
            className="absolute bottom-0 text-5xl"
            key={index}
            style={{ left: `${index * 13 - 3}%` }}
            transition={{ duration: 4 + (index % 3), repeat: Infinity }}
          >
            {world.scenery[index % world.scenery.length]}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <header className={`flex items-center justify-between gap-3 ${leftHanded ? "flex-row-reverse" : ""}`}>
          <button
            className="grid h-12 w-12 place-items-center rounded-2xl border border-white/65 bg-white/85 text-xl shadow-sm backdrop-blur active:scale-95"
            onClick={onExit}
            type="button"
            aria-label="Return to Nature Match world"
          >
            ←
          </button>
          <div className="min-w-0 flex-1 rounded-2xl border border-white/65 bg-white/72 px-4 py-3 text-center backdrop-blur">
            <p className="truncate text-xs font-black uppercase tracking-[0.14em] text-[#5b775f]">
              {modeDetails.skill}
            </p>
            <h1 className="truncate text-xl font-black sm:text-2xl">{modeDetails.icon} {modeDetails.name}</h1>
          </div>
          <motion.div
            animate={
              reduceMotion || calmMode
                ? undefined
                : feedback === "correct"
                  ? { y: [0, -9, 0], rotate: [0, -7, 7, 0] }
                  : feedback === "gentle"
                    ? { rotate: [0, -5, 5, 0] }
                    : { y: [0, -3, 0] }
            }
            className="grid h-12 w-12 place-items-center rounded-2xl border border-white/65 bg-white/82 text-3xl shadow-sm"
            transition={{ duration: feedback === "idle" ? 2.7 : 0.65, repeat: feedback === "idle" ? Infinity : 0 }}
          >
            {world.companion}
          </motion.div>
        </header>

        <div className="mt-4 flex items-center gap-3 rounded-full border border-white/65 bg-white/70 p-2 backdrop-blur">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#dce8cf]">
            <motion.div
              animate={{ width: `${Math.min(100, (wins / targetWins) * 100)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#76a96b] to-[#f3c84b]"
              initial={false}
            />
          </div>
          <span className="pr-2 text-sm font-black">{wins}/{targetWins}</span>
        </div>

        <motion.div
          animate={feedback === "gentle" && !reduceMotion ? { x: [0, -5, 5, 0] } : undefined}
          className="relative mt-4 overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 p-5 text-center shadow-[0_20px_55px_rgba(39,82,50,.18)] backdrop-blur sm:p-8"
        >
          <AnimatePresence>{burst > 0 && feedback === "correct" ? <MiniParticles calm={calmMode} key={burst} /> : null}</AnimatePresence>
          <p className="text-sm font-black uppercase tracking-[0.13em] text-[#5d7b64]">Puzzle {questionIndex + 1}</p>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-black tracking-[-0.035em] sm:text-3xl">
            {puzzle.prompt}
          </h2>

          {puzzle.sequence ? (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-4xl sm:text-5xl">
              {puzzle.sequence.map((icon, index) => <span key={`${icon}-${index}`}>{icon}</span>)}
              <span className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-[#7fa57d] bg-[#eff5e7] text-2xl">?</span>
            </div>
          ) : null}

          {puzzle.subject ? (
            <motion.div
              animate={reduceMotion || calmMode ? undefined : { scale: [1, 1.04, 1] }}
              className={`mx-auto mt-7 max-w-xl whitespace-pre-wrap text-6xl leading-tight ${puzzle.shadow ? "grayscale brightness-0 opacity-70" : ""}`}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              {puzzle.subject}
            </motion.div>
          ) : null}

          <div className={`mt-8 grid gap-3 ${options.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
            {options.map((option) => {
              const originalIndex = puzzle.options.indexOf(option);
              const label = puzzle.optionLabels?.[originalIndex];
              return (
                <motion.button
                  className="min-h-24 rounded-[1.5rem] border-2 border-[#c7d9bc] bg-[#f6faef] p-3 text-[#214d35] shadow-sm outline-none transition hover:border-[#76a96b] focus-visible:ring-4 focus-visible:ring-[#76a96b]/45 active:scale-95"
                  key={`${option}-${label ?? "option"}`}
                  onClick={() => choose(option)}
                  type="button"
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                >
                  <span className={/^\d+$/.test(option) ? "text-4xl font-black" : "text-5xl"}>{option}</span>
                  {label ? <span className="mt-2 block text-sm font-black capitalize">{label}</span> : null}
                </motion.button>
              );
            })}
          </div>

          <p className={`mt-6 min-h-12 rounded-2xl px-4 py-3 font-bold ${feedback === "correct" ? "bg-[#e4f2da] text-[#2f6b3c]" : feedback === "gentle" ? "bg-[#fff0d7] text-[#7b5a2a]" : "bg-[#eef4e9] text-[#55705d]"}`} aria-live="polite">
            {message}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {complete ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 grid place-items-center bg-[#173d2b]/65 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
          >
            <MiniParticles calm={calmMode} />
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-[2.5rem] border-8 border-[#f3d98a] bg-[#fffdf4] p-7 text-center shadow-2xl"
              initial={{ scale: 0.75, y: 45 }}
            >
              <motion.div
                animate={reduceMotion || calmMode ? undefined : { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
                className="text-7xl"
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.7 }}
              >
                {discovery.icon}
              </motion.div>
              <p className="mt-4 text-3xl font-black tracking-[-0.04em]">{discovery.name}</p>
              <p className="mt-2 font-bold leading-7 text-[#617663]">{discovery.fact}</p>
              <div className="mt-5 rounded-2xl bg-[#e7f1dc] p-4 text-sm font-black text-[#355c40]">
                {wins} happy matches · {mistakes} gentle retries
              </div>
              <button
                className="mt-6 w-full rounded-full bg-[#28796b] px-6 py-4 text-lg font-black text-white active:scale-95"
                onClick={() => onComplete({ mode, wins, mistakes, discoveryId: discovery.id })}
                type="button"
              >
                Add to my garden 🌿
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
