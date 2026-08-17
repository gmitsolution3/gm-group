"use client";

import {
  Ban,
  CheckCircle2,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IUser } from "@/types";

interface UserActionsProps {
  user: IUser;
  onSuccess: () => void;
}

export default function UserActions({
  user,
  onSuccess,
}: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = user.role === "admin";
  const isBanned = Boolean(user.banned);

  async function handleRoleChange() {
    setIsLoading(true);

    const { error } = await authClient.admin.setRole({
      userId: user.id,
      role: isAdmin ? "user" : "admin",
    });

    setIsLoading(false);

    if (error) {
      return;
    }

    onSuccess();
  }

  async function handleBanToggle() {
    setIsLoading(true);

    if (isBanned) {
      const { error } = await authClient.admin.unbanUser({
        userId: user.id,
      });

      setIsLoading(false);

      if (error) {
        return;
      }
    } else {
      const { error } = await authClient.admin.banUser({
        userId: user.id,
        banReason: "Banned by administrator",
      });

      setIsLoading(false);

      if (error) {
        return;
      }
    }

    onSuccess();
  }

  async function handleDelete() {
    setIsLoading(true);

    const { error } = await authClient.admin.removeUser({
      userId: user.id,
    });

    setIsLoading(false);

    if (error) {
      return;
    }

    onSuccess();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isLoading}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          disabled={isLoading}
          onClick={handleRoleChange}
        >
          {isAdmin ? (
            <>
              <UserRound className="mr-2 h-4 w-4" />
              Make user
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Make admin
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isLoading}
          onClick={handleBanToggle}
        >
          {isBanned ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Unban user
            </>
          ) : (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Ban user
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isLoading}
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
