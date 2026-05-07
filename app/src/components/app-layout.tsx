"use client";

import { Sidebar } from "@/components/sidebar";
import { Editor } from "@/components/editor";
import { useState, useEffect } from "react";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen && !isMobile}
        isMobile={isMobile}
        currentPageId={currentPageId}
        onToggle={() => setSidebarOpen((v) => !v)}
        onPageSelect={setCurrentPageId}
      />
      <main className="flex-1 overflow-y-auto">
        <Editor pageId={currentPageId} />
      </main>
    </div>
  );
}
