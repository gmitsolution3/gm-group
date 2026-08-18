"use client";

export default function AILearningAcademyDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />

        <div className="mt-3 h-9 w-80 max-w-full animate-pulse rounded-lg bg-muted" />

        <div className="mt-3 h-5 w-[34rem] max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      {/* Period + overview */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
          <div className="h-3 w-48 animate-pulse rounded-md bg-muted/70" />
        </div>

        <div className="h-10 w-52 animate-pulse rounded-xl bg-muted" />
      </div>

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border bg-card p-5"
          >
            <div className="absolute right-5 top-5 h-10 w-10 animate-pulse rounded-xl bg-muted" />

            <div className="h-4 w-28 animate-pulse rounded bg-muted" />

            <div className="mt-5 h-9 w-24 animate-pulse rounded-lg bg-muted" />

            <div className="mt-3 h-3 w-36 animate-pulse rounded bg-muted/70" />

            <div className="mt-5 h-1.5 w-full animate-pulse rounded-full bg-muted/60" />
          </div>
        ))}
      </div>

      {/* Course analytics */}
      <section className="space-y-6">
        <div>
          <div className="h-6 w-44 animate-pulse rounded-md bg-muted" />

          <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-muted/70" />
        </div>

        {/* Distribution cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <AnalyticsCard key={index} height="h-72">
              <div className="h-5 w-36 animate-pulse rounded bg-muted" />

              <div className="mt-6 flex items-center gap-8">
                <div className="h-36 w-36 shrink-0 animate-pulse rounded-full bg-muted" />

                <div className="flex-1 space-y-4">
                  {Array.from({ length: 3 }).map((_, item) => (
                    <div key={item} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                      </div>

                      <div className="h-2 w-full animate-pulse rounded-full bg-muted/70" />
                    </div>
                  ))}
                </div>
              </div>
            </AnalyticsCard>
          ))}
        </div>

        {/* Pricing + top courses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnalyticsCard height="h-80">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-6 grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-muted/20 p-4"
                >
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />

                  <div className="mt-3 h-7 w-28 animate-pulse rounded bg-muted" />

                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted/70" />
                </div>
              ))}
            </div>

            <div className="mt-5 h-3 w-full animate-pulse rounded-full bg-muted/60" />
          </AnalyticsCard>

          <AnalyticsCard height="h-80">
            <div className="h-5 w-36 animate-pulse rounded bg-muted" />

            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border p-3"
                >
                  <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-muted" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted/70" />
                  </div>

                  <div className="h-4 w-14 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </div>

        {/* Course chart */}
        <AnalyticsCard height="h-72">
          <div className="h-5 w-44 animate-pulse rounded bg-muted" />

          <div className="mt-6 flex h-44 items-end gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 animate-pulse rounded-t-md bg-muted"
                style={{
                  height: `${35 + ((index * 17) % 55)}%`,
                }}
              />
            ))}
          </div>
        </AnalyticsCard>
      </section>

      {/* Batch + content analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AnalyticsCard height="h-80">
          <div className="h-5 w-36 animate-pulse rounded bg-muted" />

          <div className="mt-6 flex items-center gap-8">
            <div className="h-36 w-36 shrink-0 animate-pulse rounded-full bg-muted" />

            <div className="flex-1 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                  </div>

                  <div className="h-2 w-full animate-pulse rounded-full bg-muted/70" />
                </div>
              ))}
            </div>
          </div>
        </AnalyticsCard>

        <AnalyticsCard height="h-80">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />

          <div className="mt-6 grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-muted/20 p-4"
              >
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />

                <div className="mt-3 h-8 w-20 animate-pulse rounded bg-muted" />

                <div className="mt-2 h-3 w-28 animate-pulse rounded bg-muted/70" />
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>

      {/* Consultancy */}
      <AnalyticsCard height="h-96">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="h-5 w-44 animate-pulse rounded bg-muted" />

            <div className="mt-2 h-3 w-64 animate-pulse rounded bg-muted/70" />
          </div>

          <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="mt-8 flex h-56 items-end gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse rounded-t-md bg-muted"
              style={{
                height: `${30 + ((index * 23) % 65)}%`,
              }}
            />
          ))}
        </div>
      </AnalyticsCard>

      {/* Instructors */}
      <AnalyticsCard height="h-72">
        <div className="h-5 w-36 animate-pulse rounded bg-muted" />

        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border p-3"
            >
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3.5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-2.5 w-24 animate-pulse rounded bg-muted/70" />
              </div>

              <div className="hidden h-7 w-24 animate-pulse rounded-lg bg-muted sm:block" />
            </div>
          ))}
        </div>
      </AnalyticsCard>
    </div>
  );
}

function AnalyticsCard({
  children,
  height,
}: {
  children: React.ReactNode;
  height: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card p-6 ${height}`}
    >
      {children}
    </div>
  );
}
