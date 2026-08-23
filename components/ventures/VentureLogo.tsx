import { cn } from "@/lib/utils";

import { ventureAccentMap, type Venture } from "@/content/ventures";

type VentureLogoProps = {
  venture: Pick<Venture, "name" | "accent" | "image">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-16 w-16 text-xs",
  md: "h-20 w-20 text-sm",
  lg: "h-24 w-24 text-lg",
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
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        sizeClasses[size],
        `${accent.bg}15`,
        className,
      )}
    >
      {venture.image ? (
        <img
          src={venture.image}
          alt=""
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="font-display font-bold tracking-tight text-white">
          {initials}
        </span>
      )}
    </div>
  );
}