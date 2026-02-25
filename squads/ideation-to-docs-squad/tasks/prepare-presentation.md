---
task: Prepare Presentation
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - format: outline | marp (default: outline)
Saida: |
  - slides_path: docs/ideation/<session>/slides.md
Checklist:
  - "[ ] Carregar ideation.json e document.md"
  - "[ ] Gerar narrativa (início → meio → fim)"
  - "[ ] Produzir outline de 8-12 slides"
  - "[ ] Incluir 1 slide de decisões e 1 de próximos passos"
  - "[ ] Salvar slides.md"
---

# *prepare-presentation — Prepare Presentation

## Elicitação

```text
? Público da apresentação:
  1) Time interno
  2) Stakeholders/gestão
  3) Clientes
  4) Investidores
? Duração alvo: 5min | 10min | 20min (default: 10min)
```

## Output

Crie:

- `docs/ideation/<session>/slides.md`

Use o template do squad: `templates/slides-outline-tmpl.md`.

Regras:

- 1 ideia por slide (quando possível).
- Evite detalhes operacionais demais; direcione para o documento.

Próximo passo: `*review-output --session <session>`

