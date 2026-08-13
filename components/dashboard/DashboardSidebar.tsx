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
import Image from "next/image";

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
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-border/70"
    >
      {/* Brand */}
      <SidebarHeader className="border-b border-border/70 px-3 py-4">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/60"
        >
          <div className="flex min-w-0 items-center">
            <Image
              src="/images/logo.png"
              alt="GM Group"
              width={150}
              height={150}
              className="h-12 w-12 object-contain mt-5"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="font-display text-sm font-bold tracking-tight text-foreground">
              GM Group
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {role === "admin" ? "Administration" : "Workspace"}
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-5">
        <div className="mb-3 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Workspace
          </p>
        </div>

        <SidebarMenu className="gap-1">
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
                  className={[
                    "h-10 rounded-xl px-3",
                    "text-sm font-medium",
                    "transition-all duration-200",
                    "hover:bg-muted/70",
                    "data-[active=true]:bg-indigo/[0.08]",
                    "data-[active=true]:text-indigo",
                    "data-[active=true]:shadow-none",
                    "data-[active=true]:hover:bg-indigo/[0.10]",
                  ].join(" ")}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Current user */}
      <SidebarFooter className="border-t border-border/70 p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <Avatar className="h-9 w-9 shrink-0 border border-border/70">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name}
            />

            <AvatarFallback className="bg-ink text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
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
