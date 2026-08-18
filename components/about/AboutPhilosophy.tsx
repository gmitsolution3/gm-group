"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { aboutContent } from "@/content/company";

export default function AboutPhilosophy() {
  return (
    <section className="overflow-hidden bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">03 — Philosophy</p></Reveal>
          <div>
            <h2 className="font-display text-h2 tracking-tightest text-ink text-balance"><RevealWords text="Built for the Long Term" highlightIndices={[4]} highlightClass="text-indigo" /></h2>
            <Reveal delay={0.18}><p className="mt-8 max-w-2xl text-lg leading-relaxed text-mutedText text-pretty">{aboutContent.philosophy}</p></Reveal>
          </div>
        </div>
        <Reveal delay={0.25} className="mt-20 border-y border-black/[0.08] py-10 sm:mt-28 sm:py-14">
          <p className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-none tracking-tightest text-ink/10">Durability over speed.</p>
        </Reveal>
      </div>
    </section>
  );
}
