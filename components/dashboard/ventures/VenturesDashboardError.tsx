"use client";

import { RefreshCw, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type VenturesDashboardErrorProps = {
  onRetry: () => void;
  isLoading?: boolean;
};

export default function VenturesDashboardError({
  onRetry,
  isLoading = false,
}: VenturesDashboardErrorProps) {
  return (
    <div className="rounded-2xl border border-dashed p-10 text-center">
      <XCircle className="mx-auto h-8 w-8 text-destructive" />

      <p className="mt-3 text-sm font-medium">
        Failed to load ventures
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        We couldn't retrieve the venture data. Please try again.
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={onRetry}
        disabled={isLoading}
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${
            isLoading ? "animate-spin" : ""
          }`}
        />
        Try again
      </Button>
    </div>
  );
}
