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
      className={`animate-pulse rounded-xl bg-muted/70 ${className}`}
    />
  );
}

function ServiceSkeleton({
  icon: Icon,
  iconClassName,
  cardClassName,
}: {
  icon: React.ElementType;
  iconClassName: string;
  cardClassName: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${cardClassName}`}
    >
      {/* shimmer */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5 opacity-70" />
        </div>

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

function OverviewSkeleton({
  icon: Icon,
  iconClassName,
}: {
  icon: React.ElementType;
  iconClassName: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-9 w-20" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5 opacity-60" />
        </div>
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
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="border-b p-5">
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
            className="flex items-center justify-between gap-4 rounded-xl border p-4"
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
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative space-y-8 p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1440px] space-y-8">
          {/* Header */}
          <section>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Activity className="h-3.5 w-3.5" />
              </div>

              <Skeleton className="h-3 w-28" />
            </div>

            <Skeleton className="mt-4 h-10 w-64 rounded-xl sm:h-12" />

            <Skeleton className="mt-4 h-4 w-full max-w-xl" />
            <Skeleton className="mt-2 h-4 w-80 max-w-full" />
          </section>

          {/* Loading indicator */}
          <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-indigo-950">
                Loading service intelligence
              </p>

              <p className="mt-0.5 text-xs text-indigo-700/70">
                Gathering the latest GM International activity...
              </p>
            </div>
          </div>

          {/* Overview */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewSkeleton
              icon={FileText}
              iconClassName="bg-blue-100 text-blue-600"
            />

            <OverviewSkeleton
              icon={Plane}
              iconClassName="bg-cyan-100 text-cyan-600"
            />

            <OverviewSkeleton
              icon={Activity}
              iconClassName="bg-emerald-100 text-emerald-600"
            />

            <OverviewSkeleton
              icon={TrendingUp}
              iconClassName="bg-amber-100 text-amber-600"
            />
          </section>

          {/* Service overview */}
          <section>
            <div className="mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-72 max-w-full" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ServiceSkeleton
                icon={GraduationCap}
                iconClassName="bg-blue-100 text-blue-600"
                cardClassName="border-blue-100 bg-blue-50/30"
              />

              <ServiceSkeleton
                icon={HeartPulse}
                iconClassName="bg-rose-100 text-rose-600"
                cardClassName="border-rose-100 bg-rose-50/30"
              />

              <ServiceSkeleton
                icon={Plane}
                iconClassName="bg-cyan-100 text-cyan-600"
                cardClassName="border-cyan-100 bg-cyan-50/30"
              />

              <ServiceSkeleton
                icon={BriefcaseBusiness}
                iconClassName="bg-violet-100 text-violet-600"
                cardClassName="border-violet-100 bg-violet-50/30"
              />
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
          <section className="rounded-2xl border bg-card p-5 shadow-sm">
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
                  <div
                    key={index}
                    className="flex-1 rounded-t-lg bg-muted/60 animate-pulse"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Local animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}