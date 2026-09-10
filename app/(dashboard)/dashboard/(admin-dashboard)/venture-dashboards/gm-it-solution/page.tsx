import GMITSolutionDashboard from "@/components/dashboard/venture-projects/gm-it-solution/GMITSolutionDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GMITSolutionDashboardPage() {
  await requireRole("admin");

  return <GMITSolutionDashboard />;
}
