import AccountIndivisualSummaryDashboard from "@/components/dashboard/venture-projects/gm-international/AccountIndivisualSummary/AccountIndivisualSummaryDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function AccountIndividualSummaryPage() {
  const session = await requireRole("admin");

  return (
    <AccountIndivisualSummaryDashboard email={session.user.email} />
  );
}
