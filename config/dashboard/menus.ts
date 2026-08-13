import {
  Building2,
  ChartNoAxesCombined,
  LayoutDashboard,
  Mosque,
  type LucideIcon,
} from "lucide-react";

export const dashboardMenus = [
  {
    name: "Dashboard",
    description: "Overview of your workspace",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Ventures",
    description: "Manage GM Group ventures",
    href: "/dashboard/ventures",
    icon: Building2,
  },
  {
    name: "Umrah & Hajj",
    description: "GM International Umrah & Hajj services",
    href: "/dashboard/umrah-hajj",
    icon: Mosque,
  },
  {
    name: "Account Analysis",
    description: "Analyze account financial performance",
    href: "/dashboard/account-analysis",
    icon: ChartNoAxesCombined,
  },
] satisfies {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[];
