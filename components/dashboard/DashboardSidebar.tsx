"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  dashboardIcons,
  type DashboardNavItem,
  type DashboardRole,
} from "@/config/dashboard/navigation";

interface DashboardSidebarProps {
  role: DashboardRole;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  navigation: DashboardNavItem[];
}

export function DashboardSidebar({
  role,
  user,
  navigation,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-2 py-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
            GM
          </div>

          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight">
              GM Group
            </span>

            <span className="text-xs text-muted-foreground">
              {role === "admin" ? "Administration" : "Workspace"}
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {navigation.map((item) => {
            const Icon = dashboardIcons[item.icon];

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name}
            />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user.name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
