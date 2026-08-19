import { Reveal } from "@/components/visual/motion";
import { type Article } from "@/content/news";

import ArticleCard from "./ArticleCard";

type RelatedNewsProps = {
  articles: Article[];
};

export default function RelatedNews({ articles }: RelatedNewsProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/5 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal">
              <span className="h-px w-10 bg-teal" />
              Keep Reading
            </p>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              More from GM Group.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.08}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
