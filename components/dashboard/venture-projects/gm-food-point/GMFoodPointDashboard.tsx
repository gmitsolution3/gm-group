"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  WalletCards,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const tabs = [
  {
    value: "statistics",
    label: "Statistics",
    icon: BarChart3,
  },
  {
    value: "finance",
    label: "Finance",
    icon: WalletCards,
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

        {/* Tabs */}
        <section>
          <div className="rounded-2xl border border-border/70 bg-card p-2">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTabChange(tab.value)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isActive
                        ? "bg-indigo text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab Content */}
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