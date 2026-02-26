'use client';

import { useAppStore } from '@/stores/app-store';
import { GitBranch, Folder, Bot } from 'lucide-react';

export function StatusBar() {
  const { activeProject, tabs } = useAppStore();

  return (
    <footer className="h-6 flex-shrink-0 bg-[var(--color-accent-blue)] text-white flex items-center px-3 text-[11px] gap-4">
      <span className="flex items-center gap-1">
        <GitBranch size={12} /> main
      </span>
      <span className="flex items-center gap-1">
        <Folder size={12} /> {activeProject || 'No project'}
      </span>
      <span className="flex items-center gap-1">
        <Bot size={12} /> 15 squads
      </span>
      <span className="ml-auto">{tabs.length} file{tabs.length !== 1 ? 's' : ''} open</span>
    </footer>
  );
}
