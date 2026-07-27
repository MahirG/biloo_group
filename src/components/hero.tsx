"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const products = [
  {
    monogram: "መ",
    name: "Biloo Mezgeb",
    role: "Daily business ledger",
    href: "/mezgeb",
    accent: "from-emerald-300/25 via-white/5 to-transparent",
  },
  {
    monogram: "H",
    name: "HisabTech ERP",
    role: "Finance & operations",
    href: "/erp",
    accent: "from-blue-300/30 via-white/5 to-transparent",
  },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[860px] overflow-hidden bg-graphite text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(37,99,235,0.38),transparent_26%),radial-gradient(circle_at_15%_72%,rgba(14,165,233,0.13),transparent_30%),linear-gradient(145deg,#0f172a_0%,#101a35_48%,#070b16_100%)]" />
      <div className="hero-noise absolute inset-0 opacity-45" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

      <motion.div
        animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, -18, 0] }}
        className="absolute right-[-10rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full border border-white/10 bg-sapphire/20 blur-3xl"
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 22, 0] }}
        className="absolute bottom-[-14rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl"
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="container-shell relative flex min-h-[860px] items-center pb-20 pt-32 sm:pt-36">
        <div className="grid w-full gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-xl"
              variants={reveal}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
              Ethiopia-rooted digital products
            </motion.div>

            <motion.h1
              className="mt-8 max-w-5xl text-balance text-6xl font-semibold leading-[0.92] tracking-[-0.068em] sm:text-7xl lg:text-[6.7rem]"
              variants={reveal}
            >
              Build the systems
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white/40 bg-clip-text text-transparent">
                people remember.
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-white/68 sm:text-xl"
              variants={reveal}
            >
              Biloo Group creates dependable, beautifully considered technology
              for African businesses—combining local operating reality with
              world-class product craft and operational clarity.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              variants={reveal}
            >
              <Link
                className="focus-ring app-action inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-graphite shadow-[0_18px_50px_rgba(255,255,255,0.12)] transition hover:-translate-y-1 hover:bg-blue-50"
                href="/apps"
              >
                Enter Biloo Apps
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="focus-ring app-action inline-flex min-h-14 items-center justify-center rounded-full border border-white/18 bg-white/6 px-7 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
                href="#vision"
              >
                Explore the company
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-7"
              variants={reveal}
            >
              {[
                ["02", "Live business apps"],
                ["03", "Primary platforms"],
                ["01", "Shared Biloo space"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="block text-2xl font-semibold tracking-[-0.04em]">
                    {value}
                  </strong>
                  <span className="mt-1 block text-xs leading-5 text-white/50">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative mx-auto w-full max-w-[36rem]"
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            transition={{
              delay: 0.2,
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-sapphire/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/14 bg-white/8 p-3 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="rounded-[2.1rem] border border-white/10 bg-[#0b1224]/92 p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                      Biloo product universe
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      Choose your workspace
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {products.map((product) => (
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0b1224] bg-white text-sm font-black text-graphite"
                        key={product.name}
                      >
                        {product.monogram}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {products.map((product, index) => (
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: index === 0 ? [0, -4, 0] : [0, 4, 0] }
                      }
                      key={product.name}
                      transition={{
                        delay: index * 0.4,
                        duration: 5 + index,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      <Link
                        className="group relative flex min-h-36 items-end overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/7 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
                        href={product.href}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${product.accent}`}
                        />
                        <div className="absolute right-[-1.8rem] top-[-1.8rem] grid h-32 w-32 place-items-center rounded-full border border-white/10 text-5xl font-black text-white/10 transition group-hover:scale-110 group-hover:text-white/16">
                          {product.monogram}
                        </div>
                        <div className="relative flex w-full items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                              {product.role}
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                              {product.name}
                            </h2>
                          </div>
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lg text-graphite transition group-hover:rotate-45">
                            ↗
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-xs text-white/50">
                  <span>Secure sessions remain independent</span>
                  <span className="font-bold text-emerald-300">Live</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
