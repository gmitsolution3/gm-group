import { Users } from "lucide-react";

export default function EmptyUsersState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-10 text-center">
      <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Users className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        No recent users to display
      </p>
    </div>
  );
}
