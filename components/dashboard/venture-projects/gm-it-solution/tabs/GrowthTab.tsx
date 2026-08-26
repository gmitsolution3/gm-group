"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { GrowthAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  Section,
  TrendList,
} from "../AnalyticsShared";

const metrics = [
  {
    key: "users",
    label: "Users",
  },
  {
    key: "blogs",
    label: "Blogs",
  },
  {
    key: "portfolios",
    label: "Portfolios",
  },
  {
    key: "caseStudies",
    label: "Case Studies",
  },
  {
    key: "services",
    label: "Services",
  },
  {
    key: "jobPostings",
    label: "Job Postings",
  },
  {
    key: "jobApplications",
    label: "Job Applications",
  },
  {
    key: "teamMembers",
    label: "Team Members",
  },
] as const;

type GrowthMetric = (typeof metrics)[number]["key"];

export default function GrowthTab({
  data,
}: {
  data: GrowthAnalytics;
}) {
  const [metric, setMetric] =
    useState<GrowthMetric>("users");

  const points = useMemo(
    () => data.series[metric],
    [data.series, metric],
  );

  return (
    <div className="space-y-8">
      <Section
        title="Growth"
        description="Time-series growth across available business metrics."
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>
                {metrics.find(
                  (item) => item.key === metric,
                )?.label}
              </CardTitle>

              <select
                value={metric}
                onChange={(event) =>
                  setMetric(
                    event.target.value as GrowthMetric,
                  )
                }
                className="h-10 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10"
              >
                {metrics.map((item) => (
                  <option
                    key={item.key}
                    value={item.key}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <TrendList items={points} />
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}