import { requireRole } from "@/lib/auth-guards";

import { UmrahHajjDashboard } from "@/components/dashboard/venture-projects/gm-international/UmrahHajjDashboard";

export default async function UmrahHajjPage() {
  await requireRole("admin");

  return <UmrahHajjDashboard />;
}
