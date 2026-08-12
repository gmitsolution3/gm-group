import { NextResponse } from "next/server";

import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      folder: body.folder,
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
