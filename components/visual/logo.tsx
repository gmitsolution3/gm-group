import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/images/logo.png"
        alt="GM Group"
        width={42}
        height={42}
        className="h-9 w-9 object-contain"
        priority
      />
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tightest",
          variant === "light" ? "text-white" : "text-ink",
        )}
      >
        GM<span className="font-medium text-mutedText"> Group</span>
      </span>
    </span>
  );
}
