import dbConnect from "@/connection/db_connection";
import UrlModel from "@/model/url.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } },
) {
  try {
    await dbConnect();
    const {shortId} = await params
    const urlDoc = await UrlModel.findOne({ shortened: shortId });
    console.log('urlDoc :>> ', urlDoc);
    if (!urlDoc) {
      return NextResponse.redirect("https://ahmadsiddique.dev/not-found");
    }

    return NextResponse.redirect(urlDoc.to_shortened, 302);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
