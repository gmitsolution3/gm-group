"use client";

import {
  BadgeCheck,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { UsersAnalytics } from "@/types/dashboard/gm-it-solution.type";

import { KpiCard, RecentTable, Section } from "../AnalyticsShared";

import {
  AnalyticsAreaChart,
  AnalyticsDonutChart,
} from "../AnalyticsShared";

export default function UsersTab({ data }: { data: UsersAnalytics }) {
  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* SUMMARY                                                         */}
      {/* ================================================================ */}

      <Section
        title="Users Overview"
        description="User accounts, roles, verification status, and growth."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard
            label="Total Users"
            value={data.summary.total ?? 0}
            icon={Users}
          />

          <KpiCard
            label="Admins"
            value={data.summary.admins ?? 0}
            icon={ShieldCheck}
          />

          <KpiCard
            label="Regular Users"
            value={data.summary.users ?? 0}
            icon={Users}
          />

          <KpiCard
            label="Verified"
            value={data.summary.verified ?? 0}
            icon={UserCheck}
          />

          <KpiCard
            label="Unverified"
            value={data.summary.unverified ?? 0}
            icon={UserX}
          />

          <KpiCard
            label="Verification Rate"
            value={data.summary.verificationRate ?? 0}
            icon={BadgeCheck}
            description="% of users verified"
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/* GROWTH + ROLE BREAKDOWN                                         */}
      {/* ================================================================ */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <AnalyticsAreaChart items={data.trends.growth} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>

          <CardContent>
            <AnalyticsDonutChart
              items={data.breakdowns.byRole}
              labelKey="role"
              centerLabel="Users"
            />
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* RECENT USERS                                                    */}
      {/* ================================================================ */}

      <Section
        title="Recent Users"
        description="Latest user accounts created in the system."
      >
        <RecentTable
          columns={[
            "Name",
            "Email",
            "Role",
            "Verification",
            "Created",
          ]}
          rows={data.recent.users.map((user) => [
            user.name || "—",
            user.email || "—",
            user.role || "—",
            user.emailVerified ? "Verified" : "Unverified",
            new Date(user.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
