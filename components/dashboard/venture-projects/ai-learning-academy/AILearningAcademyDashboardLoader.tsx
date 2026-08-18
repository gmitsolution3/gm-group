"use client";

export default function AILearningAcademyDashboardLoader() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded bg-muted" />

        <div className="mt-3 h-5 w-[32rem] max-w-full animate-pulse rounded bg-muted" />
      </div>

      {/* Period selector + overview */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />

        <div className="h-10 w-52 animate-pulse rounded-xl bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>

      {/* Course analytics */}
      <div className="space-y-6">
        <div>
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />

          <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>

      {/* Remaining dashboard sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>

      <div className="h-80 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}