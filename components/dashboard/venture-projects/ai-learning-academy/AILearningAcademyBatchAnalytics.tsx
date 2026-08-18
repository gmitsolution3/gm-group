"use client";

import { GraduationCap, Laptop, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AILearningDashboardData } from "@/types";

interface AILearningAcademyBatchAnalyticsProps {
  batches: AILearningDashboardData["batches"];
}

export default function AILearningAcademyBatchAnalytics({
  batches,
}: AILearningAcademyBatchAnalyticsProps) {
  const { statusDistribution, enrollmentAnalytics, batchProgress } =
    batches;

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Batch analytics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Batch status, enrollment capacity, and learning progress.
        </p>
      </div>

      {/* Status + Enrollment */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Batch status */}
        <Card>
          <CardHeader>
            <CardTitle>Batch status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {statusDistribution.length === 0 ? (
              <EmptyAnalytics text="No batch status data available." />
            ) : (
              statusDistribution.map((item) => (
                <DistributionRow
                  key={item._id}
                  label={formatLabel(item._id)}
                  count={item.count}
                  percentage={item.percentage}
                  color={getStatusColor(item._id)}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Enrollment */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment capacity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <EnrollmentCard
              label="Online"
              icon={Laptop}
              capacity={enrollmentAnalytics.online.totalCapacity}
              enrolled={enrollmentAnalytics.online.totalEnrolled}
              occupancyRate={enrollmentAnalytics.online.occupancyRate}
              className="border-blue-100 bg-blue-50/40"
              iconClassName="bg-blue-100 text-blue-600"
              barClassName="bg-blue-500"
            />

            <EnrollmentCard
              label="Offline"
              icon={MapPin}
              capacity={enrollmentAnalytics.offline.totalCapacity}
              enrolled={enrollmentAnalytics.offline.totalEnrolled}
              occupancyRate={
                enrollmentAnalytics.offline.occupancyRate
              }
              className="border-emerald-100 bg-emerald-50/40"
              iconClassName="bg-emerald-100 text-emerald-600"
              barClassName="bg-emerald-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Overall enrollment */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <DistributionMetric
              label="Online enrollment"
              percentage={
                enrollmentAnalytics.overall.onlinePercentage
              }
              icon={Laptop}
              className="border-blue-100 bg-blue-50/40"
              iconClassName="bg-blue-100 text-blue-600"
            />

            <DistributionMetric
              label="Offline enrollment"
              percentage={
                enrollmentAnalytics.overall.offlinePercentage
              }
              icon={MapPin}
              className="border-emerald-100 bg-emerald-50/40"
              iconClassName="bg-emerald-100 text-emerald-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Batch progress */}
      <Card>
        <CardHeader>
          <CardTitle>Batch progress</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {batchProgress.length === 0 ? (
            <EmptyAnalytics text="No batch progress data available." />
          ) : (
            batchProgress.map((batch) => (
              <div
                key={batch.batchId}
                className="rounded-2xl border p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <GraduationCap className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {batch.batchName}
                      </p>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {batch.courseName}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <p className="font-semibold text-violet-700">
                      {formatPercentage(batch.progressPercentage)}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {batch.completedModules} of {batch.totalModules}{" "}
                      modules
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{
                        width: `${Math.min(
                          Math.max(batch.progressPercentage, 0),
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DistributionRow({
  label,
  count,
  percentage,
  color,
}: {
  label: string;
  count: number;
  percentage: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>

          <span className="text-xs text-muted-foreground">
            {count}
          </span>
        </div>

        <span className="text-sm font-semibold">
          {formatPercentage(percentage)}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function EnrollmentCard({
  label,
  icon: Icon,
  capacity,
  enrolled,
  occupancyRate,
  className,
  iconClassName,
  barClassName,
}: {
  label: string;
  icon: React.ElementType;
  capacity: number;
  enrolled: number;
  occupancyRate: number;
  className: string;
  iconClassName: string;
  barClassName: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="font-medium">{label}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {enrolled} enrolled / {capacity} capacity
            </p>
          </div>
        </div>

        <p className="text-lg font-bold">
          {formatPercentage(occupancyRate)}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-background/70">
        <div
          className={`h-full rounded-full ${barClassName}`}
          style={{
            width: `${Math.min(Math.max(occupancyRate, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function DistributionMetric({
  label,
  percentage,
  icon: Icon,
  className,
  iconClassName,
}: {
  label: string;
  percentage: number;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`}>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="mt-1 text-2xl font-bold">
            {formatPercentage(percentage)}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyAnalytics({ text }: { text: string }) {
  return (
    <div className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
      {text}
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatPercentage(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`;
}

function getStatusColor(status: string) {
  switch (status) {
    case "ongoing":
      return "bg-blue-500";

    case "completed":
      return "bg-emerald-500";

    case "upcoming":
      return "bg-amber-500";

    case "cancelled":
      return "bg-red-500";

    default:
      return "bg-violet-500";
  }
}
