import {
  Ban,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import RoleBadge from "./RoleBadge";
import { getInitials } from "@/utils";

export default function MobileUserCard({
  user,
}: {
  user: IUser;
}) {
  const isBanned = Boolean(user.banned);

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 rounded-xl">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "User"}
            />

            <AvatarFallback className="rounded-xl bg-violet-100 text-sm font-semibold text-violet-700">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate font-medium">
              {user.name || "Unnamed user"}
            </p>

            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RoleBadge role={user.role as string} />

        {isBanned ? (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            <Ban className="mr-1.5 h-3 w-3" />
            Banned
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 text-emerald-700"
          >
            <CheckCircle2 className="mr-1.5 h-3 w-3" />
            Active
          </Badge>
        )}
      </div>
    </div>
  );
}