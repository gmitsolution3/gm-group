import { calculatePercentage, formatNumber } from "../../utils";
import { cn } from "@/lib/utils";

export default function StatusRow({
  label,
  value,
  total,
  icon,
  iconClassName,
  barClassName,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  iconClassName: string;
  barClassName: string;
}) {
  const percent = calculatePercentage(value, total);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn("flex h-9 w-9 items-center justify-center rounded-xl", iconClassName)}
          >
            <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold">{formatNumber(value)}</span>
          <span className="ml-1.5 text-xs text-muted-foreground font-medium">
            ({percent.toFixed(0)}%)
          </span>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className={cn("h-full rounded-full transition-all", barClassName)}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
