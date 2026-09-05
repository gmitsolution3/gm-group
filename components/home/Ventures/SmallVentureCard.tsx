"use client";

import { IVenture } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { VentureLogo } from "./VentureLogo";

interface SmallVentureCardProps {
  venture: IVenture;
}

export function SmallVentureCard({ venture }: SmallVentureCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-1 items-center justify-between overflow-hidden rounded-2xl border border-black/[0.06] bg-canvas p-7 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{
          backgroundColor: "#5B5FEF",
        }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <VentureLogo venture={venture} size="sm" />

          <span className="text-xs font-semibold uppercase tracking-widest text-mutedText">
            {venture.industry}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tightest text-ink">
          {venture.name}
        </h3>

        <p className="mt-2 max-w-xs text-sm text-mutedText text-pretty">
          {venture.shortDescription}
        </p>

        <Link
          href={`/ventures/${venture.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-indigo"
        >
          Explore
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
