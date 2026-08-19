"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { VisualIdentity } from "@/components/visual/visual-identity";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-ink text-white grain">
      <VisualIdentity variant="hero" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
            <span className="h-px w-12 bg-coral" />
            Page Not Found
          </p>
        </Reveal>

        <h1 className="mt-8 max-w-5xl font-display text-[clamp(7rem,20vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.08em] text-white">
          <RevealWords text="404" delay={0.1} />
        </h1>

        <Reveal delay={0.28}>
          <div className="mt-10 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              This page went somewhere else.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-white/60 sm:text-xl">
              The page you're looking for doesn't exist, may have
              moved, or is no longer available.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-yellow"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <Link
            href="/ventures"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
          >
            Explore Ventures
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Decorative number */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-16 select-none font-display text-[18rem] font-extrabold leading-none tracking-[-0.08em] text-white/[0.025] sm:-right-10 sm:text-[24rem] lg:-right-20 lg:text-[32rem]"
        >
          404
        </div>
      </div>
    </main>
  );
}
