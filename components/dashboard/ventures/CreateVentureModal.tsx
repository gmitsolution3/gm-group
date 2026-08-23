"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type CreateVentureModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateVentureModal({
  open,
  onClose,
}: CreateVentureModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] !max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-5 py-4 text-left sm:px-6">
          <DialogTitle className="text-xl">
            Create new venture
          </DialogTitle>

          <DialogDescription>
            Add a new venture to GM Group.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-5 py-6 sm:px-6">
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Venture creation form will be added here.
            </p>
          </div>
        </div>

        <DialogFooter className="border-t px-5 py-4 sm:px-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-indigo"
            onClick={() => {}}
          >
            Create venture
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
