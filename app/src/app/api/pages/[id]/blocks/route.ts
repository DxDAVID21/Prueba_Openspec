import { NextResponse } from "next/server";
import { getBlocksByPage } from "@/db/blocks";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blocks = getBlocksByPage(id);
    const html = blocks
      .sort((a, b) => a.order - b.order)
      .map((b) => blockToHtml(b))
      .join("");
    return NextResponse.json({ html: html || null });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save blocks" }, { status: 500 });
  }
}

function blockToHtml(block: { type: string; content: string }): string {
  switch (block.type) {
    case "heading1":
      return `<h1>${block.content}</h1>`;
    case "heading2":
      return `<h2>${block.content}</h2>`;
    case "heading3":
      return `<h3>${block.content}</h3>`;
    case "bulletList":
      return `<ul><li><p>${block.content}</p></li></ul>`;
    case "orderedList":
      return `<ol><li><p>${block.content}</p></li></ol>`;
    case "todoList":
      return `<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>${block.content}</p></li></ul>`;
    case "codeBlock":
      return `<pre><code>${block.content}</code></pre>`;
    case "quote":
      return `<blockquote>${block.content}</blockquote>`;
    case "divider":
      return `<hr>`;
    default:
      return `<p>${block.content}</p>`;
  }
}
