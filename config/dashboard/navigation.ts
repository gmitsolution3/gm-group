import {
  BarChart3,
  Building2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export const dashboardIcons = {
  dashboard: LayoutDashboard,
  user: User,
  settings: Settings,
  users: Users,
  building: Building2,
  documents: FileText,
  analytics: BarChart3,
  projects: FolderKanban,
} satisfies Record<string, LucideIcon>;

export type DashboardIcon = keyof typeof dashboardIcons;

export type DashboardRole = "user" | "admin";

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
      title: "Applications",
      href: "/dashboard/applications",
      icon: "documents",
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
      title: "Ventures",
      href: "/dashboard/ventures",
      icon: "building",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: "projects",
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "users",
    },
  ],
};
