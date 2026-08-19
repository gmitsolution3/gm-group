"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { VisualIdentity } from "@/components/visual/visual-identity";

export default function CareersHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-ink text-white grain">
      <VisualIdentity variant="hero" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"><span className="h-px w-12 bg-indigo" />Careers</p>
        </Reveal>
        <h1 className="mt-8 max-w-5xl font-display text-display tracking-tightest text-balance">
          <span className="block"><RevealWords text="Build the Future" delay={0.1} /></span>
          <span className="block"><RevealWords text="With GM Group." className="block w-full" highlightIndices={[2]} highlightClass="text-indigo" delay={0.28} /></span>
        </h1>
        <Reveal delay={0.45}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty sm:text-xl">Join a group building businesses across industries — with the ambition, direction, and long-term thinking that define GM Group.</p>
        </Reveal>
      </div>
    </section>
  );
}
