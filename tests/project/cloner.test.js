import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import { cloneProject } from '../../src/project/cloner.js'

describe('project/cloner', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-cloner-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    const dir = path.join(tmpDir, 'docs', 'knowledge', 'source')
    await fs.ensureDir(path.join(dir, 'substrates'))
    await fs.ensureDir(path.join(dir, 'blocks'))
    await fs.ensureDir(path.join(dir, 'contexts'))
    await fs.ensureDir(path.join(dir, 'outputs'))
    await fs.writeFile(path.join(dir, 'manifest.yaml'), yaml.dump({
      slug: 'source', name: 'Source Project', visibility: 'private',
      market_profile: 'pt-br-massa', tone: 'casual',
      created_at: new Date().toISOString(), tags: ['test'], shared_substrates: [],
    }))

    // Add a substrate
    const sub = matter.stringify('Content here', {
      id: 'S1', title: 'Test', category: 'product', version: 1,
      status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    })
    await fs.writeFile(path.join(dir, 'substrates', 'S1-test.md'), sub)
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('clones project with settings', async () => {
    const manifest = await cloneProject('source', 'clone')
    expect(manifest.slug).toBe('clone')
    expect(manifest.tone).toBe('casual')
    expect(manifest.market_profile).toBe('pt-br-massa')
  })

  it('copies substrates to new project', async () => {
    await cloneProject('source', 'clone')
    const subDir = path.join(tmpDir, 'docs', 'knowledge', 'clone', 'substrates')
    const files = await fs.readdir(subDir)
    expect(files.some(f => f.startsWith('S1'))).toBe(true)
  })

  it('throws when target already exists', async () => {
    await cloneProject('source', 'clone')
    await expect(cloneProject('source', 'clone')).rejects.toThrow('already exists')
  })
})
