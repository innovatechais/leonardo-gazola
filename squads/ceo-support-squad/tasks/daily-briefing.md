---
task: Daily Briefing
responsavel: "@daily-clarity"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - estado_mental: O que está na cabeça de Leonardo hoje (caos, assuntos, urgências)
  - compromissos_fixos: Reuniões ou calls já marcadas para hoje
  - continuacoes: O que ficou para hoje da lista de ontem (se houver)
Saida: |
  - briefing: 3 prioridades do dia com output esperado, tempo estimado e executor
  - contextos_adiados: Assuntos identificados que ficam para outro momento
  - nota_do_dia: Uma frase de contexto que define o foco do dia
Checklist:
  - "[ ] Elicitar estado mental atual de Leonardo"
  - "[ ] Identificar compromissos fixos do dia"
  - "[ ] Listar continuações do dia anterior"
  - "[ ] Separar contextos se necessário (@context-switcher)"
  - "[ ] Definir Prioridade 1 com output claro e executor"
  - "[ ] Definir Prioridade 2 com output claro e executor"
  - "[ ] Definir Prioridade 3 com output claro e executor"
  - "[ ] Garantir que cada prioridade tem tempo estimado"
  - "[ ] Validar que o briefing passa no quality gate (output + tempo + executor)"
  - "[ ] Obter aprovação de Leonardo antes de finalizar"
---

# *daily-briefing — Briefing Diário

Converte o estado mental de Leonardo em 3 prioridades acionáveis com critério claro de conclusão.

## Elicitação

```
? Como você está chegando hoje? (estado mental, energia, o que está pesando)
? Tem algum compromisso fixo hoje (reunião, call, entrega com prazo)?
? Ficou algo de ontem que precisa continuar hoje?
? Tem alguma urgência que apareceu?
```

## Quality Gate

O briefing só é aprovado quando **cada prioridade** tem:

| Campo | Obrigatório |
|-------|------------|
| Descrição do output esperado | ✅ |
| Tempo estimado | ✅ |
| Executor (Leonardo / agente / ambos) | ✅ |

Se qualquer campo estiver faltando → Bússola pergunta antes de finalizar.

## Output Esperado

```
🧭 Briefing do Dia — [DATA]

NOTA DO DIA: [Uma frase que captura o foco da jornada]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIORIDADE 1 ⭐ [CONTEXTO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O que fazer: [descrição]
Output esperado: [o que estará pronto ao final]
Tempo: [X horas/minutos]
Executor: [Leonardo / Agente / Ambos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIORIDADE 2 [CONTEXTO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O que fazer: [descrição]
Output esperado: [o que estará pronto ao final]
Tempo: [X horas/minutos]
Executor: [Leonardo / Agente / Ambos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIORIDADE 3 [CONTEXTO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O que fazer: [descrição]
Output esperado: [o que estará pronto ao final]
Tempo: [X horas/minutos]
Executor: [Leonardo / Agente / Ambos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTOS ADIADOS (não abrir hoje)
- [assunto 1] → abre [quando]
- [assunto 2] → abre [quando]

→ Aprovado? [S/N — Leonardo confirma]
```

## Regra dos 3

Se Leonardo listar mais de 3 prioridades, Bússola pergunta:
> "Dessas [N] coisas, se você fizesse só 3 hoje e terminasse o dia satisfeito, quais seriam?"
