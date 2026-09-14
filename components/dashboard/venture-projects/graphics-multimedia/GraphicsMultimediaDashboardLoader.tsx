"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GraphicsMultimediaDashboardLoader() {
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

        {/* Top 4 KPI Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
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

        {/* Main Analytics Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* Business Performance Card Skeleton */}
            <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-56 rounded-md" />
                  <Skeleton className="h-3.5 w-72 rounded" />
                </div>
                <Skeleton className="h-6 w-24 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl bg-muted/20 p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-6 w-24 rounded" />
                  </div>
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-12 items-center pt-2">
                <div className="md:col-span-5 flex justify-center">
                  <Skeleton className="h-44 w-44 rounded-full" />
                </div>
                <div className="md:col-span-7 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-border/60 p-3.5 space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-28 rounded" />
                        <Skeleton className="h-4 w-12 rounded" />
                      </div>
                      <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Catalog & Jobs Grid Skeleton */}
            <div className="grid gap-6 md:grid-cols-2">
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

              <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
                <div className="flex justify-between border-b border-border/60 pb-3">
                  <Skeleton className="h-5 w-36 rounded" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>
                <Skeleton className="h-14 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-14 rounded-xl" />
              <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
              <Skeleton className="h-5 w-32 rounded" />
              <div className="space-y-2.5 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3.5 w-28 rounded" />
                    <Skeleton className="h-3.5 w-10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Sections Skeleton */}
        <div className="space-y-6">
          {/* Recent Bookings Skeleton */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
            <div className="flex justify-between border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36 rounded" />
                      <Skeleton className="h-3 w-48 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right">
                    <Skeleton className="h-4 w-20 rounded ml-auto" />
                    <Skeleton className="h-3 w-16 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Influencer Bookings Skeleton */}
          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
            <div className="flex justify-between border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-52 rounded" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-36 rounded" />
                      <Skeleton className="h-3 w-48 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right">
                    <Skeleton className="h-4 w-20 rounded ml-auto" />
                    <Skeleton className="h-3 w-16 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid Skeleton (2 cols) */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3.5 w-28 rounded" />
                        <Skeleton className="h-3 w-40 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-4">
              <div className="flex justify-between border-b border-border/60 pb-3">
                <Skeleton className="h-5 w-44 rounded" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3.5 w-28 rounded" />
                        <Skeleton className="h-3 w-40 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16 rounded-lg" />
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
