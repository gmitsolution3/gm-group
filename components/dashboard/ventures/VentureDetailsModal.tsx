"use client";

import { ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { IVenture } from "@/types";
import { formatDate } from "@/utils";

type VentureDetailsModalProps = {
  venture: IVenture | null;
  open: boolean;
  onClose: () => void;
};

export default function VentureDetailsModal({
  venture,
  open,
  onClose,
}: VentureDetailsModalProps) {
  if (!venture) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] !max-w-4xl overflow-hidden p-0">
        <DialogHeader className="border-b px-5 py-4 text-left sm:px-6">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-muted">
              {venture.image ? (
                <img
                  src={venture.image}
                  alt={venture.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
                  {venture.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-xl">
                {venture.name}
              </DialogTitle>

              <DialogDescription className="mt-1">
                {venture.tagline || venture.shortDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="space-y-6">
            {/* Basic information */}
            <section>
              <h3 className="text-sm font-semibold">
                Basic information
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <DetailItem label="Name" value={venture.name} />

                <DetailItem label="Slug" value={venture.slug} />

                <DetailItem
                  label="Industry"
                  value={venture.industry}
                />

                <DetailItem
                  label="Established"
                  value={venture.established || "—"}
                />

                <DetailItem
                  label="Accent"
                  value={venture.accent || "—"}
                />

                <DetailItem
                  label="Featured"
                  value={
                    venture.featured ? (
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 text-amber-700"
                      >
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not featured</Badge>
                    )
                  }
                />
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-sm font-semibold">Description</h3>

              <div className="mt-3 space-y-3">
                <DetailBlock
                  label="Short description"
                  value={venture.shortDescription}
                />

                <DetailBlock
                  label="Description"
                  value={venture.description}
                />

                <DetailBlock
                  label="What it does"
                  value={venture.whatItDoes}
                />

                <DetailBlock
                  label="Role in group"
                  value={venture.roleInGroup}
                />
              </div>
            </section>

            {/* Website */}
            <section>
              <h3 className="text-sm font-semibold">Website</h3>

              <div className="mt-3 rounded-xl border border-border/60 bg-muted/20 p-4">
                {venture.website ? (
                  <a
                    href={venture.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo hover:underline"
                  >
                    {venture.website}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No website provided.
                  </span>
                )}
              </div>
            </section>

            {/* Key information */}
            {venture.keyInfo?.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold">
                  Key information
                </h3>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {venture.keyInfo.map((item) => (
                    <DetailItem
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {venture.gallery?.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold">Gallery</h3>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {venture.gallery.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="aspect-video overflow-hidden rounded-xl border bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${venture.name} gallery ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Metadata */}
            <section>
              <h3 className="text-sm font-semibold">Metadata</h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <DetailItem
                  label="Created"
                  value={formatDate(venture.createdAt)}
                />

                <DetailItem
                  label="Last updated"
                  value={formatDate(venture.updatedAt)}
                />

                <DetailItem label="ID" value={venture._id} />
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border/60 bg-muted/20 p-4">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <div className="mt-1.5 break-words text-sm font-medium">
        {value || "—"}
      </div>
    </div>
  );
}

function DetailBlock({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
      <p className="text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed">
        {value || "—"}
      </p>
    </div>
  );
}
