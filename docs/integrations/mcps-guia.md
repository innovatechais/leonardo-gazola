# MCPs — Conexões dos Agentes com o Mundo Real

**Atualizado em:** 2026-02-18
**Config:** `.cursor/mcp.json`

> MCPs (Model Context Protocols) são os plugins que fazem seus agentes saírem do texto e tomarem ações reais: abrir navegadores, chamar APIs, salvar arquivos, criar tasks no ClickUp, subir sites.

---

## O que está configurado

| MCP | Status | Para que serve |
|-----|--------|---------------|
| `playwright` | ✅ Pronto | Browser automation — posta em redes sociais, scraping, análise de lives |
| `filesystem` | ✅ Pronto | Leitura/escrita de arquivos no projeto |
| `fetch` | ✅ Pronto | Chamadas HTTP para qualquer API REST |
| `memory` | ✅ Pronto | Memória persistente entre sessões (Sinapse) |
| `obsidian` | ✅ Pronto | Vault principal `Leonardo Gazola` — ler/criar/pesquisar notas |
| `obsidian-teste` | ✅ Pronto | Vault `Leo teste` — rascunhos e experimentos |
| `github` | 🔑 Precisa de token | Push/pull/commits/PRs no GitHub |
| `supabase` | 🔑 Precisa de credenciais | Banco de dados — leads, logs, dashboards |
| `notion` | 🔑 Precisa de token | Criar páginas, databases e documentos no Notion |

---

## Setup de credenciais (passo a passo)

### GitHub

1. Acesse: https://github.com/settings/tokens
2. Gere um token com permissões: `repo`, `workflow`, `read:org`
3. Adicione à variável de ambiente:
   ```bash
   export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_seu_token_aqui"
   ```
4. Ou adicione ao `.env` do projeto (nunca commite esse arquivo)

### Supabase

1. Acesse: https://supabase.com/dashboard/account/tokens
2. Gere um **Access Token** pessoal (não é a chave do projeto)
3. Configure:
   ```bash
   export SUPABASE_ACCESS_TOKEN="sbp_seu_token_aqui"
   ```

### Notion

1. Acesse: https://www.notion.so/my-integrations
2. Clique em **New integration** → dê um nome (ex: "AIOS") → selecione o workspace
3. Copie o **Internal Integration Token**
4. Em cada página/database que quiser que o agente acesse: clique em `...` → **Connections** → adicione sua integração
5. Configure:
   ```bash
   export NOTION_API_TOKEN="secret_seu_token_aqui"
   ```

---

## Como usar cada MCP nos seus squads/agentes

### 🌐 Playwright — Browser Automation

O agente controla um navegador real. Útil para:
- Postar em redes sociais **sem API e sem ban** (parece humano)
- Scraping de páginas (concorrentes, leads, métricas)
- Análise de sentimento em lives (lê comentários em tempo real)
- Preencher formulários, clicar em botões

**Exemplo de comando para o agente:**
```
Use o Playwright para:
1. Abrir instagram.com e fazer login
2. Navegar até criar post
3. Colar o texto: [CONTEÚDO]
4. Publicar
```

**Fluxo do squad de conteúdo:**
```
Copywriter gera texto
  → Playwright abre Instagram/LinkedIn/TikTok
    → Cola o conteúdo
      → Publica (sem API, sem ban, sem penalização de alcance)
```

---

### 📂 Filesystem — Arquivos do Projeto

O agente lê e escreve arquivos diretamente. Útil para:
- Salvar outputs de squads como documentos
- Ler briefings, ICPs, documentos de conhecimento
- Gerar relatórios em `.md`, `.txt`, `.json`

**Exemplo:**
```
Salve o relatório de campanha em:
/squads/clickbank-ads-squad/data/relatorio-2026-02-18.md
```

---

### 🔌 Fetch — Qualquer API REST

O agente faz chamadas HTTP diretas. Útil para:
- Buscar métricas do Meta Ads
- Integrar com qualquer API que não tem MCP próprio
- Webhooks, notificações, integrações personalizadas

**Exemplo — buscar métricas do Meta:**
```
Faça um GET para:
https://graph.facebook.com/v18.0/act_{AD_ACCOUNT_ID}/insights
Headers: Authorization: Bearer {META_ACCESS_TOKEN}
Params: fields=spend,impressions,clicks,ctr,cpm,roas
```

**Outras APIs que funcionam via fetch:**
- OpenRouter (outros modelos de IA)
- Eleven Labs (clonagem de voz)
- Gemini API (análise de vídeo/imagem)
- Qualquer webhook do N8N ou Make

---

### 🧠 Memory — Sinapse / Memória Persistente

O agente mantém memória entre sessões. Útil para:
- Manter contexto de projetos longos sem "doc rot"
- Guardar preferências, histórico de decisões
- Sinapse do AIOS — gerenciar qual contexto entra em cada momento

**Exemplo:**
```
Salve na memória:
- Projeto atual: Campanha Clickbank Q1 2026
- Status: fase de testes A/B
- Próxima ação: analisar métricas de CTR
```

---

### 📋 ClickUp — Gestão de Projetos

O agente cria tasks, projetos e backlogs automaticamente. Útil para:
- Fluxo: Call com cliente → Projeto no ClickUp automático
- Distribuir tasks para o time após briefing
- Criar placeholders de criativos ao iniciar projeto

**Exemplo — após uma call:**
```
Crie no ClickUp:
- Projeto: "Cliente X — Campanha Fevereiro"
- Lista: "Criativos"
- Tasks: 
  - [PLACEHOLDER] Video 1 — Oferta
  - [PLACEHOLDER] Video 2 — Prova social
  - [PLACEHOLDER] Carrossel — Benefícios
- Atribuir para: squad de criativos
- Prazo: 2026-02-25
```

---

### 🗄️ Supabase — Banco de Dados

O agente salva e lê dados estruturados. Útil para:
- Journey Log (registrar cada mudança de status de task)
- Salvar leads captados por scraping
- Dashboard de métricas consolidado
- Histórico de copies geradas

**Tabelas sugeridas para criar:**
```sql
-- Journey Log (self-learning)
CREATE TABLE journey_log (
  id uuid DEFAULT gen_random_uuid(),
  task_id text,
  agent text,
  action text,
  timestamp timestamptz DEFAULT now(),
  notes text
);

-- Leads captados
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid(),
  source text,
  name text,
  contact text,
  captured_at timestamptz DEFAULT now()
);
```

---

### 🐙 GitHub — Deploy e Código

O agente faz push, cria PRs, gerencia branches. Útil para:
- Squad DevOps publica site automaticamente após aprovação
- Commit automático de outputs gerados
- Fluxo: Live → Página → Deploy no GitHub Pages/Vercel

**Exemplo — publicar site após aprovação:**
```
1. Salve o HTML gerado em /site/index.html
2. Faça commit: "feat: página de resumo da live 2026-02-18"
3. Push para branch main
4. (Vercel/Netlify faz deploy automático via webhook)
```

---

## Fluxos completos que esses MCPs habilitam

### Fluxo 1: Live → Página Publicada (custo ~$3)
```
Arquivo de áudio/vídeo
  → [Worker: Whisper] → transcrição.txt
    → [Copywriter Agent] → conteúdo formatado
      → [Designer Agent] → HTML da página
        → [Filesystem MCP] → salva em /site/
          → [GitHub MCP] → commit + push
            → [Vercel webhook] → deploy automático
              → Página online
```

### Fluxo 2: Análise de Campanha em Tempo Real
```
[Fetch MCP] → busca métricas do Meta Ads
  → [CFO Agent] → analisa CAC, ROAS, CPL
    → [Ad Midas Agent] → identifica problemas
      → [ClickUp MCP] → cria task "URGENTE: ajustar criativo X"
        → [Memory MCP] → registra decisão no histórico
```

### Fluxo 3: Postagem Sem Ban (Playwright)
```
[Copywriter Agent] → gera legenda
  → [Playwright MCP] → abre Instagram no browser
    → navega até criar post
      → cola conteúdo + hashtags
        → publica
          → (parece humano, sem penalização de alcance)
```

### Fluxo 4: Call → Projeto Estruturado
```
Gravação de call (.mp3 / .mp4)
  → [Worker: Whisper] → transcrição
    → [Analyst Agent] → extrai needs, expectativas, briefing
      → [ClickUp MCP] → cria projeto + tasks + placeholders
        → [Fetch MCP] → notifica time via webhook do Slack/WhatsApp
```

---

---

### 📓 Obsidian — Vault Local

O agente lê e cria notas diretamente no seu vault. Funciona com os dois vaults via iCloud. Útil para:
- Salvar outputs de squads como notas no Obsidian
- Pesquisar notas existentes para alimentar contexto de agentes
- Criar documentação, resumos de lives, briefings como notas
- Criar páginas de projeto, ICPs, PRDs direto no seu segundo cérebro

**O que o agente consegue fazer:**
- Ler qualquer nota pelo nome ou por conteúdo
- Criar novas notas com frontmatter, tags e links internos
- Listar todas as notas de uma pasta
- Pesquisar por tag, palavra-chave ou link

**Exemplo — salvar resumo de live como nota:**
```
Crie uma nota no Obsidian com:
- Título: "Resumo Live AIOS 2026-02-18"
- Tags: #aios #resumo #live
- Pasta: "Projetos/AIOS"
- Conteúdo: [resumo gerado pelo copywriter]
- Links internos: [[Squad Copywriters]], [[MCPs]]
```

**Exemplo — alimentar agente com contexto do Obsidian:**
```
Leia a nota "ICP - Cliente Ideal" do meu Obsidian
e use como contexto para gerar a copy da campanha.
```

**Exemplo — criar briefing de projeto:**
```
Crie uma nota "Projeto X - Briefing" na pasta "Clientes"
com as informações extraídas da call de hoje.
```

---

## Adicionar novos MCPs

Para adicionar qualquer novo MCP, edite `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "nome-do-mcp": {
      "command": "npx",
      "args": ["-y", "pacote-npm-do-mcp"],
      "env": {
        "API_KEY": "${VARIAVEL_DE_AMBIENTE}"
      }
    }
  }
}
```

**MCPs adicionais que vale adicionar no futuro:**
- `mcp-n8n` — integrar com workflows do N8N
- `mcp-notion` — base de conhecimento no Notion
- `mcp-slack` — notificações e comandos via Slack
- `mcp-whatsapp` — automação via WhatsApp Business
- `mcp-stripe` — pagamentos e assinaturas

---

## Referências

- [MCP oficial Anthropic](https://modelcontextprotocol.io)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Repositório de MCPs da comunidade](https://github.com/modelcontextprotocol/servers)
