"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { CaseStudiesAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function CaseStudiesTab({
  data,
}: {
  data: CaseStudiesAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section title="Case Studies">
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard
            label="Total Case Studies"
            value={data.summary.total}
          />

          <KpiCard
            label="Technologies"
            value={data.summary.technologies}
          />

          <KpiCard
            label="Portfolios"
            value={data.summary.portfolios}
          />
        </div>
      </Section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Technology Usage</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.technologies} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Studies by Portfolio</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.portfolios} />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Case Study Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Case Studies">
        <RecentTable
          columns={["Title", "Portfolio", "Technologies", "Date"]}
          rows={data.recent.caseStudies.map((item) => [
            item.title,
            item.portfolio,
            item.technologies.join(", "),
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}