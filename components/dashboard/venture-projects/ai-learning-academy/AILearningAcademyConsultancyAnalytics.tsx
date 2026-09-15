"use client";

import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Laptop,
  MapPin,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AILearningDashboardData } from "@/types";
import {
  calculatePercentage,
  formatMonth,
  formatNumber,
  formatPercentage,
} from "../utils";

interface AILearningAcademyConsultancyAnalyticsProps {
  consultancy: AILearningDashboardData["consultancy"];
}

export default function AILearningAcademyConsultancyAnalytics({
  consultancy,
}: AILearningAcademyConsultancyAnalyticsProps) {
  const {
    monthlyTrend,
    typeDistribution,
    enrollmentStatus,
    topRequestedCourses,
    topRequestedBatches,
  } = consultancy;

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Consultancy Analytics
          </h2>
          <p className="text-xs text-muted-foreground">
            Demand, service type, enrollment conversion, and most requested courses/batches
          </p>
        </div>
      </div>

      {/* Monthly trend + type distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly trend */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Monthly consultancy requests</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {monthlyTrend.length === 0 ? (
              <EmptyAnalytics text="No consultancy trend data available." />
            ) : (
              monthlyTrend.map((item) => {
                const maxCount =
                  Math.max(
                    ...monthlyTrend.map((trend) => trend.count),
                  ) || 1;

                const percentage = calculatePercentage(item.count, maxCount);

                return (
                  <div key={item.month}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        {formatMonth(item.month)}
                      </span>

                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
                        {item.count} requests
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-indigo-50 dark:bg-indigo-950/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Type distribution */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Consultancy type</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {typeDistribution.length === 0 ? (
              <EmptyAnalytics text="No consultancy type data available." />
            ) : (
              typeDistribution.map((item) => {
                const isOnline = item._id.toLowerCase() === "online";

                return (
                  <DistributionRow
                    key={item._id}
                    label={item._id}
                    count={item.count}
                    percentage={item.percentage}
                    icon={isOnline ? Laptop : MapPin}
                    iconClassName={
                      isOnline
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                    }
                    barClassName={
                      isOnline ? "bg-blue-500" : "bg-emerald-500"
                    }
                  />
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enrollment status */}
      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">Enrollment status</CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <EnrollmentMetric
              label="Enrolled"
              value={enrollmentStatus.enrolled}
              icon={CheckCircle2}
              className="border-emerald-100 bg-emerald-50/40 dark:border-emerald-800/40 dark:bg-emerald-950/20"
              iconClassName="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
            />

            <EnrollmentMetric
              label="Not enrolled"
              value={enrollmentStatus.notEnrolled}
              icon={Users}
              className="border-amber-100 bg-amber-50/40 dark:border-amber-800/40 dark:bg-amber-950/20"
              iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
            />

            <EnrollmentMetric
              label="Enrollment rate"
              value={`${formatPercentage(
                enrollmentStatus.enrolledPercentage,
              )}`}
              icon={CheckCircle2}
              className="border-blue-100 bg-blue-50/40 dark:border-blue-800/40 dark:bg-blue-950/20"
              iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Top requested courses + batches */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Courses */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Top requested courses</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            {topRequestedCourses.length === 0 ? (
              <EmptyAnalytics text="No requested course data available." />
            ) : (
              topRequestedCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/40 dark:border-blue-800/40 dark:bg-blue-950/20 p-4 transition-all hover:bg-blue-50/60 dark:hover:bg-blue-950/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-sm">
                        {course.courseName}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Consultancy requests
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 font-bold text-blue-700 dark:text-blue-400">
                    {course.requestCount}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Batches */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Top requested batches</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            {topRequestedBatches.length === 0 ? (
              <EmptyAnalytics text="No requested batch data available." />
            ) : (
              topRequestedBatches.map((batch) => (
                <div
                  key={batch._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-violet-100 bg-violet-50/40 dark:border-violet-800/40 dark:bg-violet-950/20 p-4 transition-all hover:bg-violet-50/60 dark:hover:bg-violet-950/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-sm">
                        {batch.batchName}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Consultancy requests
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 font-bold text-violet-700 dark:text-violet-400">
                    {batch.requestCount}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DistributionRow({
  label,
  count,
  percentage,
  icon: Icon,
  iconClassName,
  barClassName,
}: {
  label: string;
  count: number;
  percentage: number;
  icon: React.ElementType;
  iconClassName: string;
  barClassName: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium">{label}</p>

            <p className="text-xs text-muted-foreground">
              {count} requests
            </p>
          </div>
        </div>

        <span className="text-sm font-semibold">
          {formatPercentage(percentage)}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barClassName}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function EnrollmentMetric({
  label,
  value,
  icon: Icon,
  className,
  iconClassName,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`}>
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-bold">
        {typeof value === "number" ? formatNumber(value) : value}
      </p>
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
