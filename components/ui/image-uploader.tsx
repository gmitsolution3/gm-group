"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: string | null;

  publicId?: string | null;

  onChange: (
    image: {
      url: string;
      publicId: string;
    } | null,
  ) => void;

  folder?: string;

  disabled?: boolean;

  className?: string;
}

type UploadedImage = {
  url: string;
  publicId: string;
};

export function ImageUploader({
  value,
  publicId,
  onChange,
  folder = "gm-group",
  disabled = false,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentImage, setCurrentImage] =
    useState<UploadedImage | null>(
      value && publicId
        ? {
            url: value,
            publicId,
          }
        : null,
    );

  const [isUploading, setIsUploading] = useState(false);

  const [isRemoving, setIsRemoving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /*
   * Sync with external value changes.
   *
   * This allows the parent to provide a new image
   * after a profile refresh or another external update.
   *
   * We intentionally do not clear the local image here
   * merely because the parent still has the old props while
   * a remove operation is in progress.
   */
  useEffect(() => {
    if (value && publicId) {
      setCurrentImage({
        url: value,
        publicId,
      });
    }
  }, [value, publicId]);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    // Allow selecting the same file again.
    event.target.value = "";

    if (!file) {
      return;
    }

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);

    try {
      /*
       * Get a signed Cloudinary upload request
       * from our server.
       */
      const signatureResponse = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folder,
        }),
      });

      const signatureResult = await signatureResponse.json();

      if (!signatureResponse.ok) {
        throw new Error(
          signatureResult?.message ||
            "Unable to prepare the image upload.",
        );
      }

      const { signature, timestamp, apiKey, cloudName } =
        signatureResult;

      /*
       * Upload directly to Cloudinary.
       */
      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadResult?.error?.message || "Image upload failed.",
        );
      }

      const image: UploadedImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };

      /*
       * Update the uploader UI immediately.
       */
      setCurrentImage(image);

      /*
       * Give the image information to the parent.
       */
      onChange(image);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemove() {
    if (isUploading || isRemoving || disabled) {
      return;
    }

    setError(null);

    if (!currentImage?.publicId) {
      setError("Unable to identify this image.");
      return;
    }

    setIsRemoving(true);

    try {
      const response = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: currentImage.publicId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to remove image.",
        );
      }

      /*
       * Cloudinary deletion succeeded.
       *
       * Clear the local UI immediately.
       */
      setCurrentImage(null);

      /*
       * Tell the parent that the image
       * has been removed.
       */
      onChange(null);
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "Unable to remove image.",
      );
    } finally {
      setIsRemoving(false);
    }
  }

  function handleSelect() {
    if (isUploading || isRemoving || disabled) {
      return;
    }

    inputRef.current?.click();
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || isUploading || isRemoving}
        className="hidden"
      />

      {currentImage ? (
        <div className="space-y-3">
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={currentImage.url}
              alt="Uploaded image"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading || isRemoving}
              aria-label="Remove image"
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black disabled:pointer-events-none disabled:opacity-50"
            >
              {isRemoving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelect}
            disabled={disabled || isUploading || isRemoving}
          >
            {isUploading ? "Uploading..." : "Change image"}
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSelect}
          disabled={disabled || isUploading || isRemoving}
          className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}

          <span className="text-xs font-medium">
            {isUploading ? "Uploading..." : "Add image"}
          </span>
        </button>
      )}

      {error && (
        <p
          role="alert"
          className="mt-2 max-w-xs text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}