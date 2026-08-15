import { requireRole } from "@/lib/auth-guards";

import { VentureDashboards } from "@/components/dashboard/admin/VentureDashboard";

export default async function VentureDashboardsPage() {
  await requireRole("admin");

  return <VentureDashboards />;
}
