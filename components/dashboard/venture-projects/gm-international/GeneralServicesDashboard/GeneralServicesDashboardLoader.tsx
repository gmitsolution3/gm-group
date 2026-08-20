"use client";

import {
  Activity,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  HeartPulse,
  Plane,
  TrendingUp,
} from "lucide-react";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-muted ${className}`}
    />
  );
}

function ServiceSkeleton({
  icon: Icon,
}: {
  icon: React.ElementType;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>

      <Skeleton className="mt-5 h-5 w-24" />
      <Skeleton className="mt-2 h-3 w-40" />

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-9 w-20" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>

        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

function ContentSkeleton({
  rows = 4,
}: {
  rows?: number;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/70 p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl border border-border/60 p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />

              <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-44 max-w-full" />
              </div>
            </div>

            <Skeleton className="h-5 w-10 shrink-0 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GeneralServicesDashboardLoader() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative space-y-8 p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1440px] space-y-8">
          {/* Header */}
          <section>
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-3 w-28" />
            </div>

            <Skeleton className="mt-4 h-10 w-64 rounded-xl sm:h-12" />

            <Skeleton className="mt-4 h-4 w-full max-w-xl" />
            <Skeleton className="mt-2 h-4 w-80 max-w-full" />
          </section>

          {/* Loading indicator */}
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-3">
            <Skeleton className="h-8 w-8 rounded-full" />

            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-48" />
              <Skeleton className="h-3 w-64 max-w-[60vw]" />
            </div>
          </div>

          {/* Overview */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewSkeleton />
            <OverviewSkeleton />
            <OverviewSkeleton />
            <OverviewSkeleton />
          </section>

          {/* Service overview */}
          <section>
            <div className="mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ServiceSkeleton icon={GraduationCap} />
              <ServiceSkeleton icon={HeartPulse} />
              <ServiceSkeleton icon={Plane} />
              <ServiceSkeleton icon={BriefcaseBusiness} />
            </div>
          </section>

          {/* Main content skeletons */}
          <section className="grid gap-6 lg:grid-cols-2">
            <ContentSkeleton rows={4} />
            <ContentSkeleton rows={4} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <ContentSkeleton rows={3} />
            <ContentSkeleton rows={3} />
          </section>

          {/* Chart skeleton */}
          <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-60 max-w-full" />
              </div>
            </div>

            <div className="mt-8 flex h-52 items-end gap-3 px-2">
              {[42, 68, 50, 82, 60, 92, 72, 48, 76, 58, 88, 64].map(
                (height, index) => (
                  <Skeleton
                    key={index}
                    className="flex-1 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}