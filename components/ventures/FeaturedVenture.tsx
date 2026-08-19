import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  ventureAccentMap,
  type Venture,
} from "@/content/ventures";

import VentureLogo from "./VentureLogo";

type FeaturedVentureProps = {
  venture: Venture;
};

export default function FeaturedVenture({
  venture,
}: FeaturedVentureProps) {
  const accent = ventureAccentMap[venture.accent];

  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className="group relative isolate block overflow-hidden rounded-[2rem] bg-ink text-white"
    >
      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[100px] transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundColor: accent.hex,
        }}
      />

      <div className="relative grid min-h-[30rem] gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Featured Venture
            </span>

            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.18em]",
                accent.text,
              )}
            >
              {venture.industry}
            </span>
          </div>

          <div className="mt-10">
            <VentureLogo
              venture={venture}
              size="lg"
              className="shadow-lg shadow-black/10"
            />
          </div>

          <div className="mt-auto pt-10">
            <p className="text-sm font-medium text-white/50">
              {venture.tagline}
            </p>

            <h2 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {venture.name}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {venture.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-end lg:items-start">
          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors group-hover:bg-yellow">
            <span>Explore Venture</span>

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}