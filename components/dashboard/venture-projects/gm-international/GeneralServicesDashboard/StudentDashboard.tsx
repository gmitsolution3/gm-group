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
          className="from-blue-[0.04]"
          iconClassName="bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
        />

        <OverviewCard
          title="Approved"
          value={approved}
          description="Approved applications"
          icon={<CheckCircle2 />}
          className="from-emerald-[0.04]"
          iconClassName="bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
        />

        <OverviewCard
          title="Pending"
          value={pending}
          description="Awaiting processing"
          icon={<Clock3 />}
          className="from-amber-[0.04]"
          iconClassName="bg-amber-100/80 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
        />

        <OverviewCard
          title="Rejected"
          value={rejected}
          description="Rejected applications"
          icon={<TrendingUp />}
          className="from-red-[0.04]"
          iconClassName="bg-red-100/80 text-red-600 dark:bg-red-900/40 dark:text-red-400"
        />
      </section>

      {/* Applications + Universities */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-base font-bold">
                  Student applications
                </CardTitle>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Application and payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
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

        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">
              Top universities
            </CardTitle>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Universities receiving the most
              applications.
            </p>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            {(data.topUniversities ?? []).length >
            0 ? (
              data.topUniversities.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-blue-50/40 dark:bg-blue-950/20 px-3.5 py-3 transition-all hover:bg-blue-50/60 dark:hover:bg-blue-950/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      <GraduationCap className="h-4 w-4" />
                    </div>

                    <span className="truncate text-xs sm:text-sm font-semibold text-foreground">
                      {item._id}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
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