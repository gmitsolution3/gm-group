import {
  Building2,
  FileText,
  FolderKanban,
  Mosque,
  LayoutDashboard,
  Settings,
  Users,
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
    name: "Projects",
    description: "Manage projects and initiatives",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Users",
    description: "Manage registered users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Applications",
    description: "Review user applications",
    href: "/dashboard/applications",
    icon: FileText,
  },
  {
    name: "Settings",
    description: "Manage dashboard settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
] satisfies {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[];
