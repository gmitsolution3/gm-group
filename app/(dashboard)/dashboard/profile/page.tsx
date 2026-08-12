import { requireAuth } from "@/lib/auth-guards";

export default async function ProfilePage() {
  const session = await requireAuth();

  return (
    <div className="p-6 lg:p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Account
      </p>

      <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
        Profile
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage your profile information.
      </p>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground">Signed in as</p>

        <p className="mt-1 font-medium">{session.user.email}</p>
      </div>
    </div>
  );
}
