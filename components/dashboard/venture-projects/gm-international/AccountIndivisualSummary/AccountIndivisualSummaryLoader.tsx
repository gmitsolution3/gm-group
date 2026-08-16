"use client";

export function AccountIndivisualSummaryLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-9 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-2xl bg-muted"
        />
      ))}
    </div>
  );
}