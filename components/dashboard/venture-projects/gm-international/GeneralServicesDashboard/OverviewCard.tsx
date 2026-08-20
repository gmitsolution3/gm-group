import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-4 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              iconClassName ??
              "bg-muted text-foreground"
            }`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}