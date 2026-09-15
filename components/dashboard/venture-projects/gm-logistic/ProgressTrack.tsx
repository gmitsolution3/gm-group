import { cn } from "@/lib/utils";
import { BRAND } from "zod/v3";

export default function ProgressTrack({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all",
          barClassName,
        )}
        style={{
          width: `${width}%`,
          backgroundColor: barClassName ? undefined : BRAND,
        }}
      />
    </div>
  );
}
