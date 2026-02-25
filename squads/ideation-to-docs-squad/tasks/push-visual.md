---
task: Push Visual Outputs (Miro Direct / Webhook)
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - target: miro|webhook (default: miro)
  - token: Miro token (se target=miro; pode vir via env MIRO_ACCESS_TOKEN)
  - url: webhook URL (se target=webhook; pode vir via env AIOS_IDEATION_WEBHOOK_URL)
Saida: |
  - push_result: status + link do board (Miro) ou resposta HTTP (webhook)
Checklist:
  - "[ ] Confirmar session e destino (target)"
  - "[ ] Carregar ideation.json de docs/ideation/<session>/"
  - "[ ] Se target=miro: criar board + sticky notes + conectores via API"
  - "[ ] Se target=webhook: enviar payload via POST"
  - "[ ] Reportar sucesso/erro e link do board (se Miro)"
---

# *push-visual — Push Visual Outputs (Miro Direct / Webhook)

## Para que serve

Permite que o resultado **apareça automaticamente** no **Miro** (direto via API) ou em **Figma/FigJam** (via import de SVG),
sem upload manual.

**Recomendado: Figma via SVG import** (mais simples, funciona imediatamente, igual ao exemplo do seu amigo).

## Elicitação

```text
? Qual destino você vai usar?
  1) Figma (import SVG — mais simples, igual ao exemplo!)
  2) Miro (direto via API — requer OAuth)
  3) Webhook (Make/Zapier/n8n → Figma/FigJam)
? Se Figma: apenas gere o SVG e importe manualmente (recomendado)
? Se Miro: token de acesso (ou configure MIRO_ACCESS_TOKEN)
? Se webhook: URL do webhook
```

## Execução (CLI)

### Opção 1: Figma (import SVG — mais simples, igual ao exemplo!)

**1. Gere o board visual:**
```text
@ideation-orchestrator
*export-visual --session ideation-2026-02-17 --format svg --layout clusters
```

**2. Importe no Figma:**
- Abra o Figma
- Vá em **"File"** → **"Import"** (ou arraste o arquivo)
- Escolha `docs/ideation/ideation-2026-02-17/board.svg`
- O board aparece pronto para editar! 🎉

**Igual ao exemplo do seu amigo** — os agentes geram o SVG, você importa e fica editável.

### Opção 2: Miro (direto via API — requer OAuth)

**1. Obtenha seu token Miro:**
- Acesse: https://developers.miro.com/
- Configure OAuth (processo complexo)

**2. Rode:**
```bash
node squads/ideation-to-docs-squad/scripts/push-miro.js --session ideation-2026-02-17
```

### Opção 3: Webhook (para automação)

Configure:
```bash
export AIOS_IDEATION_WEBHOOK_URL="<seu_webhook_url>"
export AIOS_IDEATION_WEBHOOK_TOKEN="<opcional>"
```

E rode:
```bash
node squads/ideation-to-docs-squad/scripts/push-webhook.js --session <session>
```

## O que é criado (Miro)

- **Board novo** com nome da sessão
- **Sticky notes** para cada ideia (organizadas em clusters por tema)
- **Conectores** (tema → ideias + relações do ideation.json)
- **Layout estilo FigJam** (clusters visuais, organizados)

## Payload enviado (Webhook)

- `ideation` (JSON)
- `files.boardSvg` (string)
- `files.excalidraw` (JSON)
- `files.documentMd`, `files.slidesMd`, `files.mindmapMd` (strings quando existirem)

