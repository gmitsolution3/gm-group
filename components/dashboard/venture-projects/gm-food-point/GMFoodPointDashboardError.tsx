"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GMFoodPointDashboardErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function GMFoodPointDashboardError({
  message = "Failed to load dashboard statistics",
  onRetry,
}: GMFoodPointDashboardErrorProps) {
  return (
    <div className="w-full">
      <div className="mx-auto !max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Food Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            GM Food Point
          </p>
        </div>

        {/* Error Container */}
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {/* Error Icon */}
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Unable to load dashboard
              </h3>
              <p className="text-muted-foreground">
                {message}
              </p>
            </div>

            {/* Retry Button */}
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}

            {/* Help Text */}
            <p className="text-sm text-muted-foreground">
              If the problem persists, please check your internet connection or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}