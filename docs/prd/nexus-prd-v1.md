# NEXUS — Product Requirements Document (PRD) v1.0

> **Sistema Operacional de Empresa com IA**
> **Projeto:** Leonardo Gazola / Innovatech
> **Autor:** Morgan (PM Agent) + Leonardo Gazola
> **Data:** 2026-02-25
> **Status:** Aprovado — pronto para arquitetura

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-25 | 1.0 | PRD inicial — 4 épicos, 22 stories | Morgan + Leonardo |

---

## 1. Goals

1. **Criar um sistema centralizado ("Cérebro") que funcione como Sistema Operacional de Empresa com IA** — capaz de orquestrar squads de agentes para produzir materiais comerciais, visuais, copy, sites e estratégias
2. **Implementar o SCA (Sales Content Architecture) como motor central** — substratos → blocos → outputs, com rastreabilidade entre níveis
3. **Permitir cadastro de múltiplos projetos/empresas** com knowledge bases independentes, mas usando os mesmos squads e agentes
4. **Começar pela Fábrica de Materiais Comerciais da Innovatech** como primeiro caso de uso (Evidex + iPro)
5. **Documentar tudo como padrão replicável** para vender o método a outras empresas no futuro
6. **Integrar os 15 squads existentes** (42+ agentes) como capacidades operacionais do sistema
7. **Separar contextos pessoais e empresariais** com privacidade controlada

## 2. Background Context

Leonardo Gazola, fundador da Innovatech (startup de tecnologia em Maringá-PR), precisa de um sistema que funcione como sua "empresa digital" — onde, com acesso à internet e agentes de IA, ele opera múltiplos negócios como se tivesse uma equipe completa. A Innovatech já possui dois produtos ativos (Evidex para logística e iPro como CRM WhatsApp), 15 squads de IA com 42+ agentes especializados, e um conceito original chamado SCA (Sales Content Architecture) que formaliza como documentos base (substratos) geram blocos modulares que geram outputs finais. O gargalo atual é a produção de materiais comerciais — copy, landing pages, imagens, posts, estratégias — que hoje é manual e fragmentada.

### Conceitos-chave

**SCA (Sales Content Architecture):**
```
NÍVEL 1: Substratos Atômicos (S1-Sn)
  Fatos puros, densos, estáveis (max 200 palavras)
         ↓ combinam em
NÍVEL 2: Blocos Modulares (A1-D2)
  Organizados por etapa de funil (Awareness, Consideration, Decision, Loyalty)
         ↓ montam
NÍVEL 3: Outputs Finais
  Landing pages, pitches, scripts, emails, posts, carrosséis
```

**Squads existentes (15):**
- 4 core comerciais: direct-response-creator, agencia-squad, design-extractor-squad, clickbank-ads-squad
- 7 suporte: clone-factory, ideation-to-docs, ceo-support, knowledge-refinery, messaging-capture, reuniao-intel, clone-leonardo
- 4 específicos Innovatech: evidex-squad, vendas-canhotos, operacoes-canhotos, pitch-investimento

---

## 3. Requirements

### 3.1 Functional Requirements

**Knowledge Hub & SCA Engine:**

- **FR1:** O sistema deve permitir cadastrar múltiplos projetos/empresas, cada um com seu próprio conjunto de substratos (S1-Sn), isolados entre si
- **FR2:** Cada substrato deve ter no máximo 200 palavras, ser factual, imutável após aprovação, e rastreável (ID único, versão, data, autor)
- **FR3:** O sistema deve permitir compor blocos modulares a partir de combinações de substratos, organizados por etapa de funil (Awareness, Consideration, Decision, Loyalty)
- **FR4:** O sistema deve gerar outputs finais (landing pages, pitches, scripts, emails, posts, carrosséis) a partir de blocos, com rastreabilidade até os substratos de origem
- **FR5:** Ao alterar um substrato, o sistema deve identificar todos os blocos e outputs afetados (impact analysis)

**Squad Orchestration:**

- **FR6:** O sistema deve receber um pedido (input do usuário) e rotear automaticamente para o squad/agente correto com base no tipo de output, formato e projeto selecionado
- **FR7:** O sistema deve suportar encadeamento de squads (ex: direct-response-creator → design-extractor → agencia-squad) como pipelines configuráveis
- **FR8:** Cada squad deve receber automaticamente o knowledge base (substratos + blocos) do projeto selecionado como contexto
- **FR9:** O sistema deve permitir ativar squads individualmente ou como parte de uma campanha completa (Campaign Orchestrator)

**Multi-Project:**

- **FR10:** O sistema deve separar dados de projetos/empresas em namespaces independentes (ex: `innovatech/evidex`, `innovatech/ipro`, `clube-tartar`)
- **FR11:** Squads e agentes devem ser compartilhados entre projetos — apenas o knowledge base muda
- **FR12:** Deve existir uma separação de visibilidade entre contextos pessoais e empresariais, com controle de quais substratos são acessíveis por qual squad/projeto

**Content Production (Fábrica Comercial):**

- **FR13:** O sistema deve produzir copy completa (TSL, headlines, video scripts, emails, FAQ) via direct-response-creator usando substratos do projeto
- **FR14:** O sistema deve produzir briefs visuais para imagens IA (Midjourney/DALL-E/Ideogram) via agencia-squad
- **FR15:** O sistema deve produzir carrosséis com estrutura + copy + specs visuais via agencia-squad
- **FR16:** O sistema deve extrair design systems de URLs/imagens de referência via design-extractor-squad
- **FR17:** O sistema deve selecionar automaticamente o perfil de copywriter adequado ao nicho/formato/mercado (pt-br-massa, pt-br-premium, en-us-direct, etc.)

**Ingestão de Contexto:**

- **FR18:** O sistema deve permitir importar documentos existentes (markdown, JSON, texto) e transformá-los em substratos categorizados
- **FR19:** O sistema deve aceitar inputs via texto direto, upload de arquivo ou captura via Telegram (messaging-capture-squad)
- **FR20:** O sistema deve indexar substratos para busca semântica (encontrar substrato relevante dado um tema)

### 3.2 Non-Functional Requirements

- **NFR1:** O sistema deve rodar localmente no macOS (Apple Silicon) usando Claude Code + squads como agentes — sem necessidade de servidor externo para operação core
- **NFR2:** Todo o knowledge base deve ser armazenado como arquivos markdown/YAML no repositório git — versionável, portátil, sem lock-in
- **NFR3:** O sistema deve funcionar offline para operações locais (geração de copy, consulta de substratos) — conexão necessária apenas para integrações externas (Notion, Drive, Supabase, deploy)
- **NFR4:** Tempo de resposta para gerar um output simples (ex: headline set) deve ser < 2 minutos
- **NFR5:** O sistema deve ser documentado como padrão replicável — cada decisão arquitetural deve ter rationale para uso em consultoria/venda futura
- **NFR6:** Dados sensíveis (tokens, credenciais, contatos de clientes) nunca devem ser incluídos em substratos ou versionados no git
- **NFR7:** A arquitetura deve ser modular — adicionar um novo squad ou projeto não deve exigir alteração nos squads existentes
- **NFR8:** O sistema deve suportar integração futura com: Notion, Google Drive, Supabase, Vercel, APIs de redes sociais — via MCPs ou scripts dedicados

---

## 4. User Interface Design Goals

### 4.1 Overall UX Vision

O NEXUS é um sistema **CLI-first** onde o usuário interage via comandos de texto e recebe outputs estruturados. A experiência deve ser como conversar com uma equipe — você dá o briefing, o sistema orquestra, e entrega o resultado. Zero fricção entre "ter a ideia" e "ter o material pronto".

### 4.2 Key Interaction Paradigms

- **Command-driven:** Usuário emite comandos (`*campaign evidex`, `*copy landing-page`, `*brief visual`) e o sistema orquestra
- **Context-aware:** O sistema sabe qual projeto está ativo e carrega substratos automaticamente
- **Progressive disclosure:** Outputs simples são entregues direto; outputs complexos pedem confirmação em checkpoints
- **Pipeline visibility:** Quando um encadeamento de squads está em execução, o usuário vê o progresso (qual squad está ativo, o que já foi produzido)

### 4.3 Core Screens and Views

1. **Project Selector** — `*project switch {slug}`
2. **Knowledge Dashboard** — `*knowledge status`
3. **Campaign Builder** — `*campaign create`
4. **Output Viewer** — `*outputs view {id}`
5. **Squad Monitor** — `*squads status`
6. **System Dashboard** — `*dashboard`

### 4.4 Accessibility

N/A para MVP (CLI-based). Futuramente, se houver dashboard web: WCAG AA.

### 4.5 Branding

- Outputs gerados respeitam o design system do projeto ativo (via design-extractor-squad)
- O sistema em si não tem branding visual — é infraestrutura
- Para documentação/venda futura do método: usar identidade Innovatech

### 4.6 Target Device and Platforms

- **Primary:** macOS terminal (Apple Silicon) via Claude Code
- **Secondary (futuro):** Web dashboard para visualização de outputs e knowledge base
- **Integrations:** Telegram (captura), Vercel (deploy), GitHub (versionamento)

---

## 5. Technical Assumptions

### 5.1 Repository Structure: Monorepo

```
leonardo-gazola/
├── .aios-core/          # Framework AIOS (L1/L2 — protegido)
├── docs/knowledge/      # Knowledge Hub (substratos por projeto)
├── docs/frameworks/     # SCA e referências
├── squads/              # 15 squads com agentes
├── src/                 # Código-fonte (orquestrador, CLI, scripts)
├── config/              # Pipelines, routing rules, integrations
├── tests/               # Testes
└── exports/             # Templates exportados
```

### 5.2 Service Architecture: CLI-first + File-based + Agent Orchestration

- **Runtime:** Claude Code como engine principal (local, macOS)
- **Orquestração:** Comandos `*` ativam squads via AIOS agent system
- **Storage:** Filesystem (markdown/YAML/JSON) versionado no git
- **Estado:** Sem banco de dados no MVP — arquivos `.aios/` para estado de sessão
- **Integrações externas (futuro):** Supabase (dados persistentes), Vercel (deploy sites), MCPs Docker (EXA, Context7, Apify)

### 5.3 Stack Técnica

| Camada | Tecnologia | Rationale |
|--------|-----------|-----------|
| Runtime | Claude Code (Opus/Sonnet) | Já em uso, motor dos agentes |
| Linguagem | Node.js 22 + JavaScript | Já instalado, AIOS é JS-based |
| Package Manager | npm (bun disponível) | Compatibilidade com AIOS existente |
| Formato de dados | Markdown + YAML + JSON | Portátil, legível, versionável |
| Versionamento | Git + GitHub | Já configurado |
| Design System | CSS tokens + JSON (W3C DTCG) | Via design-extractor-squad |
| Integração MCP | Docker MCP Toolkit | Para EXA, Context7, Apify |
| Captura | Telegram Bot (Hermes) | messaging-capture-squad já existe |
| Deploy (futuro) | Vercel | Para sites/landing pages gerados |
| Database (futuro) | Supabase | Para dados persistentes e RLS |

### 5.4 Testing Requirements

- **Unit tests:** Para o orquestrador, SCA engine e knowledge hub
- **Integration tests:** Pipeline completo (substrato → bloco → output)
- **Validation:** Squads validados via `*validate-agents` do AIOS
- **QA Gate:** Via @qa no fluxo SDC para stories de desenvolvimento
- **Sem E2E no MVP** — sistema é CLI-based, outputs são arquivos verificáveis

### 5.5 Additional Technical Assumptions

- Os 15 squads funcionam como definições declarativas (YAML/MD) — instruções para o agente Claude Code
- O SCA engine será implementado como módulo dentro de `src/`
- Knowledge bases são diretórios no filesystem — trocar de projeto = apontar para outro diretório
- Integrações com Notion/Drive são fase futura (pós-MVP) via MCPs
- O sistema respeita o AIOS framework existente (boundary L1/L2)

---

## 6. Epic List

```
Epic 1: Knowledge Hub & SCA Engine     → "Substratos, blocos e contextos funcionam"
Epic 2: Squad Integration & Routing    → "Peço um output, recebo resultado"
Epic 3: Campaign Orchestrator          → "Peço uma campanha, sai tudo coordenado"
Epic 4: Multi-Project & Scale          → "Opero N negócios e vendo o método"
```

---

## 7. Epic 1: Knowledge Hub & SCA Engine

**Goal:** Estabelecer o sistema de substratos, blocos e outputs como infraestrutura central do NEXUS. Ao final, o usuário pode cadastrar projetos, gerenciar substratos, compor blocos e gerar contexto pronto para consumo pelos squads. Innovatech (Evidex + iPro) será o primeiro knowledge base funcional.

### Story 1.1 — Project Registry & Structure

> As an **NEXUS operator**,
> I want to **register projects with standardized metadata and structure**,
> So that **each project has its own isolated knowledge namespace**.

**Acceptance Criteria:**

1. Comando `*project create {slug}` cria estrutura `docs/knowledge/{slug}/` com `manifest.yaml`
2. Comando `*project list` exibe todos os projetos registrados com status
3. Comando `*project select {slug}` define o projeto ativo (persiste em `.aios/session.yaml`)
4. Comando `*project status` mostra projeto ativo com contagem de substratos, blocos e outputs
5. Projetos `innovatech`, `evidex` e `ipro` são registrados como seed data
6. O `manifest.yaml` inclui campo `visibility: public|private` para separação futura

### Story 1.2 — Substrate CRUD & Validation

> As an **NEXUS operator**,
> I want to **create, edit, list and validate substrates within a project**,
> So that **primordial documents are standardized and ready for composition**.

**Acceptance Criteria:**

1. Comando `*substrate create {id}` inicia elicitação: título, conteúdo (max 200 palavras), categoria
2. Comando `*substrate list` exibe tabela (ID, título, categoria, palavras, versão)
3. Comando `*substrate view {id}` mostra conteúdo completo com metadados
4. Comando `*substrate edit {id}` permite editar — cria nova versão (histórico via git)
5. Validação: rejeita > 200 palavras; alerta se categoria já tem substrato
6. Substratos como markdown com frontmatter: `docs/knowledge/{project}/substrates/S{n}-{slug}.md`
7. Substratos existentes (Innovatech, Evidex, iPro) migrados para formato padronizado

### Story 1.3 — Block Composer

> As an **NEXUS operator**,
> I want to **compose modular blocks by combining substrates per funnel stage**,
> So that **I have reusable pieces ready to assemble any output**.

**Acceptance Criteria:**

1. Comando `*block create {id}` inicia elicitação: título, etapa de funil, substratos que compõem
2. Bloco gerado concatenando substratos referenciados
3. Comando `*block list` exibe blocos agrupados por etapa de funil
4. Comando `*block view {id}` mostra conteúdo + referências (rastreabilidade)
5. Blocos afetados por edição de substrato mostram flag `[STALE]`
6. Blocos armazenados em `docs/knowledge/{project}/blocks/{stage}-{slug}.md`
7. Blocos seed para Evidex: A1_ProblemaCanhoto, C1_SolucaoEvidex, D1_OfertaPrecos

### Story 1.4 — Context Generator (SCA Output Engine)

> As an **NEXUS operator**,
> I want to **generate compiled context ready to feed any squad**,
> So that **agents receive relevant substrates + blocks automatically**.

**Acceptance Criteria:**

1. Comando `*context generate {project} --for {squad}` produz `context.md`
2. Mapeamento em `config/squad-context-map.yaml` define quais categorias cada squad precisa
3. O `context.md` inclui: header, substratos relevantes, blocos compilados, instruções
4. Comando `*context preview` mostra preview sem salvar (dry-run)
5. Salvo em `docs/knowledge/{project}/contexts/{squad}-context.md`
6. Valida que substratos existem e nenhum bloco está `[STALE]`

### Story 1.5 — Impact Analysis & Knowledge Health

> As an **NEXUS operator**,
> I want to **know the impact of changing a substrate and overall knowledge health**,
> So that **changes are safe and the system stays consistent**.

**Acceptance Criteria:**

1. Comando `*knowledge health` exibe: totais, blocos stale, substratos órfãos, blocos sem uso
2. Comando `*substrate impact {id}` lista blocos e contextos afetados
3. Impact analysis mostrado automaticamente antes de confirmar edição
4. Comando `*knowledge refresh` regenera blocos stale e contextos em batch
5. Validação de formato: frontmatter, limites, IDs únicos, referências

### Story 1.6 — Substrate Importer

> As an **NEXUS operator**,
> I want to **import existing documents and transform them into categorized substrates**,
> So that **I don't rewrite manually what already exists**.

**Acceptance Criteria:**

1. Comando `*substrate import {file-path}` analisa documento e sugere split
2. Preview com numeração e categorização proposta
3. Usuário aprova todos, edita individualmente, ou rejeita
4. Suporta: markdown (.md), texto (.txt), JSON
5. Cria arquivos com frontmatter e `source: {original}` para rastreabilidade
6. Teste: importar Base Comercial Modular e verificar equivalência com S1-S8

---

## 8. Epic 2: Squad Integration & Routing

**Goal:** Conectar os 15 squads ao Knowledge Hub. O sistema recebe um pedido, identifica projeto ativo, carrega substratos/blocos e roteia para o squad correto. O usuário pede um output e recebe resultado contextualizado.

### Story 2.1 — Squad Registry & Discovery

> As an **NEXUS operator**,
> I want to **have a centralized registry of all squads with their capabilities**,
> So that **the system knows what each squad does and when to use it**.

**Acceptance Criteria:**

1. Comando `*squads list` exibe tabela: nome, agentes, categoria, outputs
2. Comando `*squads info {name}` mostra detalhes completos
3. Cada squad tem `capabilities.yaml`: produces, requires, market_profiles
4. Squads sem capabilities: flag `[UNREGISTERED]`
5. 4 squads core com capabilities seed
6. Registry gerado do filesystem (`squads/*/capabilities.yaml`)

### Story 2.2 — Request Router

> As an **NEXUS operator**,
> I want to **make a request in natural language and the system identifies the right squad**,
> So that **I don't need to know which squad — only what I want**.

**Acceptance Criteria:**

1. Comando `*make {descrição}` analisa e identifica: tipo de output, squad, agente
2. Apresenta recomendação com confirmação
3. Routing via capabilities + `config/routing-rules.yaml`
4. Pedido ambíguo: opções numeradas
5. Nenhum squad atende: sugere criar novo
6. Log em `.aios/routing-log.yaml`

### Story 2.3 — Context Injection Pipeline

> As an **NEXUS operator**,
> I want to **the selected squad to automatically receive the active project's context**,
> So that **agents have substrates and blocks without manual copy**.

**Acceptance Criteria:**

1. Após routing, executa `*context generate` automaticamente
2. `context.md` copiado para squad antes da execução
3. Se squad tem pipeline_order, context injetado no primeiro agente
4. Confirmação visual ao usuário
5. Alerta se blocos stale detectados
6. Output gerado inclui footer com rastreabilidade

### Story 2.4 — Single Output Execution

> As an **NEXUS operator**,
> I want to **execute a squad and receive the finished output**,
> So that **I can produce specific materials on-demand**.

**Acceptance Criteria:**

1. `*make copy landing-page` executa fluxo completo end-to-end
2. `*make visual carousel` executa via agencia-squad
3. `*make brief imagem` executa via agencia-squad (Lens)
4. Outputs salvos em `docs/knowledge/{projeto}/outputs/`
5. `*outputs list` exibe histórico
6. `*outputs view {id}` mostra output com rastreabilidade
7. Market profile detectado do manifest ou perguntado

### Story 2.5 — Squad Execution Adapter

> As an **NEXUS operator**,
> I want to **existing squads to work without modification**,
> So that **I don't need to rewrite 373 files to integrate them**.

**Acceptance Criteria:**

1. Adapter lê `squad.yaml` e extrai pipeline_order, agentes, tasks
2. Squads com pipeline_order: executa agentes em sequência
3. Squads sem pipeline_order: seleção manual de agente
4. Traduz formato de squad em instruções executáveis
5. Teste: pipeline completo do DR Creator com contexto Evidex
6. Squads com ferramentas externas: nota de dependência

---

## 9. Epic 3: Campaign Orchestrator & Pipelines

**Goal:** Criar o orquestrador que encadeia múltiplos squads em pipelines, permitindo campanhas completas com um único comando. O salto de "peço um output" para "peço uma campanha e sai tudo".

### Story 3.1 — Pipeline Definition & Templates

> As an **NEXUS operator**,
> I want to **define reusable pipelines that chain squads in sequence**,
> So that **complex campaigns are reproducible**.

**Acceptance Criteria:**

1. Pipeline em YAML: `config/pipelines/{name}.yaml` com steps
2. `*pipeline list` exibe pipelines disponíveis
3. `*pipeline view {name}` mostra diagrama ASCII
4. 3 pipelines seed: `full-campaign`, `landing-page`, `social-media`
5. Cada step define: squad, agent, input_from, output_to
6. `*pipeline create {name}` para montar novo pipeline

### Story 3.2 — Campaign Execution Engine

> As an **NEXUS operator**,
> I want to **execute a complete campaign with a single command**,
> So that **all materials come out coordinated and consistent**.

**Acceptance Criteria:**

1. `*campaign run {pipeline}` executa pipeline completo
2. Cada step recebe context + outputs acumulados
3. Progresso visível entre steps
4. Falha: opções Retry/Skip/Abort
5. Relatório final em `campaigns/{pipeline}-{timestamp}/REPORT.md`
6. Todos outputs na mesma pasta

### Story 3.3 — Campaign Brief & Customization

> As an **NEXUS operator**,
> I want to **provide a specific briefing before running a campaign**,
> So that **outputs are directed to the campaign objective**.

**Acceptance Criteria:**

1. `*campaign create` inicia elicitação: nome, objetivo, público, tom, pipeline
2. Briefing salvo como `campaign-brief.yaml`
3. Briefing injetado como contexto adicional junto com substratos
4. `*campaign list` exibe campanhas do projeto
5. `*campaign rerun {id}` re-executa com mesmo briefing
6. Sem briefing customizado: usa defaults do projeto

### Story 3.4 — Checkpoint & Review Flow

> As an **NEXUS operator**,
> I want to **review and approve intermediate outputs between pipeline steps**,
> So that **I can correct direction before the next squad uses an incorrect output**.

**Acceptance Criteria:**

1. Pipelines suportam `checkpoint: true` por step
2. Checkpoint pausa e mostra preview com opções: Aprovar/Editar/Refazer/Abortar
3. Editar permite modificar output antes de seguir
4. Refazer re-executa step com instruções adicionais
5. 3 pipelines seed com checkpoint após step 1
6. `--no-checkpoint` para YOLO mode

### Story 3.5 — Output Consistency Validator

> As an **NEXUS operator**,
> I want to **campaign outputs validated for consistency**,
> So that **all materials speak the same language and reinforce the same message**.

**Acceptance Criteria:**

1. Validação automática ao finalizar campanha
2. Valida: tom, headline, oferta/preço, CTA, nomes de produto
3. Resultado no REPORT.md: ✅ OK / ⚠️ Warning / ❌ Inconsistência
4. Inconsistência encontrada: sugere correção específica
5. Substratos como fonte da verdade — contradições flagadas
6. `*campaign validate {id}` para validação independente

---

## 10. Epic 4: Multi-Project, Captura & Integrações

**Goal:** Expandir para múltiplos projetos/empresas, ingestão contínua de contextos, separação pessoal/empresa, e integrações externas. Transforma o NEXUS de "ferramenta para a Innovatech" em "plataforma operacional para N negócios".

### Story 4.1 — Multi-Project Workspace

> As an **NEXUS operator**,
> I want to **manage multiple projects with fast context switching**,
> So that **I operate multiple businesses without mixing information**.

**Acceptance Criteria:**

1. `*project switch {slug}` troca projeto ativo instantaneamente
2. Prompt exibe projeto ativo: `[evidex] *make copy...`
3. `*project clone {source} {new}` duplica estrutura como ponto de partida
4. `*project archive {slug}` move para `_archived/` — recuperável
5. Cada projeto com manifest completo: market, tone, persona, design system
6. Teste: criar clube-tartar, trocar contextos, verificar isolamento

### Story 4.2 — Visibility & Privacy Layers

> As an **NEXUS operator**,
> I want to **separate personal from business contexts with visibility control**,
> So that **private information doesn't leak to commercial squads**.

**Acceptance Criteria:**

1. Projetos suportam `visibility`: public, private, personal
2. `*project set-visibility {slug} {level}` altera visibilidade
3. Context generator respeita visibilidade — personal nunca em squads comerciais
4. `shared_substrates` no manifest para compartilhamento controlado
5. `*knowledge audit` mostra relatório de visibilidade
6. Substratos com conteúdo sensível recebem flag `[SENSITIVE]` automático

### Story 4.3 — Continuous Capture Pipeline

> As an **NEXUS operator**,
> I want to **continuously capture ideas and materials and transform them into substrates**,
> So that **the knowledge base grows organically**.

**Acceptance Criteria:**

1. `*capture process` escaneia notas não processadas com sugestões
2. Para cada nota: transformar em substrato, append, criar bloco, arquivar, pular
3. Integração com messaging-capture-squad (Telegram → capture/)
4. `*capture status` mostra pendentes e taxa de conversão
5. Processadas movidas para `processed/` com referência
6. `*capture import {dir}` para bulk import

### Story 4.4 — External Integrations Hub

> As an **NEXUS operator**,
> I want to **connect to external services for publishing and sync**,
> So that **generated outputs can be published without manual copy**.

**Acceptance Criteria:**

1. `*integrations list` mostra serviços e status
2. `*integrations connect {service}` setup guiado
3. Vercel: `*deploy {output-path}` deploy com URL pública
4. GitHub: `*campaign publish {id}` commit + push (delega @devops)
5. Notion (futuro): `*sync notion {project}` exporta para database
6. Config em `config/integrations/{service}.yaml` referenciando `.env`
7. `*integrations check {service}` health check

### Story 4.5 — Template Marketplace & Export

> As an **NEXUS operator**,
> I want to **export pipelines, squads and configs as distributable templates**,
> So that **I can sell/share the method as a product**.

**Acceptance Criteria:**

1. `*export template {type} {name}` empacota como template distribuível
2. Inclui: definições, README, exemplos dummy — NUNCA dados reais
3. `*export pipeline --clean` sem referências a projetos específicos
4. `*export squad --clean` com personas e tasks, sem knowledge
5. `*export method` pacote completo do método NEXUS
6. Cada export com `LICENSE.md` e `SETUP.md`
7. Salvos em `exports/{type}-{name}-{date}/`

### Story 4.6 — NEXUS Dashboard & Analytics

> As an **NEXUS operator**,
> I want to **have a consolidated view of all projects, outputs and metrics**,
> So that **I know what's being produced, how often, and where are gaps**.

**Acceptance Criteria:**

1. `*dashboard` resumo: projetos, outputs por tipo/período, squads mais usados, campanhas
2. `*dashboard {project}` detalhes: completude, outputs, última campanha, blocos stale
3. Métricas de `.aios/routing-log.yaml` e metadados — sem banco externo
4. `*dashboard weekly` relatório semanal com sugestões de ação
5. Output em markdown formatado para terminal
6. `*dashboard weekly --save` salva em `docs/reports/`

---

## 11. Epic Summary

| Epic | Stories | Entrega |
|------|---------|---------|
| **1. Knowledge Hub & SCA** | 1.1–1.6 (6) | Substratos, blocos, contextos, import, health |
| **2. Squad Integration** | 2.1–2.5 (5) | Registry, routing, context injection, execução |
| **3. Campaign Orchestrator** | 3.1–3.5 (5) | Pipelines, campanhas, checkpoints, validação |
| **4. Multi-Project & Scale** | 4.1–4.6 (6) | Multi-tenant, captura, integrações, export |
| **TOTAL** | **22 stories** | **Sistema operacional de empresa com IA** |

---

## 12. Next Steps

### 12.1 UX Expert Prompt

> @ux-design-expert — Revisar a seção 4 (UI Design Goals) deste PRD (`docs/prd/nexus-prd-v1.md`). O NEXUS é CLI-first mas precisa de design system para os outputs gerados (landing pages, carrosséis, posts). Foco em: (1) experiência de uso dos comandos `*`, (2) formato de apresentação de resultados no terminal, (3) design system base para outputs visuais gerados pelos squads.

### 12.2 Architect Prompt

> @architect — Criar a arquitetura técnica do NEXUS baseado neste PRD (`docs/prd/nexus-prd-v1.md`). Foco em: (1) SCA Engine — como parsear substratos, compor blocos e gerar contextos programaticamente, (2) Squad Adapter — como traduzir definições YAML de squads em instruções executáveis, (3) Campaign Orchestrator — como encadear squads em pipelines com checkpoint e context passing, (4) File-based architecture — toda a persistência é filesystem/git. Stack: Node.js 22, Claude Code como runtime.

