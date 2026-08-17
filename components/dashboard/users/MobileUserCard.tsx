import { Ban, CheckCircle2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types";
import { getInitials } from "@/utils";
import RoleBadge from "./RoleBadge";
import UserActions from "./UserActions";

interface MobileUserCardProps {
  user: IUser;
  onSuccess: () => void;
}

export default function MobileUserCard({
  user,
  onSuccess,
}: MobileUserCardProps) {
  const isBanned = Boolean(user.banned);

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

        <UserActions user={user} onSuccess={onSuccess} />
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
