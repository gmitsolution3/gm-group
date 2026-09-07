import GMFoodPointDashboard from "@/components/dashboard/venture-projects/gm-food-point/GMFoodPointDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GMFoodPointDashboardPage() {
  await requireRole("admin");

  return <GMFoodPointDashboard />;
}