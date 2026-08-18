"use client";

import { Reveal } from "@/components/visual/motion";
import { aboutContent } from "@/content/company";

export default function AboutIntroduction() {
  return (
    <>
      <section className="bg-white py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">01 — Who We Are</p></Reveal>
            <div>
              <Reveal delay={0.05}><h2 className="max-w-3xl font-display text-h2 tracking-tightest text-ink text-balance">A Group Built for the Long Term</h2></Reveal>
              <Reveal delay={0.12}><p className="mt-8 max-w-2xl text-lg leading-relaxed text-mutedText text-pretty">{aboutContent.whoWeAre}</p></Reveal>
              <Reveal delay={0.2}><div className="mt-12 flex items-center gap-4"><span className="h-3 w-3 rounded-full bg-teal" /><span className="h-px w-32 bg-black/10" /></div></Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-ink py-24 text-white grain sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo/20 blur-[110px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow">02 — Our Story</p></Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Reveal delay={0.05}><h2 className="font-display text-h2 tracking-tightest text-balance">Our Story</h2></Reveal>
            <Reveal delay={0.12}><p className="max-w-3xl text-xl leading-relaxed text-white/65 text-pretty lg:text-2xl">{aboutContent.ourStory}</p></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
