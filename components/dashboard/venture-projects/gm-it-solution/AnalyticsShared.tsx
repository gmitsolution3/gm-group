"use client";

import {
  Activity,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type {
  AnalyticsActivity,
  AnalyticsBreakdown,
  GrowthPoint,
} from "@/types/dashboard/gm-it-solution.type";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

export function KpiCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {typeof value === "number"
                ? value.toLocaleString()
                : value}
            </p>

            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {Icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  text = "No data available.",
}: {
  text?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 px-5 py-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

export function BreakdownList({
  items,
}: {
  items: AnalyticsBreakdown[];
}) {
  if (!items.length) {
    return <EmptyState />;
  }

  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="truncate text-sm font-medium">
              {item.label}
            </span>

            <span className="text-sm font-semibold">
              {item.count.toLocaleString()}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-indigo transition-all"
              style={{
                width: `${(item.count / max) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TrendList({
  items,
}: {
  items: GrowthPoint[];
}) {
  if (!items.length) {
    return <EmptyState />;
  }

  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="flex h-56 items-end gap-2 overflow-x-auto rounded-xl border border-border/60 bg-muted/10 p-4">
      {items.map((item) => (
        <div
          key={item.period}
          className="flex min-w-8 flex-1 flex-col items-center justify-end gap-2"
        >
          <span className="text-[10px] font-medium text-muted-foreground">
            {item.count}
          </span>

          <div
            className="w-full min-w-3 rounded-t-md bg-indigo"
            style={{
              height: `${Math.max(
                (item.count / max) * 150,
                4,
              )}px`,
            }}
          />

          <span className="max-w-16 truncate text-[10px] text-muted-foreground">
            {item.period}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ActivityTimeline({
  items,
}: {
  items: AnalyticsActivity[];
}) {
  if (!items.length) {
    return <EmptyState text="No recent activity." />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon =
          item.type === "user"
            ? Users
            : item.type === "application"
              ? FileText
              : item.type === "job"
                ? BriefcaseBusiness
                : item.type === "portfolio"
                  ? Activity
                  : CheckCircle2;

        return (
          <div
            key={item.id}
            className="flex gap-3 rounded-xl border border-border/60 bg-muted/10 p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
              <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium">{item.title}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RecentTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: React.ReactNode[][];
}) {
  if (!rows.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70">
      <table className="w-full min-w-[600px]">
        <thead className="bg-muted/40">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-muted/20">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}