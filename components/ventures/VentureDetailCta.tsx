"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/visual/motion";

export default function VentureDetailCta() {
  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-canvas py-24 sm:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-indigo/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-teal/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
              <span className="h-px w-10 bg-indigo" />
              GM Group
            </p>
          </Reveal>

          <h2 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tightest text-balance">
            <Reveal delay={0.1}>
              Explore what we're building next.
            </Reveal>
          </h2>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Discover the other businesses shaping the direction of GM
              Group.
            </p>
          </Reveal>

          <Reveal
            delay={0.3}
            className="mt-10"
          >
            <Link
              href="/ventures"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-indigo"
            >
              Explore All Ventures

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}