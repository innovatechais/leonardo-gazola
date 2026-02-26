'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tab {
  id: string;
  path: string;
  name: string;
  type: 'code' | 'markdown' | 'html' | 'pdf' | 'image';
  dirty: boolean;
}

export interface Artifact {
  id: string;
  type: 'document' | 'code' | 'html' | 'data' | 'image';
  title: string;
  content: string;
  timestamp: number;
}

interface AppState {
  sidebarOpen: boolean;
  artifactPanelOpen: boolean;
  terminalOpen: boolean;
  activeView: string;
  activeProject: string | null;
  tabs: Tab[];
  activeTabId: string | null;
  artifacts: Artifact[];
  theme: 'light' | 'dark';

  toggleSidebar: () => void;
  toggleArtifactPanel: () => void;
  toggleTerminal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setActiveView: (view: string) => void;
  setActiveProject: (slug: string | null) => void;
  openTab: (tab: Omit<Tab, 'id' | 'dirty'>) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  markTabDirty: (id: string, dirty: boolean) => void;
  addArtifact: (artifact: Omit<Artifact, 'id' | 'timestamp'>) => void;
  clearArtifacts: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      artifactPanelOpen: false,
      terminalOpen: false,
      theme: 'light',
      activeView: 'dashboard',
      activeProject: null,
      tabs: [],
      activeTabId: null,
      artifacts: [],

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleArtifactPanel: () => set((s) => ({ artifactPanelOpen: !s.artifactPanelOpen })),
      toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        set({ theme });
      },
      setActiveView: (view) => set({ activeView: view }),
      setActiveProject: (slug) => set({ activeProject: slug }),

      openTab: (tab) => set((s) => {
        const existing = s.tabs.find((t) => t.path === tab.path);
        if (existing) return { activeTabId: existing.id, activeView: 'editor' };
        const id = crypto.randomUUID();
        return {
          tabs: [...s.tabs, { ...tab, id, dirty: false }],
          activeTabId: id,
          activeView: 'editor',
        };
      }),

      closeTab: (id) => set((s) => {
        const tabs = s.tabs.filter((t) => t.id !== id);
        const activeTabId = s.activeTabId === id
          ? (tabs[tabs.length - 1]?.id ?? null)
          : s.activeTabId;
        return { tabs, activeTabId, activeView: tabs.length === 0 ? 'dashboard' : s.activeView };
      }),

      setActiveTab: (id) => set({ activeTabId: id, activeView: 'editor' }),

      markTabDirty: (id, dirty) => set((s) => ({
        tabs: s.tabs.map((t) => (t.id === id ? { ...t, dirty } : t)),
      })),

      addArtifact: (artifact) => set((s) => ({
        artifacts: [
          { ...artifact, id: crypto.randomUUID(), timestamp: Date.now() },
          ...s.artifacts,
        ].slice(0, 50),
        artifactPanelOpen: true,
      })),

      clearArtifacts: () => set({ artifacts: [] }),
    }),
    {
      name: 'nexus-console-state',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        terminalOpen: state.terminalOpen,
        activeView: state.activeView,
        activeProject: state.activeProject,
        theme: state.theme,
      }),
    }
  )
);
