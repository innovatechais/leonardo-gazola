'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api-client';
import { useAppStore } from '@/stores/app-store';
import { getMonacoLanguage } from '@/lib/file-icons';

export function CodeEditor({ path, tabId }: { path: string; tabId: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const editorRef = useRef<any>(null);
  const { markTabDirty } = useAppStore();
  const saveTimeout = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    api.getFile(path)
      .then(setContent)
      .catch(() => setContent('// Error loading file'))
      .finally(() => setLoading(false));
  }, [path]);

  const handleMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string | undefined) => {
    if (!value) return;
    markTabDirty(tabId, true);

    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      api.saveFile(path, value).then(() => markTabDirty(tabId, false)).catch(console.error);
    }, 2000);
  };

  if (loading) return <div className="p-8 text-sm text-[var(--color-text-tertiary)]">Loading editor...</div>;

  // Lazy load Monaco
  const MonacoEditor = require('@monaco-editor/react').default;

  return (
    <MonacoEditor
      height="100%"
      language={getMonacoLanguage(path)}
      value={content}
      onChange={handleChange}
      onMount={handleMount}
      theme="vs"
      options={{
        fontSize: 13,
        fontFamily: '"Google Sans Mono", "SF Mono", Monaco, monospace',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        padding: { top: 16 },
        tabSize: 2,
      }}
    />
  );
}
