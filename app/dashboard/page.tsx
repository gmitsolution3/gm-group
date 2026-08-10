import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Dashboard
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