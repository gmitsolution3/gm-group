import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
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
              Welcome back
            </h1>

            <p className="mt-2 text-muted-foreground">
              Sign in to your GM Group account.
            </p>
          </div>

          <LoginForm callbackUrl={params.callbackUrl} />
        </div>
      </div>
    </main>
  );
}
