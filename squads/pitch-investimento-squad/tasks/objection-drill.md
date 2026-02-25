---
task: Objection Drill
responsavel: "@objection-handler"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - objecao: A objeção específica levantada pelo investidor
  - contexto_investidor: Perfil ou tipo do investidor (se disponível)
Saida: |
  - tipo_objecao: Informação / Preferência / Teste
  - respostas: 2-3 respostas calibradas com dados reais da Innovatech
  - recomendacao: Qual resposta usar para qual perfil de investidor
Checklist:
  - "[ ] Identificar e classificar o tipo de objeção"
  - "[ ] Buscar dados reais da Innovatech para embasar a resposta"
  - "[ ] Formular resposta 1 (data-driven)"
  - "[ ] Formular resposta 2 (contexto expandido)"
  - "[ ] Formular resposta 3 (transformar em vantagem, se aplicável)"
  - "[ ] Recomendar qual usar para o perfil do investidor"
  - "[ ] Treinar com Leonardo se solicitado"
---

# *objection-drill — Treino de Objeções

Prepara 2-3 respostas calibradas com dados reais da Innovatech para cada objeção.

## Elicitação

```
? Qual foi a objeção exata do investidor?
? Qual é o perfil desse investidor? (se souber)
? Essa objeção surgiu em reunião real ou quer se preparar preventivamente?
```

## Output Esperado

```
🛡️ Escudo — Objeção: "{objeção}"

TIPO: [Informação / Preferência / Teste]

━━━━━━━━━━━━━━━━━━━━━━━━
RESPOSTA 1 — Data-Driven
━━━━━━━━━━━━━━━━━━━━━━━━
"[Resposta com número real da Innovatech]"

Dados usados: [ROI documentado / payback / moat / acurácia]

━━━━━━━━━━━━━━━━━━━━━━━━
RESPOSTA 2 — Contexto Expandido
━━━━━━━━━━━━━━━━━━━━━━━━
"[Resposta que expande o ponto de vista]"

━━━━━━━━━━━━━━━━━━━━━━━━
RESPOSTA 3 — Transformar em Vantagem
━━━━━━━━━━━━━━━━━━━━━━━━
"[Resposta que usa a objeção como prova do moat]"

RECOMENDAÇÃO
Use a resposta [1/2/3] para investidores com perfil [X]
Evite a resposta [Y] para investidores que [situação]

→ Quer treinar ao vivo? Responda "sim" para roleplay.
```
