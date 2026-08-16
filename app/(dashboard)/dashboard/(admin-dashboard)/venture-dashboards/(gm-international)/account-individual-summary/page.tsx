import {requireRole} from "@/lib/auth-guards";
import AccountIndivisualSummaryDashboard from "@/components/dashboard/venture-projects/gm-international/AccountIndivisualSummary/AccountIndivisualSummaryDashboard";

export default async function AccountIndividualSummaryPage() {
  await requireRole("admin");
  
  return <AccountIndivisualSummaryDashboard />;
}
