import { NextResponse } from "next/server";
import ollama from "ollama";

export async function GET() {
  try {
    await ollama.list();
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}
