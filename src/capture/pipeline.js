import { glob } from 'glob'
import fs from 'fs-extra'
import path from 'node:path'
import { paths } from '../shared/paths.js'
import { ensureDir, exists } from '../shared/fs-utils.js'

export async function scanPendingNotes(captureDir) {
  if (!captureDir) captureDir = path.join(paths.root(), 'capture')
  if (!(await exists(captureDir))) return []

  const files = await glob(`${captureDir}/*.{md,txt,json}`)
  const processedDir = path.join(captureDir, 'processed')
  const processedFiles = await exists(processedDir)
    ? new Set((await fs.readdir(processedDir)).map(f => f.replace('.processed', '')))
    : new Set()

  return files
    .map(f => ({ path: f, name: path.basename(f) }))
    .filter(f => !processedFiles.has(f.name))
}

export async function markProcessed(filePath) {
  const captureDir = path.dirname(filePath)
  const processedDir = path.join(captureDir, 'processed')
  await ensureDir(processedDir)

  const name = path.basename(filePath)
  await fs.move(filePath, path.join(processedDir, name))
  await fs.writeFile(
    path.join(processedDir, `${name}.processed`),
    JSON.stringify({ processed_at: new Date().toISOString(), source: filePath }),
  )
}

export async function getCaptureStatus(captureDir) {
  if (!captureDir) captureDir = path.join(paths.root(), 'capture')

  const pending = await scanPendingNotes(captureDir)
  const processedDir = path.join(captureDir, 'processed')
  let processedCount = 0

  if (await exists(processedDir)) {
    const files = await fs.readdir(processedDir)
    processedCount = files.filter(f => f.endsWith('.processed')).length
  }

  const total = pending.length + processedCount
  const conversionRate = total > 0 ? Math.round((processedCount / total) * 100) : 0

  return {
    pending: pending.length,
    processed: processedCount,
    total,
    conversionRate,
  }
}
