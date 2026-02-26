'use client';

import { useAppStore } from '@/stores/app-store';
import { X, Copy, Download, Trash2 } from 'lucide-react';

export function ArtifactPanel() {
  const { artifacts, clearArtifacts, toggleArtifactPanel } = useAppStore();
  const latest = artifacts[0];

  return (
    <aside className="bg-[var(--color-bg-surface)] flex flex-col h-full w-full">
      <div className="px-4 py-3 border-b border-[var(--color-border-default)] flex items-center justify-between">
        <h3 className="text-sm font-medium">Artifacts</h3>
        <div className="flex items-center gap-1">
          {artifacts.length > 0 && (
            <button onClick={clearArtifacts} className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]" title="Clear all">
              <Trash2 size={14} />
            </button>
          )}
          <button onClick={toggleArtifactPanel} className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]">
            <X size={14} />
          </button>
        </div>
      </div>

      {artifacts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-[var(--color-text-tertiary)]">
          No artifacts yet
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {artifacts.map((a) => (
            <div key={a.id} className="p-4 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--color-accent-blue)]">{a.type}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => navigator.clipboard.writeText(a.content)}
                    className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <h4 className="text-sm font-medium mb-1">{a.title}</h4>
              <pre className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] p-2 rounded-md overflow-auto max-h-40 whitespace-pre-wrap">
                {a.content.slice(0, 500)}{a.content.length > 500 ? '...' : ''}
              </pre>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
