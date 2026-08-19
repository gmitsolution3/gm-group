"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/visual/motion";

import {
  articles,
  newsCategories,
} from "@/content/news";

import ArticleCard from "@/components/news/ArticleCard";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import NewsCategoryFilter from "@/components/news/NewsCategoryFilter";
import NewsHero from "@/components/news/NewsHero";
import NewsCta from "@/components/news/NewsCta";

export default function NewsPage() {
  const [category, setCategory] = useState("All");

  const featuredArticle = articles.find(
    (article) => article.featured,
  );

  const filteredArticles = useMemo(() => {
    const availableArticles = articles.filter(
      (article) => !article.featured,
    );

    if (category === "All") {
      return availableArticles;
    }

    return availableArticles.filter(
      (article) => article.category === category,
    );
  }, [category]);

  return (
    <main>
      <NewsHero />

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Featured article */}
          {featuredArticle && (
            <Reveal>
              <FeaturedArticle article={featuredArticle} />
            </Reveal>
          )}

          {/* Article archive */}
          <div className="mt-24 sm:mt-28 lg:mt-32">
            <Reveal>
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal">
                  <span className="h-px w-10 bg-teal" />
                  From GM Group
                </p>

                <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Latest thinking and updates.
                </h2>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Explore announcements, perspectives, and developments
                  from across GM Group.
                </p>
              </div>
            </Reveal>

            {/* Categories */}
            <Reveal
              delay={0.1}
              className="mt-10"
            >
              <NewsCategoryFilter
                categories={newsCategories}
                value={category}
                onChange={setCategory}
              />
            </Reveal>

            {/* Articles */}
            {filteredArticles.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-6">
                {filteredArticles.map((article, index) => (
                  <Reveal
                    key={article.slug}
                    delay={index * 0.06}
                  >
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="mt-8">
                <div className="rounded-2xl border border-dashed border-black/10 bg-muted/20 px-6 py-16 text-center">
                  <p className="font-display text-xl font-semibold">
                    No articles found.
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    There are currently no articles in the{" "}
                    <span className="font-medium text-ink">
                      {category}
                    </span>{" "}
                    category.
                  </p>

                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal"
                  >
                    View All Articles
                  </button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <NewsCta />
    </main>
  );
}