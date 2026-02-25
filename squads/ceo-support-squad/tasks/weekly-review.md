---
task: Weekly Review
responsavel: "@weekly-retrospective"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - relato_semana: Como foi a semana (em áudio transcrito ou texto)
  - prioridades_anteriores: As 3 prioridades que foram definidas para essa semana
Saida: |
  - retrospectiva: Análise estruturada da semana
  - aprendizado: 1 aprendizado documentado
  - plano_proxima: 3 prioridades da próxima semana
  - reconexao: Nota de propósito para fechar o ritual
Checklist:
  - "[ ] Elicitar relato da semana sem julgamento"
  - "[ ] Comparar com prioridades que foram definidas"
  - "[ ] Identificar o que foi feito vs. o que travou"
  - "[ ] Detectar padrão recorrente se houver"
  - "[ ] Documentar 1 aprendizado real"
  - "[ ] Elicitar prioridades da próxima semana"
  - "[ ] Validar expectativa realista de tempo"
  - "[ ] Fechar com reconexão de propósito"
---

# *weekly-review — Ritual Semanal

Retrospectiva honesta + planejamento realista + reconexão com propósito.

## Elicitação — Parte 1 (Retro)

```
? Como foi a semana? O que aconteceu?
? Das 3 prioridades da semana, o que foi feito?
? O que travou? Por quê?
? Se tivesse que nomear um padrão dessa semana, qual seria?
```

## Elicitação — Parte 2 (Planejamento)

```
? O que é absolutamente necessário acontecer na próxima semana?
? Quanto tempo realista você tem disponível?
? O que você vai DECIDIR não fazer essa semana?
```

## Elicitação — Parte 3 (Propósito)

```
? Por que você está construindo a Innovatech?
? O que essa semana te aproximou ou afastou disso?
? Como você quer se sentir na próxima revisão semanal?
```

## Output Esperado

```
🔄 Ritual Semanal — Semana [DD/MM a DD/MM]

━━━━━━━━━━━━━━━━━━━━━━━━
RETROSPECTIVA
━━━━━━━━━━━━━━━━━━━━━━━━
✅ O QUE FOI FEITO
- [item 1]
- [item 2]

⚠️ O QUE TRAVOU
- [item] — Motivo: [por quê]

💡 APRENDIZADO DA SEMANA
"[aprendizado em 1-2 frases]"

🔄 PADRÃO DETECTADO (se houver)
"[padrão recorrente que merece atenção]"

━━━━━━━━━━━━━━━━━━━━━━━━
PLANO DA PRÓXIMA SEMANA
━━━━━━━━━━━━━━━━━━━━━━━━
PRIORIDADE 1: [descrição] — Estimativa: [X dias]
PRIORIDADE 2: [descrição] — Estimativa: [X dias]
PRIORIDADE 3: [descrição] — Estimativa: [X dias]

NÃO FAREI ESSA SEMANA:
- [o que foi conscientemente adiado]

━━━━━━━━━━━━━━━━━━━━━━━━
RECONEXÃO
━━━━━━━━━━━━━━━━━━━━━━━━
"[nota de propósito — por que Leonardo faz o que faz]"

→ Ritual concluído. Bom descanso.
```
