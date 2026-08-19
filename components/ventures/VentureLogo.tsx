import { cn } from "@/lib/utils";

import { ventureAccentMap, type Venture } from "@/content/ventures";

type VentureLogoProps = {
  venture: Pick<Venture, "name" | "accent">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-10 w-10 text-xs",
  md: "h-14 w-14 text-sm",
  lg: "h-20 w-20 text-lg",
} as const;

export default function VentureLogo({
  venture,
  size = "md",
  className,
}: VentureLogoProps) {
  const accent = ventureAccentMap[venture.accent];

  const initials =
    venture.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "GM";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        "font-display font-bold tracking-tight",
        sizeClasses[size],
        accent.bg,
        className,
      )}
    >
      <span className="text-white">{initials}</span>
    </div>
  );
}
