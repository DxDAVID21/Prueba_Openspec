import { NextResponse } from "next/server";
import ollama from "ollama";

const MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

export async function POST(request: Request) {
  try {
    const { prompt, context } = await request.json();

    const systemPrompt = `You are a helpful writing assistant. Provide concise, relevant responses based on the user's prompt. Keep responses focused and professional.`;

    const response = await ollama.generate({
      model: MODEL,
      prompt: `${systemPrompt}\n\nContext: ${context}\n\nUser request: ${prompt}`,
      stream: false,
    });

    return NextResponse.json({ content: response.response });
  } catch (error) {
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
