import { formatNumber } from "@/utils";

export default function CountCard({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <p className="text-xs font-medium opacity-70">{label}</p>

      <p className="mt-1 text-2xl font-bold">{formatNumber(count)}</p>
    </div>
  );
}
