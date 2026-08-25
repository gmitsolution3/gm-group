export default function VentureDetailError() {
  return (
    <main>
      <section className="flex min-h-[60svh] items-center justify-center px-5 py-24">
        <div className="w-full max-w-xl rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Unable to load venture
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We couldn't retrieve this venture right now. Please try
            again later.
          </p>
        </div>
      </section>
    </main>
  );
}