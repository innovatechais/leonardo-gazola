/**
 * audio-transcriber.js
 * Transcreve áudio usando Groq Whisper (gratuito)
 * Suporta: .ogg, .mp3, .mp4, .wav, .m4a, .webm
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_WHISPER_MODEL = 'whisper-large-v3-turbo'; // Mais rápido, grátis

/**
 * Transcreve um arquivo de áudio
 * @param {string} filePath - Caminho do arquivo de áudio
 * @returns {Promise<string>} - Texto transcrito
 */
async function transcribeAudio(filePath) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY não configurada no .env');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const fileSize = fileBuffer.length;

  // Groq aceita arquivos até 25MB
  if (fileSize > 25 * 1024 * 1024) {
    throw new Error('Arquivo muito grande (máx 25MB). Divida o áudio.');
  }

  console.log(`🎙️  Transcrevendo: ${fileName} (${Math.round(fileSize / 1024)}KB)...`);

  // Criar multipart form data manualmente (sem dependência externa)
  const boundary = `----FormBoundary${Date.now()}`;
  const CRLF = '\r\n';

  // Detectar tipo MIME
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.ogg': 'audio/ogg',
    '.mp3': 'audio/mpeg',
    '.mp4': 'audio/mp4',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.webm': 'audio/webm',
    '.flac': 'audio/flac',
  };
  const mimeType = mimeTypes[ext] || 'audio/ogg';

  // Montar o body do multipart
  const partModel = Buffer.from(
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="model"${CRLF}${CRLF}` +
    `${GROQ_WHISPER_MODEL}${CRLF}`
  );

  const partLanguage = Buffer.from(
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="language"${CRLF}${CRLF}` +
    `pt${CRLF}`
  );

  const partResponseFormat = Buffer.from(
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="response_format"${CRLF}${CRLF}` +
    `text${CRLF}`
  );

  const partFileHeader = Buffer.from(
    `--${boundary}${CRLF}` +
    `Content-Disposition: form-data; name="file"; filename="${fileName}"${CRLF}` +
    `Content-Type: ${mimeType}${CRLF}${CRLF}`
  );

  const partEnd = Buffer.from(`${CRLF}--${boundary}--${CRLF}`);

  const body = Buffer.concat([
    partModel,
    partLanguage,
    partResponseFormat,
    partFileHeader,
    fileBuffer,
    partEnd,
  ]);

  // Fazer a requisição HTTPS
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/audio/transcriptions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          const text = data.trim();
          console.log(`✅ Transcrito: "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
          resolve(text);
        } else {
          reject(new Error(`Groq API erro ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Converte OGG Telegram para formato compatível (se ffmpeg disponível)
 * O Telegram envia áudios em .oga (ogg/opus) — Groq aceita diretamente
 */
function ensureAudioCompatible(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Groq aceita esses formatos diretamente
  const supported = ['.ogg', '.oga', '.mp3', '.mp4', '.wav', '.m4a', '.webm', '.flac'];
  if (supported.includes(ext)) {
    return filePath; // Já compatível
  }

  // Tentar converter com ffmpeg se disponível
  try {
    execSync('which ffmpeg', { stdio: 'ignore' });
    const outputPath = filePath.replace(ext, '.mp3');
    execSync(`ffmpeg -i "${filePath}" -q:a 0 "${outputPath}" -y 2>/dev/null`);
    console.log(`🔄 Convertido: ${path.basename(filePath)} → ${path.basename(outputPath)}`);
    return outputPath;
  } catch {
    // ffmpeg não disponível, tentar mesmo assim
    return filePath;
  }
}

module.exports = { transcribeAudio, ensureAudioCompatible };
