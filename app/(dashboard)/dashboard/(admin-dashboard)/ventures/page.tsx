import { requireRole } from "@/lib/auth-guards";

import VenturesDashboard from "@/components/dashboard/ventures/VenturesDashboard";

export default async function VenturesPage() {
  await requireRole("admin");

  return <VenturesDashboard />;
}