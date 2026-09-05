"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { VentureLogo } from "./VentureLogo";
import { IVenture } from "@/types";

export const ventureAccentMap = {
  indigo: {
    bg: "bg-indigo",
    text: "text-indigo",
    ring: "ring-indigo",
    hex: "#5B5FEF",
  },

  teal: {
    bg: "bg-teal",
    text: "text-teal",
    ring: "ring-teal",
    hex: "#00BFA6",
  },

  yellow: {
    bg: "bg-yellow",
    text: "text-yellow",
    ring: "ring-yellow",
    hex: "#FFD23F",
  },

  coral: {
    bg: "bg-coral",
    text: "text-coral",
    ring: "ring-coral",
    hex: "#F43F5E",
  },
} as const;

interface FeaturedVentureCardProps {
  venture: IVenture;
  className?: string;
}

export function FeaturedVentureCard({
  venture,
  className,
}: FeaturedVentureCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 text-white lg:min-h-[560px] lg:p-10",
        className,
      )}
    >
      {/* Accent gradient field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background: `radial-gradient(circle at 80% 20%, #5B5FEF40, transparent 60%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
        style={{
          backgroundColor: "#5B5FEF",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <VentureLogo venture={venture} size="lg" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Featured Venture
            </p>

            <p className="text-sm text-white/60">
              {venture.industry}
            </p>
          </div>
        </div>

        <h3 className="font-display text-4xl font-bold tracking-tightest lg:text-5xl">
          {venture.name}
        </h3>

        <p className="mt-4 max-w-md text-lg text-white/60 text-pretty">
          {venture.shortDescription}
        </p>

        <Link
          href={`/ventures/${venture.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-indigo"
        >
          Explore Venture
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
