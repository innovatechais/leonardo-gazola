'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import UnderlineExt from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Table as TableExt } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import LinkExt from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { common, createLowlight } from 'lowlight';
import { api } from '@/lib/api-client';
import { useAppStore } from '@/stores/app-store';
import { markdownToHtml, htmlToMarkdown } from '@/lib/markdown-utils';
import { EditorToolbar } from './EditorToolbar';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { Callout } from './extensions/Callout';
import { DragHandle } from './extensions/DragHandle';
import { SlashCommands } from './extensions/SlashCommands';
import { Code, Eye } from 'lucide-react';
import './editor-theme.css';

const lowlight = createLowlight(common);

interface MarkdownEditorProps {
  path: string;
  tabId?: string;
}

export function MarkdownEditor({ path, tabId }: MarkdownEditorProps) {
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [mode, setMode] = useState<'wysiwyg' | 'source'>('wysiwyg');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sourceContent, setSourceContent] = useState('');
  const { markTabDirty, tabs } = useAppStore();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const currentTabId = tabId || tabs.find((t) => t.path === path)?.id;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        horizontalRule: false,
      }),
      Placeholder.configure({ placeholder: 'Start writing, or type / for commands...' }),
      Typography,
      UnderlineExt,
      TaskList,
      TaskItem.configure({ nested: true }),
      TableExt.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
      Highlight.configure({ multicolor: false }),
      LinkExt.configure({ openOnClick: false }),
      ImageExt,
      HorizontalRule,
      Callout,
      DragHandle,
      SlashCommands,
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      if (currentTabId) markTabDirty(currentTabId, true);
      scheduleSave(editor);
    },
  });

  // Load file content
  useEffect(() => {
    setLoading(true);
    api.getFile(path)
      .then((content) => {
        setRawMarkdown(content);
        setSourceContent(content);
        if (editor) {
          const html = markdownToHtml(content);
          editor.commands.setContent(html);
        }
      })
      .catch(() => {
        const fallback = '# Error loading file';
        setRawMarkdown(fallback);
        setSourceContent(fallback);
        if (editor) editor.commands.setContent('<h1>Error loading file</h1>');
      })
      .finally(() => setLoading(false));
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set content when editor becomes available after load
  useEffect(() => {
    if (editor && rawMarkdown && !loading) {
      const html = markdownToHtml(rawMarkdown);
      editor.commands.setContent(html);
    }
  }, [editor]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveContent = useCallback(async (md: string) => {
    setSaving(true);
    try {
      await api.saveFile(path, md);
      if (currentTabId) markTabDirty(currentTabId, false);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }, [path, currentTabId, markTabDirty]);

  const scheduleSave = useCallback((ed: any) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const html = ed.getHTML();
      const md = htmlToMarkdown(html);
      setRawMarkdown(md);
      setSourceContent(md);
      saveContent(md);
    }, 1500);
  }, [saveContent]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // Switch modes
  const switchToSource = () => {
    if (editor) {
      const html = editor.getHTML();
      const md = htmlToMarkdown(html);
      setSourceContent(md);
    }
    setMode('source');
  };

  const switchToWysiwyg = () => {
    if (editor) {
      const html = markdownToHtml(sourceContent);
      editor.commands.setContent(html);
    }
    setMode('wysiwyg');
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSourceContent(e.target.value);
    if (currentTabId) markTabDirty(currentTabId, true);

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveContent(e.target.value);
    }, 1500);
  };

  if (loading) {
    return <div className="p-8 text-sm text-[var(--color-text-tertiary)]">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Mode toggle + toolbar */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-[var(--color-border-default)]">
        <button
          onClick={switchToWysiwyg}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'wysiwyg'
              ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]'
          }`}
        >
          <Eye size={14} /> Edit
        </button>
        <button
          onClick={switchToSource}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
            mode === 'source'
              ? 'bg-[var(--color-accent-blue-light)] text-[var(--color-accent-blue-dark)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)]'
          }`}
        >
          <Code size={14} /> Source
        </button>
        <div className="flex-1" />
        {saving && (
          <span className="text-[10px] text-[var(--color-text-tertiary)]">Saving...</span>
        )}
      </div>

      {mode === 'wysiwyg' && editor ? (
        <>
          <EditorToolbar editor={editor} />
          <div className="flex-1 overflow-y-auto relative" style={{ position: 'relative' }}>
            <EditorBubbleMenu editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <textarea
          value={sourceContent}
          onChange={handleSourceChange}
          className="flex-1 p-4 text-sm font-mono resize-none focus:outline-none"
          style={{
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-secondary)',
          }}
          spellCheck={false}
        />
      )}
    </div>
  );
}
