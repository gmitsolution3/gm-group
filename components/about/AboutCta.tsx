"use client";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white grain sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal/15 blur-[100px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"><div className="max-w-4xl"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow">GM Group</p></Reveal><h2 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tightest text-balance"><RevealWords text="Discover the businesses behind the group." highlightIndices={[5]} highlightClass="text-indigo" /></h2><Reveal delay={0.2}><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/60 text-pretty">Explore the ventures that put our shared direction into practice.</p></Reveal><Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4"><Link href="/ventures" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-yellow">Explore Our Ventures <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/contact" className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">Get in Touch</Link></Reveal></div></div>
    </section>
  );
}
