import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const colorMap = {
  blue: {
    icon: "bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    card: "from-blue/[0.04]",
  },
  cyan: {
    icon: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400",
    card: "from-cyan/[0.04]",
  },
  rose: {
    icon: "bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    card: "from-rose/[0.04]",
  },
  violet: {
    icon: "bg-violet-100/80 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
    card: "from-violet/[0.04]",
  },
};

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
  const colors = colorMap[color];

  return (
    <Card className={cn(
      "rounded-2xl border border-border/70 bg-gradient-to-br via-card to-card shadow-xs transition-all hover:border-border/90 hover:shadow-sm",
      colors.card,
    )}>
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            colors.icon,
          )}>
            {icon}
          </div>

          <CardTitle className="text-base font-bold">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}
