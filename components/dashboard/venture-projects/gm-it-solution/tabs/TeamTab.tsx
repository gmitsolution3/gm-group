"use client";

import { Users, UserCheck } from "lucide-react";

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

export default function TeamTab({
  data,
}: {
  data: TeamAnalytics;
}) {
  return (
    <div className="space-y-8">
      {/* ============================================
          SUMMARY
      ============================================ */}

      <Section
        title="Team Analytics"
        description="Overview of team members, roles, and LinkedIn profile coverage."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard
            label="Total Members"
            value={data.summary.total}
            icon={Users}
          />

          <KpiCard
            label="LinkedIn Profiles"
            value={data.summary.linkedinProfiles}
            icon={UserCheck}
          />

          <KpiCard
            label="LinkedIn Coverage"
            value={data.summary.linkedinCoverage}
            icon={UserCheck}
          />
        </div>
      </Section>

      {/* ============================================
          TEAM GROWTH
      ============================================ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Team Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.growth} />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          TEAM BY ROLE
      ============================================ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Team Members by Role</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.byRole}
              labelKey="role"
            />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          RECENT TEAM MEMBERS
      ============================================ */}

      <Section
        title="Team Members"
        description="Current team members in GM IT Solution."
      >
        <RecentTable
          columns={[
            "Name",
            "Role",
            "LinkedIn",
            "Joined",
          ]}
          rows={data.recent.members.map((item) => [
            item.name,
            item.role,
            item.linkedin ? "Available" : "Not Available",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}