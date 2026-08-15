import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Mosque,
  type LucideIcon,
} from "lucide-react";

export type DashboardItem = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type DashboardVenture = {
  name: string;
  description: string;
  logo: string;
  dashboards: DashboardItem[];
};

export const dashboardVentures: DashboardVenture[] = [
  {
    name: "GM International",
    description: "International travel and related services.",
    logo: "/images/ventures/gm-international.png",

    dashboards: [
      {
        name: "Hajj & Umrah",
        description: "Manage GM International Hajj & Umrah services.",
        href: "/dashboard/venture-dashboards/umrah-hajj",
        icon: Mosque,
      },
      {
        name: "Account Analysis",
        description: "Analyze account financial performance.",
        href: "/dashboard/venture-dashboards/account-analysis",
        icon: ChartNoAxesCombined,
      },
    ],
  },

  {
    name: "GM IT Solution",
    description: "Technology and software solutions.",
    logo: "/images/ventures/gm-it-solution.webp",

    dashboards: [
      {
        name: "IT Dashboard",
        description: "Manage GM IT Solution operations.",
        href: "/dashboard/venture-dashboards/gm-it",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    name: "GM Food Point",
    description: "Food and restaurant operations.",
    logo: "/images/ventures/gm-food-point.png",

    dashboards: [
      {
        name: "Food Dashboard",
        description: "Manage GM Food Point operations.",
        href: "/dashboard/venture-dashboards/gm-food",
        icon: LayoutDashboard,
      },
    ],
  },
];
