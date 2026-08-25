import Image from "next/image";

import { IVenture } from "@/types";

import { cn } from "@/lib/utils";

type VentureLogoProps = {
  venture: Pick<IVenture, "name" | "image">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-16 w-16 text-xs",
  md: "h-20 w-20 text-sm",
  lg: "h-24 w-24 text-base",
} as const;

export default function VentureLogo({
  venture,
  size = "md",
  className,
}: VentureLogoProps) {
  const initials =
    venture.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "GM";

  const imageSizes =
    size === "sm"
      ? "64px"
      : size === "md"
        ? "80px"
        : "96px";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        "border border-white/60 bg-white",
        "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        "backdrop-blur-xl backdrop-saturate-150",
        sizeClasses[size],
        className,
      )}
    >

      {venture.image ? (
        <div className="relative z-10 h-full w-full p-2.5">
          <Image
            src={venture.image}
            alt=""
            fill
            sizes={imageSizes}
            className="object-contain p-1"
          />
        </div>
      ) : (
        <span className="relative z-10 font-display font-extrabold tracking-tighter text-ink">
          {initials}
        </span>
      )}
    </div>
  );
}