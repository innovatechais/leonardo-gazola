/**
 * message-router.js
 * Determina para qual squad/categoria uma mensagem vai
 * baseado nas #tags no início do texto
 */

const fs = require('fs');
const path = require('path');

// Carregar rotas do config
const routesPath = path.join(__dirname, '../config/routes.yaml');

/**
 * Parser YAML simples (sem dependência)
 * Lê apenas o formato usado no routes.yaml
 */
function parseRoutesYaml(content) {
  const routes = {};
  let currentTag = null;
  let inRoutes = false;

  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed === 'routes:') {
      inRoutes = true;
      continue;
    }

    if (inRoutes && trimmed.match(/^"(#\w+)":/)) {
      currentTag = trimmed.match(/^"(#\w+)":/)[1];
      routes[currentTag] = {};
      continue;
    }

    if (currentTag && trimmed.startsWith('squad:')) {
      routes[currentTag].squad = trimmed.replace('squad:', '').trim();
    }
    if (currentTag && trimmed.startsWith('category:')) {
      routes[currentTag].category = trimmed.replace('category:', '').trim();
    }
    if (currentTag && trimmed.startsWith('action:')) {
      routes[currentTag].action = trimmed.replace('action:', '').trim();
    }
  }

  return routes;
}

/**
 * Determina rota baseada nas #tags da mensagem
 * @param {string} text - Texto da mensagem
 * @returns {{ squad, category, action, cleanText }}
 */
function routeMessage(text) {
  const DEFAULT = {
    squad: 'knowledge-refinery-squad',
    category: process.env.DEFAULT_CATEGORY || 'Estudos',
    action: 'capture',
  };

  let routes = {};
  try {
    const yaml = fs.readFileSync(routesPath, 'utf8');
    routes = parseRoutesYaml(yaml);
  } catch (e) {
    console.warn('⚠️  routes.yaml não encontrado, usando defaults');
  }

  // Extrair #tags do texto
  const tagMatch = text.match(/^(#\w+)\s*/i);
  if (!tagMatch) {
    return { ...DEFAULT, cleanText: text.trim() };
  }

  const tag = tagMatch[1].toLowerCase();
  const cleanText = text.replace(tagMatch[0], '').trim();

  const route = routes[tag] || DEFAULT;

  return {
    squad: route.squad || DEFAULT.squad,
    category: route.category || DEFAULT.category,
    action: route.action || DEFAULT.action,
    cleanText,
    tag,
  };
}

/**
 * Extrai contexto adicional da mensagem (linha após a ideia principal)
 */
function extractContext(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length <= 1) return null;

  const context = lines.slice(1).join(' ').trim();
  return context || null;
}

module.exports = { routeMessage, extractContext };
