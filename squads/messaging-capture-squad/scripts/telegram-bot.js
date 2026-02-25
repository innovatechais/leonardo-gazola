/**
 * telegram-bot.js — messaging-capture-squad
 * Bot Telegram 24/7 (roda no Railway)
 *
 * Fluxo:
 *   1. Recebe mensagem/áudio do usuário
 *   2. Se áudio → transcreve via Groq Whisper
 *   3. Roteia pela #tag
 *   4. Posta na fila (canal privado Telegram)
 *   5. Confirma para o usuário
 *
 * O mac-sync-daemon.js lê a fila e sincroniza pro Obsidian.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { transcribeAudio, ensureAudioCompatible } = require('./audio-transcriber');
const { routeMessage, extractContext } = require('./message-router');

// ─── Config ──────────────────────────────────────────────────────────────────
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const MY_USER_ID = parseInt(process.env.TELEGRAM_MY_USER_ID, 10);
const QUEUE_CHANNEL_ID = process.env.TELEGRAM_QUEUE_CHANNEL_ID;
const POLL_INTERVAL = 1500; // ms entre polls

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN não configurado');
  process.exit(1);
}
if (!MY_USER_ID) {
  console.error('❌ TELEGRAM_MY_USER_ID não configurado');
  process.exit(1);
}
if (!QUEUE_CHANNEL_ID) {
  console.error('❌ TELEGRAM_QUEUE_CHANNEL_ID não configurado');
  process.exit(1);
}

// ─── Telegram API helpers ────────────────────────────────────────────────────
function telegramRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(params);
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.ok) resolve(parsed.result);
          else reject(new Error(`Telegram API: ${parsed.description}`));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sendMessage(chatId, text, options = {}) {
  return telegramRequest('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
    ...options,
  });
}

async function downloadFile(fileId) {
  const file = await telegramRequest('getFile', { file_id: fileId });
  const filePath = file.file_path;
  const ext = path.extname(filePath) || '.oga';
  const tmpPath = path.join(os.tmpdir(), `tg-audio-${Date.now()}${ext}`);

  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    const fileStream = fs.createWriteStream(tmpPath);

    https.get(url, (res) => {
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(tmpPath);
      });
    }).on('error', (err) => {
      fs.unlink(tmpPath, () => {});
      reject(err);
    });
  });
}

// ─── Fila (canal privado Telegram) ──────────────────────────────────────────
/**
 * Posta nota na fila do canal privado
 * Formato especial para o mac-sync-daemon identificar
 */
async function postToQueue(noteData) {
  const payload = JSON.stringify(noteData);
  const message = `🔵 AIOS_QUEUE\n\`\`\`json\n${payload}\n\`\`\``;

  try {
    await sendMessage(QUEUE_CHANNEL_ID, message);
    return true;
  } catch (e) {
    console.error('❌ Erro ao postar na fila:', e.message);
    return false;
  }
}

// ─── Processamento de mensagens ──────────────────────────────────────────────
async function processMessage(msg) {
  const userId = msg.from?.id;
  const chatId = msg.chat.id;

  // Segurança: só responde ao dono
  if (userId !== MY_USER_ID) {
    console.log(`⛔ Mensagem ignorada de user ${userId}`);
    return;
  }

  let text = null;
  let isAudio = false;
  let tmpAudioPath = null;

  try {
    // ── Texto ──
    if (msg.text) {
      text = msg.text.trim();

      // Comandos especiais
      if (text === '/start' || text === '/help') {
        await sendMessage(chatId,
          `👋 *Hermes aqui!* Seu capturador de ideias.\n\n` +
          `📝 *Como usar:*\n` +
          `Mande texto ou áudio — eu salvo no Obsidian!\n\n` +
          `🏷️ *Tags disponíveis:*\n` +
          `\`#nota\` → Estudos (padrão)\n` +
          `\`#trabalho\` → Trabalho\n` +
          `\`#pessoal\` → Pessoal\n` +
          `\`#ideia\` → Estudos\n` +
          `\`#livro\` → Livros\n` +
          `\`#aula\` → Aulas\n` +
          `\`#lazer\` → Lazer\n` +
          `\`#reuniao\` → Trabalho\n\n` +
          `*Exemplo:*\n\`#trabalho Reunião com cliente X amanhã\`\n\n` +
          `🎙️ *Áudio:* Manda direto, eu transcrevo!`
        );
        return;
      }

      if (text === '/status') {
        await sendMessage(chatId, `✅ Bot online e funcionando!\n⏰ ${new Date().toLocaleString('pt-BR')}`);
        return;
      }
    }

    // ── Áudio / Voice ──
    if (msg.voice || msg.audio) {
      const fileId = (msg.voice || msg.audio).file_id;
      await sendMessage(chatId, '🎙️ Transcrevendo áudio...');

      try {
        tmpAudioPath = await downloadFile(fileId);
        const compatiblePath = ensureAudioCompatible(tmpAudioPath);
        text = await transcribeAudio(compatiblePath);

        if (!text || text.length < 3) {
          await sendMessage(chatId, '⚠️ Não consegui entender o áudio. Tente novamente.');
          return;
        }

        isAudio = true;
      } catch (e) {
        await sendMessage(chatId, `❌ Erro na transcrição: ${e.message}`);
        return;
      }
    }

    // ── Sem conteúdo suportado ──
    if (!text) {
      await sendMessage(chatId,
        '⚠️ Tipo de mensagem não suportado.\nMande *texto* ou *áudio* (voz ou arquivo).'
      );
      return;
    }

    // ── Rotear e preparar nota ──
    const { squad, category, action, cleanText, tag } = routeMessage(text);
    const context = extractContext(cleanText);
    const idea = cleanText.split('\n')[0].trim();

    const noteData = {
      id: `pending-${Date.now()}`,
      timestamp: new Date().toISOString(),
      squad,
      action,
      category,
      idea,
      context: context || (isAudio ? `[transcrição de áudio] ${text}` : null),
      tags: tag ? [tag.replace('#', '')] : [],
      source: isAudio ? 'telegram-audio' : 'telegram-text',
      processed: false,
    };

    // ── Postar na fila ──
    const queued = await postToQueue(noteData);

    if (queued) {
      const tagLabel = tag ? ` ${tag}` : '';
      await sendMessage(chatId,
        `✅ *Capturado!*\n\n` +
        `📂 Categoria: \`${category}\`${tagLabel}\n` +
        `💡 \`${idea.substring(0, 80)}${idea.length > 80 ? '...' : ''}\`\n\n` +
        `_Será salvo no Obsidian na próxima sincronização_`
      );
    } else {
      await sendMessage(chatId, '⚠️ Erro ao enfileirar. Tente novamente.');
    }

  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
    await sendMessage(chatId, `❌ Erro interno: ${error.message}`).catch(() => {});
  } finally {
    // Limpar arquivo de áudio temporário
    if (tmpAudioPath && fs.existsSync(tmpAudioPath)) {
      fs.unlinkSync(tmpAudioPath);
    }
  }
}

// ─── Polling loop ─────────────────────────────────────────────────────────────
let lastUpdateId = 0;

async function poll() {
  try {
    const updates = await telegramRequest('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 30,
      allowed_updates: ['message'],
    });

    for (const update of updates) {
      lastUpdateId = update.update_id;
      if (update.message) {
        await processMessage(update.message);
      }
    }
  } catch (e) {
    if (!e.message?.includes('ETIMEOUT') && !e.message?.includes('timeout')) {
      console.error('⚠️  Poll error:', e.message);
    }
  }
}

// ─── Health check server (Railway precisa de uma porta aberta) ───────────────
function startHealthServer() {
  const port = process.env.PORT || 3000;
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', bot: 'hermes', uptime: process.uptime() }));
  }).listen(port, () => {
    console.log(`🌐 Health check: http://localhost:${port}`);
  });
}

// ─── Start ────────────────────────────────────────────────────────────────────
async function start() {
  console.log('🚀 Hermes (messaging-capture-squad) iniciando...');

  // Verificar conexão com Telegram
  try {
    const me = await telegramRequest('getMe');
    console.log(`✅ Bot conectado: @${me.username}`);
  } catch (e) {
    console.error('❌ Falha ao conectar com Telegram:', e.message);
    process.exit(1);
  }

  startHealthServer();

  console.log('👂 Aguardando mensagens...');
  console.log(`🔒 Autorizado apenas para user ID: ${MY_USER_ID}`);
  console.log(`📬 Fila: canal ${QUEUE_CHANNEL_ID}`);

  // Loop de polling
  const loop = async () => {
    await poll();
    setTimeout(loop, POLL_INTERVAL);
  };

  loop();
}

process.on('SIGTERM', () => {
  console.log('👋 Hermes encerrando...');
  process.exit(0);
});

start().catch(e => {
  console.error('💥 Erro fatal:', e);
  process.exit(1);
});
