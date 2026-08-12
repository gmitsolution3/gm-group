import { dashboardNavigation } from "@/config/dashboard/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { UserDashboard } from "@/components/dashboard/user/UserDashboard";

export default function DashboardPage() {
  const user = {
    name: "GM User",
    email: "user@example.com",
    image: null,
  };

  const role = "user" as const;
  console.log(dashboardNavigation.user)

  return (
    <DashboardShell
      role={role}
      user={user}
      navigation={dashboardNavigation[role]}
    >
      <UserDashboard user={user} />
    </DashboardShell>
  );
}