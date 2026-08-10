import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <div className="w-full">
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground">
              GM Group
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Create a new password
            </h1>

            <p className="mt-2 text-muted-foreground">
              Choose a new password for your account.
            </p>
          </div>

          <ResetPasswordForm
            token={params.token}
            initialError={
              params.error === "INVALID_TOKEN"
                ? "This password reset link is invalid or has expired."
                : null
            }
          />
        </div>
      </div>
    </main>
  );
}