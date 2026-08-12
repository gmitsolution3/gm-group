"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const router = useRouter();

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <Separator
          orientation="vertical"
          className="h-5"
        />

        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <Bell className="h-4 w-4" />

          <span className="sr-only">
            Notifications
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name}
                />

                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}