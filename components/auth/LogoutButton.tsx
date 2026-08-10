"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await authClient.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
