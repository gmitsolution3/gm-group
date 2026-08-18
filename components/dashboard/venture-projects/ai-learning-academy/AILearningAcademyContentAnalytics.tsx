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
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Content analytics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Learning content composition, lesson duration, and module
          structure.
        </p>
      </div>

      {/* Content type + Duration overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content type */}
        <Card>
          <CardHeader>
            <CardTitle>Content types</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
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
        <Card>
          <CardHeader>
            <CardTitle>Lesson duration</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Total duration"
                value={`${durationAnalytics.totalDuration} min`}
                icon={Clock3}
                className="border-blue-100 bg-blue-50/40"
                iconClassName="bg-blue-100 text-blue-600"
              />

              <MetricCard
                label="Average lesson"
                value={`${durationAnalytics.averageLessonDuration} min`}
                icon={Timer}
                className="border-violet-100 bg-violet-50/40"
                iconClassName="bg-violet-100 text-violet-600"
              />

              <MetricCard
                label="Longest lesson"
                value={`${durationAnalytics.longestLesson} min`}
                icon={PlayCircle}
                className="border-emerald-100 bg-emerald-50/40"
                iconClassName="bg-emerald-100 text-emerald-600"
              />

              <MetricCard
                label="Shortest lesson"
                value={`${durationAnalytics.shortestLesson} min`}
                icon={Clock3}
                className="border-amber-100 bg-amber-50/40"
                iconClassName="bg-amber-100 text-amber-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Duration distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson duration distribution</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
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

                  <span className="text-sm font-semibold text-indigo-700">
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
      <Card>
        <CardHeader>
          <CardTitle>Module analytics</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Average lessons per module"
              value={formatNumber(
                moduleAnalytics.averageLessonsPerModule,
              )}
              icon={Layers3}
              className="border-teal-100 bg-teal-50/40"
              iconClassName="bg-teal-100 text-teal-600"
            />

            <MetricCard
              label="Average duration per module"
              value={`${formatNumber(moduleAnalytics.averageDurationPerModule)} min`}
              icon={Clock3}
              className="border-indigo-100 bg-indigo-50/40"
              iconClassName="bg-indigo-100 text-indigo-600"
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
              {count.toLocaleString()} items
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

function formatLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatPercentage(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`;
}

function formatNumber(value: number) {
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toFixed(2);
}
