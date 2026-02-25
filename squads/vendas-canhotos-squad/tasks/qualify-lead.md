---
task: Qualify Lead
responsavel: "@icp-qualifier"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - empresa: Nome, CNPJ ou descrição da empresa
  - dados_conhecidos: Qualquer informação que já se sabe sobre a empresa
Saida: |
  - score: 0-100
  - classificacao: Alta / Média / Baixa
  - breakdown: Score por critério com justificativa
  - proximo_passo: Ação recomendada com urgência
Checklist:
  - "[ ] Identificar empresa e coletar dados disponíveis"
  - "[ ] Estimar volume de canhotos/mês"
  - "[ ] Verificar tamanho da frota (se disponível)"
  - "[ ] Identificar ERP utilizado"
  - "[ ] Avaliar se processo manual está presente"
  - "[ ] Identificar decisor (se possível)"
  - "[ ] Calcular score por critério"
  - "[ ] Classificar: Alta / Média / Baixa"
  - "[ ] Definir próximo passo e urgência"
---

# *qualify-lead — Qualificação de Lead

Avalia o fit de uma empresa com o ICP da Innovatech e define próximo passo.

## Output Esperado

```
🎯 Filtro — Qualificação: {nome da empresa}
[data]

SCORE: [X]/100 — 🟢 ALTA / 🟡 MÉDIA / 🔴 BAIXA

━━━━━━━━━━━━━━━━━━━━━━━━
BREAKDOWN POR CRITÉRIO
━━━━━━━━━━━━━━━━━━━━━━━━
Volume de canhotos/mês: [estimativa] → [X]/30 pts
  Fonte: [como foi estimado]

Tamanho da frota: [N veículos] → [X]/20 pts
  Fonte: [como foi obtido]

ERP ativo: [sim/não/qual] → [X]/20 pts

Processo manual atual: [confirmado/estimado] → [X]/15 pts

Decisor acessível: [cargo identificado] → [X]/15 pts

━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMO PASSO
━━━━━━━━━━━━━━━━━━━━━━━━
Ação: [o que fazer]
Urgência: [imediata / esta semana / este mês / nurture]
Responsável: [Leonardo / representante / agente]

Nota: [qualquer observação relevante sobre esse prospect]
```
