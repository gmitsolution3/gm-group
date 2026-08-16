export default function StatusRow({
  label,
  value,
  total,
  icon,
  iconClassName,
  barClassName,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  iconClassName: string;
  barClassName: string;
}) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>
          </div>

          <span className="text-sm font-medium">{label}</span>
        </div>

        <div className="text-right">
          <span className="text-sm font-semibold">{value}</span>

          <span className="ml-1 text-xs text-muted-foreground">
            ({percentage}%)
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barClassName}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
