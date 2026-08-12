import { UserDashboard } from "@/components/dashboard/user/UserDashboard";
import { requireAuth } from "@/lib/auth-guards";

export default async function DashboardPage() {
  const session = await requireAuth();

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  };

  return <UserDashboard user={user} />;
}
