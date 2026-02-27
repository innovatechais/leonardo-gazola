'use client';

import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import {
  forwardRef, useEffect, useImperativeHandle, useState, useRef, useCallback,
} from 'react';
import {
  Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare,
  Quote, Code2, Table, Minus, Image, AlertCircle,
} from 'lucide-react';

interface SlashItem {
  title: string;
  icon: React.ReactNode;
  command: (props: { editor: any; range: any }) => void;
}

const slashItems: SlashItem[] = [
  {
    title: 'Heading 1',
    icon: <Heading1 size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    icon: <Heading2 size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    title: 'Heading 3',
    icon: <Heading3 size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    title: 'Bullet List',
    icon: <List size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: 'Numbered List',
    icon: <ListOrdered size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: 'Task List',
    icon: <CheckSquare size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleTaskList().run(),
  },
  {
    title: 'Quote',
    icon: <Quote size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: 'Code Block',
    icon: <Code2 size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: 'Table',
    icon: <Table size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: 'Divider',
    icon: <Minus size={16} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
  {
    title: 'Image',
    icon: <Image size={16} />,
    command: ({ editor, range }) => {
      const url = window.prompt('Image URL:');
      if (url) editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
    },
  },
  {
    title: 'Callout',
    icon: <AlertCircle size={16} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: 'callout',
        attrs: { type: 'info' },
        content: [{ type: 'paragraph' }],
      }).run();
    },
  },
];

interface CommandListProps {
  items: SlashItem[];
  command: (item: SlashItem) => void;
}

const CommandList = forwardRef<any, CommandListProps>(({ items, command }, ref) => {
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSelected(0); }, [items]);

  useEffect(() => {
    const el = containerRef.current?.querySelector(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const selectItem = useCallback((index: number) => {
    const item = items[index];
    if (item) command(item);
  }, [items, command]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelected((s) => (s - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelected((s) => (s + 1) % items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selected);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) return null;

  return (
    <div ref={containerRef} className="slash-command-menu">
      {items.map((item, i) => (
        <button
          key={item.title}
          data-index={i}
          className={`slash-command-item ${i === selected ? 'is-selected' : ''}`}
          onClick={() => selectItem(i)}
        >
          <span className="icon">{item.icon}</span>
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
});
CommandList.displayName = 'CommandList';

export const SlashCommands = Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        items: ({ query }: { query: string }) => {
          return slashItems.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          );
        },
        render: () => {
          let component: ReactRenderer;
          let popup: TippyInstance[];

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) return;

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              }) as unknown as TippyInstance[];
            },
            onUpdate: (props: any) => {
              component.updateProps(props);
              if (props.clientRect) {
                popup?.[0]?.setProps({
                  getReferenceClientRect: props.clientRect,
                });
              }
            },
            onKeyDown: (props: any) => {
              if (props.event.key === 'Escape') {
                popup?.[0]?.hide();
                return true;
              }
              return (component?.ref as any)?.onKeyDown(props);
            },
            onExit: () => {
              popup?.[0]?.destroy();
              component?.destroy();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
