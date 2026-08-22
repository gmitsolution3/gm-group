"use client";

import { ShieldCheck } from "lucide-react";

import {
  services,
  type ServiceType,
} from "./AccountServiceTabs";

export default function ServiceUnavailable({
  service,
  onRetry,
}: {
  service: ServiceType;
  onRetry: () => void;
}) {
  const label =
    services.find(
      (item) => item.value === service,
    )?.label ?? service;

  return (
    <div className="rounded-2xl border bg-card p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        {label} account data unavailable
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        The {label.toLowerCase()} account service
        did not return usable data.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}