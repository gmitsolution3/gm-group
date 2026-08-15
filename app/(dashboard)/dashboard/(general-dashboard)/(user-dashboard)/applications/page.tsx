import { requireRole } from "@/lib/auth-guards";

export default async function ApplicationsPage() {
  await requireRole("user");

  return (
    <div className="p-6 lg:p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Applications
      </p>

      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
        My Applications
      </h1>

      <p className="mt-2 text-muted-foreground">
        Your applications will appear here.
      </p>
    </div>
  );
}
