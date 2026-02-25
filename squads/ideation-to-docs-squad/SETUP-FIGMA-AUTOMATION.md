# Setup: Automação Figma (100% Automático)

Para que o board apareça **automaticamente no Figma** sem você fazer nada, você precisa configurar uma **automação** (Make/Zapier/n8n) que recebe o webhook e cria o board.

## Opção 1: Make.com (Recomendado - Mais Simples)

### Passo 1: Criar Cenário no Make

1. Acesse: https://www.make.com
2. Crie um novo cenário
3. Adicione o módulo **"Webhooks"** → **"Custom webhook"**
4. Copie a **URL do webhook** (ex.: `https://hook.make.com/abc123...`)

### Passo 2: Configurar o Cenário

**Trigger:**
- Webhook → Custom webhook
- Método: POST
- Copie a URL

**Ações:**
1. **"Figma"** → **"Create File"** (ou **"Import SVG"**)
   - Se usar "Import SVG", pegue o `payload.visual.svg` do webhook
   - Se usar "Create File", você precisará criar os nodes manualmente

2. **"HTTP"** → **"Make a request"** (opcional - para retornar o link)
   - URL: `https://hook.make.com/...` (webhook de resposta)
   - Método: POST
   - Body: `{"board_url": "{{figma_file_url}}"}`

### Passo 3: Configurar no Projeto

```bash
export FIGMA_WEBHOOK_URL="https://hook.make.com/abc123..."
```

### Passo 4: Testar

```bash
node squads/ideation-to-docs-squad/scripts/run-full-pipeline.js \
  --session test \
  --source ./minha-transcricao.md \
  --auto-push-figma
```

**O board aparece automaticamente no Figma!** 🎉

---

## Opção 2: Zapier

### Passo 1: Criar Zap

1. Acesse: https://zapier.com
2. Crie um novo Zap
3. Trigger: **"Webhooks by Zapier"** → **"Catch Hook"**
4. Copie a **Webhook URL**

### Passo 2: Configurar Ações

1. **"Figma"** → **"Create File"** ou **"Import SVG"**
2. Configure para usar o SVG do webhook

### Passo 3: Configurar no Projeto

```bash
export FIGMA_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/..."
```

---

## Opção 3: n8n (Self-hosted)

### Passo 1: Criar Workflow

1. Acesse seu n8n
2. Crie um novo workflow
3. Adicione **"Webhook"** node
4. Configure método POST
5. Copie a URL

### Passo 2: Adicionar Ações

1. **"Figma"** node → **"Create File"** ou processar SVG
2. **"HTTP Request"** node (opcional - para retornar link)

### Passo 3: Configurar

```bash
export FIGMA_WEBHOOK_URL="https://seu-n8n.com/webhook/..."
```

---

## Payload do Webhook

O webhook recebe:

```json
{
  "kind": "aios.ideation.figma.push",
  "version": "1.0",
  "sentAt": "2026-02-17T10:00:00Z",
  "session": "ideation-2026-02-17",
  "ideation": { /* ideation.json completo */ },
  "visual": {
    "svg": "<svg>...</svg>",
    "excalidraw": { /* JSON do Excalidraw */ }
  },
  "files": {
    "mindmap": "# Mindmap\n...",
    "document": "# Document\n...",
    "slides": "# Slides\n..."
  }
}
```

## Estrutura da Automação (Make.com Exemplo)

```
Webhook (Trigger)
  ↓
Parse JSON (extrair visual.svg)
  ↓
Figma: Import SVG (ou Create File + Create Nodes)
  ↓
HTTP: Return webhook (opcional - retornar link do board)
```

## Troubleshooting

**Webhook não recebe dados:**
- Verifique se a URL está correta
- Confirme que o método é POST
- Teste com `curl` ou Postman

**Figma não cria o board:**
- Verifique se o token do Figma está configurado na automação
- Confirme que o SVG está sendo enviado corretamente
- Use "Import SVG" em vez de "Create File" (mais simples)

**Board criado mas vazio:**
- Verifique se o SVG foi gerado corretamente
- Confirme que o `payload.visual.svg` não está vazio
- Teste importar o SVG manualmente primeiro

---

## Alternativa Rápida (Sem Automação)

Se não quiser configurar automação agora:

1. Rode o pipeline sem `--auto-push-figma`:
```bash
@ideation-orchestrator
*run-full-pipeline --session ideation-2026-02-17 --source ./minha-transcricao.md
```

2. Importe manualmente o SVG no Figma (1 clique):
   - Abra Figma
   - File → Import
   - Escolha `docs/ideation/ideation-2026-02-17/board.svg`

Depois você pode configurar a automação para ser 100% automático.
