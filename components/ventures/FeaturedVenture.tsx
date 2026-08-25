"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { IVenture } from "@/types";

import VentureLogo from "./VentureLogo";

type FeaturedVentureProps = {
  venture: IVenture;
};

export default function FeaturedVenture({
  venture,
}: FeaturedVentureProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 text-white lg:min-h-[560px] lg:p-10"
    >
      {/* Accent gradient field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #5B5FEF40, transparent 60%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#5B5FEF] opacity-20 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
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

        <h2 className="font-display text-4xl font-bold tracking-tightest lg:text-5xl">
          {venture.name}
        </h2>

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