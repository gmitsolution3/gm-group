"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import UserDashboardLoader from "./UsersDashboardLoader";
import {IUser} from "@/types";

const PAGE_SIZE = 10;

export default function UsersDashboard() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    const offset = (page - 1) * PAGE_SIZE;

    const { data, error } = await authClient.admin.listUsers({
      query: {
        limit: PAGE_SIZE,
        offset,
        searchValue: searchValue || undefined,
        searchField: "name",
        searchOperator: "contains",
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

    if (error || !data) {
      setIsError(true);
      setUsers([]);
      setTotal(0);
      setIsLoading(false);
      return;
    }

    setUsers(data.users as IUser[]);
    setTotal(data.total);
    setIsLoading(false);
  }, [page, searchValue]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  function handleSearch() {
    setPage(1);
    setSearchValue(search.trim());
  }

  function handleClearSearch() {
    setSearch("");
    setSearchValue("");
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (isLoading) {
    return <UserDashboardLoader />;
  }

  if (isError) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-red-100 bg-red-50/50">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Shield className="h-6 w-6" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              Couldn't load users
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There was a problem retrieving the user list.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-5"
              onClick={() => void fetchUsers()}
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Administration
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage users, roles, and account access.
        </p>
      </div>

      {/* User list */}
      <Card>
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>User list</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {total} {total === 1 ? "user" : "users"} registered
              </p>
            </div>

            {/* Search */}
            <div className="flex w-full gap-2 lg:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search by name..."
                  className="pl-9"
                />
              </div>

              <Button type="button" onClick={handleSearch}>
                Search
              </Button>

              {searchValue && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearSearch}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {users.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <UserRound className="h-6 w-6 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-semibold">No users found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border md:block">
                <div className="grid grid-cols-[minmax(220px,1.5fr)_minmax(220px,1.5fr)_120px_130px_56px] items-center gap-4 border-b bg-muted/40 px-4 py-3 text-xs font-semibold text-muted-foreground">
                  <span>User</span>
                  <span>Contact</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span />
                </div>

                <div className="divide-y">
                  {users.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile list */}
              <div className="space-y-3 md:hidden">
                {users.map((user) => (
                  <MobileUserCard
                    key={user.id}
                    user={user}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={page === 1}
                      onClick={() => setPage((current) => current - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={page === totalPages}
                      onClick={() => setPage((current) => current + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserRow({ user }: { user: IUser }) {
  const isBanned = Boolean(user.banned);

  return (
    <div className="grid grid-cols-[minmax(220px,1.5fr)_minmax(220px,1.5fr)_120px_130px_56px] items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/20">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar
          name={user.name}
          image={user.image}
        />

        <div className="min-w-0">
          <p className="truncate font-medium">
            {user.name || "Unnamed user"}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            Joined {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

          <span className="truncate text-sm">{user.email}</span>
        </div>
      </div>

      {/* Role */}
      <div>
        <RoleBadge role={user.role as string} />
      </div>

      {/* Status */}
      <div>
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

      {/* Actions */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        title="User actions will be added next"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}

function MobileUserCard({ user }: { user: IUser }) {
  const isBanned = Boolean(user.banned);

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar
            name={user.name}
            image={user.image}
          />

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

function RoleBadge({ role }: { role?: string }) {
  const isAdmin = role === "admin";

  return (
    <Badge
      variant="outline"
      className={
        isAdmin
          ? "border-violet-200 bg-violet-50 text-violet-700"
          : "border-slate-200 bg-slate-50 text-slate-700"
      }
    >
      {isAdmin ? (
        <ShieldCheck className="mr-1.5 h-3 w-3" />
      ) : (
        <UserRound className="mr-1.5 h-3 w-3" />
      )}

      {isAdmin ? "Admin" : "User"}
    </Badge>
  );
}

function UserAvatar({
  name,
  image,
}: {
  name?: string;
  image?: string | null;
}) {
  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U";

  if (image) {
    return (
      <img
        src={image}
        alt={name || "User"}
        className="h-10 w-10 shrink-0 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-700">
      {initials}
    </div>
  );
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}