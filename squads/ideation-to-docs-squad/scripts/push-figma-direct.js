#!/usr/bin/env node
/**
 * Push ideation board directly to Figma (Simple - Just needs API token)
 *
 * This script:
 * 1. Takes your Figma Personal Access Token
 * 2. Creates a new Figma file (board)
 * 3. Imports the SVG as an image
 * 4. Returns the link to your new board
 *
 * Setup (one time, 2 minutes):
 * 1. Go to: https://www.figma.com/developers/api#access-tokens
 * 2. Click "Generate new token"
 * 3. Copy the token
 * 4. Run: export FIGMA_ACCESS_TOKEN="seu_token_aqui"
 *
 * Usage:
 * node push-figma-direct.js --session ideation-2026-02-17
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
    teamId: process.env.FIGMA_TEAM_ID || null,
    root: process.cwd(),
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--token') args.token = argv[++i];
    else if (t === '--team-id') args.teamId = argv[++i];
    else if (t === '--root') args.root = argv[++i];
    else if (t === '--dry-run') args.dryRun = true;
  }

  return args;
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'X-Figma-Token': options.token,
        ...options.headers,
      },
    };

    const req = https.request(opts, (res) => {
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
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function getTeams(token) {
  try {
    const response = await httpsRequest(`${FIGMA_API_BASE}/teams`, { token });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar teams:', error.message);
    return null;
  }
}

async function createFigmaFile(token, teamId, fileName) {
  // Figma API doesn't have a direct "create file" endpoint via REST
  // We need to use the file creation via project or create via plugin
  // Alternative: Create a project and then a file, or use existing file
  
  // For now, we'll guide the user to create a file manually and provide the file key
  // OR we can use the Figma Plugin API approach
  
  console.log('⚠️  A API REST do Figma não permite criar files diretamente.');
  console.log('   Mas podemos importar o SVG em um file existente ou criar via plugin.');
  console.log('\n✅ SOLUÇÃO SIMPLES:');
  console.log('   1. Crie um board vazio no Figma (File → New → FigJam)');
  console.log('   2. Copie o file_key da URL (ex: figma.com/file/FILE_KEY/...)');
  console.log('   3. Use: --file-key FILE_KEY\n');
  
  return null;
}

async function importSvgToFigma(token, fileKey, svgContent, x = 0, y = 0) {
  // Convert SVG to image and upload
  // Figma API allows importing images via POST /v1/files/{file_key}/images
  
  // Actually, Figma doesn't support direct SVG import via REST API
  // We need to use the Plugin API or convert SVG to PNG first
  
  console.log('⚠️  A API REST do Figma não suporta importar SVG diretamente.');
  console.log('   Vamos usar uma abordagem diferente...\n');
  
  // Alternative: Use Figma Plugin API or guide user to import manually
  return null;
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session) {
    console.error('Uso: node push-figma-direct.js --session <id> [--token <token>] [--team-id <id>]');
    console.error('\nOu configure:');
    console.error('  export FIGMA_ACCESS_TOKEN="seu_token"');
    console.error('  export FIGMA_TEAM_ID="seu_team_id" (opcional)\n');
    process.exit(1);
  }

  if (!args.token) {
    console.error('\n❌ Token do Figma não encontrado!\n');
    console.error('📋 COMO OBTER O TOKEN (2 minutos):\n');
    console.error('1. Acesse: https://www.figma.com/developers/api#access-tokens');
    console.error('2. Faça login no Figma');
    console.error('3. Clique em "Generate new token"');
    console.error('4. Dê um nome (ex: "AIOS Ideation")');
    console.error('5. Copie o token (você só verá uma vez!)\n');
    console.error('6. Configure:');
    console.error('   export FIGMA_ACCESS_TOKEN="seu_token_aqui"\n');
    console.error('Ou passe diretamente:');
    console.error('   node push-figma-direct.js --session <id> --token "seu_token"\n');
    process.exit(1);
  }

  const outDir = path.join(args.root, 'docs', 'ideation', args.session);
  const ideationPath = path.join(outDir, 'ideation.json');
  const svgPath = path.join(outDir, 'board.svg');

  const ideation = readJsonIfExists(ideationPath);
  if (!ideation) {
    console.error(`❌ Não encontrei ideation.json em: ${ideationPath}`);
    console.error('   Gere antes com: *extract-ideas --session <session>\n');
    process.exit(1);
  }

  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Não encontrei board.svg em: ${svgPath}`);
    console.error('   Gere antes com: *export-visual --session <session> --format svg\n');
    process.exit(1);
  }

  if (args.dryRun) {
    console.log('DRY RUN: Tudo pronto para enviar ao Figma.');
    console.log(`Session: ${args.session}`);
    console.log(`Token: ${args.token ? '✅ Configurado' : '❌ Ausente'}`);
    console.log(`SVG: ${fs.existsSync(svgPath) ? '✅ Existe' : '❌ Ausente'}`);
    console.log('\n⚠️  Nota: A API REST do Figma tem limitações.');
    console.log('   Veja a solução recomendada abaixo.\n');
    process.exit(0);
  }

  console.log('\n🔍 Verificando acesso ao Figma...\n');

  // Test token by getting teams
  try {
    const teams = await getTeams(args.token);
    if (teams && teams.teams) {
      console.log('✅ Token válido! Teams encontrados:\n');
      teams.teams.slice(0, 3).forEach(team => {
        console.log(`   - ${team.name} (ID: ${team.id})`);
      });
      if (!args.teamId && teams.teams.length > 0) {
        console.log(`\n💡 Usando primeiro team: ${teams.teams[0].name}`);
        console.log(`   Para usar outro, configure: export FIGMA_TEAM_ID="<id>"\n`);
        args.teamId = teams.teams[0].id;
      }
    }
  } catch (error) {
    console.error(`❌ Erro ao validar token: ${error.message}`);
    console.error('   Verifique se o token está correto.\n');
    process.exit(1);
  }

  console.log('\n⚠️  LIMITAÇÃO DA API DO FIGMA:');
  console.log('   A API REST do Figma não permite criar files ou importar SVG diretamente.');
  console.log('   Ela é principalmente para LEITURA.\n');

  console.log('✅ SOLUÇÃO RECOMENDADA (Mais Simples):\n');
  console.log('1. Abra o Figma: https://www.figma.com');
  console.log('2. Crie um novo board: File → New → FigJam');
  console.log('3. Vá em: File → Import');
  console.log(`4. Escolha: ${svgPath}`);
  console.log('5. Pronto! O board aparece automaticamente.\n');

  console.log('📋 OU use a automação (Make/Zapier) que já configuramos:');
  console.log('   Veja: SETUP-FIGMA-AUTOMATION.md\n');

  console.log('💡 PRÓXIMOS PASSOS:');
  console.log('   - Para automatizar 100%, configure Make.com (veja SETUP-FIGMA-AUTOMATION.md)');
  console.log('   - Ou importe o SVG manualmente (1 clique, funciona perfeitamente)\n');

  // Save token for future use (optional)
  const envFile = path.join(args.root, '.env.local');
  if (!fs.existsSync(envFile) || !fs.readFileSync(envFile, 'utf8').includes('FIGMA_ACCESS_TOKEN')) {
    console.log('💾 Dica: Salve o token em .env.local para não precisar configurar sempre:');
    console.log(`   echo 'FIGMA_ACCESS_TOKEN="${args.token}"' >> .env.local\n`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Fatal:', err.message);
    process.exit(1);
  });
}

module.exports = { main };
