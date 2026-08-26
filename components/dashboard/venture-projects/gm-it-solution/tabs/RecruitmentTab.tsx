"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { RecruitmentAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function RecruitmentTab({
  data,
}: {
  data: RecruitmentAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section
        title="Recruitment"
        description="Jobs, openings and application analytics."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Jobs"
            value={data.summary.totalJobs}
          />

          <KpiCard
            label="Active Jobs"
            value={data.summary.activeJobs}
          />

          <KpiCard
            label="Inactive Jobs"
            value={data.summary.inactiveJobs}
          />

          <KpiCard
            label="Total Openings"
            value={data.summary.totalOpenings}
          />

          <KpiCard
            label="Applications"
            value={data.summary.totalApplications}
          />

          <KpiCard
            label="Avg. Applications / Job"
            value={data.summary.averageApplicationsPerJob}
          />

          <KpiCard
            label="Avg. Openings / Job"
            value={data.summary.averageOpeningsPerJob}
          />
        </div>
      </Section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Department</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList items={data.breakdowns.departments} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Type</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.employmentTypes}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workplace Type</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.workplaceTypes}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Level</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.experienceLevels}
            />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Applications by Job</CardTitle>
        </CardHeader>

        <CardContent>
          <BreakdownList
            items={data.breakdowns.applicationsByJob}
          />
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

      <Section title="Recent Jobs">
        <RecentTable
          columns={["Title", "Department", "Type", "Openings", "Date"]}
          rows={data.recent.jobs.map((item) => [
            item.title,
            item.department || "—",
            item.employmentType || "—",
            item.openings ?? "—",
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

      {data.limitations.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle>Analytics limitations</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {data.limitations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}