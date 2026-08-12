import { requireAuth } from "@/lib/auth-guards";

export default async function SettingsPage() {
  await requireAuth();

  return (
    <div className="p-6 lg:p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Account
      </p>

      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
        Settings
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage your account settings.
      </p>
    </div>
  );
}