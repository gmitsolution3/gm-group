import { AdminDashboard } from "@/components/dashboard/admin/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/users/UsersDashboard";
import { requireAuth } from "@/lib/auth-guards";

export default async function DashboardPage() {
  const session = await requireAuth();

  const role = session.user.role ?? "user";

  if (role === "admin") {
    return <AdminDashboard user={session.user} />;
  }

  return <UserDashboard user={session.user} />;
}