import { requireRole } from "@/lib/auth-guards";

export default async function AdminPage() {
  const session = await requireRole("admin");

  return (
    <div className="p-6 lg:p-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Administration
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Admin Area
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome, {session.user.name}.
        </p>
      </div>
    </div>
  );
}