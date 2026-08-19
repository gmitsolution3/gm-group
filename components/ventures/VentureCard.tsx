"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ventureAccentMap, type Venture } from "@/content/ventures";

import VentureLogo from "./VentureLogo";

type VentureCardProps = {
  venture: Venture;
  index?: number;
};

export default function VentureCard({
  venture,
  index = 0,
}: VentureCardProps) {
  const accent = ventureAccentMap[venture.accent];

  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className={cn(
        "group relative isolate block overflow-hidden rounded-2xl border",
        "border-black/8 bg-white p-6",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-black/15 hover:shadow-xl hover:shadow-black/5",
      )}
      style={{
        animationDelay: `${index * 75}ms`,
      }}
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{
          backgroundColor: accent.hex,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <VentureLogo venture={venture} size="md" />

          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>

        <div className="mt-8">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.18em]",
              accent.text,
            )}
          >
            {venture.industry}
          </p>

          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
            {venture.name}
          </h3>

          <p className="mt-2 text-sm font-medium text-muted-foreground">
            {venture.tagline}
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {venture.shortDescription}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-ink">
          <span>Explore Venture</span>

          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}
