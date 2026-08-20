"use client";

import { cn } from "@/lib/utils";

export function UmrahHajjDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 sm:p-8">
        <div className="relative space-y-3">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-9 w-56 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiSkeleton />
        <KpiSkeleton />
        <KpiSkeleton />
        <KpiSkeleton />
      </section>

      {/* Application + payment status */}
      <section className="grid gap-6 lg:grid-cols-2">
        <StatusCardSkeleton />
        <StatusCardSkeleton />
      </section>

      {/* Gender + packages */}
      <section className="grid gap-6 lg:grid-cols-2">
        <GenderSkeleton />
        <PackagesSkeleton />
      </section>

      {/* Monthly trend */}
      <section>
        <CardSkeleton className="h-[300px]" />
      </section>

      {/* Recent bookings */}
      <section>
        <RecentBookingsSkeleton />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Base skeleton                                                              */
/* -------------------------------------------------------------------------- */

function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* KPI                                                                        */
/* -------------------------------------------------------------------------- */

function KpiSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      <Skeleton className="mt-6 h-9 w-24 rounded-lg" />

      <Skeleton className="mt-2 h-3 w-36" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status cards                                                               */
/* -------------------------------------------------------------------------- */

function StatusCardSkeleton() {
  return (
    <CardSkeleton className="min-h-[300px]">
      <div className="space-y-7">
        <Skeleton className="h-5 w-36" />

        <StatusRowSkeleton
          labelWidth="w-16"
          valueWidth="w-12"
          bar="w-[65%]"
        />

        <StatusRowSkeleton
          labelWidth="w-20"
          valueWidth="w-12"
          bar="w-[42%]"
        />

        <StatusRowSkeleton
          labelWidth="w-16"
          valueWidth="w-12"
          bar="w-[24%]"
        />
      </div>
    </CardSkeleton>
  );
}

function StatusRowSkeleton({
  labelWidth,
  valueWidth,
  bar,
}: {
  labelWidth: string;
  valueWidth: string;
  bar: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl" />

          <Skeleton
            className={cn(
              "h-3.5",
              labelWidth,
            )}
          />
        </div>

        <Skeleton
          className={cn(
            "h-3.5",
            valueWidth,
          )}
        />
      </div>

      <Skeleton
        className={cn(
          "h-2 rounded-full",
          bar,
        )}
      />

      <Skeleton className="mt-2 ml-auto h-3 w-10" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gender                                                                     */
/* -------------------------------------------------------------------------- */

function GenderSkeleton() {
  return (
    <CardSkeleton className="min-h-[250px]">
      <Skeleton className="h-5 w-40" />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-5">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-5 h-3 w-12" />
          <Skeleton className="mt-2 h-7 w-10" />
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/30 p-5">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-5 h-3 w-14" />
          <Skeleton className="mt-2 h-7 w-10" />
        </div>
      </div>
    </CardSkeleton>
  );
}

/* -------------------------------------------------------------------------- */
/* Packages                                                                   */
/* -------------------------------------------------------------------------- */

function PackagesSkeleton() {
  return (
    <CardSkeleton className="min-h-[250px]">
      <Skeleton className="h-5 w-32" />

      <div className="mt-6 space-y-3">
        <PackageRowSkeleton />
        <PackageRowSkeleton />
        <PackageRowSkeleton />
      </div>
    </CardSkeleton>
  );
}

function PackageRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

        <div className="min-w-0 space-y-2">
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <Skeleton className="h-4 w-24" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

function CardSkeleton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-background p-6",
        className,
      )}
    >
      {children ?? (
        <div className="h-full w-full animate-pulse rounded-xl bg-muted/70" />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Recent bookings                                                            */
/* -------------------------------------------------------------------------- */

function RecentBookingsSkeleton() {
  return (
    <CardSkeleton className="min-h-[400px]">
      <Skeleton className="h-5 w-40" />

      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-2xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

              <div className="min-w-0 space-y-2">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </CardSkeleton>
  );
}