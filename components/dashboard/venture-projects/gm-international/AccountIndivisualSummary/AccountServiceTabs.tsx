"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Plane,
  ShieldCheck,
} from "lucide-react";

export type ServiceType =
  | "student"
  | "medical"
  | "tourist"
  | "business"
  | "visa";

type ServiceTab = {
  value: ServiceType;
  label: string;
  icon: React.ElementType;
};

const services: ServiceTab[] = [
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
  {
    value: "visa",
    label: "Visa",
    icon: ShieldCheck,
  },
];

export { services };

export default function AccountServiceTabs({
  activeService,
  onChange,
}: {
  activeService: ServiceType;
  onChange: (service: ServiceType) => void;
}) {
  return (
    <div className="border-b border-border">
      <div className="flex w-full overflow-x-auto">
        {services.map((service) => {
          const Icon = service.icon;
          const isActive =
            activeService === service.value;

          return (
            <button
              key={service.value}
              type="button"
              onClick={() => onChange(service.value)}
              className={[
                "relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />

              <span>{service.label}</span>

              {isActive && (
                <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}