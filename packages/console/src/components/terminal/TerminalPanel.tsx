'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/stores/app-store';
import { X } from 'lucide-react';

export function TerminalPanel() {
  const termRef = useRef<HTMLDivElement>(null);
  const { toggleTerminal } = useAppStore();
  const [connected, setConnected] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !termRef.current) return;
    initialized.current = true;

    let term: any;
    let ws: WebSocket;
    let fitAddon: any;

    (async () => {
      const xtermModule = await import('@xterm/xterm');
      const fitModule = await import('@xterm/addon-fit');

      const Terminal = xtermModule.Terminal;
      const FitAddon = fitModule.FitAddon;

      term = new Terminal({
        fontFamily: '"Google Sans Mono", "SF Mono", Monaco, "Cascadia Code", monospace',
        fontSize: 13,
        lineHeight: 1.4,
        cursorBlink: true,
        cursorStyle: 'bar',
        theme: {
          background: '#1e1e2e',
          foreground: '#cdd6f4',
          cursor: '#4285f4',
          selectionBackground: '#45475a',
          black: '#45475a',
          red: '#f38ba8',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          blue: '#89b4fa',
          magenta: '#cba6f7',
          cyan: '#94e2d5',
          white: '#bac2de',
          brightBlack: '#585b70',
          brightRed: '#f38ba8',
          brightGreen: '#a6e3a1',
          brightYellow: '#f9e2af',
          brightBlue: '#89b4fa',
          brightMagenta: '#cba6f7',
          brightCyan: '#94e2d5',
          brightWhite: '#a6adc8',
        },
        allowProposedApi: true,
      });

      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(termRef.current!);

      // Small delay to ensure DOM is ready
      setTimeout(() => fitAddon.fit(), 100);

      // Connect WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      ws = new WebSocket(`${protocol}://${window.location.host}/ws/terminal`);

      ws.onopen = () => {
        setConnected(true);
        console.log('[Terminal] WebSocket connected');
      };

      ws.onclose = () => {
        setConnected(false);
        term.write('\r\n\x1b[31m[Connection closed. Refresh to reconnect.]\x1b[0m\r\n');
      };

      ws.onerror = () => {
        setConnected(false);
        term.write('\r\n\x1b[31m[WebSocket error]\x1b[0m\r\n');
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'output') {
            term.write(msg.data);
          } else if (msg.type === 'exit') {
            term.write('\r\n\x1b[33m[Process exited]\x1b[0m\r\n');
          } else if (msg.type === 'ready') {
            term.focus();
          }
        } catch {}
      };

      // Send keystrokes to server
      term.onData((data: string) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'input', data }));
        }
      });

      // Handle resize
      const observer = new ResizeObserver(() => {
        try {
          fitAddon.fit();
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
          }
        } catch {}
      });
      observer.observe(termRef.current!);

      // Focus terminal when clicking on it
      termRef.current!.addEventListener('click', () => term.focus());
    })();

    return () => {
      if (term) term.dispose();
      if (ws) ws.close();
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center px-3 py-1.5 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-default)]">
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">Terminal</span>
        <span className={`ml-2 w-2 h-2 rounded-full ${connected ? 'bg-[var(--color-state-success)]' : 'bg-[var(--color-state-error)]'}`} />
        <span className="ml-1 text-[10px] text-[var(--color-text-tertiary)]">{connected ? 'Connected' : 'Disconnected'}</span>
        <button onClick={toggleTerminal} className="ml-auto p-1 rounded hover:bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)]">
          <X size={12} />
        </button>
      </div>
      <div ref={termRef} className="flex-1" style={{ background: '#1e1e2e', padding: '4px' }} />
    </div>
  );
}
