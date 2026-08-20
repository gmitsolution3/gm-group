"use client";

import {
  CheckCircle2,
  Clock3,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  StudentDashboard as StudentDashboardType,
} from "@/types";

import { formatDate } from "@/utils";

import ActivityRow from "./ActivityRow";
import EmptyState from "./EmptyState";
import MiniStat from "./MiniStat";
import RecentCard from "./RecentCard";
import StatusRow from "./StatusRow";

import OverviewCard from "./OverviewCard";
import MonthlyActivity from "./MonthlyActivity";

export default function StudentDashboard({
  data,
}: {
  data: StudentDashboardType;
}) {
  const totalApplications =
    data.documentCount?.totalApplications ?? 0;

  const approved =
    data.documentCount?.totalApproved ?? 0;

  const pending =
    data.documentCount?.totalPending ?? 0;

  const rejected =
    data.documentCount?.totalRejected ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Total student applications"
          icon={<GraduationCap />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Approved"
          value={approved}
          description="Approved applications"
          icon={<CheckCircle2 />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Pending"
          value={pending}
          description="Awaiting processing"
          icon={<Clock3 />}
          className="border-amber-100 bg-amber-50/40"
          iconClassName="bg-amber-100 text-amber-600"
        />

        <OverviewCard
          title="Rejected"
          value={rejected}
          description="Rejected applications"
          icon={<TrendingUp />}
          className="border-red-100 bg-red-50/40"
          iconClassName="bg-red-100 text-red-600"
        />
      </section>

      {/* Applications + Universities */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Student applications
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Application and payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <StatusRow
              label="Approved"
              value={approved}
              total={totalApplications}
              color="bg-emerald-500"
            />

            <StatusRow
              label="Pending"
              value={pending}
              total={totalApplications}
              color="bg-amber-500"
            />

            <StatusRow
              label="Rejected"
              value={rejected}
              total={totalApplications}
              color="bg-red-500"
            />

            <div className="grid grid-cols-3 gap-3 pt-2">
              <MiniStat
                label="Pending payment"
                value={
                  data.paymentStats?.pending ?? 0
                }
              />

              <MiniStat
                label="Paid"
                value={
                  data.paymentStats?.paid ?? 0
                }
              />

              <MiniStat
                label="Failed"
                value={
                  data.paymentStats?.failed ?? 0
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Top universities
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Universities receiving the most
              applications.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topUniversities ?? []).length >
            0 ? (
              data.topUniversities.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <GraduationCap className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {item._id}
                    </span>
                  </div>

                  <span className="font-bold text-blue-700">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No university data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent student applications"
        icon={<GraduationCap />}
        color="blue"
      >
        {(data.recentApplications ?? []).length >
        0 ? (
          data.recentApplications.map((item) => (
            <ActivityRow
              key={item._id}
              name={`${item.firstName} ${item.lastName}`}
              description={item.university}
              date={formatDate(item.submittedAt)}
              badges={[
                item.applicationStatus,
                item.paymentStatus,
              ]}
            />
          ))
        ) : (
          <EmptyState text="No recent applications." />
        )}
      </RecentCard>

      {/* Monthly */}

      <MonthlyActivity
        items={data.monthlyTrend ?? []}
        service="Student"
      />
    </div>
  );
}