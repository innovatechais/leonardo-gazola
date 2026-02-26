'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { api } from '@/lib/api-client';
import { useAppStore } from '@/stores/app-store';
import { getFileIcon, getFileType } from '@/lib/file-icons';
import { ChevronRight, ChevronDown, RefreshCw, Search } from 'lucide-react';

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  extension?: string;
  protected?: boolean;
}

interface ContextMenu {
  x: number;
  y: number;
  node: TreeNode;
}

interface InlineInput {
  parentPath: string;
  kind: 'file' | 'folder';
}

// ─── Context Menu Overlay ────────────────────────────────────────────
function ContextMenuOverlay({
  menu,
  onClose,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
}: {
  menu: ContextMenu;
  onClose: () => void;
  onNewFile: () => void;
  onNewFolder: () => void;
  onRename: () => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const items = [
    { label: 'New File', action: onNewFile },
    { label: 'New Folder', action: onNewFolder },
    { label: 'Rename', action: onRename },
    { label: 'Delete', action: onDelete, danger: true },
  ];

  return (
    <div
      ref={ref}
      className="fixed z-50 min-w-[140px] py-1 rounded-md shadow-lg border"
      style={{
        left: menu.x,
        top: menu.y,
        background: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-default)',
      }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => { item.action(); onClose(); }}
          className="w-full text-left px-3 py-1.5 text-xs hover:bg-[var(--color-border-subtle)] transition-colors"
          style={{ color: item.danger ? 'var(--color-accent-red, #e55)' : 'var(--color-text-primary)' }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ─── Confirmation Dialog ─────────────────────────────────────────────
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="rounded-lg p-4 shadow-xl border max-w-sm w-full mx-4"
        style={{
          background: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-default)',
        }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs rounded border hover:bg-[var(--color-border-subtle)] transition-colors"
            style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-xs rounded text-white transition-colors"
            style={{ background: 'var(--color-accent-red, #e55)' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Inline Name Input ───────────────────────────────────────────────
function InlineNameInput({
  initialValue,
  onSubmit,
  onCancel,
  depth,
}: {
  initialValue?: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
  depth: number;
}) {
  const [value, setValue] = useState(initialValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (initialValue) inputRef.current?.select();
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value.trim());
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center px-2 py-0.5" style={{ paddingLeft: `${depth * 16 + 8}px` }}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onCancel}
        className="w-full text-xs px-1.5 py-0.5 rounded border focus:outline-none"
        style={{
          background: 'var(--color-bg-primary)',
          borderColor: 'var(--color-accent-blue)',
          color: 'var(--color-text-primary)',
        }}
      />
    </div>
  );
}

// ─── Tree Item ───────────────────────────────────────────────────────
function TreeItem({
  node,
  depth = 0,
  onContextMenu,
  renamingPath,
  onRenameSubmit,
  onRenameCancel,
  inlineInput,
  onInlineSubmit,
  onInlineCancel,
}: {
  node: TreeNode;
  depth?: number;
  onContextMenu: (e: React.MouseEvent, node: TreeNode) => void;
  renamingPath: string | null;
  onRenameSubmit: (oldPath: string, newName: string) => void;
  onRenameCancel: () => void;
  inlineInput: InlineInput | null;
  onInlineSubmit: (name: string) => void;
  onInlineCancel: () => void;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const { openTab } = useAppStore();

  const handleClick = () => {
    if (node.type === 'directory') {
      setExpanded(!expanded);
    } else {
      openTab({
        path: node.path,
        name: node.name,
        type: getFileType(node.name),
      });
    }
  };

  const isRenaming = renamingPath === node.path;
  const showInlineHere =
    inlineInput &&
    ((node.type === 'directory' && inlineInput.parentPath === node.path) ||
      (node.type === 'file' && inlineInput.parentPath === node.path));

  // Auto-expand directory when creating inside it
  useEffect(() => {
    if (inlineInput && node.type === 'directory' && inlineInput.parentPath === node.path) {
      setExpanded(true);
    }
  }, [inlineInput, node.type, node.path]);

  if (isRenaming) {
    return (
      <InlineNameInput
        initialValue={node.name}
        onSubmit={(newName) => onRenameSubmit(node.path, newName)}
        onCancel={onRenameCancel}
        depth={depth}
      />
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        onContextMenu={(e) => onContextMenu(e, node)}
        className="w-full flex items-center gap-1 px-2 py-1 text-left text-sm hover:bg-[var(--color-border-subtle)] rounded transition-colors group"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === 'directory' ? (
          expanded ? <ChevronDown size={14} className="text-[var(--color-text-tertiary)] flex-shrink-0" /> : <ChevronRight size={14} className="text-[var(--color-text-tertiary)] flex-shrink-0" />
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        <span className="flex-shrink-0">{getFileIcon(node.name, node.type === 'directory')}</span>
        <span className="truncate text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">
          {node.name}
        </span>
        {node.protected && <span className="text-[10px] ml-auto">🔒</span>}
      </button>
      {node.type === 'directory' && expanded && (
        <>
          {showInlineHere && (
            <InlineNameInput
              onSubmit={onInlineSubmit}
              onCancel={onInlineCancel}
              depth={depth + 1}
            />
          )}
          {node.children?.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              onContextMenu={onContextMenu}
              renamingPath={renamingPath}
              onRenameSubmit={onRenameSubmit}
              onRenameCancel={onRenameCancel}
              inlineInput={inlineInput}
              onInlineSubmit={onInlineSubmit}
              onInlineCancel={onInlineCancel}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ─── FileTree Root ───────────────────────────────────────────────────
export function FileTree() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TreeNode | null>(null);
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [inlineInput, setInlineInput] = useState<InlineInput | null>(null);

  const loadTree = useCallback(() => {
    setLoading(true);
    api.getFileTree()
      .then(setTree)
      .catch(() => setTree([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadTree(); }, [loadTree]);

  const filterTree = (nodes: TreeNode[], q: string): TreeNode[] => {
    if (!q) return nodes;
    return nodes.reduce<TreeNode[]>((acc, node) => {
      if (node.name.toLowerCase().includes(q.toLowerCase())) {
        acc.push(node);
      } else if (node.children) {
        const filtered = filterTree(node.children, q);
        if (filtered.length > 0) acc.push({ ...node, children: filtered });
      }
      return acc;
    }, []);
  };

  // ── Context menu handlers ──────────────────────────────────────────

  const handleContextMenu = useCallback((e: React.MouseEvent, node: TreeNode) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, node });
  }, []);

  const getParentPath = (nodePath: string, nodeType: string) => {
    if (nodeType === 'directory') return nodePath;
    const parts = nodePath.split('/');
    parts.pop();
    return parts.join('/') || '';
  };

  const handleNewFile = useCallback(() => {
    if (!contextMenu) return;
    const parentPath = getParentPath(contextMenu.node.path, contextMenu.node.type);
    setInlineInput({ parentPath, kind: 'file' });
  }, [contextMenu]);

  const handleNewFolder = useCallback(() => {
    if (!contextMenu) return;
    const parentPath = getParentPath(contextMenu.node.path, contextMenu.node.type);
    setInlineInput({ parentPath, kind: 'folder' });
  }, [contextMenu]);

  const handleInlineSubmit = useCallback(async (name: string) => {
    if (!inlineInput) return;
    const fullPath = inlineInput.parentPath ? `${inlineInput.parentPath}/${name}` : name;
    try {
      if (inlineInput.kind === 'folder') {
        await api.createFolder(fullPath);
      } else {
        await api.createFile(fullPath, '');
      }
      loadTree();
    } catch (err) {
      console.error('Failed to create:', err);
    }
    setInlineInput(null);
  }, [inlineInput, loadTree]);

  const handleRename = useCallback(() => {
    if (!contextMenu) return;
    setRenamingPath(contextMenu.node.path);
  }, [contextMenu]);

  const handleRenameSubmit = useCallback(async (oldPath: string, newName: string) => {
    const parts = oldPath.split('/');
    parts.pop();
    const newPath = parts.length > 0 ? `${parts.join('/')}/${newName}` : newName;
    try {
      // Read old content, create new, delete old
      const isFile = !tree.some(function findDir(n: TreeNode): boolean {
        if (n.path === oldPath) return n.type === 'directory';
        return n.children?.some(findDir) || false;
      });
      if (isFile) {
        const content = await api.getFile(oldPath);
        await api.createFile(newPath, content);
        await api.deleteFile(oldPath);
      }
      // For directories, a simple rename via read/write isn't feasible client-side.
      // Just reload to show any server-side changes.
      loadTree();
    } catch (err) {
      console.error('Rename failed:', err);
    }
    setRenamingPath(null);
  }, [loadTree, tree]);

  const handleDelete = useCallback(() => {
    if (!contextMenu) return;
    setConfirmDelete(contextMenu.node);
  }, [contextMenu]);

  const confirmDeleteAction = useCallback(async () => {
    if (!confirmDelete) return;
    try {
      await api.deleteFile(confirmDelete.path);
      loadTree();
    } catch (err) {
      console.error('Delete failed:', err);
    }
    setConfirmDelete(null);
  }, [confirmDelete, loadTree]);

  const filtered = filterTree(tree, filter);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[var(--color-border-default)] flex items-center gap-2">
        <h3 className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)] flex-1">Explorer</h3>
        <button onClick={loadTree} className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]">
          <RefreshCw size={12} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter files..."
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded pl-7 pr-2 py-1 text-xs focus:outline-none focus:border-[var(--color-accent-blue)]"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {loading ? (
          <div className="px-3 py-4 text-xs text-[var(--color-text-tertiary)]">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="px-3 py-4 text-xs text-[var(--color-text-tertiary)]">No files found</div>
        ) : (
          filtered.map((node) => (
            <TreeItem
              key={node.path}
              node={node}
              onContextMenu={handleContextMenu}
              renamingPath={renamingPath}
              onRenameSubmit={handleRenameSubmit}
              onRenameCancel={() => setRenamingPath(null)}
              inlineInput={inlineInput}
              onInlineSubmit={handleInlineSubmit}
              onInlineCancel={() => setInlineInput(null)}
            />
          ))
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenuOverlay
          menu={contextMenu}
          onClose={() => setContextMenu(null)}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
