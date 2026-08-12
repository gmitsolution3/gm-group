"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
    role: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    null,
  );

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setServerError(null);
    setSuccessMessage(null);

    const { error } = await authClient.updateUser({
      name: values.name,
      phone: values.phone,
    });

    if (error) {
      setServerError(
        error.message || "Unable to update your profile.",
      );
      return;
    }

    setSuccessMessage("Your profile has been updated.");
  }

  return (
    <div className="space-y-8">
      {/* Profile image */}
      <div className="flex items-center gap-5">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name}
          />

          <AvatarFallback className="text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">
            Profile photo
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Profile image management will be added next.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>

            <Input
              id="name"
              autoComplete="name"
              placeholder="Your name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>

            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 555 000 0000"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="bg-muted"
          />

          <p className="text-xs text-muted-foreground">
            Your email address is managed separately from your
            profile.
          </p>
        </div>

        {/* Account role */}
        <div className="space-y-2">
          <Label htmlFor="role">Account role</Label>

          <Input
            id="role"
            value={user.role}
            disabled
            className="bg-muted capitalize"
          />

          <p className="text-xs text-muted-foreground">
            Your account role can only be changed by an administrator.
          </p>
        </div>

        {/* Error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {serverError}
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div
            role="status"
            className="rounded-xl border border-teal/20 bg-teal/5 p-4 text-sm text-teal"
          >
            {successMessage}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full px-6"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
