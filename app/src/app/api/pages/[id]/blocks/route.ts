import { NextResponse } from "next/server";
import { getPage, savePageContent } from "@/db/pages";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = getPage(id);
    return NextResponse.json({ html: page.content || null });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { html } = await request.json();
    savePageContent(id, html || "");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save blocks" }, { status: 500 });
  }
}
