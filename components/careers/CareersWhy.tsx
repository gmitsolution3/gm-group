"use client";

import { Reveal } from "@/components/visual/motion";
import { careersContent } from "@/content/company";

export default function CareersWhy() {
  return (
    <section className="bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">Why GM Group</p></Reveal><Reveal delay={0.05}><h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">A place to build work that lasts.</h2></Reveal></div>
        <div className="mt-16 grid gap-px overflow-hidden border border-black/[0.08] bg-black/[0.08] lg:mt-20 lg:grid-cols-3">
          {careersContent.why.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><article className="min-h-full bg-canvas p-8 lg:min-h-[250px] lg:p-10"><span className="font-display text-4xl font-extrabold tracking-tightest text-ink/15">0{index + 1}</span><h3 className="mt-5 font-display text-xl font-bold tracking-tightest text-ink">{item.title}</h3><p className="mt-3 text-base leading-relaxed text-mutedText text-pretty">{item.description}</p></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}
