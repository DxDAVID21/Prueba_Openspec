"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { FormattingToolbar } from "./formatting-toolbar";
import { AIToolbar } from "./ai-toolbar";
import { Loader2, FileText } from "lucide-react";

const lowlight = createLowlight(common);

interface EditorProps {
  pageId: string | null;
}

export function Editor({ pageId }: EditorProps) {
  const [saving, setSaving] = useState(false);
  const [initialContent, setInitialContent] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const currentIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pageId) {
      setLoaded(false);
      setInitialContent("");
      currentIdRef.current = null;
      return;
    }

    if (pageId === currentIdRef.current) return;
    currentIdRef.current = pageId;
    setLoaded(false);
    setInitialContent("");

    fetch(`/api/pages/${pageId}/blocks`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setInitialContent(data.html || "");
      })
      .catch(() => {
        setInitialContent("");
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [pageId]);

  const debouncedSave = useRef(
    (() => {
      let timeout: ReturnType<typeof setTimeout>;
      return (html: string, pid: string) => {
        setSaving(true);
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          try {
            await fetch(`/api/pages/${pid}/blocks`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ html }),
            });
          } catch {
            console.error("Failed to save blocks");
          }
          setSaving(false);
        }, 500);
      };
    })()
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
    ],
    content: loaded ? initialContent : "",
    onUpdate: ({ editor }) => {
      if (pageId) {
        debouncedSave.current(editor.getHTML(), pageId);
      }
    },
    editable: loaded,
  });

  if (!pageId) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-[var(--color-text-secondary)]" />
          <h2 className="mb-2 text-xl font-semibold">Select a page</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Choose a page from the sidebar or create a new one
          </p>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading page...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-4 flex items-center justify-between">
        {saving && (
          <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <Loader2 className="h-3 w-3 animate-spin" />
            Saving...
          </div>
        )}
      </div>

      {editor && <FormattingToolbar editor={editor} />}
      {editor && <AIToolbar editor={editor} />}

      <div className="prose max-w-none dark:prose-invert min-h-[300px] rounded-lg border border-[var(--color-border)] p-6 focus-within:border-[var(--color-accent)]">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 250px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: "Start writing or press '/' for commands...";
          color: var(--color-text-secondary);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror h1 { font-size: 2em; font-weight: 700; margin: 0.5em 0; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: 600; margin: 0.5em 0; }
        .ProseMirror h3 { font-size: 1.25em; font-weight: 600; margin: 0.5em 0; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5em; }
        .ProseMirror code {
          background: var(--color-code-bg);
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.9em;
        }
        .ProseMirror pre {
          background: var(--color-code-bg);
          padding: 1em;
          border-radius: 6px;
          overflow-x: auto;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
        }
        .ProseMirror blockquote {
          border-left: 3px solid var(--color-border);
          padding-left: 1em;
          color: var(--color-text-muted);
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 1.5em 0;
        }
      `}</style>
    </div>
  );
}
