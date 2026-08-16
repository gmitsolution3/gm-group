import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/utils";
import MiniStat from "./MiniStat";

export default function ServiceCard({
  title,
  description,
  icon,
  value,
  approved,
  pending,
  rejected,
  className,
  iconClassName,
  accentClassName,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number;
  approved: number;
  pending: number;
  rejected: number;
  className: string;
  iconClassName: string;
  accentClassName: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
          >
            {icon}
          </div>

          <span className={`text-2xl font-bold ${accentClassName}`}>
            {formatNumber(value)}
          </span>
        </div>

        <h3 className="mt-5 font-display font-bold">{title}</h3>

        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <MiniStat label="Approved" value={approved} />

          <MiniStat label="Pending" value={pending} />

          <MiniStat label="Rejected" value={rejected} />
        </div>
      </CardContent>
    </Card>
  );
}
