"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function AccountAnalysisDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <Skeleton className="h-4 w-20 rounded-full" />

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-10 w-64 rounded-xl" />

              <Skeleton className="h-5 w-[420px] max-w-full rounded-lg" />
            </div>

            <Skeleton className="h-9 w-72 rounded-full" />
          </div>
        </section>

        {/* Financial overview */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-8 w-36 rounded-lg" />
                </div>

                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>

              <Skeleton className="mt-3 h-3 w-32 rounded-md" />
            </div>
          ))}
        </section>

        {/* Due analysis */}
        <section className="rounded-2xl border border-border/60 bg-background p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-4 w-80 max-w-full rounded-md" />
            </div>

            <Skeleton className="h-11 w-11 rounded-xl" />
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>

              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            <Skeleton className="h-20 w-44 rounded-2xl" />
          </div>
        </section>

        {/* Service breakdown */}
        <section className="rounded-2xl border border-border/60 bg-background p-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/50 p-5"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-4 w-10 rounded-md" />
                </div>

                <Skeleton className="mt-5 h-4 w-20 rounded-md" />
                <Skeleton className="mt-2 h-7 w-28 rounded-lg" />

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-14 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>

                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-14 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>

                <Skeleton className="mt-5 h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Monthly trend */}
        <section className="rounded-2xl border border-border/60 bg-background p-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-44 rounded-md" />
            <Skeleton className="h-4 w-96 max-w-full rounded-md" />
          </div>

          <div className="mt-7 space-y-7">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <div className="mb-4 flex justify-between">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>

                <div className="space-y-3">
                  {Array.from({ length: 3 }).map(
                    (_, barIndex) => (
                      <div
                        key={barIndex}
                        className="flex items-center gap-3"
                      >
                        <Skeleton className="h-3 w-16 rounded-md" />

                        <Skeleton className="h-2 flex-1 rounded-full" />

                        <Skeleton className="h-3 w-24 rounded-md" />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Branch + account holders */}
        <section className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-52 rounded-md" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {Array.from({ length: 2 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-border/50 p-4"
                    >
                      <div className="flex justify-between gap-4">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Skeleton className="h-14 rounded-xl" />
                        <Skeleton className="h-14 rounded-xl" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Record distribution */}
        <section className="rounded-2xl border border-border/60 bg-background p-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-4 w-72 max-w-full rounded-md" />
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <Skeleton className="mb-4 h-4 w-20 rounded-md" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-24 rounded-2xl"
                    />
                  ),
                )}
              </div>
            </div>

            <div>
              <Skeleton className="mb-4 h-4 w-20 rounded-md" />

              <div className="space-y-3">
                {Array.from({ length: 2 }).map(
                  (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-14 rounded-xl"
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Missing documents */}
        <section className="rounded-2xl border border-border/60 bg-background p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-4 w-64 max-w-full rounded-md" />
            </div>
          </div>

          <Skeleton className="mt-6 h-20 w-full rounded-2xl" />
        </section>
      </div>
    </div>
  );
}