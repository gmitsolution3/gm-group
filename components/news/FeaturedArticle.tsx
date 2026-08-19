import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { articleAccentMap, type Article } from "@/content/news";

type FeaturedArticleProps = {
  article: Article;
};

export default function FeaturedArticle({
  article,
}: FeaturedArticleProps) {
  const accent = articleAccentMap[article.accent];

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group relative isolate block overflow-hidden rounded-[2rem] bg-ink text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[100px] transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundColor: accent.hex,
        }}
      />

      <div className="grid min-h-[28rem] gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Featured
            </span>

            <span
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent.text}`}
            >
              {article.category}
            </span>
          </div>

          <div className="mt-auto pt-16">
            <p className="text-sm font-medium text-white/50">
              {article.date}
            </p>

            <h2 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {article.excerpt}
            </p>
          </div>
        </div>

        <div className="flex items-end lg:items-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors group-hover:bg-yellow">
            Read Article
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}