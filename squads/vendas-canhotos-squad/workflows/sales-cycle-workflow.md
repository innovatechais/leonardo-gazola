# Sales Cycle Workflow

Workflow completo do ciclo de vendas da Innovatech — de lead a cliente.

---

## Fluxo Principal

```
LEAD IDENTIFICADO
      ↓
@icp-qualifier (*qualify-lead {empresa})
      ↓
[Score Alta / Média / Baixa]
      ├── Baixa → Nurture ou descartar
      ├── Média → Abordagem com qualificação adicional
      └── Alta → Abordagem imediata
      ↓
PRIMEIRO CONTATO (representante treinado com @sales-trainer)
      ↓
@pipeline-manager (*add-prospect {empresa} "primeiro_contato")
      ↓
[Resposta recebida?]
      ├── Não em 3 dias → @pipeline-manager alerta → follow-up
      └── Sim → Agendar demo
      ↓
DEMO AGENDADA
      ↓
@roi-calculator (*roi-proposal) — gerar ROI personalizado com dados do prospect
      ↓
DEMO EXECUTADA (5 min de demonstração + ROI ao vivo)
      ↓
[Objeção?]
      └── Sim → @sales-trainer (*objection-response {objeção})
      ↓
PROPOSTA ENVIADA
      ↓
[Resposta em 48h?]
      ├── Não → @pipeline-manager alerta → follow-up
      └── Sim → Negociação
      ↓
FECHAMENTO
      ↓
✅ Contrato assinado → passa para @onboarding-guide (Squad 4)
```

---

## Comandos por Fase

| Fase | Agente | Comando |
|------|--------|---------|
| Qualificar empresa | Filtro | `@icp-qualifier *qualify-lead` |
| Calcular ROI para demo | Prova | `@roi-calculator *roi-proposal` |
| Responder objeção | Coach | `@sales-trainer *objection-response` |
| Revisar pipeline | Radar | `@pipeline-manager *pipeline-review` |

---

## SLA do Ciclo de Vendas

| Estágio | SLA máximo |
|---------|-----------|
| Lead → Primeiro contato | 48h |
| Contato → Demo | 7 dias |
| Demo → Proposta | 24h |
| Proposta → Fechamento | 14 dias |
| Ciclo total | 30 dias |
