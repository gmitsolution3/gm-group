"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GMITSolutionDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Dashboard Header */}
        <section>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 rounded-full" />

              <Skeleton className="h-10 w-56 rounded-xl" />

              <Skeleton className="h-5 w-full max-w-2xl rounded-lg" />
            </div>

            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </section>

        {/* Analytics Tabs */}
        <section className="overflow-x-auto">
          <div className="inline-flex min-w-max gap-1 rounded-2xl border border-border/70 bg-muted/30 p-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-24 rounded-xl"
              />
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-none">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-3 w-12 rounded-md" />
                <Skeleton className="h-10 w-full min-w-[200px] rounded-xl" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-10 rounded-md" />
                <Skeleton className="h-10 w-full min-w-[200px] rounded-xl" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-20 rounded-full" />
              <Skeleton className="h-10 w-20 rounded-full" />
            </div>
          </div>
        </section>

        {/* Analytics Content */}

        {/* KPI Section */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/60 bg-card p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>

                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics Cards */}
        <section className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
              </div>

              <div className="mt-6 space-y-4">
                {Array.from({ length: 4 }).map(
                  (_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between gap-4"
                    >
                      <Skeleton className="h-4 w-32 rounded-md" />
                      <Skeleton className="h-4 w-12 rounded-md" />
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Recent Data */}
        <section className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="mt-6 space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />

            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-14 w-full rounded-xl"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}