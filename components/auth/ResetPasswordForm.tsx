"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password is too long."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  token,
  initialError,
}: {
  token?: string;
  initialError?: string | null;
}) {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(
    initialError ?? null,
  );

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setServerError(null);

    if (!token) {
      setServerError(
        "This password reset link is invalid or has expired.",
      );
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      setServerError(
        error.message || "Unable to reset your password.",
      );
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1500);
  }

  if (success) {
    return (
      <div className="space-y-7 text-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tightest text-white">
            Password updated
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            Your password has been changed successfully. Redirecting
            you to Login...
          </p>
        </div>

        <div className="mx-auto h-1 w-16 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-[shrink_1.5s_linear_forwards] rounded-full bg-indigo" />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
    >
      {/* New password */}
      <div className="space-y-3">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-white/80"
        >
          New password
        </Label>

        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-3">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-white/80"
        >
          Confirm password
        </Label>

        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.confirmPassword.message}
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

      {/* Update password */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-white text-sm font-semibold text-ink transition-all hover:bg-indigo hover:text-white"
      >
        {isSubmitting ? "Updating..." : "Update password"}
      </Button>

      {/* Back to Login */}
      <p className="pt-2 text-center text-sm text-white/40">
        Remember your password?{" "}
        <a
          href="/login"
          className="font-medium text-white transition-colors hover:text-indigo"
        >
          Login
        </a>
      </p>
    </form>
  );
}