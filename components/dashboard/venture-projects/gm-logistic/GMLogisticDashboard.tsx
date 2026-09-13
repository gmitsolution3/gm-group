"use client";
import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { dashboardVentures } from "@/config/dashboard/ventures";

export default function GMLogisticDashboard() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8">
      {dashboardVentures.find((v) => v.name === "GM Logistic") && (
        <VentureHeader
          selectedVenture={
            dashboardVentures.find((v) => v.name === "GM Logistic")!
          }
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Deliveries", value: "1,240", sub: "This month" },
          {
            title: "Fleet Size",
            value: "84",
            sub: "Active vehicles",
          },
          { title: "On-Time %", value: "94.2%", sub: "Performance" },
          { title: "Warehouses", value: "12", sub: "Operational" },
        ].map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border bg-gradient-to-br from-slate-50 to-card p-6 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{s.title}</p>
            <p className="text-3xl font-extrabold mt-2">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-card p-8 text-center text-muted-foreground">
        <p className="text-lg">
          Dummy content — logistics analytics coming soon.
        </p>
      </div>
    </div>
  );
}
