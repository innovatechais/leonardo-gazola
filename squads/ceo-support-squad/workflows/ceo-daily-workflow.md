# CEO Daily Workflow

Workflow diário de Leonardo Gazola — do caos à clareza em minutos.

---

## Fluxo Principal

```
INÍCIO DA SESSÃO
      ↓
[Cabeça misturada?]
      ├── Sim → @context-switcher (*context-sort) → separa contextos
      └── Não → direto para @daily-clarity
      ↓
@daily-clarity (*daily-briefing)
      ↓
[Briefing aprovado? 3 prioridades com output + tempo + executor]
      ├── Não → ajustar até aprovar
      └── Sim → EXECUTAR
      ↓
[Durante o dia — decisão importante tomada?]
      └── Sim → @decision-log (*capture-decision)
      ↓
DOMINGO → @weekly-retrospective (*weekly-review)
      ↓
[Ritual completo: retro + plano + propósito]
      ↓
Plano semanal vira input para os briefings da próxima semana
```

---

## Comandos por Situação

| Situação | Agente | Comando |
|---------|--------|---------|
| Início do dia normal | Bússola | `@daily-clarity *daily-briefing` |
| Cabeça cheia de assuntos | Triagem | `@context-switcher *context-sort` |
| Algo mudou no dia | Bússola | `@daily-clarity *reprioritize` |
| Decisão importante | Registro | `@decision-log *capture-decision` |
| Dividir despesas dos sócios | Registro | `@decision-log *split-expenses` |
| Domingo | Ritual | `@weekly-retrospective *weekly-review` |

---

## Quality Gate do Dia

Antes de executar qualquer prioridade, confirmar:
- [ ] Output esperado está claro
- [ ] Tempo estimado é realista
- [ ] Executor está definido
- [ ] Não há mais de 3 prioridades ativas
