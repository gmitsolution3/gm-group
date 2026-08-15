"use client";

import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface UmrahHajjDashboardErrorProps {
  onRetry: () => void;
}

export function UmrahHajjDashboardError({
  onRetry,
}: UmrahHajjDashboardErrorProps) {
  return (
    <div className="p-6 lg:p-8">
      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1440px] items-center justify-center overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/70 via-background to-background p-8 sm:p-12">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-100/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-orange-100/30 blur-3xl" />

        <div className="relative w-full max-w-lg text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-200/70 bg-red-50 text-red-500 shadow-sm">
            <AlertTriangle className="h-9 w-9" />
          </div>

          {/* Label */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50/80 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
              Dashboard unavailable
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            We couldn't load the dashboard
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            We couldn't retrieve the latest Umrah & Hajj
            statistics. This may be a temporary connection
            problem.
          </p>

          {/* Retry */}
          <button
            type="button"
            onClick={onRetry}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />

            Try again
          </button>

          {/* Context */}
          <p className="mt-5 text-xs text-muted-foreground/70">
            If the problem continues, please try again in a
            few moments.
          </p>
        </div>
      </div>
    </div>
  );
}