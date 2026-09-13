"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { API_ENDPOINTS } from "@/config/api/api";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useFetch } from "@/hooks/api/useFetch";
import { GMLogisticDashboardResponse } from "@/types";
import GMLogisticDashboardLoader from "./GMLogisticDashboardLoader";
import GMLogisticDashboardError from "./GMLogisticDashboardError";

export default function GMLogisticDashboard() {
  const { data, isLoading, isError, refetch } =
    useFetch<GMLogisticDashboardResponse>(
      API_ENDPOINTS.gmLogistic.dashboard
    );

  const gmLogistic = dashboardVentures.find(
    (v) => v.name === "GM Logistic"
  );

  if (isLoading) {
    return <GMLogisticDashboardLoader />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <GMLogisticDashboardError
        message={data?.message}
        onRetry={refetch}
      />
    );
  }

  const stats = data.data;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {gmLogistic && (
        <VentureHeader selectedVenture={gmLogistic} />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: String(stats.users?.totalUsers ?? 0),
            sub: "Registered users",
          },
          {
            title: "Admin Users",
            value: String(stats.users?.totalAdmins ?? 0),
            sub: "Admin accounts",
          },
          {
            title: "Countries",
            value: String(stats.countries?.totalCountries ?? 0),
            sub: "Active countries",
          },
          {
            title: "Categories",
            value: String(stats.categories?.totalCategories ?? 0),
            sub: "Active categories",
          },
        ].map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border bg-gradient-to-br from-slate-50 to-card p-6 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{s.title}</p>
            <p className="text-3xl font-extrabold mt-2">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-display text-lg font-bold">Pricing</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { label: "Total Records", value: stats.pricing?.totalPricingRecords ?? 0 },
              { label: "Configured", value: stats.pricing?.configuredPricingRecords ?? 0 },
              { label: "Pending", value: stats.pricing?.pendingPricingRecords ?? 0 },
              { label: "Completion %", value: `${stats.pricing?.pricingCompletionPercentage ?? 0}%` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-display text-lg font-bold">Recent Users</h3>
          <div className="mt-4 space-y-3">
            {(stats.recentUsers || []).map((user: any) => (
              <div
                key={user._id}
                className="flex items-center gap-3 rounded-xl bg-muted/30 p-3"
              >
                <img
                  src={user.image || "https://i.pravatar.cc/150?img=3"}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <span className="ml-auto text-xs font-semibold text-indigo">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
