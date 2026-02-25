#!/usr/bin/env node

/**
 * Archimedes Obsidian Sync Script
 * Handles note capture, indexing, movement, and archiving
 *
 * Usage:
 *   node sync-obsidian.js --action=capture --category=Trabalho --idea="..." [--context="..."] [--tags="..."]
 *   node sync-obsidian.js --action=sync --timeframe=1d
 *   node sync-obsidian.js --action=archive --note-id=nota-xxx
 *   node sync-obsidian.js --action=reactivate [--limit=5]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  VAULT_PATH: process.env.OBSIDIAN_VAULT_PATH || '/Users/leonardogazola/Library/Mobile Documents/iCloud~md~obsidian/Documents/Leonardo Gazola',
  ARCHIVE_ROOT: 'Archive',
  FOLDERS: {
    capture: '0-CAPTURE',
    inbox_3d: '1-INBOX-3D',
    inbox_7d: '2-INBOX-7D',
    archive: '3-ARCHIVE'
  },
  INDEX_FILE: '.archimedes-index.json',
  CONFIG_FILE: '.archimedes-config.yaml',
  MONITOR_INTERVAL_MS: 60000,
  REACTIVATION_THRESHOLD_DAYS: 10
};

// UTILITY: Parse command line args
function parseArgs(argv) {
  const args = {
    action: null,
    category: null,
    idea: null,
    context: null,
    tags: null,
    timeframe: '1d',
    noteId: null,
    limit: 3,
    targetCategory: null,
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      args[camelKey] = value || true;
    }
  }

  return args;
}

// UTILITY: Generate unique note ID
function generateNoteId() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = date.toISOString().slice(11, 16).replace(':', '');
  const random = crypto.randomBytes(3).toString('hex');
  return `nota-${dateStr}-${timeStr}-${random}`;
}

// UTILITY: Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// UTILITY: Parse YAML frontmatter
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const yamlStr = match[1];
  const body = match[2];

  // Simple YAML parser for our use case
  const data = {};
  yamlStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key.trim()) {
      data[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { data, content: body };
}

// UTILITY: Build YAML frontmatter
function buildFrontmatter(noteData) {
  const lines = [
    '---',
    `id: ${noteData.id}`,
    `title: ${noteData.title}`,
    `category: ${noteData.category}`,
    `date_captured: ${noteData.date_captured}`,
    `last_reviewed: ${noteData.last_reviewed || 'null'}`,
    `status: ${noteData.status}`,
    `relevance_score: ${noteData.relevance_score}`,
    `tags: ${JSON.stringify(noteData.tags)}`,
    `connections: ${JSON.stringify(noteData.connections)}`,
    '---'
  ];
  return lines.join('\n');
}

// INDEX: Load or create index
function loadIndex() {
  const indexPath = path.join(CONFIG.VAULT_PATH, CONFIG.INDEX_FILE);
  if (fs.existsSync(indexPath)) {
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }
  return {
    notes: [],
    archived: [],
    last_sync: new Date().toISOString(),
    total_notes: 0,
    by_category: {}
  };
}

// INDEX: Save index
function saveIndex(index) {
  const indexPath = path.join(CONFIG.VAULT_PATH, CONFIG.INDEX_FILE);
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
}

// ACTION: Capture Note
async function captureNote(args) {
  console.log('📝 Capturando bilhete...');

  const noteId = generateNoteId();
  const now = new Date().toISOString();
  const title = args.idea.substring(0, 60);
  const tags = args.tags ? args.tags.split(',').map(t => t.trim()) : [];

  const noteData = {
    id: noteId,
    title,
    category: args.category,
    date_captured: now,
    last_reviewed: null,
    status: 'inbox-0d',
    relevance_score: 5,
    tags,
    connections: [],
    content: args.idea,
    context: args.context || null
  };

  // Build file content
  const frontmatter = buildFrontmatter(noteData);
  const body = `
# ${title}

## 💡 Ideia Original
${args.idea}

${args.context ? `## 🔗 Contexto\n${args.context}` : ''}

---
**Capturado em:** ${new Date().toLocaleString('pt-BR')}
`;

  const fullContent = frontmatter + '\n' + body;

  // Determine filename
  const dateStr = now.slice(0, 10).replace(/-/g, '');
  const timeStr = now.slice(11, 16).replace(':', '');
  const filename = `${dateStr}-${timeStr}-${args.category}-${noteId.split('-').pop()}.md`;

  // Write to capture folder > category subfolder
  const captureDir = path.join(CONFIG.VAULT_PATH, CONFIG.ARCHIVE_ROOT, CONFIG.FOLDERS.capture);
  const categoryDir = path.join(captureDir, args.category);
  ensureDir(categoryDir);
  const filePath = path.join(categoryDir, filename);

  if (!args.dryRun) {
    fs.writeFileSync(filePath, fullContent);
  }

  // Update index
  const index = loadIndex();
  index.notes.push({
    id: noteId,
    title,
    category: args.category,
    date_captured: now,
    status: 'inbox-0d',
    file: `Archive/${CONFIG.FOLDERS.capture}/${args.category}/${filename}`
  });
  index.total_notes++;
  if (!index.by_category[args.category]) {
    index.by_category[args.category] = 0;
  }
  index.by_category[args.category]++;
  index.last_sync = new Date().toISOString();

  if (!args.dryRun) {
    saveIndex(index);
  }

  console.log(`✅ Bilhete capturado!`);
  console.log(`   ID: ${noteId}`);
  console.log(`   Categoria: ${args.category}`);
  console.log(`   Arquivo: ${filename}`);
  console.log(`   Status: inbox-0d (revisão em 3 dias)`);
}

// ACTION: Sync Timeframes
async function syncTimeframes() {
  console.log('🔄 Sincronizando timeframes...');

  const index = loadIndex();
  const now = new Date();
  const captureDir = path.join(CONFIG.VAULT_PATH, CONFIG.ARCHIVE_ROOT, CONFIG.FOLDERS.capture);
  const inbox3dDir = path.join(CONFIG.VAULT_PATH, CONFIG.ARCHIVE_ROOT, CONFIG.FOLDERS.inbox_3d);
  const inbox7dDir = path.join(CONFIG.VAULT_PATH, CONFIG.ARCHIVE_ROOT, CONFIG.FOLDERS.inbox_7d);

  ensureDir(inbox3dDir);
  ensureDir(inbox7dDir);

  index.notes.forEach(note => {
    const capturedDate = new Date(note.date_captured);
    const daysSince = (now - capturedDate) / (1000 * 60 * 60 * 24);

    let newStatus = note.status;
    let newFolder = CONFIG.FOLDERS.capture;
    let newFolderPath = captureDir;

    if (daysSince > 7) {
      newStatus = 'inbox-7d';
      newFolder = CONFIG.FOLDERS.inbox_7d;
      newFolderPath = inbox7dDir;
    } else if (daysSince > 3) {
      newStatus = 'inbox-3d';
      newFolder = CONFIG.FOLDERS.inbox_3d;
      newFolderPath = inbox3dDir;
    }

    if (newStatus !== note.status) {
      note.status = newStatus;

      // Extract filename from current file path
      const filename = note.file.split('/').pop();

      // Create category subfolder in new destination
      const newCategoryDir = path.join(newFolderPath, note.category);
      ensureDir(newCategoryDir);

      // Move file from old location to new location
      const oldFilePath = path.join(CONFIG.VAULT_PATH, note.file);
      const newFilePath = path.join(newCategoryDir, filename);

      try {
        if (fs.existsSync(oldFilePath)) {
          fs.renameSync(oldFilePath, newFilePath);
          note.file = `Archive/${newFolder}/${note.category}/${filename}`;
          console.log(`   📦 ${note.title} → ${newStatus}`);
        }
      } catch (error) {
        console.error(`   ⚠️  Erro ao mover ${note.title}: ${error.message}`);
      }
    }
  });

  index.last_sync = new Date().toISOString();
  saveIndex(index);

  console.log('✅ Sincronização completa!');
}

// ACTION: Reactivate Insights
async function reactivateInsights(args) {
  console.log(`🎯 Procurando insights dormentes (limite: ${args.limit})...`);

  const index = loadIndex();
  const now = new Date();
  const threshold = CONFIG.REACTIVATION_THRESHOLD_DAYS;

  const dormantNotes = index.notes.filter(note => {
    const reviewDate = note.last_reviewed ? new Date(note.last_reviewed) : new Date(note.date_captured);
    const daysSince = (now - reviewDate) / (1000 * 60 * 60 * 24);
    return daysSince >= threshold;
  });

  // Sort by relevance and time
  dormantNotes.sort((a, b) => {
    const aDays = (now - new Date(a.last_reviewed || a.date_captured)) / (1000 * 60 * 60 * 24);
    const bDays = (now - new Date(b.last_reviewed || b.date_captured)) / (1000 * 60 * 60 * 24);
    return (bDays * (b.relevance_score || 5)) - (aDays * (a.relevance_score || 5));
  });

  console.log(`\n🧠 Encontradas ${dormantNotes.length} notas dormentes\n`);
  console.log(`Mostrando top ${Math.min(args.limit, dormantNotes.length)}:\n`);

  dormantNotes.slice(0, args.limit).forEach((note, idx) => {
    const daysDormant = Math.round((now - new Date(note.last_reviewed || note.date_captured)) / (1000 * 60 * 60 * 24));
    console.log(`${idx + 1}. ⭐ ${note.title}`);
    console.log(`   Categoria: ${note.category}`);
    console.log(`   Dormindo há: ${daysDormant} dias`);
    console.log(`   Score: ${note.relevance_score}/10`);
    console.log(`   ID: ${note.id}\n`);
  });
}

// ACTION: Archive Note
async function archiveNote(args) {
  console.log(`📦 Arquivando nota ${args.noteId}...`);

  const index = loadIndex();
  const noteIdx = index.notes.findIndex(n => n.id === args.noteId);

  if (noteIdx === -1) {
    console.error('❌ Nota não encontrada!');
    return;
  }

  const note = index.notes[noteIdx];
  const targetCat = args.targetCategory || note.category;

  // Create archive directory with category
  const archiveDir = path.join(CONFIG.VAULT_PATH, CONFIG.ARCHIVE_ROOT, CONFIG.FOLDERS.archive, targetCat);
  ensureDir(archiveDir);

  // Extract filename from current file path
  const filename = note.file.split('/').pop();

  // Move file from inbox to archive
  const oldFilePath = path.join(CONFIG.VAULT_PATH, note.file);
  const newFilePath = path.join(archiveDir, filename);

  try {
    if (fs.existsSync(oldFilePath)) {
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`✅ Nota "${note.title}" arquivada em [${targetCat}]`);
      console.log(`   Status: permanente`);
      console.log(`   Arquivo: ${newFilePath}`);

      // Remove from notes, add to archived
      index.notes.splice(noteIdx, 1);
      index.archived.push({
        ...note,
        status: 'archived',
        date_archived: new Date().toISOString(),
        file: `Archive/${CONFIG.FOLDERS.archive}/${targetCat}/${filename}`
      });

      if (!args.dryRun) {
        saveIndex(index);
      }
    } else {
      console.error(`❌ Arquivo não encontrado: ${oldFilePath}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao arquivar nota: ${error.message}`);
  }
}

// MAIN
async function main() {
  const args = parseArgs(process.argv);

  if (!args.action) {
    console.log(`
Archimedes Obsidian Sync — Usage:

  --action=capture    Capturar novo bilhete
  --action=sync       Sincronizar timeframes
  --action=reactivate Procurar insights dormentes
  --action=archive    Arquivar nota para permanente

Examples:
  node sync-obsidian.js --action=capture --category=Trabalho --idea="Minha ideia aqui"
  node sync-obsidian.js --action=reactivate --limit=5
  node sync-obsidian.js --action=archive --note-id=nota-xxx
    `);
    return;
  }

  try {
    switch (args.action) {
      case 'capture':
        await captureNote(args);
        break;
      case 'sync':
        await syncTimeframes();
        break;
      case 'reactivate':
        await reactivateInsights(args);
        break;
      case 'archive':
        await archiveNote(args);
        break;
      default:
        console.error(`❌ Ação desconhecida: ${args.action}`);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
