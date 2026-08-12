import { requireAuth } from "@/lib/auth-guards";

import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";

export default async function ProfilePage() {
  const session = await requireAuth();

  const user = {
    name: session.user.name,
    email: session.user.email,
    phone: session.user.phone ?? null,
    image: session.user.image ?? null,
    role: session.user.role ?? "user",
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Account
          </p>

          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile surface */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
