import GMLogisticDashboard from "@/components/dashboard/venture-projects/gm-logistic/GMLogisticDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GMLogisticDashboardPage() {
  await requireRole("admin");
  
  return <GMLogisticDashboard />;
}
