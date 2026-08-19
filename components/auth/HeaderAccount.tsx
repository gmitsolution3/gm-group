"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/utils";

type HeaderAccountProps = {
  variant?: "light" | "dark";
};

export default function HeaderAccount({
  variant = "dark",
}: HeaderAccountProps) {
  const { data: session } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className={
          variant === "light"
            ? "inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            : "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-black/20 hover:bg-muted"
        }
      >
        <LogIn className="h-4 w-4" />
        Login
      </Link>
    );
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          className="rounded-full outline-none ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
        >
          <Avatar className="h-9 w-9 cursor-pointer rounded-full border border-black/10 transition-transform hover:scale-105">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "Account"}
            />

            <AvatarFallback className="rounded-full bg-indigo/10 text-xs font-semibold text-indigo">
              {getInitials(user.name || "User")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-52 rounded-xl p-1.5"
      >
        <DropdownMenuItem asChild className="rounded-lg">
          <Link
            href="/dashboard"
            className="flex cursor-pointer items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}