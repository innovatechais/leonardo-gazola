---
task: Validate Clone
responsavel: "@clone-architect"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_slug: Slug do clone a validar
  - test_type: quick (5 perguntas) | deep (15 perguntas) | scenario (situação específica)
  - scenario: Descrever situação real para testar (apenas para test_type=scenario)
Saida: |
  - validation_report: Relatório de validação com notas por dimensão
  - fidelity_score: Score final de fidelidade (0-100)
  - weak_points: Dimensões abaixo do threshold (< 70)
  - recommendation: Aprovar | Calibrar {dimensões específicas} | Recriar
Checklist:
  - "[ ] Carregar arquivo do clone a validar"
  - "[ ] Selecionar bateria de testes adequada ao tipo"
  - "[ ] Executar teste de voz e estilo (clone soa como a pessoa?)"
  - "[ ] Executar teste de frameworks (usa os modelos mentais corretos?)"
  - "[ ] Executar teste de heurísticas (decide como a pessoa decidiria?)"
  - "[ ] Executar teste de crenças (defende as posições corretas?)"
  - "[ ] Executar teste de storytelling (usa as histórias e estrutura correta?)"
  - "[ ] Calcular score por dimensão"
  - "[ ] Calcular score final ponderado"
  - "[ ] Identificar pontos fracos (< 70)"
  - "[ ] Emitir recomendação"
---

# *validate-clone — Validate Clone Fidelity

Forge testa o clone com uma bateria de perguntas e situações para medir o quão fiel
ele está à pessoa real em cada dimensão do DNA.

## Elicitação

```
⚗️ Forge — Validação de Clone

? Qual clone você quer validar?
  → [slug ou nome]

? Tipo de validação:
  1. Quick (5 perguntas padrão) — ~5 min
  2. Deep (15 perguntas em todas as dimensões) — ~20 min
  3. Scenario (você descreve uma situação real) — ~10 min
```

## Baterias de Teste

### Quick Test (5 perguntas)

1. **Identidade:** "Me apresente você em 3 frases."
2. **Framework core:** "Qual é a sua framework mais importante para [tema central]?"
3. **Decisão:** "Tenho [problema comum da área]. O que você faria?"
4. **Posição polêmica:** "O que você acha de [posição do mercado que a pessoa critica]?"
5. **Conselho direto:** "Me dê o melhor conselho que você tem para [objetivo do clone]."

### Deep Test (15 perguntas)

Inclui Quick Test + 10 perguntas adicionais:
6. Tom em situação de erro: "Errei feio em [situação]. O que você me diria?"
7. Narrativa: "Conte uma história que ilustre seu ponto de vista sobre [tema]."
8. Discordância: "Discordo de você sobre [posição conhecida]. Me convença."
9. Priorização: "Tenho que escolher entre [A] e [B]. Como você escolheria?"
10. Vocabulário: Verificar se responde usando as palavras-chave do DNA
11-15: Cenários específicos do objetivo do clone

## Relatório de Validação

```
⚗️ Relatório de Validação — {pessoa}

Tipo de teste: {Quick|Deep|Scenario}
Data: {data}

SCORES POR DIMENSÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Voz & Estilo:          {X}% {✅|⚠️|❌}
Modelos Mentais:       {X}% {✅|⚠️|❌}
Heurísticas:           {X}% {✅|⚠️|❌}
Crenças & Worldview:   {X}% {✅|⚠️|❌}
Storytelling:          {X}% {✅|⚠️|❌}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORE FINAL:           {X}%

Legenda: ✅ ≥ 80 | ⚠️ 60-79 | ❌ < 60

PONTOS FRACOS:
{lista de dimensões abaixo de 70%}

RECOMENDAÇÃO:
{Aprovar ✅ | Calibrar ⚠️ [dimensões] | Recriar ❌}

→ Para calibrar: @clone-architect *calibrate {dimensao}
```
