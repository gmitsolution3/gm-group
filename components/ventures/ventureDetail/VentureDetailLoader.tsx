export default function VentureDetailLoader() {
  return (
    <main>
      <section className="relative min-h-[70svh] overflow-hidden bg-ink">
        <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-white/10" />

            <div className="mt-10 flex items-center gap-8">
              <div className="h-24 w-24 rounded-2xl bg-white/10" />

              <div>
                <div className="h-3 w-40 rounded bg-white/10" />
              </div>
            </div>

            <div className="mt-8 h-20 w-3/4 max-w-4xl rounded-xl bg-white/10" />

            <div className="mt-6 h-6 w-full max-w-2xl rounded bg-white/10" />

            <div className="mt-8 flex gap-3">
              <div className="h-10 w-32 rounded-full bg-white/10" />
              <div className="h-10 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="animate-pulse">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="mt-5 h-12 w-3/4 rounded-lg bg-muted" />
              <div className="mt-7 h-24 w-full rounded-lg bg-muted" />
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </section>
    </main>
  );
}