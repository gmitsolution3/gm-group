"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BlogAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function BlogTab({
  data,
}: {
  data: BlogAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section title="Blog Analytics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Blogs" value={data.summary.total} />
          <KpiCard
            label="Featured"
            value={data.summary.featured}
          />
          <KpiCard label="Regular" value={data.summary.regular} />
          <KpiCard
            label="Featured Rate"
            value={`${data.summary.featuredRate}%`}
          />
        </div>
      </Section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blogs by Category</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.categories} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blogs by Author</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.authors} />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Blog Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Blogs">
        <RecentTable
          columns={["Title", "Category", "Author", "Featured", "Date"]}
          rows={data.recent.blogs.map((item) => [
            item.title,
            item.category,
            item.author,
            item.featured ? "Yes" : "No",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}