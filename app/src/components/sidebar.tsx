"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, Plus, ChevronRight, ChevronDown, FileText, Trash2, Moon, Sun, Search, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { PageTree } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  currentPageId: string | null;
  onToggle: () => void;
  onPageSelect: (pageId: string) => void;
}

export function Sidebar({ isOpen, isMobile, currentPageId, onToggle, onPageSelect }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [pages, setPages] = useState<PageTree[]>([]);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch {
      console.error("Failed to fetch pages");
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleCreatePage = async () => {
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled" }),
      });
      if (res.ok) {
        const newPage = await res.json();
        await fetchPages();
        onPageSelect(newPage.id);
        setExpandedPages((prev) => {
          const next = new Set(prev);
          if (newPage.parentId) next.add(newPage.parentId);
          return next;
        });
      }
    } catch {
      console.error("Failed to create page");
    }
  };

  const toggleExpand = (pageId: string) => {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  };

  const filteredPages = searchQuery
    ? pages.filter((node) =>
        node.page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-sm font-semibold">NotionAI</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="rounded p-1 hover:bg-[var(--color-sidebar-hover)]"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded p-1 hover:bg-[var(--color-sidebar-hover)]"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-3 py-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages..."
            className="w-full rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm focus:border-[var(--color-accent)] focus:outline-none"
            autoFocus
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filteredPages.length === 0 && (
          <div className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
            No pages yet
          </div>
        )}
        {filteredPages.map((node) => (
          <PageNode
            key={node.page.id}
            node={node}
            depth={0}
            expanded={expandedPages}
            currentPageId={currentPageId}
            onToggle={toggleExpand}
            onSelect={onPageSelect}
          />
        ))}
      </div>

      <div className="border-t border-[var(--color-border)] px-3 py-2">
        <button
          onClick={handleCreatePage}
          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-text-primary)]"
        >
          <Plus className="h-4 w-4" />
          New Page
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={onToggle}
          className="fixed left-3 top-3 z-50 rounded-md bg-[var(--color-sidebar)] p-2 shadow-md md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onToggle}
          />
        )}
        <aside
          className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r border-[var(--color-border)] bg-[var(--color-sidebar)] transition-transform md:relative md:w-64 md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`flex flex-col border-r border-[var(--color-border)] bg-[var(--color-sidebar)] transition-all duration-200 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute right-0 top-3 z-10 -mr-3 rounded-full bg-[var(--color-border)] p-1 hover:bg-[var(--color-sidebar-hover)]"
        title="Toggle sidebar"
      >
        <Menu className="h-3 w-3" />
      </button>
      {isOpen && sidebarContent}
    </aside>
  );
}

function PageNode({
  node,
  depth,
  expanded,
  currentPageId,
  onToggle,
  onSelect,
}: {
  node: PageTree;
  depth: number;
  expanded: Set<string>;
  currentPageId: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const isExpanded = expanded.has(node.page.id);
  const hasChildren = node.children.length > 0;
  const isActive = currentPageId === node.page.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1 rounded py-1 pr-2 text-sm ${
          isActive
            ? "bg-[var(--color-sidebar-active)] font-medium"
            : "hover:bg-[var(--color-sidebar-hover)]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={() => onSelect(node.page.id)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.page.id);
            }}
            className="rounded p-0.5 hover:bg-[var(--color-hover)]"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-secondary)]" />
        <span className="truncate">{node.page.title || "Untitled"}</span>
      </div>
      {isExpanded &&
        node.children.map((child) => (
          <PageNode
            key={child.page.id}
            node={child}
            depth={depth + 1}
            expanded={expanded}
            currentPageId={currentPageId}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}
