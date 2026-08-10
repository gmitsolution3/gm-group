"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function getSafeRedirectUrl(callbackUrl?: string) {
  if (!callbackUrl) {
    return "/dashboard";
  }

  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return "/dashboard";
  }

  return callbackUrl;
}

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.status === 403) {
        setServerError(
          "Please verify your email address before logging in.",
        );
      } else {
        setServerError(error.message || "Invalid email or password.");
      }

      return;
    }

    router.push(getSafeRedirectUrl(callbackUrl));
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Email */}
      <div className="space-y-3">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-white/80"
        >
          Email
        </Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-white/80"
          >
            Password
          </Label>

          <Link
            href="/forgot-password"
            className="shrink-0 text-sm text-white/40 transition-colors hover:text-indigo"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive"
        >
          {serverError}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-white text-sm font-semibold text-ink transition-all hover:bg-indigo hover:text-white"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      {/* Signup */}
      <p className="pt-2 text-center text-sm text-white/40">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-white transition-colors hover:text-indigo"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
