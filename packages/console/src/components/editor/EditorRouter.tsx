'use client';

import { useAppStore } from '@/stores/app-store';
import { MarkdownEditor } from './MarkdownEditor';
import { CodeEditor } from './CodeEditor';
import { HtmlPreview } from './HtmlPreview';
import { PdfViewer } from './PdfViewer';

export function EditorRouter() {
  const { tabs, activeTabId } = useAppStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-text-tertiary)]">
        <div className="text-center">
          <p className="text-lg mb-1">No file open</p>
          <p className="text-sm">Open a file from the explorer or use the terminal</p>
        </div>
      </div>
    );
  }

  switch (activeTab.type) {
    case 'markdown':
      return <MarkdownEditor path={activeTab.path} tabId={activeTab.id} />;
    case 'html':
      return <HtmlPreview path={activeTab.path} />;
    case 'pdf':
      return <PdfViewer path={activeTab.path} />;
    case 'image':
      return (
        <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-bg-surface)]">
          <img src={`/api/files/${encodeURIComponent(activeTab.path)}`} alt={activeTab.name} className="max-w-full max-h-full rounded-lg shadow-md" />
        </div>
      );
    default:
      return <CodeEditor path={activeTab.path} tabId={activeTab.id} />;
  }
}
