import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import { packageTemplate } from '../../src/export/packager.js'

describe('export/packager', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-export-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('creates export directory with manifest', async () => {
    const { exportDir, manifest } = await packageTemplate('pipeline', 'my-pipeline')
    expect(manifest.name).toBe('my-pipeline')
    expect(manifest.type).toBe('pipeline')
    expect(await fs.pathExists(path.join(exportDir, 'manifest.json'))).toBe(true)
  })

  it('generates README.md', async () => {
    const { exportDir } = await packageTemplate('squad', 'test-squad')
    const readme = await fs.readFile(path.join(exportDir, 'README.md'), 'utf-8')
    expect(readme).toContain('test-squad')
    expect(readme).toContain('squad')
  })

  it('generates LICENSE.md', async () => {
    const { exportDir } = await packageTemplate('template', 'test')
    expect(await fs.pathExists(path.join(exportDir, 'LICENSE.md'))).toBe(true)
  })

  it('generates SETUP.md', async () => {
    const { exportDir } = await packageTemplate('method', 'nexus')
    const setup = await fs.readFile(path.join(exportDir, 'SETUP.md'), 'utf-8')
    expect(setup).toContain('Prerequisites')
  })
})
