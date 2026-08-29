"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  Code2,
  FileStack,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      {/* =========================
          OVERVIEW
      ========================== */}
      <Section
        title="Case Studies Analytics"
        description="Overview of case studies, technologies, and portfolio coverage."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard
            label="Total Case Studies"
            value={data.summary.total ?? 0}
            icon={FileStack}
          />

          <KpiCard
            label="Technologies Used"
            value={data.summary.technologiesUsed ?? 0}
            icon={Code2}
          />

          <KpiCard
            label="Portfolios Covered"
            value={data.summary.portfoliosWithCaseStudies ?? 0}
            icon={BriefcaseBusiness}
          />
        </div>
      </Section>

      {/* =========================
          GROWTH & TECHNOLOGIES
      ========================== */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Case Study Growth
            </CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.growth} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="size-5" />
              Technologies
            </CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.technologies}
              labelKey="technology"
            />
          </CardContent>
        </Card>
      </section>

      {/* =========================
          PORTFOLIO BREAKDOWN
      ========================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseBusiness className="size-5" />
            Portfolio Distribution
          </CardTitle>
        </CardHeader>

        <CardContent>
          <BreakdownList
            items={data.breakdowns.portfolios}
            labelKey="portfolioId"
          />
        </CardContent>
      </Card>

      {/* =========================
          RECENT CASE STUDIES
      ========================== */}
      <Section
        title="Recent Case Studies"
        description="Latest case studies created in the system."
      >
        <RecentTable
          columns={[
            "Portfolio ID",
            "Features",
            "Technologies",
            "Created",
          ]}
          rows={data.recent.caseStudies.map((caseStudy) => [
            caseStudy.portfolioId,
            caseStudy.features.length.toString(),
            caseStudy.technologies.length.toString(),
            new Date(caseStudy.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
