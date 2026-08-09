"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/news";
import { ventureAccentMap } from "@/content/ventures";
import { Reveal } from "@/components/visual/motion";

export default function News() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles
    .filter((a) => a.slug !== featured.slug)
    .slice(0, 4);

  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
                07 — News
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
                Latest News
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-indigo"
            >
              All News

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Editorial layout */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured story */}
          <Reveal className="lg:col-span-7">
            <Link
              href={`/news/${featured.slug}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 text-white lg:min-h-[480px] lg:p-10"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${ventureAccentMap[featured.accent].hex}40, transparent 60%)`,
                }}
              />

              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo">
                  {featured.category}
                </span>

                <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-balance lg:text-4xl">
                  {featured.title}
                </h3>

                <p className="mt-4 max-w-xl text-white/60 text-pretty">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-4 text-sm text-white/40">
                  <span>{featured.date}</span>

                  <span className="h-1 w-1 rounded-full bg-white/30" />

                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Smaller stories */}
          <div className="grid gap-6 lg:col-span-5">
            {others.slice(0, 3).map((article, i) => {
              const accent = ventureAccentMap[article.accent];

              return (
                <Reveal
                  key={article.slug}
                  delay={0.1 + i * 0.05}
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="group flex items-start gap-5 border-b border-black/[0.08] pb-6 transition-colors hover:border-transparent"
                  >
                    {/* Accent bar */}
                    <div
                      className="mt-1 h-12 w-1 shrink-0 rounded-full transition-all duration-500 group-hover:h-16"
                      style={{
                        backgroundColor: accent.hex,
                      }}
                    />

                    <div className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-widest text-mutedText">
                        {article.category}
                      </span>

                      <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-indigo text-pretty">
                        {article.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-mutedText text-pretty">
                        {article.excerpt}
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-xs text-mutedText/70">
                        <span>{article.date}</span>

                        <span className="h-1 w-1 rounded-full bg-mutedText/40" />

                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}