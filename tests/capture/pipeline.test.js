import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import { scanPendingNotes, markProcessed, getCaptureStatus } from '../../src/capture/pipeline.js'

describe('capture/pipeline', () => {
  let tmpDir, captureDir

  beforeEach(async () => {
    tmpDir = path.join(os.tmpdir(), `nexus-capture-pipeline-${Date.now()}`)
    captureDir = path.join(tmpDir, 'capture')
    await fs.ensureDir(captureDir)
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('scans pending notes', async () => {
    await fs.writeFile(path.join(captureDir, 'note1.md'), 'Note 1')
    await fs.writeFile(path.join(captureDir, 'note2.txt'), 'Note 2')

    const pending = await scanPendingNotes(captureDir)
    expect(pending).toHaveLength(2)
  })

  it('excludes already processed notes', async () => {
    await fs.writeFile(path.join(captureDir, 'note1.md'), 'Note 1')
    await fs.writeFile(path.join(captureDir, 'note2.md'), 'Note 2')
    await fs.ensureDir(path.join(captureDir, 'processed'))
    await fs.writeFile(path.join(captureDir, 'processed', 'note1.md.processed'), '{}')

    const pending = await scanPendingNotes(captureDir)
    expect(pending).toHaveLength(1)
    expect(pending[0].name).toBe('note2.md')
  })

  it('marks note as processed', async () => {
    const notePath = path.join(captureDir, 'note1.md')
    await fs.writeFile(notePath, 'Content')

    await markProcessed(notePath)

    expect(await fs.pathExists(notePath)).toBe(false)
    expect(await fs.pathExists(path.join(captureDir, 'processed', 'note1.md'))).toBe(true)
  })

  it('returns capture status', async () => {
    await fs.writeFile(path.join(captureDir, 'note1.md'), 'A')
    await fs.writeFile(path.join(captureDir, 'note2.md'), 'B')
    await fs.ensureDir(path.join(captureDir, 'processed'))
    await fs.writeFile(path.join(captureDir, 'processed', 'old.md'), 'done')
    await fs.writeFile(path.join(captureDir, 'processed', 'old.md.processed'), '{}')

    const status = await getCaptureStatus(captureDir)
    expect(status.pending).toBe(2)
    expect(status.processed).toBe(1)
    expect(status.total).toBe(3)
  })

  it('returns empty for nonexistent capture dir', async () => {
    const pending = await scanPendingNotes('/nonexistent')
    expect(pending).toEqual([])
  })
})
