"use client";

import { Layers3, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ContentAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
} from "../AnalyticsShared";

export default function ContentTab({
  data,
}: {
  data: ContentAnalytics;
}) {
  return (
    <div className="space-y-8">
      {/* Summary */}
      <Section
        title="Content Overview"
        description="Overview of content across GM IT Solution."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <KpiCard
            label="Total Content"
            value={data?.summary?.total ?? 0}
            icon={Layers3}
          />

          <KpiCard
            label="Content Types"
            value={data?.summary?.contentTypes ?? 0}
            icon={Package}
          />
        </div>
      </Section>

      {/* Content Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <BreakdownList
            items={data?.breakdowns?.content ?? []}
            labelKey="type"
          />
        </CardContent>
      </Card>

      {/* Recent Blogs */}
      <Section
        title="Recent Blogs"
        description="Latest blog content added to the platform."
      >
        <RecentTable
          columns={[
            "Title",
            "Category",
            "Author",
            "Featured",
            "Date",
          ]}
          rows={(data?.recent?.blogs ?? []).map((item) => [
            item.title,
            item.category,
            item.author,
            item.featured ? "Yes" : "No",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* Recent Portfolios */}
      <Section
        title="Recent Portfolios"
        description="Latest portfolio projects."
      >
        <RecentTable
          columns={["Project", "Category", "Date"]}
          rows={(data?.recent?.portfolios ?? []).map((item) => [
            item.title,
            item.category,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* Recent Services */}
      <Section
        title="Recent Services"
        description="Latest services available on the platform."
      >
        <RecentTable
          columns={["Service", "Technologies", "Date"]}
          rows={(data?.recent?.services ?? []).map((item) => [
            item.title,
            item.technologies.join(", "),
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* Recent Jobs */}
      <Section
        title="Recent Job Postings"
        description="Latest recruitment opportunities."
      >
        <RecentTable
          columns={[
            "Position",
            "Department",
            "Openings",
            "Status",
            "Date",
          ]}
          rows={(data?.recent?.jobs ?? []).map((item) => [
            item.title,
            item.department,
            item.openings,
            item.isActive ? "Active" : "Inactive",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
