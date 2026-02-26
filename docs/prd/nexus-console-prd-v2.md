# NEXUS Console — Product Requirements Document (PRD) v2.0

> **Interface Visual do NEXUS — Dashboard de Controle & Operação**
> **Projeto:** Leonardo Gazola / Innovatech
> **Autor:** Morgan (PM Agent) + Leonardo Gazola
> **Data:** 2026-02-26
> **Status:** Draft — aguardando aprovação
> **Predecessor:** `docs/prd/nexus-prd-v1.md` (Epics 1-4, 100% implementados)

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-26 | 2.0 | PRD NEXUS Console — Epic 5 (12 stories) | Morgan + Leonardo |

---

## 1. Goals

1. **Criar uma interface web visual (NEXUS Console)** que funcione como painel de controle e operação do sistema NEXUS — substituindo o uso exclusivo do terminal
2. **Integrar chat com IA** para enviar comandos e receber respostas em tempo real, estilo Cursor/Claude
3. **Visualizar documentos** (markdown renderizado estilo Notion, código com syntax highlighting, HTML/sites em preview, PDFs) sem sair da interface
4. **Manter o sistema local-first** — roda no MacBook com `npm run dev`, mas arquitetura preparada para deploy em VPS
5. **Aplicar o design system PeelKit** como linguagem visual base (tokens já extraídos)
6. **Single-user** — sem necessidade de autenticação ou multi-tenancy na interface (o controle de projetos já existe no NEXUS core)

## 2. Background Context

O NEXUS v1 está 100% funcional via CLI — 22 stories em 4 épicos implementados. O sistema gerencia projetos, substratos, blocos, squads, campanhas e pipelines. Porém, toda interação é via terminal, o que limita:

- **Visualização:** Documentos markdown são texto puro, sem formatação visual
- **Navegação:** Requer memorizar comandos e caminhos de arquivo
- **Feedback:** Outputs gerados (landing pages, HTMLs) não podem ser visualizados inline
- **Produtividade:** Trocar entre terminal, editor de código e browser constantemente

Já existe um protótipo — o **NEXUS Explorer** (`src/explorer/`) — que é uma SPA vanilla (HTML/CSS/JS) read-only rodando em `localhost:3737`. Ele exibe overview, squads, pipelines e arquitetura, mas **não permite interação, edição ou controle**.

O design system **PeelKit** foi extraído pelo design-extractor-squad com 80+ tokens (cores, tipografia, spacing, shadows) prontos para uso.

### Decisão de Stack

| Decisão | Escolha | Rationale |
|---------|---------|-----------|
| Framework | **Next.js 15 + React 19** | SSR, API routes, deploy fácil, ecossistema rico |
| Styling | **Tailwind CSS + Antigravity Google tokens** | Utility-first com design tokens do DS de referência |
| State | **Zustand** | Leve, sem boilerplate, ideal para single-user |
| Terminal | **xterm.js** | Terminal emulator web padrão da indústria |
| Markdown | **react-markdown + rehype** | Renderização rica com plugins |
| Code | **Monaco Editor** | Mesmo editor do VS Code, com syntax highlighting |
| Comunicação | **WebSocket** | Real-time bidirecional para chat e terminal |
| Monorepo | **Workspace do npm** | Manter junto ao projeto existente em `packages/console` |

---

## 3. Requirements

### 3.1 Functional Requirements

**Layout & Navigation:**

- **FR1:** A Console deve ter layout responsivo com: sidebar de navegação, área principal de conteúdo, e painel lateral redimensionável (para artefatos/preview)
- **FR2:** A sidebar deve mostrar: projetos, file explorer (tree view), squads, pipelines, outputs recentes
- **FR3:** O painel lateral deve funcionar como "artifact panel" — exibe preview de documentos, código, HTMLs em paralelo ao conteúdo principal
- **FR4:** A Console deve suportar tabs no conteúdo principal, permitindo abrir múltiplos documentos/views simultaneamente

**Terminal Integrado:**

- **FR5:** A Console deve ter terminal embutido (xterm.js) que executa comandos `*` do NEXUS e comandos shell padrão
- **FR6:** O terminal deve ter acesso ao filesystem do projeto e refletir o projeto NEXUS ativo
- **FR7:** O terminal deve suportar autocompletion para comandos `*` do NEXUS (lista de comandos via API)
- **FR8:** O terminal deve ser redimensionável e poder ser posicionado na parte inferior ou lateral

**Chat com IA:**

- **FR9:** A Console deve ter interface de chat que envia mensagens para o Claude (via API ou Claude Code como backend)
- **FR10:** O chat deve suportar markdown rendering nas respostas (code blocks, tabelas, listas)
- **FR11:** O chat deve ter contexto do projeto ativo — sabe quais substratos, blocos e outputs existem
- **FR12:** As respostas do chat podem gerar "artefatos" (documentos, código, previews) que aparecem no painel lateral

**Document Viewer — Markdown:**

- **FR13:** Ao abrir um arquivo `.md`, a Console deve renderizar markdown estilo Notion/Obsidian — headings, tabelas, listas, code blocks, checkboxes, imagens
- **FR14:** Deve haver toggle entre "Source" (editor de código) e "Preview" (renderizado) com botão visível
- **FR15:** O editor de markdown deve ter toolbar básica (bold, italic, heading, link, code, list)
- **FR16:** Frontmatter YAML deve ser exibido como metadata card no topo, não como código

**Document Viewer — Código:**

- **FR17:** Ao abrir arquivos de código (.js, .ts, .yaml, .json, .css, .html), usar Monaco Editor com syntax highlighting
- **FR18:** Monaco deve ter: line numbers, minimap, search/replace, fold/unfold
- **FR19:** Arquivos read-only do framework (L1/L2) devem abrir em modo read-only com badge visual

**Document Viewer — HTML/Sites:**

- **FR20:** Ao abrir arquivos `.html`, exibir preview renderizado em iframe sandbox
- **FR21:** Deve haver toggle entre "Code" e "Preview" para arquivos HTML
- **FR22:** Preview deve suportar responsive mode (desktop/tablet/mobile toggle)
- **FR23:** Outputs do design-extractor-squad (landing pages) devem abrir automaticamente em preview mode

**Document Viewer — PDF:**

- **FR24:** Ao abrir arquivos `.pdf`, renderizar inline com navegação de páginas
- **FR25:** PDF viewer com zoom, fit-to-width, e download

**File Explorer:**

- **FR26:** Tree view hierárquica do projeto com ícones por tipo de arquivo
- **FR27:** Ações contextuais: abrir, renomear, criar novo arquivo/pasta, deletar (com confirmação)
- **FR28:** Filtro rápido por nome/tipo
- **FR29:** Indicadores visuais para: arquivos modificados (git), arquivo ativo, projetos knowledge

**Dashboard & Monitoring:**

- **FR30:** Dashboard overview: projetos, squads ativos, outputs recentes, campanhas, knowledge health
- **FR31:** Squad monitor: status de cada squad, última execução, outputs produzidos
- **FR32:** Campaign timeline: histórico de campanhas com status e outputs

**Artefatos (Artifact Panel):**

- **FR33:** Quando o chat ou um squad gera output, exibir como artefato no painel lateral
- **FR34:** Artefatos suportam: markdown renderizado, HTML preview, código, JSON formatado, imagens
- **FR35:** Artefatos podem ser salvos como arquivo no projeto, copiados ou descartados
- **FR36:** Histórico de artefatos da sessão acessível via tab

### 3.2 Non-Functional Requirements

- **NFR1:** A Console deve iniciar em < 5 segundos com `npm run dev` (ou `nexus console`)
- **NFR2:** O backend (API routes) deve se comunicar com o filesystem local — sem banco de dados no MVP
- **NFR3:** A arquitetura deve separar frontend (Next.js) e backend (API/WebSocket) para futuro deploy em VPS
- **NFR4:** O design deve seguir os tokens Antigravity Google — light theme como default, com possibilidade de dark theme futuro via CSS custom properties
- **NFR5:** A Console deve funcionar offline para operações locais (file browsing, markdown viewing, code editing)
- **NFR6:** O terminal WebSocket deve ter latência < 100ms para comandos locais
- **NFR7:** O bundle do frontend deve ser < 2MB gzipped (lazy loading de Monaco e xterm)
- **NFR8:** A Console NÃO precisa de autenticação — single user, acesso local only
- **NFR9:** Toda operação destrutiva (deletar arquivo, executar comando) deve ter confirmação visual

---

## 4. UI Design Goals

### 4.1 Overall UX Vision

A NEXUS Console é o "cockpit" do operador NEXUS. A experiência deve combinar a produtividade de um IDE (VS Code) com a clareza visual de um dashboard (Notion). O operador deve poder:
1. Ver o estado do sistema de relance (dashboard)
2. Conversar com a IA e dar comandos (chat)
3. Visualizar outputs sendo criados (artefatos)
4. Editar documentos e código (editor)
5. Executar operações (terminal)

Tudo sem sair da interface.

### 4.2 Design System — Antigravity Google (Base Reference)

**Referência:** `Deisgh system ideia/antigravity-google-design-system.html`

O design system da Console segue o estilo **Antigravity Google** — limpo, moderno, com espaçamento generoso e hierarquia visual clara. Tokens completos já extraídos.

**Cores:**
- Background: `#ffffff` (primary), `#f8f9fa` (surface), `#202124` (dark)
- Accent: `#4285f4` (blue), `#1967d2` (blue dark), `#d2e3fc` (blue light)
- State: `#34a853` (success), `#fbbc04` (warning), `#ea4335` (error), `#4285f4` (info)
- Borders: `#f1f3f4` (subtle), `#e8eaed` (default), `#bdc1c6` (strong)
- Text: `#202124` (primary), `#5f6368` (secondary), `#80868b` (tertiary)

**Tipografia:**
- UI/body: **Google Sans** (primary), fallback Roboto/system-ui
- Code/terminal: **Google Sans Mono**, fallback ui-monospace
- Icons: **Material Symbols Outlined**

**Spacing (rem-based):**
- Scale: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6 rem

**Border Radius:**
- sm: 4px, md: 8px, lg: 12px, xl: 16px, 2xl: 24px, full: 9999px

**Shadows:**
- sm: `0 1px 2px rgba(60,64,67,.30), 0 1px 3px rgba(60,64,67,.15)`
- md/lg/xl: escala progressiva com dual-shadow Google-style

**Transitions:**
- Fast: 150ms, Base: 250ms, Slow: 350ms, Spring: 350ms cubic-bezier

**Componentes inclusos no DS:**
- Buttons (primary, secondary, tertiary, danger, sizes)
- Cards (default, interactive, highlighted, stat)
- Chips/badges, Form inputs, Tables, Alerts, Nav, Tabs
- Todos com variantes e estados (hover, focus, active, disabled)

**Dark Mode:** O DS tem tema claro como default. Dark mode será fase futura — a arquitetura deve suportar theme switching via CSS custom properties.

### 4.3 Layout Reference

```
┌──────────────────────────────────────────────────────────────────┐
│  🔷 NEXUS Console          [project: evidex]     [🔍] [⚙️]     │
├──────────┬───────────────────────────────────┬───────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA               │  ARTIFACT PANEL   │
│          │                                   │                   │
│ 📊 Dash  │  [Tab 1] [Tab 2] [Tab 3]   [+]  │  📄 Preview       │
│ 💬 Chat  │  ┌─────────────────────────────┐  │                   │
│ 📁 Files │  │                             │  │  Content of the   │
│ 🧬 SCA   │  │  Content area               │  │  selected artifact│
│ 🤖 Squads│  │  (editor, dashboard,        │  │  rendered inline  │
│ 🔗 Pipes │  │   viewer, etc.)             │  │                   │
│ 📦 Output│  │                             │  │                   │
│          │  └─────────────────────────────┘  │                   │
│          │  ┌─────────────────────────────┐  │                   │
│          │  │  TERMINAL (collapsible)     │  │                   │
│          │  │  $ nexus *project status    │  │                   │
│          │  └─────────────────────────────┘  │                   │
├──────────┴───────────────────────────────────┴───────────────────┤
│  Status bar: [branch: main] [project: evidex] [squads: 15]      │
└──────────────────────────────────────────────────────────────────┘
```

### 4.4 Target Platforms

- **Primary:** macOS Safari/Chrome via `localhost:3000`
- **Secondary:** Qualquer browser moderno (para acesso VPS futuro)
- **Responsive:** Desktop-first, mínimo 1280px largura

---

## 5. Technical Assumptions

### 5.1 Project Structure

```
tony-stark/
├── packages/
│   └── console/                    # NEXUS Console (Next.js)
│       ├── src/
│       │   ├── app/                # Next.js App Router
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx        # Dashboard
│       │   │   ├── chat/           # Chat with AI
│       │   │   ├── editor/         # Code/Markdown editor
│       │   │   └── api/            # API routes
│       │   │       ├── files/      # File system operations
│       │   │       ├── terminal/   # Terminal WebSocket
│       │   │       ├── projects/   # NEXUS project data
│       │   │       ├── squads/     # Squad data
│       │   │       └── chat/       # AI chat proxy
│       │   ├── components/         # React components
│       │   │   ├── layout/         # Shell, Sidebar, Panels
│       │   │   ├── terminal/       # xterm.js wrapper
│       │   │   ├── chat/           # Chat UI
│       │   │   ├── editor/         # Monaco wrapper
│       │   │   ├── viewer/         # Markdown, HTML, PDF viewers
│       │   │   ├── explorer/       # File tree
│       │   │   └── dashboard/      # Dashboard widgets
│       │   ├── lib/                # Utilities, API clients
│       │   ├── hooks/              # React hooks
│       │   └── styles/             # Tailwind config, PeelKit tokens
│       ├── public/
│       ├── package.json
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── tsconfig.json
├── src/                            # NEXUS core (existing)
├── squads/                         # Squads (existing)
├── docs/                           # Knowledge & docs (existing)
└── config/                         # Config (existing)
```

### 5.2 Architecture

```
Browser (localhost:3000)
  │
  ├── Next.js Frontend (React 19)
  │     ├── Dashboard page
  │     ├── Chat component (WebSocket)
  │     ├── Editor (Monaco/Markdown)
  │     ├── Viewers (HTML/PDF)
  │     ├── File Explorer (tree)
  │     └── Terminal (xterm.js + WebSocket)
  │
  ├── Next.js API Routes (backend)
  │     ├── /api/files/* — CRUD filesystem
  │     ├── /api/projects/* — NEXUS project data
  │     ├── /api/squads/* — Squad registry
  │     ├── /api/pipelines/* — Pipeline data
  │     └── /api/chat — AI proxy
  │
  └── WebSocket Server
        ├── /ws/terminal — PTY (node-pty)
        └── /ws/chat — AI streaming
```

### 5.3 Integration with NEXUS Core

A Console **consome** o NEXUS core existente (`src/`) — não o substitui:

| NEXUS Core Module | Console Integration |
|-------------------|-------------------|
| `src/sca-engine/` | API routes leem substratos/blocos/contexts |
| `src/squad-adapter/` | Squad monitor exibe dados via API |
| `src/campaign/` | Campaign timeline via API |
| `src/project/` | Project selector usa API |
| `src/cli/` | Terminal executa CLI commands diretamente |
| `src/dashboard/` | Dashboard widgets consomem mesmos dados |

### 5.4 Key Dependencies

| Package | Purpose | Bundle Impact |
|---------|---------|---------------|
| next@15 | Framework | Core |
| react@19 | UI | Core |
| tailwindcss@4 | Styling | CSS only |
| zustand | State management | ~2KB |
| xterm + xterm-addon-fit | Terminal | ~150KB (lazy) |
| @monaco-editor/react | Code editor | ~500KB (lazy) |
| react-markdown + rehype-* | Markdown rendering | ~80KB |
| react-pdf | PDF viewer | ~200KB (lazy) |
| node-pty | PTY for terminal backend | Server only |
| ws | WebSocket server | Server only |
| lucide-react | Icons | Tree-shakeable |

---

## 6. Epic 5: NEXUS Console

**Goal:** Criar uma interface web visual completa que permita operar o NEXUS com a mesma capacidade do CLI, mas com visualização rica, chat integrado e previews inline. O operador pode gerenciar projetos, conversar com a IA, editar documentos, visualizar outputs e monitorar squads — tudo em uma interface unificada rodando localmente.

---

### Story 5.1 — Console Shell & Layout System

> As an **NEXUS operator**,
> I want to **have a responsive layout with sidebar, main content, artifact panel and terminal**,
> So that **I can see and control everything from a single interface**.

**Acceptance Criteria:**

1. Next.js app em `packages/console/` com App Router, TypeScript, Tailwind CSS
2. Layout shell com 4 áreas: sidebar (collapsible, 260px), main content (flex), artifact panel (collapsible, 400px), terminal bar (collapsible, 300px height)
3. Sidebar com navegação: Dashboard, Chat, Files, SCA, Squads, Pipelines, Outputs
4. Todas as áreas redimensionáveis via drag handles
5. Status bar no bottom: branch git, projeto ativo, contagem de squads
6. Design tokens Antigravity Google aplicados: white/surface background, Google Sans, rem-based spacing, border-radius 8-12px, Material Symbols icons
7. `npm run dev` inicia a Console em `localhost:3000`
8. Tailwind config com tokens Antigravity Google mapeados como theme extension (cores, spacing, radius, shadows, fonts)

---

### Story 5.2 — File Explorer & Tree View

> As an **NEXUS operator**,
> I want to **browse project files in a tree view with icons and actions**,
> So that **I navigate the project visually instead of memorizing paths**.

**Acceptance Criteria:**

1. Tree view hierárquica do diretório do projeto
2. Ícones por tipo de arquivo (md, js, yaml, json, html, css, folder)
3. Clique simples = preview no artifact panel; duplo clique = abre em tab no main content
4. Context menu: New File, New Folder, Rename, Delete (com confirmação)
5. Indicadores visuais: arquivo ativo (highlight), pasta expandida/colapsada
6. Filtro rápido com input de busca no topo do file explorer
7. API route `GET /api/files/tree` retorna estrutura do diretório
8. API routes CRUD: `GET /api/files/:path`, `PUT /api/files/:path`, `DELETE /api/files/:path`
9. Pastas protegidas (`.aios-core/core/`) exibem badge 🔒 e são read-only

---

### Story 5.3 — Document Viewer: Markdown Rendering

> As an **NEXUS operator**,
> I want to **view markdown files rendered beautifully like Notion/Obsidian**,
> So that **I can read documentation and outputs with formatting visual**.

**Acceptance Criteria:**

1. Arquivos `.md` abrem com renderização rica: headings com anchors, tabelas estilizadas, listas, checkboxes interativos, code blocks com syntax highlighting, imagens inline
2. Toggle visível "Source | Preview" para alternar entre editor de código e renderizado
3. Frontmatter YAML renderizado como card de metadata no topo (chave-valor com estilo visual)
4. Links internos (para outros `.md`) navegam dentro da Console
5. Mermaid diagrams renderizados se presente
6. react-markdown com plugins: rehype-highlight, rehype-slug, remark-gfm, remark-frontmatter
7. Print-friendly: `Ctrl+P` no modo preview gera versão limpa para impressão

---

### Story 5.4 — Code Editor: Monaco Integration

> As an **NEXUS operator**,
> I want to **edit code files with syntax highlighting and standard editor features**,
> So that **I can modify code without switching to a separate IDE**.

**Acceptance Criteria:**

1. Monaco Editor integrado para arquivos de código (.js, .ts, .json, .yaml, .css, .html)
2. Syntax highlighting automático por extensão de arquivo
3. Features: line numbers, minimap, search (Ctrl+F), replace, fold/unfold, word wrap toggle
4. Auto-save com debounce (2s após última edição) — salva via `PUT /api/files/:path`
5. Arquivos L1/L2 (`.aios-core/core/`, `.aios-core/development/`) abrem em read-only com banner visual "Protected File — Read Only"
6. Tab system: múltiplos arquivos abertos em tabs, com indicador de unsaved changes (●)
7. Lazy loading — Monaco carrega sob demanda, não no bundle inicial
8. Dark theme do Monaco alinhado com tokens PeelKit

---

### Story 5.5 — HTML & Site Preview

> As an **NEXUS operator**,
> I want to **preview HTML files (landing pages, design systems) inline**,
> So that **I see the visual result without opening another browser tab**.

**Acceptance Criteria:**

1. Arquivos `.html` abrem em preview mode por default (iframe sandbox)
2. Toggle "Code | Preview" para alternar entre código e renderização
3. Responsive toggle: Desktop (1200px), Tablet (810px), Mobile (390px) — resize do iframe
4. Barra de URL mostrando o caminho do arquivo
5. Outputs do design-extractor-squad (`squads/*/outputs/*.html`) detectados automaticamente como preview
6. Refresh button para recarregar preview após edição no code mode
7. Sandbox com restrições: `allow-scripts allow-same-origin` (sem allow-forms, sem allow-popups)

---

### Story 5.6 — Terminal Integrado

> As an **NEXUS operator**,
> I want to **have a terminal embedded in the Console that runs NEXUS and shell commands**,
> So that **I don't need a separate terminal window**.

**Acceptance Criteria:**

1. xterm.js com addon-fit para terminal responsivo no bottom panel
2. Backend WebSocket (`/ws/terminal`) conectado a node-pty com shell do usuário (zsh)
3. Working directory = raiz do projeto NEXUS
4. Comandos `*` do NEXUS funcionam normalmente (executam via CLI existente)
5. Autocompletion para comandos `*` do NEXUS (lista carregada via `/api/commands`)
6. Multiple terminal tabs: [Terminal 1] [Terminal 2] [+]
7. Copy/paste funcionando (Ctrl+C/V no terminal)
8. Terminal panel collapsible com drag handle para resize vertical
9. Latência < 100ms para comandos locais

---

### Story 5.7 — Chat com IA

> As an **NEXUS operator**,
> I want to **chat with AI inside the Console, with project context**,
> So that **I get intelligent assistance without leaving the interface**.

**Acceptance Criteria:**

1. Interface de chat no main content ou sidebar com input de mensagem e histórico
2. Mensagens do usuário enviadas via WebSocket (`/ws/chat`) para backend
3. Respostas da IA renderizadas com markdown (code blocks, tabelas, listas, bold)
4. O backend injeta contexto do projeto ativo (projeto, substratos count, squads disponíveis) no prompt
5. Streaming: respostas aparecem progressivamente (token por token)
6. Respostas que contêm código ou documentos geram "artefato" no artifact panel
7. Histórico de chat persistido em `.aios/console/chat-history/` (por sessão)
8. Botão "New Chat" para iniciar nova conversa
9. Chat pode enviar comandos `*` diretamente (detectados e executados no terminal)

---

### Story 5.8 — Artifact Panel & Preview System

> As an **NEXUS operator**,
> I want to **see generated outputs as visual artifacts in a side panel**,
> So that **I can preview, approve and save what the AI or squads produce**.

**Acceptance Criteria:**

1. Painel lateral (right side) que exibe artefatos: markdown renderizado, HTML preview, código, JSON tree, imagens
2. Artefatos gerados pelo chat, pelo terminal ou por navegação no file explorer
3. Cada artefato tem ações: Save to File, Copy to Clipboard, Discard, Open in Tab
4. Indicador de tipo: 📄 Document, 💻 Code, 🌐 HTML, 📊 Data, 🖼️ Image
5. Histórico de artefatos da sessão em tab "History" no panel
6. Artefato de markdown: renderizado estilo Notion (reusa component do Story 5.3)
7. Artefato de HTML: renderizado em iframe (reusa component do Story 5.5)
8. Panel collapsible — quando fechado, artefatos empilham como notificações que podem ser abertas

---

### Story 5.9 — Dashboard & System Overview

> As an **NEXUS operator**,
> I want to **see a dashboard with project health, squad activity and recent outputs**,
> So that **I understand the system state at a glance**.

**Acceptance Criteria:**

1. Dashboard como página principal (home) da Console
2. Cards de overview: projetos (count + ativo), substratos (total + stale), squads (registered/total), pipelines, outputs recentes, campaigns
3. Knowledge Health widget: barra de progresso com % de saúde (baseado em `*knowledge health`)
4. Recent Activity: últimos 10 outputs/ações com timestamp e tipo
5. Squad Status grid: cards dos 15 squads com categoria, status, último uso
6. Quick Actions: botões para ações frequentes (`*make`, `*campaign create`, `*project switch`)
7. Dados carregados via API routes que consomem os módulos do NEXUS core (`src/`)
8. Auto-refresh a cada 30s (ou on-focus) para dados dinâmicos

---

### Story 5.10 — Project Selector & Context Bar

> As an **NEXUS operator**,
> I want to **switch projects from the Console UI and see active context at all times**,
> So that **I always know which project I'm operating on**.

**Acceptance Criteria:**

1. Project selector dropdown na top bar — lista todos os projetos do NEXUS
2. Trocar projeto atualiza: file explorer root, dashboard, knowledge context, status bar
3. Status bar persistente no bottom: `[branch] [projeto ativo] [squads: N] [outputs: N]`
4. Projeto ativo salvo na sessão — persiste entre refreshes do browser
5. Visual badge do projeto em todas as views (nome + slug colorido)
6. API route `GET /api/projects` lista projetos, `POST /api/projects/select` troca ativo
7. Indicador de visibilidade do projeto (public/private/personal) na top bar

---

### Story 5.11 — Squad Launcher & Quick Actions

> As an **NEXUS operator**,
> I want to **activate squads and agents with visual buttons instead of CLI commands**,
> So that **I operate squads with one click, reducing friction and memorization**.

**Acceptance Criteria:**

1. Página "Squads" com grid de cards — cada squad como card visual com ícone, nome, categoria, agentes e botão "▶ Launch"
2. Botão "Launch" abre modal com: seleção de agente (se squad multi-agente), campo de briefing/instrução, upload de arquivos (drag & drop), seleção de projeto ativo como contexto
3. Quick Actions na sidebar e dashboard: botões configuráveis para ações frequentes (ex: "📝 Copy Landing Page", "🎨 Extrair Design", "📸 Brief Visual")
4. Quick Actions mapeiam para: squad + agente + pipeline pré-definidos — equivalem a `*make {descrição}` com um clique
5. Upload de documentos (.md, .txt, .json, .yaml, .pdf) no modal de launch — arquivo é copiado para contexto do squad antes da execução
6. Upload de imagens (.png, .jpg, .webp, .svg) — squad recebe como input (ex: design-extractor-squad analisa imagem de referência)
7. Feedback visual do progresso: "Routing → Loading Context → Executing Squad → Output Ready"
8. Output do squad aparece como artefato no artifact panel (Story 5.8)
9. Histórico de execuções por squad com timestamp, input, output path
10. API routes: `POST /api/squads/:name/launch` (executa), `GET /api/squads/:name/history` (histórico), `POST /api/upload` (multipart file upload)

---

### Story 5.12 — Media Upload, Audio Transcription & Provider Management

> As an **NEXUS operator**,
> I want to **upload media (images, audio, documents), transcribe audio, and manage AI providers visually**,
> So that **I feed the system with diverse inputs and configure integrations without editing config files**.

**Acceptance Criteria:**

**Media Upload & Processing:**

1. Área de upload universal (drag & drop ou botão) acessível do chat, do squad launcher e do file explorer
2. Tipos suportados: imagens (.png, .jpg, .webp, .svg, .gif), áudio (.mp3, .wav, .m4a, .ogg), documentos (.md, .txt, .pdf, .json, .yaml)
3. Imagens uploadadas: preview inline, opção de enviar para squad (ex: design-extractor para análise)
4. Áudio uploadado: transcrição automática via provider configurado (Whisper API, OpenAI, ou local) — resultado como texto editável
5. Transcrição salva como substrato ou nota em `capture/` (escolha do usuário)
6. Status de processamento visual: uploading → processing → ready (com progress bar)

**Provider Management (Settings Page):**

7. Página "Settings > Providers" com lista de provedores configurados
8. Formulário visual para cadastrar provider: nome, tipo (image-gen, transcription, llm, search), API key, endpoint URL, modelo default
9. Tipos de providers suportados:
   - **Image Generation:** OpenAI DALL-E, Midjourney (via API), Ideogram, Stability AI, Flux
   - **Transcription:** OpenAI Whisper, local whisper.cpp, Deepgram
   - **LLM:** Claude (Anthropic), OpenAI GPT, local Ollama
   - **Search:** EXA (já configurado via MCP)
10. API keys armazenadas em `.env.local` (nunca versionadas) — formulário escreve no `.env.local` com confirmação
11. Health check por provider: botão "Test Connection" que faz chamada de validação
12. Status visual: 🟢 Connected, 🟡 Not Tested, 🔴 Error — com mensagem de erro detalhada
13. Provider selecionável por tipo no squad launcher: "Gerar imagem com: [DALL-E ▼]"
14. API routes: `GET /api/providers`, `POST /api/providers`, `PUT /api/providers/:id`, `DELETE /api/providers/:id`, `POST /api/providers/:id/test`

---

## 7. Story Dependency Map

```
5.1 (Shell & Layout)
 ├── 5.2 (File Explorer)
 │    ├── 5.3 (Markdown Viewer)
 │    ├── 5.4 (Code Editor)
 │    └── 5.5 (HTML Preview)
 ├── 5.6 (Terminal)
 ├── 5.7 (Chat com IA)
 │    └── 5.8 (Artifact Panel) — depende de 5.3, 5.5
 ├── 5.9 (Dashboard)
 ├── 5.10 (Project Selector)
 ├── 5.11 (Squad Launcher) — depende de 5.8, 5.12
 └── 5.12 (Media Upload & Providers) — depende de 5.2
```

**Wave Execution Plan:**

| Wave | Stories | Entrega |
|------|---------|---------|
| **Wave 1** | 5.1, 5.10 | Shell funcional com layout, navigation e project selector |
| **Wave 2** | 5.2, 5.6, 5.9 | File explorer, terminal integrado, dashboard |
| **Wave 3** | 5.3, 5.4, 5.5 | Viewers completos (markdown, code, HTML) |
| **Wave 4** | 5.7, 5.8, 5.12 | Chat com IA, artifact panel, media upload & providers |
| **Wave 5** | 5.11 | Squad launcher visual com quick actions |

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Monaco Editor bundle size (~5MB) | Slow initial load | Lazy loading, code splitting, CDN fallback |
| node-pty requer native compilation | Install issues no macOS | Pré-verificar com `npm run doctor`, fallback para shell via child_process |
| Chat com IA requer API key/config | Feature bloqueada sem setup | Graceful degradation: chat disabled com mensagem clara |
| WebSocket em VPS futuro | Proxy config necessário | Abstrair WebSocket URL via env variable |
| File operations destrutivas | Perda de dados | Confirmação visual + git como safety net |

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Time to first meaningful paint | < 3s |
| Terminal command latency | < 100ms |
| Markdown render time (avg doc) | < 500ms |
| Monaco load time (first file) | < 2s |
| Bundle size (initial) | < 500KB gzipped |
| Bundle size (full, lazy loaded) | < 2MB gzipped |

---

## 10. Next Steps

### 10.1 Architect Prompt

> @architect — Criar a arquitetura técnica da NEXUS Console baseado neste PRD (`docs/prd/nexus-console-prd-v2.md`). Foco em: (1) Estrutura do Next.js app com App Router e server/client components, (2) WebSocket server para terminal (node-pty) e chat, (3) API routes que consomem os módulos existentes em `src/`, (4) Integration pattern com o NEXUS core sem duplicar lógica, (5) State management com Zustand, (6) PeelKit design tokens como Tailwind theme. Stack: Next.js 15, React 19, TypeScript, Tailwind CSS 4.

### 10.2 Story Creation

> @sm — Criar as 10 stories detalhadas em `docs/stories/` a partir deste PRD, seguindo o template padrão. Stories 5.1 a 5.10. Respeitar dependências do Wave Execution Plan.

---

## 11. Epic Summary (Updated)

| Epic | Stories | Status |
|------|---------|--------|
| **1. Knowledge Hub & SCA** | 1.1–1.6 (6) | ✅ Done |
| **2. Squad Integration** | 2.1–2.5 (5) | ✅ Done |
| **3. Campaign Orchestrator** | 3.1–3.5 (5) | ✅ Done |
| **4. Multi-Project & Scale** | 4.1–4.6 (6) | ✅ Done |
| **5. NEXUS Console** | 5.1–5.12 (12) | 📋 Planned |
| **TOTAL** | **34 stories** | **22 done, 12 planned** |

---

*Generated by Morgan (PM Agent) — planejando o futuro 📊*
