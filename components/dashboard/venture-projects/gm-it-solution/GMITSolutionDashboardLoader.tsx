"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GMITSolutionDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        <section>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-10 w-64" />
          <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
        </section>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-9 w-24 shrink-0 rounded-full"
            />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-32 rounded-2xl"
            />
          ))}
        </div>

        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}