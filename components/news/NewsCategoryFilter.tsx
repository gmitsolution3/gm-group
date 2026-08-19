"use client";

import { cn } from "@/lib/utils";

type NewsCategoryFilterProps = {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
};

export default function NewsCategoryFilter({
  categories,
  value,
  onChange,
}: NewsCategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      role="tablist"
      aria-label="News categories"
    >
      {categories.map((category) => {
        const isActive = category === value;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-ink text-white"
                : "border border-black/10 bg-white text-muted-foreground hover:border-black/20 hover:text-ink",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}