import { formatNumber } from "@/utils";

export default function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-3.5 py-3 transition-all hover:bg-muted/40">
      <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-foreground">
        {formatNumber(value)}
      </p>
    </div>
  );
}
