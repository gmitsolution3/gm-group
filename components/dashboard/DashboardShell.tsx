"use client";

import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";

import type {
  DashboardNavItem,
  DashboardRole,
} from "@/config/dashboard/navigation";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardShellProps {
  children: ReactNode;
  role: DashboardRole;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  navigation: DashboardNavItem[];
}

export function DashboardShell({
  children,
  role,
  user: initialUser,
  navigation,
}: DashboardShellProps) {
  const { data: session } = authClient.useSession();

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      }
    : initialUser;

  return (
    <SidebarProvider>
      <DashboardSidebar
        role={role}
        user={user}
        navigation={navigation}
      />

      <SidebarInset>
        <DashboardHeader user={user} />

        <main className="min-h-[calc(100vh-4rem)] bg-muted/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}