# Task: Reactivate Insights (Sugerir Ideias Dormentes)

**Agente responsável:** Archimedes
**Posição no pipeline:** 3 de 4
**Dependências:** capture-note.md (mínimo 3 notas com 10+ dias)
**Próxima task:** archive-to-obsidian.md ou capture-note.md

---

## Objetivo

Procurar notas "dormentes" (sem revisão há 10+ dias), detectar padrões não perseguidos, e sugerir quando seria o momento ideal para reativar cada uma.

Esta task é a **inteligência** do sistema — o que você nunca mais esqueceria se houvesse um assistente sabichão observando.

---

## Input Esperado

- **Limit** (opcional): Quantas sugestões mostrar (default: 3, max: 10)
- **Context** (opcional): O que você está trabalhando agora (para sugestões contextuais)

---

## Processo

### Passo 1 — Elicitar Informação (Opcional)

**Prompt ao usuário:**

```
🎯 Procurar insights dormentes...

Quantas sugestões quer? (1-10) [default: 3]
→ [usuário escreve ou pula]

(Opcional) O que você está trabalhando agora?
→ [usuário escreve ou pula]
```

---

### Passo 2 — Filtrar Notas Dormentes

```javascript
const now = new Date();
const dormantThreshold = 10; // dias

const dormantNotes = index.notes.filter(note => {
  const daysSinceReview = (now - new Date(note.last_reviewed || note.date_captured))
                           / (1000 * 60 * 60 * 24);
  return daysSinceReview >= dormantThreshold;
});

// Ordenar por "urgência": tempo dormindo + relevância
const sorted = dormantNotes.sort((a, b) => {
  const aDays = (now - new Date(a.last_reviewed || a.date_captured)) / (1000 * 60 * 60 * 24);
  const bDays = (now - new Date(b.last_reviewed || b.date_captured)) / (1000 * 60 * 60 * 24);

  // Priorizar: (1) muito tempo dormindo, (2) alta relevância
  return (bDays * (b.relevance_score || 5)) - (aDays * (a.relevance_score || 5));
});
```

---

### Passo 3 — Detectar Padrões

**Padrões a detectar:**

```javascript
// 1. PADRÃO DE CATEGORIA
// Se tem 3+ notas na mesma categoria dormentes, sugerir "bloco de trabalho"
const categoryGroups = {};
dormantNotes.forEach(note => {
  if (!categoryGroups[note.category]) categoryGroups[note.category] = [];
  categoryGroups[note.category].push(note);
});

// 2. PADRÃO DE TAG
// Se notas compartilham tags, podem estar relacionadas
const tagGroups = {};
dormantNotes.forEach(note => {
  note.tags.forEach(tag => {
    if (!tagGroups[tag]) tagGroups[tag] = [];
    tagGroups[tag].push(note);
  });
});

// 3. PADRÃO TEMPORAL
// Se várias notas foram capturadas no mesmo período, talvez era uma ideia maior
const timeGroups = dormantNotes.reduce((acc, note) => {
  const week = Math.floor((now - new Date(note.date_captured)) / (1000 * 60 * 60 * 24 * 7));
  if (!acc[week]) acc[week] = [];
  acc[week].push(note);
  return acc;
}, {});
```

---

### Passo 4 — Gerar Sugestões Inteligentes

**Para cada nota dormente:**

```javascript
const suggestion = {
  note: dormantNote,

  // 1. Quanto tempo dormindo?
  daysDormant: Math.round((now - new Date(dormantNote.last_reviewed || dormantNote.date_captured)) / (1000 * 60 * 60 * 24)),

  // 2. Por quê você capturou isso? (remover do arquivo)
  importance: dormantNote.relevance_score,

  // 3. Há notas relacionadas?
  relatedNotes: dormantNotes.filter(other =>
    other.id !== dormantNote.id &&
    other.category === dormantNote.category &&
    other.tags.some(tag => dormantNote.tags.includes(tag))
  ),

  // 4. Está dormindo enquanto você trabalha em algo relacionado?
  contextMatch: userContext && (
    userContext.includes(dormantNote.category) ||
    dormantNote.tags.some(tag => userContext.toLowerCase().includes(tag))
  ),

  // 5. Gerar frase de sugestão
  message: generateSuggestionMessage(dormantNote, daysDormant, importance)
};

function generateSuggestionMessage(note, days, importance) {
  if (days > 30) {
    return `⏰ ${days} dias atrás você capturou: "${note.title}"
            Está na hora de decidir: vale a pena retomar ou arquivar?`;
  } else if (importance >= 7) {
    return `⭐ Você marcou isso como importante (${importance}/10):
            "${note.title}"
            Já que passou ${days} dias, pode estar madura a ideia.`;
  } else if (relatedNotes.length > 0) {
    return `🔗 Você tem ${relatedNotes.length} ideia(s) relacionada(s):
            "${note.title}"
            Pode valer trabalhar como bloco?`;
  } else {
    return `💭 Você disse: "${note.title}"
            Faz ${days} dias. Ainda relevante?`;
  }
}
```

---

### Passo 5 — Output Interativo

**Mostra top N sugestões:**

```markdown
🎯 Insights Dormentes (encontrados X)

### 1️⃣ ⭐ ALTA PRIORIDADE
Categoria: Trabalho | Dormindo: 14 dias | Score: 8/10

"Integração API cliente X para dashboard"

💡 Sugestão: Você marcou como importante (8/10) e faz 2 semanas que
   capturou. Pode ser que a ideia tenha amadurecido. Agora é o momento
   para decidir se executa ou arquiva.

🔗 Relacionadas: 2 outras notas sobre [cliente-x]

[Revisar] [Arquivar] [Deletar] [Próxima]

---

### 2️⃣ 💭 MÉDIA PRIORIDADE
Categoria: Livros | Dormindo: 11 dias | Score: 5/10

"Livro sobre produtividade extrema"

💡 Sugestão: Faz tempo que você pensa nisso. Quer explorar um pouco
   mais ou arquivar a ideia por enquanto?

[Revisar] [Arquivar] [Deletar] [Próxima]

---

### 3️⃣ 🔗 CONEXÃO POSSÍVEL
Categoria: Pessoal | Dormindo: 16 dias | Score: 6/10

"Sistema de exercícios 3x/semana"

💡 Sugestão: Você tem 3 outras notas sobre [saúde]. Pode valer
   trabalhar como um projeto integrado?

🔗 Relacionadas: "Dieta low-carb" (5 dias), "Gym schedule" (8 dias)

[Revisar] [Arquivar] [Deletar] [Próxima]
```

---

### Passo 6 — Menu Interativo

**Por cada sugestão:**

```
[R] Revisar nota (abrir em detalhe)
[A] Arquivar para Obsidian (promover para permanente)
[D] Deletar (remover do inbox)
[S] Pular (leave dormant)
[N] Próxima sugestão
```

---

## Output

1. **Lista de sugestões** — Top N insights dormentes com contexto
2. **Padrões detectados** — Notas relacionadas por categoria/tag
3. **Índice atualizado** — `last_reviewed` marcado se revisar
4. **Nota promovida ou deletada** — Se usuario arquivar/deletar

---

## Flags de Qualidade

✅ **Sucesso:**
- Notas dormentes identificadas corretamente
- Sugestões contextualizadas
- Menu interativo responsivo
- Index atualizado

⚠️ **Erros esperados:**
- Nenhuma nota dormante → Mostrar "Inbox limpo! Tudo fresh."
- Context não fornecido → Usar default (sugestões simples)
- Nota deletada durante revisão → Sync e continue

---

## Exemplo Prático

**Usuário:** `@archimedes *reactivate`

**Archimedes:**
```
🎯 Procurando insights dormentes...

Encontradas 5 notas dormentes. Mostrando top 3:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ ⭐ ALTA PRIORIDADE

Categoria: Trabalho | Dormindo: 14 dias | Score: 8/10

"Integração API cliente X para dashboard"

💡 Você marcou isso como importante (8/10) há 2 semanas.
   Agora é o momento para decidir: executa ou arquiva?

🔗 Relacionadas: "Cliente X meeting notes" (5d), "API docs" (3d)

[R] [A] [D] [S] [N]
```

---

## Integrações

**Próximas tasks:**
- `*archive-to-obsidian` — Se usuario marcar [A]
- `*review-inbox` — Para revisar contexto
- `*capture` — Para capturar novo bilhete

**Scripts chamados:**
- `sync-obsidian.js` — Ler index, detectar padrões, atualizar

---

**Versão:** 1.0.0
**Status:** Draft
**Última atualização:** 2025-02-19
