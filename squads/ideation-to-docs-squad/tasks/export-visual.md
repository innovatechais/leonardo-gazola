---
task: Export Visual Canvas
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - format: excalidraw | svg | both (default: both)
  - layout: figjam | clusters | mindmap (default: figjam)
Saida: |
  - excalidraw_path: docs/ideation/<session>/board.excalidraw.json (se format incluir excalidraw)
  - svg_path: docs/ideation/<session>/board.svg (se format incluir svg)
Checklist:
  - "[ ] Confirmar session e formato desejado"
  - "[ ] Carregar ideation.json"
  - "[ ] Gerar board.excalidraw.json com layout legível"
  - "[ ] Gerar board.svg com o mesmo layout"
  - "[ ] Salvar arquivos em docs/ideation/<session>/"
---

# *export-visual — Export Visual Canvas

## Elicitação

```text
? Exportar em qual formato?
  1) Excalidraw (editável)
  2) SVG (importável no Miro/Figma)
  3) Ambos
? Layout visual:
  1) clusters (FigJam vibes: clusters por tema + conectores)
  2) figjam (colunas por tema, cards + conectores)
  3) mindmap (radial, raiz → temas → ideias)
```

## Execução (CLI-first)

Este squad inclui um script sem dependências externas para gerar os arquivos:

```bash
node squads/ideation-to-docs-squad/scripts/export-visual.js --session <session> --format both --layout figjam
```

## Onde usar o output

- **Excalidraw**: abra o app e importe `board.excalidraw.json` (fica totalmente editável).
- **Figma/Miro**: importe `board.svg` como base visual (ótimo para apresentar e organizar).

> Observação: o formato mais “editável” (mover nós, reconectar setas) é o Excalidraw.

