---
task: Pre-Meeting Prep
responsavel: "@investor-researcher"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - investidor: Nome, link do LinkedIn ou site do fundo
  - data_reuniao: Data e hora da reunião
  - contexto_adicional: Qualquer informação que Leonardo já sabe sobre esse investidor
Saida: |
  - briefing: Perfil completo do investidor com fit analysis
  - pontos_atencao: 5 pontos específicos para adaptar o pitch
  - perguntas_provaveis: 3-5 perguntas que esse investidor provavelmente vai fazer
  - red_flags: O que evitar com esse investidor específico
Checklist:
  - "[ ] Identificar o investidor (nome, fundo, tipo)"
  - "[ ] Pesquisar portfolio atual"
  - "[ ] Identificar tese de investimento declarada"
  - "[ ] Verificar tickets históricos"
  - "[ ] Avaliar fit com o contexto da Innovatech"
  - "[ ] Identificar empresas do portfolio com sinergia"
  - "[ ] Definir 5 pontos de atenção específicos"
  - "[ ] Prever 3-5 perguntas prováveis desse investidor"
  - "[ ] Identificar red flags ou tópicos sensíveis"
  - "[ ] Entregar briefing para @pitch-coach finalizar a preparação"
---

# *pre-meeting-prep — Preparação Pré-Reunião

Briefing personalizado do investidor para Leonardo entrar em cada reunião preparado.

## Elicitação

```
? Nome ou link do investidor/fundo?
? Data e hora da reunião?
? O que você já sabe sobre essa pessoa ou fundo?
? Como surgiu esse contato?
```

## Output Esperado

```
🔍 Briefing Pré-Reunião: {Nome do Investidor}
Reunião: [data/hora]

━━━━━━━━━━━━━━━━━━━━━━━━
PERFIL
━━━━━━━━━━━━━━━━━━━━━━━━
Tipo: [Anjo / Fundo / Family Office / Corporate VC]
Foco declarado: [setores]
Ticket médio: [R$ X a R$ Y]
Estágio preferido: [pre-seed / seed / series A]

━━━━━━━━━━━━━━━━━━━━━━━━
FIT COM INNOVATECH
━━━━━━━━━━━━━━━━━━━━━━━━
Score: [Alto / Médio / Baixo]
Por quê: [justificativa]

Portfolio relevante:
• [empresa] — [o que tem em comum com Innovatech]

━━━━━━━━━━━━━━━━━━━━━━━━
5 PONTOS DE ATENÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━
1. [ponto específico para esse investidor]
2. [ponto específico]
3. [ponto específico]
4. [ponto específico]
5. [ponto específico]

━━━━━━━━━━━━━━━━━━━━━━━━
PERGUNTAS PROVÁVEIS
━━━━━━━━━━━━━━━━━━━━━━━━
1. "[pergunta provável]"
2. "[pergunta provável]"
3. "[pergunta provável]"

━━━━━━━━━━━━━━━━━━━━━━━━
RED FLAGS A EVITAR
━━━━━━━━━━━━━━━━━━━━━━━━
• [tema ou framing que esse investidor costuma reagir mal]

→ Briefing entregue para @pitch-coach finalizar a preparação
```
