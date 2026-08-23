"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { usePost } from "@/hooks/api/usePost";

import { ImageUploader } from "@/components/ui/image-uploader";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createVentureSchema = z.object({
  slug: z.string().min(1, "Slug is required."),

  name: z
    .string()
    .min(2, "Venture name must be at least 2 characters.")
    .max(100, "Venture name is too long."),

  tagline: z
    .string()
    .min(2, "Tagline is required.")
    .max(200, "Tagline is too long."),

  industry: z
    .string()
    .min(2, "Industry is required.")
    .max(100, "Industry is too long."),

  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters.")
    .max(300, "Short description is too long."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),

  whatItDoes: z
    .string()
    .min(10, "Please describe what the venture does."),

  roleInGroup: z
    .string()
    .min(10, "Please describe the venture's role in GM Group."),

  website: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal("")),

  featured: z.boolean(),

  accent: z.string().min(1, "Please select an accent."),

  established: z
    .string()
    .min(4, "Please enter the establishment year.")
    .max(4, "Please enter a valid year."),

  image: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .nullable(),

  gallery: z.array(
    z.object({
      url: z.string(),
      publicId: z.string(),
    }),
  ),

  keyInfo: z.array(
    z.object({
      label: z.string().min(1, "Label is required."),
      value: z.string().min(1, "Value is required."),
    }),
  ),
});

type CreateVentureFormValues = z.infer<typeof createVentureSchema>;

type CreateVentureModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

type UploadedImage = {
  url: string;
  publicId: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateVentureModal({
  open,
  onClose,
  onCreated,
}: CreateVentureModalProps) {
  const form = useForm<CreateVentureFormValues>({
    resolver: zodResolver(createVentureSchema),

    defaultValues: {
      slug: "",
      name: "",
      tagline: "",
      industry: "",
      shortDescription: "",
      description: "",
      whatItDoes: "",
      roleInGroup: "",
      website: "",
      featured: false,
      accent: "indigo",
      established: "",
      image: null,
      gallery: [],
      keyInfo: [
        {
          label: "",
          value: "",
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = form;

  const {
    fields: keyInfoFields,
    append: appendKeyInfo,
    remove: removeKeyInfo,
  } = useFieldArray({
    control,
    name: "keyInfo",
  });

  const ventureName = watch("name");
  const featured = watch("featured");
  const accent = watch("accent");
  const image = watch("image");
  const gallery = watch("gallery");

  const {
    isLoading: isSubmitting,
    mutate: createVenture,
  } = usePost<{ message?: string }>("/ventures/insert", {
    revalidateKey: "/ventures/get-all",
  });

  /*
   * Automatically generate the slug from the venture name.
   */
  useEffect(() => {
    setValue("slug", slugify(ventureName), {
      shouldValidate: true,
    });
  }, [ventureName, setValue]);

  /*
   * Reset the form whenever the modal is opened.
   */
  useEffect(() => {
    if (open) {
      reset({
        slug: "",
        name: "",
        tagline: "",
        industry: "",
        shortDescription: "",
        description: "",
        whatItDoes: "",
        roleInGroup: "",
        website: "",
        featured: false,
        accent: "indigo",
        established: "",
        image: null,
        gallery: [],
        keyInfo: [
          {
            label: "",
            value: "",
          },
        ],
      });
    }
  }, [open, reset]);

  async function onSubmit(values: CreateVentureFormValues) {
    const payload = {
      slug: values.slug,
      name: values.name,
      tagline: values.tagline,
      industry: values.industry,
      shortDescription: values.shortDescription,
      description: values.description,
      whatItDoes: values.whatItDoes,
      roleInGroup: values.roleInGroup,
      website: values.website,
      featured: values.featured,
      accent: values.accent,
      established: values.established,

      image: values.image?.url ?? "",

      gallery: values.gallery.map((image) => image.url),

      keyInfo: values.keyInfo,
    };

    try {
      const response = await createVenture(payload);

      toast.success(
        response?.message ?? "Venture created successfully.",
      );

      reset();

      onCreated?.();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create venture.",
      );
    }
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    onClose();
  }

  function handleImageChange(image: UploadedImage | null) {
    setValue("image", image, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  function handleGalleryImageChange(
    index: number,
    image: UploadedImage | null,
  ) {
    const currentGallery = [...gallery];

    if (!image) {
      currentGallery.splice(index, 1);
    } else {
      currentGallery[index] = image;
    }

    setValue("gallery", currentGallery, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  function addGalleryImage() {
    setValue(
      "gallery",
      [
        ...gallery,
        {
          url: "",
          publicId: "",
        },
      ],
      {
        shouldDirty: true,
      },
    );
  }

  function removeGalleryImage(index: number) {
    const nextGallery = gallery.filter(
      (_, galleryIndex) => galleryIndex !== index,
    );

    setValue("gallery", nextGallery, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[90vh] !max-w-4xl flex-col overflow-hidden p-0">
        <DialogHeader className="border-b px-5 py-4 text-left sm:px-6">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create new venture
          </DialogTitle>

          <DialogDescription>
            Add a new venture to GM Group.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-col"
        >
          <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-5 py-6 sm:px-6">
            <div className="space-y-8">
              {/* Basic information */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold">
                    Basic information
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter the core information about this venture.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Venture name</Label>

                    <Input
                      id="name"
                      placeholder="GM Food Point"
                      className="h-11 rounded-xl"
                      {...register("name")}
                    />

                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>

                    <Input
                      id="slug"
                      disabled
                      className="h-11 rounded-xl bg-muted/50"
                      {...register("slug")}
                    />

                    <p className="text-xs text-muted-foreground">
                      Automatically generated from the venture name.
                    </p>

                    {errors.slug && (
                      <p className="text-sm text-destructive">
                        {errors.slug.message}
                      </p>
                    )}
                  </div>

                  {/* Tagline */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="tagline">Tagline</Label>

                    <Input
                      id="tagline"
                      placeholder="Food and restaurant operations."
                      className="h-11 rounded-xl"
                      {...register("tagline")}
                    />

                    {errors.tagline && (
                      <p className="text-sm text-destructive">
                        {errors.tagline.message}
                      </p>
                    )}
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>

                    <Input
                      id="industry"
                      placeholder="Food & Hospitality"
                      className="h-11 rounded-xl"
                      {...register("industry")}
                    />

                    {errors.industry && (
                      <p className="text-sm text-destructive">
                        {errors.industry.message}
                      </p>
                    )}
                  </div>

                  {/* Established */}
                  <div className="space-y-2">
                    <Label htmlFor="established">Established</Label>

                    <Input
                      id="established"
                      placeholder="2024"
                      maxLength={4}
                      className="h-11 rounded-xl"
                      {...register("established")}
                    />

                    {errors.established && (
                      <p className="text-sm text-destructive">
                        {errors.established.message}
                      </p>
                    )}
                  </div>

                  {/* Accent */}
                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent</Label>

                    <Select
                      value={accent}
                      onValueChange={(value) =>
                        setValue("accent", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    >
                      <SelectTrigger
                        id="accent"
                        className="h-11 rounded-xl"
                      >
                        <SelectValue placeholder="Select accent" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="indigo">
                          Indigo
                        </SelectItem>

                        <SelectItem value="teal">
                          Teal
                        </SelectItem>

                        <SelectItem value="violet">
                          Violet
                        </SelectItem>

                        <SelectItem value="amber">
                          Amber
                        </SelectItem>

                        <SelectItem value="rose">
                          Rose
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.accent && (
                      <p className="text-sm text-destructive">
                        {errors.accent.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
                  <div>
                    <p className="text-sm font-medium">
                      Featured venture
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Highlight this venture as a featured GM Group
                      venture.
                    </p>
                  </div>

                  <Switch
                    checked={featured}
                    onCheckedChange={(checked: boolean) =>
                      setValue("featured", checked, {
                        shouldDirty: true,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>
              </section>

              {/* Descriptions */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold">
                    Venture details
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe the venture and its role within GM Group.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Short description */}
                  <div className="space-y-2">
                    <Label htmlFor="short-description">
                      Short description
                    </Label>

                    <Textarea
                      id="short-description"
                      placeholder="A concise description of the venture."
                      className="min-h-24 resize-none rounded-xl"
                      {...register("shortDescription")}
                    />

                    {errors.shortDescription && (
                      <p className="text-sm text-destructive">
                        {errors.shortDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>

                    <Textarea
                      id="description"
                      placeholder="Detailed description of the venture."
                      className="min-h-32 rounded-xl"
                      {...register("description")}
                    />

                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* What it does */}
                  <div className="space-y-2">
                    <Label htmlFor="what-it-does">
                      What it does
                    </Label>

                    <Textarea
                      id="what-it-does"
                      placeholder="Explain what this venture does."
                      className="min-h-28 rounded-xl"
                      {...register("whatItDoes")}
                    />

                    {errors.whatItDoes && (
                      <p className="text-sm text-destructive">
                        {errors.whatItDoes.message}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role-in-group">
                      Role in group
                    </Label>

                    <Textarea
                      id="role-in-group"
                      placeholder="Describe this venture's role in GM Group."
                      className="min-h-28 rounded-xl"
                      {...register("roleInGroup")}
                    />

                    {errors.roleInGroup && (
                      <p className="text-sm text-destructive">
                        {errors.roleInGroup.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Website */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold">
                    Online presence
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add the venture's public website.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>

                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    className="h-11 rounded-xl"
                    {...register("website")}
                  />

                  {errors.website && (
                    <p className="text-sm text-destructive">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </section>

              {/* Images */}
              <section className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold">Images</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload the venture's main image and gallery
                    images.
                  </p>
                </div>

                {/* Main image */}
                <div className="rounded-xl border border-border/60 p-5">
                  <div className="mb-4">
                    <Label>Main image</Label>

                    <p className="mt-1 text-xs text-muted-foreground">
                      This image will represent the venture across the
                      dashboard.
                    </p>
                  </div>

                  <ImageUploader
                    value={image?.url ?? null}
                    publicId={image?.publicId ?? null}
                    onChange={handleImageChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Gallery */}
                <div className="rounded-xl border border-border/60 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Label>Gallery</Label>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Add additional images for this venture.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addGalleryImage}
                      disabled={isSubmitting}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add image
                    </Button>
                  </div>

                  {gallery.length === 0 ? (
                    <div className="mt-4 rounded-xl border border-dashed p-6 text-center">
                      <ImagePlus className="mx-auto h-6 w-6 text-muted-foreground" />

                      <p className="mt-2 text-sm text-muted-foreground">
                        No gallery images added yet.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {gallery.map((galleryImage, index) => (
                        <div
                          key={`${galleryImage.publicId}-${index}`}
                          className="rounded-xl border border-border/60 p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-medium">
                              Gallery image {index + 1}
                            </p>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() =>
                                removeGalleryImage(index)
                              }
                              disabled={isSubmitting}
                              aria-label={`Remove gallery image ${
                                index + 1
                              }`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <ImageUploader
                            value={galleryImage.url || null}
                            publicId={galleryImage.publicId || null}
                            onChange={(image) =>
                              handleGalleryImageChange(index, image)
                            }
                            disabled={isSubmitting}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Key information */}
              <section className="space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Key information
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Add structured information that will be shown
                      with the venture.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendKeyInfo({
                        label: "",
                        value: "",
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add field
                  </Button>
                </div>

                <div className="space-y-3">
                  {keyInfoFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid gap-3 rounded-xl border border-border/60 p-4 sm:grid-cols-[1fr_1fr_auto]"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`key-info-label-${index}`}>
                          Label
                        </Label>

                        <Input
                          id={`key-info-label-${index}`}
                          placeholder="Industry"
                          className="h-10 rounded-xl"
                          {...register(`keyInfo.${index}.label`)}
                        />

                        {errors.keyInfo?.[index]?.label && (
                          <p className="text-xs text-destructive">
                            {errors.keyInfo[index]?.label?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`key-info-value-${index}`}>
                          Value
                        </Label>

                        <Input
                          id={`key-info-value-${index}`}
                          placeholder="Food & Hospitality"
                          className="h-10 rounded-xl"
                          {...register(`keyInfo.${index}.value`)}
                        />

                        {errors.keyInfo?.[index]?.value && (
                          <p className="text-xs text-destructive">
                            {errors.keyInfo[index]?.value?.message}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-destructive hover:text-destructive"
                          onClick={() => removeKeyInfo(index)}
                          disabled={
                            isSubmitting ||
                            keyInfoFields.length === 1
                          }
                          aria-label={`Remove key information field ${
                            index + 1
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <DialogFooter className="border-t px-5 py-4 sm:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-indigo"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create venture"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}