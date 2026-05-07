import { NextResponse } from "next/server";

const OLLAMA_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

export async function POST(request: Request) {
  try {
    const { prompt, context } = await request.json();

    const systemPrompt = `You are a helpful writing assistant. Provide concise, relevant responses based on the user's prompt. Keep responses focused and professional.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt: `${systemPrompt}\n\nContext: ${context}\n\nUser request: ${prompt}`,
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Ollama returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ content: data.response || "" });
  } catch (error) {
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
