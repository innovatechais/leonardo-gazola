'use client';

import { useAppStore } from '@/stores/app-store';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Menu, Search, Columns3, Terminal as TerminalIcon } from 'lucide-react';

export function TopBar() {
  const { sidebarOpen, toggleSidebar, toggleArtifactPanel, toggleTerminal, activeProject, setActiveProject } = useAppStore();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  return (
    <header className="h-12 flex-shrink-0 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-default)] flex items-center px-4 gap-3">
      {!sidebarOpen && (
        <button onClick={toggleSidebar} className="p-1.5 rounded-md hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
          <Menu size={18} />
        </button>
      )}

      {/* Project Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--color-text-tertiary)]">Project:</span>
        <select
          value={activeProject || ''}
          onChange={(e) => {
            const slug = e.target.value;
            setActiveProject(slug || null);
            if (slug) api.selectProject(slug).catch(() => {});
          }}
          className="text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-md px-2 py-1 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
        >
          <option value="">Select project...</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>{p.name || p.slug}</option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-[var(--color-accent-blue)]"
          />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex items-center gap-1">
        <button onClick={toggleTerminal} className="p-1.5 rounded-md hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]" title="Toggle Terminal">
          <TerminalIcon size={18} />
        </button>
        <button onClick={toggleArtifactPanel} className="p-1.5 rounded-md hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]" title="Toggle Artifact Panel">
          <Columns3 size={18} />
        </button>
      </div>
    </header>
  );
}
