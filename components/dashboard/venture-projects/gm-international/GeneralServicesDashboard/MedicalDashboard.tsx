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
          className="border-rose-100 bg-rose-50/40"
          iconClassName="bg-rose-100 text-rose-600"
        />

        <OverviewCard
          title="Hospitals"
          value={totalHospitals}
          description="Available hospitals"
          icon={<MapPin />}
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
      </section>

      {/* Overview details */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <HeartPulse className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Medical services
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Treatment applications and
                  payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
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

        <Card>
          <CardHeader>
            <CardTitle>
              Top hospitals
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Hospitals receiving the most
              applications.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topHospitals ?? []).length >
            0 ? (
              data.topHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                      <HeartPulse className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {hospital._id}
                    </span>
                  </div>

                  <span className="font-bold text-rose-700">
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