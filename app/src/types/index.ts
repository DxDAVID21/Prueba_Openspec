export interface Page {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Block {
  id: string;
  pageId: string;
  type: BlockType;
  content: string;
  order: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type BlockType =
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'todoList'
  | 'codeBlock'
  | 'quote'
  | 'divider';

export interface PageTree {
  page: Page;
  children: PageTree[];
}
