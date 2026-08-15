import { requireAuth } from "@/lib/auth-guards";

import { AccountAnalysisDashboard } from "@/components/dashboard/venture-projects/gm-international/AccountAnalysisDashboard";

export default async function AccountAnalysisPage() {
  const session = await requireAuth();

  return <AccountAnalysisDashboard email={session.user.email} />;
}
