"use client";

import { Reveal } from "@/components/visual/motion";
import { values } from "@/content/company";
import { motion } from "motion/react";

export default function Values() {
  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header — asymmetric */}
        <div className="grid gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
                05 — Values
              </span>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-h2 tracking-tightest text-ink text-balance">
                What We Stand For
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Editorial list */}
        <div className="mt-16 border-t border-black/[0.08] lg:mt-24">
          {values.map((value, i) => (
            <Reveal key={value.number} delay={i * 0.05}>
              <div className="group relative grid grid-cols-[auto_1fr] gap-6 border-b border-black/[0.08] py-8 transition-colors duration-500 hover:bg-canvas lg:grid-cols-[0.15fr_0.25fr_1fr_0.5fr] lg:gap-12 lg:py-10 lg:pl-4">
                {/* Number */}
                <span className="font-display text-lg font-bold text-mutedText/60 transition-colors group-hover:text-indigo">
                  {value.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold tracking-tightest text-ink transition-transform duration-500 group-hover:translate-x-2 lg:text-3xl">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="col-span-2 max-w-xl text-base leading-relaxed text-mutedText text-pretty lg:col-span-1 lg:col-start-3">
                  {value.description}
                </p>

                {/* Accent indicator */}
                <div className="hidden items-center lg:col-start-4 lg:flex lg:justify-end">
                  <motion.div className="h-px w-0 bg-indigo transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
