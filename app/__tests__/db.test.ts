import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getDb, closeDb } from '@/db/index';
import { createPage, getPage, updatePage, deletePage, getPageTree } from '@/db/pages';
import { createBlock, getBlocksByPage, updateBlock, deleteBlock, reorderBlocks } from '@/db/blocks';

describe('Database - Pages', () => {
  beforeEach(() => {
    closeDb();
  });

  afterEach(() => {
    closeDb();
  });

  it('creates a page with default values', () => {
    const page = createPage('Test Page');
    expect(page.title).toBe('Test Page');
    expect(page.parentId).toBeNull();
    expect(page.id).toBeDefined();
  });

  it('creates a child page', () => {
    const parent = createPage('Parent');
    const child = createPage('Child', parent.id);
    expect(child.parentId).toBe(parent.id);
  });

  it('gets a page by id', () => {
    const page = createPage('Find Me');
    const found = getPage(page.id);
    expect(found.title).toBe('Find Me');
  });

  it('updates a page title', () => {
    const page = createPage('Old Title');
    const updated = updatePage(page.id, { title: 'New Title' });
    expect(updated.title).toBe('New Title');
  });

  it('deletes a page', () => {
    const page = createPage('Delete Me');
    deletePage(page.id);
    expect(() => getPage(page.id)).toThrow('Page not found');
  });

  it('returns page tree with parent-child relationships', () => {
    const parent = createPage('Parent');
    createPage('Child 1', parent.id);
    createPage('Child 2', parent.id);
    createPage('Root 2');

    const tree = getPageTree();
    const rootNode = tree.find((n) => n.page.id === parent.id);
    expect(rootNode).toBeDefined();
    expect(rootNode!.children).toHaveLength(2);
  });
});

describe('Database - Blocks', () => {
  let pageId: string;

  beforeEach(() => {
    closeDb();
    const page = createPage('Test Page');
    pageId = page.id;
  });

  afterEach(() => {
    closeDb();
  });

  it('creates a block', () => {
    const block = createBlock(pageId, 'paragraph', 'Hello world');
    expect(block.type).toBe('paragraph');
    expect(block.content).toBe('Hello world');
    expect(block.pageId).toBe(pageId);
  });

  it('gets blocks by page', () => {
    createBlock(pageId, 'paragraph', 'First');
    createBlock(pageId, 'heading1', 'Title');
    createBlock(pageId, 'paragraph', 'Second');

    const blocks = getBlocksByPage(pageId);
    expect(blocks).toHaveLength(3);
    expect(blocks[0].content).toBe('First');
  });

  it('updates a block', () => {
    const block = createBlock(pageId, 'paragraph', 'Old');
    const updated = updateBlock(block.id, { content: 'New content' });
    expect(updated.content).toBe('New content');
  });

  it('deletes a block', () => {
    const block = createBlock(pageId, 'paragraph', 'Delete me');
    deleteBlock(block.id);
    expect(() => getBlock(block.id)).toThrow('Block not found');
  });

  it('reorders blocks', () => {
    const b1 = createBlock(pageId, 'paragraph', 'First');
    const b2 = createBlock(pageId, 'paragraph', 'Second');
    const b3 = createBlock(pageId, 'paragraph', 'Third');

    reorderBlocks(pageId, [b3.id, b1.id, b2.id]);

    const blocks = getBlocksByPage(pageId);
    expect(blocks[0].content).toBe('Third');
    expect(blocks[1].content).toBe('First');
    expect(blocks[2].content).toBe('Second');
  });
});

function getBlock(id: string) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM blocks WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!row) throw new Error(`Block not found: ${id}`);
  return {
    id: row.id as string,
    pageId: row.page_id as string,
    type: row.type as string,
    content: row.content as string,
    order: row.order as number,
    metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
