---
task: ROI Proposal
responsavel: "@roi-calculator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - prospect: Nome da empresa
  - canhotos_mes: Volume mensal de canhotos (ou estimativa)
  - tempo_atual: Minutos gastos por canhoto no processo manual
  - custo_hora: Custo hora do colaborador que processa (ou estimativa)
  - taxa_erro: Percentual de erros de faturamento estimado (default: 2%)
Saida: |
  - proposta_roi: Proposta personalizada formatada para apresentar
  - custo_inacao: Quanto a empresa perde por mês sem a Innovatech
  - comparativo: Caso real comparável (Jaloto ou Metaltintas)
Checklist:
  - "[ ] Elicitar dados do prospect via perguntas de qualificação"
  - "[ ] Calcular custo atual do processo manual"
  - "[ ] Calcular custo de erros de faturamento"
  - "[ ] Definir custo da Innovatech para esse perfil"
  - "[ ] Calcular economia mensal"
  - "[ ] Calcular ROI percentual"
  - "[ ] Calcular payback em dias"
  - "[ ] Selecionar caso comparável (Jaloto ou Metaltintas)"
  - "[ ] Formatar proposta pronta para apresentar"
---

# *roi-proposal — Proposta de ROI Personalizada

Calcula e apresenta o ROI da Innovatech para um prospect específico.

## Perguntas de Elicitação (usar durante qualificação)

```
? Quantos canhotos de entrega vocês processam por mês?
? Quanto tempo uma pessoa leva para conferir e digitar um canhoto hoje?
? Quantas pessoas fazem esse trabalho?
? Vocês já perderam dinheiro por canhoto errado ou extraviado?
```

## Output Esperado

```
💰 Prova — Proposta de ROI: {nome da empresa}
[data]

━━━━━━━━━━━━━━━━━━━━━━━━
SITUAÇÃO ATUAL
━━━━━━━━━━━━━━━━━━━━━━━━
Volume: [N] canhotos/mês
Tempo de processamento: [X] min/canhoto
Colaboradores no processo: [N] pessoas
Custo do processo manual: R$ [X]/mês
Custo estimado de erros: R$ [X]/mês
─────────────────────────
TOTAL ATUAL: R$ [X]/mês → R$ [X]/ano

━━━━━━━━━━━━━━━━━━━━━━━━
COM INNOVATECH
━━━━━━━━━━━━━━━━━━━━━━━━
Investimento: R$ [X]/mês
Tempo de processamento: 2-3 segundos
Erros eliminados: ~99%
─────────────────────────
CUSTO INNOVATECH: R$ [X]/mês

━━━━━━━━━━━━━━━━━━━━━━━━
RESULTADO
━━━━━━━━━━━━━━━━━━━━━━━━
Economia mensal: R$ [X]
ROI: [X]% ao mês
Payback: [X] dias

━━━━━━━━━━━━━━━━━━━━━━━━
CASO COMPARÁVEL
━━━━━━━━━━━━━━━━━━━━━━━━
[Jaloto/Metaltintas] — perfil similar — obteve:
• ROI de [X]% — Payback em [X] dias

→ Proposta pronta para apresentar. Envio por WhatsApp? [Sim/Não]
```
