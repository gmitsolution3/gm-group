"use client";

import { X } from "lucide-react";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type AccountDetail = {
  label: string;
  value: ReactNode;
};

type AccountDetailsModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  details: AccountDetail[];
  onClose: () => void;
};

export default function AccountDetailsModal({
  open,
  title,
  subtitle,
  details,
  onClose,
}: AccountDetailsModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-h-[90vh] !max-w-4xl overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="border-b px-5 py-4 text-left sm:px-6">
          <DialogTitle className="truncate text-lg font-semibold tracking-tight">
            {title}
          </DialogTitle>

          {subtitle && (
            <DialogDescription className="truncate text-sm">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Content */}
        <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="min-w-0 rounded-xl border border-border/60 bg-muted/20 p-4"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {detail.label}
                </p>

                <div className="mt-1.5 min-w-0 break-words text-sm font-medium">
                  {detail.value ?? "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t px-5 py-4 sm:px-6">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}