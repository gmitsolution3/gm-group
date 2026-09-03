"use client";

import { Reveal } from "@/components/visual/motion";
import { journey } from "@/content/company";

export default function AboutJourney() {
  return (
    <section className="bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
              05 — Journey
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
              The Story Still Being Written
            </h2>
          </Reveal>
        </div>
        <div className="relative mt-16 border-l border-black/10 lg:mt-24 lg:border-l-0 lg:border-t">
          <div className="grid gap-0 lg:grid-cols-6">
            {journey.map((entry, index) => (
              <Reveal
                key={entry.title}
                delay={index * 0.06}
                className="relative border-b border-black/10 py-8 pl-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:pb-0 lg:pt-8 last:lg:border-r-0"
              >
                <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-indigo lg:-top-[5px] lg:left-6" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                  {entry.year}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tightest text-ink">
                  {entry.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mutedText text-pretty">
                  {entry.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
