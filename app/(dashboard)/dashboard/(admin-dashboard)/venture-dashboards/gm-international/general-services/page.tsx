import GeneralServicesDashboard from "@/components/dashboard/venture-projects/gm-international/GeneralServicesDashboard/GeneralServicesDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GeneralServicesPage() {
  await requireRole("admin");

  return <GeneralServicesDashboard />;
}
