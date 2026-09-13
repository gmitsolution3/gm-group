"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GMLogisticDashboardLoader() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-5 w-48 rounded-lg" />
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="mt-3 h-8 w-16 rounded-lg" />
              <Skeleton className="mt-2 h-4 w-24 rounded-md" />
            </div>
          ))}
        </div>

        {/* Bottom cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <Skeleton className="h-7 w-40 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-muted/50 p-3 space-y-2">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <Skeleton className="h-7 w-32 rounded-lg" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-10 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
