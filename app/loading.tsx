export default function Loading() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white" />

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            GM Group
          </p>
        </div>
      </div>
    </main>
  );
}
