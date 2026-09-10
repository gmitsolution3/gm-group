"use client";

import { useRole } from "@/hooks/auth/useRole";
import GMLogisticDashboard from "@/components/dashboard/venture-projects/gm-logistic/GMLogisticDashboard";

export default function GMLogisticPage() {
  const { role } = useRole();
  if (role !== "admin") return <div className="p-8">Access denied</div>;
  return (
    <div>
      <GMLogisticDashboard />
    </div>
  );
}
