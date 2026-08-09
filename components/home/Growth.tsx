"use client";

import { Reveal } from "@/components/visual/motion";
import { growthStages } from "@/content/company";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

export default function Growth() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-ink py-24 text-white grain sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl lg:mb-24">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
              03 — Operating Philosophy
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-h2 tracking-tightest text-balance">
              How We Grow
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-white/60 text-pretty">
              A four-stage operating philosophy that guides every
              business under GM Group — from foundation to expansion.
            </p>
          </Reveal>
        </div>

        {/* Journey — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line — horizontal desktop */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo via-teal to-yellow"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
            />
          </div>

          {/* Connecting line — vertical mobile */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 lg:hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-indigo via-teal to-yellow"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-6">
            {growthStages.map((stage, i) => (
              <motion.button
                key={stage.number}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, y: 20 }
                }
                whileInView={
                  reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative text-left lg:pl-0 pl-16"
              >
                {/* Node */}
                <div className="relative mb-8 hidden lg:block">
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-500 ${
                      active === i
                        ? "border-indigo bg-indigo text-white scale-110"
                        : "border-white/15 bg-ink text-white/40 group-hover:border-white/40"
                    }`}
                  >
                    <span className="font-display text-lg font-bold">
                      {stage.number}
                    </span>
                  </div>
                </div>

                {/* Node mobile */}
                <div className="absolute left-0 top-0 lg:hidden">
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                      active === i
                        ? "border-indigo bg-indigo text-white"
                        : "border-white/15 bg-ink text-white/40"
                    }`}
                  >
                    <span className="font-display text-sm font-bold">
                      {stage.number}
                    </span>
                  </div>
                </div>

                <h3
                  className={`font-display text-2xl font-bold tracking-tightest transition-colors duration-300 ${
                    active === i
                      ? "text-white"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {stage.title}
                </h3>

                <AnimatePresence mode="wait">
                  {active === i && (
                    <motion.p
                      key={i}
                      initial={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : { opacity: 1, height: "auto" }
                      }
                      exit={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.4 }}
                      className="mt-4 overflow-hidden text-sm leading-relaxed text-white/60 text-pretty"
                    >
                      {stage.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
