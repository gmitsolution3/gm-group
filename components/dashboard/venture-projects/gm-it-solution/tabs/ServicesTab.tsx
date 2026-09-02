"use client";

import {
  BarChart3,
  Code2,
  Layers3,
  Wrench,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ServicesAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  AnalyticsAreaChart,
  AnalyticsBarChart,
  KpiCard,
  RecentTable,
  Section,
} from "../AnalyticsShared";

export default function ServicesTab({
  data,
}: {
  data: ServicesAnalytics;
}) {
  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* SERVICES OVERVIEW                                               */}
      {/* ================================================================ */}

      <Section
        title="Services Analytics"
        description="Performance overview and technology distribution across GM IT Solution services."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard
            label="Total Services"
            value={data.summary.total ?? 0}
            icon={Layers3}
          />

          <KpiCard
            label="Average Features"
            value={data.summary.averageFeatures ?? 0}
            icon={Wrench}
          />

          <KpiCard
            label="Average Technologies"
            value={data.summary.averageTechnologies ?? 0}
            icon={Code2}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/* GROWTH + TECHNOLOGIES                                           */}
      {/* ================================================================ */}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* SERVICE GROWTH */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Service Growth
            </CardTitle>
          </CardHeader>

          <CardContent>
            <AnalyticsAreaChart
              items={data.trends.growth}
            />
          </CardContent>
        </Card>

        {/* TECHNOLOGY DISTRIBUTION */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="size-5" />
              Technologies Used
            </CardTitle>
          </CardHeader>

          <CardContent>
            <AnalyticsBarChart
              items={data.breakdowns.technologies}
              labelKey="technology"
              height={420}
            />
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* RECENT SERVICES                                                 */}
      {/* ================================================================ */}

      <Section
        title="Services"
        description="All recently created services available in the system."
      >
        <RecentTable
          columns={[
            "Service",
            "Features",
            "Technologies",
            "Created",
          ]}
          rows={data.recent.services.map((service) => [
            service.title,
            service.features.length.toString(),
            service.technologies.length.toString(),
            new Date(
              service.createdAt,
            ).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}