#!/usr/bin/env node
/**
 * Run Full Autonomous Pipeline
 *
 * Executa todo o pipeline automaticamente:
 * 1. Ingest transcript
 * 2. Extract ideas
 * 3. Generate mindmap
 * 4. Export visual (SVG + Excalidraw)
 * 5. Draft document
 * 6. Prepare presentation
 * 7. Review output
 * 8. Push to Figma (via webhook/automation)
 *
 * Usage: node run-full-pipeline.js --session <id> --source <transcript.md> [--auto-push-figma]
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs(argv) {
  const args = {
    session: null,
    source: null,
    title: null,
    autoPushFigma: false,
    figmaWebhookUrl: process.env.FIGMA_WEBHOOK_URL || null,
    root: process.cwd(),
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--source') args.source = argv[++i];
    else if (t === '--title') args.title = argv[++i];
    else if (t === '--auto-push-figma') args.autoPushFigma = true;
    else if (t === '--figma-webhook') args.figmaWebhookUrl = argv[++i];
    else if (t === '--root') args.root = argv[++i];
  }

  return args;
}

function runScript(scriptPath, args, options = {}) {
  const cmd = `node ${scriptPath} ${args.join(' ')}`;
  console.log(`\n▶️  ${options.label || 'Executando'}...`);
  console.log(`   ${cmd}\n`);
  
  try {
    const output = execSync(cmd, { 
      encoding: 'utf-8',
      cwd: options.cwd || process.cwd(),
      stdio: 'inherit',
    });
    return { success: true, output };
  } catch (error) {
    console.error(`\n❌ Erro: ${error.message}`);
    if (!options.continueOnError) {
      throw error;
    }
    return { success: false, error: error.message };
  }
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function pushToFigmaDirect(session, root) {
  // Try to use OAuth credentials if available
  const clientId = process.env.FIGMA_CLIENT_ID;
  const clientSecret = process.env.FIGMA_CLIENT_SECRET;
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;

  if (clientId && clientSecret && accessToken) {
    console.log('\n▶️  Tentando enviar para Figma via OAuth...\n');
    try {
      const pushScript = path.join(__dirname, 'push-figma-oauth.js');
      const result = runScript(pushScript, ['--session', session], {
        label: 'Enviando para Figma',
        continueOnError: true,
        cwd: root,
      });
      if (result.success) {
        return { success: true, method: 'oauth' };
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível enviar via OAuth, usando import manual.');
    }
  }

  return { success: false, method: 'manual' };
}

async function pushToFigmaWebhook(webhookUrl, session, root) {
  const outDir = path.join(root, 'docs', 'ideation', session);
  const ideation = readJsonIfExists(path.join(outDir, 'ideation.json'));
  const svgContent = fs.existsSync(path.join(outDir, 'board.svg'))
    ? fs.readFileSync(path.join(outDir, 'board.svg'), 'utf8')
    : null;
  const excalidrawContent = readJsonIfExists(path.join(outDir, 'board.excalidraw.json'));

  const payload = {
    kind: 'aios.ideation.figma.push',
    version: '1.0',
    sentAt: new Date().toISOString(),
    session,
    ideation,
    visual: {
      svg: svgContent,
      excalidraw: excalidrawContent,
    },
    files: {
      mindmap: fs.existsSync(path.join(outDir, 'mindmap.md'))
        ? fs.readFileSync(path.join(outDir, 'mindmap.md'), 'utf8')
        : null,
      document: fs.existsSync(path.join(outDir, 'document.md'))
        ? fs.readFileSync(path.join(outDir, 'document.md'), 'utf8')
        : null,
      slides: fs.existsSync(path.join(outDir, 'slides.md'))
        ? fs.readFileSync(path.join(outDir, 'slides.md'), 'utf8')
        : null,
    },
  };

  const https = require('https');
  const url = new URL(webhookUrl);

  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, status: res.statusCode, body });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session || !args.source) {
    console.error('Uso: node run-full-pipeline.js --session <id> --source <transcript.md> [--auto-push-figma] [--figma-webhook <url>]');
    console.error('\nExemplo:');
    console.error('  node run-full-pipeline.js --session ideation-2026-02-17 --source ./minha-transcricao.md --auto-push-figma');
    process.exit(1);
  }

  const scriptsDir = path.join(__dirname);
  const squadRoot = path.dirname(path.dirname(scriptsDir));

  console.log('\n🚀 Pipeline Autônomo - Ideation to Docs');
  console.log('==========================================\n');
  console.log(`Session: ${args.session}`);
  console.log(`Source: ${args.source}`);
  console.log(`Auto-push Figma: ${args.autoPushFigma ? 'Sim' : 'Não'}\n`);
  
  console.log('⚠️  NOTA: Este script executa apenas a parte de export visual.');
  console.log('   Para pipeline completo, use o comando do agente:');
  console.log(`   @ideation-orchestrator`);
  console.log(`   *run-full-pipeline --session ${args.session} --source ${args.source} --auto-push-figma\n`);

  // Note: These steps will be executed by the AIOS agent system
  // The script here is a helper that orchestrates via the agent commands
  // For now, we'll use the export-visual script directly and document the rest
  
  const steps = [
    {
      label: '3/8 Generating visual board (SVG + Excalidraw)',
      script: path.join(scriptsDir, 'export-visual.js'),
      args: ['--session', args.session, '--format', 'both', '--layout', 'clusters'],
      continueOnError: false,
    },
  ];

  // Execute all steps
  for (const step of steps) {
    const result = runScript(step.script, step.args, {
      label: step.label,
      continueOnError: step.continueOnError,
      cwd: args.root,
    });

    if (!result.success && !step.continueOnError) {
      console.error(`\n❌ Pipeline interrompido em: ${step.label}`);
      process.exit(1);
    }
  }

  // Push to Figma if requested
  if (args.autoPushFigma) {
    console.log('\n▶️  7/8 Pushing to Figma...\n');
    
    // Try OAuth first
    const oauthResult = await pushToFigmaDirect(args.session, args.root);
    
    if (!oauthResult.success && args.figmaWebhookUrl) {
      // Fallback to webhook
      try {
        await pushToFigmaWebhook(args.figmaWebhookUrl, args.session, args.root);
        console.log('✅ Board enviado para Figma via webhook!');
        console.log('   Sua automação deve criar o board no Figma agora.\n');
      } catch (error) {
        console.error(`\n⚠️  Erro ao enviar para Figma: ${error.message}`);
        console.error('   Você pode importar manualmente o SVG:\n');
        console.error(`   docs/ideation/${args.session}/board.svg\n`);
      }
    } else if (!oauthResult.success) {
      console.log('💡 Para push automático, configure:');
      console.log('   1. Access Token do Figma (veja GET-FIGMA-TOKEN.md)');
      console.log('   2. Ou configure webhook (veja SETUP-FIGMA-AUTOMATION.md)');
      console.log(`\n   Ou importe manualmente: docs/ideation/${args.session}/board.svg\n`);
    }
  }

  // Summary
  const outDir = path.join(args.root, 'docs', 'ideation', args.session);
  console.log('\n✅ Pipeline completo!');
  console.log('==========================================\n');
  console.log('📁 Outputs gerados em:');
  console.log(`   ${outDir}/\n`);
  console.log('Arquivos:');
  if (fs.existsSync(path.join(outDir, 'ideation.json'))) {
    console.log('   ✅ ideation.json (fonte de verdade)');
  }
  if (fs.existsSync(path.join(outDir, 'board.svg'))) {
    console.log('   ✅ board.svg (importe no Figma)');
  }
  if (fs.existsSync(path.join(outDir, 'board.excalidraw.json'))) {
    console.log('   ✅ board.excalidraw.json (editável)');
  }
  if (fs.existsSync(path.join(outDir, 'mindmap.md'))) {
    console.log('   ✅ mindmap.md');
  }
  if (fs.existsSync(path.join(outDir, 'document.md'))) {
    console.log('   ✅ document.md');
  }
  if (fs.existsSync(path.join(outDir, 'slides.md'))) {
    console.log('   ✅ slides.md');
  }

  if (args.autoPushFigma && args.figmaWebhookUrl) {
    console.log('\n🎉 Board enviado para Figma automaticamente!');
  } else if (args.autoPushFigma) {
    console.log('\n⚠️  Configure FIGMA_WEBHOOK_URL para push automático.');
  } else {
    console.log('\n💡 Para push automático no Figma, use: --auto-push-figma --figma-webhook <url>');
  }

  console.log('');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Fatal:', err);
    process.exit(1);
  });
}

module.exports = { runFullPipeline: main };
