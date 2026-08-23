"use client";

export default function VenturesTableLoader() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      {/* Desktop table loader */}
      <div className="hidden md:block">
        <div className="border-b bg-muted/50 px-4 py-3">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        </div>

        <div className="divide-y">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 items-center gap-4 px-4 py-4"
            >
              {/* Venture */}
              <div className="col-span-1 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>

              {/* Industry */}
              <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />

              {/* Established */}
              <div className="h-3.5 w-14 animate-pulse rounded bg-muted" />

              {/* Featured */}
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

              {/* Website */}
              <div className="h-3.5 w-14 animate-pulse rounded bg-muted" />

              {/* Updated */}
              <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />

              {/* Actions */}
              <div className="ml-auto h-8 w-8 animate-pulse rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile loader */}
      <div className="space-y-3 p-0 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/70 bg-card p-4"
          >
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-3 w-28 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

              <div className="h-4 w-14 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}