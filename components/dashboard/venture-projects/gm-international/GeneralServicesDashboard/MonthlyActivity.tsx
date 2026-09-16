import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { TrendItem } from "@/types";
import { calculatePercentage, formatMonth, formatNumber } from "../../utils";

import EmptyState from "./EmptyState";

export default function MonthlyActivity({
  items,
  service,
}: {
  items: TrendItem[];
  service: string;
}) {
  const maxActivity = Math.max(
    ...items.map((item) => item.count),
    1,
  );

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(
        a._id.year,
        a._id.month - 1,
      ).getTime() -
      new Date(
        b._id.year,
        b._id.month - 1,
      ).getTime(),
  );

  return (
    <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
            <TrendingUp className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-base font-bold">
              Monthly activity
            </CardTitle>

            <CardDescription className="text-xs">
              Recent {service.toLowerCase()} volume.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {sortedItems.length === 0 ? (
          <EmptyState text="No monthly activity available." />
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item, index) => {
              const width = calculatePercentage(item.count, maxActivity);

              return (
                <div
                  key={`${service}-${item._id.year}-${item._id.month}-${index}`}
                  className="rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:bg-muted/30"
                >
                  <div className="mb-2.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-foreground">
                        {formatMonth(item._id)}
                      </span>

                      <Badge
                        variant="outline"
                        className="text-[10px] font-medium"
                      >
                        {service}
                      </Badge>
                    </div>

                    <span className="text-sm font-bold text-indigo">
                      {formatNumber(item.count)}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          width,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}