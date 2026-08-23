import { ventureAccentMap, type Venture } from "@/content/ventures";

import { cn } from "@/lib/utils";

interface VentureLogoProps {
  venture: Venture;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Venture visual mark.
 *
 * Uses the venture image when available,
 * otherwise falls back to the abstract typographic mark.
 */
export function VentureLogo({
  venture,
  size = "md",
  className,
}: VentureLogoProps) {
  const accent = ventureAccentMap[venture.accent];

  const sizes = {
    sm: {
      box: "h-16 w-16",
      text: "text-xs",
    },
    md: {
      box: "h-20 w-20",
      text: "text-sm",
    },
    lg: {
      box: "h-24 w-24",
      text: "text-base",
    },
  };

  const s = sizes[size];

  const initials = venture.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
        s.box,
        className,
      )}
      style={{ backgroundColor: `${accent.hex}15` }}
      aria-hidden="true"
    >
      {venture.image ? (
        <img
          src={venture.image}
          alt=""
          className="h-full w-full object-contain"
        />
      ) : (
        <>
          <div
            className="absolute -right-1 -top-1 h-6 w-6 rounded-full opacity-60"
            style={{
              backgroundColor: accent.hex,
              mixBlendMode: "screen",
            }}
          />

          <div
            className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full opacity-40"
            style={{
              backgroundColor: accent.hex,
              mixBlendMode: "screen",
            }}
          />

          <span
            className={cn(
              "relative font-display font-extrabold tracking-tighter",
              s.text,
            )}
            style={{ color: accent.hex }}
          >
            {initials}
          </span>
        </>
      )}
    </div>
  );
}