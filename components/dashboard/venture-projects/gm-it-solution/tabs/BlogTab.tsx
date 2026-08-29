"use client";

import { FileText, Star, UserCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { BlogAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function BlogTab({ data }: { data: BlogAnalytics }) {
  return (
    <div className="space-y-8">
      {/* ============================================
          SUMMARY
      ============================================ */}

      <Section
        title="Blog Analytics"
        description="Overview of blog posts, featured content, categories, and authors."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Posts"
            value={data.summary.total}
            icon={FileText}
          />

          <KpiCard
            label="Featured Posts"
            value={data.summary.featured}
            icon={Star}
          />

          <KpiCard
            label="Regular Posts"
            value={data.summary.regular}
            icon={FileText}
          />

          <KpiCard
            label="Featured Rate"
            value={data.summary.featuredRate}
            icon={UserCheck}
          />
        </div>
      </Section>

      {/* ============================================
          GROWTH
      ============================================ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Blog Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.growth} />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          BREAKDOWNS
      ============================================ */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Posts by Category</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.categories}
              labelKey="category"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts by Author</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.authors}
              labelKey="author"
            />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          RECENT BLOG POSTS
      ============================================ */}

      <Section
        title="Recent Blog Posts"
        description="Latest blog content published on GM IT Solution."
      >
        <RecentTable
          columns={[
            "Title",
            "Category",
            "Author",
            "Read Time",
            "Featured",
            "Date",
          ]}
          rows={data.recent.blogs.map((item) => [
            item.title,
            item.category,
            item.author,
            item.readTime,
            item.featured ? "Yes" : "No",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
