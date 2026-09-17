import GMAviationDashboard from "@/components/dashboard/venture-projects/gm-aviation/GMAviationDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GMAviationDashboardPage() {
  await requireRole("admin");

  return <GMAviationDashboard />;
}