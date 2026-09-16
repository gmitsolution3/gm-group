"use client";

import {
  CheckCircle2,
  Clock3,
  HeartPulse,
  MapPin,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  MedicalDashboard as MedicalDashboardType,
} from "@/types";

import { formatDate } from "@/utils";

import ActivityRow from "./ActivityRow";
import EmptyState from "./EmptyState";
import MiniStat from "./MiniStat";
import RecentCard from "./RecentCard";

import OverviewCard from "./OverviewCard";
import MonthlyActivity from "./MonthlyActivity";

export default function MedicalDashboard({
  data,
}: {
  data: MedicalDashboardType;
}) {
  const totalApplications =
    data.documentCount?.totalApplications ?? 0;

  const totalHospitals =
    data.documentCount?.totalHospitals ?? 0;

  const approved =
    data.documentCount?.totalApproved ?? 0;

  const pending =
    data.documentCount?.totalPending ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Medical applications"
          icon={<HeartPulse />}
          className="from-rose-[0.04]"
          iconClassName="bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
        />

        <OverviewCard
          title="Hospitals"
          value={totalHospitals}
          description="Available hospitals"
          icon={<MapPin />}
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
      </section>

      {/* Overview details */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                <HeartPulse className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-base font-bold">
                  Medical services
                </CardTitle>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Treatment applications and
                  payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                label="Applications"
                value={totalApplications}
              />

              <MiniStat
                label="Hospitals"
                value={totalHospitals}
              />

              <MiniStat
                label="Approved"
                value={approved}
              />

              <MiniStat
                label="Pending"
                value={pending}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
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
                label="Delivered"
                value={
                  data.paymentStats?.delivered ?? 0
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
              Top hospitals
            </CardTitle>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Hospitals receiving the most
              applications.
            </p>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            {(data.topHospitals ?? []).length >
            0 ? (
              data.topHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-rose-50/40 dark:bg-rose-950/20 px-3.5 py-3 transition-all hover:bg-rose-50/60 dark:hover:bg-rose-950/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                      <HeartPulse className="h-4 w-4" />
                    </div>

                    <span className="truncate text-xs sm:text-sm font-semibold text-foreground">
                      {hospital._id}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    {hospital.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No hospital data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent medical applications"
        icon={<HeartPulse />}
        color="rose"
      >
        {(data.recentApplications ?? []).length >
        0 ? (
          data.recentApplications.map((item) => (
            <ActivityRow
              key={item._id}
              name={item.patientName}
              description={item.hospital_name}
              date={formatDate(item.createdAt)}
              badges={[
                item.appointmentStatus,
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
        service="Medical"
      />
    </div>
  );
}