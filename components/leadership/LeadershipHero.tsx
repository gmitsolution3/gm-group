"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { VisualIdentity } from "@/components/visual/visual-identity";

export default function LeadershipHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-ink text-white grain">
      <VisualIdentity variant="hero" />

      <div className="relative mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
            <span className="h-px w-12 bg-indigo" />
            Leadership
          </p>
        </Reveal>

        <h1 className="mt-8 max-w-4xl font-display text-display tracking-tightest text-balance">
          <RevealWords
            text="Guiding the Group."
            highlightIndices={[2]}
            highlightClass="text-indigo"
            delay={0.1}
          />
        </h1>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty sm:text-xl">
            The leadership team responsible for building, managing, and
            growing the businesses under GM Group.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
