import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { archiveProject, restoreProject, listArchivedProjects } from '../../src/project/archiver.js'

describe('project/archiver', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-archiver-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    const dir = path.join(tmpDir, 'docs', 'knowledge', 'test-proj')
    await fs.ensureDir(dir)
    await fs.writeFile(path.join(dir, 'manifest.yaml'), yaml.dump({
      slug: 'test-proj', name: 'Test', visibility: 'private',
      market_profile: 'pt-br-massa', tone: 'professional',
      created_at: new Date().toISOString(), tags: [], shared_substrates: [],
    }))
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('archives project to _archived/', async () => {
    const archiveDir = await archiveProject('test-proj')
    expect(archiveDir).toContain('_archived/test-proj')
    expect(await fs.pathExists(archiveDir)).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'docs', 'knowledge', 'test-proj'))).toBe(false)
  })

  it('restores archived project', async () => {
    await archiveProject('test-proj')
    const restoredDir = await restoreProject('test-proj')
    expect(await fs.pathExists(restoredDir)).toBe(true)
  })

  it('lists archived projects', async () => {
    await archiveProject('test-proj')
    const archived = await listArchivedProjects()
    expect(archived).toContain('test-proj')
  })

  it('returns empty list when no archives', async () => {
    const archived = await listArchivedProjects()
    expect(archived).toEqual([])
  })

  it('throws for nonexistent project', async () => {
    await expect(archiveProject('nonexistent')).rejects.toThrow()
  })

  it('throws when restoring to existing project', async () => {
    // Create another project at same slug after archiving
    await archiveProject('test-proj')
    const dir = path.join(tmpDir, 'docs', 'knowledge', 'test-proj')
    await fs.ensureDir(dir)
    await fs.writeFile(path.join(dir, 'manifest.yaml'), yaml.dump({
      slug: 'test-proj', name: 'New', created_at: new Date().toISOString(),
      visibility: 'private', market_profile: 'pt-br-massa', tone: 'professional', tags: [], shared_substrates: [],
    }))
    await expect(restoreProject('test-proj')).rejects.toThrow('already exists')
  })
})
