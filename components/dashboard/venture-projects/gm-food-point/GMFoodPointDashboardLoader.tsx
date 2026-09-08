"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function GMFoodPointDashboardLoader() {
  return (
    <div className="w-full">
      <div className="mx-auto !max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="mt-2 h-5 w-48 rounded-lg" />
        </div>

        {/* Tabs */}
        <section className="mb-8">
          <div className="rounded-2xl border border-border/70 bg-card p-2">
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 rounded-xl"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Content */}
        <div className="pt-8">
          <div className="rounded-xl border border-border p-6">
            {/* Orders Stats */}
            <div className="mb-8">
              <Skeleton className="mb-6 h-7 w-40 rounded-lg" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-lg" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payments Stats */}
            <div className="mb-8">
              <Skeleton className="mb-6 h-7 w-40 rounded-lg" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 1 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-lg" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Stats */}
            <div>
              <Skeleton className="mb-6 h-7 w-40 rounded-lg" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-lg" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}