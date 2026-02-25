# Client Onboarding Workflow

Workflow de implementação de novos clientes da Innovatech — do contrato ao go-live em 7 dias.

---

## Fluxo Principal

```
CONTRATO ASSINADO
      ↓
@onboarding-guide (*onboarding-checklist {cliente} {ERP})
      ↓
[Plano de 7 dias gerado e validado com o cliente]
      ↓
DIA 1: Kick-off + Configuração WhatsApp Business API
      ↓
DIA 2-3: Mapeamento e configuração da integração ERP
      ↓
[Integração funcionando?]
      ├── Não → @tech-architect (*explain-component erp) → resolver bloqueio
      └── Sim → continua
      ↓
DIA 4-5: Testes com canhotos reais + ajustes
      ↓
DIA 5-6: Treinamento da equipe do cliente
      ↓
DIA 6-7: Validação das 10 primeiras transações
      ↓
[Acurácia >= 99%?]
      ├── Não → investigar e corrigir
      └── Sim → GO-LIVE
      ↓
HANDOFF: @onboarding-guide → @client-health-monitor (Sentinela assume)
      ↓
✅ Cliente ativo — Monitoramento contínuo pelo Sentinela
```

---

## Documentação Técnica por Audiência

| Necessidade | Agente | Comando |
|------------|--------|---------|
| Explicar para TI do cliente | Arquiteto | `@tech-architect *generate-tech-doc dev` |
| Explicar para diretoria do cliente | Arquiteto | `@tech-architect *generate-tech-doc cliente` |
| Investigar problema de integração | Arquiteto | `@tech-architect *explain-component erp` |
| Monitorar saúde após go-live | Sentinela | `@client-health-monitor *client-health-report` |
