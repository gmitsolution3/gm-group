export default function VentureSectionLoader() {
  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="h-3 w-28 animate-pulse rounded bg-muted" />

            <div className="mt-5 h-12 w-64 animate-pulse rounded-lg bg-muted" />

            <div className="mt-6 h-6 w-96 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        </div>

        {/* Venture cards */}
        <div className="space-y-6 lg:space-y-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="h-[560px] animate-pulse rounded-2xl bg-muted lg:col-span-7" />

            <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
              <div className="h-[260px] animate-pulse rounded-2xl bg-muted" />
              <div className="h-[260px] animate-pulse rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
