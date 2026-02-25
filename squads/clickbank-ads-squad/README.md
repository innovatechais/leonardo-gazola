# ClickBank Ads Squad

Squad especializado em afiliados ClickBank + Google Ads Rede de Pesquisa.
Bilíngue PT/EN. Modo padrão colaborativo, com opção de modo autônomo (`*yolo`).

---

## Agentes

| Agente | Nome | Foco | Ativar com |
|--------|------|------|-----------|
| 🔎 Research & Offer Analyst | Rex | Minera ofertas ClickBank, scoring, SERP research | `@offer-research-analyst` |
| ✍️ Funnel Copywriter | Nova | Presell, ad copy, emails, variações A/B | `@funnel-copywriter` |
| 📊 Metrics & Optimization Analyst | Flux | Métricas, ROAS, CVR, Quality Score, otimização | `@metrics-optimization-analyst` |

---

## Workflow Principal

```
Rex → Nova → [Você sobe a campanha] → Flux → loop
```

Detalhes completos em: `workflows/full-funnel-workflow.md`

---

## Início Rápido

```
# 1. Pesquisar ofertas
@offer-research-analyst
*mine-offers health

# 2. Criar funil
@funnel-copywriter
*write-presell [oferta aprovada por Rex]

# 3. Analisar resultados
@metrics-optimization-analyst
*analyze-campaign [dados dos últimos 7 dias]
```

---

## Modo Autônomo (YOLO)

Todos os agentes suportam `*yolo` para execução sem confirmações intermediárias.
Use quando você já conhece o workflow e quer velocidade máxima.

---

## Estrutura do Squad

```
clickbank-ads-squad/
├── squad.yaml                          # Manifest
├── README.md                           # Este arquivo
├── agents/
│   ├── offer-research-analyst.md       # Rex
│   ├── funnel-copywriter.md            # Nova
│   └── metrics-optimization-analyst.md # Flux
├── tasks/
│   ├── mine-clickbank-offers.md
│   ├── write-presell-page.md
│   └── analyze-campaign-metrics.md
├── workflows/
│   └── full-funnel-workflow.md
├── checklists/
├── templates/
└── data/
```

---

## Benchmarks de Referência

| Métrica | Meta | Alerta |
|---------|------|--------|
| CTR Search | > 3% | < 1.5% |
| CVR Presell | > 40% | < 20% |
| ROAS | > 150% | < 100% |
| Quality Score | >= 7 | <= 4 |
