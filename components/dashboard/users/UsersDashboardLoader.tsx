"use client";

export default function UsersDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-9 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      {/* User list */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="h-6 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-36 animate-pulse rounded bg-muted" />
          </div>

          <div className="h-10 w-72 animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border">
          <div className="h-12 animate-pulse bg-muted/40" />

          <div className="divide-y">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4"
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-48 animate-pulse rounded bg-muted" />
                </div>

                <div className="hidden h-6 w-20 animate-pulse rounded-full bg-muted sm:block" />
                <div className="hidden h-6 w-20 animate-pulse rounded-full bg-muted sm:block" />
                <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
