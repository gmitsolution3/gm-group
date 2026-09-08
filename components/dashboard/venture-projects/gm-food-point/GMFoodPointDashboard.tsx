"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  WalletCards,
  Clock,
  ChefHat,
  CheckCircle,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Package,
  UserCircle,
  Menu,
  Layers,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useFetch } from "@/hooks/api/useFetch";
import { API_ENDPOINTS } from "@/config/api/api";
import { GMFoodPointDashboardResponse } from "@/types";

import { GMFoodPointDashboardLoader } from "./GMFoodPointDashboardLoader";
import { GMFoodPointDashboardError } from "./GMFoodPointDashboardError";
import { FinanceTab } from "./FinanceTab";

const tabs = [
  {
    value: "statistics",
    label: "Statistics",
    icon: BarChart3,
  },
  {
    value: "finance",
    label: "Finance",
    icon: WalletCards,
  },
] as const;

type TabValue = (typeof tabs)[number]["value"];

function isValidTab(value: string | null): value is TabValue {
  return tabs.some((tab) => tab.value === value);
}

// Helper function to format numbers
function formatNumber(value: number): string {
  return value.toLocaleString();
}

// Component for statistic cards
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  color?: "blue" | "green" | "orange" | "red" | "purple" | "cyan";
}

function StatCard({
  title,
  value,
  icon,
  description,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "border-blue-100 bg-blue-50/50 text-blue-700",
    green: "border-green-100 bg-green-50/50 text-green-700",
    orange: "border-orange-100 bg-orange-50/50 text-orange-700",
    red: "border-red-100 bg-red-50/50 text-red-700",
    purple: "border-purple-100 bg-purple-50/50 text-purple-700",
    cyan: "border-cyan-100 bg-cyan-50/50 text-cyan-700",
  };

  const iconClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all hover:shadow-sm",
        colorClasses[color],
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-2xl font-bold">{formatNumber(value)}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-2", iconClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function GMFoodPointDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab");
  const activeTab: TabValue = isValidTab(currentTab)
    ? currentTab
    : "statistics";

  // Fetch dashboard statistics
  const { data, isLoading, isError, refetch } = useFetch<GMFoodPointDashboardResponse>(
    API_ENDPOINTS.gmFoodPoint.dashboard,
  );

  const handleTabChange = (tab: TabValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "statistics") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // Show loading state
  if (isLoading) {
    return <GMFoodPointDashboardLoader />;
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <GMFoodPointDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const statistics = data.data;

  return (
    <div className="w-full">
      <div className="mx-auto !max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Food Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            GM Food Point
          </p>
        </div>

        {/* Tabs */}
        <section>
          <div className="rounded-2xl border border-border/70 bg-card p-2">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTabChange(tab.value)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive
                        ? "bg-indigo text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <div className="pt-8">
          {activeTab === "statistics" && (
            <div className="space-y-8">
              {/* Orders Statistics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Orders Overview
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  <StatCard
                    title="Total Today"
                    value={statistics.orders.totalToday}
                    icon={<ShoppingBag className="h-5 w-5" />}
                    color="blue"
                    description="Total orders placed today"
                  />
                  <StatCard
                    title="Awaiting Payment"
                    value={statistics.orders.awaitingPayment}
                    icon={<CreditCard className="h-5 w-5" />}
                    color="orange"
                    description="Orders pending payment"
                  />
                  <StatCard
                    title="Queued"
                    value={statistics.orders.queued}
                    icon={<Clock className="h-5 w-5" />}
                    color="cyan"
                    description="Orders in queue"
                  />
                  <StatCard
                    title="Cooking"
                    value={statistics.orders.cooking}
                    icon={<ChefHat className="h-5 w-5" />}
                    color="purple"
                    description="Orders being prepared"
                  />
                  <StatCard
                    title="Ready"
                    value={statistics.orders.ready}
                    icon={<Package className="h-5 w-5" />}
                    color="green"
                    description="Orders ready for pickup/delivery"
                  />
                  <StatCard
                    title="Completed Today"
                    value={statistics.orders.completedToday}
                    icon={<CheckCircle className="h-5 w-5" />}
                    color="green"
                    description="Orders completed today"
                  />
                </div>
              </div>

              {/* Payments Statistics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Payments
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Pending Payments"
                    value={statistics.payments.pending}
                    icon={<DollarSign className="h-5 w-5" />}
                    color="red"
                    description="Payments awaiting processing"
                  />
                </div>
              </div>

              {/* Resources Statistics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  System Resources
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <StatCard
                    title="Total Users"
                    value={statistics.resources.users}
                    icon={<UserCircle className="h-5 w-5" />}
                    color="blue"
                    description="Registered users in system"
                  />
                  <StatCard
                    title="Active Menus"
                    value={statistics.resources.menus}
                    icon={<Menu className="h-5 w-5" />}
                    color="green"
                    description="Available food menus"
                  />
                  <StatCard
                    title="Categories"
                    value={statistics.resources.categories}
                    icon={<Layers className="h-5 w-5" />}
                    color="purple"
                    description="Food categories"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <FinanceTab onRetry={() => refetch()} />
          )}
        </div>
      </div>
    </div>
  );
}