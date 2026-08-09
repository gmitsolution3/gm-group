"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { visionMission } from "@/content/company";
import { motion, useReducedMotion } from "motion/react";

export default function VisionMission() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink text-white grain">
      {/* Multicolor visual energy behind typography */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          {...(reduce
            ? {}
            : {
                animate: { x: [0, 40, 0], y: [0, -20, 0] },
                transition: {
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute left-1/4 top-1/4 h-[50vh] w-[50vh] rounded-full bg-indigo/20 blur-[100px]"
        />
        <motion.div
          {...(reduce
            ? {}
            : {
                animate: { x: [0, -30, 0], y: [0, 30, 0] },
                transition: {
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute right-1/4 top-1/3 h-[45vh] w-[45vh] rounded-full bg-teal/15 blur-[100px]"
        />
        <motion.div
          {...(reduce
            ? {}
            : {
                animate: { x: [0, 20, 0], y: [0, -25, 0] },
                transition: {
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full bg-yellow/10 blur-[80px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        {/* Headline */}
        <h2 className="max-w-5xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tightest text-balance">
          <span className="block text-white/40">
            <RevealWords text={visionMission.headline[0]} />
          </span>
          <span className="block">
            <RevealWords
              text={visionMission.headline[1]}
              delay={0.2}
              highlightIndices={[
                visionMission.headline[1].split(" ").length - 1,
              ]}
              highlightClass="text-yellow"
            />
          </span>
        </h2>

        {/* Vision / Mission — editorial, not two cards */}
        <div className="mt-20 grid gap-px overflow-hidden border border-white/10 lg:grid-cols-[1fr_1.5fr_1fr]">
          {/* Vision label */}
          <div className="bg-white/[0.03] p-8 lg:p-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
                {visionMission.visionLabel}
              </p>
            </Reveal>
          </div>
          <div className="bg-white/[0.03] p-8 lg:p-10 lg:col-span-2 lg:col-start-2 lg:row-start-1">
            <Reveal delay={0.05}>
              <p className="text-xl leading-relaxed text-white/70 text-pretty lg:text-2xl">
                {visionMission.visionContent}
              </p>
            </Reveal>
          </div>

          {/* Mission */}
          <div className="bg-white/[0.03] p-8 lg:p-10 lg:col-start-1 lg:row-start-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal">
                {visionMission.missionLabel}
              </p>
            </Reveal>
          </div>
          <div className="bg-white/[0.03] p-8 lg:p-10 lg:col-span-2 lg:col-start-2 lg:row-start-2">
            <Reveal delay={0.05}>
              <p className="text-xl leading-relaxed text-white/70 text-pretty lg:text-2xl">
                {visionMission.missionContent}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
