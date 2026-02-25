import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'node:path'
import os from 'node:os'
import { createProject, listProjects, getProject, getProjectStats } from '../../src/project/registry.js'
import { ProjectNotFoundError, DuplicateIdError } from '../../src/shared/errors.js'

let tmpDir, originalEnv

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `nexus-test-${Date.now()}`)
  await fs.ensureDir(path.join(tmpDir, 'docs', 'knowledge'))
  originalEnv = process.env.NEXUS_ROOT
  process.env.NEXUS_ROOT = tmpDir
})

afterEach(async () => {
  process.env.NEXUS_ROOT = originalEnv
  await fs.remove(tmpDir)
})

describe('createProject', () => {
  it('creates project with manifest and subdirs', async () => {
    const manifest = await createProject('test-project', { name: 'Test Project' })

    expect(manifest.slug).toBe('test-project')
    expect(manifest.name).toBe('Test Project')
    expect(manifest.visibility).toBe('private')

    const manifestExists = await fs.pathExists(path.join(tmpDir, 'docs', 'knowledge', 'test-project', 'manifest.yaml'))
    expect(manifestExists).toBe(true)

    for (const dir of ['substrates', 'blocks', 'contexts', 'outputs']) {
      const dirExists = await fs.pathExists(path.join(tmpDir, 'docs', 'knowledge', 'test-project', dir))
      expect(dirExists).toBe(true)
    }
  })

  it('throws DuplicateIdError on duplicate slug', async () => {
    await createProject('dup')
    await expect(createProject('dup')).rejects.toThrow(DuplicateIdError)
  })

  it('applies default values', async () => {
    const manifest = await createProject('minimal')
    expect(manifest.market_profile).toBe('pt-br-massa')
    expect(manifest.tone).toBe('professional')
    expect(manifest.tags).toEqual([])
  })
})

describe('listProjects', () => {
  it('lists all projects with manifests', async () => {
    await createProject('alpha', { name: 'Alpha' })
    await createProject('beta', { name: 'Beta' })

    const projects = await listProjects()
    expect(projects).toHaveLength(2)
    expect(projects.map(p => p.slug)).toContain('alpha')
    expect(projects.map(p => p.slug)).toContain('beta')
  })

  it('returns empty array when no projects', async () => {
    const projects = await listProjects()
    expect(projects).toEqual([])
  })
})

describe('getProject', () => {
  it('returns project manifest', async () => {
    await createProject('myproj', { name: 'My Project', visibility: 'public' })

    const project = await getProject('myproj')
    expect(project.name).toBe('My Project')
    expect(project.visibility).toBe('public')
  })

  it('throws ProjectNotFoundError for missing project', async () => {
    await expect(getProject('nonexistent')).rejects.toThrow(ProjectNotFoundError)
  })
})

describe('getProjectStats', () => {
  it('returns zero counts for new project', async () => {
    await createProject('empty-proj')
    const stats = await getProjectStats('empty-proj')

    expect(stats.substrates).toBe(0)
    expect(stats.blocks).toBe(0)
    expect(stats.contexts).toBe(0)
    expect(stats.outputs).toBe(0)
  })

  it('counts substrate files', async () => {
    await createProject('with-subs')
    const subDir = path.join(tmpDir, 'docs', 'knowledge', 'with-subs', 'substrates')
    await fs.writeFile(path.join(subDir, 'S1-test.md'), '---\nid: S1\n---\nContent')
    await fs.writeFile(path.join(subDir, 'S2-test.md'), '---\nid: S2\n---\nContent')

    const stats = await getProjectStats('with-subs')
    expect(stats.substrates).toBe(2)
  })
})
