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
      <div className="mx-auto flex min-h-[420px] w-full max-w-[1440px] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="h-5 w-5" />
          </div>

          <h2 className="mt-4 font-display text-lg font-bold tracking-tight">
            Unable to load analytics
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {message ||
              "Something went wrong while loading GM IT Solution analytics."}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5 rounded-full"
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