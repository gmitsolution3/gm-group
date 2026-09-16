import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { formatNumber } from "../../utils";
import { cn } from "@/lib/utils";

type OverviewCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
};

export default function OverviewCard({
  title,
  value,
  description,
  icon,
  className,
  iconClassName,
}: OverviewCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-border/90 hover:shadow-sm",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>

            <p className="text-3xl font-extrabold tracking-tight text-foreground">
              {formatNumber(value)}
            </p>

            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              iconClassName ??
                "bg-muted/60 text-foreground"
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}