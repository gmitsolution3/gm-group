import { Activity, ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Overview
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Welcome back, {user.name}.
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here's an overview of your GM Group account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Account
            </CardTitle>

            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">Active</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your account is ready to use.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Verification
            </CardTitle>

            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <Badge variant="secondary">Verified</Badge>

            <p className="mt-2 text-xs text-muted-foreground">
              Your email address is verified.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Activity
            </CardTitle>

            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">—</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Activity tracking will appear here.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>

              <p className="mt-1 font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>

              <p className="mt-1 font-medium">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
