"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ServicesAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function ServicesTab({
  data,
}: {
  data: ServicesAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section
        title="Services"
        description="Service portfolio and technology usage."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard
            label="Total Services"
            value={data.summary.total}
          />
          <KpiCard
            label="Avg. Features"
            value={data.summary.averageFeatures}
          />
          <KpiCard
            label="Avg. Technologies"
            value={data.summary.averageTechnologies}
          />
        </div>
      </Section>

      <Card>
        <CardHeader>
          <CardTitle>Technology Usage</CardTitle>
        </CardHeader>

        <CardContent>
          <BreakdownList
            items={data.breakdowns.technologies}
            labelKey="technology"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Services">
        <RecentTable
          columns={["Title", "Technologies", "Date"]}
          rows={data.recent.services.map((item) => [
            item.title,
            item.technologies.join(", "),
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
