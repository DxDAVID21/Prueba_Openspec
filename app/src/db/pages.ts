import { getDb } from './index';
import type { Page, PageTree } from '@/types';

export function createPage(title: string, parentId: string | null = null): Page {
  const db = getDb();
  const id = crypto.randomUUID();

  const maxOrder = db.prepare(
    'SELECT COALESCE(MAX("order"), -1) as max_order FROM pages WHERE parent_id IS ?'
  ).get(parentId === null ? null : parentId) as { max_order: number };

  const order = maxOrder.max_order + 1;

  db.prepare(
    'INSERT INTO pages (id, title, parent_id, "order") VALUES (?, ?, ?, ?)'
  ).run(id, title, parentId, order);

  return getPage(id);
}

export function getPage(id: string): Page {
  const db = getDb();
  const row = db.prepare('SELECT * FROM pages WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!row) throw new Error(`Page not found: ${id}`);
  return mapPage(row);
}

export function updatePage(id: string, updates: { title?: string; parentId?: string | null; order?: number }): Page {
  const db = getDb();
  const parts: string[] = [];
  const values: unknown[] = [];

  if (updates.title !== undefined) {
    parts.push('title = ?');
    values.push(updates.title);
    parts.push('updated_at = datetime(\'now\')');
  }
  if (updates.parentId !== undefined) {
    parts.push('parent_id = ?');
    values.push(updates.parentId);
    parts.push('updated_at = datetime(\'now\')');
  }
  if (updates.order !== undefined) {
    parts.push('"order" = ?');
    values.push(updates.order);
    parts.push('updated_at = datetime(\'now\')');
  }

  if (parts.length === 0) return getPage(id);

  values.push(id);
  db.prepare(`UPDATE pages SET ${parts.join(', ')} WHERE id = ?`).run(...values);
  return getPage(id);
}

export function deletePage(id: string): void {
  const db = getDb();
  db.prepare('DELETE FROM pages WHERE id = ?').run(id);
}

export function getPageTree(): PageTree[] {
  const db = getDb();
  const pages = db.prepare('SELECT * FROM pages ORDER BY parent_id, "order"').all() as Record<string, unknown>[];
  const pageMap = new Map<string, PageTree>();

  pages.forEach((row) => {
    const page = mapPage(row);
    pageMap.set(page.id, { page, children: [] });
  });

  const roots: PageTree[] = [];
  pages.forEach((row) => {
    const page = mapPage(row);
    const node = pageMap.get(page.id)!;
    if (page.parentId === null) {
      roots.push(node);
    } else {
      const parent = pageMap.get(page.parentId);
      if (parent) parent.children.push(node);
    }
  });

  return roots;
}

export function getAllPages(): Page[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM pages ORDER BY updated_at DESC').all() as Record<string, unknown>[];
  return rows.map(mapPage);
}

export function savePageContent(id: string, content: string): Page {
  const db = getDb();
  db.prepare(
    'UPDATE pages SET content = ?, updated_at = datetime(\'now\') WHERE id = ?'
  ).run(content, id);
  return getPage(id);
}

function mapPage(row: Record<string, unknown>): Page {
  return {
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    parentId: row.parent_id as string | null,
    order: row.order as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
