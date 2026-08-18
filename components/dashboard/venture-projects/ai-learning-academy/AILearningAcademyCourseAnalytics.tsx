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
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Course analytics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Course status, difficulty, categories, pricing, and
          content structure.
        </p>
      </div>

      {/* Status + Level */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course status */}
        <Card>
          <CardHeader>
            <CardTitle>Course status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
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
        <Card>
          <CardHeader>
            <CardTitle>Course level</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
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
        <Card>
          <CardHeader>
            <CardTitle>Course categories</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {categoryDistribution.length === 0 ? (
              <EmptyAnalytics text="No category data available." />
            ) : (
              categoryDistribution.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {item.categoryName}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.count} courses
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 font-semibold text-blue-700">
                      {formatPercentage(item.percentage)}
                    </p>
                  </div>

                  <ProgressBar
                    percentage={item.percentage}
                    className="bg-blue-500"
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing analytics</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Avg. regular price"
                value={formatCurrency(
                  pricingAnalytics.averageRegularPrice,
                )}
                icon={DollarSign}
                className="border-emerald-100 bg-emerald-50/40 text-emerald-700"
                iconClassName="bg-emerald-100 text-emerald-600"
              />

              <MetricCard
                label="Avg. discount price"
                value={formatCurrency(
                  pricingAnalytics.averageDiscountPrice,
                )}
                icon={BadgePercent}
                className="border-violet-100 bg-violet-50/40 text-violet-700"
                iconClassName="bg-violet-100 text-violet-600"
              />

              <MetricCard
                label="Avg. discount"
                value={`${pricingAnalytics.averageDiscountPercentage}%`}
                icon={TrendingUp}
                className="border-amber-100 bg-amber-50/40 text-amber-700"
                iconClassName="bg-amber-100 text-amber-600"
              />

              <MetricCard
                label="Courses with discount"
                value={`${pricingAnalytics.coursesWithDiscount}/${pricingAnalytics.totalCourses}`}
                icon={BookOpen}
                className="border-blue-100 bg-blue-50/40 text-blue-700"
                iconClassName="bg-blue-100 text-blue-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top courses by content</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {topCoursesByModules.length === 0 ? (
            <EmptyAnalytics text="No course data available." />
          ) : (
            topCoursesByModules.map((course) => (
              <div
                key={course.courseId}
                className="flex flex-col gap-4 rounded-2xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {course.courseName}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">
                        {course.moduleCount} modules
                      </Badge>

                      <Badge variant="outline">
                        {course.lessonCount} lessons
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-sm font-semibold">
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

function formatLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatPercentage(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}