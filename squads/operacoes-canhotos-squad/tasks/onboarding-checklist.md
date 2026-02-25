---
task: Onboarding Checklist
responsavel: "@onboarding-guide"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cliente: Nome da empresa
  - erp: ERP utilizado pelo cliente
  - contato_ti: Contato de TI do cliente (para integração)
  - numero_whatsapp: Número do WhatsApp Business a configurar
Saida: |
  - plano_onboarding: Cronograma de 7 dias com responsáveis
  - checklist_erp: Checklist específico para o ERP do cliente
  - status_tracking: Status em tempo real de cada etapa
Checklist:
  - "[ ] Confirmar dados do cliente (nome, CNPJ, ERP, contato TI)"
  - "[ ] Agendar kick-off com cliente (Dia 1)"
  - "[ ] Configurar WhatsApp Business API (Dia 1-2)"
  - "[ ] Mapear campos do ERP para integração (Dia 2-3)"
  - "[ ] Configurar integração ERP ↔ Supabase (Dia 3-5)"
  - "[ ] Treinar equipe do cliente (Dia 5-6)"
  - "[ ] Validar primeiras 10 transações (Dia 6-7)"
  - "[ ] Go-live e handoff para @client-health-monitor (Dia 7)"
---

# *onboarding-checklist — Checklist de Onboarding

Conduz novos clientes do contrato assinado ao primeiro canhoto processado em 7 dias.

## Output Esperado

```
🚀 Guia — Plano de Onboarding: {nome do cliente}
ERP: [nome do ERP]

━━━━━━━━━━━━━━━━━━━━━━━━
CRONOGRAMA
━━━━━━━━━━━━━━━━━━━━━━━━
✅/⬜ DIA 1 — Kick-off
  ⬜ Apresentação da equipe
  ⬜ Alinhamento de expectativas e prazo
  ⬜ Levantamento de requisitos específicos
  ⬜ Configuração inicial do WhatsApp Business API

✅/⬜ DIA 2-3 — Integração ERP
  ⬜ Acesso ao ambiente de homologação do ERP
  ⬜ Mapeamento de campos: [campos específicos do ERP]
  ⬜ Configuração da integração
  ⬜ Primeiros testes de extração

✅/⬜ DIA 4-5 — Ajustes e Validação
  ⬜ Correções baseadas nos testes
  ⬜ Validação de acurácia com canhotos reais do cliente

✅/⬜ DIA 5-6 — Treinamento
  ⬜ Treinamento da equipe do cliente (protocolo WhatsApp)
  ⬜ Material de apoio entregue

✅/⬜ DIA 6-7 — Go-Live
  ⬜ Validação das primeiras 10 transações reais
  ⬜ Aprovação do cliente
  ⬜ Handoff para @client-health-monitor

━━━━━━━━━━━━━━━━━━━━━━━━
STATUS ATUAL: [fase] — [X]% concluído
PRÓXIMA AÇÃO: [ação] — Responsável: [Guia/dev/TI cliente]
```
