import { auth } from "@/lib/auth";
import { dashboardNavigation } from "@/config/dashboard/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { UserDashboard } from "@/components/dashboard/user/UserDashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const role = session.user.role ?? "user";

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  };

  return (
    <DashboardShell
      role={role}
      user={user}
      navigation={dashboardNavigation[role]}
    >
      {role === "admin" ? (
        <div className="p-6 lg:p-8">
          <h1 className="font-display text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your admin dashboard will be built here.
          </p>
        </div>
      ) : (
        <UserDashboard user={user} />
      )}
    </DashboardShell>
  );
}