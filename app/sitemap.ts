import type { MetadataRoute } from "next";

import { articles } from "@/content/news";
import { ventures } from "@/content/ventures";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.gmgroupbd.com";

  const staticRoutes = [
    "",
    "/about",
    "/ventures",
    "/news",
    "/leadership",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const ventureEntries = ventures.map((venture) => ({
    url: `${baseUrl}/ventures/${venture.slug}`,
    lastModified: new Date(),
  }));

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticEntries,
    ...ventureEntries,
    ...articleEntries,
  ];
}