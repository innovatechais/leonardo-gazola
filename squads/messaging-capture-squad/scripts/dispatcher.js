/**
 * dispatcher.js
 * Envia a mensagem processada para a squad destino
 * Atualmente suporta: knowledge-refinery-squad (Archimedes)
 * Extensível para outras squads no futuro
 */

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SQUADS_DIR = path.join(__dirname, '../../../squads');

/**
 * Despacha uma nota para a squad correta
 * @param {Object} note - { squad, category, idea, context, tags }
 * @returns {{ success, id, message }}
 */
function dispatch(note) {
  const { squad, category, idea, context, tags = [] } = note;

  switch (squad) {
    case 'knowledge-refinery-squad':
      return dispatchToArchimedes({ category, idea, context, tags });

    default:
      console.warn(`⚠️  Squad "${squad}" não suportada ainda. Enviando para Archimedes.`);
      return dispatchToArchimedes({ category, idea, context, tags });
  }
}

/**
 * Despacha para o Archimedes (knowledge-refinery-squad)
 * Chama o sync-obsidian.js com --action=capture
 */
function dispatchToArchimedes({ category, idea, context, tags }) {
  const archimedesScript = process.env.ARCHIMEDES_SCRIPT_PATH ||
    path.join(SQUADS_DIR, 'knowledge-refinery-squad/scripts/sync-obsidian.js');

  if (!fs.existsSync(archimedesScript)) {
    throw new Error(`Script Archimedes não encontrado: ${archimedesScript}`);
  }

  // Sanitizar argumentos (evitar injeção de shell)
  const safeIdea = idea.replace(/"/g, '\\"').substring(0, 500);
  const safeContext = context ? context.replace(/"/g, '\\"').substring(0, 500) : '';
  const safeTags = tags.join(',').replace(/[^a-zA-Z0-9,\-_áéíóúãõçÁÉÍÓÚÃÕÇ ]/g, '');
  const safeCategory = category.replace(/[^a-zA-ZáéíóúãõçÁÉÍÓÚÃÕÇ ]/g, '');

  const args = [
    archimedesScript,
    '--action=capture',
    `--category=${safeCategory}`,
    `--idea=${safeIdea}`,
  ];

  if (safeContext) args.push(`--context=${safeContext}`);
  if (safeTags) args.push(`--tags=${safeTags}`);

  const result = spawnSync('node', args, {
    env: { ...process.env },
    encoding: 'utf8',
    timeout: 30000,
  });

  if (result.error) {
    throw new Error(`Erro ao chamar Archimedes: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`Archimedes falhou (${result.status}): ${result.stderr}`);
  }

  // Extrair ID da nota do output
  const output = result.stdout || '';
  const idMatch = output.match(/ID:\s*(nota-[\w-]+)/);
  const noteId = idMatch ? idMatch[1] : 'nota-desconhecida';

  return {
    success: true,
    id: noteId,
    message: output.trim(),
  };
}

module.exports = { dispatch };
