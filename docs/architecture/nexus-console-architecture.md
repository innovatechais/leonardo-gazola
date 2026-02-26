# NEXUS Console — Technical Architecture

> **Version:** 1.0
> **Author:** Aria (Architect Agent)
> **Date:** 2026-02-26
> **PRD Reference:** `docs/prd/nexus-console-prd-v2.md`
> **Design System:** `Deisgh system ideia/antigravity-google-design-system.html`

---

## 1. Architecture Overview

### 1.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (localhost:3000)                      │
│                                                                     │
│  ┌──────────┐  ┌─────────────┐  ┌──────────┐  ┌────────────────┐  │
│  │ Dashboard │  │ File Editor │  │ Terminal  │  │  Chat with AI  │  │
│  │ (React)   │  │ (Monaco)    │  │ (xterm)   │  │  (streaming)   │  │
│  └─────┬─────┘  └──────┬──────┘  └─────┬────┘  └───────┬────────┘  │
│        │               │               │               │            │
│  ┌─────┴───────────────┴───────────────┴───────────────┴─────────┐  │
│  │                    Zustand Store (client state)                │  │
│  │  activeProject │ openTabs │ sidebarState │ terminalState      │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                      │
│              HTTP REST ──────┤────── WebSocket                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                     NEXT.JS SERVER (Node.js)                        │
│                              │                                      │
│  ┌───────────────────────────┴───────────────────────────────────┐  │
│  │                    API Routes (/api/*)                         │  │
│  │                                                               │  │
│  │  /api/projects/*    → src/project/                            │  │
│  │  /api/sca/*         → src/sca-engine/                         │  │
│  │  /api/squads/*      → src/squad-adapter/                      │  │
│  │  /api/pipelines/*   → src/campaign/                           │  │
│  │  /api/campaigns/*   → src/campaign/                           │  │
│  │  /api/dashboard/*   → src/dashboard/                          │  │
│  │  /api/files/*       → fs operations (read/write/tree)         │  │
│  │  /api/integrations/*→ src/integrations/                       │  │
│  │  /api/providers/*   → config/providers/ (CRUD)                │  │
│  │  /api/upload        → multipart file handler                  │  │
│  │  /api/commands      → CLI command registry                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────┐  ┌──────────────────────────────────┐  │
│  │  WebSocket Server       │  │  NEXUS Core (src/)               │  │
│  │                         │  │                                  │  │
│  │  /ws/terminal → node-pty│  │  project/     sca-engine/        │  │
│  │  /ws/chat → AI proxy    │  │  squad-adapter/ campaign/        │  │
│  │                         │  │  request-router/ dashboard/      │  │
│  └─────────────────────────┘  │  capture/    integrations/       │  │
│                               │  export/     shared/             │  │
│                               └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               │
                     ┌─────────┴──────────┐
                     │   FILESYSTEM       │
                     │                    │
                     │  docs/knowledge/   │
                     │  squads/           │
                     │  config/           │
                     │  campaigns/        │
                     │  .aios/            │
                     │  .env.local        │
                     └────────────────────┘
```

### 1.2 Key Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Monorepo placement** | `packages/console/` | Separação clara do core, npm workspace para compartilhar dependências |
| **API layer** | Next.js API Routes (App Router) | Zero setup adicional, built-in com Next.js, deploy-ready |
| **Core integration** | Import direto dos módulos `src/` | Todos os módulos exportam funções async puras — sem necessidade de wrapper |
| **Real-time** | Custom WebSocket server (ws) | Terminal e chat precisam de bidirecional streaming |
| **Terminal** | node-pty + xterm.js | Padrão da indústria, mesma tech do VS Code terminal |
| **State management** | Zustand | Leve (~2KB), sem boilerplate, perfeito para single-user |
| **Styling** | Tailwind CSS v4 + design tokens | Utility-first, tokens Antigravity Google como theme |
| **Code editor** | Monaco Editor (lazy loaded) | Mesmo engine do VS Code, familiar, poderoso |
| **File operations** | Reutiliza `src/shared/fs-utils.js` | DRY — não duplicar lógica de I/O |

---

## 2. Project Structure

```
tony-stark/
├── packages/
│   └── console/
│       ├── package.json
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       │
│       ├── src/
│       │   ├── app/                          # Next.js App Router
│       │   │   ├── layout.tsx                # Root layout (Shell component)
│       │   │   ├── page.tsx                  # Dashboard (home)
│       │   │   ├── globals.css               # Tailwind imports + Antigravity tokens
│       │   │   │
│       │   │   └── api/                      # API Routes
│       │   │       ├── projects/
│       │   │       │   ├── route.ts          # GET list, POST create
│       │   │       │   ├── [slug]/
│       │   │       │   │   └── route.ts      # GET details, PUT update
│       │   │       │   └── active/
│       │   │       │       └── route.ts      # GET active, POST select
│       │   │       │
│       │   │       ├── sca/
│       │   │       │   ├── substrates/
│       │   │       │   │   ├── route.ts      # GET list, POST create
│       │   │       │   │   └── [id]/
│       │   │       │   │       └── route.ts  # GET view, PUT edit
│       │   │       │   ├── blocks/
│       │   │       │   │   └── route.ts      # GET list, POST create
│       │   │       │   ├── contexts/
│       │   │       │   │   └── route.ts      # GET list, POST generate
│       │   │       │   └── health/
│       │   │       │       └── route.ts      # GET health check
│       │   │       │
│       │   │       ├── squads/
│       │   │       │   ├── route.ts          # GET list
│       │   │       │   └── [name]/
│       │   │       │       ├── route.ts      # GET details
│       │   │       │       ├── launch/
│       │   │       │       │   └── route.ts  # POST execute squad
│       │   │       │       └── history/
│       │   │       │           └── route.ts  # GET execution history
│       │   │       │
│       │   │       ├── pipelines/
│       │   │       │   ├── route.ts          # GET list
│       │   │       │   └── [name]/
│       │   │       │       └── route.ts      # GET details + ASCII diagram
│       │   │       │
│       │   │       ├── campaigns/
│       │   │       │   ├── route.ts          # GET list, POST run
│       │   │       │   └── [id]/
│       │   │       │       └── route.ts      # GET details/report
│       │   │       │
│       │   │       ├── files/
│       │   │       │   ├── tree/
│       │   │       │   │   └── route.ts      # GET directory tree
│       │   │       │   └── [...path]/
│       │   │       │       └── route.ts      # GET read, PUT write, DELETE
│       │   │       │
│       │   │       ├── dashboard/
│       │   │       │   └── route.ts          # GET metrics
│       │   │       │
│       │   │       ├── providers/
│       │   │       │   ├── route.ts          # GET list, POST create
│       │   │       │   └── [id]/
│       │   │       │       ├── route.ts      # PUT update, DELETE
│       │   │       │       └── test/
│       │   │       │           └── route.ts  # POST health check
│       │   │       │
│       │   │       ├── upload/
│       │   │       │   └── route.ts          # POST multipart upload
│       │   │       │
│       │   │       └── commands/
│       │   │           └── route.ts          # GET command registry
│       │   │
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Shell.tsx             # Main app shell (sidebar + main + panels)
│       │   │   │   ├── Sidebar.tsx           # Navigation sidebar
│       │   │   │   ├── TopBar.tsx            # Project selector + search + settings
│       │   │   │   ├── StatusBar.tsx         # Bottom status bar
│       │   │   │   ├── ArtifactPanel.tsx     # Right-side artifact/preview panel
│       │   │   │   ├── TabBar.tsx            # Tab management for main content
│       │   │   │   └── ResizeHandle.tsx      # Draggable resize handles
│       │   │   │
│       │   │   ├── dashboard/
│       │   │   │   ├── OverviewCards.tsx      # Stat cards (projects, substrates, etc.)
│       │   │   │   ├── HealthWidget.tsx       # Knowledge health progress bar
│       │   │   │   ├── RecentActivity.tsx     # Activity feed
│       │   │   │   ├── SquadGrid.tsx          # Squad status grid
│       │   │   │   └── QuickActions.tsx       # Shortcut buttons
│       │   │   │
│       │   │   ├── explorer/
│       │   │   │   ├── FileTree.tsx           # Recursive tree view
│       │   │   │   ├── FileTreeItem.tsx       # Individual tree node
│       │   │   │   ├── FileIcon.tsx           # Icon by file type
│       │   │   │   └── FileContextMenu.tsx    # Right-click actions
│       │   │   │
│       │   │   ├── editor/
│       │   │   │   ├── MonacoEditor.tsx       # Monaco wrapper (lazy loaded)
│       │   │   │   ├── MarkdownViewer.tsx     # Rendered markdown view
│       │   │   │   ├── MarkdownToolbar.tsx    # Bold, italic, heading, etc.
│       │   │   │   ├── HtmlPreview.tsx        # iframe sandbox viewer
│       │   │   │   ├── PdfViewer.tsx          # PDF renderer (lazy loaded)
│       │   │   │   ├── EditorTabs.tsx         # Tab bar for open files
│       │   │   │   └── ViewToggle.tsx         # Source | Preview toggle
│       │   │   │
│       │   │   ├── terminal/
│       │   │   │   ├── Terminal.tsx            # xterm.js wrapper (lazy loaded)
│       │   │   │   ├── TerminalTabs.tsx        # Multiple terminal instances
│       │   │   │   └── TerminalPanel.tsx       # Collapsible bottom panel
│       │   │   │
│       │   │   ├── chat/
│       │   │   │   ├── ChatPanel.tsx           # Chat interface
│       │   │   │   ├── ChatMessage.tsx         # Single message (user/assistant)
│       │   │   │   ├── ChatInput.tsx           # Message input with send
│       │   │   │   └── ArtifactExtractor.tsx   # Detects artifacts in responses
│       │   │   │
│       │   │   ├── squads/
│       │   │   │   ├── SquadGrid.tsx           # Squad launcher grid
│       │   │   │   ├── SquadCard.tsx           # Individual squad card with Launch
│       │   │   │   ├── LaunchModal.tsx         # Squad execution modal
│       │   │   │   └── ExecutionProgress.tsx   # Progress indicator
│       │   │   │
│       │   │   ├── providers/
│       │   │   │   ├── ProviderList.tsx        # Provider management page
│       │   │   │   ├── ProviderForm.tsx        # Add/edit provider form
│       │   │   │   └── ProviderStatus.tsx      # Health check indicator
│       │   │   │
│       │   │   └── ui/                         # Shared UI primitives
│       │   │       ├── Button.tsx
│       │   │       ├── Card.tsx
│       │   │       ├── Input.tsx
│       │   │       ├── Badge.tsx
│       │   │       ├── Modal.tsx
│       │   │       ├── Dropdown.tsx
│       │   │       ├── Toast.tsx
│       │   │       ├── Tabs.tsx
│       │   │       ├── ProgressBar.tsx
│       │   │       └── Skeleton.tsx
│       │   │
│       │   ├── lib/
│       │   │   ├── api-client.ts              # Typed fetch wrapper for all API routes
│       │   │   ├── ws-client.ts               # WebSocket connection manager
│       │   │   ├── file-icons.ts              # File extension → icon mapping
│       │   │   ├── nexus-bridge.ts            # Server-side: imports from src/ modules
│       │   │   └── providers.ts               # Provider CRUD + .env.local management
│       │   │
│       │   ├── hooks/
│       │   │   ├── useProject.ts              # Active project state
│       │   │   ├── useFileTree.ts             # File tree data + actions
│       │   │   ├── useTerminal.ts             # Terminal WebSocket connection
│       │   │   ├── useChat.ts                 # Chat WebSocket + message history
│       │   │   ├── useArtifacts.ts            # Artifact panel state
│       │   │   ├── useTabs.ts                 # Tab management
│       │   │   └── useSquadLauncher.ts        # Squad execution state
│       │   │
│       │   └── stores/
│       │       └── app-store.ts               # Zustand store definition
│       │
│       ├── server/
│       │   ├── ws-server.ts                   # WebSocket server (terminal + chat)
│       │   ├── terminal-manager.ts            # node-pty process management
│       │   └── chat-handler.ts                # AI chat proxy with context injection
│       │
│       └── public/
│           └── fonts/                         # Google Sans (self-hosted for offline)
│
├── src/                                       # NEXUS Core (existing, unchanged)
├── squads/                                    # Squads (existing, unchanged)
├── docs/                                      # Knowledge & docs (existing)
└── config/                                    # Config (existing)
```

---

## 3. Core Integration Layer — `nexus-bridge.ts`

O ponto central de integração. Importa os módulos do NEXUS core e expõe como funções tipadas para uso nas API routes.

```typescript
// packages/console/src/lib/nexus-bridge.ts
//
// This module runs SERVER-SIDE ONLY (in API routes).
// It imports directly from the NEXUS core src/ modules.
// The NEXUS_ROOT env var must point to the project root.

import path from 'node:path';

// Set NEXUS_ROOT so src/shared/paths.js resolves correctly
process.env.NEXUS_ROOT = process.env.NEXUS_ROOT || path.resolve(process.cwd(), '../..');

// --- Project ---
export {
  createProject,
  listProjects,
  getProject,
  getProjectStats,
  selectProject,
  getActiveProject,
  getActiveProjectSlug,
  setVisibility,
} from '../../../src/project/index.js';

// --- SCA Engine ---
export {
  parseSubstrate,
  validateSubstrate,
  writeSubstrate,
  composeBlock,
  writeBlock,
  checkStaleness,
  generateContext,
  saveContext,
  impactAnalysis,
  healthCheck,
} from '../../../src/sca-engine/index.js';

// --- Squad Adapter ---
export {
  listSquads,
  getSquad,
  getSquadDetails,
  findSquadsByOutput,
  executeSquad,
  injectContext,
} from '../../../src/squad-adapter/index.js';

// --- Request Router ---
export {
  analyzeRequest,
  matchSquad,
} from '../../../src/request-router/index.js';

// --- Campaign ---
export {
  listPipelines,
  loadPipeline,
  renderPipelineAscii,
  executeCampaign,
  listCampaigns,
} from '../../../src/campaign/index.js';

// --- Dashboard ---
export {
  getDashboardMetrics,
} from '../../../src/dashboard/index.js';

// --- Integrations ---
export {
  listIntegrations,
  checkHealth,
} from '../../../src/integrations/index.js';

// --- Capture ---
export {
  importFile,
} from '../../../src/capture/index.js';

// --- Explorer (map) ---
export {
  buildSystemMap,
} from '../../../src/explorer/map-builder.js';

// --- Shared ---
export { paths } from '../../../src/shared/paths.js';
export * from '../../../src/shared/errors.js';
```

### 3.1 Error Mapping

```typescript
// packages/console/src/lib/error-handler.ts

import { NexusError, NotFoundError, ValidationError, SecurityError } from './nexus-bridge';

export function nexusErrorToResponse(error: unknown): Response {
  if (error instanceof NotFoundError) {
    return Response.json({ error: error.message }, { status: 404 });
  }
  if (error instanceof ValidationError) {
    return Response.json({ error: error.message, details: error.details }, { status: 400 });
  }
  if (error instanceof SecurityError) {
    return Response.json({ error: error.message }, { status: 403 });
  }
  if (error instanceof NexusError) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  console.error('Unexpected error:', error);
  return Response.json({ error: 'Internal server error' }, { status: 500 });
}
```

---

## 4. API Routes Design

### 4.1 Route Map

| Route | Method | Handler | NEXUS Module |
|-------|--------|---------|-------------|
| `/api/projects` | GET | List all projects with stats | `project.listProjects()` + `project.getProjectStats()` |
| `/api/projects` | POST | Create project | `project.createProject()` |
| `/api/projects/active` | GET | Get active project | `project.getActiveProject()` |
| `/api/projects/active` | POST | Select active project | `project.selectProject()` |
| `/api/projects/[slug]` | GET | Project details | `project.getProject()` + stats |
| `/api/sca/substrates` | GET | List substrates | Filesystem scan via `sca-engine` |
| `/api/sca/substrates` | POST | Create substrate | `sca-engine.validateSubstrate()` + `writeSubstrate()` |
| `/api/sca/substrates/[id]` | GET | View substrate | `sca-engine.parseSubstrate()` |
| `/api/sca/substrates/[id]` | PUT | Edit substrate | Validate + write new version |
| `/api/sca/substrates/[id]/impact` | GET | Impact analysis | `sca-engine.impactAnalysis()` |
| `/api/sca/blocks` | GET | List blocks | Filesystem scan |
| `/api/sca/health` | GET | Knowledge health | `sca-engine.healthCheck()` |
| `/api/squads` | GET | List all squads | `squad-adapter.listSquads()` |
| `/api/squads/[name]` | GET | Squad details | `squad-adapter.getSquadDetails()` |
| `/api/squads/[name]/launch` | POST | Execute squad | `squad-adapter.executeSquad()` |
| `/api/squads/[name]/history` | GET | Execution history | Scan squad output dir |
| `/api/pipelines` | GET | List pipelines | `campaign.listPipelines()` |
| `/api/pipelines/[name]` | GET | Pipeline details + ASCII | `campaign.loadPipeline()` |
| `/api/campaigns` | GET | List campaigns | `campaign.listCampaigns()` |
| `/api/campaigns` | POST | Run campaign | `campaign.executeCampaign()` |
| `/api/dashboard` | GET | Dashboard metrics | `dashboard.getDashboardMetrics()` |
| `/api/files/tree` | GET | Directory tree | Custom `buildTree()` |
| `/api/files/[...path]` | GET | Read file | `fs.readFile()` |
| `/api/files/[...path]` | PUT | Write file | `fs.writeFile()` |
| `/api/files/[...path]` | DELETE | Delete file | `fs.unlink()` with confirmation |
| `/api/integrations` | GET | List integrations | `integrations.listIntegrations()` |
| `/api/providers` | GET/POST | CRUD providers | `config/providers/*.yaml` |
| `/api/providers/[id]` | PUT/DELETE | Update/remove | YAML file ops |
| `/api/providers/[id]/test` | POST | Health check | Provider-specific test call |
| `/api/upload` | POST | File upload | Multipart → save to target dir |
| `/api/commands` | GET | CLI command registry | Static command list for autocompletion |

### 4.2 Example API Route Implementation

```typescript
// packages/console/src/app/api/projects/route.ts

import { listProjects, getProjectStats, createProject } from '@/lib/nexus-bridge';
import { nexusErrorToResponse } from '@/lib/error-handler';

export async function GET() {
  try {
    const projects = await listProjects();
    const withStats = await Promise.all(
      projects.map(async (p) => ({
        ...p,
        stats: await getProjectStats(p.slug),
      }))
    );
    return Response.json(withStats);
  } catch (error) {
    return nexusErrorToResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { slug, ...metadata } = await request.json();
    const result = await createProject(slug, metadata);
    return Response.json(result, { status: 201 });
  } catch (error) {
    return nexusErrorToResponse(error);
  }
}
```

### 4.3 File Tree API

```typescript
// packages/console/src/app/api/files/tree/route.ts

import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
  extension?: string;
  protected?: boolean;
}

const IGNORED = new Set([
  'node_modules', '.git', '.aios-core', 'coverage',
  '.claude', '.aios', 'dist', '.next',
]);

const PROTECTED_PREFIXES = ['.aios-core/core', '.aios-core/development'];

export async function GET(request: Request) {
  const root = process.env.NEXUS_ROOT || process.cwd();
  const { searchParams } = new URL(request.url);
  const basePath = searchParams.get('path') || root;

  const tree = await buildTree(basePath, root);
  return Response.json(tree);
}

async function buildTree(dirPath: string, root: string, depth = 0): Promise<TreeNode[]> {
  if (depth > 5) return []; // Max depth guard

  const entries = await readdir(dirPath, { withFileTypes: true });
  const nodes: TreeNode[] = [];

  for (const entry of entries.sort((a, b) => {
    // Directories first, then alphabetical
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
    return a.name.localeCompare(b.name);
  })) {
    if (IGNORED.has(entry.name) || entry.name.startsWith('.')) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(root, fullPath);

    const node: TreeNode = {
      name: entry.name,
      path: relativePath,
      type: entry.isDirectory() ? 'directory' : 'file',
      protected: PROTECTED_PREFIXES.some(p => relativePath.startsWith(p)),
    };

    if (entry.isFile()) {
      node.extension = path.extname(entry.name).slice(1);
    }

    if (entry.isDirectory()) {
      node.children = await buildTree(fullPath, root, depth + 1);
    }

    nodes.push(node);
  }

  return nodes;
}
```

---

## 5. WebSocket Server

### 5.1 Architecture

```
Browser                           Next.js Server
  │                                    │
  ├── xterm.js ──WebSocket──→ /ws/terminal ──→ node-pty (zsh)
  │                                    │
  └── Chat UI ──WebSocket──→ /ws/chat ──→ AI Provider (Claude API)
                                       │
                                  Context injection
                                  (active project, substrates)
```

### 5.2 WebSocket Server Setup

```typescript
// packages/console/server/ws-server.ts

import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'node:http';
import { TerminalManager } from './terminal-manager';
import { ChatHandler } from './chat-handler';

export function createWSServer(httpServer: ReturnType<typeof createServer>) {
  const wss = new WebSocketServer({ noServer: true });

  const terminalManager = new TerminalManager();
  const chatHandler = new ChatHandler();

  httpServer.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url!, `http://${request.headers.host}`);

    if (pathname === '/ws/terminal') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        terminalManager.attach(ws);
      });
    } else if (pathname === '/ws/chat') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        chatHandler.attach(ws);
      });
    } else {
      socket.destroy();
    }
  });

  return wss;
}
```

### 5.3 Terminal Manager

```typescript
// packages/console/server/terminal-manager.ts

import { spawn, IPty } from 'node-pty';
import { WebSocket } from 'ws';

export class TerminalManager {
  private sessions = new Map<string, IPty>();

  attach(ws: WebSocket) {
    const sessionId = crypto.randomUUID();
    const shell = process.env.SHELL || '/bin/zsh';
    const cwd = process.env.NEXUS_ROOT || process.cwd();

    const pty = spawn(shell, [], {
      name: 'xterm-256color',
      cols: 120,
      rows: 30,
      cwd,
      env: { ...process.env, TERM: 'xterm-256color' },
    });

    this.sessions.set(sessionId, pty);

    // PTY output → WebSocket
    pty.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'output', data }));
      }
    });

    pty.onExit(({ exitCode }) => {
      ws.send(JSON.stringify({ type: 'exit', exitCode }));
      this.sessions.delete(sessionId);
    });

    // WebSocket input → PTY
    ws.on('message', (msg) => {
      const message = JSON.parse(msg.toString());
      switch (message.type) {
        case 'input':
          pty.write(message.data);
          break;
        case 'resize':
          pty.resize(message.cols, message.rows);
          break;
      }
    });

    ws.on('close', () => {
      pty.kill();
      this.sessions.delete(sessionId);
    });

    ws.send(JSON.stringify({ type: 'ready', sessionId }));
  }
}
```

### 5.4 Chat Handler

```typescript
// packages/console/server/chat-handler.ts

import { WebSocket } from 'ws';
import { getActiveProject, getProjectStats } from '../src/lib/nexus-bridge';

export class ChatHandler {
  attach(ws: WebSocket) {
    ws.on('message', async (msg) => {
      const message = JSON.parse(msg.toString());

      if (message.type === 'chat') {
        await this.handleChat(ws, message.content, message.history);
      }
    });
  }

  private async handleChat(ws: WebSocket, content: string, history: any[]) {
    // 1. Build context from active project
    const context = await this.buildProjectContext();

    // 2. Detect if it's a NEXUS command
    if (content.trim().startsWith('*')) {
      ws.send(JSON.stringify({
        type: 'command_detected',
        command: content.trim(),
        suggestion: 'Execute this in the terminal?',
      }));
      return;
    }

    // 3. Call AI provider (Claude API)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'ANTHROPIC_API_KEY not configured. Add it in Settings > Providers.',
      }));
      return;
    }

    try {
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
          system: `You are NEXUS Assistant, helping the operator manage their business system. ${context}`,
          messages: [
            ...history,
            { role: 'user', content },
          ],
          stream: true,
        }),
      });

      // Stream response token by token
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta') {
              ws.send(JSON.stringify({
                type: 'chat_delta',
                text: parsed.delta.text,
              }));
            }
          } catch { /* skip malformed */ }
        }
      }

      ws.send(JSON.stringify({ type: 'chat_complete' }));
    } catch (error: any) {
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  }

  private async buildProjectContext(): Promise<string> {
    try {
      const project = await getActiveProject();
      if (!project) return 'No active project selected.';

      const stats = await getProjectStats(project.slug);
      return `Active project: ${project.name} (${project.slug}). ` +
        `Substrates: ${stats.substrates}, Blocks: ${stats.blocks}, ` +
        `Contexts: ${stats.contexts}, Outputs: ${stats.outputs}. ` +
        `Market: ${project.market_profile || 'not set'}.`;
    } catch {
      return '';
    }
  }
}
```

---

## 6. Frontend Architecture

### 6.1 App Shell Layout

```typescript
// packages/console/src/components/layout/Shell.tsx

'use client';

import { useAppStore } from '@/stores/app-store';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusBar } from './StatusBar';
import { ArtifactPanel } from './ArtifactPanel';
import { TerminalPanel } from '../terminal/TerminalPanel';
import { ResizeHandle } from './ResizeHandle';

export function Shell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, artifactPanelOpen, terminalOpen } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-bg-primary text-text-primary">
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <>
            <Sidebar className="w-[260px] flex-shrink-0" />
            <ResizeHandle direction="horizontal" target="sidebar" />
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {children}
          </div>

          {/* Terminal Panel (bottom) */}
          {terminalOpen && (
            <>
              <ResizeHandle direction="vertical" target="terminal" />
              <TerminalPanel className="h-[300px] flex-shrink-0" />
            </>
          )}
        </main>

        {/* Artifact Panel (right) */}
        {artifactPanelOpen && (
          <>
            <ResizeHandle direction="horizontal" target="artifact" />
            <ArtifactPanel className="w-[400px] flex-shrink-0" />
          </>
        )}
      </div>

      <StatusBar />
    </div>
  );
}
```

### 6.2 Zustand Store

```typescript
// packages/console/src/stores/app-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Tab {
  id: string;
  path: string;
  name: string;
  type: 'code' | 'markdown' | 'html' | 'pdf' | 'image';
  dirty: boolean;
}

interface Artifact {
  id: string;
  type: 'document' | 'code' | 'html' | 'data' | 'image';
  title: string;
  content: string;
  timestamp: number;
}

interface AppState {
  // Layout
  sidebarOpen: boolean;
  artifactPanelOpen: boolean;
  terminalOpen: boolean;
  sidebarWidth: number;
  artifactPanelWidth: number;
  terminalHeight: number;

  // Navigation
  activeView: 'dashboard' | 'chat' | 'files' | 'sca' | 'squads' | 'pipelines' | 'outputs' | 'settings';

  // Project
  activeProject: string | null;

  // Tabs
  tabs: Tab[];
  activeTabId: string | null;

  // Artifacts
  artifacts: Artifact[];

  // Actions
  toggleSidebar: () => void;
  toggleArtifactPanel: () => void;
  toggleTerminal: () => void;
  setActiveView: (view: AppState['activeView']) => void;
  setActiveProject: (slug: string) => void;
  openTab: (tab: Omit<Tab, 'id' | 'dirty'>) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  addArtifact: (artifact: Omit<Artifact, 'id' | 'timestamp'>) => void;
  clearArtifacts: () => void;
  resize: (target: 'sidebar' | 'artifact' | 'terminal', size: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Defaults
      sidebarOpen: true,
      artifactPanelOpen: false,
      terminalOpen: true,
      sidebarWidth: 260,
      artifactPanelWidth: 400,
      terminalHeight: 300,
      activeView: 'dashboard',
      activeProject: null,
      tabs: [],
      activeTabId: null,
      artifacts: [],

      // Actions
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleArtifactPanel: () => set((s) => ({ artifactPanelOpen: !s.artifactPanelOpen })),
      toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
      setActiveView: (view) => set({ activeView: view }),
      setActiveProject: (slug) => set({ activeProject: slug }),

      openTab: (tab) => set((s) => {
        const existing = s.tabs.find(t => t.path === tab.path);
        if (existing) return { activeTabId: existing.id };
        const id = crypto.randomUUID();
        return {
          tabs: [...s.tabs, { ...tab, id, dirty: false }],
          activeTabId: id,
        };
      }),

      closeTab: (id) => set((s) => {
        const tabs = s.tabs.filter(t => t.id !== id);
        const activeTabId = s.activeTabId === id
          ? tabs[tabs.length - 1]?.id ?? null
          : s.activeTabId;
        return { tabs, activeTabId };
      }),

      setActiveTab: (id) => set({ activeTabId: id }),

      addArtifact: (artifact) => set((s) => ({
        artifacts: [{
          ...artifact,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        }, ...s.artifacts].slice(0, 50), // Keep last 50
        artifactPanelOpen: true,
      })),

      clearArtifacts: () => set({ artifacts: [] }),

      resize: (target, size) => set(() => {
        switch (target) {
          case 'sidebar': return { sidebarWidth: Math.max(200, Math.min(400, size)) };
          case 'artifact': return { artifactPanelWidth: Math.max(300, Math.min(600, size)) };
          case 'terminal': return { terminalHeight: Math.max(150, Math.min(500, size)) };
        }
      }),
    }),
    {
      name: 'nexus-console-state',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        terminalOpen: state.terminalOpen,
        activeView: state.activeView,
        activeProject: state.activeProject,
        sidebarWidth: state.sidebarWidth,
        terminalHeight: state.terminalHeight,
      }),
    }
  )
);
```

### 6.3 Design Token Integration (Tailwind)

```typescript
// packages/console/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Antigravity Google Design System
        bg: {
          primary: 'var(--color-bg-primary)',       // #ffffff
          surface: 'var(--color-bg-surface)',       // #f8f9fa
          elevated: 'var(--color-bg-elevated)',     // #ffffff
          dark: 'var(--color-bg-dark)',             // #202124
        },
        text: {
          primary: 'var(--color-text-primary)',     // #202124
          secondary: 'var(--color-text-secondary)', // #5f6368
          tertiary: 'var(--color-text-tertiary)',   // #80868b
          disabled: 'var(--color-text-disabled)',   // #bdc1c6
        },
        accent: {
          blue: 'var(--color-accent-blue)',         // #4285f4
          'blue-dark': 'var(--color-accent-blue-dark)',  // #1967d2
          'blue-light': 'var(--color-accent-blue-light)',// #d2e3fc
          green: 'var(--color-accent-green)',       // #34a853
          yellow: 'var(--color-accent-yellow)',     // #fbbc04
          red: 'var(--color-accent-red)',           // #ea4335
        },
        state: {
          success: 'var(--color-state-success)',
          'success-bg': 'var(--color-state-success-bg)',
          warning: 'var(--color-state-warning)',
          'warning-bg': 'var(--color-state-warning-bg)',
          error: 'var(--color-state-error)',
          'error-bg': 'var(--color-state-error-bg)',
          info: 'var(--color-state-info)',
          'info-bg': 'var(--color-state-info-bg)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',     // #f1f3f4
          DEFAULT: 'var(--color-border-default)',   // #e8eaed
          strong: 'var(--color-border-strong)',     // #bdc1c6
          focus: 'var(--color-border-focus)',       // #4285f4
        },
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['Google Sans Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(60,64,67,.30), 0 1px 3px rgba(60,64,67,.15)',
        md: '0 2px 6px rgba(60,64,67,.15), 0 1px 2px rgba(60,64,67,.30)',
        lg: '0 4px 8px rgba(60,64,67,.15), 0 1px 3px rgba(60,64,67,.30)',
        xl: '0 8px 24px rgba(60,64,67,.15), 0 4px 8px rgba(60,64,67,.20)',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '350ms',
      },
    },
  },
  plugins: [],
};

export default config;
```

```css
/* packages/console/src/app/globals.css */

@import 'tailwindcss';

/* Antigravity Google Design Tokens */
:root {
  --color-bg-primary:   #ffffff;
  --color-bg-surface:   #f8f9fa;
  --color-bg-elevated:  #ffffff;
  --color-bg-dark:      #202124;

  --color-text-primary:   #202124;
  --color-text-secondary: #5f6368;
  --color-text-tertiary:  #80868b;
  --color-text-disabled:  #bdc1c6;
  --color-text-on-dark:   #ffffff;
  --color-text-on-primary: #ffffff;

  --color-accent-blue:       #4285f4;
  --color-accent-blue-dark:  #1967d2;
  --color-accent-blue-light: #d2e3fc;
  --color-accent-green:      #34a853;
  --color-accent-yellow:     #fbbc04;
  --color-accent-red:        #ea4335;

  --color-state-success:    #34a853;
  --color-state-success-bg: #e6f4ea;
  --color-state-warning:    #fbbc04;
  --color-state-warning-bg: #fef7e0;
  --color-state-error:      #ea4335;
  --color-state-error-bg:   #fce8e6;
  --color-state-info:       #4285f4;
  --color-state-info-bg:    #e8f0fe;

  --color-border-subtle:  #f1f3f4;
  --color-border-default: #e8eaed;
  --color-border-strong:  #bdc1c6;
  --color-border-focus:   #4285f4;

  --font-family-base:  "Google Sans", "Roboto", system-ui, sans-serif;
  --font-family-mono:  "Google Sans Mono", ui-monospace, monospace;

  --shadow-sm:  0 1px 2px rgba(60,64,67,.30), 0 1px 3px rgba(60,64,67,.15);
  --shadow-md:  0 2px 6px rgba(60,64,67,.15), 0 1px 2px rgba(60,64,67,.30);
  --shadow-lg:  0 4px 8px rgba(60,64,67,.15), 0 1px 3px rgba(60,64,67,.30);
  --shadow-xl:  0 8px 24px rgba(60,64,67,.15), 0 4px 8px rgba(60,64,67,.20);

  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   350ms ease;
  --transition-spring: 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 6.4 Lazy Loading Strategy

```typescript
// Heavy components loaded on demand
import dynamic from 'next/dynamic';

// Monaco Editor — ~500KB (only when opening code files)
export const MonacoEditor = dynamic(
  () => import('@/components/editor/MonacoEditor'),
  { loading: () => <Skeleton className="h-full" />, ssr: false }
);

// Terminal — ~150KB (only when terminal panel is opened)
export const Terminal = dynamic(
  () => import('@/components/terminal/Terminal'),
  { loading: () => <Skeleton className="h-full" />, ssr: false }
);

// PDF Viewer — ~200KB (only when opening .pdf files)
export const PdfViewer = dynamic(
  () => import('@/components/editor/PdfViewer'),
  { loading: () => <Skeleton className="h-full" />, ssr: false }
);
```

---

## 7. Provider Management Architecture

### 7.1 Provider Storage

```yaml
# config/providers/openai-dalle.yaml
id: openai-dalle
name: OpenAI DALL-E
type: image-gen
endpoint: https://api.openai.com/v1/images/generations
model: dall-e-3
env_key: OPENAI_API_KEY          # References .env.local
status: active
created_at: 2026-02-26T00:00:00Z
```

### 7.2 Provider Types

```typescript
type ProviderType = 'image-gen' | 'transcription' | 'llm' | 'search';

interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  endpoint: string;
  model?: string;
  env_key: string;              // Key name in .env.local
  status: 'active' | 'inactive' | 'error';
  created_at: string;
  last_tested?: string;
  last_error?: string;
}
```

### 7.3 Security: API Key Storage

- API keys stored ONLY in `.env.local` (gitignored)
- Provider YAML stores `env_key` (name), never the actual key
- Console UI writes to `.env.local` on provider save
- Provider test reads key from `process.env[provider.env_key]`

---

## 8. Upload & Media Pipeline

```
User drops file
      │
      ├── Image (.png/.jpg/.webp/.svg)
      │     │
      │     ├── Save to temp → Preview inline
      │     └── Option: Send to squad (design-extractor, etc.)
      │
      ├── Audio (.mp3/.wav/.m4a)
      │     │
      │     ├── Save to temp
      │     ├── Call transcription provider (Whisper API)
      │     ├── Return text → Show in editable textarea
      │     └── Option: Save as substrate or capture note
      │
      └── Document (.md/.txt/.pdf/.json/.yaml)
            │
            ├── Save to project directory
            └── Open in appropriate viewer
```

### 8.1 Upload API Route

```typescript
// packages/console/src/app/api/upload/route.ts

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const UPLOAD_DIR = '.aios/console/uploads';
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const target = formData.get('target') as string || UPLOAD_DIR;

  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 });
  if (file.size > MAX_SIZE) return Response.json({ error: 'File too large (max 50MB)' }, { status: 400 });

  const root = process.env.NEXUS_ROOT || process.cwd();
  const targetDir = path.resolve(root, target);

  // Security: prevent path traversal
  if (!targetDir.startsWith(root)) {
    return Response.json({ error: 'Invalid target path' }, { status: 403 });
  }

  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(targetDir, file.name);
  await writeFile(filePath, buffer);

  return Response.json({
    path: path.relative(root, filePath),
    name: file.name,
    size: file.size,
    type: file.type,
  }, { status: 201 });
}
```

---

## 9. Custom Next.js Server (WebSocket Integration)

Next.js API routes don't natively support WebSocket. We need a custom server.

```typescript
// packages/console/server.ts

import { createServer } from 'node:http';
import next from 'next';
import { parse } from 'node:url';
import { createWSServer } from './server/ws-server';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Attach WebSocket server
  createWSServer(server);

  server.listen(port, () => {
    console.log(`🔷 NEXUS Console ready at http://${hostname}:${port}`);
  });
});
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "next build",
    "start": "NODE_ENV=production tsx server.ts"
  }
}
```

---

## 10. Dependency Summary

### Production

| Package | Version | Purpose | Bundle Impact |
|---------|---------|---------|---------------|
| next | 15.x | Framework | Core |
| react | 19.x | UI | Core |
| react-dom | 19.x | DOM | Core |
| tailwindcss | 4.x | Styling | CSS only |
| zustand | 5.x | State | ~2KB |
| @monaco-editor/react | 4.x | Code editor | ~500KB lazy |
| xterm | 5.x | Terminal | ~150KB lazy |
| xterm-addon-fit | 0.x | Terminal resize | ~2KB |
| xterm-addon-web-links | 0.x | Clickable links | ~3KB |
| react-markdown | 9.x | Markdown render | ~50KB |
| remark-gfm | 4.x | GFM tables/checkboxes | ~15KB |
| rehype-highlight | 7.x | Code highlighting | ~20KB |
| rehype-slug | 6.x | Heading anchors | ~2KB |
| remark-frontmatter | 5.x | YAML frontmatter | ~3KB |
| react-pdf | 9.x | PDF viewer | ~200KB lazy |
| lucide-react | 0.x | Icons | Tree-shakeable |
| ws | 8.x | WebSocket server | Server only |
| node-pty | 1.x | PTY terminal | Server only (native) |
| gray-matter | 4.x | Frontmatter parse | Already in core |
| mermaid | 11.x | Diagram rendering | ~300KB lazy |

### Dev

| Package | Purpose |
|---------|---------|
| typescript | Type checking |
| tsx | Run TypeScript server |
| @types/node | Node.js types |
| @types/react | React types |
| @types/ws | WebSocket types |
| eslint + config | Linting |

---

## 11. Security Considerations

| Concern | Mitigation |
|---------|------------|
| Path traversal (file API) | Resolve + validate all paths start with `NEXUS_ROOT` |
| Command injection (terminal) | node-pty spawns real shell — user has full access (local only) |
| API keys exposure | Stored in `.env.local` (gitignored), never in YAML or responses |
| HTML iframe XSS | Sandbox attribute: `allow-scripts allow-same-origin` only |
| File upload abuse | Max 50MB, type validation, save to controlled directory |
| WebSocket hijacking | Local-only by default (`localhost`), no auth needed for single-user |
| VPS deployment | Add basic auth middleware or reverse proxy (nginx) when deploying |

---

## 12. Future Considerations (Not in MVP)

- **Dark mode:** CSS custom properties already support theme switching — add `[data-theme="dark"]` layer
- **Authentication:** For VPS deploy, add NextAuth.js or simple token-based auth
- **Database:** If file-based state becomes limiting, migrate session/metrics to SQLite
- **Plugin system:** Squad-specific UI panels as loadable plugins
- **Mobile responsive:** Current design is desktop-first (1280px min)
- **Collaborative:** Multi-user with WebSocket rooms (conflict resolution needed)

---

*— Aria, arquitetando o futuro 🏗️*
