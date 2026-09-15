"use client";

import {
  Clock3,
  FileText,
  Layers3,
  PlayCircle,
  Timer,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AILearningDashboardData } from "@/types";
import { formatLabel, formatNumber, formatPercentage } from "../utils";

interface AILearningAcademyContentAnalyticsProps {
  content: AILearningDashboardData["content"];
}

export default function AILearningAcademyContentAnalytics({
  content,
}: AILearningAcademyContentAnalyticsProps) {
  const {
    contentTypeDistribution,
    durationAnalytics,
    moduleAnalytics,
  } = content;

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal-600 dark:text-teal-400">
          <Layers3 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Content Analytics
          </h2>
          <p className="text-xs text-muted-foreground">
            Content composition, lesson duration, and module structure
          </p>
        </div>
      </div>

      {/* Content type + Duration overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content type */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Content types</CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            {contentTypeDistribution.length === 0 ? (
              <EmptyAnalytics text="No content type data available." />
            ) : (
              contentTypeDistribution.map((item) => (
                <ContentTypeRow
                  key={item._id}
                  type={item._id}
                  count={item.count}
                  percentage={item.percentage}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Duration overview */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">Lesson duration</CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Total duration"
                value={`${durationAnalytics.totalDuration} min`}
                icon={Clock3}
                className="border-blue-100 bg-blue-50/40 dark:border-blue-800/40 dark:bg-blue-950/20"
                iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
              />

              <MetricCard
                label="Average lesson"
                value={`${durationAnalytics.averageLessonDuration} min`}
                icon={Timer}
                className="border-violet-100 bg-violet-50/40 dark:border-violet-800/40 dark:bg-violet-950/20"
                iconClassName="bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
              />

              <MetricCard
                label="Longest lesson"
                value={`${durationAnalytics.longestLesson} min`}
                icon={PlayCircle}
                className="border-emerald-100 bg-emerald-50/40 dark:border-emerald-800/40 dark:bg-emerald-950/20"
                iconClassName="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
              />

              <MetricCard
                label="Shortest lesson"
                value={`${durationAnalytics.shortestLesson} min`}
                icon={Clock3}
                className="border-amber-100 bg-amber-50/40 dark:border-amber-800/40 dark:bg-amber-950/20"
                iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Duration distribution */}
      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">Lesson duration distribution</CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-5">
          {durationAnalytics.durationDistribution.length === 0 ? (
            <EmptyAnalytics text="No duration distribution data available." />
          ) : (
            durationAnalytics.durationDistribution.map((item) => (
              <div key={item.range}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {item.range}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {item.count} lessons
                    </span>
                  </div>

                  <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
                    {formatPercentage(item.percentage)}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{
                      width: `${Math.min(
                        Math.max(item.percentage, 0),
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Module analytics */}
      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">Module analytics</CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Average lessons per module"
              value={formatNumber(
                moduleAnalytics.averageLessonsPerModule,
              )}
              icon={Layers3}
              className="border-teal-100 bg-teal-50/40 dark:border-teal-800/40 dark:bg-teal-950/20"
              iconClassName="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
            />

            <MetricCard
              label="Average duration per module"
              value={`${formatNumber(moduleAnalytics.averageDurationPerModule)} min`}
              icon={Clock3}
              className="border-indigo-100 bg-indigo-50/40 dark:border-indigo-800/40 dark:bg-indigo-950/20"
              iconClassName="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContentTypeRow({
  type,
  count,
  percentage,
}: {
  type: string;
  count: number;
  percentage: number;
}) {
  const Icon = getContentTypeIcon(type);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium">{formatLabel(type)}</p>

            <p className="text-xs text-muted-foreground">
              {formatNumber(count)} items
            </p>
          </div>
        </div>

        <span className="text-sm font-semibold">
          {formatPercentage(percentage)}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
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

function getContentTypeIcon(type: string) {
  switch (type.toLowerCase()) {
    case "video":
      return PlayCircle;

    case "text":
      return FileText;

    case "quiz":
      return Layers3;

    default:
      return FileText;
  }
}
