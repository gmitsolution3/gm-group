"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  WalletCards,
  Clock,
  Image,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Package,
  UserCircle,
  Menu,
  Layers,
  CheckCircle,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useFetch } from "@/hooks/api/useFetch";
import { API_ENDPOINTS } from "@/config/api/api";
import { GraphicsMultimediaDashboardResponse } from "@/types/dashboard/graphics-multimedia.type";

import GraphicsMultimediaDashboardLoader from "./GraphicsMultimediaDashboardLoader";
import GraphicsMultimediaDashboardError from "./GraphicsMultimediaDashboardError";
import { formatNumber } from "../utils";

const tabs = [
  {
    value: "overview",
    label: "Overview",
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

// Recent item component
interface RecentItemProps {
  title: string;
  subtitle: string;
  avatar?: string;
  icon?: React.ReactNode;
  color?: string;
}

function RecentItem({
  title,
  subtitle,
  avatar,
  icon,
  color = "gray",
}: RecentItemProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
    gray: "bg-muted text-muted-foreground",
  };

  return (
    <div className="flex items-start gap-3">
      {avatar ? (
        <img
          src={avatar}
          alt={title}
          className="flex-shrink-0 h-8 w-8 rounded-full object-cover border border-border/50"
        />
      ) : (
        <div className={cn("flex-shrink-0 h-8 w-8 rounded-full", colorClasses[color])}>
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default function GraphicsMultimediaDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab");
  const activeTab: TabValue = isValidTab(currentTab)
    ? currentTab
    : "overview";

  // Fetch dashboard statistics
  const { data, isLoading, isError, refetch } = useFetch<GraphicsMultimediaDashboardResponse>(
    API_ENDPOINTS.graphicsMultimedia.dashboard,
  );

  const handleTabChange = (tab: TabValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "overview") {
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
    return <GraphicsMultimediaDashboardLoader />;
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <GraphicsMultimediaDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const dashboardData = data.data;

  return (
    <div className="w-full">
      <div className="mx-auto !max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Graphics Multimedia Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Graphics Design and Multimedia Services
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
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Key Statistics */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Users"
                  value={dashboardData.stats.totalUsers}
                  icon={<UserCircle className="h-5 w-5" />}
                  color="blue"
                  description="Registered users in system"
                />
                <StatCard
                  title="Total Bookings"
                  value={dashboardData.stats.totalBookings}
                  icon={<ShoppingBag className="h-5 w-5" />}
                  color="green"
                  description="Total service bookings"
                />
                <StatCard
                  title="Total Revenue"
                  value={dashboardData.stats.totalRevenue}
                  icon={<DollarSign className="h-5 w-5" />}
                  color="purple"
                  description="Total income generated"
                />
                <StatCard
                  title="Total Services"
                  value={dashboardData.stats.totalServices}
                  icon={<Layers className="h-5 w-5" />}
                  color="orange"
                  description="Available services"
                />
                <StatCard
                  title="Total Packages"
                  value={dashboardData.stats.totalPackages}
                  icon={<Package className="h-5 w-5" />}
                  color="cyan"
                  description="Service packages offered"
                />
                <StatCard
                  title="Total Influencers"
                  value={dashboardData.stats.totalInfluencers}
                  icon={<Image className="h-5 w-5" />}
                  color="blue"
                  description="Registered influencers"
                />
                <StatCard
                  title="Job Postings"
                  value={dashboardData.stats.totalJobPostings}
                  icon={<BarChart3 className="h-5 w-5" />}
                  color="green"
                  description="Active job listings"
                />
                <StatCard
                  title="Job Applications"
                  value={dashboardData.stats.totalJobApplications}
                  icon={<CreditCard className="h-5 w-5" />}
                  color="orange"
                  description="Received applications"
                />
              </div>

              {/* Today's Activity */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  Today's Activity
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <StatCard
                    title="Bookings Today"
                    value={dashboardData.today.bookings}
                    icon={<ShoppingBag className="h-5 w-5" />}
                    color="blue"
                    description="New bookings today"
                  />
                  <StatCard
                    title="Influencer Bookings"
                    value={dashboardData.today.influencerBookings}
                    icon={<Image className="h-5 w-5" />}
                    color="purple"
                    description="Influencer collaborations today"
                  />
                  <StatCard
                    title="Applications Today"
                    value={dashboardData.today.applications}
                    icon={<CreditCard className="h-5 w-5" />}
                    color="green"
                    description="Job applications received today"
                  />
                  <StatCard
                    title="Total Activity"
                    value={dashboardData.today.totalBookings}
                    icon={<BarChart3 className="h-5 w-5" />}
                    color="orange"
                    description="Combined today's activity"
                  />
                </div>
              </div>

              {/* Breakdown Section */}
              <div className="grid gap-6">
                {/* Bookings Breakdown */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Bookings Breakdown
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Regular</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.bookings.regular}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Standard bookings</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Custom</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.bookings.custom}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Tailored packages</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Influencer</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.bookings.influencer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Influencer collaborations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jobs Breakdown */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Job Postings Status
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.jobs.active}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Currently open</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.jobs.inactive}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Closed/Draft</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.jobs.total}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">All postings</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Catalog Breakdown */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Service Catalog
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Services</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.catalog.services}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Individual offerings</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Packages</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.catalog.packages}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Bundled services</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Custom Packages</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.catalog.customPackages}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Client-specific</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Influencers</p>
                        <p className="text-2xl font-bold text-foreground">{dashboardData.breakdown.catalog.influencers}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Available for collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6">
                {/* Recent Bookings */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Recent Bookings
                    </h2>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Latest service bookings</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dashboardData.recentBookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100">
                          <UserCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{booking.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.company} • {booking.selectedPackage.name}
                          </p>
                        </div>
                      </div>
                    ))}
                    {dashboardData.recentBookings.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">No recent bookings</p>
                    )}
                  </div>
                </div>

                {/* Recent Influencer Bookings */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Recent Influencer Bookings
                    </h2>
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Latest influencer collaborations</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dashboardData.recentInfluencerBookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100">
                          <Image className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{booking.name}</p>
                          <p className="text-sm text-muted-foreground">
                            with {booking.influencer.name} ({booking.influencer.designation})
                          </p>
                        </div>
                      </div>
                    ))}
                    {dashboardData.recentInfluencerBookings.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">No recent influencer bookings</p>
                    )}
                  </div>
                </div>

                {/* Recent Users */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Recent Users
                    </h2>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Newly registered users</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dashboardData.recentUsers.slice(0, 3).map((user) => (
                      <div key={user._id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-8 w-8 rounded-full object-cover border border-border/50"
                            />
                          ) : (
                            <UserCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.role === "admin" ? "(Admin)" : "(User)"}
                          </p>
                        </div>
                      </div>
                    ))}
                    {dashboardData.recentUsers.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">No recent users</p>
                    )}
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Recent Applications
                    </h2>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Latest job applications</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dashboardData.recentApplications.slice(0, 2).map((application) => (
                      <div key={application._id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{application.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {application.jobTitle} • Expected: {formatNumber(application.expectedSalary)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {dashboardData.recentApplications.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">No recent applications</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <GraphicsMultimediaFinanceTab onRetry={() => refetch()} />
          )}
        </div>
      </div>
    </div>
  );
}