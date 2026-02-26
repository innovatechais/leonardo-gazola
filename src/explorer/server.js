import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSystemMap } from './map-builder.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, 'public')

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath)
  const mime = MIME_TYPES[ext] || 'application/octet-stream'

  try {
    const content = fs.readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': `${mime}; charset=utf-8` })
    res.end(content)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
}

export function createServer(port = 3737) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`)

    if (url.pathname === '/api/map') {
      try {
        const map = await buildSystemMap()
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify(map))
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      }
      return
    }

    // Serve static files
    let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? 'index.html' : url.pathname)
    filePath = path.normalize(filePath)

    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403)
      res.end('Forbidden')
      return
    }

    serveFile(res, filePath)
  })

  return {
    start() {
      return new Promise((resolve) => {
        server.listen(port, () => {
          console.log(`\n  🚀 NEXUS Explorer running at http://localhost:${port}\n`)
          resolve(server)
        })
      })
    },
    server,
  }
}
