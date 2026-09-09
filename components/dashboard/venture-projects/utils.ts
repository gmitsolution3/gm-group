// Shared utilities for venture-projects dashboards

import { ChartGranularity } from "@/types";

// Currency formatting - USD by default, BDT supported for Taka-priced ventures
export function formatCurrency(value: number, currency: "USD" | "BDT" = "USD"): string {
  if (currency === "BDT") {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Number formatting - keeps whole numbers clean, shows 2 decimals otherwise
export function formatNumber(value: number): string {
  return Number.isInteger(value)
    ? value.toLocaleString("en-US")
    : value.toFixed(2);
}

// Date formatting (day month year, e.g. "9 Sep 2026")
export function formatDate(value: Date | string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "Unknown date";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Date formatting (month day year, e.g. "Sep 9, 2026")
export function formatDateMonthDay(value: string): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Date + time formatting (month day year, e.g. "Sep 9, 2026")
export function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Percentage formatting - keeps whole numbers clean, shows 2 decimals otherwise
export function formatPercentage(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`;
}

// Month formatting (long month, e.g. "September 2026")
export function formatMonth(value: string): string {
  const date = new Date(`${value}-01T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

// Average order value formatting (alias for formatCurrency)
export function formatAverageOrder(value: number): string {
  return formatCurrency(value);
}

// Label formatting - splits snake/dash/kebab case into Title Case words
export function formatLabel(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

// Label formatting - splits camelCase into Title Case words
export function formatLabelCamel(value: string): string {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase());
}

// Period formatting (e.g., "2026-09" -> "Sep 2026")
export function formatPeriod(period: string): string {
  const date = new Date(`${period}-01`);

  if (Number.isNaN(date.getTime())) {
    return period;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

// Period label formatting (e.g., "monthly" -> "Monthly")
export function formatPeriodLabel(value: string): string {
  if (!value) {
    return "Monthly";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Change formatting with sign (e.g., "+5", "-3")
export function formatChange(change: number): string {
  if (change > 0) {
    return `+${change}`;
  }

  return String(change);
}

// Financial metric card color utility
export function getMetricColor(value: number, target?: number): "green" | "red" | "blue" {
  if (target !== undefined) {
    return value >= target ? "green" : "red";
  }
  return "blue";
}

// Chart data point sorting utility
export function sortChartData<T extends { label: string; value: number }>(data: T[], ascending = true): T[] {
  return [...data].sort((a, b) => {
    if (ascending) {
      return a.value - b.value;
    }
    return b.value - a.value;
  });
}

// Date range options for finance dashboards
export const financeDateRangeOptions = [
  { value: "today", label: "Today", granularity: "hourly" },
  { value: "7days", label: "Last 7 Days", granularity: "daily" },
  { value: "15days", label: "Last 15 Days", granularity: "daily" },
  { value: "1month", label: "Last Month", granularity: "daily" },
  { value: "3months", label: "Last 3 Months", granularity: "weekly" },
  { value: "6months", label: "Last 6 Months", granularity: "monthly" },
  { value: "1year", label: "Last Year", granularity: "monthly" },
] as const;

// Get granularity display text
export function getGranularityDisplay(granularity: ChartGranularity, range: string): string {
  const rangeLabel = financeDateRangeOptions.find(opt => opt.value === range)?.label || range;

  switch (granularity) {
    case "hourly":
      return `Hourly breakdown for ${rangeLabel}`;
    case "daily":
      return `Daily breakdown for ${rangeLabel}`;
    case "weekly":
      return `Weekly breakdown for ${rangeLabel}`;
    case "monthly":
      return `Monthly breakdown for ${rangeLabel}`;
    default:
      return `${rangeLabel} overview`;
  }
}

// Calculate percentage of total
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Format duration in minutes
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}