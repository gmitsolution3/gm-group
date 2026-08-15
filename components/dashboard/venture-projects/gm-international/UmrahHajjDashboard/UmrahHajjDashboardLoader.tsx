"use client";

import { cn } from "@/lib/utils";

export function UmrahHajjDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-indigo/[0.06] via-background to-background p-6 sm:p-8">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo/[0.06] blur-3xl" />

        <div className="relative space-y-3">
          <Skeleton className="h-3.5 w-20" />

          <Skeleton className="h-9 w-56 rounded-lg" />

          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiSkeleton accent="blue" />
        <KpiSkeleton accent="emerald" />
        <KpiSkeleton accent="amber" />
        <KpiSkeleton accent="violet" />
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
/* Base skeleton                                                             */
/* -------------------------------------------------------------------------- */

function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/70",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* KPI                                                                        */
/* -------------------------------------------------------------------------- */

function KpiSkeleton({
  accent,
}: {
  accent: "blue" | "emerald" | "amber" | "violet";
}) {
  const styles = {
    blue: {
      card: "border-blue-100/80 bg-gradient-to-br from-blue-50/70 to-background",
      icon: "bg-blue-100/80",
      title: "bg-blue-200/70",
      value: "bg-blue-200/70",
      description: "bg-blue-100/80",
    },

    emerald: {
      card: "border-emerald-100/80 bg-gradient-to-br from-emerald-50/70 to-background",
      icon: "bg-emerald-100/80",
      title: "bg-emerald-200/70",
      value: "bg-emerald-200/70",
      description: "bg-emerald-100/80",
    },

    amber: {
      card: "border-amber-100/80 bg-gradient-to-br from-amber-50/70 to-background",
      icon: "bg-amber-100/80",
      title: "bg-amber-200/70",
      value: "bg-amber-200/70",
      description: "bg-amber-100/80",
    },

    violet: {
      card: "border-violet-100/80 bg-gradient-to-br from-violet-50/70 to-background",
      icon: "bg-violet-100/80",
      title: "bg-violet-200/70",
      value: "bg-violet-200/70",
      description: "bg-violet-100/80",
    },
  };

  const style = styles[accent];

  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        style.card,
      )}
    >
      <div className="flex items-start justify-between">
        <Skeleton
          className={cn(
            "h-4 w-28",
            style.title,
          )}
        />

        <Skeleton
          className={cn(
            "h-10 w-10 rounded-xl",
            style.icon,
          )}
        />
      </div>

      <Skeleton
        className={cn(
          "mt-6 h-9 w-24 rounded-lg",
          style.value,
        )}
      />

      <Skeleton
        className={cn(
          "mt-2 h-3 w-36",
          style.description,
        )}
      />
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
          icon="amber"
          labelWidth="w-16"
          valueWidth="w-12"
          bar="w-[65%]"
        />

        <StatusRowSkeleton
          icon="emerald"
          labelWidth="w-20"
          valueWidth="w-12"
          bar="w-[42%]"
        />

        <StatusRowSkeleton
          icon="red"
          labelWidth="w-16"
          valueWidth="w-12"
          bar="w-[24%]"
        />
      </div>
    </CardSkeleton>
  );
}

function StatusRowSkeleton({
  icon,
  labelWidth,
  valueWidth,
  bar,
}: {
  icon: "amber" | "emerald" | "red";
  labelWidth: string;
  valueWidth: string;
  bar: string;
}) {
  const iconStyles = {
    amber: "bg-amber-100/80",
    emerald: "bg-emerald-100/80",
    red: "bg-red-100/80",
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton
            className={cn(
              "h-9 w-9 rounded-xl",
              iconStyles[icon],
            )}
          />

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
        <div className="rounded-2xl border border-blue-100/70 bg-blue-50/40 p-5">
          <Skeleton className="h-10 w-10 rounded-xl bg-blue-100/80" />

          <Skeleton className="mt-5 h-3 w-12 bg-blue-100/80" />

          <Skeleton className="mt-2 h-7 w-10 bg-blue-200/70" />
        </div>

        <div className="rounded-2xl border border-rose-100/70 bg-rose-50/40 p-5">
          <Skeleton className="h-10 w-10 rounded-xl bg-rose-100/80" />

          <Skeleton className="mt-5 h-3 w-14 bg-rose-100/80" />

          <Skeleton className="mt-2 h-7 w-10 bg-rose-200/70" />
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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-teal-100/70 bg-teal-50/30 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl bg-teal-100/80" />

        <div className="min-w-0 space-y-2">
          <Skeleton className="h-3.5 w-40 bg-teal-100/80" />
          <Skeleton className="h-3 w-20 bg-teal-100/70" />
        </div>
      </div>

      <Skeleton className="h-4 w-24 bg-teal-100/80" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Monthly trend                                                              */
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
        <div className="h-full w-full animate-pulse rounded-xl bg-muted/60" />
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
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl bg-violet-100/80" />

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
          ),
        )}
      </div>
    </CardSkeleton>
  );
}