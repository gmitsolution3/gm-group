"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Reveal, RevealWords } from "@/components/visual/motion";

import { IVenture } from "@/types";

import { ventureAccentMap } from "@/content/ventures";

import VentureLogo from "../VentureLogo";

type VentureDetailHeroProps = {
  venture: IVenture;
};

export default function VentureDetailHero({
  venture,
}: VentureDetailHeroProps) {
  const accent = ventureAccentMap[venture.accent];

  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-ink text-white grain">
      {/* Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[120px]"
        style={{
          backgroundColor: accent.hex,
        }}
      />

      <div className="relative mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <Link
            href="/ventures"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All Ventures
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-center lg:gap-16">
          <div>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <Reveal>
                <VentureLogo venture={venture} size="lg" />
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
                  >
                    {venture.industry}
                  </p>

                  <p className="mt-2 text-sm text-white/40">
                    Established {venture.established}
                  </p>
                </div>
              </Reveal>
            </div>

            <h1 className="mt-8 max-w-5xl font-display text-display tracking-tightest text-balance">
              <RevealWords text={venture.name} delay={0.18} />
            </h1>

            <Reveal delay={0.35}>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/60 text-pretty sm:text-2xl">
                {venture.tagline}
              </p>
            </Reveal>

            <Reveal
              delay={0.45}
              className="mt-8 flex flex-wrap gap-3"
            >
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60">
                {venture.featured
                  ? "Featured Venture"
                  : "GM Group Venture"}
              </span>

              {venture.website && venture.website !== "#" && (
                <a
                  href={venture.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-yellow"
                >
                  Visit Website
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </Reveal>
          </div>

          {venture.image && (
            <Reveal delay={0.2} className="lg:justify-self-end">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:w-[32rem]">
                  <Image
                    src={venture.image}
                    alt={venture.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 512px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
