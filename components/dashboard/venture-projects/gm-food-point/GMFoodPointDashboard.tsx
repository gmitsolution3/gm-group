"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CheckCircle,
  ChefHat,
  Clock,
  CreditCard,
  DollarSign,
  Layers,
  Menu,
  Package,
  ShoppingBag,
  UserCircle,
  WalletCards,
  ArrowRight,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { API_ENDPOINTS } from "@/config/api/api";
import { useFetch } from "@/hooks/api/useFetch";
import { GMFoodPointDashboardResponse } from "@/types";

import { formatNumber } from "../utils";
import { FinanceTab } from "./FinanceTab";
import { GMFoodPointDashboardError } from "./GMFoodPointDashboardError";
import { GMFoodPointDashboardLoader } from "./GMFoodPointDashboardLoader";

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

// Component for statistic cards
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description?: string;
  iconClassName?: string;
  gradientClass?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconClassName = "bg-blue/10 text-blue-600 dark:text-blue-400",
  gradientClass = "from-blue-500/[0.04]",
}: StatCardProps) {
  return (
    <Card className={`relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br ${gradientClass} via-card to-card shadow-xs transition-all hover:shadow-sm`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-extrabold tracking-tight text-foreground">
              {formatNumber(value)}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground truncate">
                {description}
              </p>
            )}
          </div>
          <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Order status pipeline component
interface OrderStatusCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  iconClassName: string;
  showArrow?: boolean;
}

function OrderStatusCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  showArrow = false,
}: OrderStatusCardProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-card p-4 transition-all hover:bg-muted/30">
        <div className={cn("mb-3 flex h-12 w-12 items-center justify-center rounded-xl", iconClassName)}>
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-2xl font-bold text-foreground">{formatNumber(value)}</p>
        <p className="mt-1 text-xs font-medium text-muted-foreground text-center">{title}</p>
      </div>
      {showArrow && (
        <div className="hidden lg:flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground/40" />
        </div>
      )}
    </>
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
  const { data, isLoading, isError, refetch } =
    useFetch<GMFoodPointDashboardResponse>(
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

  const gmFoodPointVenture = dashboardVentures.find(
    (v) => v.name === "GM Food Point",
  );

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
        {gmFoodPointVenture && (
          <VentureHeader
            selectedVenture={
              dashboardVentures.find(
                (v) => v.name === "GM Food Point",
              )!
            }
          />
        )}

        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            GM Food Point Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restaurant operations and analytics
          </p>
        </div>

        {/* Tabs */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardContent className="p-2">
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
          </CardContent>
        </Card>

        {/* Tab Content */}
        <div>
          {activeTab === "statistics" && (
            <div className="space-y-8">
              {/* Primary KPIs */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Orders Today"
                  value={statistics.orders.totalToday}
                  icon={ShoppingBag}
                  description="Total orders placed"
                  iconClassName="bg-blue/10 text-blue-600 dark:text-blue-400"
                  gradientClass="from-blue-500/[0.04]"
                />
                <StatCard
                  title="Awaiting Payment"
                  value={statistics.orders.awaitingPayment}
                  icon={CreditCard}
                  description="Pending payment"
                  iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  gradientClass="from-amber-500/[0.04]"
                />
                <StatCard
                  title="In Kitchen"
                  value={statistics.orders.queued + statistics.orders.cooking}
                  icon={ChefHat}
                  description="Queued + cooking"
                  iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  gradientClass="from-violet-500/[0.04]"
                />
                <StatCard
                  title="Ready Orders"
                  value={statistics.orders.ready}
                  icon={Package}
                  description="Ready for pickup"
                  iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  gradientClass="from-emerald-500/[0.04]"
                />
              </div>

              {/* Order Pipeline */}
              <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">
                        Order Pipeline
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Current order status flow
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                    <OrderStatusCard
                      title="Awaiting Payment"
                      value={statistics.orders.awaitingPayment}
                      icon={CreditCard}
                      iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                      showArrow={true}
                    />
                    <OrderStatusCard
                      title="Queued"
                      value={statistics.orders.queued}
                      icon={Clock}
                      iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                      showArrow={true}
                    />
                    <OrderStatusCard
                      title="Cooking"
                      value={statistics.orders.cooking}
                      icon={ChefHat}
                      iconClassName="bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
                      showArrow={true}
                    />
                    <OrderStatusCard
                      title="Ready"
                      value={statistics.orders.ready}
                      icon={Package}
                      iconClassName="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                      showArrow={true}
                    />
                    <OrderStatusCard
                      title="Completed Today"
                      value={statistics.orders.completedToday}
                      icon={CheckCircle}
                      iconClassName="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                      showArrow={false}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Metrics Grid */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Payments */}
                <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-base font-bold">
                      Payment Status
                    </h2>
                    <div className="rounded-xl border border-red-100 bg-red-50/40 dark:border-red-800/40 dark:bg-red-950/20 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                            <DollarSign className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Pending Payments
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Awaiting processing
                            </p>
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                          {formatNumber(statistics.payments.pending)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources */}
                <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-base font-bold">
                      System Resources
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                            <UserCircle className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">Total Users</span>
                        </div>
                        <span className="text-lg font-bold">{formatNumber(statistics.resources.users)}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                            <Menu className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">Active Menus</span>
                        </div>
                        <span className="text-lg font-bold">{formatNumber(statistics.resources.menus)}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                            <Layers className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">Categories</span>
                        </div>
                        <span className="text-lg font-bold">{formatNumber(statistics.resources.categories)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
