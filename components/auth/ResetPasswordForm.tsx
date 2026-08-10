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

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
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
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Password updated</h2>

        <p className="text-sm text-muted-foreground">
          Your password has been changed successfully. Redirecting you
          to sign in...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>

        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>

        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
