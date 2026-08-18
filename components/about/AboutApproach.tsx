"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/visual/motion";
import { aboutContent, growthStages } from "@/content/company";

export default function AboutApproach() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">04 — Approach</p></Reveal>
          <div><Reveal delay={0.05}><h2 className="font-display text-h2 tracking-tightest text-ink text-balance">How We Build Momentum</h2></Reveal><Reveal delay={0.12}><p className="mt-7 max-w-2xl text-lg leading-relaxed text-mutedText text-pretty">{aboutContent.approach}</p></Reveal></div>
        </div>
        <StaggerGroup className="mt-16 border-t border-black/[0.08] lg:mt-24">
          {growthStages.map((stage) => <StaggerItem key={stage.number} className="group grid gap-5 border-b border-black/[0.08] py-8 transition-colors duration-500 hover:bg-canvas sm:grid-cols-[5rem_1fr] lg:grid-cols-[0.15fr_0.35fr_1fr] lg:gap-12 lg:px-4 lg:py-10"><span className="font-display text-lg font-bold text-indigo">{stage.number}</span><h3 className="font-display text-3xl font-bold tracking-tightest text-ink transition-transform duration-500 group-hover:translate-x-2">{stage.title}</h3><p className="max-w-xl leading-relaxed text-mutedText text-pretty">{stage.description}</p></StaggerItem>)}
        </StaggerGroup>
      </div>
    </section>
  );
}
