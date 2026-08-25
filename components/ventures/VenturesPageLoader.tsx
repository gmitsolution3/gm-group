export default function VenturesPageLoader() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="animate-pulse">
          <div className="min-h-[30rem] rounded-[2rem] bg-muted" />

          <div className="mt-24 sm:mt-28 lg:mt-32">
            <div className="max-w-2xl">
              <div className="h-3 w-32 rounded bg-muted" />

              <div className="mt-5 h-12 w-3/4 rounded-lg bg-muted" />

              <div className="mt-5 h-5 w-full max-w-xl rounded bg-muted" />
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}