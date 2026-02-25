# CEO Support Squad

Sistema operacional cognitivo de Leonardo Gazola. Resolve a paralisia por sobrecarga cognitiva e garante clareza diária — pré-requisito para todos os outros squads rodarem.

---

## Agentes

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🧭 Clareza Diária | Bússola | Converte o estado mental de Leonardo em 3 prioridades acionáveis do dia | `@daily-clarity` |
| 🗂️ Separador de Contextos | Triagem | Separa múltiplos assuntos em contextos distintos e define fila de atenção | `@context-switcher` |
| 🔄 Ritual Semanal | Ritual | Conduz retrospectiva + planejamento da semana + reconexão com propósito | `@weekly-retrospective` |
| 📋 Registro de Decisões | Registro | Captura e documenta decisões com contexto e raciocínio | `@decision-log` |

---

## Workflow Principal

```
Início do dia → @daily-clarity (*daily-briefing)
     ↓
Cabeça cheia → @context-switcher (*context-sort)
     ↓
Domingo → @weekly-retrospective (*weekly-review)
     ↓
Decisão tomada → @decision-log (*capture-decision)
```

---

## Início Rápido

```
# Começar o dia
@daily-clarity
*daily-briefing

# Cabeça cheia de assuntos
@context-switcher
*context-sort

# Ritual de domingo
@weekly-retrospective
*weekly-review

# Registrar decisão importante
@decision-log
*capture-decision
```

---

## Quality Gate do Briefing Diário

O briefing só é aprovado quando cada prioridade tem:
- ✅ Descrição clara do output esperado
- ✅ Tempo estimado
- ✅ Executor definido (Leonardo / agente / ambos)

---

## Estrutura do Squad

```
ceo-support-squad/
├── squad.yaml                        # Manifest
├── README.md                         # Este arquivo
├── agents/
│   ├── daily-clarity.md              # Bússola
│   ├── context-switcher.md           # Triagem
│   ├── weekly-retrospective.md       # Ritual
│   └── decision-log.md               # Registro
├── tasks/
│   ├── daily-briefing.md
│   ├── context-sort.md
│   ├── weekly-review.md
│   └── capture-decision.md
├── workflows/
│   └── ceo-daily-workflow.md
├── checklists/
├── templates/
└── data/
```
