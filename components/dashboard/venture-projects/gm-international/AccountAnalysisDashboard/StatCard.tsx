import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  description,
  icon,
  cardClassName,
  iconClassName,
  valueClassName,
  descriptionClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  cardClassName: string;
  iconClassName: string;
  valueClassName: string;
  descriptionClassName: string;
}) {
  return (
    <Card className={cardClassName}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-2xl font-bold ${valueClassName}`}>
          {value}
        </p>

        <p className={`mt-1 text-xs ${descriptionClassName}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
