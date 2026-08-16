import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function OverviewCard({
  title,
  value,
  description,
  icon,
  className,
  iconClassName,
  valueClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  className: string;
  iconClassName: string;
  valueClassName: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-3xl font-bold ${valueClassName}`}>
          {value}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
