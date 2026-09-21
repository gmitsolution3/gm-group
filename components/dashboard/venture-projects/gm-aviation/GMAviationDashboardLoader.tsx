"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GMAviationDashboardLoader() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
        {/* Venture Header Skeleton */}
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
            <div className="space-y-2.5">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-8 w-64 rounded-lg" />
              <Skeleton className="h-4 w-96 max-w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Dashboard Title Bar Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-72 rounded-lg" />
            <Skeleton className="h-4 w-96 max-w-full rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-32 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
          </div>
        </div>

        {/* Top 3 KPI Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 w-3/4">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-8 w-32 rounded-md" />
                  <Skeleton className="h-3.5 w-40 rounded" />
                </div>
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Sections Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Courses Skeleton */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border/60 p-3.5 space-y-2">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-6 w-12 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions Skeleton */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border/60 p-3.5 space-y-2">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-6 w-12 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollments Skeleton */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border/60 p-3.5 space-y-2">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-6 w-12 rounded" />
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
