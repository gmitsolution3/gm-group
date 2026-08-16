import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function RecentCard({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "cyan" | "rose" | "violet";
  children: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    cyan: "bg-cyan-100 text-cyan-600",
    rose: "bg-rose-100 text-rose-600",
    violet: "bg-violet-100 text-violet-600",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
          >
            {icon}
          </div>

          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}
