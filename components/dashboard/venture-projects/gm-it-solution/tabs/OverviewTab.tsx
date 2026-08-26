"use client";

import { BriefcaseBusiness, FileText, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { OverviewAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  ActivityTimeline,
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function OverviewTab({
  data,
}: {
  data: OverviewAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section
        title="Overview"
        description="Company-wide view of GM IT Solution activity."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard
            label="Users"
            value={data?.users?.total ?? 0}
            icon={Users}
          />

          <KpiCard
            label="Portfolios"
            value={data?.portfolios?.total ?? 0}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Blog Posts"
            value={data?.blog?.total ?? 0}
            icon={FileText}
          />

          <KpiCard
            label="Team Members"
            value={data?.team?.total ?? 0}
            icon={Users}
          />

          <KpiCard
            label="Active Jobs"
            value={data?.recruitment?.activeJobs ?? 0}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Applications"
            value={data?.recruitment?.applications ?? 0}
            icon={FileText}
          />
        </div>
      </Section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.users} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.applications} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Categories</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.portfolioCategories}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Categories</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.blogCategories} />
          </CardContent>
        </Card>
      </section>

      <Section
        title="Recent Activity"
        description="Latest activity across GM IT Solution."
      >
        <ActivityTimeline items={data.activity} />
      </Section>

      <Section title="Recent Portfolios">
        <RecentTable
          columns={["Project", "Category", "Date"]}
          rows={data.recent.portfolios.map((item) => [
            item.title,
            item.category,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      <Section title="Recent Applications">
        <RecentTable
          columns={["Applicant", "Job", "Date"]}
          rows={data.recent.applications.map((item) => [
            item.name || "Applicant",
            item.job || "—",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
