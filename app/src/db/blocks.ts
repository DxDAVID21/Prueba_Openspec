import { getDb } from './index';
import type { Block, BlockType } from '@/types';

export function createBlock(pageId: string, type: string, content: string, order?: number): Block {
  const db = getDb();
  const id = crypto.randomUUID();

  const finalOrder = order ?? getMaxBlockOrder(pageId) + 1;

  db.prepare(
    'INSERT INTO blocks (id, page_id, type, content, "order") VALUES (?, ?, ?, ?, ?)'
  ).run(id, pageId, type, content, finalOrder);

  return getBlock(id);
}

export function getBlock(id: string): Block {
  const db = getDb();
  const row = db.prepare('SELECT * FROM blocks WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!row) throw new Error(`Block not found: ${id}`);
  return mapBlock(row);
}

export function getBlocksByPage(pageId: string): Block[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM blocks WHERE page_id = ? ORDER BY "order"').all(pageId) as Record<string, unknown>[];
  return rows.map(mapBlock);
}

export function updateBlock(id: string, updates: { type?: string; content?: string; order?: number }): Block {
  const db = getDb();
  const parts: string[] = [];
  const values: unknown[] = [];

  if (updates.type !== undefined) {
    parts.push('type = ?');
    values.push(updates.type);
  }
  if (updates.content !== undefined) {
    parts.push('content = ?');
    values.push(updates.content);
  }
  if (updates.order !== undefined) {
    parts.push('"order" = ?');
    values.push(updates.order);
  }

  parts.push('updated_at = datetime(\'now\')');
  values.push(id);

  db.prepare(`UPDATE blocks SET ${parts.join(', ')} WHERE id = ?`).run(...values);
  return getBlock(id);
}

export function deleteBlock(id: string): void {
  const db = getDb();
  db.prepare('DELETE FROM blocks WHERE id = ?').run(id);
}

export function reorderBlocks(pageId: string, blockIds: string[]): void {
  const db = getDb();
  const stmt = db.prepare('UPDATE blocks SET "order" = ? WHERE id = ? AND page_id = ?');

  const updateMany = db.transaction((tuples: [number, string, string][]) => {
    for (const [order, id, pid] of tuples) {
      stmt.run(order, id, pid);
    }
  });

  const tuples = blockIds.map((id, index) => [index, id, pageId] as [number, string, string]);
  updateMany(tuples);
}

function getMaxBlockOrder(pageId: string): number {
  const db = getDb();
  const result = db.prepare(
    'SELECT COALESCE(MAX("order"), -1) as max_order FROM blocks WHERE page_id = ?'
  ).get(pageId) as { max_order: number };
  return result.max_order;
}

function mapBlock(row: Record<string, unknown>): Block {
  return {
    id: row.id as string,
    pageId: row.page_id as string,
    type: row.type as BlockType,
    content: row.content as string,
    order: row.order as number,
    metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
