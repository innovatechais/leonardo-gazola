import { WebSocketServer, WebSocket } from 'ws';
import type { Server, IncomingMessage } from 'node:http';

export function createWSServer(httpServer: Server) {
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);

    if (url.pathname === '/ws/terminal') {
      handleTerminal(ws);
    } else if (url.pathname === '/ws/chat') {
      handleChat(ws);
    } else {
      ws.close();
    }
  });

  return wss;
}

function handleTerminal(ws: WebSocket) {
  const nodePty = require('node-pty');
  const shell = process.env.SHELL || '/bin/zsh';
  const cwd = process.env.NEXUS_ROOT || process.cwd();

  console.log('[WS] Spawning PTY terminal:', { shell, cwd });

  const pty = nodePty.spawn(shell, [], {
    name: 'xterm-256color',
    cols: 120,
    rows: 30,
    cwd,
    env: { ...process.env, TERM: 'xterm-256color', CLAUDECODE: '', CLAUDE_CODE_SESSION: '' },
  });

  pty.onData((data: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'output', data }));
    }
  });

  pty.onExit(({ exitCode }: { exitCode: number }) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'exit', exitCode }));
    }
  });

  ws.on('message', (raw: Buffer | string) => {
    try {
      const message = JSON.parse(typeof raw === 'string' ? raw : raw.toString());
      if (message.type === 'input') {
        pty.write(message.data);
      }
      if (message.type === 'resize') {
        pty.resize(message.cols, message.rows);
      }
    } catch {}
  });

  ws.on('close', () => {
    console.log('[WS] Terminal closed');
    pty.kill();
  });

  console.log('[WS] Terminal ready (pty)');
  ws.send(JSON.stringify({ type: 'ready', mode: 'pty' }));
}

function handleChat(ws: WebSocket) {
  ws.on('message', async (msg: Buffer) => {
    try {
      const message = JSON.parse(msg.toString());
      if (message.type !== 'chat') return;

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        ws.send(JSON.stringify({
          type: 'error',
          message: 'ANTHROPIC_API_KEY not set. Add it to packages/console/.env.local',
        }));
        return;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: 'You are NEXUS Assistant, an AI that helps manage business systems, projects, substrates, squads and campaigns. Answer concisely in Portuguese.',
          messages: [
            ...(message.history || []),
            { role: 'user', content: message.content },
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        ws.send(JSON.stringify({ type: 'error', message: `API error: ${response.status}` }));
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              ws.send(JSON.stringify({ type: 'chat_delta', text: parsed.delta.text }));
            }
          } catch {}
        }
      }

      ws.send(JSON.stringify({ type: 'chat_complete' }));
    } catch (error: any) {
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });
}
