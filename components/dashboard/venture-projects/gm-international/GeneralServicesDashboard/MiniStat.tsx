import { formatNumber } from "@/utils";

export default function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-background/70 px-3 py-2">
      <p className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">{formatNumber(value)}</p>
    </div>
  );
}
