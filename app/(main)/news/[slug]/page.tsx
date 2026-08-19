import { notFound } from "next/navigation";

import {
  articles,
  getArticle,
  getRelatedArticles,
} from "@/content/news";

import ArticleContent from "@/components/news/ArticleContent";
import ArticleHero from "@/components/news/ArticleHero";
import NewsCta from "@/components/news/NewsCta";
import RelatedNews from "@/components/news/RelatedNews";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  return (
    <main>
      <ArticleHero article={article} />

      <ArticleContent article={article} />

      <RelatedNews articles={relatedArticles} />

      <NewsCta />
    </main>
  );
}