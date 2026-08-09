"use client";

import { journey } from "@/content/company";
import { Reveal } from "@/components/visual/motion";

export default function Story() {
  return (
    <section className="relative bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl lg:mb-24">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
              06 — Journey
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
              Our Journey
            </h2>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Continuous line */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-black/[0.08] md:left-1/4" />

          {journey.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group relative grid gap-6 pb-16 last:pb-0 md:grid-cols-[1fr_1.5fr] md:gap-16">
                {/* Left — year */}
                <div className="relative pl-8 md:pl-0 md:pr-16 md:text-right">
                  {/* Node */}
                  <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-ink ring-4 ring-canvas transition-all duration-500 group-hover:bg-indigo group-hover:ring-indigo/20 md:left-auto md:right-0 md:translate-x-1/2" />

                  <p className="font-display text-4xl font-extrabold tracking-tightest text-ink/15 transition-colors duration-500 group-hover:text-indigo/30 lg:text-5xl">
                    {item.year}
                  </p>
                </div>

                {/* Right — content */}
                <div className="pl-8 md:pl-0">
                  <h3 className="font-display text-2xl font-bold tracking-tightest text-ink lg:text-3xl">
                    {item.label}
                  </h3>

                  <p className="mt-3 max-w-lg text-base leading-relaxed text-mutedText text-pretty">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}