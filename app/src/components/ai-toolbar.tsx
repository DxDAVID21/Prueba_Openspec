"use client";

import { type Editor } from "@tiptap/react";
import { useState } from "react";
import { Sparkles, Loader2, X, Wand2, ScrollText, Pencil, Check } from "lucide-react";

interface AIToolbarProps {
  editor: Editor;
}

export function AIToolbar({ editor }: AIToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [ollamaAvailable, setOllamaAvailable] = useState<boolean | null>(null);

  const checkOllama = async () => {
    try {
      const res = await fetch("/api/ai/health");
      setOllamaAvailable(res.ok);
    } catch {
      setOllamaAvailable(false);
    }
  };

  if (ollamaAvailable === null) {
    void checkOllama();
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context: editor.getText() }),
      });
      if (res.ok) {
        const data = await res.json();
        editor.chain().focus().insertContent(data.content).run();
      }
    } catch {
      console.error("AI generation failed");
    }
    setLoading(false);
    setPrompt("");
    setIsOpen(false);
  };

  const handleAction = async (action: string) => {
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(
      selection.from,
      selection.to,
      " "
    );

    if (!selectedText && action !== "continue") return;

    setLoading(true);
    const promptMap: Record<string, string> = {
      continue: "Continue writing from here:",
      rephrase: `Rephrase this text: ${selectedText}`,
      grammar: `Fix grammar in this text: ${selectedText}`,
      summarize: `Summarize this text: ${selectedText}`,
    };

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptMap[action],
          context: selectedText || editor.getText(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (action === "rephrase" || action === "grammar" || action === "summarize") {
          editor.chain().focus().deleteSelection().insertContent(data.content).run();
        } else {
          editor.chain().focus().insertContent(data.content).run();
        }
      }
    } catch {
      console.error("AI action failed");
    }
    setLoading(false);
  };

  if (ollamaAvailable === false) {
    return (
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm">
        <Sparkles className="h-4 w-4 text-[var(--color-text-secondary)]" />
        <span className="text-[var(--color-text-secondary)]">
          Ollama not detected.{" "}
          <span className="text-[var(--color-accent)]">
            Install Ollama to enable AI features.
          </span>
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-accent)] hover:bg-[var(--color-hover)]"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI
        </button>
        <button
          onClick={() => handleAction("continue")}
          disabled={loading}
          className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] disabled:opacity-50"
          title="Continue writing"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
          Continue
        </button>
        <button
          onClick={() => handleAction("rephrase")}
          disabled={loading}
          className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] disabled:opacity-50"
          title="Rephrase selected text"
        >
          <Pencil className="h-3 w-3" />
          Rephrase
        </button>
        <button
          onClick={() => handleAction("summarize")}
          disabled={loading}
          className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] disabled:opacity-50"
          title="Summarize selected text"
        >
          <ScrollText className="h-3 w-3" />
          Summarize
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                AI Assistant
              </h3>
              <button onClick={() => setIsOpen(false)} className="rounded p-1 hover:bg-[var(--color-hover)]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What should I write about?"
              className="mb-3 w-full rounded border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-sm focus:border-[var(--color-accent)] focus:outline-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) handleGenerate();
              }}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded px-3 py-1.5 text-sm hover:bg-[var(--color-hover)]"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Generate
              </button>
            </div>
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
              Press Ctrl+Enter to generate
            </p>
          </div>
        </div>
      )}
    </>
  );
}
