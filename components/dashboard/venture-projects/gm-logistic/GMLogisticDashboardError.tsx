"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GMLogisticDashboardErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function GMLogisticDashboardError({
  message = "Failed to load logistics dashboard",
  onRetry,
}: GMLogisticDashboardErrorProps) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Logistics Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">GM Logistic</p>
        </div>

        {/* Error Container */}
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Unable to load dashboard
              </h3>
              <p className="text-muted-foreground">{message}</p>
            </div>
            {onRetry && (
              <Button onClick={onRetry} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <p className="text-sm text-muted-foreground">
              If the problem persists, please check your connection or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
