# AIOS — Guia de Comandos por CLI

> **O que é:** Synkra AIOS (AI-Orchestrated System) é um meta-framework de desenvolvimento que orquestra agentes de IA especializados para cobrir todo o ciclo de software: produto, arquitetura, implementação, QA e devops.
>
> **De onde veio:** Framework proprietário criado para o projeto Synkra, localizado em `/Users/leonardogazola/projetos-aios/meu-primeiro-projeto/`. Configuração vive na pasta `.claude/` e os agentes em `squads/` e `.aios-core/`. Documento gerado por Orion (aios-master) em 23/02/2026.

---

## Conceitos Fundamentais

| Conceito | O que é |
|----------|---------|
| **Agente** | Persona especializada (ex: @dev = desenvolvedor, @qa = tester) |
| **Comando** | Ação prefixada com `*` (ex: `*help`, `*task`, `*workflow`) |
| **Story** | Unidade de trabalho em `docs/stories/` (formato: `{epic}.{num}.story.md`) |
| **Epic** | Conjunto de stories relacionadas |
| **SDC** | Story Development Cycle — fluxo completo: Create → Validate → Implement → QA |

---

## 1. Claude Code CLI (Nativo) ⭐⭐⭐

> Suporte **nativo e completo**. AIOS foi construído para esta plataforma.

### Ativar um Agente

```
/AIOS:agents:dev          → Desenvolvedor (Dex)
/AIOS:agents:qa           → Quality Assurance
/AIOS:agents:architect    → Arquiteto (Aria)
/AIOS:agents:pm           → Product Manager (Morgan)
/AIOS:agents:po           → Product Owner (Pax)
/AIOS:agents:sm           → Scrum Master (River)
/AIOS:agents:analyst      → Analista
/AIOS:agents:devops       → DevOps (Gage) — único que pode git push
/AIOS:agents:aios-master  → Orquestrador mestre (Orion)
```

### Comandos Universais (qualquer agente)

```
*help              → lista todos os comandos do agente ativo
*status            → contexto atual, story em progresso
*exit              → sair do modo agente
*yolo              → alterna modo permissão (ask → auto → explore)
*guide             → guia completo do agente
*task {nome}       → executa uma task específica
*workflow {nome}   → inicia um workflow
```

### Comandos por Agente

#### @aios-master (Orion)
```
*create agent {nome}       → cria novo agente
*create task {nome}        → cria nova task
*modify agent {nome}       → modifica agente existente
*validate-agents           → valida todas as definições YAML
*run-workflow {nome}       → executa workflow completo
*ids check {intenção}      → verifica artefato reutilizável antes de criar
*ids stats                 → estatísticas do registry
*kb                        → ativa Knowledge Base do AIOS
```

#### @dev (Dex)
```
*develop {story-id}        → implementa uma story
```
Modos: `YOLO` (autônomo) | `Interactive` (padrão) | `Pre-Flight` (planeja antes)

#### @qa
```
*qa-gate {story-id}        → executa 7 checks de qualidade
*qa-loop {story-id}        → loop review-fix (máx 5 iterações)
*stop-qa-loop              → pausa e salva estado
*resume-qa-loop            → retoma de onde parou
```

#### @pm (Morgan)
```
*create-epic               → cria novo epic
*execute-epic              → orquestra execução do epic
*create-doc {template}     → cria PRD, spec, etc.
*advanced-elicitation      → levantamento profundo de requisitos
```

#### @po (Pax)
```
*validate-story-draft      → valida story (checklist 10 pontos: GO / NO-GO)
```

#### @sm (River)
```
*create-story / *draft     → cria próxima story a partir do epic
```

#### @devops (Gage) — autoridade exclusiva Git
```
*push                      → git push (SOMENTE @devops pode fazer isso)
*pr-create                 → gh pr create
```

### Fluxo SDC Completo

```
1. @sm  *create-story          → Cria story em docs/stories/
2. @po  *validate-story-draft  → Valida (GO / NO-GO)
3. @dev *develop {story-id}    → Implementa
4. @qa  *qa-gate {story-id}    → Review qualidade
5. @devops *push               → Sobe para o repositório
```

---

## 2. Gemini CLI ⭐⭐

> Suporte **adaptado via prompt de sistema**. Sem skills nativas — carrega agentes como contexto.

### Setup

```bash
# Iniciar com contexto AIOS
gemini --system-prompt "$(cat ~/projetos-aios/meu-primeiro-projeto/.claude/CLAUDE.md)"

# Alias permanente (~/.zshrc)
alias aios-gemini='gemini --system-prompt "$(cat ~/projetos-aios/meu-primeiro-projeto/.claude/CLAUDE.md)"'
```

### Ativar Agente

```bash
# Passar arquivo do agente como contexto
gemini --context ~/projetos-aios/meu-primeiro-projeto/.aios-core/development/agents/dev.md

# Ou via instrução direta
gemini
> Você é o agente @dev do AIOS. Siga as regras em .claude/CLAUDE.md
```

### Comandos (linguagem natural)

```
"Liste os comandos do agente atual"              → equivale a *help
"Qual é o status do projeto?"                    → equivale a *status
"Implemente a story 1.1 seguindo o processo AIOS" → equivale a *develop
"Execute QA Gate nos 7 pontos para story 1.1"   → equivale a *qa-gate
"Crie próxima story para o epic 2"              → equivale a *create-story
```

---

## 3. CODEX CLI (OpenAI) ⭐⭐

> Suporte **adaptado via context injection**. Agnóstico, segue instruções via markdown.

### Setup

```bash
# Instalar
npm install -g @openai/codex
export OPENAI_API_KEY="sua-chave"

# Iniciar com contexto AIOS
codex --full-auto \
  --instructions "$(cat ~/projetos-aios/meu-primeiro-projeto/.claude/CLAUDE.md)"
```

### Flags Úteis

```bash
--full-auto              → autônomo (equivale ao YOLO mode)
--approval-mode suggest  → sugere mas não executa (equivale ao interactive)
--approval-mode auto-edit → edita arquivos, confirma comandos
--quiet                  → menos output
```

### Ativar Agente

```bash
# Modo interativo
codex
> Adote o persona do agente @dev do AIOS e implemente a story 1.1

# Modo YOLO
codex --full-auto "Como @dev AIOS, implemente docs/stories/1.1.story.md"
```

### Comandos (linguagem natural)

```
"Execute *status do AIOS"
"Como @sm AIOS, crie a próxima story para o epic 2"
"Como @qa AIOS, execute o QA Gate na story 1.2"
"Como @po AIOS, valide a story 2.1 com checklist 10 pontos"
```

---

## Tabela Comparativa

| Funcionalidade | Claude Code CLI | Gemini CLI | CODEX CLI |
|---------------|:--------------:|:----------:|:---------:|
| Suporte nativo AIOS | ✅ Total | ⚠️ Via prompt | ⚠️ Via context |
| Ativação de agente | `/AIOS:agents:dev` | Texto natural | Texto natural |
| Comandos `*` | ✅ Nativos | Linguagem natural | Linguagem natural |
| Persistência de contexto | ✅ CLAUDE.md | Manual | `--instructions` |
| Stories automáticas | ✅ | Manual | Manual |
| YOLO mode | `*yolo` | `--full-auto` equiv. | `--full-auto` |
| **Recomendação** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

---

## Referências do Projeto

```
~/projetos-aios/meu-primeiro-projeto/
├── .claude/CLAUDE.md          → Regras e configuração principal
├── .claude/rules/             → Regras detalhadas (workflow, agentes, etc.)
├── .aios-core/development/
│   ├── agents/                → Definições YAML dos agentes
│   └── tasks/                 → Tasks executáveis
├── docs/stories/              → Stories de desenvolvimento
└── squads/                    → Squads especializadas
```

---

*Gerado por Orion (aios-master) — Synkra AIOS v2.0 — 23/02/2026*
