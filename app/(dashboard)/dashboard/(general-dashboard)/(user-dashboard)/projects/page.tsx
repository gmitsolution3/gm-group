import { requireRole } from "@/lib/auth-guards";

export default async function ProjectsPage() {
  await requireRole("admin");

  return (
    <div className="p-6 lg:p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Administration
      </p>

      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
        Projects
      </h1>

      <p className="mt-2 text-muted-foreground">
        Project management will be built here.
      </p>
    </div>
  );
}
