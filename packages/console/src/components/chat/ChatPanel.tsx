'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/app-store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Plus, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addArtifact } = useAppStore();

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws/chat`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'chat_delta') {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return [...prev.slice(0, -1), { ...last, content: last.content + msg.text }];
          }
          return [...prev, { id: crypto.randomUUID(), role: 'assistant', content: msg.text, timestamp: Date.now() }];
        });
      }

      if (msg.type === 'chat_complete') {
        setStreaming(false);
        // Check for code blocks to extract as artifacts
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            const codeBlocks = last.content.match(/```[\s\S]*?```/g);
            if (codeBlocks && codeBlocks.length > 0) {
              codeBlocks.forEach((block: string) => {
                const lang = block.match(/```(\w+)/)?.[1] || 'text';
                const code = block.replace(/```\w*\n?/, '').replace(/\n?```$/, '');
                addArtifact({ type: 'code', title: `Code (${lang})`, content: code });
              });
            }
          }
          return prev;
        });
      }

      if (msg.type === 'error') {
        setStreaming(false);
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: `**Error:** ${msg.message}`, timestamp: Date.now() }]);
      }
    };

    return () => ws.close();
  }, [addArtifact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || streaming) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input.trim(), timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setStreaming(true);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'chat',
        content: input.trim(),
        history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      }));
    }
  };

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-blue-light)] flex items-center justify-center mx-auto mb-4">
              <Bot size={32} className="text-[var(--color-accent-blue)]" />
            </div>
            <h3 className="text-lg font-medium mb-2">NEXUS Assistant</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Ask about your projects, substrates, squads, or give commands.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent-blue-light)] flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-[var(--color-accent-blue)]" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {streaming && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-blue-light)] flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-[var(--color-accent-blue)]" />
            </div>
            <div className="bg-[var(--color-bg-surface)] rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--color-border-default)]">
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]" title="New Chat" onClick={() => setMessages([])}>
            <Plus size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Send a message..."
            className="flex-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-accent-blue)]"
            disabled={streaming}
          />
          <button
            onClick={sendMessage}
            disabled={streaming || !input.trim()}
            className="px-4 py-2 bg-[var(--color-accent-blue)] text-white rounded-lg hover:bg-[var(--color-accent-blue-dark)] disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
