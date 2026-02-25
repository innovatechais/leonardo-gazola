#!/usr/bin/env node
/**
 * Export Visual Board from ideation.json
 *
 * Generates:
 * - board.excalidraw.json (editable canvas)
 * - board.svg (import into Figma/Miro)
 *
 * No external dependencies.
 */

'use strict';

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { session: null, format: 'both', layout: 'figjam', root: process.cwd() };
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--session') args.session = argv[++i];
    else if (token === '--format') args.format = argv[++i];
    else if (token === '--layout') args.layout = argv[++i];
    else if (token === '--root') args.root = argv[++i];
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function pickTitle(ideation) {
  return ideation?.meta?.title || ideation?.meta?.objective || ideation?.meta?.session || 'Ideias';
}

function flattenTopics(topics = [], out = [], parentId = null, depth = 0) {
  for (const t of topics) {
    out.push({ id: t.id, title: t.title, parentId, depth });
    flattenTopics(t.children || [], out, t.id, depth + 1);
  }
  return out;
}

function groupIdeasByTopic(ideation) {
  const map = new Map();
  for (const idea of ideation.ideas || []) {
    const topicIds = Array.isArray(idea.topicIds) && idea.topicIds.length ? idea.topicIds : ['__misc__'];
    for (const tid of topicIds) {
      if (!map.has(tid)) map.set(tid, []);
      map.get(tid).push(idea);
    }
  }
  for (const arr of map.values()) {
    arr.sort((a, b) => (a.type || '').localeCompare(b.type || '') || (a.id || '').localeCompare(b.id || ''));
  }
  return map;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function layoutFigjam(ideation) {
  const title = pickTitle(ideation);
  const topicsFlat = flattenTopics(ideation.topics || []);
  const topLevel = topicsFlat.filter(t => t.depth === 0);

  const columnWidth = 520;
  const cardW = 440;
  const cardH = 92;
  const headerH = 46;
  const gapY = 18;
  const padX = 80;
  const padY = 80;
  const laneGapY = 18;

  const columns = [];
  let colIndex = 0;

  // Build columns: one per top-level topic, plus special columns
  for (const t of topLevel) {
    columns.push({ key: t.id, title: t.title, kind: 'topic', index: colIndex++ });
  }
  columns.push({ key: '__decisions__', title: 'Decisões', kind: 'bucket', index: colIndex++ });
  columns.push({ key: '__questions__', title: 'Perguntas em aberto', kind: 'bucket', index: colIndex++ });
  columns.push({ key: '__actions__', title: 'Próximos passos', kind: 'bucket', index: colIndex++ });
  columns.push({ key: '__misc__', title: 'Outros', kind: 'bucket', index: colIndex++ });

  function bucketForIdea(idea) {
    const type = (idea.type || '').toLowerCase();
    if (type === 'decision') return '__decisions__';
    if (type === 'question') return '__questions__';
    if (type === 'action') return '__actions__';
    return null;
  }

  // For each column, collect items
  const colItems = new Map(columns.map(c => [c.key, []]));

  for (const idea of ideation.ideas || []) {
    const bucket = bucketForIdea(idea);
    if (bucket) {
      colItems.get(bucket).push(idea);
      continue;
    }
    const topicIds = Array.isArray(idea.topicIds) && idea.topicIds.length ? idea.topicIds : ['__misc__'];
    const first = topicIds[0];
    // If not a top-level topic, still place under its nearest top-level ancestor if possible
    const topicNode = (ideation.topics || []).find(t => t.id === first);
    // cheap fallback: just place under first topic id
    const key = colItems.has(first) ? first : '__misc__';
    colItems.get(key).push(idea);
  }

  for (const [k, arr] of colItems.entries()) {
    arr.sort((a, b) => (a.type || '').localeCompare(b.type || '') || (a.id || '').localeCompare(b.id || ''));
  }

  // Compute node positions
  const nodes = [];
  const edges = [];

  // Title node
  nodes.push({
    id: 'TITLE',
    type: 'title',
    x: padX,
    y: 20,
    w: 1200,
    h: 40,
    text: title,
  });

  for (const col of columns) {
    const x = padX + col.index * columnWidth;
    const y0 = padY;
    nodes.push({
      id: `H_${col.key}`,
      type: 'header',
      x,
      y: y0,
      w: cardW,
      h: headerH,
      text: col.title,
    });
    const items = colItems.get(col.key) || [];
    for (let i = 0; i < items.length; i++) {
      const idea = items[i];
      const y = y0 + headerH + gapY + i * (cardH + gapY);
      nodes.push({
        id: idea.id || `IDEA_${col.key}_${i}`,
        type: 'card',
        x,
        y,
        w: cardW,
        h: cardH,
        idea,
        text: `${idea.title || ''}`.trim(),
        subtitle: `${idea.type || 'idea'}${idea.id ? ` • ${idea.id}` : ''}`.trim(),
      });

      // Connect header -> card (FigJam-ish, didático)
      edges.push({
        id: `E_${col.key}_${idea.id || i}`,
        fromId: `H_${col.key}`,
        toId: idea.id || `IDEA_${col.key}_${i}`,
        type: 'lane',
      });
    }
  }

  // Add semantic relations (ideation.json relations[]), but cap to avoid clutter
  const rels = Array.isArray(ideation.relations) ? ideation.relations : [];
  const relCap = 30;
  for (let i = 0; i < Math.min(rels.length, relCap); i++) {
    const r = rels[i];
    if (!r || !r.fromId || !r.toId) continue;
    edges.push({
      id: `R_${i}_${r.fromId}_${r.toId}`,
      fromId: r.fromId,
      toId: r.toId,
      type: r.type || 'rel',
      note: r.note || '',
    });
  }

  // Canvas size
  const maxX = Math.max(...nodes.map(n => n.x + n.w), 1400);
  const maxY = Math.max(...nodes.map(n => n.y + n.h), 900);

  return { title, nodes, edges, width: maxX + 160, height: maxY + 160 };
}

function layoutMindmap(ideation) {
  const title = pickTitle(ideation);
  const topicsFlat = flattenTopics(ideation.topics || []);
  const topLevel = topicsFlat.filter(t => t.depth === 0);

  const cardW = 360;
  const cardH = 88;
  const pad = 120;
  const centerX = 900;
  const centerY = 520;

  const nodes = [];
  const edges = [];

  // Root
  nodes.push({
    id: 'ROOT',
    type: 'root',
    x: centerX - 220,
    y: centerY - 40,
    w: 440,
    h: 80,
    text: title,
  });

  const n = Math.max(1, topLevel.length);
  const radius = 520;

  // Place topics around root
  const topicAnchors = new Map();
  for (let i = 0; i < topLevel.length; i++) {
    const t = topLevel[i];
    const angle = (Math.PI * 2 * i) / n;
    const x = centerX + Math.cos(angle) * radius - cardW / 2;
    const y = centerY + Math.sin(angle) * (radius * 0.72) - cardH / 2;
    const id = `T_${t.id}`;
    nodes.push({
      id,
      type: 'topic',
      x,
      y,
      w: cardW,
      h: cardH,
      text: t.title,
      topicId: t.id,
    });
    edges.push({ id: `E_ROOT_${t.id}`, fromId: 'ROOT', toId: id, type: 'topic' });
    topicAnchors.set(t.id, { x, y });
  }

  // Place ideas near their first topic (stacked)
  const ideasByTopic = groupIdeasByTopic(ideation);
  for (const t of topLevel) {
    const items = ideasByTopic.get(t.id) || [];
    const anchor = topicAnchors.get(t.id);
    if (!anchor || items.length === 0) continue;

    // Stack below the topic card
    for (let i = 0; i < Math.min(items.length, 12); i++) {
      const idea = items[i];
      const x = anchor.x;
      const y = anchor.y + cardH + 22 + i * (cardH + 14);
      const ideaId = idea.id || `IDEA_${t.id}_${i}`;
      nodes.push({
        id: ideaId,
        type: 'card',
        x,
        y,
        w: cardW,
        h: cardH,
        idea,
        text: `${idea.title || ''}`.trim(),
        subtitle: `${idea.type || 'idea'}${idea.id ? ` • ${idea.id}` : ''}`.trim(),
      });
      edges.push({ id: `E_${t.id}_${ideaId}`, fromId: `T_${t.id}`, toId: ideaId, type: 'idea' });
    }
  }

  // Add relations (cap)
  const rels = Array.isArray(ideation.relations) ? ideation.relations : [];
  const relCap = 30;
  for (let i = 0; i < Math.min(rels.length, relCap); i++) {
    const r = rels[i];
    if (!r || !r.fromId || !r.toId) continue;
    edges.push({
      id: `R_${i}_${r.fromId}_${r.toId}`,
      fromId: r.fromId,
      toId: r.toId,
      type: r.type || 'rel',
      note: r.note || '',
    });
  }

  const maxX = Math.max(...nodes.map(nn => nn.x + nn.w), centerX + radius);
  const maxY = Math.max(...nodes.map(nn => nn.y + nn.h), centerY + radius);
  const minX = Math.min(...nodes.map(nn => nn.x), centerX - radius);
  const minY = Math.min(...nodes.map(nn => nn.y), centerY - radius);

  // Normalize to positive coordinates (SVG-friendly)
  const dx = minX < pad ? pad - minX : 0;
  const dy = minY < pad ? pad - minY : 0;
  for (const nn of nodes) {
    nn.x += dx;
    nn.y += dy;
  }

  return {
    title,
    nodes,
    edges,
    width: maxX - minX + pad * 2,
    height: maxY - minY + pad * 2,
  };
}

function seededRand(seed) {
  // Deterministic PRNG (LCG)
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function layoutClusters(ideation) {
  const title = pickTitle(ideation);
  const topicsFlat = flattenTopics(ideation.topics || []);
  const topLevel = topicsFlat.filter(t => t.depth === 0);
  const ideasByTopic = groupIdeasByTopic(ideation);

  const nodes = [];
  const edges = [];

  // Title
  nodes.push({
    id: 'TITLE',
    type: 'title',
    x: 80,
    y: 20,
    w: 1200,
    h: 40,
    text: title,
  });

  const topicW = 340;
  const topicH = 72;
  const ideaW = 320;
  const ideaH = 86;

  // Grid of cluster centers
  const count = Math.max(1, topLevel.length);
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const startX = 140;
  const startY = 120;
  const cellW = 720;
  const cellH = 520;

  const topicCenter = new Map();

  for (let i = 0; i < topLevel.length; i++) {
    const t = topLevel[i];
    const col = i % cols;
    const row = Math.floor(i / cols);

    const cx = startX + col * cellW + cellW / 2;
    const cy = startY + row * cellH + cellH / 2;

    const topicNodeId = `C_${t.id}`;
    const tx = cx - topicW / 2;
    const ty = cy - topicH / 2;

    nodes.push({
      id: topicNodeId,
      type: 'topic',
      x: tx,
      y: ty,
      w: topicW,
      h: topicH,
      text: t.title,
      topicId: t.id,
    });

    topicCenter.set(t.id, { cx, cy, id: topicNodeId });
  }

  // Place ideas around each cluster center (ring-ish, deterministic jitter)
  for (const t of topLevel) {
    const items = ideasByTopic.get(t.id) || [];
    const center = topicCenter.get(t.id);
    if (!center || items.length === 0) continue;

    const maxItems = 18;
    const n = Math.min(items.length, maxItems);
    const baseRadius = 190;
    const radiusStep = 42;

    for (let i = 0; i < n; i++) {
      const idea = items[i];
      const seed = hashString(`${ideation?.meta?.session || ''}:${t.id}:${idea.id || i}`);
      const rnd = seededRand(seed);

      const ring = Math.floor(i / 8);
      const angleIndex = i % 8;
      const angle = (Math.PI * 2 * angleIndex) / 8 + (rnd() - 0.5) * 0.35;
      const radius = baseRadius + ring * radiusStep + rnd() * 18;

      const x = center.cx + Math.cos(angle) * radius - ideaW / 2;
      const y = center.cy + Math.sin(angle) * radius - ideaH / 2;
      const ideaId = idea.id || `IDEA_${t.id}_${i}`;

      nodes.push({
        id: ideaId,
        type: 'card',
        x,
        y,
        w: ideaW,
        h: ideaH,
        idea,
        text: `${idea.title || ''}`.trim(),
        subtitle: `${idea.type || 'idea'}${idea.id ? ` • ${idea.id}` : ''}`.trim(),
      });

      // Connect cluster center -> idea
      edges.push({
        id: `E_${t.id}_${ideaId}`,
        fromId: center.id,
        toId: ideaId,
        type: 'cluster',
      });
    }
  }

  // Add buckets (decisions/questions/actions) as their own clusters (right side)
  const buckets = [
    { key: '__decisions__', title: 'Decisões' },
    { key: '__questions__', title: 'Perguntas em aberto' },
    { key: '__actions__', title: 'Próximos passos' },
  ];

  const allIdeas = Array.isArray(ideation.ideas) ? ideation.ideas : [];
  const bucketIdeas = new Map(buckets.map(b => [b.key, []]));
  for (const idea of allIdeas) {
    const type = (idea.type || '').toLowerCase();
    const b =
      type === 'decision' ? '__decisions__'
        : type === 'question' ? '__questions__'
          : type === 'action' ? '__actions__'
            : null;
    if (b) bucketIdeas.get(b).push(idea);
  }

  const rightBaseX = startX + cols * cellW + 160;
  const rightBaseY = 180;
  const rightGapY = 360;

  for (let bi = 0; bi < buckets.length; bi++) {
    const b = buckets[bi];
    const list = bucketIdeas.get(b.key) || [];
    if (list.length === 0) continue;

    const cx = rightBaseX;
    const cy = rightBaseY + bi * rightGapY;
    const clusterId = `B_${b.key}`;

    nodes.push({
      id: clusterId,
      type: 'header',
      x: cx - topicW / 2,
      y: cy - topicH / 2,
      w: topicW,
      h: topicH,
      text: b.title,
    });

    const n = Math.min(list.length, 12);
    for (let i = 0; i < n; i++) {
      const idea = list[i];
      const x = cx - ideaW / 2;
      const y = cy + topicH / 2 + 20 + i * (ideaH + 14);
      const ideaId = idea.id || `IDEA_${b.key}_${i}`;

      nodes.push({
        id: ideaId,
        type: 'card',
        x,
        y,
        w: ideaW,
        h: ideaH,
        idea,
        text: `${idea.title || ''}`.trim(),
        subtitle: `${idea.type || 'idea'}${idea.id ? ` • ${idea.id}` : ''}`.trim(),
      });
      edges.push({ id: `E_${b.key}_${ideaId}`, fromId: clusterId, toId: ideaId, type: 'bucket' });
    }
  }

  // Add semantic relations (cap)
  const rels = Array.isArray(ideation.relations) ? ideation.relations : [];
  const relCap = 30;
  for (let i = 0; i < Math.min(rels.length, relCap); i++) {
    const r = rels[i];
    if (!r || !r.fromId || !r.toId) continue;
    edges.push({
      id: `R_${i}_${r.fromId}_${r.toId}`,
      fromId: r.fromId,
      toId: r.toId,
      type: r.type || 'rel',
      note: r.note || '',
    });
  }

  // Canvas bounds
  const maxX = Math.max(...nodes.map(nn => nn.x + nn.w), 1400);
  const maxY = Math.max(...nodes.map(nn => nn.y + nn.h), 900);
  const minX = Math.min(...nodes.map(nn => nn.x), 0);
  const minY = Math.min(...nodes.map(nn => nn.y), 0);

  // Normalize to positive coordinates
  const pad = 120;
  const dx = minX < pad ? pad - minX : 0;
  const dy = minY < pad ? pad - minY : 0;
  for (const nn of nodes) {
    nn.x += dx;
    nn.y += dy;
  }

  return { title, nodes, edges, width: (maxX - minX) + pad * 2, height: (maxY - minY) + pad * 2 };
}

function toExcalidraw(layout) {
  const now = Date.now();
  const elements = [];

  function pushArrow(id, x, y, dx, dy, opts = {}) {
    elements.push({
      id,
      type: 'arrow',
      x,
      y,
      width: dx,
      height: dy,
      angle: 0,
      strokeColor: opts.strokeColor || '#94a3b8',
      backgroundColor: 'transparent',
      fillStyle: 'solid',
      strokeWidth: opts.strokeWidth || 1,
      strokeStyle: 'solid',
      roughness: 0,
      opacity: 100,
      groupIds: [],
      roundness: { type: 2 },
      seed: 1,
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      boundElements: null,
      updated: now,
      link: null,
      locked: false,
      points: [
        [0, 0],
        [dx, dy],
      ],
      lastCommittedPoint: [dx, dy],
      startBinding: null,
      endBinding: null,
      startArrowhead: null,
      endArrowhead: 'arrow',
    });
  }

  function pushRect(id, x, y, w, h, opts = {}) {
    elements.push({
      id,
      type: 'rectangle',
      x,
      y,
      width: w,
      height: h,
      angle: 0,
      strokeColor: opts.strokeColor || '#1e1e1e',
      backgroundColor: opts.backgroundColor || 'transparent',
      fillStyle: 'solid',
      strokeWidth: 1,
      strokeStyle: 'solid',
      roughness: 0,
      opacity: 100,
      groupIds: [],
      roundness: { type: 3 },
      seed: 1,
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      boundElements: null,
      updated: now,
      link: null,
      locked: false,
    });
  }

  function pushText(id, x, y, text, opts = {}) {
    elements.push({
      id,
      type: 'text',
      x,
      y,
      width: opts.width || Math.min(420, Math.max(100, text.length * 7)),
      height: opts.height || 24,
      angle: 0,
      strokeColor: opts.color || '#1e1e1e',
      backgroundColor: 'transparent',
      fillStyle: 'solid',
      strokeWidth: 1,
      strokeStyle: 'solid',
      roughness: 0,
      opacity: 100,
      groupIds: [],
      roundness: null,
      seed: 1,
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      boundElements: null,
      updated: now,
      link: null,
      locked: false,
      fontSize: opts.fontSize || 18,
      fontFamily: 1,
      text,
      textAlign: opts.align || 'left',
      verticalAlign: 'top',
      baseline: opts.baseline || 18,
      containerId: opts.containerId || null,
      originalText: text,
      lineHeight: 1.2,
    });
  }

  for (const n of layout.nodes) {
    if (n.type === 'title') {
      pushText('TXT_TITLE', n.x, n.y, n.text, { fontSize: 26 });
      continue;
    }
    if (n.type === 'root') {
      pushRect(`R_${n.id}`, n.x, n.y, n.w, n.h, { backgroundColor: '#ffffff', strokeColor: '#111827' });
      pushText(`T_${n.id}`, n.x + 18, n.y + 20, n.text, { fontSize: 20, containerId: `R_${n.id}` });
      continue;
    }
    if (n.type === 'topic') {
      pushRect(`R_${n.id}`, n.x, n.y, n.w, n.h, { backgroundColor: '#ffffff', strokeColor: '#111827' });
      pushText(`T_${n.id}`, n.x + 16, n.y + 18, n.text, { fontSize: 16, containerId: `R_${n.id}` });
      continue;
    }
    if (n.type === 'header') {
      pushRect(`R_${n.id}`, n.x, n.y, n.w, n.h, { backgroundColor: '#e8f0fe', strokeColor: '#1a73e8' });
      pushText(`T_${n.id}`, n.x + 16, n.y + 12, n.text, { fontSize: 18, containerId: `R_${n.id}` });
      continue;
    }
    if (n.type === 'card') {
      const ideaType = (n.idea?.type || 'idea').toLowerCase();
      const palette = {
        idea: { bg: '#fff8e1', stroke: '#f9ab00' },
        decision: { bg: '#e6f4ea', stroke: '#1e8e3e' },
        question: { bg: '#fce8e6', stroke: '#d93025' },
        action: { bg: '#e8f0fe', stroke: '#1a73e8' },
        hypothesis: { bg: '#f3e8fd', stroke: '#9334e6' },
        note: { bg: '#f1f3f4', stroke: '#5f6368' },
      };
      const p = palette[ideaType] || palette.idea;
      pushRect(`R_${n.id}`, n.x, n.y, n.w, n.h, { backgroundColor: p.bg, strokeColor: p.stroke });
      pushText(`T_${n.id}`, n.x + 16, n.y + 12, n.text || n.id, { fontSize: 16, containerId: `R_${n.id}` });
      if (n.subtitle) {
        pushText(`S_${n.id}`, n.x + 16, n.y + 56, n.subtitle, { fontSize: 12, color: '#5f6368', containerId: `R_${n.id}` });
      }
    }
  }

  // Add connectors (FigJam-ish)
  const nodeById = new Map(layout.nodes.map(nn => [nn.id, nn]));
  for (const e of layout.edges || []) {
    const from = nodeById.get(e.fromId);
    const to = nodeById.get(e.toId);
    if (!from || !to) continue;

    const x1 = from.x + from.w / 2;
    const y1 = from.y + from.h;
    const x2 = to.x + to.w / 2;
    const y2 = to.y;

    // Draw as straight arrow; keep a small vertical offset for nicer look
    const startX = x1;
    const startY = y1 + 6;
    const dx = x2 - startX;
    const dy = (y2 - 6) - startY;
    const stroke = e.type === 'contradicts' ? '#ef4444' : e.type === 'supports' ? '#22c55e' : '#94a3b8';
    pushArrow(`A_${e.id}`, startX, startY, dx, dy, { strokeColor: stroke, strokeWidth: 1 });
  }

  return {
    type: 'excalidraw',
    version: 2,
    source: 'ideation-to-docs-squad',
    elements,
    appState: {
      viewBackgroundColor: '#ffffff',
      gridSize: null,
      zenModeEnabled: false,
    },
    files: {},
  };
}

function toSvg(layout) {
  const w = layout.width;
  const h = layout.height;

  const parts = [];
  parts.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`);
  parts.push(`<defs>`);
  parts.push(`<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">`);
  parts.push(`<path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/>`);
  parts.push(`</marker>`);
  parts.push(`</defs>`);
  parts.push(`<rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff"/>`);

  function rect(x, y, ww, hh, fill, stroke) {
    parts.push(`<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="12" ry="12" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`);
  }

  function text(x, y, content, size = 14, color = '#1e1e1e', weight = 500) {
    parts.push(`<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(content)}</text>`);
  }

  function wrapLines(s, maxChars) {
    const words = String(s || '').split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = '';
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (next.length > maxChars && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = next;
      }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 4);
  }

  const palette = {
    header: { bg: '#e8f0fe', stroke: '#1a73e8' },
    idea: { bg: '#fff8e1', stroke: '#f9ab00' },
    decision: { bg: '#e6f4ea', stroke: '#1e8e3e' },
    question: { bg: '#fce8e6', stroke: '#d93025' },
    action: { bg: '#e8f0fe', stroke: '#1a73e8' },
    hypothesis: { bg: '#f3e8fd', stroke: '#9334e6' },
    note: { bg: '#f1f3f4', stroke: '#5f6368' },
  };

  for (const n of layout.nodes) {
    if (n.type === 'title') {
      text(n.x, n.y + 26, n.text, 26, '#111827', 700);
      continue;
    }
    if (n.type === 'root') {
      rect(n.x, n.y, n.w, n.h, '#ffffff', '#111827');
      text(n.x + 18, n.y + 30, n.text, 18, '#111827', 800);
      continue;
    }
    if (n.type === 'topic') {
      rect(n.x, n.y, n.w, n.h, '#ffffff', '#111827');
      text(n.x + 16, n.y + 30, n.text, 14, '#111827', 700);
      continue;
    }
    if (n.type === 'header') {
      rect(n.x, n.y, n.w, n.h, palette.header.bg, palette.header.stroke);
      text(n.x + 16, n.y + 30, n.text, 16, '#1a73e8', 700);
      continue;
    }
    if (n.type === 'card') {
      const ideaType = (n.idea?.type || 'idea').toLowerCase();
      const p = palette[ideaType] || palette.idea;
      rect(n.x, n.y, n.w, n.h, p.bg, p.stroke);
      const lines = wrapLines(n.text || n.id, 44);
      let yy = n.y + 28;
      for (const line of lines) {
        text(n.x + 16, yy, line, 14, '#111827', 600);
        yy += 18;
      }
      if (n.subtitle) {
        text(n.x + 16, n.y + n.h - 14, n.subtitle, 11, '#6b7280', 500);
      }
    }
  }

  // Connectors (draw after nodes to keep lines visible; FigJam-like)
  const nodeById = new Map(layout.nodes.map(nn => [nn.id, nn]));
  for (const e of layout.edges || []) {
    const from = nodeById.get(e.fromId);
    const to = nodeById.get(e.toId);
    if (!from || !to) continue;

    const x1 = from.x + from.w / 2;
    const y1 = from.y + from.h + 6;
    const x2 = to.x + to.w / 2;
    const y2 = to.y - 6;
    const stroke = e.type === 'contradicts' ? '#ef4444' : e.type === 'supports' ? '#22c55e' : '#94a3b8';
    parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="1.2" marker-end="url(#arrow)"/>`);
  }

  parts.push(`</svg>`);
  return parts.join('\n');
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.session) {
    console.error('Uso: node export-visual.js --session <id> [--format excalidraw|svg|both] [--root <projectRoot>]');
    process.exit(1);
  }

  const outDir = path.join(args.root, 'docs', 'ideation', args.session);
  const ideationPath = path.join(outDir, 'ideation.json');

  if (!fs.existsSync(ideationPath)) {
    console.error(`Não encontrei ideation.json em: ${ideationPath}`);
    console.error('Rode antes: *extract-ideas --session <session>');
    process.exit(1);
  }

  ensureDir(outDir);

  const ideation = readJson(ideationPath);
  const layoutName = (args.layout || 'figjam').toLowerCase();
  const layout =
    layoutName === 'mindmap'
      ? layoutMindmap(ideation)
      : layoutName === 'clusters'
        ? layoutClusters(ideation)
        : layoutFigjam(ideation);

  const fmt = (args.format || 'both').toLowerCase();
  const doExcal = fmt === 'both' || fmt === 'excalidraw';
  const doSvg = fmt === 'both' || fmt === 'svg';

  if (doExcal) {
    const excal = toExcalidraw(layout);
    fs.writeFileSync(path.join(outDir, 'board.excalidraw.json'), JSON.stringify(excal, null, 2), 'utf8');
  }

  if (doSvg) {
    const svg = toSvg(layout);
    fs.writeFileSync(path.join(outDir, 'board.svg'), svg, 'utf8');
  }

  console.log('✅ Visual export concluído');
  console.log(`📁 ${outDir}`);
  if (doExcal) console.log(' - board.excalidraw.json (editável no Excalidraw)');
  if (doSvg) console.log(' - board.svg (importável no Figma/Miro)');
}

main();

