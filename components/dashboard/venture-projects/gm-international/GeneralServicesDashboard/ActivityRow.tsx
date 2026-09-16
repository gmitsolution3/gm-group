import { Badge } from "@/components/ui/badge";

function statusClass(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
    case "paid":
    case "delivered":
      return "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-400";

    case "rejected":
    case "failed":
      return "border-rose-200/80 bg-rose-50 text-rose-700 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-400";

    case "pending":
      return "border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-400";

    default:
      return "border-border/60 bg-muted/30 text-muted-foreground";
  }
}

export default function ActivityRow({
  name,
  description,
  date,
  badges,
}: {
  name: string;
  description: string;
  date: string;
  badges: string[];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">
          {name}
        </p>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          {description}
        </p>

        <p className="mt-1 text-[11px] text-muted-foreground">
          {date}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 shrink-0">
        {badges.filter(Boolean).map((badge, index) => (
          <Badge
            key={`${badge}-${index}`}
            variant="outline"
            className={`text-[10px] font-semibold px-2 py-0 ${statusClass(badge)}`}
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
}
