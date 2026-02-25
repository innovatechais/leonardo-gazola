---
task: Intake & Analyze
responsavel: "@dna-extractor"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_name: Nome da pessoa a ser clonada
  - objective: Para que o clone vai ser usado (ex: coaching, copy, estratégia)
  - documents: Conteúdo fornecido (textos colados, transcrições, livros, posts)
  - source_types: Tipos de fonte (livro, transcrição, post, entrevista, curso, etc.)
  - language: PT | EN | bilingual
Saida: |
  - intake_report: Relatório de ingestão com inventário dos materiais
  - content_quality_score: Avaliação da riqueza do material para clonagem (0-100)
  - gaps: Lista de lacunas identificadas (o que falta para um clone mais fiel)
  - recommendation: Prosseguir com extração OU solicitar mais material
  - next_step: "*extract-dna {pessoa} {objetivo}"
Checklist:
  - "[ ] Elicitar nome da pessoa a ser clonada"
  - "[ ] Elicitar objetivo do clone"
  - "[ ] Receber e inventariar todos os documentos fornecidos"
  - "[ ] Classificar cada documento por tipo (livro, transcrição, post, etc.)"
  - "[ ] Identificar volume e diversidade do material"
  - "[ ] Avaliar qualidade do material para extração de DNA"
  - "[ ] Identificar gaps (ex: sem material de voz falada, sem exemplos de decisão)"
  - "[ ] Recomendar prosseguir ou solicitar mais material"
  - "[ ] Apresentar inventário ao usuário para confirmação"
---

# *intake — Intake & Analyze

Primeiro passo do pipeline de clonagem. Mira elicita os parâmetros, recebe os documentos
e faz um diagnóstico do material antes de iniciar a extração de DNA.

## Elicitação

```
🧬 Mira — Intake de Clonagem

? Quem você quer clonar?
  → [Nome da pessoa / especialista]

? Qual é o objetivo desse clone?
  → Ex: "quero um coach no estilo dele para me dar feedback"
     Ex: "quero que ele escreva copy no estilo do Gary Halbert"
     Ex: "quero um consultor de estratégia com a visão do Peter Thiel"

? Quais materiais você está fornecendo?
  1. Livro(s) — cole o texto ou indique o título
  2. Transcrições de falas/podcasts/lives
  3. Posts e threads em redes sociais
  4. E-mails ou newsletters
  5. Cursos / aulas (transcritos)
  6. Entrevistas
  7. Outro (descreva)

? Cole ou descreva o conteúdo abaixo:
  → [Usuário fornece o material]

? Idioma preferido do clone?
  1. Português (PT)
  2. Inglês (EN)
  3. Bilíngue (PT/EN)
```

## Inventário de Material

Após receber o material, Mira apresenta:

```
🧬 Inventário de Material — {pessoa}

Documentos recebidos:
| # | Tipo | Tamanho estimado | Riqueza para DNA |
|---|------|-----------------|-----------------|
| 1 | Livro | ~40.000 palavras | Alta |
| 2 | Transcrição podcast | ~8.000 palavras | Média-alta |
| 3 | Posts Instagram | ~200 posts | Média |

Score de material: {X}/100

Gaps identificados:
- ⚠️ Sem material de tomada de decisão em situações de crise
- ⚠️ Pouco material em inglês (clone será fraco nesse idioma)

Recomendação: {Prosseguir | Solicitar mais material}

→ Próximo: *extract-dna {pessoa} {objetivo}
```

## Critérios de Score de Material

| Fator | Peso | O que avalia |
|-------|------|-------------|
| Volume total | 20% | Palavras/horas de conteúdo |
| Diversidade de formato | 20% | Mix de livro, vídeo, texto |
| Profundidade (frameworks explícitos) | 25% | Ensina como pensa |
| Voz falada disponível | 15% | Transcrições de vídeo/podcast |
| Exemplos de decisão real | 20% | Como agiu em situações reais |
