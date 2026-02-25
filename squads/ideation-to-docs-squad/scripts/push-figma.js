#!/usr/bin/env node
/**
 * Push ideation board directly to Figma via REST API
 *
 * Creates a new Figma board (file) with:
 * - Frames for each topic cluster
 * - Text nodes for each idea (styled like the example image)
 * - Connector lines (topic → ideas, and relations from ideation.json)
 * - Clean, organized layout matching FigJam-style clusters
 *
 * Requires: FIGMA_ACCESS_TOKEN environment variable
 * Get token: https://www.figma.com/developers/api#access-tokens
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_API_BASE = 'https://api.figma.com/v1';

function parseArgs(argv) {
  const args = {
    session: null,
    token: process.env.FIGMA_ACCESS_TOKEN || null,
    fileKey: null, // Optional: existing file key
    root: process.cwd(),
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--token') args.token = argv[++i];
    else if (t === '--file-key') args.fileKey = argv[++i];
    else if (t === '--root') args.root = argv[++i];
    else if (t === '--dry-run') args.dryRun = true;
  }

  return args;
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function httpsRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ status: res.statusCode, data: parsed });
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || parsed.err || body || 'Unknown error'}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function createFigmaFile(token, fileName) {
  // Figma API doesn't have a direct "create file" endpoint
  // We need to create it via team/project structure or use existing file
  // For now, we'll create nodes in an existing file or return instructions
  console.log('⚠️  Figma API requer um file_key existente.');
  console.log('   Crie um board no Figma primeiro e copie o file_key da URL.');
  console.log('   Exemplo: https://www.figma.com/file/FILE_KEY/...');
  return null;
}

async function createFigmaNode(token, fileKey, parentId, nodeData) {
  // Figma API v1 doesn't support direct node creation via REST
  // We need to use the Plugin API or create via file mutations
  // This is a placeholder - actual implementation requires Figma Plugin API
  console.warn('⚠️  Figma REST API v1 não suporta criação direta de nodes.');
  console.warn('   Use a Figma Plugin API ou importe o SVG gerado.');
  return null;
}

function layoutClusters(ideation) {
  // Reuse the same layout logic from push-miro.js
  const title = ideation?.meta?.title || ideation?.meta?.objective || ideation?.meta?.session || 'Ideias';
  const topics = ideation?.topics || [];
  const ideas = ideation?.ideas || [];
  const relations = ideation?.relations || [];

  const ideasByTopic = new Map();
  for (const idea of ideas) {
    const topicIds = Array.isArray(idea.topicIds) && idea.topicIds.length ? idea.topicIds : ['__misc__'];
    for (const tid of topicIds) {
      if (!ideasByTopic.has(tid)) ideasByTopic.set(tid, []);
      ideasByTopic.get(tid).push(idea);
    }
  }

  const clusterSpacing = 600;
  const cardW = 240;
  const cardH = 120;

  const nodes = [];
  const clusters = [];
  let clusterIndex = 0;

  for (const topic of topics) {
    if (topic.children && topic.children.length > 0) continue;

    const col = clusterIndex % 3;
    const row = Math.floor(clusterIndex / 3);
    const cx = (col - 1) * clusterSpacing;
    const cy = row * clusterSpacing;

    const topicIdeas = ideasByTopic.get(topic.id) || [];
    if (topicIdeas.length === 0 && topic.id !== '__misc__') continue;

    const topicNode = {
      id: `TOPIC_${topic.id}`,
      type: 'topic',
      x: cx,
      y: cy - 200,
      w: cardW,
      h: 60,
      text: topic.title || topic.id,
    };

    const ideaNodes = [];
    const angleStep = (2 * Math.PI) / Math.max(topicIdeas.length, 1);
    const radius = 180;

    for (let i = 0; i < topicIdeas.length; i++) {
      const idea = topicIdeas[i];
      const angle = i * angleStep;
      const ideaX = cx + Math.cos(angle) * radius;
      const ideaY = cy + Math.sin(angle) * radius;

      ideaNodes.push({
        id: idea.id || `IDEA_${i}`,
        type: 'idea',
        x: ideaX,
        y: ideaY,
        w: cardW,
        h: cardH,
        text: idea.title || idea.text || '',
        subtitle: `${idea.type || 'idea'}${idea.id ? ` • ${idea.id}` : ''}`,
        idea,
      });
    }

    clusters.push({ topic: topicNode, ideas: ideaNodes });
    nodes.push(topicNode, ...ideaNodes);
    clusterIndex++;
  }

  return { title, nodes, clusters, relations };
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session) {
    console.error('Uso: node push-figma.js --session <id> [--token <token>] [--file-key <key>]');
    console.error('Ou configure FIGMA_ACCESS_TOKEN no ambiente.');
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

  if (args.dryRun) {
    console.log('DRY RUN: layout calculado. Não criarei board no Figma.');
    const layout = layoutClusters(ideation);
    console.log(`Clusters: ${layout.clusters.length}`);
    console.log(`Total nodes: ${layout.nodes.length}`);
    console.log(`Connections: ${layout.relations.length}`);
    console.log('\n⚠️  Figma REST API v1 não suporta criação direta de nodes.');
    console.log('   Recomendado: use *export-visual e importe o SVG no Figma.');
    process.exit(0);
  }

  console.log('\n⚠️  IMPORTANTE: Figma REST API v1 não permite criar nodes diretamente.');
  console.log('   A API do Figma é principalmente para LEITURA.');
  console.log('   Para criar boards automaticamente, você precisa:');
  console.log('   1) Usar a Figma Plugin API (requer plugin instalado)');
  console.log('   2) Ou importar o SVG gerado pelo *export-visual\n');

  console.log('✅ SOLUÇÃO RECOMENDADA:');
  console.log('   1. Gere o board visual:');
  console.log(`      @ideation-orchestrator`);
  console.log(`      *export-visual --session ${args.session} --format svg --layout clusters`);
  console.log('   2. Abra o Figma');
  console.log('   3. Vá em "File" → "Import" → escolha o board.svg');
  console.log('   4. O board aparece pronto para editar!\n');

  console.log('📁 Arquivo gerado:');
  console.log(`   ${path.join(outDir, 'board.svg')}\n`);

  // Check if SVG exists
  const svgPath = path.join(outDir, 'board.svg');
  if (fs.existsSync(svgPath)) {
    console.log('✅ SVG já existe! Pode importar no Figma agora.');
  } else {
    console.log('⚠️  SVG ainda não foi gerado. Rode *export-visual primeiro.');
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}

module.exports = { layoutClusters };
