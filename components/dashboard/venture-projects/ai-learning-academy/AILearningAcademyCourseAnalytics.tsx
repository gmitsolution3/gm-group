"use client";

import {
  BadgePercent,
  BookOpen,
  DollarSign,
  Layers3,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AILearningDashboardData } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatLabel, formatPercentage } from "../utils";

interface AILearningAcademyCourseAnalyticsProps {
  courses: AILearningDashboardData["courses"];
}

export default function AILearningAcademyCourseAnalytics({
  courses,
}: AILearningAcademyCourseAnalyticsProps) {
  const {
    statusDistribution,
    levelDistribution,
    categoryDistribution,
    pricingAnalytics,
    topCoursesByModules,
  } = courses;

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Course Analytics
          </h2>
          <p className="text-xs text-muted-foreground">
            Status, difficulty, categories, pricing, and content structure
          </p>
        </div>
      </div>

      {/* Status + Level */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course status */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Course status</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-4">
            {statusDistribution.map((item) => (
              <DistributionRow
                key={item._id}
                label={formatLabel(item._id)}
                count={item.count}
                percentage={item.percentage}
              />
            ))}
          </CardContent>
        </Card>

        {/* Course level */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Course level</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-4">
            {levelDistribution.map((item) => (
              <DistributionRow
                key={item._id}
                label={formatLabel(item._id)}
                count={item.count}
                percentage={item.percentage}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Categories + Pricing */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Categories */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Course categories</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-4">
            {categoryDistribution.length === 0 ? (
              <EmptyAnalytics text="No category data available." />
            ) : (
              categoryDistribution.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-blue-100 bg-blue-50/40 dark:border-blue-800/40 dark:bg-blue-950/20 p-4 transition-all hover:bg-blue-50/60 dark:hover:bg-blue-950/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-sm">
                          {item.categoryName}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.count} courses
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 font-bold text-blue-700 dark:text-blue-400">
                      {formatPercentage(item.percentage)}
                    </p>
                  </div>

                  <ProgressBar
                    percentage={item.percentage}
                    className="bg-blue-500 mt-3"
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Pricing analytics</CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Avg. regular price"
                value={formatCurrency(
                  pricingAnalytics.averageRegularPrice,
                  "BDT",
                )}
                icon={DollarSign}
                className="border-emerald-100 bg-emerald-50/40 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-400"
                iconClassName="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
              />

              <MetricCard
                label="Avg. discount price"
                value={formatCurrency(
                  pricingAnalytics.averageDiscountPrice,
                  "BDT",
                )}
                icon={BadgePercent}
                className="border-violet-100 bg-violet-50/40 text-violet-700 dark:border-violet-800/40 dark:bg-violet-950/20 dark:text-violet-400"
                iconClassName="bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
              />

              <MetricCard
                label="Avg. discount"
                value={`${pricingAnalytics.averageDiscountPercentage}%`}
                icon={TrendingUp}
                className="border-amber-100 bg-amber-50/40 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-400"
                iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
              />

              <MetricCard
                label="Courses with discount"
                value={`${pricingAnalytics.coursesWithDiscount}/${pricingAnalytics.totalCourses}`}
                icon={BookOpen}
                className="border-blue-100 bg-blue-50/40 text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/20 dark:text-blue-400"
                iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top courses */}
      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">Top courses by content</CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-3">
          {topCoursesByModules.length === 0 ? (
            <EmptyAnalytics text="No course data available." />
          ) : (
            topCoursesByModules.map((course) => (
              <div
                key={course.courseId}
                className="flex flex-col gap-4 rounded-xl border border-border/60 p-4 transition-all hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-sm">
                      {course.courseName}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        {course.moduleCount} modules
                      </Badge>

                      <Badge variant="outline" className="text-xs font-medium">
                        {course.lessonCount} lessons
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-sm font-bold">
                    {course.totalDuration} min
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Total duration
                  </p>
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
}: {
  label: string;
  count: number;
  percentage: number;
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

      <ProgressBar percentage={percentage} />
    </div>
  );
}

function ProgressBar({
  percentage,
  className = "bg-indigo-500",
}: {
  percentage: number;
  className?: string;
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full transition-all ${className}`}
        style={{
          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
        }}
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  className,
  iconClassName,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-xl font-bold">{value}</p>
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
