import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guards";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    await requireAuth();

    const body = await request.json();

    const publicId =
      typeof body.publicId === "string" ? body.publicId : "";

    if (!publicId) {
      return NextResponse.json(
        {
          message: "Missing Cloudinary public ID.",
        },
        {
          status: 400,
        },
      );
    }

    // Only allow assets inside our GM Group folder.
    if (publicId !== "gm-group" && !publicId.startsWith("gm-group/")) {
      return NextResponse.json(
        {
          message: "Invalid Cloudinary asset.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        {
          message: "Unable to delete image from Cloudinary.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to delete image.",
      },
      {
        status: 500,
      },
    );
  }
}
