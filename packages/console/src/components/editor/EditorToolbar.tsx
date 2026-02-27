'use client';

import { Editor } from '@tiptap/react';
import {
  Bold, Italic, Underline, Strikethrough, Code, Quote, List, ListOrdered,
  CheckSquare, Heading1, Heading2, Heading3, Link, Table, Minus, Highlighter,
  Undo, Redo,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const btn = (
    active: boolean,
    onClick: () => void,
    icon: React.ReactNode,
    title: string,
  ) => (
    <button
      onClick={onClick}
      className={active ? 'is-active' : ''}
      title={title}
    >
      {icon}
    </button>
  );

  const addLink = () => {
    const url = window.prompt('URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="editor-toolbar">
      {btn(false, () => editor.chain().focus().undo().run(), <Undo size={15} />, 'Undo')}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo size={15} />, 'Redo')}
      <div className="divider" />
      {btn(editor.isActive('heading', { level: 1 }), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 size={15} />, 'Heading 1')}
      {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={15} />, 'Heading 2')}
      {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={15} />, 'Heading 3')}
      <div className="divider" />
      {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <Bold size={15} />, 'Bold')}
      {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <Italic size={15} />, 'Italic')}
      {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), <Underline size={15} />, 'Underline')}
      {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <Strikethrough size={15} />, 'Strikethrough')}
      {btn(editor.isActive('highlight'), () => editor.chain().focus().toggleHighlight().run(), <Highlighter size={15} />, 'Highlight')}
      {btn(editor.isActive('code'), () => editor.chain().focus().toggleCode().run(), <Code size={15} />, 'Inline Code')}
      <div className="divider" />
      {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <List size={15} />, 'Bullet List')}
      {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={15} />, 'Ordered List')}
      {btn(editor.isActive('taskList'), () => editor.chain().focus().toggleTaskList().run(), <CheckSquare size={15} />, 'Task List')}
      <div className="divider" />
      {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={15} />, 'Quote')}
      {btn(editor.isActive('link'), addLink, <Link size={15} />, 'Link')}
      {btn(false, addTable, <Table size={15} />, 'Table')}
      {btn(false, () => editor.chain().focus().setHorizontalRule().run(), <Minus size={15} />, 'Divider')}
    </div>
  );
}
