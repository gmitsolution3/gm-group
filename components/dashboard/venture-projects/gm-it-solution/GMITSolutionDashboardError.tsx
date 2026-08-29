"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type GMITSolutionDashboardErrorProps = {
  message?: string;
  onRetry: () => void;
};

export default function GMITSolutionDashboardError({
  message,
  onRetry,
}: GMITSolutionDashboardErrorProps) {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto flex min-h-[500px] w-full items-center justify-center">
        <div className="w-full max-w-2xl rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-5 font-display text-xl font-bold tracking-tight">
            Unable to load analytics
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {message ||
              "Something went wrong while loading GM IT Solution analytics. Please try again."}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-6 rounded-full"
            onClick={onRetry}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}