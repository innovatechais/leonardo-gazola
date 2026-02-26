import { createServer } from 'node:http';
import next from 'next';
import { parse } from 'node:url';
import path from 'node:path';
import { createWSServer } from './server/ws-server';

// Set NEXUS_ROOT to project root
process.env.NEXUS_ROOT = process.env.NEXUS_ROOT || path.resolve(process.cwd(), '../..');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Attach WebSocket server for terminal and chat
  // IMPORTANT: Must be attached before Next.js HMR takes over upgrade events
  const wss = createWSServer(server);

  // Override the upgrade handler to prioritize our WS routes over Next.js HMR
  const listeners = server.listeners('upgrade').slice();
  server.removeAllListeners('upgrade');
  server.on('upgrade', (req, socket, head) => {
    const pathname = new URL(req.url!, `http://${req.headers.host}`).pathname;
    if (pathname === '/ws/terminal' || pathname === '/ws/chat') {
      // Our custom WebSocket routes
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      // Let Next.js HMR handle other upgrade requests
      for (const listener of listeners) {
        (listener as any).call(server, req, socket, head);
      }
    }
  });

  server.listen(port, hostname, () => {
    console.log(`\n  🔷 NEXUS Console ready at http://localhost:${port}\n`);
  });
});
