import {
  ChartNoAxesCombined,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Mosque,
  WalletCards,
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
        name: "Umrah & Hajj",
        description: "GM International Umrah & Hajj services.",
        href: "/dashboard/venture-dashboards/gm-international/umrah-hajj",
        icon: Mosque,
      },
      {
        name: "Account Analysis",
        description: "Analyze account financial performance.",
        href: "/dashboard/venture-dashboards/gm-international/account-analysis",
        icon: ChartNoAxesCombined,
      },
      {
        name: "General Services",
        description:
          "Overview of student, medical, tourist, and business services.",
        href: "/dashboard/venture-dashboards/gm-international/general-services",
        icon: LayoutGrid,
      },
      {
        name: "Individual Accounts",
        description:
          "View individual account balances, payments, and outstanding dues.",
        href: "/dashboard/venture-dashboards/gm-international/account-individual-summary",
        icon: WalletCards,
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

  {
    name: "AI Learning Academy",
    description: "AI-powered learning and consultancy services.",
    logo: "/images/ventures/ai-learning-academy.webp",

    dashboards: [
      {
        name: "AI Learning Dashboard",
        description:
          "Overview of courses, batches, students, content, and consultancy.",
        href: "/dashboard/venture-dashboards/ai-learning-academy",
        icon: GraduationCap,
      },
    ],
  },
];
