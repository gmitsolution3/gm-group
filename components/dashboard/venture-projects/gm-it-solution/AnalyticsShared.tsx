"use client";

import type {
  ComponentType,
  ReactNode,
} from "react";

import {
  Activity,
  BriefcaseBusiness,
  FileText,
  Layers3,
  User,
  Users
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type IconComponent = ComponentType<{
  className?: string;
}>;

/* ========================================================================== */
/* SECTION                                                                    */
/* ========================================================================== */

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
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

/* ========================================================================== */
/* KPI CARD                                                                   */
/* ========================================================================== */

export function KpiCard({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: number;
  icon: IconComponent;
  description?: string;
}) {
  return (
    <Card className="overflow-hidden border-border/70">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* TREND LIST                                                                 */
/* ========================================================================== */

export function TrendList({
  items,
}: {
  items: Array<{
    count: number;
    period: string;
  }>;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No trend data available for this period." />
    );
  }

  const maxCount = Math.max(
    ...items.map((item) => item.count),
    1,
  );

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage =
          (item.count / maxCount) * 100;

        return (
          <div
            key={item.period}
            className="space-y-2"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">
                {formatPeriod(item.period)}
              </span>

              <span className="text-sm font-semibold">
                {item.count.toLocaleString()}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-indigo transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* BREAKDOWN LIST                                                             */
/* ========================================================================== */

type BreakdownItem = {
  count: number;
};

export function BreakdownList<
  T extends BreakdownItem,
>({
  items,
  labelKey,
}: {
  items: T[];
  labelKey: keyof T;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No breakdown data available." />
    );
  }

  const maxCount = Math.max(
    ...items.map((item) => item.count),
    1,
  );

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const label = String(
          item[labelKey] ?? "Unknown",
        );

        const percentage =
          (item.count / maxCount) * 100;

        return (
          <div
            key={`${label}-${index}`}
            className="space-y-2"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="truncate text-sm font-medium">
                {label}
              </span>

              <span className="shrink-0 text-sm font-semibold">
                {item.count.toLocaleString()}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-indigo"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* ACTIVITY TIMELINE                                                          */
/* ========================================================================== */

export function ActivityTimeline({
  items,
}: {
  items: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
  }>;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No recent activity found." />
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item) => {
            const Icon = getActivityIcon(item.type);

            return (
              <div
                key={item.id}
                className="flex gap-4 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {item.title}
                      </p>

                      {item.description && (
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <time className="shrink-0 text-xs text-muted-foreground">
                      {formatDateTime(item.date)}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* RECENT TABLE                                                               */
/* ========================================================================== */

export function RecentTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState text="No recent records found." />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="border-b bg-muted/40">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-muted/30"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-5 py-4 text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

export function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center">
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function formatPeriod(period: string) {
  const date = new Date(`${period}-01`);

  if (Number.isNaN(date.getTime())) {
    return period;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
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

function getActivityIcon(type: string) {
  switch (type) {
    case "user":
      return User;

    case "portfolio":
      return BriefcaseBusiness;

    case "blog":
      return FileText;

    case "job":
      return BriefcaseBusiness;

    case "application":
      return Users;

    case "service":
      return Layers3;

    default:
      return Activity;
  }
}