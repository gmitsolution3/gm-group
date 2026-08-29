"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  FolderKanban,
} from "lucide-react";

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
      {/* =========================
          OVERVIEW
      ========================== */}
      <Section
        title="Portfolios Analytics"
        description="Overview of portfolio projects, categories, and growth."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <KpiCard
            label="Total Portfolios"
            value={data.summary.total ?? 0}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Portfolio Categories"
            value={data.summary.categories ?? 0}
            icon={FolderKanban}
          />
        </div>
      </Section>

      {/* =========================
          GROWTH & CATEGORIES
      ========================== */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Portfolio Growth
            </CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.growth} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="size-5" />
              Portfolio Categories
            </CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.categories}
              labelKey="category"
            />
          </CardContent>
        </Card>
      </section>

      {/* =========================
          RECENT PORTFOLIOS
      ========================== */}
      <Section
        title="Recent Portfolios"
        description="Recently added portfolio projects."
      >
        <RecentTable
          columns={[
            "Project",
            "Category",
            "Website",
            "Created",
          ]}
          rows={data.recent.portfolios.map((portfolio) => [
            portfolio.title,
            portfolio.category,
            portfolio.url,
            new Date(portfolio.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}