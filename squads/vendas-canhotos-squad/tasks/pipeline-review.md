---
task: Pipeline Review
responsavel: "@pipeline-manager"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - periodo: semana (default) | mes | tudo
  - foco: all | alertas | negociacao_ativa
Saida: |
  - pipeline_status: Status completo de todos os prospects
  - acoes_prioritarias: Lista ordenada de ações para fazer hoje/esta semana
  - alertas: Follow-ups vencidos e prospects esfriando
  - metricas: Volume por estágio e taxas de conversão
Checklist:
  - "[ ] Listar todos os prospects ativos por estágio"
  - "[ ] Identificar follow-ups vencidos (> 3 dias sem resposta)"
  - "[ ] Identificar prospects esfriando (> 7 dias sem contato)"
  - "[ ] Identificar quem está em negociação ativa"
  - "[ ] Calcular métricas: total por estágio, taxa de conversão"
  - "[ ] Ordenar ações por urgência"
  - "[ ] Gerar lista de ações prioritárias com responsável"
---

# *pipeline-review — Revisão do Pipeline

Visão completa do pipeline com ações prioritárias ordenadas por urgência.

## Output Esperado

```
📡 Radar — Revisão do Pipeline
[data]

━━━━━━━━━━━━━━━━━━━━━━━━
🔴 AÇÃO IMEDIATA ([N] prospects)
━━━━━━━━━━━━━━━━━━━━━━━━
• [empresa] — Follow-up vencido há [X] dias — Ação: [ligar/enviar proposta/etc]
• [empresa] — [motivo] — Ação: [próximo passo]

━━━━━━━━━━━━━━━━━━━━━━━━
🟡 ESTA SEMANA ([N] prospects)
━━━━━━━━━━━━━━━━━━━━━━━━
• [empresa] — Estágio: [X] — Próxima ação: [ação] — Até: [data]
• [empresa] — Estágio: [X] — Próxima ação: [ação] — Até: [data]

━━━━━━━━━━━━━━━━━━━━━━━━
🟢 NO TRILHO ([N] prospects)
━━━━━━━━━━━━━━━━━━━━━━━━
• [empresa] — Estágio: [X] — Próxima ação: [ação] — Em: [data]

━━━━━━━━━━━━━━━━━━━━━━━━
📊 MÉTRICAS DO PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━
Total de prospects: [N]
Em negociação ativa (est. 5-7): [N]
Demos esta semana: [N] agendadas
Taxa de qualificado→demo: [X%]
Taxa de demo→proposta: [X%]
Velocidade média do ciclo: [X] dias

→ Foco principal dessa semana: [ação de maior impacto]
```
