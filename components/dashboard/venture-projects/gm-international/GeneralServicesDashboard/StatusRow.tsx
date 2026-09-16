import { formatNumber } from "@/utils";

function percentage(value: number, total: number) {
  if (!total) return 0;

  return Math.round((value / total) * 100);
}

export default function StatusRow({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percent = percentage(value, total);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
          {label}
        </span>

        <span className="text-sm font-bold text-foreground">
          {formatNumber(value)}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            ({percent}%)
          </span>
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
