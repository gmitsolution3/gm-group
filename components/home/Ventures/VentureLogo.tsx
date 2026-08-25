import Image from "next/image";

import { IVenture } from "@/types";

import { cn } from "@/lib/utils";

interface VentureLogoProps {
  venture: IVenture;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Venture visual mark.
 *
 * Uses the venture image when available,
 * otherwise falls back to a typographic mark.
 */
export function VentureLogo({
  venture,
  size = "md",
  className,
}: VentureLogoProps) {
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
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        "border border-white/60",
        "bg-white",
        "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        "backdrop-blur-xl backdrop-saturate-150",
        s.box,
        className,
      )}
      aria-hidden="true"
    >
      {/* Glass highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 via-white/20 to-transparent" />

      {venture.image ? (
        <div className="relative z-10 h-full w-full p-2.5">
          <Image
            src={venture.image}
            alt=""
            fill
            sizes={
              size === "sm"
                ? "64px"
                : size === "md"
                  ? "80px"
                  : "96px"
            }
            className="object-contain p-1"
          />
        </div>
      ) : (
        <span
          className={cn(
            "relative z-10 font-display font-extrabold tracking-tighter text-ink",
            s.text,
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}