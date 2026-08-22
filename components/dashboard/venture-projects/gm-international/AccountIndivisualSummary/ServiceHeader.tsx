"use client";

type ServiceHeaderProps = {
  title: string;
  count: number;
  description: string;
};

export default function ServiceHeader({
  title,
  count,
  description,
}: ServiceHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="shrink-0">
        <div className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-3 py-1.5">
          <span className="text-sm font-semibold text-foreground">
            {count}
          </span>

          <span className="ml-1.5 text-xs text-muted-foreground">
            {count === 1 ? "account" : "accounts"}
          </span>
        </div>
      </div>
    </div>
  );
}
