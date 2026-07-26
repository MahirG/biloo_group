"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import {
  natureDiscoveries,
  natureModes,
  type NatureModeId,
  type NatureWorld,
} from "@/data/nature-adventures";

type MiniMode = Exclude<NatureModeId, "classic" | "free-play">;

type Question = {
  prompt: string;
  options: readonly string[];
  answer: string;
  explanation: string;
};

type Props = {
  mode: MiniMode;
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

const questions: Record<MiniMode, readonly Question[]> = {
  habitats: [
    {
      prompt: "Where does the frog feel at home?",
      options: ["🌊 Pond", "🏜️ Desert", "🌲 Pine tree"],
      answer: "🌊 Pond",
      explanation: "Frogs need damp places and water.",
    },
    {
      prompt: "Where does the panda find its food?",
      options: ["🎋 Bamboo forest", "🌾 Savannah", "🌵 Desert"],
      answer: "🎋 Bamboo forest",
      explanation: "Pandas eat lots of bamboo.",
    },
    {
      prompt: "Where does the giraffe reach high leaves?",
      options: ["🌾 Savannah", "❄️ Snow field", "🌊 Ocean"],
      answer: "🌾 Savannah",
      explanation: "Giraffes live in open savannah and woodland.",
    },
  ],
  families: [
    {
      prompt: "Which grown-up belongs with the chick? 🐣",
      options: ["🐔 Chicken", "🦊 Fox", "🐢 Turtle"],
      answer: "🐔 Chicken",
      explanation: "A chick grows into a chicken.",
    },
    {
      prompt: "Which grown-up belongs with the duckling? 🐥",
      options: ["🦆 Duck", "🦉 Owl", "🐝 Bee"],
      answer: "🦆 Duck",
      explanation: "A duckling grows into a duck.",
    },
    {
      prompt: "Which grown-up belongs with the caterpillar? 🐛",
      options: ["🦋 Butterfly", "🐸 Frog", "🐇 Rabbit"],
      answer: "🦋 Butterfly",
      explanation: "A caterpillar changes into a butterfly.",
    },
  ],
  patterns: [
    {
      prompt: "Complete the pattern: 🍃 🌸 🍃 🌸 …",
      options: ["🍃", "🍄", "🐞"],
      answer: "🍃",
      explanation: "The leaf and blossom alternate.",
    },
    {
      prompt: "Complete the pattern: 🐞 🐞 🌼 🐞 🐞 …",
      options: ["🌼", "🐢", "🌳"],
      answer: "🌼",
      explanation: "Two ladybirds are followed by one flower.",
    },
    {
      prompt: "Complete the pattern: 🌱 🌿 🌳 🌱 🌿 …",
      options: ["🌳", "🌸", "🦋"],
      answer: "🌳",
      explanation: "The plant grows from sprout to leaf to tree.",
    },
  ],
  sizes: [
    {
      prompt: "Which animal is biggest?",
      options: ["🐘 Elephant", "🐇 Rabbit", "🐝 Bee"],
      answer: "🐘 Elephant",
      explanation: "The elephant is the biggest animal here.",
    },
    {
      prompt: "Which nature friend is smallest?",
      options: ["🐞 Ladybird", "🦒 Giraffe", "🐢 Turtle"],
      answer: "🐞 Ladybird",
      explanation: "The ladybird is the smallest.",
    },
    {
      prompt: "Which plant is tallest?",
      options: ["🌳 Tree", "🌱 Sprout", "🌼 Daisy"],
      answer: "🌳 Tree",
      explanation: "A mature tree grows taller than a sprout or daisy.",
    },
  ],
  shadows: [
    {
      prompt: "Which friend matches this shadow? ◼️🦋",
      options: ["🦋 Butterfly", "🐢 Turtle", "🌻 Sunflower"],
      answer: "🦋 Butterfly",
      explanation: "The wide wings belong to the butterfly.",
    },
    {
      prompt: "Which friend matches this shadow? ◼️🐇",
      options: ["🐇 Rabbit", "🐸 Frog", "🍄 Mushroom"],
      answer: "🐇 Rabbit",
      explanation: "The long ears belong to the rabbit.",
    },
    {
      prompt: "Which friend matches this shadow? ◼️🌳",
      options: ["🌳 Tree", "🌸 Blossom", "🐝 Bee"],
      answer: "🌳 Tree",
      explanation: "The trunk and broad crown belong to the tree.",
    },
  ],
  different: [
    {
      prompt: "Who is different?",
      options: ["🌸 Blossom", "🌼 Daisy", "🦊 Fox"],
      answer: "🦊 Fox",
      explanation: "The fox is an animal; the others are flowers.",
    },
    {
      prompt: "Who is different?",
      options: ["🐇 Rabbit", "🐢 Turtle", "🍃 Leaf"],
      answer: "🍃 Leaf",
      explanation: "The leaf is a plant part; the others are animals.",
    },
    {
      prompt: "Who is different?",
      options: ["🍄 Mushroom", "🌳 Tree", "🌱 Sprout"],
      answer: "🍄 Mushroom",
      explanation: "A mushroom is a fungus; the others are plants.",
    },
  ],
  counting: [
    {
      prompt: "How many flowers? 🌸 🌸 🌸",
      options: ["2", "3", "4"],
      answer: "3",
      explanation: "There are three coral pink blossoms.",
    },
    {
      prompt: "How many turtles? 🐢 🐢",
      options: ["1", "2", "3"],
      answer: "2",
      explanation: "There are two deep forest green turtles.",
    },
    {
      prompt: "How many leaves? 🍃 🍃 🍃 🍃",
      options: ["3", "4", "5"],
      answer: "4",
      explanation: "There are four soft sage green leaves.",
    },
  ],
};

function speak(enabled: boolean, text: string) {
  if (
    !enabled ||
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  )
    return;
  window.speechSynthesis.cancel();
  const message = new SpeechSynthesisUtterance(text);
  message.rate = 0.88;
  message.pitch = 1.08;
  window.speechSynthesis.speak(message);
}

export function NatureMiniGame({
  mode,
  world,
  calmMode,
  voiceNames,
  reduceMotion,
  leftHanded,
  startIndex = 0,
  targetWins = 3,
  onExit,
  onComplete,
  onStats,
}: Props) {
  const modeInfo = natureModes.find((item) => item.id === mode);
  const bank = questions[mode];
  const [index, setIndex] = useState(startIndex % bank.length);
  const [wins, setWins] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [support, setSupport] = useState(0);
  const question = bank[index];
  const options = useMemo(
    () =>
      support > 1
        ? question.options.slice(0, 2).includes(question.answer)
          ? question.options.slice(0, 2)
          : [question.answer, question.options[0]]
        : question.options,
    [question, support],
  );

  function choose(option: string) {
    const correct = option === question.answer;
    onStats(correct);
    if (!correct) {
      setMistakes((value) => value + 1);
      setSupport((value) => value + 1);
      setFeedback("Nice try — your animal friend will help you look again.");
      if (typeof navigator !== "undefined" && "vibrate" in navigator)
        navigator.vibrate(10);
      return;
    }

    const nextWins = wins + 1;
    setWins(nextWins);
    setSupport(0);
    setFeedback(question.explanation);
    speak(voiceNames, `${question.answer}. ${question.explanation}`);
    if (typeof navigator !== "undefined" && "vibrate" in navigator)
      navigator.vibrate(18);

    window.setTimeout(
      () => {
        if (nextWins >= targetWins) {
          const discovery =
            natureDiscoveries[(index + mode.length) % natureDiscoveries.length];
          onComplete({
            mode,
            wins: nextWins,
            mistakes,
            discoveryId: discovery.id,
          });
          return;
        }
        setIndex((value) => (value + 1) % bank.length);
        setFeedback(null);
      },
      calmMode ? 1250 : 850,
    );
  }

  return (
    <div
      className="min-h-[100dvh] px-3 py-4 sm:px-6"
      style={{
        background: `linear-gradient(180deg, ${world.sky}, #fff9e8 50%, ${world.ground})`,
      }}
    >
      <div className="mx-auto max-w-3xl">
        <header
          className={`flex items-center justify-between gap-3 ${leftHanded ? "flex-row-reverse" : ""}`}
        >
          <button
            className="rounded-full bg-white/85 px-5 py-3 font-black text-[#214d35] shadow"
            onClick={onExit}
            type="button"
          >
            ← World
          </button>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-[#42644c]">
              {modeInfo?.skill}
            </p>
            <h1 className="text-2xl font-black text-[#214d35]">
              {modeInfo?.icon} {modeInfo?.name}
            </h1>
          </div>
          <span className="rounded-full bg-white/75 px-4 py-2 font-black text-[#355c40]">
            {wins}/{targetWins}
          </span>
        </header>

        <motion.section
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          className="mt-8 rounded-[2rem] border border-white/70 bg-white/78 p-5 text-center shadow-xl backdrop-blur sm:p-8"
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-6xl" aria-hidden="true">
            {world.companion}
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#214d35]">
            {question.prompt}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {options.map((option) => (
              <button
                className="min-h-24 rounded-[1.5rem] border-2 border-[#c6d9bd] bg-[#f7fbf0] px-4 py-5 text-xl font-black text-[#294f36] shadow-sm transition active:scale-95"
                key={option}
                onClick={() => choose(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <p
            className="mt-6 min-h-12 font-bold leading-6 text-[#58705d]"
            aria-live="polite"
          >
            {feedback ?? "Choose the nature friend that fits best."}
          </p>
        </motion.section>
      </div>
    </div>
  );
}
