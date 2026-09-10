import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface GraphicsMultimediaDashboardErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function GraphicsMultimediaDashboardError({
  message,
  onRetry,
}: GraphicsMultimediaDashboardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-border bg-card p-12 text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <Image className="h-12 w-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          Unable to load dashboard data
        </h3>
        <p className="text-muted-foreground">
          {message || "Failed to fetch dashboard data"}
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={onRetry} variant="outline">
          Retry
        </Button>
      </div>
    </div>
  );
}