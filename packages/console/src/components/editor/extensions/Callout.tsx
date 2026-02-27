'use client';

import { Node, mergeAttributes } from '@tiptap/react';
import { Info, AlertTriangle, Lightbulb, AlertCircle, StickyNote } from 'lucide-react';
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react';

const calloutIcons: Record<string, React.ReactNode> = {
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
  tip: <Lightbulb size={16} />,
  danger: <AlertCircle size={16} />,
  note: <StickyNote size={16} />,
};

function CalloutView({ node, updateAttributes }: any) {
  const type = node.attrs.type || 'note';
  const types = ['info', 'warning', 'tip', 'danger', 'note'];

  return (
    <NodeViewWrapper>
      <div className={`callout`} data-callout-type={type}>
        <div className="callout-icon">
          <button
            onClick={() => {
              const next = types[(types.indexOf(type) + 1) % types.length];
              updateAttributes({ type: next });
            }}
            title={`Type: ${type} (click to change)`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {calloutIcons[type] || calloutIcons.note}
          </button>
        </div>
        <NodeViewContent className="callout-content" />
      </div>
    </NodeViewWrapper>
  );
}

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: (el) => el.getAttribute('data-callout-type') || 'info',
        renderHTML: (attrs) => ({ 'data-callout-type': attrs.type }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView);
  },
});
