---
task: Analyze Campaign Metrics
responsavel: "@metrics-optimization-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - campaign_data: Dados de campanha (CSV, cola ou descrição manual)
  - period: Período de análise (default: últimos 7 dias)
  - focus: all | ctr | cvr | roas | quality-score (default: all)
Saida: |
  - metrics_report: Relatório de métricas com benchmarks
  - alerts: Alertas de KPIs fora do threshold
  - recommendations: Ações priorizadas por impacto
  - next_steps: Próximas tasks sugeridas
Checklist:
  - "[ ] Coletar dados via elicitação"
  - "[ ] Calcular CTR, CVR, ROAS, CPA por campanha/grupo/keyword"
  - "[ ] Comparar com benchmarks do framework"
  - "[ ] Identificar alertas (KPIs abaixo do threshold)"
  - "[ ] Diagnosticar gargalo principal do funil"
  - "[ ] Gerar recomendações priorizadas"
  - "[ ] Sugerir próximas tasks (optimize-funnel, quality-score-audit, etc.)"
---

# *analyze-campaign — Analyze Campaign Metrics

Analisa métricas de campanha Google Ads e identifica oportunidades de otimização.

## Elicitação

```
? Período de análise:
  1. Últimos 7 dias
  2. Últimos 14 dias
  3. Últimos 30 dias
  4. Customizado

? Foco da análise:
  1. Visão geral (all)
  2. CTR — anúncios com baixo clique
  3. CVR — presell ou LP não convertendo
  4. ROAS — campanha no negativo
  5. Quality Score — CPC alto, posição ruim

? Cole os dados (ou descreva os números principais):
```

## Benchmarks de Referência

| Métrica | Verde | Amarelo | Vermelho |
|---------|-------|---------|----------|
| CTR Search | > 3% | 1.5-3% | < 1.5% |
| CVR Presell | > 40% | 20-40% | < 20% |
| CVR LP (ClickBank) | > 2% | 0.8-2% | < 0.8% |
| ROAS | > 150% | 100-150% | < 100% |
| Quality Score | 7-10 | 5-6 | 1-4 |
| CPA vs ticket | < 30% | 30-50% | > 50% |

## Output Esperado

```
📊 Flux — Relatório de Métricas ({período})

🟢 CTR: 4.2% — Acima do benchmark
🔴 CVR LP: 0.6% — ABAIXO — Possível problema na oferta ou LP
🟡 ROAS: 118% — Margem apertada — Monitorar

⚠️ ALERTA PRINCIPAL: CVR LP baixo está impactando ROAS
→ Hipótese: Desalinhamento entre presell e sales page ClickBank
→ Ação 1: Auditar promessa da presell vs. LP da oferta
→ Ação 2: Testar oferta alternativa com mesmo nicho

Próximos passos:
  1. *funnel-audit para diagnosticar drop-off
  2. Alertar @funnel-copywriter para revisão de presell
```
