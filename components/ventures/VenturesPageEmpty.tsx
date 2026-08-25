export default function VenturesPageEmpty() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No ventures are currently available.
          </p>
        </div>
      </div>
    </section>
  );
}