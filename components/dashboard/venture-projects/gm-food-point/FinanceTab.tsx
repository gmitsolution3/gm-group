"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/api/useFetch";
import { API_ENDPOINTS } from "@/config/api/api";
import { GMFoodPointFinanceResponse, FinanceDateRange } from "@/types";
import {
  formatCurrency,
  formatNumber,
  formatAverageOrder,
  financeDateRangeOptions,
  getGranularityDisplay,
} from "../utils";
import {
  DollarSign,
  BarChart3,
  Calendar,
  ShoppingBag,
  Calculator,
  Smartphone,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Recharts import
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";

// Finance KPICard - premium design matching Statistics tab
interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  format: "currency" | "number" | "average";
  description: string;
  variant?: "primary" | "secondary" | "accent";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

function KPICard({
  title,
  value,
  icon,
  format,
  description,
  variant = "primary",
  trend = "neutral",
  trendValue,
}: KPICardProps) {
  const formattedValue = format === "currency"
    ? formatCurrency(value)
    : format === "average"
    ? formatAverageOrder(value)
    : formatNumber(value);

  const variantClasses = {
    primary: "bg-gradient-to-br from-primary/5 via-card to-card border-primary/20",
    secondary: "bg-gradient-to-br from-secondary/5 via-card to-card border-secondary/20",
    accent: "bg-gradient-to-br from-accent/5 via-card to-card border-accent/20",
  };

  const iconClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
  };

  const trendIcon = {
    up: <ArrowUpRight className="h-4 w-4 text-emerald-600" />,
    down: <ArrowDownRight className="h-4 w-4 text-red-600" />,
    neutral: <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-50" />,
  };

  return (
    <Card className={cn(
      "relative overflow-hidden rounded-2xl border border-border/70 shadow-xs transition-all hover:shadow-sm",
      variantClasses[variant]
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
              </p>
              {trend !== "neutral" && trendValue && (
                <div className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
                  trend === "up" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                )}>
                  {trendIcon[trend]}
                  <span className="font-medium">{trendValue}</span>
                </div>
              )}
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-foreground">
              {formattedValue}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <div className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            iconClasses[variant]
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// RevenueLineChart - premium line chart
interface RevenueLineChartProps {
  data: { label: string; value: number }[];
  granularity: string;
  title: string;
}

function RevenueLineChart({ data, granularity, title }: RevenueLineChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      name: item.label,
      revenue: item.value,
      index,
    }));
  }, [data]);

  return (
    <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Revenue Trend</CardTitle>
            <CardDescription className="text-sm">
              {granularity === "hourly" ? "Hourly revenue" :
               granularity === "daily" ? "Daily revenue" :
               granularity === "weekly" ? "Weekly revenue" : "Monthly revenue"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-medium">
            {granularity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickMargin={8}
                tickFormatter={(value) => formatCurrency(value).replace(/[^0-9.]/g, "")}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                dot={{ stroke: "#10b981", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// OrdersBarChart - premium bar chart
interface OrdersBarChartProps {
  data: { label: string; value: number }[];
  granularity: string;
  title: string;
}

function OrdersBarChart({ data, granularity, title }: OrdersBarChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      name: item.label,
      orders: item.value,
      index,
    }));
  }, [data]);

  return (
    <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Orders Trend</CardTitle>
            <CardDescription className="text-sm">
              {granularity === "hourly" ? "Hourly orders" :
               granularity === "daily" ? "Daily orders" :
               granularity === "weekly" ? "Weekly orders" : "Monthly orders"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-medium">
            {granularity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickMargin={8}
              />
              <Tooltip
                formatter={(value) => [formatNumber(Number(value)), "Orders"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="orders"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// PaymentMethodsCard - premium payment methods display
interface PaymentMethodsCardProps {
  cashRevenue: number;
  wechatRevenue: number;
  totalRevenue: number;
}

function PaymentMethodsCard({ cashRevenue, wechatRevenue, totalRevenue }: PaymentMethodsCardProps) {
  const cashPercentage = totalRevenue > 0 ? (cashRevenue / totalRevenue) * 100 : 0;
  const wechatPercentage = totalRevenue > 0 ? (wechatRevenue / totalRevenue) * 100 : 0;

  return (
    <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Payment Revenue</CardTitle>
            <CardDescription className="text-sm">Revenue by payment method</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Cash Revenue */}
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Cash Revenue</p>
                <p className="text-xs text-muted-foreground">Physical cash payments</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatCurrency(cashRevenue)}</p>
              <p className="text-xs text-muted-foreground">
                {cashPercentage.toFixed(1)}% of total
              </p>
            </div>
          </div>

          {/* WeChat Revenue */}
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">WeChat Revenue</p>
                <p className="text-xs text-muted-foreground">Mobile payments</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatCurrency(wechatRevenue)}</p>
              <p className="text-xs text-muted-foreground">
                {wechatPercentage.toFixed(1)}% of total
              </p>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Payment Method Split</span>
            <span className="text-muted-foreground">
              {cashPercentage.toFixed(1)}% Cash • {wechatPercentage.toFixed(1)}% WeChat
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="flex h-full">
              {cashPercentage > 0 && (
                <div
                  className="bg-blue-500 transition-all"
                  style={{ width: `${cashPercentage}%` }}
                  title={`Cash: ${formatCurrency(cashRevenue)}`}
                />
              )}
              {wechatPercentage > 0 && (
                <div
                  className="bg-emerald-500 transition-all"
                  style={{ width: `${wechatPercentage}%` }}
                  title={`WeChat: ${formatCurrency(wechatRevenue)}`}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Cash</span>
            <span>WeChat Pay</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// PerformanceSummaryCard - summary metrics
interface PerformanceSummaryCardProps {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  charts: {
    granularity: string;
    revenue: any[];
  };
}

function PerformanceSummaryCard({ summary, charts }: PerformanceSummaryCardProps) {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Performance Summary</CardTitle>
            <CardDescription className="text-sm">
              Key financial metrics at a glance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 rounded-xl border border-border/60 bg-muted/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Revenue per Order
            </p>
            <p className="text-2xl font-extrabold text-foreground">
              {formatCurrency(summary.averageOrderValue)}
            </p>
            <p className="text-xs text-muted-foreground">
              Average transaction value
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-border/60 bg-muted/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Order Volume
            </p>
            <p className="text-2xl font-extrabold text-foreground">
              {formatNumber(summary.totalOrders)}
            </p>
            <p className="text-xs text-muted-foreground">
              Total transactions
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-border/60 bg-muted/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data Points
            </p>
            <p className="text-2xl font-extrabold text-foreground">
              {charts.revenue.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {charts.granularity} data points
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-border/60 bg-muted/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Time Granularity
            </p>
            <p className="text-2xl font-extrabold text-foreground capitalize">
              {charts.granularity}
            </p>
            <p className="text-xs text-muted-foreground">
              Data resolution
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FinanceTabProps {
  onRetry?: () => void;
}

export function FinanceTab({ onRetry }: FinanceTabProps) {
  const [selectedRange, setSelectedRange] = useState<FinanceDateRange>("7days");

  // Build the API URL with selected range
  const financeUrl = `${API_ENDPOINTS.gmFoodPoint.finance.base}?range=${selectedRange}`;

  // Fetch finance data
  const { data, isLoading, isError, refetch } = useFetch<GMFoodPointFinanceResponse>(
    financeUrl,
  );

  const handleRangeChange = (range: string) => {
    setSelectedRange(range as FinanceDateRange);
  };

  // Memoized chart data for better performance
  const chartData = useMemo(() => {
    if (!data?.data?.charts) return null;

    // Limit the number of data points shown for better readability
    const maxDataPoints = 12;
    const revenueData = [...data.data.charts.revenue];
    const ordersData = [...data.data.charts.orders];

    if (revenueData.length > maxDataPoints) {
      // Take the most recent data points
      revenueData.splice(0, revenueData.length - maxDataPoints);
      ordersData.splice(0, ordersData.length - maxDataPoints);
    }

    return {
      revenue: revenueData,
      orders: ordersData,
      granularity: data.data.charts.granularity,
    };
  }, [data]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header with Range Selector */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-64 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-8 w-28 rounded-lg" />
                  <Skeleton className="h-3 w-40 rounded" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <Skeleton className="mb-4 h-6 w-40 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-md" />
            <Skeleton className="mt-6 h-64 w-full rounded-lg" />
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6">
            <Skeleton className="mb-4 h-6 w-40 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-md" />
            <Skeleton className="mt-6 h-64 w-full rounded-lg" />
          </div>
        </div>

        {/* Payment Methods Skeleton */}
        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <Skeleton className="mb-6 h-6 w-40 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-3 w-full rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border border-border/70 bg-card p-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <DollarSign className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">
            Unable to load financial data
          </h3>
          <p className="text-muted-foreground">
            {data?.message || "Failed to fetch financial data"}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="lg"
          >
            Retry
          </Button>
          {onRetry && (
            <Button onClick={onRetry} size="lg">
              Refresh Dashboard
            </Button>
          )}
        </div>
      </div>
    );
  }

  const financeData = data.data;
  const { summary, charts } = financeData;
  const selectedOption = financeDateRangeOptions.find(opt => opt.value === selectedRange);

  return (
    <div className="space-y-8">
      {/* Header with Range Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Financial Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor revenue, orders, and payment performance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-40 rounded-xl border-border/70">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/70">
              {financeDateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <KPICard
          title="Total Revenue"
          value={summary.totalRevenue}
          icon={<DollarSign className="h-5 w-5" />}
          format="currency"
          description="Total income generated"
          variant="primary"
        />

        <KPICard
          title="Total Orders"
          value={summary.totalOrders}
          icon={<ShoppingBag className="h-5 w-5" />}
          format="number"
          description="Number of transactions"
          variant="secondary"
        />

        <KPICard
          title="Avg Order Value"
          value={summary.averageOrderValue}
          icon={<Calculator className="h-5 w-5" />}
          format="average"
          description="Average revenue per order"
          variant="accent"
        />

        <KPICard
          title="Cash Revenue"
          value={summary.cashRevenue}
          icon={<Wallet className="h-5 w-5" />}
          format="currency"
          description="Revenue from cash payments"
          variant="primary"
        />

        <KPICard
          title="WeChat Revenue"
          value={summary.wechatRevenue}
          icon={<Smartphone className="h-5 w-5" />}
          format="currency"
          description="Revenue from WeChat Pay"
          variant="secondary"
        />
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueLineChart
            data={chartData.revenue}
            granularity={chartData.granularity}
            title="Revenue Trend"
          />
          <OrdersBarChart
            data={chartData.orders}
            granularity={chartData.granularity}
            title="Orders Trend"
          />
        </div>
      )}

      {/* Payment Methods */}
      <PaymentMethodsCard
        cashRevenue={summary.cashRevenue}
        wechatRevenue={summary.wechatRevenue}
        totalRevenue={summary.totalRevenue}
      />

      {/* Performance Summary */}
      <PerformanceSummaryCard
        summary={summary}
        charts={charts}
      />

      {/* Zero Data State */}
      {summary.totalRevenue === 0 && (
        <div className="rounded-2xl border border-border/70 bg-card p-8 text-center">
          <div className="mx-auto max-w-md">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-lg font-bold text-foreground">No Financial Data Available</h3>
            <p className="mt-2 text-muted-foreground">
              {selectedOption?.label} shows no revenue or orders. Data will appear here as transactions occur.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" onClick={() => setSelectedRange("1month")}>
                View Last Month
              </Button>
              <Button variant="outline" onClick={() => setSelectedRange("3months")}>
                View Last 3 Months
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}