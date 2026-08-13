import { ChangePasswordForm } from "@/components/dashboard/profile/ChangePasswordForm";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { requireAuth } from "@/lib/auth-guards";

export default async function ProfilePage() {
  const session = await requireAuth();

  const user = {
    name: session.user.name,
    email: session.user.email,
    phone: session.user.phone ?? null,
    image: session.user.image ?? null,
    imagePublicId: session.user.imagePublicId ?? null,
    role: session.user.role ?? "user",

    emailVerified: session.user.emailVerified,
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Account
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Profile
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Manage your personal information and profile settings.
        </p>
      </section>

      <ProfileForm user={user} />

      <ChangePasswordForm />
    </div>
  );
}
