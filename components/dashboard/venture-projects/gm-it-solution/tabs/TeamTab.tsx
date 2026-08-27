"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { TeamAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function TeamTab({ data }: { data: TeamAnalytics }) {
  return (
    <div className="space-y-8">
      <Section title="Team">
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard label="Team Members" value={data.summary.total} />
          <KpiCard
            label="LinkedIn Profiles"
            value={data.summary.linkedinProfiles}
          />
          <KpiCard
            label="LinkedIn Coverage"
            value={`${data.summary.linkedinCoverage}%`}
          />
        </div>
      </Section>

      <Card>
        <CardHeader>
          <CardTitle>Team by Role</CardTitle>
        </CardHeader>

        <CardContent>
          <BreakdownList
            items={data.breakdowns.byRole}
            labelKey="role"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Team Members">
        <RecentTable
          columns={["Name", "Role", "LinkedIn", "Joined"]}
          rows={data.recent.members.map((item) => [
            item.name,
            item.role,
            item.linkedin ? "Available" : "—",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
