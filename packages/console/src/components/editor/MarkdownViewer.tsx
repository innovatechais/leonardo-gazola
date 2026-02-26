'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code, Eye } from 'lucide-react';

export function MarkdownViewer({ path }: { path: string }) {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'preview' | 'source'>('preview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFile(path)
      .then(setContent)
      .catch(() => setContent('# Error loading file'))
      .finally(() => setLoading(false));
  }, [path]);

  if (loading) return <div className="p-8 text-sm text-[var(--color-text-tertiary)]">Loading...</div>;

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--color-border-default)]">
        <button
          onClick={() => setMode('preview')}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'preview' ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]'
          }`}
        >
          <Eye size={14} /> Preview
        </button>
        <button
          onClick={() => setMode('source')}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'source' ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]'
          }`}
        >
          <Code size={14} /> Source
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {mode === 'source' ? (
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap text-[var(--color-text-secondary)]">{content}</pre>
        ) : (
          <div className="prose prose-sm max-w-none p-8
            prose-headings:text-[var(--color-text-primary)] prose-headings:font-bold
            prose-p:text-[var(--color-text-secondary)]
            prose-a:text-[var(--color-accent-blue)] prose-a:no-underline hover:prose-a:underline
            prose-code:bg-[var(--color-bg-surface)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[var(--color-accent-red)] prose-code:text-sm
            prose-pre:bg-[var(--color-bg-dark)] prose-pre:text-[var(--color-text-disabled)]
            prose-th:text-left prose-th:text-[var(--color-text-secondary)]
            prose-td:text-[var(--color-text-secondary)]
            prose-table:border-collapse
            [&_th]:border [&_th]:border-[var(--color-border-default)] [&_th]:px-3 [&_th]:py-2 [&_th]:bg-[var(--color-bg-surface)]
            [&_td]:border [&_td]:border-[var(--color-border-default)] [&_td]:px-3 [&_td]:py-2
            prose-li:text-[var(--color-text-secondary)]
            prose-hr:border-[var(--color-border-default)]
            prose-blockquote:border-l-[var(--color-accent-blue)] prose-blockquote:text-[var(--color-text-secondary)]
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
