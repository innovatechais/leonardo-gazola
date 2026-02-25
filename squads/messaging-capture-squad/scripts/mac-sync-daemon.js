/**
 * mac-sync-daemon.js — messaging-capture-squad
 * Roda LOCALMENTE no Mac (via launchd)
 * Lê a fila do canal Telegram e sincroniza pro Obsidian
 *
 * Execução: node mac-sync-daemon.js
 * Agendamento: launchd a cada 5 minutos (ver setup-guide)
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const https = require('https');
const path = require('path');
const fs = require('fs');

const { dispatch } = require('./dispatcher');

// ─── Config ──────────────────────────────────────────────────────────────────
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const QUEUE_CHANNEL_ID = process.env.TELEGRAM_QUEUE_CHANNEL_ID;
const STATE_FILE = path.join(__dirname, '../.sync-state.json');

if (!BOT_TOKEN || !QUEUE_CHANNEL_ID) {
  console.error('❌ Configure TELEGRAM_BOT_TOKEN e TELEGRAM_QUEUE_CHANNEL_ID no .env');
  process.exit(1);
}

// ─── Estado de sincronização ─────────────────────────────────────────────────
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {
    console.warn('⚠️  Estado corrompido, iniciando do zero');
  }
  return { lastProcessedMessageId: 0, processedCount: 0, lastSync: null };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Telegram API ─────────────────────────────────────────────────────────────
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
          else reject(new Error(`Telegram: ${parsed.description}`));
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

// ─── Parser de mensagens da fila ─────────────────────────────────────────────
function parseQueueMessage(text) {
  if (!text || !text.includes('🔵 AIOS_QUEUE')) return null;

  const match = text.match(/```json\n([\s\S]+?)\n```/);
  if (!match) return null;

  try {
    const data = JSON.parse(match[1]);
    if (data.processed) return null; // Já processado
    return data;
  } catch (e) {
    return null;
  }
}

// ─── Marcar mensagem como processada no canal ─────────────────────────────────
async function markAsProcessed(messageId, noteData, result) {
  const status = result.success ? '✅' : '❌';
  const noteId = result.id || 'erro';
  const updatedData = { ...noteData, processed: true, obsidianId: noteId };

  try {
    await telegramRequest('editMessageText', {
      chat_id: QUEUE_CHANNEL_ID,
      message_id: messageId,
      text: `${status} PROCESSADO\n\`\`\`json\n${JSON.stringify(updatedData, null, 2)}\n\`\`\``,
      parse_mode: 'Markdown',
    });
  } catch (e) {
    // editMessage pode falhar se mensagem for muito antiga (48h) — tudo bem
    console.warn(`⚠️  Não editou msg ${messageId}: ${e.message}`);
  }
}

// ─── Sincronização principal ──────────────────────────────────────────────────
async function sync() {
  const state = loadState();
  const startTime = Date.now();

  console.log(`\n🔄 [${new Date().toLocaleString('pt-BR')}] Sincronizando fila...`);
  console.log(`   Última mensagem processada: ${state.lastProcessedMessageId}`);

  let newNotes = 0;
  let errors = 0;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      // Buscar mensagens do canal (últimas 100)
      const history = await telegramRequest('getChatHistory', {
        chat_id: QUEUE_CHANNEL_ID,
        limit: 100,
        offset,
      }).catch(() => null); // getChatHistory não existe na Bot API — usar alternativa

      // A Bot API não tem getChatHistory direto para canais onde o bot é admin
      // Usamos getUpdates mas filtrando por channel_post
      break; // Sair do while, usar método alternativo abaixo
    } catch (e) {
      break;
    }
  }

  // Método correto: getUpdates com channel_post
  try {
    const updates = await telegramRequest('getUpdates', {
      offset: state.lastProcessedMessageId > 0 ? state.lastProcessedMessageId + 1 : undefined,
      limit: 100,
      allowed_updates: ['channel_post'],
    });

    const queueMessages = updates.filter(u =>
      u.channel_post &&
      String(u.channel_post.chat.id) === String(QUEUE_CHANNEL_ID) &&
      u.channel_post.text?.includes('🔵 AIOS_QUEUE')
    );

    if (queueMessages.length === 0) {
      console.log('   ✓ Nenhuma nota nova na fila');
    }

    for (const update of queueMessages) {
      const msg = update.channel_post;
      const noteData = parseQueueMessage(msg.text);

      if (!noteData) continue;

      console.log(`\n   📥 Processando: "${noteData.idea?.substring(0, 50)}..."`);
      console.log(`      Categoria: ${noteData.category} | Squad: ${noteData.squad}`);

      try {
        const result = dispatch(noteData);

        if (result.success) {
          console.log(`      ✅ Salvo no Obsidian: ${result.id}`);
          await markAsProcessed(msg.message_id, noteData, result);
          newNotes++;
        } else {
          console.error(`      ❌ Falhou: ${result.message}`);
          errors++;
        }
      } catch (e) {
        console.error(`      ❌ Erro: ${e.message}`);
        errors++;
      }

      // Atualizar offset
      if (update.update_id > state.lastProcessedMessageId) {
        state.lastProcessedMessageId = update.update_id;
      }
    }

    // Atualizar estado
    state.processedCount += newNotes;
    state.lastSync = new Date().toISOString();
    saveState(state);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n   📊 Resultado: ${newNotes} novas | ${errors} erros | ${elapsed}s`);
    console.log(`   📈 Total histórico: ${state.processedCount} notas sincronizadas\n`);

  } catch (e) {
    console.error('❌ Erro na sincronização:', e.message);
    process.exit(1);
  }
}

// ─── Start ────────────────────────────────────────────────────────────────────
sync().then(() => {
  console.log('✅ Sincronização concluída');
  process.exit(0);
}).catch(e => {
  console.error('💥 Erro fatal:', e);
  process.exit(1);
});
