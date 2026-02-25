---
task: Client Health Report
responsavel: "@client-health-monitor"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - cliente: jaloto | metaltintas | taretar | all (default: all)
  - periodo: semana (default) | mes
Saida: |
  - relatorio: Status de saúde de cada cliente com métricas e alertas
  - acoes: Lista de intervenções necessárias (se houver)
Checklist:
  - "[ ] Verificar volume de transações de cada cliente (vs. mês anterior)"
  - "[ ] Verificar taxa de erro de processamento"
  - "[ ] Verificar tempo médio de processamento"
  - "[ ] Verificar data do último contato humano"
  - "[ ] Classificar saúde: Verde / Amarelo / Vermelho"
  - "[ ] Identificar ações necessárias para clientes em alerta"
  - "[ ] Gerar plano de intervenção para clientes em vermelho"
---

# *client-health-report — Relatório de Saúde dos Clientes

Monitora Jaloto, Metaltintas e TareTar — e avisa antes do problema virar churn.

## Output Esperado

```
💚 Sentinela — Saúde dos Clientes
[data] | Período: [semana/mês]

━━━━━━━━━━━━━━━━━━━━━━━━
🟢 JALOTO — Saudável
━━━━━━━━━━━━━━━━━━━━━━━━
Volume: [N] transações ([+X%] vs. semana anterior)
Taxa de erro: [X]% ✅
Tempo médio: [X]s ✅
Último contato humano: [X] dias atrás
Status: Sem ações necessárias

━━━━━━━━━━━━━━━━━━━━━━━━
🟡 METALTINTAS — Atenção
━━━━━━━━━━━━━━━━━━━━━━━━
Volume: [N] transações ([-X%] vs. semana anterior)
Taxa de erro: [X]% ⚠️
Alerta: [descrição do que está anormal]
Ação sugerida: [o que fazer e quando]
Responsável: [Leonardo / agente]

━━━━━━━━━━━━━━━━━━━━━━━━
🔴 TARETAR — Ação Necessária
━━━━━━━━━━━━━━━━━━━━━━━━
Volume: [N] transações ([-X%] — 3ª semana consecutiva)
Último contato: [X] dias ❌
ALERTA CRÍTICO: [descrição]
INTERVENÇÃO: [ação imediata recomendada]
Urgência: Hoje

━━━━━━━━━━━━━━━━━━━━━━━━
RESUMO DE AÇÕES
━━━━━━━━━━━━━━━━━━━━━━━━
🔴 TareTar — [ação] — HOJE
🟡 Metaltintas — [ação] — Esta semana
🟢 Jaloto — Sem ação necessária
```
