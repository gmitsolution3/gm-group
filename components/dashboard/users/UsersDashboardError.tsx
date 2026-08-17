import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function UsersDashboardError({
  fetchUsers,
}: {
  fetchUsers: () => Promise<void>;
}) {
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
