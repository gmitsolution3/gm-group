import { Badge } from "@/components/ui/badge";

function statusClass(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
    case "paid":
    case "delivered":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "rejected":
    case "failed":
      return "border-red-200 bg-red-50 text-red-700";

    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
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
    <div className="flex flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-medium">{name}</p>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          {description}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">{date}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.filter(Boolean).map((badge, index) => (
          <Badge
            key={`${badge}-${index}`}
            variant="outline"
            className={statusClass(badge)}
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
}
