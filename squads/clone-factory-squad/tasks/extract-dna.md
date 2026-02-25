---
task: Extract DNA
responsavel: "@dna-extractor"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - person_name: Nome da pessoa
  - objective: Objetivo do clone
  - documents: Conteúdo ingerido no intake
  - intake_report: Relatório de intake com inventário
Saida: |
  - dna_profile: Perfil de DNA completo preenchido no template dna-profile-tmpl.md
  - confidence_score: Nível de confiança por dimensão (0-100 por eixo)
  - evidence_log: Log de evidências para cada traço extraído
  - next_step: "Handoff para @clone-architect: *build-clone {pessoa}"
Checklist:
  - "[ ] Ler e processar todos os documentos do intake"
  - "[ ] Extrair: tom de voz e vocabulário recorrente"
  - "[ ] Extrair: cadência, ritmo e nível de formalidade"
  - "[ ] Extrair: frameworks e modelos mentais explícitos"
  - "[ ] Extrair: analogias e metáforas favoritas"
  - "[ ] Extrair: heurísticas de tomada de decisão"
  - "[ ] Extrair: gatilhos de sim e de não"
  - "[ ] Extrair: crenças fundamentais e worldview"
  - "[ ] Extrair: posições contraintuitivas ou polêmicas"
  - "[ ] Extrair: histórias e narrativas recorrentes"
  - "[ ] Extrair: assinaturas comportamentais únicas"
  - "[ ] Triangular padrões entre diferentes fontes"
  - "[ ] Calcular confidence score por dimensão"
  - "[ ] Preencher dna-profile-tmpl.md com evidências"
  - "[ ] Apresentar DNA Profile para revisão do usuário"
  - "[ ] Fazer handoff para @clone-architect"
---

# *extract-dna — Extract DNA Cognitivo

Mira realiza a extração profunda do DNA cognitivo da pessoa a partir de todo o material
ingerido. O output é um DNA Profile completo com evidências para cada traço.

## Processo de Extração

### Dimensão 1: Voz & Estilo

Mira analisa cada documento buscando:
- Palavras que a pessoa usa consistentemente (mínimo 3x por fonte)
- Tom predominante (entusiasta, sóbrio, provocador, empático, etc.)
- Abertura típica de textos e falas
- Fechamento típico de textos e falas
- Uso de ironia, humor, hipérbole
- Nível de formalidade por contexto

### Dimensão 2: Modelos Mentais

Mira mapeia:
- Frameworks que a pessoa ensina explicitamente
- Frameworks implícitos no modo como estrutura argumentos
- Referências intelectuais que cita (autores, livros, conceitos)
- Analogias favoritas (como compara X com Y para explicar Z)

### Dimensão 3: Heurísticas de Decisão

Mira identifica regras do tipo:
- "Sempre que [situação], faço [ação]"
- "Nunca [ação] porque [crença]"
- "O critério mais importante para decidir sobre [tema] é [X]"
- Prioridades em situações de conflito

### Dimensão 4: Crenças & Worldview

Mira mapeia:
- Posições fortes que a pessoa defende publicamente
- Críticas recorrentes ao mercado ou ao status quo
- O que a pessoa valoriza acima de tudo
- Visão de mundo que permeia todas as falas

### Dimensão 5: Storytelling

Mira cataloga:
- Histórias que aparecem em múltiplas fontes
- Estrutura narrativa preferida (como conta uma história)
- Tipo de provas que usa (dados, anedotas, exemplos pessoais)
- Como conecta história com lição

### Dimensão 6: Assinaturas Comportamentais

Mira identifica:
- Comportamentos únicos que distinguem a pessoa
- Reações típicas a erros, críticas, obstáculos
- Como trata discordância e debate
- Energia e urgência no estilo

## Output — DNA Profile Preview

```
🧬 DNA Profile — {pessoa}
Objetivo do clone: {objetivo}
Score de material: {X}/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VOZ & ESTILO (confiança: X%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tom: [...]
Vocabulário-chave: [palavra1, palavra2, ...]
Cadência: [...]
Abertura típica: "[...]"
Fechamento típico: "[...]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MODELOS MENTAIS (confiança: X%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frameworks explícitos:
  - [Framework 1]: [descrição]
  - [Framework 2]: [descrição]
Analogias favoritas:
  - "[...]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEURÍSTICAS DE DECISÃO (confiança: X%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - [Heurística 1]
  - [Heurística 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRENÇAS FUNDAMENTAIS (confiança: X%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - [Crença 1]
  - [Crença 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STORYTELLING (confiança: X%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Histórias recorrentes:
  - [História 1]
Estrutura narrativa preferida: [...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSINATURAS COMPORTAMENTAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - [Assinatura 1]
  - [Assinatura 2]

→ @clone-architect (Forge): DNA pronto. Execute *build-clone {pessoa}
```
