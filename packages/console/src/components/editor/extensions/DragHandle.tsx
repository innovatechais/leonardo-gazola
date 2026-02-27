'use client';

import { Extension } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { GripVertical } from 'lucide-react';
import { createRoot } from 'react-dom/client';

export const DragHandle = Extension.create({
  name: 'dragHandle',

  addProseMirrorPlugins() {
    let dragHandleEl: HTMLElement | null = null;
    let currentNode: HTMLElement | null = null;

    const createDragHandle = () => {
      const el = document.createElement('div');
      el.className = 'drag-handle';
      el.draggable = true;
      el.style.display = 'none';
      el.setAttribute('contenteditable', 'false');

      const root = createRoot(el);
      root.render(<GripVertical size={14} />);

      el.addEventListener('dragstart', (e) => {
        if (!currentNode) return;
        e.dataTransfer?.setDragImage(currentNode, 0, 0);
        currentNode.classList.add('dragging');
      });

      el.addEventListener('dragend', () => {
        currentNode?.classList.remove('dragging');
      });

      return el;
    };

    return [
      new Plugin({
        key: new PluginKey('dragHandle'),

        view(editorView) {
          dragHandleEl = createDragHandle();
          editorView.dom.parentElement?.appendChild(dragHandleEl);

          const handleMouseMove = (e: MouseEvent) => {
            if (!dragHandleEl) return;

            const editorRect = editorView.dom.getBoundingClientRect();
            const pos = editorView.posAtCoords({ left: editorRect.left + 10, top: e.clientY });
            if (!pos) {
              dragHandleEl.style.display = 'none';
              return;
            }

            const node = editorView.nodeDOM(pos.inside);
            if (!node || !(node instanceof HTMLElement)) {
              dragHandleEl.style.display = 'none';
              return;
            }

            currentNode = node;
            const nodeRect = node.getBoundingClientRect();
            const parentRect = editorView.dom.parentElement?.getBoundingClientRect();
            if (!parentRect) return;

            dragHandleEl.style.display = 'flex';
            dragHandleEl.style.top = `${nodeRect.top - parentRect.top + 4}px`;
            dragHandleEl.style.left = `${nodeRect.left - parentRect.left - 24}px`;
          };

          const handleMouseLeave = () => {
            if (dragHandleEl) dragHandleEl.style.display = 'none';
          };

          editorView.dom.addEventListener('mousemove', handleMouseMove);
          editorView.dom.addEventListener('mouseleave', handleMouseLeave);

          return {
            destroy() {
              editorView.dom.removeEventListener('mousemove', handleMouseMove);
              editorView.dom.removeEventListener('mouseleave', handleMouseLeave);
              dragHandleEl?.remove();
            },
          };
        },
      }),
    ];
  },
});
