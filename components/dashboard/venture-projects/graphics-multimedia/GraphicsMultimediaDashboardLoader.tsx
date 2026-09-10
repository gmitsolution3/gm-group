"use client";

export default function GraphicsMultimediaDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-9 w-80 max-w-full animate-pulse rounded-lg bg-muted" />
        <div className="mt-3 h-5 w-[34rem] max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border bg-card p-5"
          >
            <div className="absolute right-5 top-5 h-10 w-10 animate-pulse rounded-xl bg-muted" />
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-5 h-9 w-24 animate-pulse rounded-lg bg-muted" />
            <div className="mt-3 h-3 w-36 animate-pulse rounded bg-muted/70" />
          </div>
        ))}
      </div>

      {/* Today's Activity */}
      <div className="rounded-xl border bg-card p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl border bg-card p-5">
              <div className="absolute right-5 top-5 h-10 w-10 animate-pulse rounded-xl bg-muted" />
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="mt-5 h-9 w-24 animate-pulse rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-6">
            <div className="h-5 w-36 animate-pulse rounded bg-muted" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
