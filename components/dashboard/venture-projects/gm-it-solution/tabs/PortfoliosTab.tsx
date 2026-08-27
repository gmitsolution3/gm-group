"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { PortfoliosAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function PortfoliosTab({
  data,
}: {
  data: PortfoliosAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section title="Portfolio Analytics">
        <div className="grid gap-4 sm:grid-cols-2">
          <KpiCard
            label="Total Portfolios"
            value={data.summary.total}
          />

          <KpiCard
            label="Categories"
            value={data.summary.categories}
          />
        </div>
      </Section>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Categories</CardTitle>
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
          <CardTitle>Portfolio Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Portfolios">
        <RecentTable
          columns={["Title", "Category", "Date"]}
          rows={data.recent.portfolios.map((item) => [
            item.title,
            item.category,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
