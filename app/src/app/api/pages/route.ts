import { NextResponse } from "next/server";
import { getPageTree, createPage } from "@/db/pages";

export async function GET() {
  try {
    const tree = getPageTree();
    return NextResponse.json(tree);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, parentId } = body;
    const page = createPage(title || "Untitled", parentId || null);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
