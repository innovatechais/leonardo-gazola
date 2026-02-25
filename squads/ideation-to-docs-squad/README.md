# ideation-to-docs-squad

Squad para transformar uma **transcrição** (brainstorm, reunião, voice note) em:

- **dados estruturados** (`ideation.json`) para reuso
- **mapa mental** (Mermaid)
- **documento final** (resumo estruturado / brief / PRD-lite)
- **outline de apresentação** (slides)

## Como usar (100% Autônomo - Recomendado!)

**Um único comando gera tudo automaticamente:**

```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md
```

**Depois, importe o SVG no Figma (1 clique):**
- Abra o Figma
- File → New → FigJam
- File → Import
- Escolha `docs/ideation/ideation-2026-02-17/board.svg`
- Pronto! 🎉

**✅ Suas credenciais Figma já estão configuradas!**
- Client ID e Secret já salvos
- Veja: `CONFIGURAR-FIGMA.md` para obter Access Token (opcional)

**Pronto!** O agente executa tudo automaticamente:
- ✅ Ingest transcript
- ✅ Extract ideas
- ✅ Generate mindmap
- ✅ Export visual (SVG + Excalidraw)
- ✅ Draft document
- ✅ Prepare presentation
- ✅ Review output
- ✅ **Push para Figma automaticamente** (se webhook configurado)

---

## Como usar (Passo a passo - se preferir)

1) Coloque sua transcrição em um arquivo `.md` ou `.txt` (ex.: `./minha-transcricao.md`).

2) Ative o agente do squad:

```text
@ideation-orchestrator
```

3) Rode o pipeline (passo a passo):

```text
*ingest-transcript --session ideation-2026-02-17 --source ./minha-transcricao.md
*extract-ideas --session ideation-2026-02-17
*generate-mindmap --session ideation-2026-02-17
*export-visual --session ideation-2026-02-17 --format both --layout clusters
*draft-document --session ideation-2026-02-17 --doc brief
*prepare-presentation --session ideation-2026-02-17 --format outline
*review-output --session ideation-2026-02-17
```

## Outputs

Por padrão, tudo vai para:

```text
docs/ideation/<session>/
├── transcript.md
├── ideation.json
├── mindmap.md
├── board.excalidraw.json
├── board.svg
├── document.md
└── slides.md
```

## Validação do squad

```text
@squad-creator
*validate-squad ideation-to-docs-squad
```

## Como usar no Miro/Figma

### Opção 1: Import Manual (Mais Simples — Recomendado!)

**1. Gere o board visual:**
```text
@ideation-orchestrator
*export-visual --session ideation-2026-02-17 --format both --layout clusters
```

**2. Importe no Miro:**
- Abra o Miro
- Vá em **"More tools"** → **"Import"**
- Escolha o arquivo `docs/ideation/ideation-2026-02-17/board.svg`
- Ou use `board.excalidraw.json` (importa no Excalidraw primeiro, depois exporta para Miro)

**Pronto!** O board aparece com clusters organizados, pronto para editar. 🎉

### Opção 2: API Miro (OAuth — Mais Complexo)

A API do Miro requer **OAuth 2.0**, não tokens simples. Veja `SETUP-MIRO.md` para detalhes.

### Opção 3: Webhook (Para Automação)

Configure:
```bash
export AIOS_IDEATION_WEBHOOK_URL="<webhook_url>"
export AIOS_IDEATION_WEBHOOK_TOKEN="<opcional>"
```

E rode:
```bash
node squads/ideation-to-docs-squad/scripts/push-webhook.js --session ideation-2026-02-17
```

Esse webhook recebe `ideation.json` + `board.svg` + `board.excalidraw.json` + docs e
cria/atualiza o board no Figma/FigJam conforme sua automação.

