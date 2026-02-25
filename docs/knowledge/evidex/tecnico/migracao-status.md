# Evidex — Status da Migração N8N → Código

> Última atualização: 18/02/2026
> Conversa de referência: [Migração Evidex N8N e MCPs](f1519a83-6b06-4926-9ec2-c03a868732dd)

---

## O que é isso

Migração do workflow N8N `[PROD] Arilu-canhotos-LEITURA e VALIDAÇÃO` para código Node.js puro, rodando direto na VPS com PM2.

**Produto:** Evidex — automação de leitura e validação de canhotos de entrega via WhatsApp para transportadoras.

**Fluxo atual (N8N):**
```
Motorista (WhatsApp) → iPro → N8N → Gemini (lê canhoto) → N8N → motorista confirma → Supabase
```

**Fluxo após migração:**
```
Motorista (WhatsApp) → Meta → Node.js → Gemini (lê canhoto) → motorista confirma → Supabase
```

---

## O que foi construído

### 1. Meta Receptor (`workers/meta-receptor/`)
**O quê:** Ponte temporária. Recebe webhook da Meta e encaminha para o iPro.
**Para quê:** Manter o N8N funcionando durante a migração.
**Status:** ✅ Pronto para subir na VPS

Arquivos:
- `index.js` — servidor HTTP (sem dependências)
- `deploy.sh` — script de deploy com PM2
- `.env.example`

Fluxo:
```
Meta → [meta-receptor:4000] → iPro → N8N (continua igual)
```

---

### 2. Evidex Automação (`workers/evidex/`)
**O quê:** Substituto completo do N8N. Processa canhotos end-to-end.
**Status:** 🟡 Aguardando estrutura do Supabase (Arthur) e chave OpenAI

Arquivos:
```
workers/evidex/
├── webhook-receiver.js     ← entrada HTTP da Meta
├── orchestrator.js         ← fluxo principal de decisão
├── session-manager.js      ← sessões Redis (placa 15 dias, estado 2h)
├── gemini-reader.js        ← leitura de canhoto via Vertex AI
├── meta-messenger.js       ← envio de mensagens via Meta Graph API
├── message-router.js       ← processa texto/imagem/áudio
├── supabase-client.js      ← queries no banco
├── telegram-debug.js       ← espelho de mensagens para teste
├── start-test.sh           ← sobe tudo para teste local
├── .env                    ← variáveis (preenchidas parcialmente)
├── agents/
│   ├── placa-agent.js      ← detecta placa no texto (GPT-4o Mini)
│   ├── quality-agent.js    ← "precisa corrigir?" (GPT-4o Mini)
│   └── correction-agent.js ← processa correção do motorista
└── prompts/
    └── canhoto-system-prompt.js  ← prompt Gemini (NÃO ALTERAR)
```

#### Fluxo da automação

```
1. Motorista manda mensagem (texto/imagem/áudio)
         ↓
2. webhook-receiver recebe da Meta
         ↓
3. [telegram-debug espelha no Telegram — modo teste]
         ↓
4. orchestrator decide o que fazer:
   
   SEM PLACA NA SESSÃO:
   → placa-agent detecta placa no texto
   → valida placa no Supabase
   → salva placa na sessão (15 dias)
   → pede foto do canhoto
   
   COM PLACA, SEM CANHOTO:
   → gemini-reader lê a imagem (Vertex AI)
   → valida pedido no Supabase
   → salva estado do canhoto na sessão
   → envia confirmação dos dados ao motorista
   
   COM CANHOTO PENDENTE:
   → quality-agent verifica se motorista quer corrigir
   → Se OK: salva no Supabase, encerra sessão
   → Se corrigir: correction-agent aplica mudança, reenvia confirmação
```

#### Decisões técnicas importantes

| Decisão | Motivo |
|---|---|
| Gemini 3 Flash Preview via Vertex AI | Preservado do N8N — acurácia alta, não mexer |
| System prompt em arquivo separado | Versionamento — qualquer mudança fica rastreada |
| Sem escalação humana | Motorista + automação resolvem, sem humano no loop |
| phone_number_id como idTransportadora | Cada número WhatsApp = uma transportadora |
| Credenciais Vertex AI no Supabase | Cada transportadora tem sua própria conta GCP |

---

## Configurações do Telegram (teste)

| Item | Valor |
|---|---|
| Bot | @Evidex_bot |
| Token | `8279351483:AAFsYArhSae4vAJFeiJUnV2i6Lj1WElklgA` |
| Chat ID (Leonardo) | `5799056054` |

> ⚠️ Token público — considere revogar e gerar novo em produção via @BotFather

---

## Variáveis do .env já preenchidas

```env
# Telegram
TELEGRAM_DEBUG=true
TELEGRAM_BOT_TOKEN=8279351483:AAFsYArhSae4vAJFeiJUnV2i6Lj1WElklgA
TELEGRAM_CHAT_ID=5799056054

# Meta
META_WABA_TOKEN=EAAYV8BYHX3AB...  ← preenchido
META_PHONE_NUMBER_ID=753324867863667  ← preenchido

# Webhook
PORT=3000
WEBHOOK_SECRET=evidex2026
MIRROR_ONLY=true  ← mudar para false quando pronto para fluxo completo
```

## Variáveis que ainda faltam

```env
REDIS_URL=redis://localhost:6379      ← instalar Redis na VPS
SUPABASE_URL=                         ← Arthur
SUPABASE_ANON_KEY=                    ← Arthur
OPENAI_API_KEY=                       ← Leonardo (platform.openai.com)
```

---

## O que falta para completar a migração

### Bloqueadores (aguardando)

**1. Estrutura do Supabase (Arthur)**
Pedir para ele rodar no SQL Editor do Supabase:
```sql
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
```
Preciso dos nomes exatos das colunas das tabelas de transportadoras, canhotos/pedidos.

**2. Chave OpenAI (Leonardo)**
Gerar em: https://platform.openai.com/api-keys
Colocar no `.env`: `OPENAI_API_KEY=sk-...`

### Após receber o Supabase

1. Ajustar `supabase-client.js` com nomes reais de colunas
2. Instalar Redis na VPS (`sudo apt install redis-server -y`)
3. Mudar `MIRROR_ONLY=false` no `.env`
4. Testar fluxo completo: mandar placa → mandar foto de canhoto → confirmar dados

---

## MCPs configurados no AIOS

Arquivo: `.cursor/mcp.json`

| MCP | Função |
|---|---|
| `playwright` | Automação de browser |
| `filesystem` | Projeto + pastas do Obsidian |
| `fetch` | Chamadas HTTP genéricas |
| `github` | Operações Git |
| `supabase` | Banco de dados |
| `notion` | Páginas e databases |
| `memory` | Memória persistente dos agentes |

**Obsidian conectado** (via filesystem MCP):
- `Innovatech`
- `Xcale`
- `Evidex`
- `Captura`

---

## Deploy — Ordem correta

### Fase 1 (agora) — Meta Receptor na VPS nova
```bash
# Na VPS nova
scp -r workers/meta-receptor usuario@ip:/home/usuario/meta-receptor
cd meta-receptor
bash deploy.sh
# Configurar webhook na Meta para apontar para essa VPS
```

### Fase 2 (após testes) — Evidex Automação
```bash
# Na mesma VPS ou em outra
sudo apt install redis-server -y
cd workers/evidex
npm install
# Preencher .env completo
pm2 start webhook-receiver.js --name evidex
pm2 save && pm2 startup
# Trocar webhook da Meta para essa VPS
# Desligar Meta Receptor
```

---

## Contatos do projeto

- **Leonardo** — produto/negócio
- **Arthur** — infra, VPS, banco de dados (Supabase), N8N atual

---

*Documentação gerada pelo Orion (AIOS Master) em 18/02/2026*
