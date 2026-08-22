export default function ServiceHeader({
  title,
  count,
  description,
}: {
  title: string;
  count: number;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        <span className="shrink-0 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          {count}{" "}
          {count === 1
            ? "account"
            : "accounts"}
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}