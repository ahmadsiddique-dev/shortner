import dbConnect from "@/connection/db_connection";
import UrlModel from "@/model/url.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data: { slug: string } = await req.json();

  if (!data || !data.slug) {
    return NextResponse.json(
      { success: false, message: "Kindly input slug" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const response = await UrlModel.findOne({ shortened: data.slug });

    if (response) {
      return NextResponse.json(
        { success: false, message: "Slug is already taken" },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
