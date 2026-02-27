'use client';

import { BubbleMenu } from '@tiptap/react/menus';
import type { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, Code, Link, Highlighter, Strikethrough } from 'lucide-react';

interface EditorBubbleMenuProps {
  editor: Editor;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button onClick={onClick} className={active ? 'is-active' : ''} title={title}>
      {icon}
    </button>
  );

  const addLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('URL:', prev || '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <Bold size={14} />, 'Bold')}
      {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <Italic size={14} />, 'Italic')}
      {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), <Underline size={14} />, 'Underline')}
      {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), <Strikethrough size={14} />, 'Strikethrough')}
      {btn(editor.isActive('code'), () => editor.chain().focus().toggleCode().run(), <Code size={14} />, 'Code')}
      {btn(editor.isActive('highlight'), () => editor.chain().focus().toggleHighlight().run(), <Highlighter size={14} />, 'Highlight')}
      {btn(editor.isActive('link'), addLink, <Link size={14} />, 'Link')}
    </BubbleMenu>
  );
}
