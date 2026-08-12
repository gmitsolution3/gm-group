import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { dashboardNavigation } from "@/config/dashboard/navigation";
import { requireAuth } from "@/lib/auth-guards";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();

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
      {children}
    </DashboardShell>
  );
}