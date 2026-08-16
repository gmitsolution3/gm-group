import { formatCurrency } from "@/utils";

export default function TrendBar({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: number;
  width: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs text-muted-foreground">
        {label}
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${Math.min(width, 100)}%`,
          }}
        />
      </div>

      <span className="w-28 text-right text-xs font-medium">
        {formatCurrency(value)}
      </span>
    </div>
  );
}
