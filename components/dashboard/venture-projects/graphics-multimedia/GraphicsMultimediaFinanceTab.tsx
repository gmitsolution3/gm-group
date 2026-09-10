"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/api/useFetch";
import { API_ENDPOINTS } from "@/config/api/api";
import { GraphicsMultimediaFinanceResponse, GraphicsMultimediaFinanceDateRange } from "@/types/dashboard/graphics-multimedia.type";
import {
  formatCurrency,
  formatNumber,
  formatAverageOrder,
  getGranularityDisplay,
  financeDateRangeOptions,
} from "../utils";
import {
  DollarSign,
  BarChart3,
  Calendar,
  ShoppingBag,
  Calculator,
  Wallet,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// Financial metric card component
interface FinancialMetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  format: "currency" | "number" | "average";
  description?: string;
  color?: "blue" | "green" | "orange" | "purple" | "cyan" | "indigo";
}

function FinancialMetricCard({
  title,
  value,
  icon,
  format,
  description,
  color = "blue",
}: FinancialMetricCardProps) {
  const formattedValue = format === "currency"
    ? formatCurrency(value)
    : format === "average"
    ? formatAverageOrder(value)
    : formatNumber(value);

  const colorClasses = {
    blue: "border-blue-100 bg-blue-50/50",
    green: "border-green-100 bg-green-50/50",
    orange: "border-orange-100 bg-orange-50/50",
    purple: "border-purple-100 bg-purple-50/50",
    cyan: "border-cyan-100 bg-cyan-50/50",
    indigo: "border-indigo-100 bg-indigo-50/50",
  };

  const iconClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all hover:shadow-sm",
      colorClasses[color]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{formattedValue}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn("rounded-lg p-2", iconClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Simple bar chart component for revenue/orders visualization
interface SimpleBarChartProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
  format?: "currency" | "number";
}

function SimpleBarChart({ data, title, color = "bg-blue-500", format = "currency" }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-foreground">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">
                  {format === "currency" ? formatCurrency(item.value) : formatNumber(item.value)}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", color)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


interface GraphicsMultimediaFinanceTabProps {
  onRetry?: () => void;
}

export function GraphicsMultimediaFinanceTab({ onRetry }: GraphicsMultimediaFinanceTabProps) {
  const [selectedRange, setSelectedRange] = useState<GraphicsMultimediaFinanceDateRange>("7days");

  // Build the API URL with selected range
  const financeUrl = `${API_ENDPOINTS.graphicsMultimedia.finance.base}?range=${selectedRange}`;

  // Fetch finance data
  const { data, isLoading, isError, refetch } = useFetch<GraphicsMultimediaFinanceResponse>(
    financeUrl,
  );

  const handleRangeChange = (range: string) => {
    setSelectedRange(range as GraphicsMultimediaFinanceDateRange);
  };

  // Memoized chart data for better performance
  const chartData = useMemo(() => {
    if (!data?.data?.charts) return null;

    // Limit the number of data points shown for better readability
    const maxDataPoints = 12;
    const revenueData = [...data.data.charts.revenue];
    const bookingsData = [...data.data.charts.bookings];

    if (revenueData.length > maxDataPoints) {
      revenueData.splice(maxDataPoints);
      bookingsData.splice(maxDataPoints);
    }

    return {
      revenue: revenueData,
      bookings: bookingsData,
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
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="mt-1 h-4 w-64 rounded-md" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Financial Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="mb-4 h-7 w-40 rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="mb-4 h-7 w-40 rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>

        {/* Payment Methods Placeholder */}
        <div className="rounded-xl border border-border bg-card p-6">
          <Skeleton className="mb-4 h-7 w-40 rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-border bg-card p-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <DollarSign className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
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
          >
            Retry
          </Button>
          {onRetry && (
            <Button onClick={onRetry}>
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Financial Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {getGranularityDisplay(charts.granularity, selectedRange)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {financeDateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <FinancialMetricCard
          title="Total Revenue"
          value={summary.totalRevenue}
          icon={<DollarSign className="h-5 w-5" />}
          format="currency"
          description="Total income generated"
          color="green"
        />

        <FinancialMetricCard
          title="Total Bookings"
          value={summary.totalBookings}
          icon={<ShoppingBag className="h-5 w-5" />}
          format="number"
          description="Number of service bookings"
          color="blue"
        />

        <FinancialMetricCard
          title="Avg Booking Value"
          value={summary.averageBookingValue}
          icon={<Calculator className="h-5 w-5" />}
          format="average"
          description="Average revenue per booking"
          color="purple"
        />

        <FinancialMetricCard
          title="Regular Bookings"
          value={summary.regularBookings}
          icon={<BarChart3 className="h-5 w-5" />}
          format="number"
          description="Standard service bookings"
          color="orange"
        />

        <FinancialMetricCard
          title="Influencer Bookings"
          value={summary.influencerBookings}
          icon={<Smartphone className="h-5 w-5" />}
          format="number"
          description="Influencer collaborations"
          color="cyan"
        />
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trend</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedOption?.label} • {charts.granularity} view
              </p>
            </CardHeader>
            <CardContent>
              <SimpleBarChart
                data={chartData.revenue}
                title="Revenue"
                color="bg-green-500"
                format="currency"
              />
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bookings Trend</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedOption?.label} • {charts.granularity} view
              </p>
            </CardHeader>
            <CardContent>
              <SimpleBarChart
                data={chartData.bookings}
                title="Bookings"
                color="bg-blue-500"
                format="number"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Key metrics for {selectedOption?.label}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Revenue per Booking</p>
              <p className="text-2xl font-bold">{formatCurrency(summary.averageBookingValue)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Booking Mix</p>
              <p className="text-2xl font-bold">
                {summary.totalBookings > 0
                  ? `${((summary.regularBookings / summary.totalBookings) * 100).toFixed(0)}% Regular`
                  : "0% Regular"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Data Points</p>
              <p className="text-2xl font-bold">{charts.revenue.length}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Time Period</p>
              <p className="text-2xl font-bold capitalize">{charts.granularity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State Handling */}
      {summary.totalRevenue === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="mx-auto max-w-md">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No Financial Data Available</h3>
            <p className="mt-2 text-muted-foreground">
              {selectedOption?.label} shows no revenue or bookings. Data will appear here as transactions occur.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Try selecting a different time range to view historical data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}