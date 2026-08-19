"use client";

import { Reveal } from "@/components/visual/motion";
import { careersContent } from "@/content/company";

export default function CareersWorkingWithUs() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">Working With Us</p></Reveal><Reveal delay={0.05}><h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">What it&apos;s like to be here.</h2></Reveal></div>
        <div className="mt-16 grid gap-x-16 lg:mt-20 lg:grid-cols-2">
          {careersContent.workingWithUs.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><article className="border-b border-black/[0.08] py-8 first:pt-0 lg:py-10 lg:[&:nth-child(2)]:pt-0"><div className="flex items-baseline gap-4"><span className="font-display text-lg font-bold text-indigo">0{index + 1}</span><h3 className="font-display text-2xl font-bold tracking-tightest text-ink">{item.title}</h3></div><p className="mt-4 pl-10 leading-relaxed text-mutedText text-pretty">{item.description}</p></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}
