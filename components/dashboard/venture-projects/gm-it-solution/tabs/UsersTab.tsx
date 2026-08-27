"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { UsersAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function UsersTab({ data }: { data: UsersAnalytics }) {
  return (
    <div className="space-y-8">
      <Section
        title="Users"
        description="User composition, verification and growth."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Total Users" value={data.summary.total} />
          <KpiCard label="Admins" value={data.summary.admins} />
          <KpiCard label="Verified" value={data.summary.verified} />
          <KpiCard
            label="Verification Rate"
            value={`${data.summary.verificationRate}%`}
          />
        </div>
      </Section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={[
                {
                  label: "Verified",
                  count: data.summary.verified,
                },
                {
                  label: "Unverified",
                  count: data.summary.unverified,
                },
              ]}
              labelKey="label"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.byRole}
              labelKey="role"
            />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>

        <CardContent>
          <TrendList items={data.trends.growth} />
        </CardContent>
      </Card>

      <Section title="Recent Users">
        <RecentTable
          columns={["Name", "Email", "Role", "Date"]}
          rows={data.recent.users.map((item) => [
            item.name || "—",
            item.email || "—",
            item.role || "—",
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>
    </div>
  );
}
