"use client";

import { Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDelete } from "@/hooks/api/useDelete";

import { Venture } from "@/types";

import { toast } from "sonner";

type DeleteVentureModalProps = {
  venture: Venture | null;
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteVentureModal({
  venture,
  open,
  onClose,
  onDeleted,
}: DeleteVentureModalProps) {
  const { mutate: deleteVenture, isLoading: isDeleting } = useDelete(
    "/ventures/del",
    {
      revalidateKey: "/ventures/get-all",
    },
  );

  async function handleDelete() {
    if (!venture || isDeleting) {
      return;
    }

    try {
      await deleteVenture(venture._id);

      toast.success("Venture deleted successfully.");

      onDeleted?.();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete venture.",
      );

      // Keep the dialog open so the user can retry.
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !isDeleting) {
          onClose();
        }
      }}
    >
      <AlertDialogContent className="!max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete venture?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {venture?.name}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              void handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete venture
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
