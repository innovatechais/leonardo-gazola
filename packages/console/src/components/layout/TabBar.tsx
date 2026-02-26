'use client';

import { useAppStore } from '@/stores/app-store';
import { X } from 'lucide-react';
import { getFileIcon } from '@/lib/file-icons';

export function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useAppStore();

  if (tabs.length === 0) return null;

  return (
    <div className="flex-shrink-0 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-default)] flex items-center overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`group flex items-center gap-1.5 px-3 py-2 text-xs border-r border-[var(--color-border-subtle)] cursor-pointer transition-colors ${
            tab.id === activeTabId
              ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-b-2 border-b-[var(--color-accent-blue)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>{getFileIcon(tab.name)}</span>
          <span className="max-w-[120px] truncate">{tab.name}</span>
          {tab.dirty && <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)]" />}
          <button
            onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
            className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-[var(--color-border-default)] text-[var(--color-text-tertiary)]"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
