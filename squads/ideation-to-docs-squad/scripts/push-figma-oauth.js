#!/usr/bin/env node
/**
 * Push ideation board to Figma using OAuth (Client ID + Secret)
 *
 * This script:
 * 1. Uses your Figma OAuth credentials (Client ID + Secret)
 * 2. Creates/updates a Figma file with your board
 * 3. Imports the SVG or creates nodes programmatically
 *
 * Setup:
 * export FIGMA_CLIENT_ID="seu_client_id"
 * export FIGMA_CLIENT_SECRET="seu_client_secret"
 * export FIGMA_ACCESS_TOKEN="seu_access_token" (obtido via OAuth flow)
 *
 * Usage:
 * node push-figma-oauth.js --session ideation-2026-02-17
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_API_BASE = 'https://api.figma.com/v1';

function parseArgs(argv) {
  const args = {
    session: null,
    clientId: process.env.FIGMA_CLIENT_ID || null,
    clientSecret: process.env.FIGMA_CLIENT_SECRET || null,
    accessToken: process.env.FIGMA_ACCESS_TOKEN || null,
    teamId: process.env.FIGMA_TEAM_ID || null,
    root: process.cwd(),
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--session') args.session = argv[++i];
    else if (t === '--client-id') args.clientId = argv[++i];
    else if (t === '--client-secret') args.clientSecret = argv[++i];
    else if (t === '--access-token') args.accessToken = argv[++i];
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
        ...options.headers,
      },
    };

    if (options.token) {
      opts.headers['X-Figma-Token'] = options.token;
    }

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

async function getTeams(accessToken) {
  try {
    const response = await httpsRequest(`${FIGMA_API_BASE}/teams`, { token: accessToken });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar teams: ${error.message}`);
  }
}

async function createFigmaFile(accessToken, teamId, fileName) {
  // Figma API doesn't support direct file creation via REST
  // We need to use the Plugin API or create via project
  // For now, we'll guide the user or use an existing file
  
  console.log('⚠️  A API REST do Figma não permite criar files diretamente.');
  console.log('   Mas podemos usar um file existente ou criar via plugin.\n');
  
  return null;
}

async function uploadImageToFigma(accessToken, fileKey, imageData, imageType = 'image/svg+xml') {
  // Convert image to base64
  const base64Image = Buffer.from(imageData).toString('base64');
  
  // Figma API for images: POST /v1/files/{file_key}/images
  try {
    const response = await httpsRequest(`${FIGMA_API_BASE}/files/${fileKey}/images`, {
      method: 'POST',
      token: accessToken,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        data: base64Image,
        contentType: imageType,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.session) {
    console.error('Uso: node push-figma-oauth.js --session <id>');
    console.error('\nConfigure:');
    console.error('  export FIGMA_CLIENT_ID="seu_client_id"');
    console.error('  export FIGMA_CLIENT_SECRET="seu_client_secret"');
    console.error('  export FIGMA_ACCESS_TOKEN="seu_access_token"\n');
    process.exit(1);
  }

  // Validate credentials
  if (!args.clientId || !args.clientSecret) {
    console.error('\n❌ Credenciais OAuth não encontradas!\n');
    console.error('Configure:');
    console.error('  export FIGMA_CLIENT_ID="Y6pON6ISZqJKe0yTjbC3Tk"');
    console.error('  export FIGMA_CLIENT_SECRET="F4gmvDs33CbyyAEMfransC4Unlm1d4"\n');
    console.error('E obtenha um access token via OAuth flow.\n');
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
    console.log('DRY RUN: Credenciais validadas.');
    console.log(`Client ID: ${args.clientId ? '✅ Configurado' : '❌ Ausente'}`);
    console.log(`Client Secret: ${args.clientSecret ? '✅ Configurado' : '❌ Ausente'}`);
    console.log(`Access Token: ${args.accessToken ? '✅ Configurado' : '❌ Precisa obter via OAuth'}`);
    console.log(`SVG: ${fs.existsSync(svgPath) ? '✅ Existe' : '❌ Ausente'}\n`);
    
    if (!args.accessToken) {
      console.log('📋 Para obter o access token:');
      console.log('   1. Acesse: https://www.figma.com/oauth');
      console.log(`   2. Use Client ID: ${args.clientId}`);
      console.log('   3. Autorize o app');
      console.log('   4. Copie o access token retornado\n');
    }
    process.exit(0);
  }

  if (!args.accessToken) {
    console.error('\n❌ Access Token não encontrado!\n');
    console.error('📋 Para obter o access token via OAuth:\n');
    console.error('1. Acesse: https://www.figma.com/oauth');
    console.error(`2. Use Client ID: ${args.clientId}`);
    console.error('3. Autorize o aplicativo');
    console.error('4. Copie o access token retornado');
    console.error('5. Configure:');
    console.error('   export FIGMA_ACCESS_TOKEN="seu_access_token"\n');
    console.error('Ou me passe o access token e eu configuro para você!\n');
    process.exit(1);
  }

  console.log('\n🔍 Validando acesso ao Figma...\n');

  try {
    const teams = await getTeams(args.accessToken);
    if (teams && teams.teams) {
      console.log('✅ Token válido! Teams encontrados:\n');
      teams.teams.slice(0, 3).forEach(team => {
        console.log(`   - ${team.name} (ID: ${team.id})`);
      });
      if (!args.teamId && teams.teams.length > 0) {
        args.teamId = teams.teams[0].id;
        console.log(`\n💡 Usando primeiro team: ${teams.teams[0].name}\n`);
      }
    }
  } catch (error) {
    console.error(`❌ Erro ao validar token: ${error.message}`);
    console.error('   Verifique se o access token está correto e válido.\n');
    process.exit(1);
  }

  console.log('\n⚠️  LIMITAÇÃO: A API REST do Figma não permite criar files diretamente.');
  console.log('   Ela é principalmente para LEITURA.\n');

  console.log('✅ SOLUÇÃO RECOMENDADA:\n');
  console.log('1. Abra o Figma: https://www.figma.com');
  console.log('2. Crie um novo board: File → New → FigJam');
  console.log('3. Vá em: File → Import');
  console.log(`4. Escolha: ${svgPath}`);
  console.log('5. Pronto! O board aparece automaticamente.\n');

  console.log('💡 Para automatizar 100%, precisamos usar a Figma Plugin API.');
  console.log('   Ou criar um plugin que importa o SVG automaticamente.\n');

  // Save credentials for future use
  const envFile = path.join(args.root, '.env.local');
  const envContent = `# Figma OAuth Credentials
FIGMA_CLIENT_ID="${args.clientId}"
FIGMA_CLIENT_SECRET="${args.clientSecret}"
${args.accessToken ? `FIGMA_ACCESS_TOKEN="${args.accessToken}"` : ''}
${args.teamId ? `FIGMA_TEAM_ID="${args.teamId}"` : ''}
`;

  if (!fs.existsSync(envFile)) {
    fs.writeFileSync(envFile, envContent);
    console.log('💾 Credenciais salvas em .env.local\n');
  } else {
    console.log('💡 Dica: Adicione as credenciais em .env.local para não precisar configurar sempre\n');
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ Fatal:', err.message);
    process.exit(1);
  });
}

module.exports = { main };
