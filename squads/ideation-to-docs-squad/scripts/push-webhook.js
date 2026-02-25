#!/usr/bin/env node
/**
 * Push ideation outputs to a webhook (Make/Zapier/n8n/custom backend)
 *
 * This enables "automatic appearance" in Miro/Figma via your automation.
 * No external dependencies (Node 18+ / 22+ recommended).
 */

'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {
    session: null,
    url: process.env.AIOS_IDEATION_WEBHOOK_URL || null,
    token: process.env.AIOS_IDEATION_WEBHOOK_TOKEN || null,
    root: process.cwd(),
    timeoutMs: 20000,
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--url') args.url = argv[++i];
    else if (t === '--token') args.token = argv[++i];
    else if (t === '--root') args.root = argv[++i];
    else if (t === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (t === '--dry-run') args.dryRun = true;
  }

  return args;
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function readJsonIfExists(filePath) {
  const txt = readTextIfExists(filePath);
  if (!txt) return null;
  return JSON.parse(txt);
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session) {
    console.error('Uso: node push-webhook.js --session <id> [--url <webhook>] [--token <token>]');
    console.error('Ou configure AIOS_IDEATION_WEBHOOK_URL (+ opcional AIOS_IDEATION_WEBHOOK_TOKEN).');
    process.exit(1);
  }

  if (!args.url) {
    console.error('Webhook URL ausente. Use --url ou AIOS_IDEATION_WEBHOOK_URL.');
    process.exit(1);
  }

  const outDir = path.join(args.root, 'docs', 'ideation', args.session);
  const ideationPath = path.join(outDir, 'ideation.json');

  const ideation = readJsonIfExists(ideationPath);
  if (!ideation) {
    console.error(`Não encontrei ideation.json em: ${ideationPath}`);
    console.error('Gere antes com: *extract-ideas --session <session>');
    process.exit(1);
  }

  const payload = {
    kind: 'aios.ideation.outputs',
    version: '1.0',
    sentAt: new Date().toISOString(),
    session: args.session,
    paths: {
      outDir,
      ideationPath,
    },
    ideation,
    files: {
      boardSvg: readTextIfExists(path.join(outDir, 'board.svg')),
      excalidraw: readJsonIfExists(path.join(outDir, 'board.excalidraw.json')),
      mindmapMd: readTextIfExists(path.join(outDir, 'mindmap.md')),
      documentMd: readTextIfExists(path.join(outDir, 'document.md')),
      slidesMd: readTextIfExists(path.join(outDir, 'slides.md')),
      transcriptMd: readTextIfExists(path.join(outDir, 'transcript.md')),
    },
  };

  if (args.dryRun) {
    console.log('DRY RUN: payload pronto. Não enviei nada.');
    console.log(JSON.stringify({ session: args.session, url: args.url, hasToken: Boolean(args.token) }, null, 2));
    process.exit(0);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), args.timeoutMs);

  const headers = {
    'content-type': 'application/json',
  };
  if (args.token) {
    headers.authorization = `Bearer ${args.token}`;
  }

  let res;
  try {
    res = await fetch(args.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text().catch(() => '');
  if (!res.ok) {
    console.error(`❌ Push falhou: HTTP ${res.status}`);
    console.error(text);
    process.exit(2);
  }

  console.log('✅ Push concluído');
  console.log(`HTTP ${res.status}`);
  if (text) console.log(text);
}

main().catch((err) => {
  const msg = err?.name === 'AbortError'
    ? 'Timeout ao enviar para o webhook'
    : (err?.message || String(err));
  console.error(`❌ Erro: ${msg}`);
  process.exit(3);
});

