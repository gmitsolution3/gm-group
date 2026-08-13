import { AdminDashboard } from "@/components/dashboard/admin/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/user/UserDashboard";
import { requireAuth } from "@/lib/auth-guards";

export default async function DashboardPage() {
  const session = await requireAuth();

  const role = session.user.role ?? "user";

  const user = {
    name: session.user.name,
    email: session.user.email,
  };

  if (role === "admin") {
    return <AdminDashboard user={user} />;
  }

  return <UserDashboard user={user} />;
}