import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guards";
import { cloudinary } from "@/lib/cloudinary";

const ALLOWED_FOLDERS = new Set(["gm-group"]);

export async function POST(request: Request) {
  try {
    await requireAuth();

    const body = await request.json();

    const folder = typeof body.folder === "string" ? body.folder : "";

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json(
        {
          message: "Invalid upload folder.",
        },
        {
          status: 400,
        },
      );
    }

    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Unable to generate upload signature.",
      },
      {
        status: 500,
      },
    );
  }
}
