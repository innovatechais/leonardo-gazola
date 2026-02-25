# Task: Capture Note (Bilhete Rápido)

**Agente responsável:** Archimedes
**Posição no pipeline:** 1 de 4
**Próxima task:** review-inbox.md (opcional)
**Dependências:** Nenhuma

---

## Objetivo

Capturar uma ideia, reflexão, insight, tarefa ou momento de clareza de forma rápida e sem atrito, armazenando-a com metadados estruturados no Obsidian temporário.

Esta task é a **entrada** do sistema — é onde ideias entram. Não precisa de perfeição, só precisa ser capturada.

---

## Input Esperado

- **Categoria** (obrigatório): Uma das 6 principais ou nova categoria
  - Trabalho, Pessoal, Lazer, Estudos, Livros, Aulas, ou nova
- **Ideia** (obrigatório): 1-5 linhas, resumido
- **Contexto** (opcional): Quando, onde ou por que você teve essa ideia
- **Tags** (opcional): Palavras-chave para conexões futuras

---

## Processo

### Passo 1 — Elicitar Informação

**Prompt ao usuário:**

```
🧠 Vamos capturar uma ideia!

1️⃣  Em qual categoria cai isso?
    [Trabalho] [Pessoal] [Lazer] [Estudos] [Livros] [Aulas] [Outra]

2️⃣  Qual é a ideia/reflexão/tarefa? (1-5 linhas)
    → [usuário escreve]

3️⃣  Contexto ou detalhes? (opcional)
    → [usuário escreve ou pula]

4️⃣  Tags para conectar depois? (opcional, comma-separated)
    → [usuário escreve ou pula]
```

**Validação:**
- Categoria deve existir ou ser criada
- Ideia não pode ser vazia
- Se nenhuma categoria → sugerir "Pessoal" como default

---

### Passo 2 — Processar & Gerar Metadados

```javascript
const noteData = {
  id: generateNoteId(),              // nota-20250219-1745-abc123
  title: idea.substring(0, 60),       // Primeiros 60 chars como título
  category: category,                 // Trabalho, Pessoal, etc
  date_captured: new Date().toISOString(),  // 2025-02-19T17:45:00Z
  last_reviewed: null,
  status: "inbox-0d",                 // Starts in 0-CAPTURE
  relevance_score: 5,                 // Default: neutral (1-10)
  tags: tags ? tags.split(',').map(t => t.trim()) : [],
  connections: [],                    // Será preenchido depois
  content: fullIdea,                  // Conteúdo completo
  context: contextProvided || null,
};
```

---

### Passo 3 — Armazenar no Obsidian

**Estrutura de pasta:**
```
/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leonardo Gazola/Archive/0-CAPTURE/
  ├── 20250219-1745-Trabalho-abc123.md
  ├── 20250219-1800-Pessoal-xyz789.md
  └── [mais notas...]
```

**Conteúdo do arquivo .md:**
```yaml
---
id: nota-20250219-1745-abc123
title: Ideia resumida em 60 chars
category: Trabalho
date_captured: 2025-02-19T17:45:00Z
last_reviewed: null
status: inbox-0d
relevance_score: 5
tags: [tag1, tag2]
connections: []
---

# {Título da Ideia}

## Ideia
{Conteúdo completo da ideia}

## Contexto
{Se fornecido}

## Notas
Capturado às {hora local}
```

---

### Passo 4 — Registrar no Índice

**Arquivo:** `/Users/leonardogazola/Obsidian/.archimedes-index.json`

```json
{
  "notes": [
    {
      "id": "nota-20250219-1745-abc123",
      "title": "Ideia resumida...",
      "category": "Trabalho",
      "date_captured": "2025-02-19T17:45:00Z",
      "status": "inbox-0d",
      "file": "Archive/0-CAPTURE/20250219-1745-Trabalho-abc123.md"
    },
    ...
  ],
  "last_sync": "2025-02-19T17:45:30Z",
  "total_notes": 42,
  "by_category": {
    "Trabalho": 15,
    "Pessoal": 10,
    ...
  }
}
```

---

### Passo 5 — Confirmar & Fazer Handoff

**Resposta ao usuário:**

```
✅ Bilhete capturado!

📌 Detalhes:
   ID: nota-20250219-1745-abc123
   Categoria: Trabalho
   Arquivo: Archive/0-CAPTURE/20250219-1745-Trabalho-abc123.md
   Status: inbox-0d (revisão automática em 3 dias)

O que fazer agora?
[*review-inbox] para revisar o que você capturou
[*reactivate] para achar insights dormentes
[*capture] para capturar outro bilhete
```

---

## Output

1. **Arquivo criado:** `/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leonardo Gazola/Archive/0-CAPTURE/{timestamp}-{categoria}-{id}.md`
2. **Índice atualizado:** `/Users/leonardogazola/Obsidian/.archimedes-index.json`
3. **Status:** `inbox-0d` (será promovido para `inbox-3d` e `inbox-7d` conforme tempo passa)

---

## Flags de Qualidade

✅ **Sucesso:**
- Arquivo criado no Obsidian
- Índice atualizado
- Confirmação mostrada ao usuário
- Task flow: Capture → (opcional) Review → (eventual) Archive

⚠️ **Erros esperados:**
- Categoria inválida → Criar nova ou sugerir default
- Ideia vazia → Pedir novamente
- Obsidian vault não acessível → Mostrar erro com path
- Index corrompido → Regenerar do zero (ler todos os arquivos)

---

## Integrações

**Próximas tasks:**
- `*review-inbox` — Revisar o que foi capturado
- `*reactivate-insights` — Procurar notas dormentes
- `*archive-to-obsidian` — Mover para permanente

**Scripts chamados:**
- `sync-obsidian.js` — Escrever arquivo + índice

---

## Exemplo Prático

**Usuário:** `@archimedes *capture`

**Archimedes:**
```
🧠 Vamos capturar uma ideia!

1️⃣ Categoria? [Trabalho]
2️⃣ Ideia? → "Integração com API do cliente X para dashboard"
3️⃣ Contexto? → "Falei com eles ontem, eles querem uma integ rápida"
4️⃣ Tags? → "cliente-x, api, dashboard, prioridade-alta"
```

**Resultado:**
```
✅ Bilhete capturado!

📌 ID: nota-20250219-1748-trabalho-f7k2
   Categoria: Trabalho
   Status: inbox-0d
   Arquivo: Archive/0-CAPTURE/20250219-1748-Trabalho-f7k2.md

Próximo passo? [*review-inbox] ou [*capture] outra?
```

---

**Versão:** 1.0.0
**Status:** Draft (pronto para implementar)
**Última atualização:** 2025-02-19
