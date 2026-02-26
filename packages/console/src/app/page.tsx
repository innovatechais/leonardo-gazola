'use client';

import { useAppStore } from '@/stores/app-store';
import { useResize } from '@/hooks/useResize';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBar } from '@/components/layout/StatusBar';
import { ArtifactPanel } from '@/components/layout/ArtifactPanel';
import { TabBar } from '@/components/layout/TabBar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { FileTree } from '@/components/explorer/FileTree';
import { EditorRouter } from '@/components/editor/EditorRouter';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { SquadGrid } from '@/components/squads/SquadGrid';
import { TerminalPanel } from '@/components/terminal/TerminalPanel';
import { DesignSystemPage } from '@/components/design-system/DesignSystemPage';
import dynamic from 'next/dynamic';

const ProviderSettings = dynamic(
  () => import('@/components/settings/ProviderSettings').then(m => m.ProviderSettings),
  { loading: () => <div className="p-8 text-sm text-[var(--color-text-tertiary)]">Loading settings...</div> }
);

function SettingsView() {
  return <ProviderSettings />;
}

function FileEditorView() {
  return (
    <div className="flex h-full">
      <div className="w-[260px] flex-shrink-0 border-r border-[var(--color-border-default)] overflow-hidden">
        <FileTree />
      </div>
      <div className="flex-1 flex flex-col">
        <TabBar />
        <div className="flex-1 overflow-hidden">
          <EditorRouter />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  const { activeView } = useAppStore();

  switch (activeView) {
    case 'dashboard':
      return <Dashboard />;
    case 'chat':
      return <ChatPanel />;
    case 'files':
    case 'editor':
      return <FileEditorView />;
    case 'squads':
      return <SquadGrid />;
    case 'settings':
      return <SettingsView />;
    case 'design-system':
      return <DesignSystemPage />;
    default:
      return (
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 capitalize">{activeView}</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Coming soon</p>
        </div>
      );
  }
}

function DragHandle({ direction, onMouseDown }: { direction: 'horizontal' | 'vertical'; onMouseDown: (e: React.MouseEvent) => void }) {
  const isHorizontal = direction === 'horizontal';
  return (
    <div
      onMouseDown={onMouseDown}
      className={`flex-shrink-0 ${
        isHorizontal
          ? 'w-1 cursor-col-resize hover:bg-[var(--color-accent-blue)] active:bg-[var(--color-accent-blue)]'
          : 'h-1 cursor-row-resize hover:bg-[var(--color-accent-blue)] active:bg-[var(--color-accent-blue)]'
      } bg-[var(--color-border-default)] transition-colors`}
    />
  );
}

export default function Home() {
  const { sidebarOpen, artifactPanelOpen, terminalOpen } = useAppStore();
  const terminalResize = useResize({ direction: 'horizontal', initialSize: 420, minSize: 280, maxSize: 700, reverse: true });
  const artifactResize = useResize({ direction: 'horizontal', initialSize: 400, minSize: 200, maxSize: 800, reverse: true });

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <MainContent />
          </div>
        </main>

        {terminalOpen && (
          <>
            <DragHandle direction="horizontal" onMouseDown={terminalResize.onMouseDown} />
            <div style={{ width: terminalResize.size }} className="flex-shrink-0 h-full">
              <TerminalPanel />
            </div>
          </>
        )}

        {artifactPanelOpen && (
          <>
            <DragHandle direction="horizontal" onMouseDown={artifactResize.onMouseDown} />
            <div style={{ width: artifactResize.size }} className="flex-shrink-0">
              <ArtifactPanel />
            </div>
          </>
        )}
      </div>

      <StatusBar />
    </div>
  );
}
