---
task: Run Full Autonomous Pipeline
responsavel: "@ideation-orchestrator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - session: ID da sessão
  - source: caminho do arquivo de transcrição (.md/.txt)
  - title: título opcional
  - auto-push-figma: se true, envia para Figma automaticamente
  - figma-webhook: URL do webhook para automação Figma (opcional se usar env FIGMA_WEBHOOK_URL)
Saida: |
  - todos os outputs em docs/ideation/<session>/
  - figma_board_url: link do board criado no Figma (se auto-push-figma=true)
Checklist:
  - "[ ] Confirmar session, source e se quer push automático no Figma"
  - "[ ] Executar *ingest-transcript"
  - "[ ] Executar *extract-ideas"
  - "[ ] Executar *generate-mindmap"
  - "[ ] Executar *export-visual (SVG + Excalidraw)"
  - "[ ] Executar *draft-document"
  - "[ ] Executar *prepare-presentation"
  - "[ ] Executar *review-output"
  - "[ ] Se auto-push-figma: enviar para webhook/automação que cria no Figma"
  - "[ ] Reportar todos os outputs gerados e link do Figma (se aplicável)"
---

# *run-full-pipeline — Pipeline Autônomo Completo

## Para que serve

Executa **todo o pipeline automaticamente** a partir de uma transcrição:
1. Ingest transcript
2. Extract ideas
3. Generate mindmap
4. Export visual (SVG + Excalidraw)
5. Draft document
6. Prepare presentation
7. Review output
8. **Push para Figma automaticamente** (se configurado)

**100% autônomo** — você só fornece a transcrição e recebe tudo pronto, incluindo o board no Figma.

## Elicitação

```text
? ID da sessão (session):
? Caminho do arquivo de transcrição (source):
? Título (opcional):
? Enviar automaticamente para Figma?
  1) Sim (requer webhook configurado)
  2) Não (só gerar os arquivos)
? Se sim: URL do webhook Figma (ou configure FIGMA_WEBHOOK_URL):
```

## Execução (CLI)

### Opção 1: Via Agente (Recomendado)

```text
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md --auto-push-figma
```

### Opção 2: Via Script Direto

```bash
node squads/ideation-to-docs-squad/scripts/run-full-pipeline.js \
  --session ideation-2026-02-17 \
  --source ./minha-transcricao.md \
  --auto-push-figma \
  --figma-webhook "<seu_webhook_url>"
```

Ou configure a variável de ambiente:
```bash
export FIGMA_WEBHOOK_URL="<seu_webhook_url>"
node squads/ideation-to-docs-squad/scripts/run-full-pipeline.js \
  --session ideation-2026-02-17 \
  --source ./minha-transcricao.md \
  --auto-push-figma
```

## Outputs Gerados

Todos os arquivos em `docs/ideation/<session>/`:

- ✅ `transcript.md` (transcrição normalizada)
- ✅ `ideation.json` (fonte de verdade, dados estruturados)
- ✅ `mindmap.md` (mapa mental Mermaid)
- ✅ `board.svg` (visual para importar no Figma)
- ✅ `board.excalidraw.json` (canvas editável)
- ✅ `document.md` (documento estruturado)
- ✅ `slides.md` (outline de apresentação)

## Push Automático para Figma

Se `--auto-push-figma` estiver ativo, o script envia um webhook com:
- `ideation.json` (dados)
- `board.svg` (visual)
- `board.excalidraw.json` (editável)
- `document.md`, `slides.md`, `mindmap.md` (textos)

**Sua automação** (Make/Zapier/n8n) recebe esse webhook e:
1. Cria um board no Figma
2. Importa o SVG ou cria os nodes programaticamente
3. Retorna o link do board

Veja `SETUP-FIGMA-AUTOMATION.md` para configurar a automação.

## Exemplo de Uso Completo

```bash
# 1. Configure o webhook (uma vez)
export FIGMA_WEBHOOK_URL="https://hook.make.com/..."

# 2. Rode o pipeline
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./brainstorm.md --auto-push-figma

# 3. Aguarde alguns segundos...

# 4. Receba:
#    - Todos os arquivos em docs/ideation/ideation-2026-02-17/
#    - Link do board no Figma (se automação configurada)
```

## Próximos Passos

Após o pipeline:
- Revise os outputs em `docs/ideation/<session>/`
- Edite o board no Figma (se foi criado automaticamente)
- Use `ideation.json` para gerar outros documentos
- Compartilhe o board do Figma com sua equipe
