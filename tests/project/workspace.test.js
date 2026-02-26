import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'fs-extra'
import os from 'node:os'
import yaml from 'js-yaml'
import { switchProject, getActiveProject, listWorkspaceProjects } from '../../src/project/workspace.js'

describe('project/workspace', () => {
  let tmpDir, originalRoot

  beforeEach(async () => {
    originalRoot = process.env.NEXUS_ROOT
    tmpDir = path.join(os.tmpdir(), `nexus-workspace-${Date.now()}`)
    process.env.NEXUS_ROOT = tmpDir

    // Create two projects
    for (const slug of ['evidex', 'clube-tartar']) {
      const dir = path.join(tmpDir, 'docs', 'knowledge', slug)
      await fs.ensureDir(dir)
      await fs.writeFile(path.join(dir, 'manifest.yaml'), yaml.dump({
        slug, name: slug, visibility: 'private', market_profile: 'pt-br-massa',
        tone: 'professional', created_at: new Date().toISOString(), tags: [], shared_substrates: [],
      }))
    }
  })

  afterEach(async () => {
    if (originalRoot !== undefined) process.env.NEXUS_ROOT = originalRoot
    else delete process.env.NEXUS_ROOT
    await fs.remove(tmpDir)
  })

  it('switches active project', async () => {
    await switchProject('evidex')
    const active = await getActiveProject()
    expect(active).toBe('evidex')
  })

  it('switches to different project', async () => {
    await switchProject('evidex')
    await switchProject('clube-tartar')
    const active = await getActiveProject()
    expect(active).toBe('clube-tartar')
  })

  it('returns null when no active project', async () => {
    const active = await getActiveProject()
    expect(active).toBeNull()
  })

  it('lists projects with active flag', async () => {
    await switchProject('evidex')
    const projects = await listWorkspaceProjects()
    expect(projects).toHaveLength(2)
    const evidex = projects.find(p => p.slug === 'evidex')
    const tartar = projects.find(p => p.slug === 'clube-tartar')
    expect(evidex.active).toBe(true)
    expect(tartar.active).toBe(false)
  })

  it('throws for nonexistent project', async () => {
    await expect(switchProject('nonexistent')).rejects.toThrow()
  })
})
