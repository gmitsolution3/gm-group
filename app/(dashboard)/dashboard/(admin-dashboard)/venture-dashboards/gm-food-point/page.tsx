import { requireRole } from "@/lib/auth-guards";

export default async function GMFoodPointDashboardPage() {
  await requireRole("admin");

  return (
    <main className="mx-auto w-full !max-w-[1440px] p-6 sm:p-8 lg:p-10">
      <section className="rounded-3xl border border-border/70 bg-background p-8 shadow-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo">
            GM Food Point
          </span>
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Food Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          GM Food Point dashboard is ready for implementation.
        </p>
      </section>
    </main>
  );
}
