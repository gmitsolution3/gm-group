import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  articleAccentMap,
  type Article,
} from "@/content/news";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  const accent = articleAccentMap[article.accent];

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group relative isolate block overflow-hidden rounded-2xl border border-black/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-xl hover:shadow-black/5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{
          backgroundColor: accent.hex,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.18em]",
            accent.text,
          )}
        >
          {article.category}
        </p>

        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>

      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
        {article.title}
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/8 pt-5">
        <span className="text-xs font-medium text-muted-foreground">
          {article.date}
        </span>

        <span className="text-xs font-medium text-muted-foreground">
          {article.readTime}
        </span>
      </div>
    </Link>
  );
}