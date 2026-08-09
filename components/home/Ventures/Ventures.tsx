'use client';

import { Reveal } from '@/components/visual/motion';
import { ventureAccentMap, ventures, type Venture } from '@/content/ventures';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { VentureLogo } from './VentureLogo';

export default function Ventures() {
  const featured = ventures.find((v) => v.featured) ?? ventures[0];
  const others = ventures.filter((v) => v.slug !== featured.slug);
  const [v2, v3, v4] = others;

  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
                02 — Ventures
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
                Our Ventures
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-mutedText text-pretty">
                Businesses built, managed and grown under GM Group.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/ventures"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-indigo"
            >
              View All Ventures
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Portfolio composition: 1 large + 2 small + 1 offset */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Featured — large, left, spans 7 cols, tall */}
          <FeaturedVentureCard venture={featured} />

          {/* Right column: 2 smaller stacked + 1 offset */}
          <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
            <SmallVentureCard venture={v2} />
            <SmallVentureCard venture={v3} />
          </div>

          {/* Offset venture — full width, shifted right */}
          <div className="lg:col-span-8 lg:col-start-5">
            <OffsetVentureCard venture={v4} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedVentureCard({ venture }: { venture: Venture }) {
  const reduce = useReducedMotion();
  const accent = ventureAccentMap[venture.accent];

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 text-white lg:col-span-7 lg:min-h-[560px] lg:p-10"
    >
      {/* Accent gradient field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${accent.hex}40, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"
        style={{ backgroundColor: accent.hex }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <VentureLogo venture={venture} size="lg" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Featured Venture
            </p>
            <p className="text-sm text-white/60">{venture.industry}</p>
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

function SmallVentureCard({ venture }: { venture: Venture }) {
  const reduce = useReducedMotion();
  const accent = ventureAccentMap[venture.accent];

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-black/[0.06] bg-canvas p-7 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] lg:flex-1"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: accent.hex }}
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

function OffsetVentureCard({ venture }: { venture: Venture }) {
  const reduce = useReducedMotion();
  const accent = ventureAccentMap[venture.accent];

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center gap-8 overflow-hidden rounded-2xl bg-ink p-8 text-white lg:min-h-[200px] lg:p-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${accent.hex}50, transparent 50%)`,
        }}
      />
      <div className="relative hidden shrink-0 lg:block">
        <VentureLogo venture={venture} size="md" />
      </div>
      <div className="relative flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {venture.industry}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-tightest lg:text-4xl">
          {venture.name}
        </h3>
        <p className="mt-3 max-w-md text-white/60 text-pretty">
          {venture.shortDescription}
        </p>
      </div>
      <Link
        href={`/ventures/${venture.slug}`}
        className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:bg-white group-hover:text-ink"
      >
        Explore
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}
