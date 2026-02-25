# Setup Rápido: Integração Miro

⚠️ **ATENÇÃO**: A integração direta com Miro API requer **OAuth 2.0**, que é mais complexa. 

**Alternativa mais simples**: Use o export visual (`board.excalidraw.json` ou `board.svg`) e importe manualmente no Miro, ou use o webhook para automação.

## Opção 1: Import Manual (Mais Simples - Recomendado)

1. Gere o board visual:
```bash
@ideation-orchestrator
*export-visual --session ideation-2026-02-17 --format both --layout clusters
```

2. Abra o Miro e importe:
   - Vá em **"More tools"** → **"Import"**
   - Escolha o arquivo `board.svg` ou `board.excalidraw.json`
   - O board aparece pronto para editar!

## Opção 2: API Miro (OAuth - Mais Complexo)

A API do Miro usa **OAuth 2.0**, não tokens simples. Processo:

1. Acesse: https://developers.miro.com/
2. Vá em **"Get started"** → **"Build an app"**
3. Crie um app OAuth (requer configuração de redirect URLs)
4. Configure permissões: `boards:write`, `boards:read`
5. Use o fluxo OAuth para obter access token

**Nota**: Isso requer desenvolvimento de um servidor OAuth intermediário, o que é complexo para uso simples.

## Opção 3: Webhook (Para Automação)

Se você tem Make/Zapier/n8n ou um backend próprio:

1. Configure o webhook:
```bash
export AIOS_IDEATION_WEBHOOK_URL="<seu_webhook_url>"
```

2. Rode:
```bash
node squads/ideation-to-docs-squad/scripts/push-webhook.js --session ideation-2026-02-17
```

Sua automação recebe os dados e cria o board no Miro.

---

## Recomendação

**Use a Opção 1 (Import Manual)** — é mais simples, funciona imediatamente e você tem controle total sobre o layout final no Miro.

O export gera:
- `board.excalidraw.json` (editável no Excalidraw)
- `board.svg` (importável no Miro/Figma)

Ambos têm o layout de clusters que você pediu, prontos para importar!
