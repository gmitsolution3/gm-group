"use client";

interface AccountSummaryCardProps {
  title: string;
  count: number;
  totalAmount: number;
  totalDue: number;
  unavailable?: boolean;
}

export default function AccountSummaryCard({
  title,
  count,
  totalAmount,
  totalDue,
  unavailable = false,
}: AccountSummaryCardProps) {
  if (unavailable) {
    return (
      <div className="rounded-2xl border bg-muted/20 p-5">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <p className="mt-3 text-lg font-semibold">
          Not available
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          No service data available
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-background p-5">
      <p className="text-sm font-medium text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">{count}</p>

      <div className="mt-4 flex items-center justify-between gap-4 text-xs">
        <div>
          <p className="text-muted-foreground">Total</p>
          <p className="mt-1 font-semibold">
            ৳{totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-muted-foreground">Due</p>
          <p className="mt-1 font-semibold text-amber-600">
            ৳{totalDue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}