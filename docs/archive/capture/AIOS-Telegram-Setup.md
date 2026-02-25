# AIOS — Setup Telegram Bot (messaging-capture-squad)

> **O que é:** Bot Telegram 24/7 que captura suas mensagens e áudios e salva automaticamente no Obsidian via Archimedes.
> **De onde veio:** Criado por Orion (aios-master) como parte do Synkra AIOS. Código em `/Users/leonardogazola/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/`

---

## Arquitetura

```
Você (celular Telegram)
        ↓
   Bot Hermes (Railway — 24/7)
        ↓ áudio? → Groq Whisper (transcrição grátis)
        ↓
  Canal privado Telegram (fila de mensagens)
        ↓
  Mac sync daemon (a cada 5 min quando Mac ligado)
        ↓
  Archimedes → Obsidian ✅
```

---

## PASSO 1 — Criar o Bot no Telegram (2 min)

1. Abra o Telegram e procure por **@BotFather**
2. Envie `/newbot`
3. Escolha um nome: ex. `Hermes AIOS`
4. Escolha um username: ex. `hermes_aios_bot`
5. Copie o **token** que ele te dá (ex: `7412345678:AAFxxx...`)
6. Guarde como `TELEGRAM_BOT_TOKEN`

---

## PASSO 2 — Descobrir seu User ID (1 min)

1. No Telegram, procure **@userinfobot**
2. Mande qualquer mensagem
3. Ele responde com seu ID (ex: `123456789`)
4. Guarde como `TELEGRAM_MY_USER_ID`

---

## PASSO 3 — Criar canal privado (fila) (2 min)

1. No Telegram: **Nova conversa → Novo Canal**
2. Nome: `AIOS Queue` (privado)
3. Adicione o seu bot como **administrador** com permissão de postar
4. Mande qualquer mensagem no canal
5. Acesse: `https://api.telegram.org/bot{SEU_TOKEN}/getUpdates`
6. Procure o campo `"chat":{"id":` — vai ser um número negativo tipo `-1001234567890`
7. Guarde como `TELEGRAM_QUEUE_CHANNEL_ID`

---

## PASSO 4 — Criar conta Groq (5 min, gratuito)

1. Acesse: https://console.groq.com
2. Cadastre-se com Google/GitHub
3. Vá em **API Keys → Create API Key**
4. Copie a chave (ex: `gsk_xxx...`)
5. Guarde como `GROQ_API_KEY`

---

## PASSO 5 — Configurar o .env

```bash
cd ~/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/
cp .env.example .env
nano .env   # ou abra no VSCode/editor
```

Preencha as 4 variáveis:
```
TELEGRAM_BOT_TOKEN=7412345678:AAFxxx...
TELEGRAM_MY_USER_ID=123456789
TELEGRAM_QUEUE_CHANNEL_ID=-1001234567890
GROQ_API_KEY=gsk_xxx...
```

---

## PASSO 6 — Deploy no Railway (10 min, gratuito)

### 6.1 Criar conta Railway
1. Acesse: https://railway.app
2. Login com GitHub

### 6.2 Criar repositório privado no GitHub
```bash
cd ~/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/
git init
git add .
git commit -m "feat: messaging-capture-squad initial"
# Crie um repo privado no GitHub e suba:
git remote add origin git@github.com:SEU_USER/messaging-capture-squad.git
git push -u origin main
```

### 6.3 Deploy no Railway
1. No Railway: **New Project → Deploy from GitHub repo**
2. Selecione o repo `messaging-capture-squad`
3. Vá em **Variables** e adicione todas as variáveis do `.env`:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_MY_USER_ID`
   - `TELEGRAM_QUEUE_CHANNEL_ID`
   - `GROQ_API_KEY`
4. Railway faz o deploy automaticamente
5. Veja os logs — deve aparecer: `✅ Bot conectado: @hermes_aios_bot`

---

## PASSO 7 — Instalar daemon no Mac (sync local)

```bash
# Instalar o launchd plist
cp ~/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/com.aios.messaging-sync.plist \
   ~/Library/LaunchAgents/

# Ativar (roda agora e a cada 5 min)
launchctl load ~/Library/LaunchAgents/com.aios.messaging-sync.plist

# Verificar se está rodando
launchctl list | grep aios
```

Para ver o log:
```bash
tail -f ~/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/sync.log
```

---

## Como usar no dia a dia

### Texto simples (vai pro Estudos por padrão)
```
Pensei numa forma melhor de estruturar as reuniões semanais
```

### Com #tag para categorizar
```
#trabalho Reunião com cliente X decidiu usar o plano enterprise
#pessoal Marcar consulta médica semana que vem
#ideia Aplicativo de controle de hábitos com IA
#reuniao Pedro confirmou prazo para dia 15
#livro Escrever sobre produtividade com IA
```

### Áudio
Manda um áudio de voz direto — o bot transcreve e salva automaticamente!

### Confirmação que você vai receber
```
✅ Capturado!
📂 Categoria: `Trabalho` #trabalho
💡 `Reunião com cliente X decidiu usar o plano enterprise`
_Será salvo no Obsidian na próxima sincronização_
```

---

## Comandos do bot

| Comando | O que faz |
|---------|-----------|
| `/start` ou `/help` | Lista todas as tags e instruções |
| `/status` | Confirma que o bot está online |
| Qualquer texto | Captura como nota |
| Qualquer áudio de voz | Transcreve e captura |

---

## Onde as notas ficam no Obsidian

```
Obsidian/
└── Archive/
    └── 0-CAPTURE/
        └── {Categoria}/
            └── {data}-{categoria}-{id}.md  ← aparece aqui primeiro
```

Depois o Archimedes move pelas pastas conforme o tempo (3d → 7d → 3-ARCHIVE).

---

## Troubleshooting

**Bot não responde:**
- Verifique os logs no Railway
- Confirme que `TELEGRAM_MY_USER_ID` está correto

**Áudio não transcreve:**
- Verifique `GROQ_API_KEY`
- Áudios > 25MB não são suportados

**Notas não aparecem no Obsidian:**
- Execute manualmente: `node ~/projetos-aios/meu-primeiro-projeto/squads/messaging-capture-squad/scripts/mac-sync-daemon.js`
- Verifique o log: `sync.log` na pasta da squad

**Daemon não roda:**
```bash
launchctl unload ~/Library/LaunchAgents/com.aios.messaging-sync.plist
launchctl load ~/Library/LaunchAgents/com.aios.messaging-sync.plist
```

---

*Gerado por Orion (aios-master) — Synkra AIOS v2.0 — 23/02/2026*
*Código: `squads/messaging-capture-squad/`*
