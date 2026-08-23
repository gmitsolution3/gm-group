"use client";

import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyVenturesProps = {
  onCreate?: () => void;
};

export default function EmptyVentures({
  onCreate,
}: EmptyVenturesProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <Building2 className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        No ventures yet
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
        There are no ventures registered under GM Group yet.
        Create your first venture to get started.
      </p>

      <Button
        type="button"
        className="mt-5 bg-indigo"
        onClick={onCreate}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create new venture
      </Button>
    </div>
  );
}