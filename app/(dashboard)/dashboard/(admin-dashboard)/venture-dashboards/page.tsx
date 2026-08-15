import { requireAuth } from "@/lib/auth-guards";

import { VentureDashboards } from "@/components/dashboard/admin/VentureDashboards";

export default async function VentureDashboardsPage() {
  await requireAuth();

  return <VentureDashboards />;
}