import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  User,
  Settings,
  Shield,
} from "lucide-react";

export type DashboardRole = "user" | "admin";

export type DashboardIcon =
  | "dashboard"
  | "user"
  | "settings"
  | "shield";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: DashboardIcon;
};

export const dashboardNavigation: Record<
  DashboardRole,
  DashboardNavItem[]
> = {
  user: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
    },
    {
      title: "Administration",
      href: "/dashboard/admin",
      icon: "shield",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};

export const dashboardIcons: Record<
  DashboardIcon,
  LucideIcon
> = {
  dashboard: LayoutDashboard,
  user: User,
  settings: Settings,
  shield: Shield,
};