"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { siteConfig } from "@/content/company";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-32 sm:pt-40 lg:pt-48">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-indigo/10 blur-[100px] sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-yellow/20 blur-[80px]" />
      </div>
      <div className="relative mx-auto flex min-h-[62vh] max-w-[1400px] flex-col justify-between px-5 pb-10 sm:px-8 lg:px-12">
        <div className="max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">About GM Group</p>
          </Reveal>
          <h1 className="mt-7 font-display text-display text-ink">
            <span className="block"><RevealWords text="Building Businesses." /></span>
            <span className="block text-mutedText"><RevealWords text="Growing Possibilities." delay={0.18} highlightIndices={[1]} highlightClass="text-indigo" /></span>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mutedText text-pretty sm:text-xl">{siteConfig.description}</p>
          </Reveal>
        </div>
        <Reveal delay={0.4} className="mt-16 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-mutedText">
          <span className="h-px w-12 bg-ink/20" /> Scroll to explore
        </Reveal>
      </div>
    </section>
  );
}
