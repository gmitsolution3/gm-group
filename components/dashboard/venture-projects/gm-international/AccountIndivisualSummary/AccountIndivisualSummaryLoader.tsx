"use client";

export function AccountIndivisualSummaryLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-9 w-72 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-5 w-[28rem] max-w-full animate-pulse rounded bg-muted" />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />

              <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
            </div>

            <div className="mt-5 h-8 w-28 animate-pulse rounded bg-muted" />

            <div className="mt-2 h-3 w-32 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Service/account overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-card p-6"
          >
            <div className="h-6 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                    <div>
                      <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                      <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted" />
                    </div>
                  </div>

                  <div className="h-5 w-20 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Account tables */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />

              <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
            </div>

            <div className="h-9 w-24 animate-pulse rounded-xl bg-muted" />
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border">
            <div className="grid grid-cols-5 gap-4 border-b bg-muted/40 p-4">
              {Array.from({ length: 5 }).map((_, columnIndex) => (
                <div
                  key={columnIndex}
                  className="h-3 animate-pulse rounded bg-muted"
                />
              ))}
            </div>

            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-5 items-center gap-4 p-4"
                >
                  {Array.from({ length: 5 }).map((_, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={`h-4 animate-pulse rounded bg-muted ${
                        columnIndex === 0 ? "w-32" : "w-20"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}