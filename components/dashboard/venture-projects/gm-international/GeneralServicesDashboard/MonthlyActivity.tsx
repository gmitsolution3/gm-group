import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { TrendItem } from "@/types";

import EmptyState from "./EmptyState";

function formatMonth(item: TrendItem) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(
    new Date(
      item._id.year,
      item._id.month - 1,
    ),
  );
}

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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <TrendingUp className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>
              Monthly activity
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Recent {service.toLowerCase()} volume.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {sortedItems.length === 0 ? (
          <EmptyState text="No monthly activity available." />
        ) : (
          <div className="space-y-5">
            {sortedItems.map((item, index) => {
              const width =
                (item.count / maxActivity) *
                100;

              return (
                <div
                  key={`${service}-${item._id.year}-${item._id.month}-${index}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatMonth(item)}
                      </span>

                      <Badge
                        variant="outline"
                        className="text-[10px]"
                      >
                        {service}
                      </Badge>
                    </div>

                    <span className="text-sm font-bold text-indigo-700">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-indigo-50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
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