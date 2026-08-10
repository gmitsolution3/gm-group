import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user.name}
      </h1>

      <p className="mt-2 text-muted-foreground">
        You are signed in.
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}