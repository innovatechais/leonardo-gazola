# Inbox Summary — {TIMEFRAME}

**Gerado por Archimedes** | {TIMESTAMP}

---

## 📊 Overview

| Métrica | Valor |
|---------|-------|
| Total de notas | {TOTAL} |
| Período | {TIMEFRAME} |
| Última sincronização | {LAST_SYNC} |
| Notas dormentes (10+ dias) | {DORMANT_COUNT} |

---

## 📋 Por Categoria

### Trabalho ({COUNT} notas)

#### ⭐ Atenção (sem review ou old)
{IF_ANY:
- [{DATE}] **Título da nota** — {PREVIEW}
  └ {DAYS_SINCE} dias, score {SCORE}/10
}

#### Normal
{IF_ANY:
- [{DATE}] Título da nota
- [{DATE}] Outra nota
}

---

### Pessoal ({COUNT} notas)

{SAME_STRUCTURE_AS_ABOVE}

---

### Lazer ({COUNT} notas)

{SAME_STRUCTURE_AS_ABOVE}

---

### Estudos ({COUNT} notas)

{SAME_STRUCTURE_AS_ABOVE}

---

### Livros ({COUNT} notas)

{SAME_STRUCTURE_AS_ABOVE}

---

### Aulas ({COUNT} notas)

{SAME_STRUCTURE_AS_ABOVE}

---

## ⭐ DESTAQUES

### Sem Review Desde Captura
{IF_ANY:
- [{DATE}] **Nota 1** (Trabalho)
- [{DATE}] **Nota 2** (Pessoal)
}

### Score Alto (7+)
{IF_ANY:
- [{DATE}] **Nota 1** - 8/10 (Trabalho)
}

### Dormentes (10+ dias)
{IF_ANY:
- [{DATE}] Nota 1 (14 dias dormindo)
- [{DATE}] Nota 2 (12 dias dormindo)
}

---

## 💡 Sugestões do Archimedes

{PERSONALIZED_SUGGESTIONS:
"Você tem {X} ideias em [Categoria] esperando — pode valer uma sessão de revisão?"
"Aquela nota sobre [tema] está dormindo há {Y} dias. Ainda relevante?"
}

---

## 📌 Próximas Ações Sugeridas

1. **Revisar ⭐ Destaques** — Começar pelo que precisa atenção
2. **Bloco de [Categoria]** — Todas as notas de uma categoria
3. **Arquivar Concluídas** — Promover para Obsidian permanente
4. **Reativar Dormentes** — Decidir continuar ou deletar
5. **Capturar Novo** — Adicionar mais bilhetes

---

## 📈 Estatísticas

```
Notas por categoria (últimos 30 dias):
Trabalho    ████████░░ 8
Pessoal     █████░░░░░ 5
Estudos     ███░░░░░░░ 3
Livros      ██░░░░░░░░ 2
Lazer       █░░░░░░░░░ 1
Aulas       █░░░░░░░░░ 1

Taxa de revisão: {REVIEWED_PERCENT}%
Taxa de arquivamento: {ARCHIVED_PERCENT}%
```

---

**Archimedes Second Brain Manager** | [Voltar ao Agent]
