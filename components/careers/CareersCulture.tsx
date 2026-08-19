"use client";

import { Reveal } from "@/components/visual/motion";
import { careersContent } from "@/content/company";

export default function CareersCulture() {
  return (
    <section className="relative bg-ink py-24 text-white grain sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"><div className="grid gap-10 lg:grid-cols-[0.4fr_1.4fr] lg:gap-20"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">Culture</p></Reveal><Reveal delay={0.08}><p className="max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.2] tracking-tightest text-white/80 text-pretty">{careersContent.culture}</p></Reveal></div></div>
    </section>
  );
}
