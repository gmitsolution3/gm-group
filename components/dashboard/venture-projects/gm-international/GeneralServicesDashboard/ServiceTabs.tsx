"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Plane,
} from "lucide-react";

export type ServiceType =
  | "student"
  | "medical"
  | "tourist"
  | "business";

type ServiceTabsProps = {
  activeService: ServiceType;
  onChange: (service: ServiceType) => void;
};

const services: {
  value: ServiceType;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    value: "student",
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: "medical",
    label: "Medical",
    icon: HeartPulse,
  },
  {
    value: "tourist",
    label: "Tourist",
    icon: Plane,
  },
  {
    value: "business",
    label: "Business",
    icon: BriefcaseBusiness,
  },
];

export default function ServiceTabs({
  activeService,
  onChange,
}: ServiceTabsProps) {
  return (
    <section>
      <div className="rounded-2xl border border-border/70 bg-card p-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeService === service.value;

            return (
              <button
                key={service.value}
                type="button"
                onClick={() => onChange(service.value)}
                className={[
                  "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "bg-indigo text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />

                <span>{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
