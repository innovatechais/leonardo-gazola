'use client';

import { useAppStore } from '@/stores/app-store';
import {
  LayoutDashboard, MessageSquare, FolderTree, Database,
  Bot, GitBranch, Package, Settings, ChevronLeft, Palette,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'files', label: 'Files', icon: FolderTree },
  { id: 'sca', label: 'SCA Engine', icon: Database },
  { id: 'squads', label: 'Squads', icon: Bot },
  { id: 'pipelines', label: 'Pipelines', icon: GitBranch },
  { id: 'outputs', label: 'Outputs', icon: Package },
  { id: 'design-system', label: 'Design System', icon: Palette },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { activeView, setActiveView, toggleSidebar } = useAppStore();

  return (
    <aside className="w-[260px] flex-shrink-0 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-default)] flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[var(--color-border-default)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue)] flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <div>
            <h1 className="text-sm font-bold text-[var(--color-text-primary)]">NEXUS Console</h1>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">System Dashboard</p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]">
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)] font-medium border-r-2 border-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Version */}
      <div className="px-5 py-3 border-t border-[var(--color-border-default)] text-[11px] text-[var(--color-text-tertiary)]">
        NEXUS Console v0.1.0
      </div>
    </aside>
  );
}
