export default function MiniMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className={`rounded-xl px-3 py-2 ${className}`}>
      <p className="text-[10px] font-medium uppercase tracking-wide opacity-70">
        {label}
      </p>

      <p className="mt-0.5 truncate text-xs font-bold">{value}</p>
    </div>
  );
}
