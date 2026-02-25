---
task: Write Presell Page
responsavel: "@funnel-copywriter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - opportunity_report: Relatório de oportunidade de @offer-research-analyst
  - language: PT | EN
  - avatar_profile: Perfil do avatar (opcional — Rex pode gerar)
  - tone: educational | story | news | listicle (default: story)
  - word_count: 600-1200 (default: 900)
Saida: |
  - presell_page: Página de presell completa formatada em Markdown
  - ab_headlines: 3 variações de headline para teste
  - cta_variants: 2 variações de CTA
  - compliance_notes: Observações de conformidade Google Ads
Checklist:
  - "[ ] Receber e analisar Opportunity Report"
  - "[ ] Definir avatar e dor principal"
  - "[ ] Escolher formato (story/educational/news/listicle)"
  - "[ ] Escrever headline principal + subheadline"
  - "[ ] Desenvolver hook (primeiros 100 palavras críticos)"
  - "[ ] Construir story arc ou estrutura escolhida"
  - "[ ] Inserir prova social (depoimentos genéricos ou espaços marcados)"
  - "[ ] Escrever CTA suave para redirect"
  - "[ ] Revisar compliance (sem claims médicos/financeiros diretos)"
  - "[ ] Gerar variações A/B de headline"
  - "[ ] Gerar variações de CTA"
---

# *write-presell — Write Presell Page

Cria presell page completa otimizada para tráfego Google Ads Search.

## Elicitação

```
? Idioma da presell: PT | EN
? Formato preferido:
  1. Story (narrativa pessoal — maior engajamento)
  2. Educational (conteúdo informativo — maior credibilidade)
  3. News-style (formato de notícia — alta curiosidade)
  4. Listicle (lista de benefícios — scannability)

? Tom do avatar: Desesperado | Curioso | Cético | Motivado
? Palavra-chave principal (para alinhamento SEO/QS):
? URL da oferta ClickBank destino:
```

## Estrutura Padrão (Story Arc)

```markdown
# [HEADLINE PODEROSA — promessa + curiosidade]
## [Subheadline — amplifica promessa]

[Parágrafo de abertura — hook com dor do avatar]

[Desenvolvimento — story de identificação]

[Revelação — apresentar solução sem nomear diretamente]

[Prova social — resultados/depoimentos]

[CTA → "Clique aqui para ver como funciona"]
```

## Compliance Google Ads

- ❌ Sem "cura garantida", "perca X kg em Y dias"
- ❌ Sem screenshots de ganhos sem disclaimers
- ✅ Linguagem de possibilidade ("pode ajudar", "muitos relatam")
- ✅ Disclaimer no rodapé quando necessário
