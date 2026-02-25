#!/usr/bin/env node
/**
 * Push ideation board directly to Miro via REST API
 *
 * Creates a new Miro board with:
 * - Sticky notes for each idea (clustered by topic)
 * - Connector lines (topic → ideas, and relations from ideation.json)
 * - Clean, organized layout (FigJam-style clusters)
 *
 * Requires: MIRO_ACCESS_TOKEN environment variable
 * Get token: https://developers.miro.com/apps
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const MIRO_API_BASE = 'https://api.miro.com/v2';

function parseArgs(argv) {
  const args = {
    session: null,
    token: process.env.MIRO_ACCESS_TOKEN || null,
    boardName: null,
    root: process.cwd(),
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--token') args.token = argv[++i];
    else if (t === '--board-name') args.boardName = argv[++i];
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
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || body || 'Unknown error'}`));
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

async function createMiroBoard(token, boardName) {
  const options = {
    hostname: 'api.miro.com',
    path: '/v2/boards',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const payload = {
    name: boardName,
    description: `Ideation board generated from AIOS squad`,
    policy: {
      permissionsPolicy: {
        collaborationToolsStartAccess: 'all_editors',
        copyAccess: 'anyone',
      },
    },
  };

  const result = await httpsRequest(options, payload);
  return result.data;
}

async function createStickyNote(token, boardId, x, y, text, style = {}) {
  const options = {
    hostname: 'api.miro.com',
    path: `/v2/boards/${boardId}/items`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const payload = {
    data: {
      content: text,
      shape: 'square',
    },
    style: {
      fillColor: style.fillColor || '#fff2e6',
      textAlign: 'left',
      textAlignVertical: 'top',
      ...style,
    },
    position: {
      x,
      y,
    },
    type: 'sticky_note',
  };

  const result = await httpsRequest(options, payload);
  return result.data;
}

async function createConnector(token, boardId, startItemId, endItemId, style = {}) {
  const options = {
    hostname: 'api.miro.com',
    path: `/v2/boards/${boardId}/items`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const payload = {
    data: {
      startItem: { id: startItemId },
      endItem: { id: endItemId },
    },
    style: {
      strokeColor: style.strokeColor || '#1e1e1e',
      strokeWidth: style.strokeWidth || 2,
      strokeStyle: style.strokeStyle || 'normal',
      ...style,
    },
    position: {
      x: 0,
      y: 0,
    },
    type: 'connector',
  };

  const result = await httpsRequest(options, payload);
  return result.data;
}

function layoutClusters(ideation) {
  const title = ideation?.meta?.title || ideation?.meta?.objective || ideation?.meta?.session || 'Ideias';
  const topics = ideation?.topics || [];
  const ideas = ideation?.ideas || [];
  const relations = ideation?.relations || [];

  // Group ideas by topic
  const ideasByTopic = new Map();
  for (const idea of ideas) {
    const topicIds = Array.isArray(idea.topicIds) && idea.topicIds.length ? idea.topicIds : ['__misc__'];
    for (const tid of topicIds) {
      if (!ideasByTopic.has(tid)) ideasByTopic.set(tid, []);
      ideasByTopic.get(tid).push(idea);
    }
  }

  // Layout: clusters in a grid
  const clusterSpacing = 600;
  const cardW = 240;
  const cardH = 120;
  const gap = 20;

  const nodes = [];
  const clusters = [];

  // Title at top
  nodes.push({
    id: 'TITLE',
    type: 'title',
    x: 0,
    y: -400,
    w: 800,
    h: 60,
    text: title,
  });

  // Create clusters for each top-level topic
  let clusterIndex = 0;
  for (const topic of topics) {
    if (topic.children && topic.children.length > 0) continue; // Skip non-top-level for now

    const col = clusterIndex % 3;
    const row = Math.floor(clusterIndex / 3);
    const cx = (col - 1) * clusterSpacing;
    const cy = row * clusterSpacing;

    const topicIdeas = ideasByTopic.get(topic.id) || [];
    if (topicIdeas.length === 0 && topic.id !== '__misc__') continue;

    // Topic header
    const topicNode = {
      id: `TOPIC_${topic.id}`,
      type: 'topic',
      x: cx,
      y: cy - 200,
      w: cardW,
      h: 60,
      text: topic.title || topic.id,
      miroId: null,
    };

    // Ideas around topic (circular-ish)
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
        miroId: null,
        idea,
      });
    }

    clusters.push({ topic: topicNode, ideas: ideaNodes });
    nodes.push(topicNode, ...ideaNodes);
    clusterIndex++;
  }

  // Add misc ideas if any
  const miscIdeas = ideasByTopic.get('__misc__') || [];
  if (miscIdeas.length > 0) {
    const col = clusterIndex % 3;
    const row = Math.floor(clusterIndex / 3);
    const cx = (col - 1) * clusterSpacing;
    const cy = row * clusterSpacing;

    const miscNode = {
      id: 'TOPIC_MISC',
      type: 'topic',
      x: cx,
      y: cy - 200,
      w: cardW,
      h: 60,
      text: 'Outros',
      miroId: null,
    };

    const miscIdeaNodes = [];
    for (let i = 0; i < miscIdeas.length; i++) {
      const idea = miscIdeas[i];
      const angle = (i * 2 * Math.PI) / Math.max(miscIdeas.length, 1);
      const ideaX = cx + Math.cos(angle) * 180;
      const ideaY = cy + Math.sin(angle) * 180;

      miscIdeaNodes.push({
        id: idea.id || `MISC_IDEA_${i}`,
        type: 'idea',
        x: ideaX,
        y: ideaY,
        w: cardW,
        h: cardH,
        text: idea.title || idea.text || '',
        subtitle: `${idea.type || 'idea'}`,
        miroId: null,
        idea,
      });
    }

    clusters.push({ topic: miscNode, ideas: miscIdeaNodes });
    nodes.push(miscNode, ...miscIdeaNodes);
  }

  return { title, nodes, clusters, relations };
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session) {
    console.error('Uso: node push-miro.js --session <id> [--token <token>] [--board-name <name>]');
    console.error('Ou configure MIRO_ACCESS_TOKEN no ambiente.');
    process.exit(1);
  }

  if (!args.token) {
    console.error('Token Miro ausente. Use --token ou configure MIRO_ACCESS_TOKEN.');
    console.error('Obtenha em: https://developers.miro.com/apps');
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

  const boardName = args.boardName || `Ideation: ${args.session}`;

  if (args.dryRun) {
    console.log('DRY RUN: layout calculado. Não criarei board no Miro.');
    const layout = layoutClusters(ideation);
    console.log(`Board: "${boardName}"`);
    console.log(`Clusters: ${layout.clusters.length}`);
    console.log(`Total nodes: ${layout.nodes.length}`);
    console.log(`Connections: ${layout.relations.length}`);
    process.exit(0);
  }

  try {
    console.log(`Criando board Miro: "${boardName}"...`);
    const board = await createMiroBoard(args.token, boardName);
    const boardId = board.id;
    console.log(`✅ Board criado: ${board.viewLink || `https://miro.com/app/board/${boardId}/`}`);

    const layout = layoutClusters(ideation);
    const nodeMap = new Map();

    // Create all nodes first
    console.log(`Criando ${layout.nodes.length} elementos...`);
    for (const node of layout.nodes) {
      let miroItem;
      if (node.type === 'title') {
        // Title as text item
        const options = {
          hostname: 'api.miro.com',
          path: `/v2/boards/${boardId}/items`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${args.token}`,
            'Content-Type': 'application/json',
          },
        };
        const payload = {
          data: { content: node.text },
          style: { fillColor: '#ffffff', fontSize: 24, textAlign: 'center' },
          position: { x: node.x, y: node.y },
          type: 'text',
        };
        const result = await httpsRequest(options, payload);
        miroItem = result.data;
      } else {
        // Sticky note
        const text = node.subtitle ? `${node.text}\n\n${node.subtitle}` : node.text;
        const fillColor = node.type === 'topic' ? '#e3f2fd' : '#fff2e6';
        miroItem = await createStickyNote(args.token, boardId, node.x, node.y, text, { fillColor });
      }
      node.miroId = miroItem.id;
      nodeMap.set(node.id, node);
    }

    // Create connectors: topic → ideas
    console.log(`Criando conectores...`);
    for (const cluster of layout.clusters) {
      const topicId = cluster.topic.miroId;
      for (const idea of cluster.ideas) {
        if (idea.miroId) {
          await createConnector(args.token, boardId, topicId, idea.miroId, {
            strokeColor: '#1976d2',
            strokeWidth: 2,
          });
        }
      }
    }

    // Create relation connectors (limit to 30 to avoid clutter)
    const relationsToDraw = layout.relations.slice(0, 30);
    for (const rel of relationsToDraw) {
      const fromNode = nodeMap.get(rel.from);
      const toNode = nodeMap.get(rel.to);
      if (fromNode?.miroId && toNode?.miroId) {
        await createConnector(args.token, boardId, fromNode.miroId, toNode.miroId, {
          strokeColor: '#666',
          strokeWidth: 1,
          strokeStyle: 'dashed',
        });
      }
    }

    console.log(`\n✅ Board pronto!`);
    console.log(`🔗 ${board.viewLink || `https://miro.com/app/board/${boardId}/`}`);
    console.log(`\nElementos criados:`);
    console.log(`  - ${layout.clusters.length} clusters (temas)`);
    console.log(`  - ${layout.nodes.filter(n => n.type === 'idea').length} ideias`);
    console.log(`  - ${layout.clusters.reduce((sum, c) => sum + c.ideas.length, 0)} conectores tema→ideia`);
    console.log(`  - ${relationsToDraw.length} conectores de relações`);

  } catch (error) {
    console.error(`\n❌ Erro ao criar board Miro: ${error.message}`);
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('Verifique se o token MIRO_ACCESS_TOKEN está correto e tem permissões.');
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}

module.exports = { layoutClusters, createMiroBoard, createStickyNote, createConnector };
