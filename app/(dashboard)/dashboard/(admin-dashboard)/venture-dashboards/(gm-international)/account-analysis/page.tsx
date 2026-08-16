import { requireRole } from "@/lib/auth-guards";

import AccountAnalysisDashboard from "@/components/dashboard/venture-projects/gm-international/AccountAnalysisDashboard/AccountAnalysisDashboard";

export default async function AccountAnalysisPage() {
  const session = await requireRole("admin");

  return <AccountAnalysisDashboard email={session.user.email} />;
}
