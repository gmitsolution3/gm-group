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
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>

        <span className="text-sm font-semibold">
          {formatNumber(value)}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            ({percent}%)
          </span>
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
