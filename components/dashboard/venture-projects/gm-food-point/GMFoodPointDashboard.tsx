"use client";

import { cn } from "@/lib/utils";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const tabs = [
  {
    value: "statistics",
    label: "Statistics",
  },
  {
    value: "finance",
    label: "Finance",
  },
] as const;

type TabValue = (typeof tabs)[number]["value"];

function isValidTab(value: string | null): value is TabValue {
  return tabs.some((tab) => tab.value === value);
}

export default function GMFoodPointDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab");
  const activeTab: TabValue = isValidTab(currentTab)
    ? currentTab
    : "statistics";

  const handleTabChange = (tab: TabValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "statistics") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="w-full">
      <div className="mx-auto !max-w-[1400px] px-5 py-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Food Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            GM Food Point
          </p>
        </div>

        <div className="border-b border-border">
          <div className="flex items-center gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTabChange(tab.value)}
                  className={cn(
                    "relative whitespace-nowrap pb-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-indigo"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}

                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-indigo" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-8">
          {activeTab === "statistics" && (
            <div className="rounded-xl border border-border p-6">
              Statistics
            </div>
          )}

          {activeTab === "finance" && (
            <div className="rounded-xl border border-border p-6">
              Finance
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
