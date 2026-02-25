# MCP Integration Architecture -- AIOS Synkra

**Created:** 2026-02-25
**Author:** @architect (Aria) + @devops (Gage)
**Status:** Planning
**Scope:** Complete MCP integration roadmap for all external services

---

## Table of Contents

1. [Prioritization Matrix](#1-prioritization-matrix)
2. [Agent Capability Map](#2-agent-capability-map)
3. [Architecture Diagram](#3-architecture-diagram)
4. [MCP Configuration File](#4-mcp-configuration-file)
5. [Credential Checklist](#5-credential-checklist)
6. [Instagram Workflow (Browser Automation)](#6-instagram-workflow-browser-automation)

---

## 1. Prioritization Matrix

### Scoring Criteria

- **Impact (1-5):** Value added to agent autonomy and real-world action capability
- **Ease (1-5):** Setup difficulty (5 = trivial, 1 = painful multi-step process)
- **Priority Score:** Impact x Ease (max 25)

### Already Active (No action needed)

| Integration | Status | Notes |
|-------------|--------|-------|
| Playwright | ACTIVE | Browser automation |
| Filesystem | ACTIVE | Obsidian vault access (2 vaults) |
| Fetch | ACTIVE | HTTP API calls |
| Memory | ACTIVE | Persistent context between sessions |
| Figma MCP | ACTIVE | Needs `npm run socket` each session + Figma plugin |

### Prioritized Backlog

| # | Integration | Impact | Ease | Score | Wave | Justification |
|---|-------------|--------|------|-------|------|---------------|
| 1 | **GitHub MCP** | 5 | 5 | **25** | Wave 1 | Already configured. Just paste token. Unlocks full CI/CD pipeline for @devops. |
| 2 | **Supabase MCP** | 5 | 5 | **25** | Wave 1 | Already configured. Just paste token. Unlocks database CRUD for @data-engineer. |
| 3 | **Notion MCP** | 4 | 5 | **20** | Wave 1 | Already configured. Just paste token. Unlocks knowledge base for @pm and @analyst. |
| 4 | **Canva MCP** | 4 | 4 | **16** | Wave 1 | Official hosted MCP. OAuth auto-flow, no manual key. Unlocks design asset creation for @ux-design-expert. |
| 5 | **Google Workspace** | 5 | 3 | **15** | Wave 2 | Community MCP (uvx). Covers Gmail+Sheets+Calendar+Drive+Docs. Requires OAuth setup + Google Cloud Console project. |
| 6 | **VPS/SSH MCP** | 4 | 3 | **12** | Wave 2 | Community MCP (npx). Remote server management for @devops. Requires SSH key setup. |
| 7 | **Gamma App MCP** | 3 | 3 | **9** | Wave 3 | Official MCP. Requires Pro+ plan ($$$). Presentation generation for @pm/@analyst. |
| 8 | **WhatsApp MCP** | 4 | 2 | **8** | Wave 3 | Community MCP (Go+Python). QR scan auth, fragile session. Client communication for @pm. |
| 9 | **Instagram** | 4 | 2 | **8** | Wave 3 | NOT an MCP -- uses Playwright browser automation. Requires logged-in session, careful anti-detection. |

### Implementation Waves

```
WAVE 1 -- Score >= 16 -- ~1 day
=================================
  GitHub MCP ........... [25] paste token, done
  Supabase MCP ......... [25] paste token, done
  Notion MCP ........... [20] paste token + share pages with integration
  Canva MCP ............ [16] add config, OAuth auto-flow

WAVE 2 -- Score 10-15 -- ~2-3 days
====================================
  Google Workspace ..... [15] GCP project + OAuth consent screen + uvx setup
  VPS/SSH MCP .......... [12] SSH key pair + npx config + host whitelist

WAVE 3 -- Score < 10 -- ~1 week
=================================
  Gamma App MCP ........ [9]  requires Pro+ subscription first
  WhatsApp MCP ......... [8]  Go/Python runtime + QR scan + session management
  Instagram (Playwright) [8]  browser automation workflow, not an MCP
```

---

## 2. Agent Capability Map

### Capabilities Unlocked Per Integration

| Integration | Agent | New Capabilities Unlocked |
|-------------|-------|---------------------------|
| **GitHub MCP** | @devops (Gage) | Push code, create PRs, merge PRs, manage releases, create issues, manage branches remotely, trigger GitHub Actions, manage repo settings |
| **GitHub MCP** | @dev (Dex) | Read PR reviews, check CI status, browse repo files on remote, read issue details (read-only -- push delegated to @devops) |
| **GitHub MCP** | @qa (Quinn) | Read PR diff for review, check CI/CD pipeline results, comment on PRs with QA verdicts |
| **Supabase MCP** | @data-engineer (Dara) | Create/alter tables, write migrations, execute SQL, manage RLS policies, create indexes, inspect schema, seed data |
| **Supabase MCP** | @architect (Aria) | Inspect database schema for architecture decisions, validate data model against design |
| **Supabase MCP** | @dev (Dex) | Query data for debugging, insert test records, validate CRUD operations |
| **Supabase MCP** | @analyst (Atlas) | Run analytical queries, extract metrics, generate data reports |
| **Notion MCP** | @pm (Morgan) | Create PRDs, meeting notes, project dashboards, client-facing docs, update project status pages |
| **Notion MCP** | @analyst (Atlas) | Create research reports, competitive analysis docs, save findings as structured pages |
| **Notion MCP** | @po (Pax) | Maintain product backlog views, update roadmap pages, track story status in Notion |
| **Notion MCP** | @sm (River) | Create sprint boards, retrospective notes, ceremony documentation |
| **Canva MCP** | @ux-design-expert (Uma) | Generate social media graphics, presentations, brand assets, marketing materials, edit templates programmatically |
| **Canva MCP** | @analyst (Atlas) | Create data visualization graphics, infographics, report covers |
| **Canva MCP** | @pm (Morgan) | Generate pitch decks, one-pagers, client presentations |
| **Google Workspace** | @pm (Morgan) | Send emails via Gmail, create meeting invites via Calendar, share Google Docs, manage Drive folders |
| **Google Workspace** | @analyst (Atlas) | Read/write Google Sheets for data analysis, access Drive documents for research |
| **Google Workspace** | @sm (River) | Create sprint Calendar events, send ceremony invites, share retro docs |
| **Google Workspace** | @devops (Gage) | Access deployment docs on Drive, manage shared infrastructure sheets |
| **VPS/SSH MCP** | @devops (Gage) | SSH into production/staging servers, run remote commands, check server health, deploy applications, manage nginx/docker on remote |
| **VPS/SSH MCP** | @dev (Dex) | SSH into dev/staging for debugging (read-only, delegated by @devops) |
| **Gamma App MCP** | @pm (Morgan) | Generate polished presentations from PRDs, create client decks, pitch materials |
| **Gamma App MCP** | @analyst (Atlas) | Create research presentations, executive summaries as slides |
| **WhatsApp MCP** | @pm (Morgan) | Send project updates to clients, receive feedback, share deliverables |
| **WhatsApp MCP** | @analyst (Atlas) | Send reports/alerts, receive data requests from stakeholders |
| **Instagram (Playwright)** | @ux-design-expert (Uma) | Upload designed posts/carousels/reels covers via browser automation |
| **Instagram (Playwright)** | @analyst (Atlas) | Generate captions, hashtag strategy, schedule content via browser |

### Agent Autonomy Progression

```
CURRENT STATE (5 MCPs active):
  @dev ............ Can code, commit locally, read/write files
  @devops ......... Can manage MCP infra, but NO remote git ops
  @data-engineer .. Can design schemas, but NO database access
  @pm ............. Can write docs locally, but NO external sharing
  @analyst ........ Can research with Fetch, but NO structured storage
  @ux-design-expert Can design in Figma, but NO asset generation

AFTER WAVE 1 (+4 MCPs):
  @devops ......... FULL CI/CD pipeline (GitHub push/PR/merge)
  @data-engineer .. FULL database lifecycle (Supabase CRUD/migrations)
  @pm ............. External documentation (Notion pages/dashboards)
  @ux-design-expert Design asset creation (Canva graphics/templates)

AFTER WAVE 2 (+2 MCPs):
  @pm ............. Email clients, schedule meetings (Google Workspace)
  @devops ......... Remote server management (VPS/SSH)
  @analyst ........ Google Sheets analytics, Drive research docs

AFTER WAVE 3 (+2 MCPs + 1 workflow):
  @pm ............. Polished presentations (Gamma), WhatsApp comms
  @ux-design-expert Social media publishing (Instagram via Playwright)
  @analyst ........ WhatsApp alerts, Instagram content strategy
```

---

## 3. Architecture Diagram

```
                         AIOS SYNKRA -- MCP INTEGRATION ARCHITECTURE
==========================================================================================

                              +-------------------------------+
                              |        CLAUDE CODE            |
                              |    (Primary AI IDE - macOS)   |
                              |                               |
                              |  +-------------------------+  |
                              |  |    AIOS Agent System     |  |
                              |  |                         |  |
                              |  | @dev    @qa    @pm      |  |
                              |  | @devops @po    @sm      |  |
                              |  | @architect @analyst     |  |
                              |  | @data-engineer          |  |
                              |  | @ux-design-expert       |  |
                              |  | @aios-master            |  |
                              |  +-------------------------+  |
                              +------+--------+--------+------+
                                     |        |        |
                        stdio (local)|        |        | stdio (local)
                    +----------------+        |        +------------------+
                    |                         |                           |
          +---------v---------+    +----------v----------+    +-----------v----------+
          |  LOCAL STDIO MCPs |    | REMOTE/HOSTED MCPs  |    | BROWSER AUTOMATION   |
          |  (npx / node)     |    | (OAuth / API key)   |    | (NOT an MCP)         |
          +-------------------+    +---------------------+    +----------------------+
          |                   |    |                     |    |                      |
          | * playwright      |    | * canva             |    | * Instagram workflow |
          |   (@ux, @analyst) |    |   (mcp.canva.com)   |    |   via Playwright MCP |
          |                   |    |   (@ux, @pm,        |    |   (@ux, @analyst)    |
          | * filesystem      |    |    @analyst)         |    |                      |
          |   (Obsidian vaults|    |                     |    +----------------------+
          |    @all agents)   |    | * gamma             |
          |                   |    |   (official MCP)    |
          | * fetch           |    |   (@pm, @analyst)   |
          |   (@all agents)   |    |                     |
          |                   |    +---------------------+
          | * memory          |
          |   (@all agents)   |
          |                   |             +------------------------------+
          | * figma           |             |  DOCKER MCP TOOLKIT          |
          |   (needs socket)  |             |  (via docker-gateway)        |
          |   (@ux)           |             |                              |
          |                   |             |  * EXA (web search)          |
          | * github          |             |  * Context7 (lib docs)       |
          |   (@devops excl.) |             |  * Apify (web scraping)      |
          |                   |             +------------------------------+
          | * supabase        |
          |   (@data-engineer,|
          |    @dev, @analyst)|
          |                   |
          | * notion          |
          |   (@pm, @analyst, |
          |    @po, @sm)      |
          |                   |
          | * google-workspace|
          |   (uvx / Python)  |
          |   (@pm, @sm,      |
          |    @analyst,      |
          |    @devops)       |
          |                   |
          | * ssh             |
          |   (@devops excl.) |
          |                   |
          | * whatsapp        |
          |   (@pm, @analyst) |
          +-------------------+


===========================================================================================
               DATA FLOW: Agent Request --> Claude Code --> MCP Server --> External Service
===========================================================================================

  +----------+     +-------------+     +-----------+     +------------------+
  |  AGENT   | --> | CLAUDE CODE | --> | MCP SERVER| --> | EXTERNAL SERVICE |
  | (@dev)   |     | (routes     |     | (stdio/   |     | (GitHub API,     |
  |          |     |  to correct |     |  remote)  |     |  Supabase,       |
  +----------+     |  MCP)       |     +-----------+     |  Notion, etc.)   |
                   +-------------+                       +------------------+


===========================================================================================
                           AGENT <-> MCP CONSUMPTION MATRIX
===========================================================================================

  Agent                | play | fs | fetch | mem | figma | gh | supa | notion | canva | gws | ssh | gamma | wa
  ---------------------|------|----|-------|-----|-------|----|------|--------|-------|-----|-----|-------|----
  @dev (Dex)           |      | x  |   x   |  x  |       | R  |  x   |        |       |     |  R  |       |
  @qa (Quinn)          |      | x  |   x   |  x  |       | R  |      |        |       |     |     |       |
  @architect (Aria)    |      | x  |   x   |  x  |       |    |  R   |        |       |     |     |       |
  @pm (Morgan)         |      | x  |   x   |  x  |       |    |      |   x    |   x   |  x  |     |   x   | x
  @po (Pax)            |      | x  |   x   |  x  |       |    |      |   x    |       |     |     |       |
  @sm (River)          |      | x  |   x   |  x  |       |    |      |   x    |       |  x  |     |       |
  @analyst (Atlas)     |  x   | x  |   x   |  x  |       |    |  x   |   x    |   x   |  x  |     |   x   | x
  @data-engineer(Dara) |      | x  |   x   |  x  |       |    |  W   |        |       |     |     |       |
  @ux-design (Uma)     |  x   | x  |   x   |  x  |   x   |    |      |        |   x   |     |     |       |
  @devops (Gage)       |      | x  |   x   |  x  |       | W  |      |        |       |  x  |  W  |       |
  @aios-master(Orion)  |  x   | x  |   x   |  x  |   x   | W  |  W   |   x    |   x   |  x  |  W  |   x   | x

  Legend: x = full access, W = write/admin, R = read-only
  play = playwright, fs = filesystem, mem = memory, gh = github
  supa = supabase, gws = google workspace, wa = whatsapp
```

---

## 4. MCP Configuration File

### Complete `~/.claude.json` mcpServers Section

Below is the complete `mcpServers` configuration to be merged into `~/.claude.json`. This replaces only the `mcpServers` key -- do NOT overwrite the rest of the file.

```json
{
  "mcpServers": {

    "claude-talk-to-figma": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/Users/leonardogazola/projetos-aios/tools/claude-talk-to-figma-mcp/dist/talk_to_figma_mcp/server.cjs"
      ],
      "env": {}
    },

    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-playwright"],
      "env": {}
    },

    "filesystem-obsidian": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y", "@anthropic-ai/mcp-filesystem",
        "/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leonardo Gazola"
      ],
      "env": {}
    },

    "filesystem-obsidian-teste": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y", "@anthropic-ai/mcp-filesystem",
        "/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leo teste"
      ],
      "env": {}
    },

    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch"],
      "env": {}
    },

    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-memory"],
      "env": {}
    },

    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "FILL_YOUR_GITHUB_TOKEN_HERE"
      }
    },

    "notion": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_TOKEN": "FILL_YOUR_NOTION_TOKEN_HERE"
      }
    },

    "supabase": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "FILL_YOUR_SUPABASE_TOKEN_HERE"
      }
    },

    "canva": {
      "type": "url",
      "url": "https://mcp.canva.com/mcp"
    },

    "gamma": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@gamma-app/mcp-server"],
      "env": {
        "GAMMA_API_KEY": "FILL_YOUR_GAMMA_API_KEY_HERE"
      }
    },

    "ssh": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@aiondadotcom/mcp-ssh"],
      "env": {
        "SSH_HOST": "FILL_YOUR_VPS_IP_HERE",
        "SSH_USER": "FILL_YOUR_SSH_USER_HERE",
        "SSH_PRIVATE_KEY_PATH": "/Users/leonardogazola/.ssh/id_rsa"
      }
    },

    "google-workspace": {
      "type": "stdio",
      "command": "uvx",
      "args": ["google_workspace_mcp"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/Users/leonardogazola/.config/google-workspace-mcp/credentials.json",
        "GOOGLE_TOKEN_PATH": "/Users/leonardogazola/.config/google-workspace-mcp/token.json"
      }
    },

    "whatsapp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@lharries/whatsapp-mcp"],
      "env": {}
    }
  }
}
```

### Important Notes on Configuration

1. **Canva** uses `type: "url"` (remote hosted MCP with OAuth auto-flow). When first used, Claude Code will open a browser window for Canva OAuth authorization.

2. **Gamma** -- verify the exact package name before installing. The server may require a Pro+ subscription to function. If Gamma provides a hosted MCP URL instead of an npm package, change to `type: "url"` format like Canva.

3. **Google Workspace** uses `uvx` (Python/UV runner). Requires `uv` to be installed: `curl -LsSf https://astral.sh/uv/install.sh | sh`. The credentials come from a Google Cloud Console OAuth client.

4. **WhatsApp** -- the first run will display a QR code in the terminal that must be scanned with WhatsApp on the phone. Session persists until logged out.

5. **Instagram is NOT listed here** -- it uses Playwright browser automation. See Section 6.

6. **Filesystem/Obsidian paths** -- adjust if your vault paths differ. The paths above assume macOS iCloud Obsidian vault locations.

7. **SSH** -- the env vars shown are a simplified example. Check the actual `@aiondadotcom/mcp-ssh` documentation for exact env var names and supported options (key passphrase, port, etc.).

---

## 5. Credential Checklist

### Wave 1 Credentials (< 1 day)

---

#### 5.1 GitHub Personal Access Token

| Field | Value |
|-------|-------|
| **What to get** | Personal Access Token (classic) or Fine-grained Token |
| **Where** | https://github.com/settings/tokens |
| **Time** | ~5 minutes |

**Steps:**

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** > **"Generate new token (classic)"**
3. Give it a name: `AIOS-Claude-Code`
4. Set expiration: 90 days (or "No expiration" for convenience)
5. Select scopes:
   - [x] `repo` (full control of private repositories)
   - [x] `workflow` (update GitHub Actions workflows)
   - [x] `read:org` (read org membership)
   - [x] `admin:repo_hook` (manage webhooks) -- optional
6. Click **"Generate token"**
7. Copy the token (starts with `ghp_`)
8. Paste into `~/.claude.json` under `mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN`

**Verify:**
```bash
# Test the token works
curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/user
```

---

#### 5.2 Supabase Access Token

| Field | Value |
|-------|-------|
| **What to get** | Personal Access Token (account-level, not project-level) |
| **Where** | https://supabase.com/dashboard/account/tokens |
| **Time** | ~3 minutes |

**Steps:**

1. Go to https://supabase.com/dashboard/account/tokens
2. Click **"Generate new token"**
3. Give it a name: `AIOS-Claude-Code`
4. Click **"Generate token"**
5. Copy the token (starts with `sbp_`)
6. Paste into `~/.claude.json` under `mcpServers.supabase.env.SUPABASE_ACCESS_TOKEN`

**Verify:**
```bash
# Test the token works
curl -H "Authorization: Bearer sbp_YOUR_TOKEN" https://api.supabase.com/v1/projects
```

---

#### 5.3 Notion Integration Token

| Field | Value |
|-------|-------|
| **What to get** | Internal Integration Token |
| **Where** | https://www.notion.so/my-integrations |
| **Time** | ~10 minutes (includes sharing pages) |

**Steps:**

1. Go to https://www.notion.so/my-integrations
2. Click **"+ New integration"**
3. Configure:
   - Name: `AIOS`
   - Associated workspace: select your workspace
   - Type: Internal
4. Under **Capabilities**, enable:
   - [x] Read content
   - [x] Update content
   - [x] Insert content
   - [x] Read comments
   - [x] Create comments (optional)
5. Click **"Submit"**
6. Copy the **Internal Integration Secret** (starts with `secret_`)
7. Paste into `~/.claude.json` under `mcpServers.notion.env.NOTION_API_TOKEN`
8. **CRITICAL EXTRA STEP:** For every Notion page/database the agent needs to access:
   - Open the page in Notion
   - Click the `...` menu (top right)
   - Click **"Connections"**
   - Search for and add your `AIOS` integration
   - Repeat for each top-level page (child pages inherit access)

**Verify:**
```bash
curl -H "Authorization: Bearer secret_YOUR_TOKEN" \
     -H "Notion-Version: 2022-06-28" \
     https://api.notion.com/v1/users/me
```

---

#### 5.4 Canva (OAuth Auto-flow)

| Field | Value |
|-------|-------|
| **What to get** | Nothing manually -- OAuth auto-flow handles it |
| **Where** | Triggered automatically on first use |
| **Time** | ~2 minutes |

**Steps:**

1. Add the Canva MCP config to `~/.claude.json` (already in Section 4)
2. When you first invoke a Canva tool in Claude Code, a browser window will open
3. Log in to your Canva account
4. Authorize the MCP integration
5. The token is stored automatically -- no manual key needed
6. Ensure you have a Canva account (free tier works for basic operations; Pro unlocks more templates/features)

**Note:** If Canva requires a separate developer registration at https://www.canva.dev, create a free developer account first and register an app to get OAuth credentials.

---

### Wave 2 Credentials (~2-3 days)

---

#### 5.5 Google Workspace (OAuth via GCP)

| Field | Value |
|-------|-------|
| **What to get** | OAuth 2.0 Client ID + Client Secret from Google Cloud Console |
| **Where** | https://console.cloud.google.com |
| **Time** | ~30 minutes (first-time GCP setup) |

**Steps:**

1. **Install UV (Python package runner):**
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Create a Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Click **"Select a project"** > **"NEW PROJECT"**
   - Name: `AIOS-Workspace`
   - Click **"CREATE"**

3. **Enable APIs:**
   - Go to **APIs & Services** > **Library**
   - Search and enable each:
     - Gmail API
     - Google Calendar API
     - Google Sheets API
     - Google Drive API
     - Google Docs API

4. **Configure OAuth Consent Screen:**
   - Go to **APIs & Services** > **OAuth consent screen**
   - User Type: **External** (or Internal if using Google Workspace)
   - App name: `AIOS`
   - User support email: your email
   - Add scopes:
     - `https://www.googleapis.com/auth/gmail.modify`
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/spreadsheets`
     - `https://www.googleapis.com/auth/drive`
     - `https://www.googleapis.com/auth/documents`
   - Add your email as a test user
   - Click **"SAVE"**

5. **Create OAuth Credentials:**
   - Go to **APIs & Services** > **Credentials**
   - Click **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
   - Application type: **Desktop app**
   - Name: `AIOS-Claude-Code`
   - Click **"CREATE"**
   - Download the JSON file

6. **Place credentials:**
   ```bash
   mkdir -p ~/.config/google-workspace-mcp
   mv ~/Downloads/client_secret_*.json ~/.config/google-workspace-mcp/credentials.json
   ```

7. **First run will trigger OAuth flow:**
   - A browser window opens for Google login
   - Authorize the app
   - Token saved automatically to `~/.config/google-workspace-mcp/token.json`

**Verify:**
```bash
uvx google_workspace_mcp --help
```

---

#### 5.6 VPS/SSH Access

| Field | Value |
|-------|-------|
| **What to get** | SSH key pair + VPS IP address + username |
| **Where** | Your VPS provider (DigitalOcean, Hetzner, AWS, etc.) |
| **Time** | ~15 minutes |

**Steps:**

1. **Generate SSH key (if you don't have one):**
   ```bash
   ssh-keygen -t ed25519 -C "aios@leonardogazola" -f ~/.ssh/aios_vps
   ```

2. **Copy public key to your VPS:**
   ```bash
   ssh-copy-id -i ~/.ssh/aios_vps.pub YOUR_USER@YOUR_VPS_IP
   ```

3. **Test SSH connection:**
   ```bash
   ssh -i ~/.ssh/aios_vps YOUR_USER@YOUR_VPS_IP "echo 'SSH works'"
   ```

4. **Update `~/.claude.json`:**
   - Set `SSH_HOST` to your VPS IP
   - Set `SSH_USER` to your VPS username
   - Set `SSH_PRIVATE_KEY_PATH` to `/Users/leonardogazola/.ssh/aios_vps`

**Security notes:**
- Never use password authentication -- always SSH keys
- Consider restricting the key to specific commands if the MCP allows it
- Keep the private key permissions at `600`: `chmod 600 ~/.ssh/aios_vps`

---

### Wave 3 Credentials (~1 week)

---

#### 5.7 Gamma App API Key

| Field | Value |
|-------|-------|
| **What to get** | API Key (requires Pro+ subscription) |
| **Where** | https://gamma.app/settings/api (or developer portal) |
| **Time** | ~10 minutes (after Pro+ subscription is active) |

**Steps:**

1. **Subscribe to Gamma Pro+:**
   - Go to https://gamma.app/pricing
   - Subscribe to the plan that includes API access (Pro+ or higher)
   - This is a paid prerequisite

2. **Generate API Key:**
   - Go to your Gamma account settings / developer section
   - Generate an API key
   - Copy the key

3. **Update `~/.claude.json`:**
   - Paste into `mcpServers.gamma.env.GAMMA_API_KEY`

4. **If Gamma uses OAuth instead of API key:**
   - Check Gamma's MCP documentation for the exact auth flow
   - May need to switch to `type: "url"` format in the config

**Verify:**
- Create a test presentation through Claude Code after configuration

---

#### 5.8 WhatsApp (QR Code Authentication)

| Field | Value |
|-------|-------|
| **What to get** | QR code scan from WhatsApp on your phone |
| **Where** | Terminal output on first run |
| **Time** | ~20 minutes (includes Go/Python runtime setup) |

**Steps:**

1. **Ensure Go and Python are installed:**
   ```bash
   # Check Go
   go version
   # If not installed:
   brew install go

   # Check Python
   python3 --version
   # If not installed:
   brew install python3
   ```

2. **First run of the MCP will show a QR code in the terminal**

3. **Scan the QR code:**
   - Open WhatsApp on your phone
   - Go to **Settings** > **Linked Devices** > **Link a Device**
   - Scan the QR code shown in the terminal

4. **Session persists** until you manually log out from Linked Devices

5. **Important caveats:**
   - The session can expire after ~14 days of inactivity
   - If you log out from "Linked Devices" on your phone, you'll need to re-scan
   - WhatsApp may flag unusual activity -- keep message volumes reasonable
   - This uses unofficial WhatsApp Web API -- use at your own risk

**Re-authentication:**
- If the session expires, restart the MCP server and scan a new QR code

---

### Credential Summary Table

| Integration | Credential Type | Env Variable | Status |
|-------------|----------------|--------------|--------|
| GitHub | Personal Access Token | `GITHUB_PERSONAL_ACCESS_TOKEN` | Needs token |
| Supabase | Access Token | `SUPABASE_ACCESS_TOKEN` | Needs token |
| Notion | Internal Integration Secret | `NOTION_API_TOKEN` | Needs token + page sharing |
| Canva | OAuth (auto) | N/A | Auto on first use |
| Google Workspace | OAuth Client JSON | `GOOGLE_CREDENTIALS_PATH` | Needs GCP project setup |
| VPS/SSH | SSH Key Pair | `SSH_PRIVATE_KEY_PATH` | Needs key + VPS |
| Gamma | API Key | `GAMMA_API_KEY` | Needs Pro+ subscription |
| WhatsApp | QR Code Scan | N/A | Scan on first run |
| Instagram | Browser Session | N/A | Not an MCP -- see Section 6 |

---

## 6. Instagram Workflow (Browser Automation)

### Why Playwright Instead of Meta API

Instagram's official API (Meta Graph API) is designed for business use and explicitly flags automated posting from API calls. Content posted via API often gets:
- Reduced organic reach
- "Posted via [App Name]" label
- Rate limiting and review requirements
- Potential account restrictions

Playwright browser automation mimics human behavior through a real browser, producing posts indistinguishable from manual human posts.

### Prerequisites

1. **Playwright MCP is active** (already configured and working)
2. **Instagram account is logged in** in the browser Playwright controls
3. **Images/videos are saved locally** before the workflow starts (e.g., generated by @ux-design-expert via Canva or Figma, saved to filesystem)

### Login Session Setup (One-time)

```
IMPORTANT: Do this ONCE manually, then the session persists.

1. Ask Claude Code to open Instagram via Playwright:
   "Use Playwright to navigate to https://www.instagram.com"

2. Manually log in through the browser Playwright opened
   - Enter username and password
   - Complete 2FA if enabled
   - Click "Not Now" on any "Save Login Info" or "Turn on Notifications" prompts

3. The browser session/cookies persist between Playwright sessions
   (Playwright stores browser context in its data directory)

4. To verify: next time Playwright opens instagram.com, you should be
   already logged in.
```

### Post Publishing Workflow

#### Step-by-step Flow

```
PHASE 1: Content Preparation (before Playwright)
=================================================
  @ux-design-expert (Uma)
    --> Designs the post visual in Canva/Figma
    --> Exports image to local path:
        /Users/leonardogazola/projetos-aios/meu-primeiro-projeto/content/instagram/
    --> File naming: YYYY-MM-DD-{slug}.{png|jpg}

  @analyst (Atlas)
    --> Generates caption text
    --> Generates hashtag set (max 30, optimized for reach)
    --> Saves to:
        /Users/leonardogazola/projetos-aios/meu-primeiro-projeto/content/instagram/YYYY-MM-DD-{slug}.txt

PHASE 2: Browser Automation (Playwright)
=========================================
  @ux-design-expert (Uma) orchestrates the Playwright sequence:

  Step 1: Navigate
    - Open https://www.instagram.com
    - Wait 2-4 seconds (random delay)
    - Verify logged-in state (check for profile icon)

  Step 2: Open Create Post
    - Click the "+" (create) button in the nav bar
    - Wait 1-3 seconds

  Step 3: Upload Image
    - The "Create new post" dialog appears
    - Click "Select from computer" button
    - Use file input to upload the image file
    - Wait 2-4 seconds for upload to complete

  Step 4: Edit (optional)
    - If carousel: click "+" to add more images, repeat upload
    - Apply crop/filter if needed (usually skip)
    - Click "Next"
    - Wait 1-2 seconds

  Step 5: Add Caption
    - Click "Next" to reach the caption screen
    - Click the "Write a caption..." textarea
    - Type caption character by character with random 30-80ms delays
      (DO NOT paste all at once -- looks robotic)
    - Wait 1 second
    - Add hashtags in the caption (or as first comment -- strategy choice)

  Step 6: Publish
    - Click "Share" button
    - Wait 3-5 seconds for upload to complete
    - Verify success by checking for the "Your post has been shared" message
    - Take a screenshot as proof

  Step 7: Cleanup
    - Navigate away from the post
    - Close any dialogs
```

#### Anti-Detection Measures

| Technique | Implementation |
|-----------|---------------|
| **Random delays** | Add 1-5 second waits between every action. Never use fixed intervals. Use `Math.random() * 3000 + 1000` style timing. |
| **Typing simulation** | Type text character by character with 30-80ms random delays between keystrokes. Never paste entire blocks. |
| **Human-like scrolling** | If scrolling is needed, scroll in small increments with pauses, not instant jumps. |
| **Session persistence** | Reuse the same browser context/cookies. Don't create fresh sessions for each post. |
| **Posting frequency** | Maximum 1-2 posts per day. Never batch-post multiple items in rapid succession. |
| **No automation patterns** | Vary the time of day for posting. Don't post at exactly the same time every day. |
| **Screen resolution** | Use a standard desktop resolution (1920x1080 or 1440x900). |
| **User agent** | Use default Playwright Chromium user agent. Don't override. |
| **No headless mode** | Run in headed mode when possible to avoid headless browser detection. |
| **Mouse movements** | If the MCP supports it, add mouse movement between clicks rather than teleporting. |

#### Image Upload via Browser UI

Playwright handles file uploads through the HTML file input element:

```
The workflow for file upload in Playwright:

1. Playwright clicks the "Select from computer" button
2. Instagram opens a native file picker (HTML <input type="file">)
3. Playwright intercepts the file chooser event
4. Playwright sets the file path programmatically
   (no need to interact with the OS file dialog)
5. The image appears in the Instagram upload preview

This is a standard Playwright capability -- setInputFiles() handles it.
```

#### Carousel Posts (Multiple Images)

```
For carousels:
1. Upload first image as described above
2. In the crop/edit screen, click the small "+" icon (bottom left of image)
3. Upload additional images one at a time
4. Reorder if needed by dragging (Playwright drag-and-drop)
5. Continue with caption and publish as normal
```

#### Reel Upload

```
For Reels:
1. Instead of clicking "+" for post, navigate to Reels tab
2. Upload video file through the same file input mechanism
3. Add cover image if desired
4. Add caption
5. Publish

Note: Reels have longer upload times. Add 10-30 second waits.
```

#### Error Handling

| Scenario | Recovery Action |
|----------|----------------|
| Not logged in | Navigate to login page, alert user to log in manually, abort workflow |
| Upload fails | Retry once after 10 seconds. If fails again, save state and alert user. |
| "Action Blocked" popup | STOP immediately. Wait 24-48 hours. Reduce posting frequency. |
| 2FA challenge during session | Alert user to complete 2FA manually. Pause workflow. |
| Instagram layout changed | Selectors may break. Alert user. @dev to update selectors. |
| Rate limited | Wait 1 hour minimum. Reduce daily posting volume. |

#### Agent Orchestration

```
PUBLISHING PIPELINE:

  @pm (Morgan)
    --> Defines content calendar and posting schedule
    --> Approves final content before publishing

  @analyst (Atlas)
    --> Researches trending hashtags and optimal posting times
    --> Writes caption and hashtag strategy
    --> Saves caption file

  @ux-design-expert (Uma)
    --> Creates visual asset (Canva MCP or Figma MCP)
    --> Exports to local filesystem
    --> Orchestrates the Playwright publishing workflow
    --> Takes screenshot proof of published post

  @qa (Quinn)
    --> Verifies post is live (optional Playwright check)
    --> Validates image quality, caption accuracy, hashtag count
```

#### File Structure for Instagram Content

```
content/
  instagram/
    2026-02-25-lancamento-produto.png      # Visual asset
    2026-02-25-lancamento-produto.txt      # Caption + hashtags
    2026-02-25-lancamento-produto-proof.png # Screenshot after publish
    queue/                                  # Scheduled posts waiting
    published/                              # Archive of published posts
    templates/                              # Reusable caption templates
```

---

## Appendix A: Quick Reference -- What to Do Now

```
IMMEDIATE (Wave 1, today):
  1. Get GitHub token     --> paste in ~/.claude.json
  2. Get Supabase token   --> paste in ~/.claude.json
  3. Get Notion token     --> paste in ~/.claude.json, share pages
  4. Add Canva MCP config --> OAuth auto on first use

SOON (Wave 2, this week):
  5. Setup GCP project for Google Workspace
  6. Setup SSH keys for VPS access

LATER (Wave 3, next week):
  7. Subscribe to Gamma Pro+ and get API key
  8. Install Go/Python for WhatsApp MCP, scan QR code
  9. Test Instagram Playwright workflow with a test account first
```

## Appendix B: Updating ~/.claude.json Safely

Since `~/.claude.json` contains many other Claude Code settings, use this procedure to add MCP servers without losing existing data:

```bash
# 1. Backup current config
cp ~/.claude.json ~/.claude.json.backup.$(date +%Y%m%d)

# 2. Read current mcpServers (if any)
cat ~/.claude.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(json.dumps(data.get('mcpServers', {}), indent=2))
"

# 3. Edit ~/.claude.json manually or use jq to merge:
# Add new servers one at a time to avoid breaking the JSON

# 4. Validate JSON after editing:
python3 -c "import json; json.load(open('$HOME/.claude.json')); print('Valid JSON')"

# 5. Restart Claude Code to pick up changes
```

## Appendix C: Troubleshooting

| Problem | Solution |
|---------|----------|
| MCP shows "disconnected" in Claude Code | Restart Claude Code. Check `npx` can find the package. |
| "GITHUB_PERSONAL_ACCESS_TOKEN not set" | Token is missing or empty in `~/.claude.json`. Check for typos. |
| Notion returns 404 | Page not shared with the integration. See Step 8 in Section 5.3. |
| Supabase "invalid token" | You may have used a project anon key instead of the account access token. Use the one from `/dashboard/account/tokens`. |
| Google Workspace OAuth fails | Ensure all 5 APIs are enabled in GCP. Check redirect URI matches. |
| WhatsApp QR expired | Restart the MCP server to get a fresh QR code. |
| Canva OAuth popup doesn't appear | Check browser popup blockers. Try a different browser. |
| Playwright Instagram selectors fail | Instagram may have updated their UI. Inspect the page and update selectors. |
| `uvx` command not found | Install UV: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |

---

*Document generated for Synkra AIOS integration planning. Managed by @architect (Aria) and @devops (Gage).*
