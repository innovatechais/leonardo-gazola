# Task: Review Inbox (Revisar Bilhetes Capturados)

**Agente responsável:** Archimedes
**Posição no pipeline:** 2 de 4
**Dependências:** capture-note.md (mínimo 1 nota)
**Próxima task:** reactivate-insights.md ou archive-to-obsidian.md

---

## Objetivo

Revisar todas as notas capturadas em um timeframe específico (últimas 24h, 3d, 7d, 30d), organizando-as por categoria, destacando o que precisa atenção e sugerindo próximas ações.

Esta task é a **verificação** do sistema — você nunca perde uma ideia porque review-a regularmente.

---

## Input Esperado

- **Timeframe** (obrigatório): 1d, 3d, 7d, 30d ou all
  - Default se não especificado: `1d` (últimas 24h)

---

## Processo

### Passo 1 — Elicitar Informação

**Prompt ao usuário:**

```
📋 Qual período quer revisar?

[1d] Últimas 24h (hoje)
[3d] Últimos 3 dias
[7d] Últimos 7 dias
[30d] Últimos 30 dias
[all] Tudo sem limite

Opção padrão: [1d]
```

---

### Passo 2 — Ler Index & Filtrar Notas

```javascript
// 1. Ler .archimedes-index.json
// 2. Filtrar por timeframe
const now = new Date();
const notes = index.notes.filter(note => {
  const capturedDate = new Date(note.date_captured);
  const daysSince = (now - capturedDate) / (1000 * 60 * 60 * 24);

  if (timeframe === '1d') return daysSince <= 1;
  if (timeframe === '3d') return daysSince <= 3;
  if (timeframe === '7d') return daysSince <= 7;
  if (timeframe === '30d') return daysSince <= 30;
  if (timeframe === 'all') return true;
});

// 3. Agrupar por categoria
const byCategory = {};
notes.forEach(note => {
  if (!byCategory[note.category]) byCategory[note.category] = [];
  byCategory[note.category].push(note);
});
```

---

### Passo 3 — Organizar & Destacar

**Critério de destaque:**
- ⭐ **Sem review desde captura** — Primeira vez vendo?
- ⭐ **Mais tempo esperando** — Capturado há 3+ dias?
- ⭐ **Relevância alta** — Score 7+ (você marcou como importante)?

**Output por categoria:**

```markdown
## [Categoria] (X notas)

### ⭐ Atenção (destaque)
- [Data] Ideia 1 (sem review, 5 dias)
- [Data] Ideia 2 (score 8/10)

### Normal
- [Data] Ideia 3
- [Data] Ideia 4

---
```

---

### Passo 4 — Gerar Summary

```
📊 Review — Últimas 24h

✅ Total: 5 notas capturadas
   • Trabalho: 3
   • Pessoal: 2
   • Lazer: 0

⭐ Atenção (sem review ou old):
   1. "Integração API cliente X" (Trabalho, 5 dias atrás)
   2. "Ideia livro sobre produtividade" (Livros, 3 dias atrás)

💡 Próximas ações sugeridas:
   → Você tem insights esperando. Quer revisar [Trabalho]?
   → Aquele livro que você pensou em escrever... vale a pena revisitar?
```

---

### Passo 5 — Sugerir Ações

**Menu interativo:**

```
O que fazer?

[1] Revisar categoria específica (ler cada nota)
[2] Arquivar uma nota (promover para Obsidian)
[3] Marcar como revisada (atualizar last_reviewed)
[4] Deletar nota (remover do inbox)
[5] Procurar insights dormentes (*reactivate)
[6] Capturar outro bilhete (*capture)
[0] Sair
```

---

## Output

1. **Summary formatado** — Mostrando todas as notas por categoria
2. **Highlights** — Notas que precisam atenção
3. **Menu interativo** — Próximas ações
4. **Index atualizado** — `last_reviewed` marcado para notas vistas

---

## Flags de Qualidade

✅ **Sucesso:**
- Summary mostrando todas as notas
- Highlights claramente marcados
- Menu interativo funcional
- Index atualizado com timestamps

⚠️ **Erros esperados:**
- Timeframe inválido → Default para `1d`
- Nenhuma nota no período → Mostrar mensagem "Inbox limpo!"
- Index corrompido → Regenerar lendo arquivos
- Arquivo .md corrompido → Pular (log error)

---

## Exemplo Prático

**Usuário:** `@archimedes *review-inbox 3d`

**Archimedes:**
```
📋 Revisando últimos 3 dias...

📊 Summary:
✅ Total: 8 notas
   • Trabalho: 5
   • Pessoal: 2
   • Lazer: 1

⭐ ATENÇÃO (5 notas sem review ou old):
   1. [19/fev 17:45] "Integração API cliente X" (Trabalho)
      └ Capturado há 2 dias, sem review

   2. [18/fev 09:20] "Livro sobre mindfulness" (Livros)
      └ Capturado há 3 dias, score 8/10

   3. [17/fev 14:30] "Reunião com investor" (Pessoal)
      └ Capturado há 4 dias, sem review

💡 Sugestão: Você tem ideias esperando, especialmente [Trabalho].
   Quer revisar agora? [*reactivate] ou [1] para ver detalhes?
```

---

## Integrações

**Próximas tasks:**
- `*reactivate-insights` — Procurar notas dormentes
- `*archive-to-obsidian` — Arquivar para permanente
- `*capture` — Capturar novo bilhete

**Scripts chamados:**
- `sync-obsidian.js` — Ler index e arquivos

---

**Versão:** 1.0.0
**Status:** Draft
**Última atualização:** 2025-02-19
