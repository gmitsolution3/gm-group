export default function VenturesPageError() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <p className="text-sm font-medium text-ink">
            Unable to load ventures.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    </section>
  );
}