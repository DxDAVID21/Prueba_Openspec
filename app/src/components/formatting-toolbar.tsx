"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Code2 } from "lucide-react";

interface FormattingToolbarProps {
  editor: Editor;
}

type ToolbarButton =
  | { icon: typeof Bold; action: () => void; active: boolean; title: string }
  | { divider: true };

export function FormattingToolbar({ editor }: FormattingToolbarProps) {
  const buttons: ToolbarButton[] = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), title: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), title: "Italic" },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), title: "Strikethrough" },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive("code"), title: "Inline code" },
    { divider: true },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), title: "Heading 1" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), title: "Heading 2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), title: "Heading 3" },
    { divider: true },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), title: "Bullet list" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), title: "Numbered list" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), title: "Quote" },
    { icon: Code2, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock"), title: "Code block" },
  ];

  return (
    <div className="mb-3 flex flex-wrap items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-1.5">
      {buttons.map((btn, i) => {
        if ("divider" in btn) {
          return <div key={i} className="mx-1 h-5 w-px bg-[var(--color-border)]" />;
        }
        const Icon = btn.icon;
        return (
          <button
            key={i}
            onClick={btn.action}
            className={`rounded p-1.5 transition-colors ${
              btn.active
                ? "bg-[var(--color-accent)] text-white"
                : "hover:bg-[var(--color-hover)]"
            }`}
            title={btn.title}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
