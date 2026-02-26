'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { Code, Eye, Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';

const VIEWPORTS = {
  desktop: { width: '100%', label: 'Desktop', icon: Monitor },
  tablet: { width: '810px', label: 'Tablet', icon: Tablet },
  mobile: { width: '390px', label: 'Mobile', icon: Smartphone },
};

export function HtmlPreview({ path }: { path: string }) {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<keyof typeof VIEWPORTS>('desktop');
  const [key, setKey] = useState(0);

  useEffect(() => {
    api.getFile(path).then(setContent).catch(() => setContent('<p>Error loading file</p>'));
  }, [path]);

  const iframeSrc = `data:text/html;charset=utf-8,${encodeURIComponent(content)}`;

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--color-border-default)]">
        <button
          onClick={() => setMode('preview')}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md ${mode === 'preview' ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]' : 'text-[var(--color-text-secondary)]'}`}
        >
          <Eye size={14} /> Preview
        </button>
        <button
          onClick={() => setMode('code')}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md ${mode === 'code' ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]' : 'text-[var(--color-text-secondary)]'}`}
        >
          <Code size={14} /> Code
        </button>

        {mode === 'preview' && (
          <>
            <span className="mx-2 w-px h-4 bg-[var(--color-border-default)]" />
            {(Object.keys(VIEWPORTS) as Array<keyof typeof VIEWPORTS>).map((v) => {
              const Icon = VIEWPORTS[v].icon;
              return (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  className={`p-1 rounded ${viewport === v ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-tertiary)]'}`}
                  title={VIEWPORTS[v].label}
                >
                  <Icon size={14} />
                </button>
              );
            })}
            <button onClick={() => setKey((k) => k + 1)} className="p-1 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]">
              <RefreshCw size={14} />
            </button>
          </>
        )}

        <span className="ml-auto text-xs text-[var(--color-text-tertiary)]">{path}</span>
      </div>

      {/* Content */}
      {mode === 'code' ? (
        <pre className="flex-1 overflow-auto p-4 text-sm font-mono whitespace-pre-wrap text-[var(--color-text-secondary)]">{content}</pre>
      ) : (
        <div className="flex-1 flex justify-center bg-[var(--color-bg-surface)] p-4 overflow-auto">
          <iframe
            key={key}
            srcDoc={content}
            sandbox="allow-scripts allow-same-origin"
            className="bg-white border border-[var(--color-border-default)] rounded-lg shadow-md"
            style={{ width: VIEWPORTS[viewport].width, maxWidth: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
