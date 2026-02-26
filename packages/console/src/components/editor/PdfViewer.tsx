'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';

export function PdfViewer({ path }: { path: string }) {
  const [scale, setScale] = useState(1);
  const fileUrl = `/api/files/${encodeURIComponent(path)}`;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-default)]">
        <span className="text-xs text-[var(--color-text-secondary)] font-medium">PDF Viewer</span>
        <div className="flex-1" />
        <button
          onClick={() => setScale(s => Math.max(0.5, s - 0.25))}
          className="p-1.5 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-[var(--color-text-tertiary)] min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale(s => Math.min(3, s + 0.25))}
          className="p-1.5 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setScale(1)}
          className="p-1.5 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
          title="Fit to Width"
        >
          <Maximize2 size={16} />
        </button>
        <a
          href={fileUrl}
          download
          className="p-1.5 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
          title="Download"
        >
          <Download size={16} />
        </a>
      </div>

      {/* PDF Content via iframe */}
      <div className="flex-1 overflow-auto bg-[#525659] flex justify-center">
        <iframe
          src={`${fileUrl}#toolbar=0&zoom=${scale * 100}`}
          className="bg-white shadow-lg my-4"
          style={{
            width: `${Math.round(816 * scale)}px`,
            height: '100%',
            minHeight: '90vh',
            border: 'none',
          }}
          title="PDF Preview"
        />
      </div>
    </div>
  );
}
