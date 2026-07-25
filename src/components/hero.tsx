"use client";

import { motion } from "motion/react";
import Link from "next/link";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-graphite text-white">
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_75%_25%,rgba(30,58,138,0.95),transparent_32%),radial-gradient(circle_at_20%_85%,rgba(30,58,138,0.45),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container-shell relative flex min-h-[760px] items-center pt-28">
        <div className="grid w-full items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ staggerChildren: 0.12 }}
            variants={reveal}
          >
            <motion.p className="eyebrow text-white/60" variants={reveal}>
              Ethiopia-rooted. Future-built.
            </motion.p>
            <motion.h1
              className="mt-7 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-8xl"
              variants={reveal}
            >
              Technology built for generations.
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/68 sm:text-xl"
              variants={reveal}
            >
              Biloo Group is building dependable digital platforms for people,
              businesses, and institutions across Africa—guided by legacy,
              trust, and long-term thinking.
            </motion.p>
            <motion.div className="mt-10 flex flex-wrap gap-4" variants={reveal}>
              <Link
                className="focus-ring rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-graphite transition hover:-translate-y-0.5"
                href="#vision"
              >
                Explore our vision
              </Link>
              <Link
                className="focus-ring rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
                href="/about"
              >
                Read our story
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto aspect-square w-full max-w-[28rem]"
            initial={{ opacity: 0, scale: 0.88 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[12%] rounded-full border border-white/10" />
            <div className="absolute inset-[24%] rounded-full border border-white/10" />
            <motion.div
              animate={{ rotate: 360 }}
              className="absolute inset-[8%] rounded-full border border-dashed border-white/20"
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center -space-x-5">
                <div className="h-36 w-36 rounded-full border-[10px] border-white bg-white/5 shadow-2xl shadow-blue-950/40 sm:h-44 sm:w-44" />
                <div className="h-36 w-36 rounded-full border-[10px] border-white bg-white/5 shadow-2xl shadow-blue-950/40 sm:h-44 sm:w-44" />
              </div>
            </div>
            <span className="absolute bottom-[11%] left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              Legacy in motion
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
