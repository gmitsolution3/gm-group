"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { articleAccentMap, type Article } from "@/content/news";

type ArticleHeroProps = {
  article: Article;
};

export default function ArticleHero({
  article,
}: ArticleHeroProps) {
  const accent = articleAccentMap[article.accent];

  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-ink text-white grain">
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
            href="/news"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All News
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
            >
              {article.category}
            </span>

            <span className="h-1 w-1 rounded-full bg-white/30" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {article.date}
            </span>

            <span className="h-1 w-1 rounded-full bg-white/30" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {article.readTime}
            </span>
          </div>
        </Reveal>

        <h1 className="mt-8 max-w-5xl font-display text-display tracking-tightest text-balance">
          <RevealWords
            text={article.title}
            delay={0.2}
          />
        </h1>

        <Reveal delay={0.38}>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/60 text-pretty sm:text-xl">
            {article.excerpt}
          </p>
        </Reveal>
      </div>
    </section>
  );
}