"use client";

import { Reveal } from "@/components/visual/motion";

export default function CareersOpportunities() {
  return (
    <section className="bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
              Opportunities
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
              Open positions.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="mt-12 lg:mt-16">
          <article className="rounded-2xl border border-black/[0.08] bg-white px-6 py-14 text-center sm:px-12 px-20 py-20">
            <h3 className="font-display text-3xl font-bold tracking-tightest text-ink lg:text-4xl">
              No current openings.
            </h3>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-mutedText text-pretty">
              We don&apos;t have any open positions right now, but
              we&apos;re always interested in hearing from talented
              people.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
