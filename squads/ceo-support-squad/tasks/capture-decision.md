---
task: Capture Decision
responsavel: "@decision-log"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - decisao: O que foi decidido
  - contexto: Por que essa decisão foi necessária agora
  - area: produto | investimento | time | clientes | pessoal
Saida: |
  - registro: Decisão documentada com todos os campos
  - proximo_passo: Ação derivada com responsável e data
Checklist:
  - "[ ] Elicitar a decisão em 1 frase clara"
  - "[ ] Elicitar contexto — por que agora?"
  - "[ ] Elicitar raciocínio — por que essa opção?"
  - "[ ] Identificar alternativas consideradas"
  - "[ ] Identificar quem foi consultado"
  - "[ ] Definir próximo passo com responsável e data"
  - "[ ] Definir data ou gatilho de revisão"
  - "[ ] Confirmar com Leonardo antes de finalizar"
---

# *capture-decision — Registro de Decisão

Documenta decisões importantes de Leonardo com contexto, raciocínio e próximos passos.

## Elicitação

```
? Qual foi a decisão? (1 frase)
? Por que essa decisão foi necessária agora?
? Por que você escolheu essa opção?
? Quais outras opções você considerou?
? Consultou alguém (Lorenzo, Arthur, José Roberto)?
? Qual é o próximo passo derivado dessa decisão?
? Quando você quer revisitar essa decisão?
```

## Output Esperado

```
📋 DECISÃO #[N] — [DATA]
Área: [produto | investimento | time | clientes | pessoal]

DECISÃO
[O que foi decidido em 1 frase clara]

CONTEXTO
[Por que essa decisão foi necessária agora]

RACIOCÍNIO
[Por que essa opção foi escolhida]

ALTERNATIVAS CONSIDERADAS
• Opção A: [descrição] → descartada porque [motivo]
• Opção B: [descrição] → descartada porque [motivo]

CONSULTADOS
[sócios / clientes / advisors / ninguém]

PRÓXIMO PASSO
[ação específica] — Responsável: [Leonardo/Lorenzo/Arthur] — Data: [xx/xx]

REVISITAR EM
[data ou gatilho: "quando fechar o round" / "em 30 dias" / "se X acontecer"]

---
Registrado por: @decision-log
```

## Calculadora de Despesas dos Sócios

Quando comando `*split-expenses`:

```
? Qual é o total a dividir (ou lista de despesas)?

OUTPUT:
💰 Divisão de Despesas — [mês/ano]

| Sócio | % | Valor |
|-------|---|-------|
| Leonardo | 30% | R$ [X] |
| Lorenzo | 30% | R$ [X] |
| Arthur | 30% | R$ [X] |
| José Roberto | 10% | R$ [X] |
| TOTAL | 100% | R$ [X] |

[Pronto para compartilhar por WhatsApp]
```
