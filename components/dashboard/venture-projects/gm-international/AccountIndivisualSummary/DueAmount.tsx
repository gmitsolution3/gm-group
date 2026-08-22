"use client";

import { formatCurrency } from "@/utils";

export default function DueAmount({ value }: { value: number }) {
  return (
    <span
      className={[
        "font-semibold",
        value > 0 ? "text-amber-600" : "text-emerald-600",
      ].join(" ")}
    >
      {formatCurrency(value)}
    </span>
  );
}
