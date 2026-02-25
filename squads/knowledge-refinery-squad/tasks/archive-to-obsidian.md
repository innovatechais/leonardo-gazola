# Task: Archive to Obsidian (Promover para Permanente)

**Agente responsável:** Archimedes + sync-obsidian.js
**Posição no pipeline:** 4 de 4
**Dependências:** capture-note.md (mínimo 1 nota para arquivar)
**Próxima task:** capture-note.md (voltar ao ciclo)

---

## Objetivo

Mover uma nota do inbox temporário (0-CAPTURE, 1-INBOX-3D, 2-INBOX-7D) para o arquivo permanente do Obsidian (3-ARCHIVE/{categoria}/), transformando-a em nota estruturada e permanente.

Esta task é a **finalização** do sistema — ideias capturadas viram conhecimento permanente.

---

## Input Esperado

- **Nota ID** (obrigatório): Qual nota arquivar (ou lista de nota IDs)
- **Categoria Permanente** (obrigatório): Onde guardar no Obsidian
  - Default: Usar a categoria original da nota
  - Pode mudar se evolui durante o tempo

---

## Processo

### Passo 1 — Elicitar Informação

**Prompt ao usuário:**

```
📦 Arquivar nota para Obsidian permanente

Qual nota? (pode digitar ID, título ou pedir lista)
→ [usuário escreve ou *archive para listar]

Qual categoria permanente?
[Trabalho] [Pessoal] [Lazer] [Estudos] [Livros] [Aulas]
[Outra categoria nova]

Default: Usar categoria original [Trabalho]
→ [usuário confirma ou muda]
```

---

### Passo 2 — Validar & Carregar Nota

```javascript
// 1. Procurar nota no index
const note = index.notes.find(n =>
  n.id === noteId ||
  n.title.toLowerCase().includes(noteId.toLowerCase())
);

if (!note) {
  throw new Error(`Nota não encontrada: "${noteId}"`);
}

// 2. Ler arquivo da nota temporária
const temporaryFile = `${OBSIDIAN_VAULT}/Archive/${getFolderByStatus(note.status)}/${note.file}`;
const noteContent = fs.readFileSync(temporaryFile, 'utf8');

// 3. Parsear YAML frontmatter
const { data, content } = parseMarkdown(noteContent);
```

---

### Passo 3 — Transformar para Permanente

**Estrutura permanente é mais refinada:**

```yaml
---
# METADADOS PERMANENTES
id: nota-20250219-1745-abc123
title: "Ideia Completa"
category: Trabalho  # Pode mudar de original
date_captured: 2025-02-19T17:45:00Z
date_archived: 2025-02-28T10:30:00Z  # Novo!

# ESTRUTURA ENRIQUECIDA
status: archived
relevance_score: 7
priority: "medium"  # Novo: low|medium|high|critical

# CONEXÕES & PADRÕES
tags: [tag1, tag2, tag3]
connections:
  - nota-20250218-xxx (relacionada)
  - nota-20250215-yyy (relacionada)
backlinks: []  # Preenchido quando outra nota aponta para esta

# TRACKING
last_reviewed: 2025-02-28T10:30:00Z  # Atualizado
review_count: 3  # Vezes que foi revisada
is_actionable: true  # Precisa ação? ou só referência?
action_status: pending|in-progress|completed|archived

# CUSTOM FIELDS
source: "capturado pessoalmente"
context: "Falei com cliente ontem"
outcomes: []  # O que virou dessa ideia?
---

# Título da Nota

## 📋 Resumo
{Parágrafo resumido}

## 💡 Ideia Original
{Conteúdo completo}

## 🔗 Contexto
{Se fornecido na captura}

## 📊 Status
- Relevância: 7/10
- Prioridade: Média
- Revisada: 3x desde captura
- Última revisão: 28/fev

## 🏷️ Tags
`#tag1` `#tag2` `#tag3`

## 🔗 Relacionadas
- [[nota-xxx]] - Sobre cliente X
- [[nota-yyy]] - Sobre integração API

## ✅ Próximos Passos
[ ] Decidir se executa
[ ] Se executar, criar task específica
[ ] Arquivar outcome quando terminar
```

---

### Passo 4 — Guardar em Permanente

**Estrutura de pasta:**
```
/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leonardo Gazola/Archive/3-ARCHIVE/
├── Trabalho/
│   ├── Integração API cliente X.md
│   └── Dashboard redesign.md
├── Pessoal/
│   ├── Sistema exercícios.md
│   └── Meditação rotina.md
├── Livros/
│   ├── Produtividade extrema.md
│   └── Mindfulness aplicado.md
├── Estudos/
├── Lazer/
└── Aulas/
```

**Filename:** `{titulo-primeira-palavra-relevante}.md`
- Exemplo: "Integração API cliente X.md"
- Não usar timestamp aqui (já está no frontmatter)

---

### Passo 5 — Atualizar Index

**Remover do inbox, adicionar ao archive:**

```json
{
  "notes": [
    // ... outras notas ...
  ],
  "archived": [
    {
      "id": "nota-20250219-1745-abc123",
      "title": "Integração API cliente X",
      "category": "Trabalho",
      "date_captured": "2025-02-19T17:45:00Z",
      "date_archived": "2025-02-28T10:30:00Z",
      "status": "archived",
      "file": "Archive/3-ARCHIVE/Trabalho/Integração API cliente X.md"
    }
  ],
  "last_sync": "2025-02-28T10:31:00Z",
  "total_archived": 12,
  "archived_by_category": {
    "Trabalho": 5,
    "Pessoal": 3,
    "Livros": 2,
    "Estudos": 1,
    "Lazer": 1
  }
}
```

---

### Passo 6 — Cleanup & Confirmação

**Remover arquivo temporário:**

```javascript
// Deletar do inbox temporário
fs.unlinkSync(temporaryFile);

// Regenerar lista de arquivos em 0-CAPTURE, 1-INBOX-3D, 2-INBOX-7D
// (Auto-sync fará isso periodicamente)

// Atualizar backlinks em notas relacionadas
// Se nota X apontava para essa, agora aponta para [título]
```

**Confirmação ao usuário:**

```
✅ Nota arquivada com sucesso!

📌 Detalhes:
   Nota: "Integração API cliente X"
   ID: nota-20250219-1745-abc123
   Arquivo: Archive/3-ARCHIVE/Trabalho/Integração API cliente X.md
   Status: Permanente

🔗 Conectada a 2 outras notas sobre [cliente-x]

O que fazer agora?
[*capture] Capturar novo bilhete
[*review-inbox] Revisar o que tem
[*reactivate] Achar insights dormentes
```

---

## Output

1. **Arquivo movido** — De `Archive/0-CAPTURE/` para `Archive/3-ARCHIVE/{categoria}/`
2. **Index atualizado** — Nota removida de "notes", adicionada em "archived"
3. **Metadados enriquecidos** — date_archived, review_count, etc
4. **Arquivo temporário deletado** — Cleanup automático
5. **Backlinks atualizadas** — Se houver notas relacionadas

---

## Flags de Qualidade

✅ **Sucesso:**
- Arquivo criado em 3-ARCHIVE com estrutura permanente
- Index atualizado corretamente
- Arquivo temporário deletado
- Confirmação mostrada ao usuário
- Metadados completos

⚠️ **Erros esperados:**
- Nota não encontrada → Pedir ID/título novamente
- Categoria inválida → Sugerir categorias existentes
- Arquivo temporário corrompido → Log error, pular
- Index corrompido → Regenerar do zero
- Arquivo permanente já existe → Versionar (add timestamp)

---

## Exemplo Prático

**Usuário:** `@archimedes *archive nota-20250219-1745-abc123`

**Archimedes:**
```
📦 Arquivando nota...

Nota: "Integração API cliente X"
Categoria permanente? [Trabalho] ✓

Processando...
✅ Arquivado com sucesso!

Arquivo: Archive/3-ARCHIVE/Trabalho/Integração API cliente X.md
ID: nota-20250219-1745-abc123
Status: ✅ Permanente

O que fazer agora? [*capture] [*review-inbox] [*reactivate]
```

---

## Integrações

**Próximas tasks:**
- `*capture` — Capturar novo bilhete
- `*review-inbox` — Revisar que tem
- `*reactivate` — Procurar dormentes

**Scripts chamados:**
- `sync-obsidian.js` — Mover arquivo, atualizar index, cleanup

---

## Edge Cases

### Caso 1: Nota dividida em múltiplas
```
Usuário: "Essa ideia de integração combina com 3 outras... vou integrar"
Archimedes: "Quer combinar nota-123 + nota-456 + nota-789 em uma?"
Resultado: Cria nova nota permanente, marca antigas como "merged-into"
```

### Caso 2: Nota que virou projeto
```
Usuário: "Aquela ideia virou um projeto real que estou executando"
Archimedes: "Quer promover para projeto? Será rastreado diferente"
Resultado: Muda status para "in-progress-project", cria subtask
```

### Caso 3: Nota que é referência apenas
```
Usuário: "Isso é só referência, não precisa ação"
Archimedes: "Marcando como reference-only"
Resultado: is_actionable = false, aparece em buscas mas sem alertas
```

---

**Versão:** 1.0.0
**Status:** Draft
**Última atualização:** 2025-02-19
